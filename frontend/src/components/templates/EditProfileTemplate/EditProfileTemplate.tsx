import EditProfileForm from "@organisms/account/EditProfileForm";
import SelectHand from "@organisms/account/SelectHand";
import SelectPosition from "@organisms/account/SelectPosition";
import UploadPhotoForm from "@organisms/account/UploadPhotoForm";
import React from "react";

export const EditProfileTemplate: React.FC = () => {
  return (
    <div className="p-3 mb-[100px]">
      <EditProfileForm />
      <div className="mt-3">
        <UploadPhotoForm />
      </div>
      <SelectHand />
      <div className="mt-3">
        <SelectPosition />
      </div>
    </div>
  );
};
