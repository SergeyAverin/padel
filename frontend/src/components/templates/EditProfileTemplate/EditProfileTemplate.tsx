import Tabs from "@molecules/Tabs";
import EditProfileForm from "@organisms/account/EditProfileForm";
import SelectHand from "@organisms/account/SelectHand";
import SelectPosition from "@organisms/account/SelectPosition";
import UploadPhotoForm from "@organisms/account/UploadPhotoForm";
import React from "react";

export const EditProfileTemplate: React.FC = () => {
  const tabs = [
    {
      to: "#edit_profile_data",
      text: "Edit profile data",
      content: <EditProfileForm />,
    },
    {
      to: "#upload_avatar",
      text: "Upload avatar",
      content: <UploadPhotoForm />,
    },
    {
      to: "#edit_padel_data",
      text: "Edit padel data",
      content: (
        <>
          {" "}
          <SelectHand />
          <div className="mt-3">
            <SelectPosition />
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="p-3 mb-[100px]">
      <Tabs subTab={tabs} />
    </div>
  );
};
