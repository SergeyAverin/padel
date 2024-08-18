import { Loading } from "@atoms/index";
import React from "react";
import { ClubPhoto } from "../ClubPhoto/ClubPhoto";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import { useGetGalaryQuery } from "@redux/api/clubApi";

interface IClubPhotosProps {
  clubId: string;
}

export const ClubPhotos: React.FC<IClubPhotosProps> = ({ clubId }) => {
  const { data, isLoading } = useGetGalaryQuery(Number(clubId));
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      )}
      {!isLoading &&
        data &&
        data.map((photo) => (
          <div key={photo.id}>
            <ClubPhoto photo={photo} />
          </div>
        ))}
      {data && data.length == 0 && <EmptyBanner text="Club have not photos" />}
    </div>
  );
};
