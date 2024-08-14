import React from "react";

import { UploadImage } from "@molecules/core/UploadImage/UploadImage";
import { IClub } from "@schemas/club";
import { useUpdateClubPhotoMutation } from "@redux/api/clubApi";

interface IUploadClubPhotoFormProps {
  club: IClub;
}

export const UploadClubPhotoForm: React.FC<IUploadClubPhotoFormProps> = ({
  club,
}) => {
  const [uploadPhoto] = useUpdateClubPhotoMutation();
  const onUploadImage = (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      if (club) {
        uploadPhoto({ clubId: club.id, body: formData });
      }
    }
  };

  return (
    <>
      <UploadImage
        defaultPhoto={club.avatar}
        onSubmitPhoto={onUploadImage}
        title="Upload club avatar"
      />
    </>
  );
};
