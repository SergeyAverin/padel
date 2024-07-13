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
      text: "Info",
      content: <EditProfileForm />,
    },
    {
      to: "#upload_avatar",
      text: "Avatar",
      content: <UploadPhotoForm />,
    },
    {
      to: "#edit_padel_data",
      text: "Padel",
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
