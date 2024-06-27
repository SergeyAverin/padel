from account.models import User
from club.schemas import CreateClubDTO
from club.repositories import ClubRepository, ClubBookmarkRepository


class ClubService:
    def __init__(self) -> None:
        self.club_repository = ClubRepository()

    async def create_club(self,  club_data: CreateClubDTO, owner: User):
        return await self.club_repository.create_club(club_data, owner)

    async def get_club_by_id(self, club_id: int):
        return await self.club_repository.get_club_by_id(club_id)

    def filter_by_city(self):
        pass

    def filter_by_name_substring(self):
        pass


class ClubBookmarkService:
    def __init__(self) -> None:
        self.club_bookmark_repository = ClubBookmarkRepository()

    async def get_bookmarked_clubs(self, user_id: str):
        return await self.club_bookmark_repository.get_bookmarked_clubs(user_id)

    async def add_in_bookmark_club(self, user_id: str, club_id: int):
        await self.club_bookmark_repository.add_in_bookmark_club(user_id, club_id)

    async def remove_in_bookmark_club(self,  user_id: str, club_id: int):
        await self.club_bookmark_repository.remove_in_bookmark_club(user_id, club_id)


class ClubPhotosService:
    def add_photo(self):
        pass

    def get_club_photos(self):
        pass

    def remove_photo(self):
        pass


club_service = ClubService()
club_bookmark_service = ClubBookmarkService()
