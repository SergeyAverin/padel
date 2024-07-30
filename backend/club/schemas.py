from pydantic import BaseModel


class CreateClubDTO(BaseModel):
    name: str
    address: str
    # registration_address: str
    city: str
    opening: str
    closing: str
