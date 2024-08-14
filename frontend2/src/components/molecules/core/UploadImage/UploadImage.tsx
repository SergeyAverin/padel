import {
  Button,
  ButtonVariant,
  Heading,
  HeadingVariant,
  Loading,
} from "@atoms/index";
import React, { useEffect, useRef, useState } from "react";
import FileIcon from "@assets/FileIcon.svg?react";

interface IUploadImageProsp {
  defaultPhoto: string;
  onSubmitPhoto: (file: File | null) => void;
  title: string;
  helpText?: string | undefined;
}

export const UploadImage: React.FC<IUploadImageProsp> = ({
  defaultPhoto,
  onSubmitPhoto,
  title,
  helpText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      setIsLoading(true);
      onSubmitPhoto(selectedFile);
      setSelectedFile(null);
    }
  };
  useEffect(() => {
    setIsLoading(false);
  }, [defaultPhoto]);
  return (
    <>
      <div className="p-3 bg-primary rounded-xl">
        <Heading variant={HeadingVariant.H2}>{title}</Heading>
        {helpText && <div>{helpText}</div>}
        <form className="p-2 bg-primary rounded-xl" onSubmit={onSubmit}>
          <div className="flex items-center mt-3">
            <img
              className="object-contain w-[120px] h-[120px]"
              src={defaultPhoto}
            />
            {isLoading && (
              <div className="ml-[35px]">
                <Loading />
              </div>
            )}
          </div>

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
                <div>
                  <FileIcon />
                </div>
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
              Upload photo
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
