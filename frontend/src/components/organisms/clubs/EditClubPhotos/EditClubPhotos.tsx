import React, { useEffect, useRef, useState } from "react";
import ClubStore from "@store/club";
import ClubPhoto from "../ClubPhoto";
import { observer } from "mobx-react-lite";
import {
  Button,
  ButtonVariant,
  Heading,
  HeadingVariant,
  Loading,
} from "@atoms/index";
import FileIcon from "@assets/FileIcon.svg?react";

export const EditClubPhotos: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        setSelectedFile(null);
      }
    }
  };
  useEffect(() => {
    setIsLoading(false);
  }, [ClubStore.clubPhotos.length]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="p-3 bg-primary rounded-xl">
        <Heading variant={HeadingVariant.H2}>Upload new club photo</Heading>
        <form className="p-2 bg-primary rounded-xl" onSubmit={onSubmit}>
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
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <div className="mt-2 flex  items-center">
              {selectedFile && (
                <img
                  className="w-[120px] h-[120px] object-contain"
                  src={URL.createObjectURL(selectedFile)}
                />
              )}
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            {isLoading ? (
              <div className="p-3 ">
                <Loading />
              </div>
            ) : (
              <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
                Add photo
              </Button>
            )}
          </div>
        </form>
      </div>
      {ClubStore.clubPhotos
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
});
