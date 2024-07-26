from fastapi import APIRouter, Depends

from blank.service import blank_service
from account.schemas import UserDTO
from core.dependencies.current_user import get_current_user


blank_router = APIRouter(tags=['Blank'])


@blank_router.get('/match_with_out_blank')
async def match_with_out_blank(
    user: UserDTO = Depends(get_current_user)
):
    matches = await blank_service.get_match_with_out_match(user.telegram_user_id)
    return matches
