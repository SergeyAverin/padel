import { useState } from "react";

import { Position } from "@schemas/user";
import UserStore from "@store/user";

export const useSetPosition = (): [
  Position | undefined,
  (position: Position) => void
] => {
  const [position, sePosition] = useState(UserStore.user?.position);
  const onChangePosition = (position: Position) => {
    sePosition(position);
    UserStore.changePosition(position);
  };
  return [position, onChangePosition];
};
