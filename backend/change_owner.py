import logging
from datetime import datetime
from asyncio import run

from tortoise import Tortoise

from account.models import UserStatus, Hand, Position
from account.service import user_service
from account.schemas import UserDTO, Genders
from match.services import match_service
from club.services import club_service
from club.schemas import ClubDTO
from club.models import Club
from match.services import match_service
from match.schemas import MatchCreateDTO

from core.config.db_settings import data_base_setting
from app import app
from account.models import User
from account.service import user_service
from match.models import Match


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


async def seedr():
    await Tortoise.init(
        db_url=DB_PATH,
        modules={"models": MODELS}
    )
    match_id = input('match id = ')
    match = await Match.get_or_none(id=match_id)

    telegram_id = input('telegram_id = ')
    user = await user_service.get_user_by_telegram_user_id(telegram_id)
    match.owner = user
    await match.save()
    logging.error(match.id)

run(seedr())
# {"detail":[{"type":"missing","loc":["body","join_request_user_tg"],"msg":"Field required","input":{"index":1,"join_request_match":8,"join_request_user":"339433633"}}]}
