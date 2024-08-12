from logging import getLogger
import json
from aiogram.utils.web_app import safe_parse_webapp_init_data


from fastapi import Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from account.service import user_service
from account.schemas import UserDTO
from authentication.utils import decode_jwt
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

    try:
        data = safe_parse_webapp_init_data(
            token=bot_settings.bot_token, init_data=user_id['tgWebAppData'])
        user_id = str(data.user.id)
    except ValueError:
        return {'status': status.HTTP_401_UNAUTHORIZED, 'message': 'fail auth'}

    user = await user_service.get_user_by_telegram_user_id(user_id)
    return user
