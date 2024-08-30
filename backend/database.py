from fastapi import FastAPI
from tortoise import Tortoise
from tortoise.contrib.fastapi import register_tortoise

from core.config.db_settings import data_base_setting

DB_PATH = f"postgres://{data_base_setting.postgres_user}:{data_base_setting.postgres_password}@{data_base_setting.postgres_host}/{data_base_setting.postgres_db}"

MODELS = [
    "account.models",
    "friends.models",
    "club.models",
    'match.models',
    "blank.models",
    'join_request.models',
    "match_score.models",
    "aerich.models"
]

TORTOISE_ORM = {
    "connections": {
        "default": DB_PATH
    },
    "apps": {
        "models": {
            "models": MODELS,
            "default_connection": "default",
        },
    },
}


def init_db(app: FastAPI) -> None:
    register_tortoise(
        app,
        db_url=DB_PATH,
        modules={"models": MODELS},
        generate_schemas=False,
        add_exception_handlers=True,
    )
