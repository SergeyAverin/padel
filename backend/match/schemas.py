from datetime import datetime

from pydantic import BaseModel

from match.models import StatusEnum
from club.schemas import ClubDTO, CourtDTO
from account.schemas import UserDTO


class MatchDTO(BaseModel):
    club: ClubDTO
    status: StatusEnum

    start_at: datetime
    end_at: datetime
    created_at: datetime

    owner: UserDTO

    user_1: UserDTO | None
    user_2: UserDTO | None
    user_3: UserDTO | None
    user_4: UserDTO | None

    match_lvl: str

    text_user_1: str | None
    text_user_2: str | None
    text_user_3: str | None
    text_user_4: str | None

    is_private: bool
    user_for_match: UserDTO

    selected_court: CourtDTO


class MatchCreateDTO(BaseModel):
    start_at: datetime
    end_at: datetime
    club_id: int
    match_lvl: str
    court_id: int
    is_private: bool
    tag_id: int
