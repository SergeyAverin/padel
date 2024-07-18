import { getHoursInRange } from "@utils/timeUtils";
import React, { useEffect } from "react";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";
import style from "./Booking.module.sass";
import BookingTimePoint from "@molecules/matches/BookingTimePoint";
import { Input } from "@atoms/index";

export const Booking: React.FC = observer(() => {
  return (
    <>
      <Input name="start at" value={""} />
      <div className="mt-5">
        <Input name="end at" value={""} />
      </div>
      {BookingStore.selectedTimePoint && (
        <div>court: {BookingStore.selectedTimePoint.court}</div>
      )}
      <div className="p-2">
        <div className={`bg-primary p-5 rounded-xl ${style.booking}`}>
          {["cort 1", "cort 2", "cort 3"].map((item) => (
            <div className="col-start-1 w-[50px]">{item}</div>
          ))}
          <div className="col-start-1 row-start-1"></div>
          {getHoursInRange("08:00", "18:00").map((item) => (
            <div className="row-start-1">{item}</div>
          ))}
          <BookingTimePoint court={4} timeEnd={3} timeStart={2} />
          <BookingTimePoint court={2} timeEnd={3} timeStart={3} />
          <BookingTimePoint court={3} timeEnd={6} timeStart={2} />
        </div>
      </div>
    </>
  );
});

/*
          {getHoursInRange("00:00", "23:00").map((item) => (
            <div className="mr-5">{item}</div>
          ))}
                        {["cort 1", "cort 2", "cort 3"].map((item) => (
              <div className="mt-5">{item}</div>
            ))}
              */
