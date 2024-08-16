import React from "react";
import classNames from "classnames";

interface IBookingTimePointProps {
  court: number;
  timeStart: number;
  timeEnd: number;
  isNewMatch?: boolean;
  isError?: boolean;
}

export const BookingTimePoint: React.FC<IBookingTimePointProps> = ({
  court,
  timeEnd,
  timeStart,
  isNewMatch = false,
  isError = false,
}) => {
  return (
    <>
      <div
        className={classNames("rounded-sm", {
          "bg-error z-10 relative": isError && isNewMatch,
          "bg-highlight z-20 relative": isNewMatch && !isError,
          "bg-fg z-10 relative": !isNewMatch,
        })}
        style={{
          gridColumnStart: timeStart,
          gridColumnEnd: timeEnd,
          gridRowStart: court,
          gridRowEnd: court + 1,
        }}
      />
    </>
  );
};
