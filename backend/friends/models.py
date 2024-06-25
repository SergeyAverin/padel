from tortoise.models import Model
from tortoise import fields


class FriendRequest(Model):
    sender_user = fields.ForeignKeyField(
        'models.User',
        on_delete=fields.CASCADE,
        related_name='friend_request_sender_user'
    )
    recipient_user = fields.ForeignKeyField(
        'models.User',
        on_delete=fields.CASCADE
    )
