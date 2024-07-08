from logging import getLogger

from tortoise.expressions import Q

from club.schemas import CreateClubDTO
from club.models import Club
from account.models import User
from account.service import user_service


logger = getLogger()


class ClubRepository:
    async def create_club(self, club_data: CreateClubDTO, owner: User):
        club = Club()
        club.name = club_data.name
        club.address = club_data.address
        club.registration_address = club_data.registration_address
        club.city = club_data.city
        club.owner = owner
        await club.save()
        return club

    async def get_club_by_id(self, club_id: int):
        return await Club.get_or_none(id=club_id)

    def delete_club_by_id(self):
        pass

    def edit_club_by_id(self):
        pass

    def filter_by_city(self):
        pass

    def filter_by_name_substring(self):
        pass

    async def filter_clubs(self, name=None, city=None):
        query = Q()

        if name:
            query &= Q(name__icontains=name)
        if city:
            query &= Q(city__icontains=name)

        if query:
            return await Club.filter(query).all()
        else:
            return await Club.all()


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
