from logging import getLogger

from fastapi import APIRouter, Body

from join_request.schema import CreateJoinRequset
from join_request.models import JoinRequst
from match.services import match_service
from account.service import user_service

join_requset_api = APIRouter()
logger = getLogger()


@join_requset_api.post('/join_request')
async def create_join_requset(data: CreateJoinRequset):
    match = await match_service.get_match_by_id(data.join_request_match)
    user = await user_service.get_user_by_telegram_user_id(data.join_request_user_tg)
    join_request = JoinRequst()
    join_request.join_request_match = match
    join_request.join_request_user = user
    join_request.index = data.index
    await join_request.save()
    return join_request


@join_requset_api.get('/join_requsets/match/{match_id}')
async def get_join_requsts(match_id: str):
    join_requsts = await JoinRequst.filter(join_request_match__id=match_id).prefetch_related('join_request_user')
    join_requsts = [{
        "join_request_match": await m.join_request_match.first(),
        "index": m.index,
        "join_request_user": m.join_request_user,
        "id": m.id
    } for m in join_requsts]
    return join_requsts


@join_requset_api.delete('/join_requsts/{join_requst_id}')
async def delete_join_requset(join_requst_id: int):
    join_requste = await JoinRequst.get_or_none(id=join_requst_id)
    await join_requste.delete()


@join_requset_api.post('/join_requsts/{join_requst_id}')
async def accept_join_requset(
    join_requst_id: int,
):
    join_requste = await JoinRequst.get_or_none(id=join_requst_id)
    user_index = join_requste.index
    match = await join_requste.join_request_match.first()
    added_user = await join_requste.join_request_user.first()

    await join_requste.delete()

    if user_index == 1:
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

    await match.save()
