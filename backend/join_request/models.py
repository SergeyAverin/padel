from tortoise import fields
from tortoise.models import Model


class JoinRequst(Model):
    join_request_match = fields.ForeignKeyField(
        'models.Match', related_name='join_request_match')
    join_request_user = fields.ForeignKeyField(
        'models.User', related_name='join_request_user')
    index = fields.IntField()
