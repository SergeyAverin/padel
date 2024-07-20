import React from "react";

import { IClubPhoto } from "@schemas/club";

interface IClubPhotoProps {
  photo: IClubPhoto;
}

export const ClubPhoto: React.FC<IClubPhotoProps> = ({ photo }) => {
  return (
    <div className="flex justify-center mb-5">
      <img
        className="rounded-2xl w-full h-full object-contain"
        src={photo.photo}
      />
    </div>
  );
};
