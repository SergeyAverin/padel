import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import ClubStore from "@store/club";

export const UploadClubPhoto: React.FC = observer(() => {
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
        ClubStore.uploadAvatar(ClubStore.openedClub.id, formData);
      }
    }
  };
  return (
    <div className="p-5 bg-primary rounded-xl">
      <Heading variant={HeadingVariant.H2}>Club photos</Heading>
      <form className="p-5 bg-primary rounded-xl" onSubmit={onSubmit}>
        <img src={ClubStore.openedClub?.avatar} />
        <div className="mt-5">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="mt-5">
          <Button variant={ButtonVariant.OUTLINED} type="submit">
            Add photo
          </Button>
        </div>
      </form>
    </div>
  );
});