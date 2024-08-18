from datetime import datetime
from logging import getLogger

from tortoise.expressions import Q

from match.models import Match, StatusEnum
from match.schemas import MatchCreateDTO
from club.models import Club, Court
from account.models import User
from friends.models import Tag
from friends.services import friend_service
from club.services import club_bookmark_service
from account.service import user_service

logger = getLogger()


class MatchRepository:
    async def create_match(
        self,
        match_create_data: MatchCreateDTO,
        club: Club,
        user: User,
        court: Court
    ):
        match = Match()
        match.club = club
        match.start_at = match_create_data.start_at
        match.end_at = match_create_data.end_at
        match.created_at = datetime.now()
        match.owner = user
        match.selected_court = court
        match.match_lvl = match_create_data.match_lvl
        match.is_private = match_create_data.is_private
        await match.save()
        if match.is_private:
            tag = await Tag.get_or_none(id=match_create_data.tag_id)
            users_to_match = await tag.friends_with_tag.all()
            for user_to_match in users_to_match:
                await match.user_for_match.add(user_to_match)
            await match.save()
        return match

    def serealize_match(self, match):
        return {
            "club": match.club,
            "status": match.status,
            "start_at": match.start_at,
            "end_at": match.end_at,
            "created_at": match.created_at,
            "owner": match.owner,
            "user_1": match.user_1,
            "user_2": match.user_2,
            "user_3": match.user_3,
            "user_4": match.user_4,
            "text_user_1": match.text_user_1,
            "text_user_2": match.text_user_2,
            "text_user_3": match.text_user_3,
            "text_user_4": match.text_user_4,
            "selected_court": match.selected_court,
            "first_team_score": match.first_team_score,
            "second_team_score": match.second_team_score,
            "match_lvl": match.match_lvl,
            "id": match.id
        }

    async def get_match_by_day(self, day: int, month: int, club_id: int):
        return await Match.filter(club__id=club_id, start_at__day=day, start_at__month=month)

    async def get_match_by_id(self, match_id: int):
        # match = await Match.get_or_none(id=int(match_id)).prefetch_related("user_1")

        match = await Match.filter(id=match_id).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').first()
        # return [self.serealize_match(m) for m in match]
        return await match

    async def get_match_by_user(self, user_id: str):
        matches = await Match.filter(
            Q(
                Q(owner__telegram_user_id=user_id) |
                Q(user_1__telegram_user_id=user_id) |
                Q(user_2__telegram_user_id=user_id) |
                Q(user_3__telegram_user_id=user_id) |
                Q(user_4__telegram_user_id=user_id)
            ) &
            Q(
                Q(is_private=False) |
                Q(user_for_match__id=user_id) |
                Q(owner__telegram_user_id=user_id)
            )
        ).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')

        return [self.serealize_match(m) for m in matches]

    async def get_match_by_club(self, club_id: str):
        match = await Match.filter(club_id=club_id).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')
        return [self.serealize_match(m) for m in match]

    async def get_match_by_friends(self, user_id: str):
        friends = await friend_service.get_user_friends(user_id)
        matches = await Match.filter(
            Q(
                Q(owner__id__in=[friend.id for friend in friends]) |
                Q(user_1__id__in=[friend.id for friend in friends]) |
                Q(user_2__id__in=[friend.id for friend in friends]) |
                Q(user_3__id__in=[friend.id for friend in friends]) |
                Q(user_4__id__in=[friend.id for friend in friends])) & Q(Q(is_private=False) | Q(user_for_match__id=user_id))
        ).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')
        # matches = Match.filter(
        #     Q(match_owner__in=friends) | Q(participants__in=friends)
        # ).distinct()

        return [self.serealize_match(m) for m in matches]

    async def get_matches_by_club_bookmarks(self, user_id: str):
        bookmarks = await club_bookmark_service.get_bookmarked_clubs(user_id)
        matches = await Match.filter(Q(club__id__in=[bookmark.id for bookmark in bookmarks]) & Q(Q(is_private=False) | Q(user_for_match__id=user_id))).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')

        # matches = Match.filter(
        #     Q(match_owner__in=friends) | Q(participants__in=friends)
        # ).distinct()

        return [self.serealize_match(m) for m in matches]

    def delete_match_by_id(self):
        pass

    async def get_club_for_match(self, user: User):
        bookmarks = await club_bookmark_service.get_bookmarked_clubs(user.telegram_user_id)
        if (len(bookmarks) > 0):
            matches = await Club.filter(
                Q(owner__telegram_user_id=user.telegram_user_id) |
                Q(id__in=[bookmark.id for bookmark in bookmarks])
            )
            return list(set(matches))
        else:
            matches = await Club.filter(
                owner__telegram_user_id=user.telegram_user_id
            )
            return matches
