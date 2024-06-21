from tortoise import fields
from tortoise.models import Model
from tortoise.contrib.pydantic import pydantic_model_creator


class User(Model):
    first_name = fields.CharField(max_length=255)
    last_name = fields.CharField(max_length=255)
    username = fields.CharField(max_length=255)

    age = fields.SmallIntField()

    email = fields.CharField(max_length=255)

    telegram_user_id = fields.CharField(max_length=255)

    def __str__(self):
        return self.first_name


User_Pydantic = pydantic_model_creator(User)
