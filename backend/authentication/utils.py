from typing import Any, Union, Dict
from logging import getLogger
from datetime import datetime, timedelta

from jose import jwt

from core.config.auth_settings import auth_setting


logger = getLogger()


def encode_jwt(
    payload: dict,
    private_key: str = '3',
    algorithm: str = 'HS256',
    expire_minutes: int = 1440
) -> str:
    ''' 
    Генерирует jwt токен.
    Parameters:
     :param payload: данные которые будут храниться в jwt токене. 
     :param private_key: приватный ключ шифрования
     :param algorithm: алгоритм шифрования jwt токена, значение по умолчанию HS256
     :param expire_minutes: время жизни jwt токена в минутах, значение по умолчанию 3
    Return:
     Строка с jwt токеном
    '''
    payload = payload.copy()
    now = datetime.now()
    expire = now + timedelta(minutes=expire_minutes)
    ito = now.isoformat()
    expire = expire.isoformat()

    payload.update(ito=ito, expire=expire)

    encoded = jwt.encode(payload, private_key, algorithm=algorithm)

    return encoded


def decode_jwt(
    jwt_token: Union[str, bytes],
    public_key: str = '3',
    algorithm: str = 'HS256'
) -> Dict[str, Any]:
    ''' 
    Декодирует jwt токен.
    Parameters:
     :param jwt_token: jwt токен 
     :param public_key: публичный ключ шифрования
     :param algorithm: алгоритм шифрования jwt токена, значение по умолчанию HS256
    Return:
     Возвращает dict с данными из jwt токена
    '''

    decoded = jwt.decode(jwt_token, public_key, algorithms=algorithm)

    return decoded
