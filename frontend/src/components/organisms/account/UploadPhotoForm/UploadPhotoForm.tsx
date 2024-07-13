import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";

import { Button, ButtonVariant } from "@atoms/index";
import UserStore from "@store/user";
import AuthStore from "@store/auth";
import FileIcon from "@assets/FileIcon.svg?react";

export const UploadPhotoForm: React.FC = observer(() => {
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
      formData.append("file", selectedFile);
      if (AuthStore.authUser) {
        UserStore.uploadPhoto(AuthStore.authUser.telegram_user_id, formData);
      }
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <form className="p-5 bg-primary rounded-xl" onSubmit={onSubmit}>
      <div className="text-[24px]">User avatar:</div>
      {UserStore.user && (
        <div>
          <img
            className="rounded-full w-[80px] h-[80px]"
            src={UserStore.user.avatar}
          />
        </div>
      )}
      <div className="text-[24px] mt-5">Upload avatar:</div>
      <div className="mt-5" onClick={() => fileInputRef.current?.click()}>
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
      </div>
      <div className="mt-5">
        <Button variant={ButtonVariant.OUTLINED} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
});
