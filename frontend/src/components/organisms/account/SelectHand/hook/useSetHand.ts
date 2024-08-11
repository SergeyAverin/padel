import { useState } from "react";

import { Hand } from "@schemas/user";
import UserStore from "@store/account/user";

export const useSetHand = (): [Hand | undefined, (position: Hand) => void] => {
  const [hand, setHand] = useState(UserStore.user?.hand);
  const onChangeHand = (hand: Hand) => {
    navigator.vibrate(30);
    setHand(hand);
    UserStore.changeHand(hand);
  };
  return [hand, onChangeHand];
};
