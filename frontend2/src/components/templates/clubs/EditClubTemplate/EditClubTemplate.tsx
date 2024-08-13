import Tabs from "@molecules/core/Tabs";
import DeleteClubForm from "@organisms/clubs/DeleteClubForm";
import UpdateClubForm from "@organisms/clubs/UpdateClubForm";
import { useGetClubByIdQuery } from "@redux/api/clubApi";
import { IClub } from "@schemas/club";
import React from "react";
import { useParams } from "react-router-dom";

export const EditClubTemplate: React.FC = () => {
  const { clubId } = useParams();
  const { data } = useGetClubByIdQuery(clubId as string);
  const tabs = [
    {
      to: "#edit_club",
      text: "Data",
      content: <UpdateClubForm club={data as IClub} />,
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
      content: <DeleteClubForm club={data as IClub} />,
    },
    {
      to: "#edit_courts",
      text: "Courts",
      content: 123,
    },
  ];
  return <>{data && <Tabs subTab={tabs} />}</>;
};
