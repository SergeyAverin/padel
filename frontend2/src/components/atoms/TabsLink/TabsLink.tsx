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
      className={classNames("text-[18px] box-border  p-3", {
        " border-b-2  border-bg box-border": !isActive,
        "border-highlight border-b-2 box-border text-highlight": isActive,
      })}
    >
      {children}
    </div>
  );
};
