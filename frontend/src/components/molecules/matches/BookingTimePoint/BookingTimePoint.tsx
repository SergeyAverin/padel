import React from "react";
import BookingStore from "@store/booking";
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
  const onClick = () => {
    if (!isNewMatch) {
      BookingStore.selectTimePoint({
        court: court,
        timeEnd: timeEnd,
        timeStart: timeStart,
      });
    }
  };
  return (
    <>
      <div
        className={classNames("rounded-sm", {
          "bg-fg": isNewMatch,
          "bg-highlight":
            BookingStore.selectedTimePoint &&
            BookingStore.selectedTimePoint.court == court &&
            !isNewMatch,
          "bg-error":
            BookingStore.selectedTimePoint == null ||
            (BookingStore.selectedTimePoint.court != court && !isNewMatch),
        })}
        onClick={onClick}
        style={{
          gridColumnStart: timeStart,
          gridColumnEnd: timeEnd,
          gridRowStart: court,
        }}
      />
    </>
  );
};
