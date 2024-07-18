import React from "react";

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
  return (
    <>
      <div
        className="bg-fg rounded-sm"
        style={{
          gridColumnStart: timeStart,
          gridColumnEnd: timeEnd,
          gridRowStart: court,
        }}
      />
    </>
  );
};
