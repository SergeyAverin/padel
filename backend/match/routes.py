from logging import getLogger

from fastapi import APIRouter, Body, Depends

from match.schemas import MatchCreateDTO
from match.services import match_service
from match.models import StatusEnum
from account.service import user_service
from account.schemas import UserDTO
from account.models import User
from core.dependencies.current_user import get_current_user


logger = getLogger()

match_router = APIRouter(tags=['match'])


@match_router.get('/matches/clubs')
async def get_club_for_match(
    user: UserDTO = Depends(get_current_user)
):
    return await match_service.get_club_for_match(user)


@match_router.post('/matches')
async def create_match(
    match_create_data: MatchCreateDTO = Body(),
    auth_user: UserDTO = Depends(get_current_user)
):
    user = await user_service.get_user_by_telegram_user_id(auth_user.telegram_user_id)
    return await match_service.create_match(match_create_data, user)


@match_router.get('/matches/{match_id}')
async def get_match(
    match_id: int,
    user: UserDTO = Depends(get_current_user)
):
    match = await match_service.get_match_by_id(match_id)
    return {
        "club": match.club,
        "status": match.status,
        "start_at": match.start_at,
        "end_at": match.end_at,
        "created_at": match.created_at,
        "owner": match.owner,
        "user_1": match.user_1,
        "user_2": match.user_2,
        "user_3": match.user_3,
        "user_4": match.user_4,
        "selected_court": match.selected_court,
        "id": match.id
    }


@match_router.put('/matches/{match_id}')
async def set_user_in_match(
    match_id: int,
    user_id: str = Body(),
    user_index: int = Body(),
    user: UserDTO = Depends(get_current_user)
):
    match = await match_service.get_match_by_id(match_id)
    added_user = await user_service.get_user_by_telegram_user_id(user_id)
    if user_index == 1:
        match.user_1 = added_user
    elif user_index == 2:
        match.user_2 = added_user
    elif user_index == 3:
        match.user_3 = added_user
    elif user_index == 4:
        match.user_4 = added_user
    elif user_index == -1:
        match.user_4 = None
    await match.save()
    return match


@match_router.put('/matches/{match_id}/status')
async def change_match_status(
    match_id: int,
    status: StatusEnum = Body(),
    user: UserDTO = Depends(get_current_user)
):
    logger.debug(status)
    return await match_service.change_match_status(match_id, status)


@match_router.get('/user/{user_id}/matches', tags=['user'])
async def get_match_by_user_id(
    user_id: str,
    user: UserDTO = Depends(get_current_user)
):
    return await match_service.get_match_by_user(user_id)


@match_router.get('/club/{club_id}/matches', tags=['club'])
async def get_match_by_club_id(
    club_id: int,
    user: UserDTO = Depends(get_current_user)
):
    return await match_service.get_match_by_club(club_id)


@match_router.get('/friends/{user_id}/matches', tags=['friends'])
async def get_matches_by_user_friends(
    user_id: int,
    user: UserDTO = Depends(get_current_user)
):
    return await match_service.get_match_by_friends(user_id)


@match_router.get('/bookmark/{user_id}/matches', tags=['bookmark'])
async def get_matches_by_club_bookmarks(
    user_id: int,
    user: UserDTO = Depends(get_current_user)
):
    return await match_service.get_matches_by_club_bookmarks(user_id)
