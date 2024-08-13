from pydantic import BaseModel

from account.schemas import UserDTO


class CreateClubDTO(BaseModel):
    name: str
    address: str
    # registration_address: str
    city: str
    opening: str
    closing: str
    country: str


class ClubDTO(BaseModel):
    name: str
    address: str
    registration_address: str
    city: str
    country: str
    avatar: str
    owner: UserDTO
    opening: str
    closing: str


class CourtDTO(BaseModel):
    name: str
    club_court: int
