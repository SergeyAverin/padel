import { useState } from "react";

import { Hand } from "@schemas/user";
import UserStore from "@store/user";

export const useSetHand = (): [Hand | undefined, (position: Hand) => void] => {
  const [hand, setHand] = useState(UserStore.user?.hand);
  const onChangeHand = (hand: Hand) => {
    navigator.vibrate(40);
    setHand(hand);
    UserStore.changeHand(hand);
  };
  return [hand, onChangeHand];
};
