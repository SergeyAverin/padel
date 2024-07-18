import React from "react";
import BookingStore from "@store/booking";
import classNames from "classnames";

interface IBookingTimePointProps {
  court: number;
  timeStart: number;
  timeEnd: number;
}

export const BookingTimePoint: React.FC<IBookingTimePointProps> = ({
  court,
  timeEnd,
  timeStart,
}) => {
  const onClick = () => {
    BookingStore.selectTimePoint({
      court: court,
      timeEnd: timeEnd,
      timeStart: timeStart,
    });
  };
  return (
    <>
      <div
        className={classNames("rounded-sm", {
          "bg-highlight":
            BookingStore.selectedTimePoint &&
            BookingStore.selectedTimePoint.court == court,
          "bg-fg":
            BookingStore.selectedTimePoint == null ||
            BookingStore.selectedTimePoint.court != court,
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
