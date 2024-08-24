from pydantic import BaseModel, Field

from account.models import Position, Hand, Genders
from core.config.api_settings import api_setting


class UserDTO(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    age: int
    email: str
    telegram_user_id: str
    city: str
    country: str
    status: str
    is_first_open: bool

    avatar: str = Field(
        default=f"https://{api_setting.api_domain}/padel_backend/api/v1.0/user/image/default.png")

    position: Position = Field(default=Position.BOTH.value)
    hand: Hand = Field(default=Hand.RIGHT_HAND.value)

    lvl: int


class UpdateUserDTO(BaseModel):
    first_name: str
    last_name: str
    username: str
    age: int
    email: str
    city: str
    country: str
    gender: Genders = Field(default=Genders.MAN.value)
