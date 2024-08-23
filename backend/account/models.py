from enum import Enum

from tortoise import fields
from tortoise.models import Model
from tortoise.contrib.pydantic import pydantic_model_creator

from club.models import Club
from core.config.api_settings import api_setting


class Position(str, Enum):
    LEFT = "left"
    RIGHT = "right"
    BOTH = "both"


class Hand(str, Enum):
    LEFT_HAND = "left_hand"
    RIGHT_HAND = "right_hand"


class UserStatus(str, Enum):
    SUPER_ADMIN = 'super_admin'
    CLUB_ADMIN = 'club_admin'
    PLAYER = 'player'


class Genders(str, Enum):
    MAN = 'man'
    WOMAN = 'woman'
    ANY = 'ANY'


class User(Model):
    first_name = fields.CharField(max_length=255)
    last_name = fields.CharField(max_length=255)
    username = fields.CharField(max_length=255)
    avatar = fields.CharField(
        max_length=255, default=f"https://{api_setting.api_domain}/api/v1.0/user/image/default.png")

    age = fields.SmallIntField()

    email = fields.CharField(max_length=255)

    telegram_user_id = fields.CharField(max_length=255)

    position = fields.CharEnumField(Position, default=Position.BOTH)
    hand = fields.CharEnumField(Hand, default=Hand.RIGHT_HAND)
    status = fields.CharEnumField(UserStatus, default=UserStatus.PLAYER)

    friends: fields.ManyToManyRelation["User"] = fields.ManyToManyField(
        'models.User', on_delete=fields.CASCADE, through="user_friends")

    clubs = fields.ManyToManyField(
        'models.Club', on_delete=fields.CASCADE, through="clubs_bookmarks")

    city = fields.CharField(max_length=255, default='')
    country = fields.CharField(max_length=255, default='')

    lvl = fields.IntField(default=0)
    is_first_open = fields.BooleanField(default=True)

    gender = fields.CharEnumField(Genders, default=Genders.MAN)

    def __str__(self):
        return self.first_name


User_Pydantic = pydantic_model_creator(User)
