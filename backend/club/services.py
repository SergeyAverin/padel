from logging import getLogger

from fastapi import UploadFile

from account.models import User
from club.schemas import CreateClubDTO
from club.repositories import ClubRepository, ClubBookmarkRepository, ClubPhotoRepository


logger = getLogger()


class ClubService:
    def __init__(self) -> None:
        self.club_repository = ClubRepository()

    async def create_club(self,  club_data: CreateClubDTO, owner: User):
        club = await self.club_repository.create_club(club_data, owner)
        club_bookmark_service.add_in_bookmark_club(
            owner.telegram_user_id, club.id)
        return club

    async def get_club_by_id(self, club_id: int):
        return await self.club_repository.get_club_by_id(club_id)

    def filter_by_city(self):
        pass

    def filter_by_name_substring(self):
        pass

    async def delete_club(self, club_id: int):
        return await self.club_repository.delete_club_by_id(club_id)

    async def filter_club(self, name=None, city=None):
        return await self.club_repository.filter_clubs(name, city)

    async def update_club_by_id(self, club_id: int, new_club_data: CreateClubDTO):
        return await self.club_repository.update_club_by_id(club_id, new_club_data)


class ClubBookmarkService:
    def __init__(self) -> None:
        self.club_bookmark_repository = ClubBookmarkRepository()

    async def get_bookmarked_clubs(self, user_id: str):
        return await self.club_bookmark_repository.get_bookmarked_clubs(user_id)

    async def add_in_bookmark_club(self, user_id: str, club_id: int):
        await self.club_bookmark_repository.add_in_bookmark_club(user_id, club_id)

    async def remove_in_bookmark_club(self,  user_id: str, club_id: int):
        await self.club_bookmark_repository.remove_in_bookmark_club(user_id, club_id)

    async def is_bookmarked_club(self, user_id: str, club_id: int):
        is_bookmark = False
        clubs = await self.club_bookmark_repository.get_bookmarked_clubs(user_id)
        for club in clubs:
            if club.id == club_id:
                is_bookmark = True
        return is_bookmark


class ClubPhotosService:
    def __init__(self) -> None:
        self.club_photo_repository = ClubPhotoRepository()

    async def add_photo(self, club_id: int, photo: UploadFile):
        return await self.club_photo_repository.add_club_image(club_id, photo)

    async def get_club_images(self, club_id: int):
        return await self.club_photo_repository.get_club_images(club_id)

    async def remove_photo(self, image_id: int):
        await self.club_photo_repository.remove_club_image(image_id)

    async def change_avatar(self, club_id: int, file: UploadFile):
        await self.club_photo_repository.change_avatar(club_id, file)


club_service = ClubService()
club_bookmark_service = ClubBookmarkService()
club_photo_service = ClubPhotosService()
