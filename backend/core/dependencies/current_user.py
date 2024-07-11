from logging import getLogger

from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from account.service import user_service
from authentication.utils import decode_jwt
from account.schemas import UserDTO


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
    payload = decode_jwt(token)
    user = await user_service.get(payload['sub'])
    return user
