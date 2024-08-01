from datetime import datetime

from pydantic import BaseModel

from match.models import StatusEnum
# from club.schemas import Club
# from account.schemas import UserDTO


class MatchDTO(BaseModel):
    # club: Club
    status: StatusEnum

    start_at: datetime
    end_at: datetime
    created_at: datetime
    match_lvl: str

    # owner: User


class MatchCreateDTO(BaseModel):
    start_at: datetime
    end_at: datetime
    club_id: int
    match_lvl: str
    court_id: int
    is_private: bool
    tag_id: int
