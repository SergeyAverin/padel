from datetime import datetime

from tortoise.models import Model
from tortoise import fields


class MatchScore(Model):
    match = fields.ForeignKeyField(
        'models.User',
        on_delete=fields.CASCADE,
        related_name='match_score_match'
    )

    first_team_score = fields.IntField(default=0)
    second_team_score = fields.IntField(default=0)
    created_at = fields.DatetimeField(default=datetime.now)

    class Meta:
        ordering = ["created_at"]
