import React from "react";

import { useLoadingClubById } from "./hooks/useLoadingClubById";
import ClubTemplate from "@templates/clubs/ClubTemplate";

export const ClubPage: React.FC = () => {
  useLoadingClubById();

  return <ClubTemplate />;
};
