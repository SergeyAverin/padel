import { Heading, HeadingVariant } from "@atoms/index";
import DeleteClubForm from "@organisms/clubs/DeleteClubForm";
import EditClubPhotos from "@organisms/clubs/EditClubPhotos";
import UpdateClubForm from "@organisms/clubs/UpdateClubForm";
import React from "react";

export const EditClubTemplate: React.FC = () => {
  return (
    <div className="p-5">
      <Heading variant={HeadingVariant.H1}>Edit club</Heading>
      <div className="mt-5 mb-5">
        <UpdateClubForm />
      </div>
      <div className="mt-5 mb-5">
        <EditClubPhotos />
      </div>
      <div>
        <DeleteClubForm />
      </div>
    </div>
  );
};
