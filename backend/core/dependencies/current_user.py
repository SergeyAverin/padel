from logging import getLogger

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from repositories.user_repository import UserMongoDBRepository
from services.user_service import UserService
from utils.jwt_utils import decode_jwt
from exceptions.app_exceptions import DocumentNotFound
from schemas.user_schemas import UserDTO


logger = getLogger()

user_repository = UserMongoDBRepository()
user_service = UserService(user_repository)

http_bearer = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(http_bearer)
) -> UserDTO:
    ''' 
    Получает пользователя из Bearer токена.
    Parameters:
     :param credentials: Bearer токен. 
    Return:
     Авторизированные пользователь, в виде UserDTO
    '''
    try:
        token = credentials.credentials
        payload = decode_jwt(token)
        user = user_service.find_user_by_user_id(payload['sub'])
        return user
    except DocumentNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
