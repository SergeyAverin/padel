from logging import getLogger

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi_pagination import Page, paginate

from match.schemas import MatchCreateDTO, MatchDTO
from match.services import match_service
from match.models import StatusEnum
from account.service import user_service
from account.schemas import UserDTO
from account.models import User
from core.dependencies.current_user import get_current_user


logger = getLogger()

match_router = APIRouter(tags=['match'])


@match_router.get('/matches/{club_id}/by_day')
async def get_match_by_day(
    club_id: int,
    month: int,
    day: int,
    user: UserDTO = Depends(get_current_user)
):
    return await match_service.get_match_by_day(day, month, club_id)


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
        "text_user_1": match.text_user_1,
        "text_user_2": match.text_user_2,
        "text_user_3": match.text_user_3,
        "text_user_4": match.text_user_4,
        "selected_court": match.selected_court,
        "id": match.id,
        "first_team_score": match.first_team_score,
        "match_lvl": match.match_lvl,
        "gender": match.gender
    }


@match_router.put('/matches/{match_id}/score')
async def change_match_score(
    match_id: int,
    score: int = Body(),
    team: int = Body(),
    user: UserDTO = Depends(get_current_user)
):
    return await match_service.chage_score(match_id, score, team)


@match_router.put('/matches/{match_id}')
async def set_user_in_match(
    match_id: int,
    user_id: str | None = Body(default=None),
    user_index: int = Body(),
    text_user: str | None = Body(default=None),
    user: UserDTO = Depends(get_current_user)
):
    match = await match_service.get_match_by_id(match_id)
    added_user = await user_service.get_user_by_telegram_user_id(user_id)
    if match.is_private == True:
        if not added_user in await match.user_for_match.all():
            raise HTTPException(
                status_code=403, detail="User not in user_for_match.")
    if not text_user:
        logger.debug(1)
        if user_index == 1:
            logger.debug(added_user)
            match.user_1 = added_user
            match.text_user_1 = None
        elif user_index == 2:
            match.user_2 = added_user
            match.text_user_2 = None
        elif user_index == 3:
            match.user_3 = added_user
            match.text_user_3 = None
        elif user_index == 4:
            match.user_4 = added_user
            match.text_user_4 = None
        elif user_index == -1:
            match.user_4 = None
            match.text_user_1 = None

    if text_user:
        logger.debug(2)
        if user_index == 1:
            logger.debug(text_user)
            match.text_user_1 = text_user
            match.user_1 = None
        elif user_index == 2:
            match.text_user_2 = text_user
            match.user_2 = None
        elif user_index == 3:
            match.text_user_3 = text_user
            match.user_3 = None
        elif user_index == 4:
            match.user_4 = None
            match.text_user_4 = text_user
        elif user_index == -1:
            match.user_4 = None
            match.text_user_1 = None

    await match.save()
    return match


@match_router.put('/matches/{match_id}/status')
async def change_match_status(
    match_id: int,
    status: str = Body(),
    user: UserDTO = Depends(get_current_user)
):
    enum_status = getattr(StatusEnum, status.upper())
    return await match_service.change_match_status(match_id, enum_status)


@match_router.get('/user/{user_id}/matches', tags=['user'])
async def get_match_by_user_id(
    user_id: str,
    user: UserDTO = Depends(get_current_user)
) -> Page[MatchDTO]:
    matches = await match_service.get_match_by_user(user_id)
    return paginate(matches)


@match_router.get('/club/{club_id}/matches', tags=['club'])
async def get_match_by_club_id(
    club_id: int,
    user: UserDTO = Depends(get_current_user)
) -> Page[MatchDTO]:
    matches = await match_service.get_match_by_club(club_id)
    return paginate(matches)


@match_router.get('/friends/{user_id}/matches', tags=['friends'])
async def get_matches_by_user_friends(
    user_id: int,
    user: UserDTO = Depends(get_current_user)
) -> Page[MatchDTO]:
    matches = await match_service.get_match_by_friends(user_id)
    return paginate(matches)


@match_router.get('/bookmark/{user_id}/matches', tags=['bookmark'])
async def get_matches_by_club_bookmarks(
    user_id: int,
    user: UserDTO = Depends(get_current_user)
) -> Page[MatchDTO]:
    matches = await match_service.get_matches_by_club_bookmarks(user_id)
    return paginate(matches)


@match_router.get('/matches/{match_id}/users_for_match')
async def get_user_for_match(
    match_id: int,
    user: UserDTO = Depends(get_current_user)
):
    user_db = await user_service.get_user_by_telegram_user_id(user.telegram_user_id)
    match = await match_service.get_match_by_id(match_id)
    if match.is_private:
        return await match.user_for_match.all()
    else:
        return await user_db.friends.all()
