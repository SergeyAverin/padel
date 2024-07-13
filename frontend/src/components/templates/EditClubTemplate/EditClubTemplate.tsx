import { Heading, HeadingVariant } from "@atoms/index";
import Tabs from "@molecules/Tabs";
import DeleteClubForm from "@organisms/clubs/DeleteClubForm";
import EditClubPhotos from "@organisms/clubs/EditClubPhotos";
import UpdateClubForm from "@organisms/clubs/UpdateClubForm";
import UploadClubPhoto from "@organisms/clubs/UploadClubPhoto";
import React from "react";

export const EditClubTemplate: React.FC = () => {
  const tabs = [
    {
      to: "#edit_club",
      text: "Edit club data",
      content: <UpdateClubForm />,
    },
    {
      to: "#edit_club_avatar",
      text: "Edit club avatar",
      content: <UploadClubPhoto />,
    },
    {
      to: "#edit_photos",
      text: "Edit club photos",
      content: <EditClubPhotos />,
    },
    {
      to: "#delete_club",
      text: "Delete club",
      content: <DeleteClubForm />,
    },
  ];
  return (
    <div className="p-5">
      <Tabs subTab={tabs} />
    </div>
  );
};
