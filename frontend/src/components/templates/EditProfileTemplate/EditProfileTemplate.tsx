import EditProfileForm from "@organisms/account/EditProfileForm";
import SelectHand from "@organisms/account/SelectHand";
import SelectPosition from "@organisms/account/SelectPosition";
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
