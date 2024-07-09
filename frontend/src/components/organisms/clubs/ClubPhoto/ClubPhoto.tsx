import React from "react";

import { IClubPhoto } from "@schemas/club";

interface IClubPhotoProps {
  photo: IClubPhoto;
}

export const ClubPhoto: React.FC<IClubPhotoProps> = ({ photo }) => {
  return (
    <>
      <img src={photo.photo} />
    </>
  );
};
