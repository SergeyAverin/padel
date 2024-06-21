from pydantic import BaseModel


class UserDTO(BaseModel):
    first_name: str
    last_name: str
    username: str
    age: int
    email: str
    telegram_user_id: str
