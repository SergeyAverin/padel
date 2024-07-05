from fastapi import APIRouter, Body

from match.schemas import MatchCreateDTO
from match.services import match_service
from account.service import user_service


match_router = APIRouter(tags=['match'])


@match_router.post('/matches')
async def create_match(match_create_data: MatchCreateDTO = Body()):
    user = await user_service.get_user_by_telegram_user_id('3')
    return await match_service.create_match(match_create_data, user)


@match_router.get('/matches/{match_id}')
async def get_match(match_id: str):
    return await match_service.get_match_by_id(match_id)
