import { Loading } from "@atoms/index";
import React from "react";
import { ClubPhoto } from "../ClubPhoto/ClubPhoto";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import ClubStore from "@store/clubs/club";
import { observer } from "mobx-react-lite";

export const ClubPhotos: React.FC = observer(() => {
  return (
    <div>
      {ClubStore.isLoadingGallery && (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      )}
      {ClubStore.clubPhotos.map((photo) => (
        <div key={photo.id}>
          <ClubPhoto photo={photo} />
        </div>
      ))}
      {ClubStore.clubPhotos.length == 0 && (
        <EmptyBanner text="Club have not photos" />
      )}
    </div>
  );
});
