from fastapi import APIRouter, HTTPException, Body

from account.service import user_service
from account.schemas import UserDTO, UpdateUserDTO
from account.models import Hand, Position, User


profile_router = APIRouter(prefix='/user', tags=['user'])


@profile_router.get('/{telegram_user_id}')
async def get_user(telegram_user_id: str) -> UserDTO:
    user = await user_service.get_user_by_telegram_user_id(telegram_id=telegram_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@profile_router.patch('/{telegram_user_id}')
async def update_user_by_telegram_user_id(
    telegram_user_id: str,
    new_user_data: UpdateUserDTO
) -> UserDTO:
    user = await user_service.update_user_by_user_id(telegram_user_id, new_user_data)
    return user


@profile_router.post('/')
async def create_user(user_data: UserDTO):
    user = await user_service.create_user(user_data)
    return user


@profile_router.patch('/{telegram_user_id}/hand')
async def change_hand(telegram_user_id: str, new_hand: Hand = Body()) -> UserDTO:
    user = await user_service.get_user_by_telegram_user_id(telegram_user_id)
    new_user = await user_service.change_hand(user, new_hand)
    return new_user


@profile_router.patch('/{telegram_user_id}/position')
async def change_position(telegram_user_id: str, new_position: Position = Body()) -> UserDTO:
    user = await user_service.get_user_by_telegram_user_id(telegram_user_id)
    new_user = await user_service.change_position(user, new_position)
    return new_user
