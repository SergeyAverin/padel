import React, { useState } from "react";

import { Hand as HandEnum } from "@schemas/user";

import LeftHandIcon from "@assets/LeftHandIcon.svg?react";
import HandRightIcon from "@assets/RightHandIcon.svg?react";
import { PadelInfoItem } from "@molecules/user/PadelInfoItem/PadelInfoItem";
import { useAuthUser } from "@hooks/useAuthUser";
import { useChageHandMutation } from "@redux/api/userApi";

export const SelectHand: React.FC = () => {
  const user = useAuthUser();
  const [onChangeHand] = useChageHandMutation();
  const [hand, setHand] = useState(user?.hand);
  return (
    <div className="p-5 bg-primary rounded-xl mt-5">
      {hand && user && (
        <>
          <div className="text-[24px]">Select hand:</div>
          <div className="flex justify-around mt-5">
            <PadelInfoItem
              icon={<LeftHandIcon />}
              text="Left hand"
              isActive={hand == HandEnum.LEFT_HAND}
              onClick={() => {
                setHand(HandEnum.LEFT_HAND);
                onChangeHand({
                  hand: HandEnum.LEFT_HAND,
                  userId: user.telegram_user_id,
                });
              }}
            />
            <PadelInfoItem
              icon={<HandRightIcon />}
              text="Right hand"
              isActive={hand == HandEnum.RIGHT_HAND}
              onClick={() => {
                setHand(HandEnum.RIGHT_HAND);
                onChangeHand({
                  hand: HandEnum.RIGHT_HAND,
                  userId: user.telegram_user_id,
                });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
