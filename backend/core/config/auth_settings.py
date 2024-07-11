from pydantic_settings import BaseSettings


class AuthSettings(BaseSettings):
    ''' Настройки авторизации. '''

    auth_public_key: str  # Публичный ключ шифрования JWT токена
    auth_privet_key: str  # Приватный ключ шифрования JWT токена
    auth_algorithm: str  # Алгоритм шифрования JWT токена

    class Config:
        case_sensitive = False


auth_setting = AuthSettings()
