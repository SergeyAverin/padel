import React from "react";

import { Heading, HeadingVariant } from "@atoms/index";
import CreateClubForm from "@organisms/clubs/CreateClubForm";

export const CreateClubTemplate: React.FC = () => {
  return (
    <div className="p-5">
      <Heading variant={HeadingVariant.H1}>Create club</Heading>
      <CreateClubForm />
    </div>
  );
};
