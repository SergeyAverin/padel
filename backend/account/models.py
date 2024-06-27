from enum import Enum

from tortoise import fields
from tortoise.models import Model
from tortoise.contrib.pydantic import pydantic_model_creator

from club.models import Club


class Position(str, Enum):
    LEFT = "left"
    RIGHT = "right"
    BOTH = "both"


class Hand(str, Enum):
    LEFT_HAND = "left_hand"
    RIGHT_HAND = "right_hand"


class User(Model):
    first_name = fields.CharField(max_length=255)
    last_name = fields.CharField(max_length=255)
    username = fields.CharField(max_length=255)

    age = fields.SmallIntField()

    email = fields.CharField(max_length=255)

    telegram_user_id = fields.CharField(max_length=255)

    position = fields.CharEnumField(Position, default=Position.BOTH)
    hand = fields.CharEnumField(Hand, default=Hand.RIGHT_HAND)

    friends: fields.ManyToManyRelation["User"] = fields.ManyToManyField(
        'models.User', on_delete=fields.CASCADE, through="user_friends")

    clubs = fields.ManyToManyField(
        'models.Club', on_delete=fields.CASCADE, through="clubs_bookmarks")
    # matches

    def __str__(self):
        return self.first_name


User_Pydantic = pydantic_model_creator(User)
