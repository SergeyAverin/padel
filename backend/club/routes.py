from fastapi import APIRouter, Body

from club.schemas import CreateClubDTO
from club.services import club_service, club_bookmark_service
from account.service import user_service


club_routes = APIRouter(tags=['club'], prefix='/club')


@club_routes.post('/')
async def create_club(club_data: CreateClubDTO):
    user = await user_service.get_user_by_telegram_user_id('123')
    club = await club_service.create_club(club_data, user)
    return club


@club_routes.get('/bookmarks', tags=['bookmark'])
async def get_user_bookmarks():
    clubs = await club_bookmark_service.get_bookmarked_clubs('123')
    return clubs


@club_routes.post('/bookmarks', tags=['bookmark'])
async def add_club_in_bookmark(club_id: int = Body()):
    await club_bookmark_service.add_in_bookmark_club('123', club_id)
    return {'message': 'ok'}


@club_routes.delete('/bookmarks', tags=['bookmark'])
async def remove_club_in_bookmark(club_id: int = Body()):
    await club_bookmark_service.remove_in_bookmark_club('123', club_id)

    return {'message': 'ok'}


@club_routes.get('/{club_id}')
async def get_club_by_id(club_id: int):
    club = await club_service.get_club_by_id(club_id)
    return club