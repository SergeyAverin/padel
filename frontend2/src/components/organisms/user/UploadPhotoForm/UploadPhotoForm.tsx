import React from "react";

import { UploadImage } from "@molecules/core/UploadImage/UploadImage";
import { useAuthUser } from "@hooks/useAuthUser";

export const UploadPhotoForm: React.FC = () => {
  const user = useAuthUser();
  const onUploadImage = (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      if (user) {
        // uploadPhoto(user.telegram_user_id, formData);
      }
    }
  };

  return (
    <>
      {user && (
        <UploadImage
          defaultPhoto={user.avatar}
          onSubmitPhoto={onUploadImage}
          title="Upload user avatar"
          helpText="Upload photo in 240x240 size"
        />
      )}
    </>
  );
};
