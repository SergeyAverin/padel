import Tabs from "@molecules/core/Tabs";
import EditProfileForm from "@organisms/user/EditProfileForm";
import React from "react";

export const EditAccountTemplate: React.FC = () => {
  const tabs = [
    {
      to: "#edit_profile_data",
      text: "Info",
      content: <EditProfileForm />,
    },
    {
      to: "#upload_avatar",
      text: "Avatar",
      content: <div>Edit</div>,
    },
    {
      to: "#edit_padel_data",
      text: "Padel",
      content: (
        <>
          <div>Edit</div>
        </>
      ),
    },
  ];
  return (
    <>
      <Tabs subTab={tabs} />
    </>
  );
};
