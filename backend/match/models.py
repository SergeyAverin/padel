from enum import Enum
from datetime import datetime

from tortoise import fields
from tortoise.models import Model


class StatusEnum(Enum):
    EXPECTATION = 'expectation'
    PLAYED = 'played'
    DONE = 'done'


class Match(Model):
    club = fields.ForeignKeyField('models.Club', related_name='match_club')
    status = fields.CharEnumField(StatusEnum, default=StatusEnum.EXPECTATION)

    start_at = fields.DatetimeField()
    end_at = fields.DatetimeField()
    created_at = fields.DatetimeField(default=datetime.now())

    owner = fields.ForeignKeyField('models.User', related_name='match_owner')

    user_1 = fields.ForeignKeyField(
        'models.User', related_name='user_1', default=None, null=True)
    user_2 = fields.ForeignKeyField(
        'models.User', related_name='user_2', default=None, null=True)
    user_3 = fields.ForeignKeyField(
        'models.User', related_name='user_3', default=None, null=True)
    user_4 = fields.ForeignKeyField(
        'models.User', related_name='user_4', default=None, null=True)

    text_user_1 = fields.CharField(max_length=140, null=True)
    text_user_2 = fields.CharField(max_length=140, null=True)
    text_user_3 = fields.CharField(max_length=140, null=True)
    text_user_4 = fields.CharField(max_length=140, null=True)

    match_lvl = fields.CharField(max_length=255, default='1-2')

    first_team_score = fields.IntField(default=0)
    second_team_score = fields.IntField(default=0)

    is_private = fields.BooleanField(default=False)
    user_for_match = fields.ManyToManyField(
        'models.User', on_delete=fields.CASCADE, through="user_for_match")

    selected_court = fields.ForeignKeyField(
        'models.Court', related_name='selected_court')
