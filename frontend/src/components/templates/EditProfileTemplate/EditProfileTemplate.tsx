import EditProfileForm from "@organisms/EditProfileForm";
import SelectHand from "@organisms/SelectHand";
import React from "react";

export const EditProfileTemplate: React.FC = () => {
  return (
    <div className="p-3">
      <SelectHand />
      <EditProfileForm />
    </div>
  );
};
