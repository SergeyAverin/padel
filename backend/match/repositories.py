from datetime import datetime
from logging import getLogger

# from tortoise.expressions import Q

from match.models import Match, StatusEnum
from match.schemas import MatchCreateDTO
from club.models import Club, Court
from account.models import User
from friends.services import friend_service
from club.services import club_bookmark_service


logger = getLogger()


class MatchRepository:
    async def create_match(self, match_create_data: MatchCreateDTO, club: Club, user: User, court: Court):
        match = Match()
        match.club = club
        match.start_at = match_create_data.start_at
        match.end_at = match_create_data.end_at
        match.created_at = datetime.now()
        match.owner = user
        match.selected_court = court
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
            "selected_court": match.selected_court,
            "id": match.id
        }

    async def get_match_by_id(self, match_id: int):
        # match = await Match.get_or_none(id=int(match_id)).prefetch_related("user_1")

        # match = await Match.filter(id=match_id).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').first()
        # return [self.serealize_match(m) for m in match]
        return await Match.get_or_none(id=match_id)

    async def get_match_by_user(self, user_id: str):
        matches = await Match.filter(owner__telegram_user_id=user_id).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')
        return [self.serealize_match(m) for m in matches]

    async def get_match_by_club(self, club_id: str):
        match = await Match.filter(club_id=club_id).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')
        return [self.serealize_match(m) for m in match]

    async def get_match_by_friends(self, user_id: str):
        friends = await friend_service.get_user_friends(user_id)
        matches = await Match.filter(owner__id__in=[friend.id for friend in friends]).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')

        # matches = Match.filter(
        #     Q(match_owner__in=friends) | Q(participants__in=friends)
        # ).distinct()

        return [self.serealize_match(m) for m in matches]

    async def get_matches_by_club_bookmarks(self, user_id: str):
        bookmarks = await club_bookmark_service.get_bookmarked_clubs(user_id)
        matches = await Match.filter(club__id__in=[bookmark.id for bookmark in bookmarks]).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').order_by('created_at')

        # matches = Match.filter(
        #     Q(match_owner__in=friends) | Q(participants__in=friends)
        # ).distinct()

        return [self.serealize_match(m) for m in matches]

    def delete_match_by_id(self):
        pass

    async def get_club_for_match(self, user: User):
        matches = await Club.filter(owner__telegram_user_id=user.telegram_user_id).order_by('created_at')
        return matches


class MatchPlayersRepository:
    def get_match_players(self):
        pass

    def add_player_in_match(self):
        pass

    def remove_player_from_match(self):
        pass
