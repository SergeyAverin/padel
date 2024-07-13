from logging import getLogger

from fastapi.responses import FileResponse
from fastapi import APIRouter, Body, UploadFile, File, Depends

from club.schemas import CreateClubDTO
from club.services import club_service, club_bookmark_service, club_photo_service
from club.models import Club
from account.service import user_service
from account.schemas import UserDTO
from core.dependencies.current_user import get_current_user


club_routes = APIRouter(tags=['club'], prefix='/club')
logger = getLogger()

# ToDo: удалить этот route


@club_routes.get('/clubs')
async def get_all_clubs(
    name: str | None = None,
    city: str | None = None
):
    return await club_service.filter_club(name, city)


@club_routes.post('/')
async def create_club(
    club_data: CreateClubDTO,
    user: UserDTO = Depends(get_current_user)
):
    user = await user_service.get_user_by_telegram_user_id(user.telegram_user_id)
    club = await club_service.create_club(club_data, user)
    return club


@club_routes.get('/bookmarks', tags=['bookmark'])
async def get_user_bookmarks(
    user: UserDTO = Depends(get_current_user)
):
    clubs = await club_bookmark_service.get_bookmarked_clubs(user.telegram_user_id)
    return clubs


@club_routes.post('/bookmarks', tags=['bookmark'])
async def add_club_in_bookmark(
    user: UserDTO = Depends(get_current_user),
    club_id: int = Body()
):
    await club_bookmark_service.add_in_bookmark_club(user.telegram_user_id, club_id)
    return {'message': 'ok'}


@club_routes.delete('/bookmarks', tags=['bookmark'])
async def remove_club_in_bookmark(
    user: UserDTO = Depends(get_current_user),
    club_id: int = Body()
):
    await club_bookmark_service.remove_in_bookmark_club(user.telegram_user_id, club_id)
    # ToDo: возвращать текущий статус закладки
    return {'message': 'ok'}


@club_routes.get('/{club_id}/is_bookmark')
async def get_bookmarked_clubs(
    club_id: int,
    user: UserDTO = Depends(get_current_user)
):
    is_bookmark = await club_bookmark_service.is_bookmarked_club(user.telegram_user_id, club_id)
    return {'is_bookmark': is_bookmark}


@club_routes.get('/{club_id}')
async def get_club_by_id(
    club_id: int
):
    club = await club_service.get_club_by_id(club_id)
    return club


@club_routes.delete('/{club_id}')
async def delete_club(
    club_id: int,
    user: UserDTO = Depends(get_current_user)
):
    await club_service.delete_club(club_id)


@club_routes.patch('/{club_id}')
async def update_club(
    club_id: int,
    user: UserDTO = Depends(get_current_user),
    new_club_data: CreateClubDTO = Body()
):
    return await club_service.update_club_by_id(club_id, new_club_data)


@club_routes.get('/{club_id}/images', tags=['Image'])
async def get_club_images(
    club_id: int,
    user: UserDTO = Depends(get_current_user)
):
    return await club_photo_service.get_club_images(club_id)


@club_routes.post('/{club_id}/images', tags=['Image'])
async def add_club_images(
    club_id: int,
    user: UserDTO = Depends(get_current_user),
    photo: UploadFile = File()
):
    await club_photo_service.add_photo(club_id, photo)


@club_routes.delete('/{club_id}/images/{image_id}', tags=['Image'])
async def remove_club_images(
    club_id: int,
    image_id: int,
    user: UserDTO = Depends(get_current_user)
):
    await club_photo_service.remove_photo(image_id)


@club_routes.get("/image/{image_path:path}", tags=['Image'])
async def get_image(
    image_path: str,
):
    file_path = f"upload/clubs/{image_path}"
    return FileResponse(file_path)


@club_routes.post("/image/{club_id}", tags=['Image'])
async def change_avatar(
    club_id: str,
    user: UserDTO = Depends(get_current_user),
    photo: UploadFile = File()
):
    await club_photo_service.change_avatar(club_id, photo)
