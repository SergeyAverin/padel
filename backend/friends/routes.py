from fastapi import APIRouter, Body

from friends.services import friend_request_service
from account.service import user_service


friend_router = APIRouter(tags=['Friend'])


@friend_router.get('/friend_requests')
async def get_user_friend_request():
    friend_request = await friend_request_service.get_friend_requests_by_user('string')
    return friend_request


@friend_router.post('/friend_requests')
async def create_friend_request(recipient_user_id: str = Body()):
    sender_user_id = 'string'
    await friend_request_service.create_friend_request(sender_user_id, recipient_user_id)
    return {}


@friend_router.get('/friends/{user_id}')
async def get_user_friends(user_id: str):
    user = await user_service.get_user_by_telegram_user_id(user_id)
    return user
