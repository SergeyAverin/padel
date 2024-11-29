from pydantic import BaseModel


class CreateJoinRequset(BaseModel):
    join_request_match: int
    join_request_user_tg: str
    index: int
