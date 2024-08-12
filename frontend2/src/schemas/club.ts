export interface IClub {
  id: number;
  name: string;
  address: string;
  registration_address: string;
  city: string;
  avatar: string;
  owner_id: number;
  opening: string;
  closing: string;
  country: string;
}

export interface ICreateClub {
  name: string;
  address: string;
  registration_address: string;
  city: string;
  opening: string;
  closing: string;
  country: string;
}

export interface IClubPhoto {
  photo: string;
  id: number;
}
