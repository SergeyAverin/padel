import React from "react";

import { UploadImage } from "@molecules/core/UploadImage/UploadImage";
import { useAuthUser } from "@hooks/useAuthUser";
import { useUpdateAvetarMutation } from "@redux/api/userApi";

export const UploadPhotoForm: React.FC = () => {
  const user = useAuthUser();
  const [uploadPhoto] = useUpdateAvetarMutation();
  const onUploadImage = (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      if (user) {
        uploadPhoto({ userId: user.telegram_user_id, body: formData });
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
