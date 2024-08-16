import { useGetCourtsQuery } from "@redux/api/courtApi";
import {
  clubIdSelector,
  courtSelector,
  endAtSelector,
  startAtSelector,
} from "@redux/selectors/createMatchSelectors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Booking.module.sass";
import { getHoursInRange } from "@utils/timeUtils";
import { useGetClubByIdQuery } from "@redux/api/clubApi";
import BookingTimePoint from "@molecules/matches/BookingTimePoint";

export const Desk: React.FC = () => {
  const clubId = useSelector(clubIdSelector) as number;
  const courts = useGetCourtsQuery(clubId);
  const club = useGetClubByIdQuery(String(clubId));

  const [timeRange, setTimeRange] = useState<Array<string>>([]);
  const getIndexInTimeRange = (time: string) => {
    return timeRange.indexOf(time);
  };
  useEffect(() => {
    if (club.data) {
      const a = getHoursInRange(club.data.opening, club.data.closing);
      setTimeRange(a);
    }
  }, [club]);

  const startAt = useSelector(startAtSelector);
  const endAt = useSelector(endAtSelector);
  const court = useSelector(courtSelector);

  return (
    <>
      {courts.data && courts.data.length != 0 && (
        <div className="mt-3">
          <div className={`bg-primary p-5 rounded-xl ${style.booking}`}>
            {courts.data &&
              courts.data.map((court) => (
                <div className="col-start-1" key={court.id}>
                  {court.name}
                </div>
              ))}
            <div className="col-start-1 row-start-1"></div>
            {timeRange.map((item) => (
              <div className="row-start-1" key={item}>
                {item}
              </div>
            ))}
            {endAt && courts && startAt && court && (
              <BookingTimePoint
                court={
                  Number(
                    courts.data.findIndex((item) => item.id == Number(court))
                  ) + 2
                }
                isNewMatch={true}
                timeEnd={getIndexInTimeRange(startAt) + 2}
                timeStart={getIndexInTimeRange(endAt) + 3}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
