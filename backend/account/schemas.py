from pydantic import BaseModel, Field

from account.models import Position, Hand
from core.config.api_settings import api_setting


class UserDTO(BaseModel):
    first_name: str
    last_name: str
    username: str
    age: int
    email: str
    telegram_user_id: str
    city: str
    country: str

    avatar: str = Field(
        default=f"http://{api_setting.api_domain}/api/v1.0/user/image/default.png")

    position: Position = Field(default=Position.BOTH.value)
    hand: Hand = Field(default=Hand.RIGHT_HAND.value)


class UpdateUserDTO(BaseModel):
    first_name: str
    last_name: str
    username: str
    age: int
    email: str
    city: str
    country: str
