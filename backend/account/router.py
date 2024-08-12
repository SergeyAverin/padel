from fastapi import APIRouter, HTTPException, Body, File, UploadFile, Depends
from fastapi.responses import FileResponse

from account.service import user_service
from account.schemas import UserDTO, UpdateUserDTO
from account.models import Hand, Position, User
from match.services import match_service
from club.services import club_bookmark_service
from friends.services import friend_service
from core.dependencies.current_user import get_current_user


profile_router = APIRouter(prefix='/user', tags=['user'])


@profile_router.get('/find_user')
async def find_user(username: str, user: UserDTO = Depends(get_current_user)):
    return await User.filter(username__icontains=username.lower(), telegram_user_id__not=user.telegram_user_id)


@profile_router.get('/profile')
def get_profile(
    user: UserDTO = Depends(get_current_user)
):
    return user


@profile_router.patch('/lvl')
async def change_lvl(
    user: UserDTO = Depends(get_current_user),
    lvl: int = Body()
):
    if user.is_first_open:
        return await user_service.change_lvl(user, lvl)
    else:
        return user


@profile_router.get('/stats/{telegram_user_id}')
async def get_stats(
        telegram_user_id: str,
        user: UserDTO = Depends(get_current_user)
):
    clubs = await club_bookmark_service.get_bookmarked_clubs(telegram_user_id)
    friends = await friend_service.get_user_friends(telegram_user_id)
    matches = await match_service.get_match_by_user(telegram_user_id)
    return {
        'clubs_count': len(clubs),
        'friends_count': len(friends),
        'matches_count': len(matches),
    }


@profile_router.get('/{telegram_user_id}')
async def get_user(
    telegram_user_id: str,
    user: UserDTO = Depends(get_current_user)
):
    user = await user_service.get_user_by_telegram_user_id(telegram_id=telegram_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@profile_router.patch('/{telegram_user_id}')
async def update_user_by_telegram_user_id(
    telegram_user_id: str,
    new_user_data: UpdateUserDTO,
    user: UserDTO = Depends(get_current_user)
):
    user_from_db = await user_service.update_user_by_user_id(telegram_user_id, new_user_data)
    return user_from_db


@profile_router.post('/')
async def create_user(
        user_data: UserDTO
):
    user = await user_service.create_user(user_data)
    return user


@profile_router.patch('/{telegram_user_id}/hand')
async def change_hand(
    telegram_user_id: str,
    user: UserDTO = Depends(get_current_user),
    new_hand: Hand = Body()
):
    user = await user_service.get_user_by_telegram_user_id(telegram_user_id)
    new_user = await user_service.change_hand(user, new_hand)
    return {'new_user': 123}


@profile_router.patch('/{telegram_user_id}/position')
async def change_position(
    user: UserDTO = Depends(get_current_user),
    new_position: Position = Body()
):
    user = await user_service.get_user_by_telegram_user_id(user.telegram_user_id)
    new_user = await user_service.change_position(user, new_position)
    return {'new_user': 123}


@profile_router.post('/{telegram_user_id}/upload_photo')
async def upload_photo(
    user: UserDTO = Depends(get_current_user),
    file: UploadFile = File()
):
    return await user_service.upload_user_photo(user.telegram_user_id, file)


@profile_router.get("/image/{image_path:path}")
async def get_image(
    image_path: str
):
    file_path = f"upload/users/{image_path}"
    return FileResponse(file_path)
