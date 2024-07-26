from tortoise import fields
from tortoise.models import Model


class Blank(Model):
    match = fields.ForeignKeyField('models.Match', related_name='blank_match')
    owner = fields.ForeignKeyField('models.User', related_name='blank_owner')

    user_1 = fields.IntField(default=0)
    user_2 = fields.IntField(default=0)
    user_3 = fields.IntField(default=0)
    user_4 = fields.IntField(default=0)
