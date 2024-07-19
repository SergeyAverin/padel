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

    selected_court = fields.ForeignKeyField(
        'models.Court', related_name='selected_court')

    # players
    # result
    # owner
