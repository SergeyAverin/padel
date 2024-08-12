import Tabs from "@molecules/core/Tabs";
import React from "react";

export const EditAccountTemplate: React.FC = () => {
  const tabs = [
    {
      to: "#edit_profile_data",
      text: "Info",
      content: <div>Edit</div>,
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
