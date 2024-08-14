import React from "react";
import ClubPhoto from "../ClubPhoto";
import { Button, ButtonVariant } from "@atoms/index";
import HelpBanner from "@organisms/core/HelpBanner";
import { UploadImage } from "@molecules/core/UploadImage/UploadImage";
import { IClub } from "@schemas/club";
import {
  useAddClubPhotoMutation,
  useDeleteClubPhotoMutation,
} from "@redux/api/clubPhotosApi";
import { useGetGalaryQuery } from "@redux/api/clubApi";

interface IEditClubPhotosProps {
  club: IClub;
}

export const EditClubPhotos: React.FC<IEditClubPhotosProps> = ({ club }) => {
  const [deletePhotoMutation] = useDeleteClubPhotoMutation();
  const deletePhoto = (photoId: number) => {
    deletePhotoMutation({
      clubId: club.id,
      photoId: photoId,
    });
  };
  const { data } = useGetGalaryQuery(club.id);

  const [uploadPhoto] = useAddClubPhotoMutation();
  const onUploadImage = (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      uploadPhoto({ clubId: club.id, form: formData });
    }
  };

  return (
    <>
      <div className="mb-3">
        <HelpBanner localStorageKey="help_add_club_photo">
          Here you can add photos of your club
        </HelpBanner>
      </div>
      <UploadImage onSubmitPhoto={onUploadImage} title="Add club image" />

      {data &&
        data
          .slice(0)
          .reverse()
          .map((photo) => (
            <div key={photo.id} className="mt-5 relative">
              <ClubPhoto photo={photo} />
              <div className="absolute left-[10px] bottom-[10px]">
                <Button
                  variant={ButtonVariant.DANGER}
                  onClick={() => deletePhoto(photo.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
    </>
  );
};
