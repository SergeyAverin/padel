from logging import getLogger
import json
from aiogram.utils.web_app import safe_parse_webapp_init_data


from fastapi import Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from account.service import user_service
from account.schemas import UserDTO
from account.models import UserStatus, Hand, Position
# from authentication.utils import decode_jwt
from core.config.bot_settings import bot_settings


logger = getLogger()


http_bearer = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(http_bearer)
) -> UserDTO:
    ''' 
    Получает пользователя из Bearer токена.
    Parameters:
     :param credentials: Bearer токен. 
    Return:
     Авторизированные пользователь, в виде UserDTO
    '''
    token = credentials.credentials
    user_id = json.loads(token)
    logger.error('token')
    logger.error(token)
    logger.error(user_id)
    try:
        data = safe_parse_webapp_init_data(
            token=bot_settings.bot_token, init_data=user_id['tgWebAppData'])
        user_id = str(data.user.id)
    except ValueError:
        return {'status': status.HTTP_401_UNAUTHORIZED, 'message': 'fail auth'}
    logger.error('uawe id')
    logger.error(user_id)
    user = await user_service.get_user_by_telegram_user_id(user_id)

    if not user:
        user_data = UserDTO(
            first_name=str(data.user.first_name),
            last_name=str(data.user.last_name),
            telegram_user_id=str(data.user.id),
            username=data.user.username,
            age=18,
            email='',
            status=UserStatus.PLAYER.value,
            hand=Hand.RIGHT_HAND,
            position=Position.BOTH,
            country='',
            city='',
            avatar='',
            lvl=1,
            is_first_open=True,
            id=1
        )
        user = await user_service.create_user(user_data)
        user = await user_service.get_user_by_telegram_user_id(user_id)
        return user
    return user
