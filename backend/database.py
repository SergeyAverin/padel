from core.config.db_settings import data_base_setting

DB_PATH = f"postgres://{data_base_setting.postgres_user}:{data_base_setting.postgres_password}@{data_base_setting.postgres_host}/{data_base_setting.postgres_db}"

TORTOISE_ORM = {
    "connections": {
        "default": DB_PATH
    },
    "apps": {
        "contact": {
            "models": [
                "account.models",
                "aerich.models"
            ],
            "default_connection": "default",
        },
    },
}
