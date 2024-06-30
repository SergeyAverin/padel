from fastapi import APIRouter, Body

from friends.services import friend_request_service, friend_service
from account.service import user_service


friend_router = APIRouter(tags=['friend'])


@friend_router.get('/friend_requests')
async def get_user_friend_request():
    friend_request = await friend_request_service.get_friend_requests_by_user('string')
    return friend_request


@friend_router.post('/friend_requests')
async def create_friend_request(recipient_user_id: str = Body()):
    sender_user_id = 'string'
    # ToDo: Защита от повторного создание
    # ToDo: Добавление в друзья если получатель тоже отправил запрос
    request = await friend_request_service.create_friend_request(sender_user_id, recipient_user_id)
    return request


@friend_router.get('/friend/{first_user_id}/{second_user_id}')
async def get_user_relation_status(first_user_id: str, second_user_id: str):
    status = await friend_service.get_user_relation_status(first_user_id, second_user_id)
    return status


@friend_router.get('/friends/{user_id}')
async def get_user_friends(user_id: str):
    user_friends = await friend_service.get_user_friends(user_id)
    return user_friends


@friend_router.post('/friend_requests/{friend_requests_id}/accept')
async def accept_friend_request(friend_requests_id: int):
    await friend_request_service.accept_friend_request(friend_requests_id)
    return {'message': 'ok'}


@friend_router.post('/friend_requests/{friend_requests_id}/reject')
async def reject_friend_request(friend_requests_id: int):
    await friend_request_service.reject_friend_request(friend_requests_id)
    return {'message': 'ok'}


@friend_router.post('/friend_requests/{friend_requests_id}/cancel')
async def cancel_friend_request(friend_requests_id: int):
    await friend_request_service.cancel_friend_request(friend_requests_id)
    return {'message': 'ok'}


@friend_router.post('/user/{user_id}/friend', tags=['user', 'friend'])
async def add_friend(user_id: str, recipient_id: str = Body()):
    await friend_service.add_user_friend(user_id, recipient_id)
    return {'message': 'ok'}


@friend_router.delete('/user/{user_id}/friend', tags=['user', 'friend'])
async def remove_friend(user_id: str, recipient_id: str = Body()):
    await friend_service.remove_user_friend(user_id, recipient_id)
    return {'message': 'ok'}
