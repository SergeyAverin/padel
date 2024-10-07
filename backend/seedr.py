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
    user = await user_service.get_user_by_telegram_user_id('2')
    if not user:
        user_data = UserDTO(
            first_name='123',
            last_name='123',
            telegram_user_id='123',
            username='123',
            age=18,
            email='',
            status=UserStatus.PLAYER.value,
            hand=Hand.RIGHT_HAND,
            position=Position.BOTH,
            country='',
            city='',
            avatar='',
            lvl=1,
            is_first_open=True,
            id=1
        )
        user = await user_service.create_user(user_data)

    club = await Club.get_or_none(name='test')

    match_create_dto = MatchCreateDTO(
        club_id=club.id,
        court_id=1,
        end_at=datetime.now(),
        gender=Genders.ANY,
        is_private=False,
        match_lvl='1-10',
        start_at=datetime.now(),
        tag_id=2,
    )

    match = await match_service.create_match(match_create_dto, user)

    logging.error(match.id)

run(seedr())
