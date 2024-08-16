import React from "react";
import classNames from "classnames";

interface IBookingTimePointProps {
  court: number;
  timeStart: number;
  timeEnd: number;
  isNewMatch?: boolean;
}

export const BookingTimePoint: React.FC<IBookingTimePointProps> = ({
  court,
  timeEnd,
  timeStart,
  isNewMatch = false,
}) => {
  return (
    <>
      <div
        className={classNames("rounded-sm", {
          "bg-fg": isNewMatch,
          "bg-error": !isNewMatch,
        })}
        style={{
          gridColumnStart: timeStart,
          gridColumnEnd: timeEnd,
          gridRowStart: court,
        }}
      />
    </>
  );
};
