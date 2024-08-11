import { useState } from "react";

import { Position } from "@schemas/user";
import UserStore from "@store/account/user";

export const useSetPosition = (): [
  Position | undefined,
  (position: Position) => void
] => {
  const [position, sePosition] = useState(UserStore.user?.position);
  const onChangePosition = (position: Position) => {
    navigator.vibrate(30);
    sePosition(position);
    UserStore.changePosition(position);
  };
  return [position, onChangePosition];
};
