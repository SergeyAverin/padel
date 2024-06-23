from pydantic_settings import BaseSettings


class BotSettings(BaseSettings):
    ''' Настройки телеграмм бота. '''

    bot_token: str  # Токе бота
    bot_web_app: str  # Ссылка на webapp

    class Config:
        case_sensitive = False


bot_settings = BotSettings()
