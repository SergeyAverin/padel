from logging import getLogger

from tortoise.expressions import Q
from fastapi import UploadFile

from club.schemas import CreateClubDTO
from club.models import Club, ClubPhoto, Court
from account.models import User
from account.service import user_service
from core.config.api_settings import api_setting


logger = getLogger()


class ClubRepository:
    async def create_club(self, club_data: CreateClubDTO, owner: User):
        club = Club()
        club.name = club_data.name
        club.address = club_data.address
        club.registration_address = '_'
        club.city = club_data.city
        club.owner = owner
        club.opening = club_data.opening
        club.closing = club_data.closing
        club.country = club_data.country
        await club.save()
        return club

    async def get_club_by_id(self, club_id: int):
        return await Club.get_or_none(id=club_id)

    async def delete_club_by_id(self, club_id: str):
        club = await self.get_club_by_id(club_id)
        await club.delete()

    def edit_club_by_id(self):
        pass

    def filter_by_city(self):
        pass

    def filter_by_name_substring(self):
        pass

    async def filter_clubs(self, name=None, city=None):
        query = Q()

        if name:
            query &= Q(name__icontains=name.lower())
        if city:
            query &= Q(city__icontains=city.lower())

        if query:
            return await Club.filter(query).all()
        else:
            return await Club.all()

    async def update_club_by_id(self, club_id: int, new_club_data: CreateClubDTO):
        old_club = await Club.get_or_none(id=club_id)
        old_club.name = new_club_data.name
        old_club.city = new_club_data.city
        old_club.address = new_club_data.address
        old_club.registration_address = '_'
        old_club.opening = new_club_data.opening
        old_club.closing = new_club_data.closing

        await old_club.save()
        return old_club


class ClubBookmarkRepository:
    def __init__(self) -> None:
        self.club_repository = ClubRepository()

    async def get_bookmarked_clubs(self, user_id: str):
        user = await user_service.get_user_by_telegram_user_id(user_id)
        return await user.clubs.all()

    async def add_in_bookmark_club(self, user_id: str, club_id: int):
        user = await user_service.get_user_by_telegram_user_id(user_id)
        club = await self.club_repository.get_club_by_id(club_id)

        await user.clubs.add(club)

        await user.save()

    async def remove_in_bookmark_club(self, user_id: str, club_id: int):
        user = await user_service.get_user_by_telegram_user_id(user_id)
        club = await self.club_repository.get_club_by_id(club_id)

        await user.clubs.remove(club)

        await user.save()


class ClubPhotoRepository:
    async def get_club_images(self, club_id: int):
        return await ClubPhoto.filter(photo_club__id=club_id)

    async def add_club_image(self, club_id: int, file: UploadFile):
        path = f"https://{api_setting.api_domain}/padel_backend/api/v1.0/club/image/{club_id}_{file.filename}"
        image = ClubPhoto()
        image.alt = 'image'
        image.photo = path

        with open(f'upload/clubs/{club_id}_{file.filename}', "wb") as f:
            contents = await file.read()
            f.write(contents)

        club_repository = ClubRepository()
        club = await club_repository.get_club_by_id(club_id)
        image.photo_club = club
        await image.save()

    async def change_avatar(self, club_id: int, file: UploadFile):
        path = f"https://{api_setting.api_domain}/padel_backend/api/v1.0/club/image/{club_id}_{file.filename}"
        club = await Club.get_or_none(id=club_id)
        club.avatar = path
        await club.save()

        with open(f'upload/clubs/{club_id}_{file.filename}', "wb") as f:
            contents = await file.read()
            f.write(contents)

    async def remove_club_image(self, image_id: int):
        photo = await ClubPhoto.get_or_none(id=image_id)
        await photo.delete()


class CourtRepository:
    async def get_court_by_club(self, club_id: int):
        return await Court.filter(club_court__id=club_id)

    async def add_court(self, club: Club, court_name: str):
        court = Court()
        court.name = court_name
        court.club_court = club
        await court.save()
        return court

    async def remove_court(self, court_id: int):
        court = await Court.get_or_none(id=court_id)
        await court.delete()

    async def get_court_by_id(self, court_id):
        return await Court.get_or_none(id=court_id)
