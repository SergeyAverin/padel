from fastapi import APIRouter

from club.schemas import CreateClubDTO
from club.services import club_service
from account.service import user_service


club_routes = APIRouter(tags=['club'], prefix='/club')


@club_routes.post('/')
async def create_club(club_data: CreateClubDTO):
    user = await user_service.get_user_by_telegram_user_id('123')
    club = await club_service.create_club(club_data, user)
    return club


@club_routes.get('/{club_id}')
async def get_club_by_id(club_id: int):
    club = await club_service.get_club_by_id(club_id)
    return club
