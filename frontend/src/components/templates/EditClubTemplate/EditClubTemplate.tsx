import { Heading, HeadingVariant } from "@atoms/index";
import DeleteClubForm from "@organisms/clubs/DeleteClubForm";
import React from "react";

export const EditClubTemplate: React.FC = () => {
  return (
    <div className="p-5">
      <Heading variant={HeadingVariant.H1}>Edit club</Heading>
      <div>edit form</div>
      <div>photo edit</div>
      <div>
        <DeleteClubForm />
      </div>
    </div>
  );
};
