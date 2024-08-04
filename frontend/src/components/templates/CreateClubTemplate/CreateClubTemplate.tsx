import React from "react";

import { Heading, HeadingVariant } from "@atoms/index";
import CreateClubForm from "@organisms/clubs/CreateClubForm";
import HelpBanner from "@organisms/HelpBanner";

export const CreateClubTemplate: React.FC = () => {
  return (
    <div className="p-5">
      <Heading variant={HeadingVariant.H1}>Create club</Heading>
      <CreateClubForm />
      <HelpBanner localStorageKey="help_create_club" isInNavigation={true}>
        Here you can register your club
      </HelpBanner>
    </div>
  );
};
