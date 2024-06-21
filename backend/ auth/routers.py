from logging import getLogger
from aiogram.utils.web_app import safe_parse_webapp_init_data
from fastapi import APIRouter, status, Body

from services.user_service import user_service
from utils.jwt_utils import encode_jwt
from utils.generate_code import generate_code
from schemas.user_schemas import UserDTO
from config.bot_setting import bot_settings
from exceptions.app_exceptions import DocumentNotFound


auth_router = APIRouter(prefix='/auth', tags=['Auth'])

logger = getLogger()


@auth_router.post('/login')
def login_jwt(user_id: str = Body()):
    try:
        data = safe_parse_webapp_init_data(
            token=bot_settings.bot_token, init_data=user_id)
        user_id = str(data.user.id)
    except ValueError:
        return {'status': status.HTTP_401_UNAUTHORIZED, 'message': 'fail auth'}
    user = None
    try:
        user = user_service.find_user_by_user_id(user_id)
    except DocumentNotFound:
        user = UserDTO(
            nickname='anonim',
            user_id=user_id,
            user_code=generate_code(4),
            type='user'
        )
        user = user_service.create_user(user)
    if user:
        payload = {
            "sub": user.user_id
        }
        jwt_token = encode_jwt(payload)

        return {'access_token': jwt_token}
    else:
        return {'status': status.HTTP_401_UNAUTHORIZED, 'message': 'fail auth'}
