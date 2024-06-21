from typing import List

from pydantic_settings import BaseSettings


class DataBaseSettings(BaseSettings):
    ''' Настройки базы данных PostgreSQL. '''
    postgres_db: str  # Название бд
    postgres_user: str  # Пользователь БД
    postgres_password: str  # Пароль пользователя
    postgres_host: str  # Хост бд

    class Config:
        case_sensitive = False


data_base_setting = DataBaseSettings()
