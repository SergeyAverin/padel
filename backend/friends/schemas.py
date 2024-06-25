from pydantic import BaseModel

from account.schemas import UserDTO


class FriendRequestDTO(BaseModel):
    sender_user: UserDTO
    recipient_user: UserDTO
