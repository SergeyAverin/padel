from asyncio import run
import logging
from tortoise import Tortoise

from core.config.db_settings import data_base_setting
from app import app
from account.models import User
from account.service import user_service


logging.basicConfig(level=logging.WARNING)

DB_PATH = f"postgres://{data_base_setting.postgres_user}:{data_base_setting.postgres_password}@{data_base_setting.postgres_host}/{data_base_setting.postgres_db}"

MODELS = [
    "account.models",
    "friends.models",
    "club.models",
    'match.models',
    "blank.models",
    "aerich.models"
]


async def set_super_user():
    await Tortoise.init(
        db_url=DB_PATH,
        modules={"models": MODELS}
    )
    telegram_id = input('Telegram user_id = ')
    user = await user_service.get_user_by_telegram_user_id(telegram_id)
    if user:
        print('''
1) player
2) club_admin
3) super_admin              
''')
        status = {
            "1": 'player',
            "2": 'club_admin',
            "3": 'super_admin'
        }
        selected_status = input('Selected status: ')
        user.status = status[selected_status]
        user.lvl = 6
        await user.save()
        print('user status updated')
    else:
        print('user not found')
    await Tortoise.close_connections()

run(set_super_user())
