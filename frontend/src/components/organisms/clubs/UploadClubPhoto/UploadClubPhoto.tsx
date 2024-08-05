import {
  Button,
  ButtonVariant,
  Heading,
  HeadingVariant,
  Loading,
} from "@atoms/index";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import ClubStore from "@store/club";
import FileIcon from "@assets/FileIcon.svg?react";
// import HelpBanner from "@organisms/HelpBanner";

export const UploadClubPhoto: React.FC = observer(() => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
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
        setIsLoading(true);
        setSelectedFile(null);
      }
    }
  };
  useEffect(() => {
    setIsLoading(false);
  }, [ClubStore.openedClub?.avatar]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3 bg-primary rounded-xl">
      <Heading variant={HeadingVariant.H2}>Club photos</Heading>
      <form className="p-2 bg-primary rounded-xl" onSubmit={onSubmit}>
        {ClubStore.openedClub?.avatar && (
          <div className="flex items-center mt-3">
            <img
              className="object-contain w-[120px] h-[120px]"
              src={ClubStore.openedClub?.avatar}
            />
            {isLoading && (
              <div className="ml-[35px]">
                <Loading />
              </div>
            )}
          </div>
        )}

        <div className="mt-5">
          <div
            className="mt-5"
            onClick={(e: React.MouseEvent) => {
              if (e.target != fileInputRef.current) {
                fileInputRef.current?.click();
              }
            }}
          >
            <div className="flex items-center">
              <FileIcon />
              <input
                className="file:border-none file:bg-primary file:text-highlight"
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
                ref={fileInputRef}
              />
            </div>
          </div>
        </div>
        <div className="mt-2">
          {selectedFile && (
            <img
              className="w-[120px] h-[120px] object-contain"
              src={URL.createObjectURL(selectedFile)}
            />
          )}
        </div>
        <div className="mt-5">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
            Add photo
          </Button>
        </div>
      </form>
    </div>
  );
});
