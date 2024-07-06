import classNames from "classnames";
import React from "react";

interface ITabsLinkProps extends React.PropsWithChildren {
  isActive?: boolean;
}

export const TabsLink: React.FC<ITabsLinkProps> = ({
  children,
  isActive = false,
}) => {
  return (
    <div
      className={classNames(" text-[28px] border-b-2 p-3", {
        " border-fg": !isActive,
        "border-highlight": isActive,
      })}
    >
      {children}
    </div>
  );
};
