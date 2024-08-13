import { Spinner } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import Tabs from "@molecules/core/Tabs";
import EditProfileForm from "@organisms/user/EditProfileForm";
import SelectHand from "@organisms/user/SelectHand";
import SelectPosition from "@organisms/user/SelectPosition";
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
          <div>
            <SelectHand />
            <SelectPosition />
          </div>
        </>
      ),
    },
  ];
  const user = useAuthUser();
  return <>{user ? <Tabs subTab={tabs} /> : <Spinner />}</>;
};
