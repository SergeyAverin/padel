import React from "react";

import TestPhoto from "@assets/TestPhoto.png";
import { useDrag } from "react-dnd";
import { IUser } from "@schemas/user";

interface IUserInMatchProps {
  user: IUser;
}

export const UserInMatch: React.FC<IUserInMatchProps> = ({ user }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "UserInMatch",
      item: { user },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <>
      <div
        className="flex flex-col justify-center p-2"
        ref={dragRef}
        style={{ opacity }}
      >
        <img src={TestPhoto} className="rounded-full w-[60px]" />
        <div className="text-[12px] text-center mt-2">{user.username}</div>
        <div className="text-[12px] text-center mt-1">{user.age}</div>
      </div>
    </>
  );
};
