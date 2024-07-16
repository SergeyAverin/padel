from datetime import datetime
from logging import getLogger

# from tortoise.expressions import Q

from match.models import Match, StatusEnum
from match.schemas import MatchCreateDTO
from club.models import Club
from account.models import User
from friends.services import friend_service
from club.services import club_bookmark_service


logger = getLogger()


class MatchRepository:
    async def create_match(self, match_create_data: MatchCreateDTO, club: Club, user: User):
        match = Match()
        match.club = club
        match.start_at = match_create_data.start_at
        match.end_at = match_create_data.end_at
        match.created_at = datetime.now()
        match.owner = user
        await match.save()
        return match

    async def get_match_by_id(self, match_id: int):
        match = await Match.get_or_none(id=int(match_id))
        logger.debug(match)
        return match

    async def get_match_by_user(self, user_id: str):
        return await Match.filter(owner__telegram_user_id=user_id)

    async def get_match_by_club(self, club_id: str):
        return await Match.filter(club_id=club_id)

    async def get_match_by_friends(self, user_id: str):
        friends = await friend_service.get_user_friends(user_id)
        matches = await Match.filter(owner__id__in=[friend.id for friend in friends])

        # matches = Match.filter(
        #     Q(match_owner__in=friends) | Q(participants__in=friends)
        # ).distinct()

        return matches

    async def get_matches_by_club_bookmarks(self, user_id: str):
        bookmarks = await club_bookmark_service.get_bookmarked_clubs(user_id)
        matches = await Match.filter(club__id__in=[bookmark.id for bookmark in bookmarks])

        # matches = Match.filter(
        #     Q(match_owner__in=friends) | Q(participants__in=friends)
        # ).distinct()

        return matches

    def delete_match_by_id(self):
        pass


class MatchPlayersRepository:
    def get_match_players(self):
        pass

    def add_player_in_match(self):
        pass

    def remove_player_from_match(self):
        pass
