from typing import List

from pydantic_settings import BaseSettings


class ApiSettings(BaseSettings):
    ''' Основные настройки API. '''
    api_host: str  # Хост API, например 0.0.0.0
    api_domain: str  # Домен api
    api_port: int  # Порт на котором работает API
    api_reload: bool = True  # Перезагружать сервер
    api_is_debug: bool = False  # Запущенно ли приложение в режиме разработке
    api_workers_count: int = 1  # Количество запущенных worker
    api_frontend_domain: str  # Домен клиентской части, для CORS заголовков

    api_max_tasks_count: int = 4

    @property
    def origins(self) -> List[str]:
        ''' Возвращает origins для cors заголовков '''
        origins = [
            f"http://{self.api_host}:{self.api_port}",
            f"http://{self.api_domain}:{self.api_port}",
            self.api_frontend_domain,
            'http://127.0.0.1:3000',
            "https://padel-sand.vercel.app"
        ]
        return origins

    class Config:
        case_sensitive = False


api_setting = ApiSettings()
