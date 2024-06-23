from pydantic import BaseModel, Field

from account.models import Position, Hand


class UserDTO(BaseModel):
    first_name: str
    last_name: str
    username: str
    age: int
    email: str
    telegram_user_id: str

    position: Position = Field(default=Position.BOTH.value)
    hand: Hand = Field(default=Hand.RIGHT_HAND.value)
