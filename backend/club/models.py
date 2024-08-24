from tortoise.models import Model
from tortoise import fields

from core.config.api_settings import api_setting


class Club(Model):
    name = fields.CharField(max_length=130)
    address = fields.CharField(max_length=130)
    registration_address = fields.CharField(max_length=130)
    city = fields.CharField(max_length=130)
    country = fields.CharField(max_length=130)
    avatar = fields.CharField(
        max_length=255, default=f"https://{api_setting.api_domain}/padel_backend/api/v1.0/club/image/default.png")

    owner = fields.ForeignKeyField('models.User', related_name='club_owner')

    opening = fields.CharField(max_length=6, default="08:00")
    closing = fields.CharField(max_length=6, default="23:00")


class ClubPhoto(Model):
    photo = fields.CharField(max_length=150)
    alt = fields.CharField(max_length=150)
    photo_club = fields.ForeignKeyField(
        'models.Club', related_name='club_photo')


class Court(Model):
    name = fields.CharField(max_length=130)
    club_court = fields.ForeignKeyField(
        'models.Club', related_name='club_court')
