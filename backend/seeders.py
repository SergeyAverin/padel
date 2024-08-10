from tortoise import Tortoise
from asyncio import run

from core.config.db_settings import data_base_setting

from account.service import user_service
from account.schemas import UserDTO
from account.models import Hand, Position

from friends.services import friend_service

from club.services import club_service
from club.schemas import CreateClubDTO

from match.services import match_service
from match.schemas import MatchCreateDTO


TELEGRAM_USER_ID = '339433633'

DB_PATH = f"postgres://{data_base_setting.postgres_user}:{data_base_setting.postgres_password}@{data_base_setting.postgres_host}/{data_base_setting.postgres_db}"

MODELS = [
    "account.models",
    "friends.models",
    "club.models",
    'match.models',
    "blank.models",
    "aerich.models"
]


async def create_seeder():
    await Tortoise.init(
        db_url=DB_PATH,
        modules={"models": MODELS}
    )

    user1 = UserDTO(
        age=21,
        avatar='',
        city='Omsk',
        country='Russia',
        email='safasf@mail.com',
        first_name='Olivia',
        last_name='Wilkins',
        hand=Hand.LEFT_HAND,
        position=Position.BOTH,
        lvl=3,
        status='player',
        telegram_user_id='123132',
        username='OliviaW123'
    )
    await user_service.create_user(user1)

    user2 = UserDTO(
        age=22,
        avatar='',
        city='Omsk',
        country='Russia',
        email='safasf@mail.com',
        first_name='Liam',
        last_name='Fitzgerald',
        hand=Hand.RIGHT_HAND,
        position=Position.LEFT,
        lvl=5,
        status='player',
        telegram_user_id='3425',
        username='LiamFitz_94'
    )
    await user_service.create_user(user2)

    user3 = UserDTO(
        age=24,
        avatar='',
        city='Omsk',
        country='Russia',
        email='safasf@mail.com',
        first_name='Isabella',
        last_name='Morales',
        hand=Hand.RIGHT_HAND,
        position=Position.LEFT,
        lvl=2,
        status='player',
        telegram_user_id='4565',
        username='BellaM_xoxo'
    )
    await user_service.create_user(user3)

    user4 = UserDTO(
        age=24,
        avatar='',
        city='Omsk',
        country='Russia',
        email='safasf@mail.com',
        first_name='Noah',
        last_name='Gutierrez',
        hand=Hand.RIGHT_HAND,
        position=Position.LEFT,
        lvl=2,
        status='player',
        telegram_user_id='456523',
        username='NoahG_007'
    )
    await user_service.create_user(user4)

    user5 = UserDTO(
        age=24,
        avatar='',
        city='Omsk',
        country='Russia',
        email='safasf@mail.com',
        first_name='Sophia',
        last_name='Ramirez',
        hand=Hand.RIGHT_HAND,
        position=Position.LEFT,
        lvl=2,
        status='player',
        telegram_user_id='88934',
        username='SophieR_98'
    )
    await user_service.create_user(user5)

    await friend_service.add_user_friend(user1.telegram_user_id, user2.telegram_user_id)
    await friend_service.add_user_friend(user1.telegram_user_id, user3.telegram_user_id)
    await friend_service.add_user_friend(user3.telegram_user_id, user2.telegram_user_id)
    await friend_service.add_user_friend(user4.telegram_user_id, user2.telegram_user_id)

    await friend_service.add_user_friend(TELEGRAM_USER_ID, user2.telegram_user_id)
    await friend_service.add_user_friend(TELEGRAM_USER_ID, user3.telegram_user_id)
    await friend_service.add_user_friend(TELEGRAM_USER_ID, user4.telegram_user_id)

    club1 = CreateClubDTO(
        address='street1',
        city='Omsk',
        closing='23:00',
        country='Russia',
        name='Club1',
        opening='8:00'
    )
    await club_service.create_club(club1, user1)

    club2 = CreateClubDTO(
        address='street2',
        city='Omsk',
        closing='23:00',
        country='Russia',
        name='Club2',
        opening='8:00'
    )
    await club_service.create_club(club2, user2)

    club3 = CreateClubDTO(
        address='street3',
        city='Omsk',
        closing='23:00',
        country='Russia',
        name='Club3',
        opening='8:00'
    )
    await club_service.create_club(club3, user2)

    await Tortoise.close_connections()

run(create_seeder())
