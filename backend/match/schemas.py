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

    # owner: User


class MatchCreateDTO(BaseModel):
    start_at: datetime
    end_at: datetime
    club_id: int
    court_id: int
