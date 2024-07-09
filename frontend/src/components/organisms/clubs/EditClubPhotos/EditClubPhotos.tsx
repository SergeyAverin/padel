import React from "react";
import ClubStore from "@store/club";
import ClubPhoto from "../ClubPhoto";
import { observer } from "mobx-react-lite";
import { Heading, HeadingVariant } from "@atoms/index";

export const EditClubPhotos: React.FC = observer(() => {
  const deletePhoto = (photoId: number) => {
    if (ClubStore.openedClub) {
      ClubStore.deletePhoto(ClubStore.openedClub?.id, photoId);
    }
  };
  return (
    <div className="p-5 bg-primary rounded-xl">
      <Heading variant={HeadingVariant.H2}>Club photos</Heading>
      {ClubStore.clubPhotos.map((photo) => (
        <div key={photo.id} className="mt-5 relative">
          <ClubPhoto photo={photo} />
          <div
            className="absolute right-[10px] bottom-[10px] text-error"
            onClick={() => deletePhoto(photo.id)}
          >
            Delete
          </div>
        </div>
      ))}
    </div>
  );
});
