import React, { useState } from "react";
import ClubStore from "@store/club";
import ClubPhoto from "../ClubPhoto";
import { observer } from "mobx-react-lite";
import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";

export const EditClubPhotos: React.FC = observer(() => {
  const deletePhoto = (photoId: number) => {
    if (ClubStore.openedClub) {
      ClubStore.deletePhoto(ClubStore.openedClub?.id, photoId);
    }
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      // UserStore.uploadPhoto("3", formData);
      if (ClubStore.openedClub) {
        ClubStore.uploadPhoto(ClubStore.openedClub.id, formData);
      }
    }
  };
  return (
    <div className="p-5 bg-primary rounded-xl">
      <Heading variant={HeadingVariant.H2}>Club photos</Heading>
      <form className="p-5 bg-primary rounded-xl" onSubmit={onSubmit}>
        <div className="text-[24px] mt-5">Upload avatar:</div>
        <div className="mt-5">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="mt-5">
          <Button variant={ButtonVariant.OUTLINED} type="submit">
            Add photo
          </Button>
        </div>
      </form>
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