from tortoise.models import Model
from tortoise import fields


class Club(Model):
    name = fields.CharField(max_length=130)
    address = fields.CharField(max_length=130)
    registration_address = fields.CharField(max_length=130)
    city = fields.CharField(max_length=130)

    owner = fields.ForeignKeyField('models.User', related_name='club_owner')

    # photos


class ClubPhoto:
    # alt
    # photo
    pass
