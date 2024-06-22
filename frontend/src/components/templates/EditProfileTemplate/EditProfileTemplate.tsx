import EditProfileForm from "@organisms/EditProfileForm";
import SelectHand from "@organisms/SelectHand";
import SelectPosition from "@organisms/SelectPosition";
import React from "react";

export const EditProfileTemplate: React.FC = () => {
  return (
    <div className="p-3 mb-[100px]">
      <SelectHand />
      <SelectPosition />
      <EditProfileForm />
    </div>
  );
};
