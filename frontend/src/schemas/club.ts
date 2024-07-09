export interface IClub {
  id: number;
  name: string;
  address: string;
  registration_address: string;
  city: string;
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
