export interface IClub {
  id: number;
  name: string;
  address: string;
  registration_address: string;
  city: string;
  avatar: string;
  owner_id: number;
}

export interface ICreateClub {
  name: string;
  address: string;
  registration_address: string;
  city: string;
}

export interface IClubPhoto {
  photo: string;
  id: number;
}
