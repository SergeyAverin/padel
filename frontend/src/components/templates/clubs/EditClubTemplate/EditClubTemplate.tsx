import Tabs from "@molecules/core/Tabs";
import DeleteClubForm from "@organisms/clubs/DeleteClubForm";
import EditClubPhotos from "@organisms/clubs/EditClubPhotos";
import UpdateClubForm from "@organisms/clubs/UpdateClubForm";
import UploadClubPhoto from "@organisms/clubs/UploadClubPhoto";
import Courts from "@organisms/clubs/Courts";
import React from "react";

export const EditClubTemplate: React.FC = () => {
  const tabs = [
    {
      to: "#edit_club",
      text: "Data",
      content: <UpdateClubForm />,
    },
    {
      to: "#edit_club_avatar",
      text: "Avatar",
      content: <UploadClubPhoto />,
    },
    {
      to: "#edit_photos",
      text: "Photos",
      content: <EditClubPhotos />,
    },
    {
      to: "#delete_club",
      text: "Delete",
      content: <DeleteClubForm />,
    },
    {
      to: "#edit_courts",
      text: "Courts",
      content: <Courts />,
    },
  ];
  return (
    <div className="p-5">
      <Tabs subTab={tabs} />
    </div>
  );
};