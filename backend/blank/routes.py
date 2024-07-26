from fastapi import APIRouter, Depends, Body

from blank.service import blank_service
from blank.schemas import CreaetBlankDTO
from account.schemas import UserDTO
from core.dependencies.current_user import get_current_user


blank_router = APIRouter(tags=['Blank'])


@blank_router.get('/match_with_out_blank')
async def match_with_out_blank(
    user: UserDTO = Depends(get_current_user)
):
    matches = await blank_service.get_match_with_out_match(user.telegram_user_id)
    return matches


@blank_router.post('/match/{match_id}/blank')
async def create_blank(
    match_id: int,
    create_blank_data: CreaetBlankDTO = Body(),
    user: UserDTO = Depends(get_current_user)
):
    return await blank_service.create_blank(create_blank_data, user.telegram_user_id, match_id)


@blank_router.get('/match/{match_id}/blank')
async def get_lvl_chagne(
    match_id: int,
    user_number: int,
    user: UserDTO = Depends(get_current_user)
):
    lvl_change = await blank_service.get_blank_change_lvl(match_id, user_number)
    return lvl_change
