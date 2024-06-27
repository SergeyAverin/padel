from club.schemas import CreateClubDTO
from club.models import Club
from account.models import User


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

    def get_club_by_id(self):
        pass

    def delete_club_by_id(self):
        pass

    def edit_club_by_id(self):
        pass

    def filter_by_city(self):
        pass

    def filter_by_name_substring(self):
        pass


class ClubBookmarkRepository:
    def get_bookmarked_clubs(self):
        pass

    def add_in_bookmark_club(self):
        pass

    def remove_in_bookmark_club(self):
        pass
