import { useGetCourtsQuery } from "@redux/api/courtApi";
import {
  clubIdSelector,
  courtSelector,
  dateSelector,
  endAtSelector,
  startAtSelector,
} from "@redux/selectors/createMatchSelectors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Booking.module.sass";
import { extractTime, getHoursInRange } from "@utils/timeUtils";
import { useGetClubByIdQuery } from "@redux/api/clubApi";
import BookingTimePoint from "@molecules/matches/BookingTimePoint";
import { extractDayAndMonth } from "@utils/dateUtils";
import { useGetMatchesByDateQuery } from "@redux/api/createMatchApi";
import { generateRandomString } from "@utils/codeGenerate";
import { setIsShowNext } from "@redux/features/creaetMatchSlice";

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

  const date = useSelector(dateSelector);
  const bookedPoints = useGetMatchesByDateQuery({
    clubId: clubId,
    day: extractDayAndMonth(String(date))[0],
    month: extractDayAndMonth(String(date))[1],
  });
  const [points, setPoints] = useState<
    Array<{ startAt: number; endAt: number; courtIndex: number }>
  >([]);
  useEffect(() => {
    if (bookedPoints.data) {
      const arr: Array<{
        startAt: number;
        courtIndex: number;
        endAt: number;
      }> = [];
      bookedPoints.data.forEach(async (i) => {
        const startAt2 = extractTime(String(i.start_at));
        const endAt2 = extractTime(String(i.end_at));
        if (club.data) {
          const timeRange = getHoursInRange(
            club.data.opening,
            club.data.closing
          );
          const getIndexInTimeRange = (time: string) => {
            return timeRange.indexOf(time);
          };
          if (courts.data && court) {
            const courtIndex = courts.data.findIndex(
              (item) => item.id == Number(i.selected_court_id)
            );
            arr.push({
              startAt: getIndexInTimeRange(endAt2) + 2,
              endAt: getIndexInTimeRange(startAt2) + 3,
              courtIndex: courtIndex + 2,
            });
          }
        }
      });
      arr.sort((a, b) => a.courtIndex - b.courtIndex);
      setPoints(arr);
    }
  }, [bookedPoints.data]);

  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    let flag = true;

    const filteredBreakPoints = points.filter((item) => {
      return item.courtIndex == Number(court) + 1;
    });
    filteredBreakPoints.forEach((item) => {
      console.log("select");
      console.log(getIndexInTimeRange(startAt as string) + 2);
      console.log(getIndexInTimeRange(endAt as string) + 2);
      console.log("item");
      console.log(item.startAt);
      console.log(item.endAt - 1);
      console.log(getIndexInTimeRange(endAt as string) + 2);
      if (
        checkIntersection(
          getIndexInTimeRange(startAt as string) + 3,
          getIndexInTimeRange(endAt as string) + 2,
          item.startAt,
          item.endAt - 1
        )
      ) {
        flag = false;
      }
    });

    dispatch(setIsShowNext(flag));
    setIsError(!flag);
  }, [startAt, endAt, court]);

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
            {points.map((item) => (
              <BookingTimePoint
                court={item.courtIndex}
                timeEnd={item.endAt}
                timeStart={item.startAt}
                isNewMatch={false}
                key={generateRandomString(30)}
              />
            ))}
            {endAt && courts && startAt && court && (
              <BookingTimePoint
                court={
                  Number(
                    courts.data.findIndex((item) => item.id == Number(court))
                  ) + 2
                }
                isError={isError}
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

function checkIntersection(
  a1: number,
  b1: number,
  a2: number,
  b2: number
): boolean {
  // Сортируем начала диапазонов по возрастанию
  const [start1, start2] = a1 <= a2 ? [a1, a2] : [a2, a1];

  // Сортируем концы диапазонов по возрастанию
  const [end1, end2] = b1 <= b2 ? [b1, b2] : [b2, b1];

  // Проверяем пересечение
  return Math.max(start1, start2) <= Math.min(end1, end2);
}
