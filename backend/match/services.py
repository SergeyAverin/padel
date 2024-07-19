from match.schemas import MatchCreateDTO
from match.repositories import MatchRepository
from match.models import StatusEnum
from club.services import club_service, court_service
from account.models import User


class MatchService:
    def __init__(self) -> None:
        self.match_repository = MatchRepository()

    def start_match(self):
        pass

    def end_match(self):
        pass

    async def get_club_for_match(self, user: User):
        return await self.match_repository.get_club_for_match(user)

    async def change_match_status(self, match_id: int, status: StatusEnum):
        match = await self.match_repository.get_match_by_id(match_id)
        match.status = status.value
        await match.save()
        return match

    async def create_match(self,  match_create_data: MatchCreateDTO, user: User):
        club = await club_service.get_club_by_id(match_create_data.club_id)
        court = await court_service.get_court_by_id(match_create_data.court_id)
        return await self.match_repository.create_match(match_create_data, club, user, court)

    async def get_match_by_id(self, match_id: int):
        return await self.match_repository.get_match_by_id(match_id)

    async def get_match_by_user(self, user_id: str):
        return await self.match_repository.get_match_by_user(user_id)

    async def get_match_by_club(self, club_id: str):
        return await self.match_repository.get_match_by_club(club_id)

    def delete_match_by_id(self):
        pass

    async def get_match_by_friends(self, user_id: str):
        return await self.match_repository.get_match_by_friends(user_id)

    async def get_matches_by_club_bookmarks(self, user_id: str):
        return await self.match_repository.get_matches_by_club_bookmarks(user_id)


class MatchPlayersService:
    def add_player_in_match(self):
        pass

    def remove_player_in_match(self):
        pass

    def change_user_order(self):
        pass


match_service = MatchService()
