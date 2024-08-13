import Tabs from "@molecules/core/Tabs";
import React from "react";

export const EditClubTemplate: React.FC = () => {
  const tabs = [
    {
      to: "#edit_club",
      text: "Data",
      content: 123,
    },
    {
      to: "#edit_club_avatar",
      text: "Avatar",
      content: 123,
    },
    {
      to: "#edit_photos",
      text: "Photos",
      content: 123,
    },
    {
      to: "#delete_club",
      text: "Delete",
      content: 1123,
    },
    {
      to: "#edit_courts",
      text: "Courts",
      content: 123,
    },
  ];
  return (
    <>
      <Tabs subTab={tabs} />
    </>
  );
};
