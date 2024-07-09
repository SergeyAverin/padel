from tortoise.models import Model
from tortoise import fields


class Club(Model):
    name = fields.CharField(max_length=130)
    address = fields.CharField(max_length=130)
    registration_address = fields.CharField(max_length=130)
    city = fields.CharField(max_length=130)

    owner = fields.ForeignKeyField('models.User', related_name='club_owner')

    # photos


class ClubPhoto(Model):
    photo = fields.CharField(max_length=150)
    alt = fields.CharField(max_length=150)
    photo_club = fields.ForeignKeyField(
        'models.Club', related_name='club_photo')
