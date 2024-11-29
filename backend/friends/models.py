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


class Tag(Model):
    name = fields.CharField(max_length=150)
    friends_with_tag: fields.ManyToManyRelation["User"] = fields.ManyToManyField(
        'models.User', on_delete=fields.CASCADE, through="friends_with_tag")
    tag_owner = fields.ForeignKeyField('models.User', related_name='tag_owner')
