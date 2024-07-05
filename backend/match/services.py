from match.schemas import MatchCreateDTO
from match.repositories import MatchRepository
from club.services import club_service
from account.models import User


class MatchService:
    def __init__(self) -> None:
        self.match_repository = MatchRepository()

    def start_match(self):
        pass

    def end_match(self):
        pass

    async def create_match(self,  match_create_data: MatchCreateDTO, user: User):
        club = await club_service.get_club_by_id(match_create_data.club_id)
        return await self.match_repository.create_match(match_create_data, club, user)

    async def get_match_by_id(self, match_id: str):
        return await self.match_repository.get_match_by_id(match_id)

    async def get_match_by_user(self, user_id: str):
        return await self.match_repository.get_match_by_user(user_id)

    def get_match_by_club(self):
        pass

    def delete_match_by_id(self):
        pass


class MatchPlayersService:
    def add_player_in_match(self):
        pass

    def remove_player_in_match(self):
        pass

    def change_user_order(self):
        pass


match_service = MatchService()
