import { getHoursInRange } from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";
import style from "./Booking.module.sass";
import BookingTimePoint from "@molecules/matches/BookingTimePoint";

export const BookingDesk: React.FC = observer(() => {
  const [timeRange, setTimeRange] = useState<Array<string>>([]);
  const getIndexInTimeRange = (time: string) => {
    return timeRange.indexOf(time);
  };
  useEffect(() => {
    const a = getHoursInRange(BookingStore.opening, BookingStore.closing);
    setTimeRange(a);
  }, [BookingStore.opening, BookingStore.closing]);

  const [deskPoints, setDeskPoints] = useState<JSX.Element[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const a = BookingStore.breakPoints.map((item) => {
      return (
        <BookingTimePoint
          court={item.courtIndex}
          timeEnd={item.endAt}
          timeStart={item.startAt}
        />
      );
    });
    setDeskPoints(a);
    setIsLoading(false);
  }, [BookingStore.breakPoints]);

  return (
    <>
      {BookingStore.selectedClubId && BookingStore.selectedData && (
        <div className="mt-3">
          <div className={`bg-primary p-5 rounded-xl ${style.booking}`}>
            {BookingStore.courtOption.map((item) => (
              <div className="col-start-1">{item.label}</div>
            ))}
            <div className="col-start-1 row-start-1"></div>
            {timeRange.map((item) => (
              <div className="row-start-1">{item}</div>
            ))}
            {BookingStore.endAt &&
              BookingStore.startAt &&
              BookingStore.selectedCourt && (
                <BookingTimePoint
                  court={
                    Number(
                      BookingStore.courtOption.findIndex(
                        (item) => item.value == BookingStore.selectedCourt
                      )
                    ) + 2
                  }
                  isNewMatch={true}
                  timeEnd={getIndexInTimeRange(BookingStore.startAt) + 2}
                  timeStart={getIndexInTimeRange(BookingStore.endAt) + 3}
                />
              )}
            {!isLoading && deskPoints}
          </div>
        </div>
      )}
    </>
  );
});
