import React from "react";
import { Link } from "react-router-dom";

interface INavigationButton {
  text: string;
  icon: React.ReactNode;
  href: string;
}

export const NavigationButton: React.FC<INavigationButton> = ({
  text,
  href,
  icon,
}) => {
  return (
    <Link to={href} onClick={() => navigator.vibrate(30)}>
      <div className="flex flex-col justify-end  items-center cursor-pointer">
        <div className="flex justify-center items-center w-[35px] h-[35px]">
          {icon}
        </div>
        <div className="text-[10px] font-light mt-[8px]">{text}</div>
      </div>
    </Link>
  );
};
