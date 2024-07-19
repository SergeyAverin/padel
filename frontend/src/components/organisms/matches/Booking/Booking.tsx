import { extractTime, getHoursInRange } from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";
import style from "./Booking.module.sass";
import BookingTimePoint from "@molecules/matches/BookingTimePoint";
import { Button, ButtonVariant, Label } from "@atoms/index";
import Select, { SingleValue } from "react-select";
import ClubStore from "@store/club";
import CourtStore from "@store/courts";
import MatchStore from "@store/match";

interface Option {
  value: string;
  label: string;
}

export const Booking: React.FC = observer(() => {
  const timeRange = getHoursInRange("08:00", "18:00");
  const options = timeRange.map((time) => ({ value: time, label: time }));
  const [selectedStartOption, setSelectedStartOption] =
    useState<SingleValue<Option>>(null);
  const [selectedEndOption, setSelectedEndOption] =
    useState<SingleValue<Option>>(null);
  const [selectedCourt, setSelectedCourt] = useState<SingleValue<Option>>(null);
  const [selectedClub, setSelectedClub] = useState<SingleValue<Option>>(null);
  useEffect(() => {
    CourtStore.getClubCanCreateMatch();
  }, []);

  useEffect(() => {
    if (selectedClub) {
      CourtStore.getCourts(Number(selectedClub.value));
      MatchStore.loadClubMatches(Number(selectedClub.value));
    }
  }, [selectedClub]);

  const [timePoints, setTimePoints] = useState<
    Array<{
      startAt: number;
      endAt: number;
      courtIndex: number;
    }>
  >([]);

  useEffect(() => {
    const arr: Array<{
      startAt: number;
      endAt: number;
      courtIndex: number;
    }> = [];
    MatchStore.matches.forEach((i) => {
      const startAt = extractTime(String(i.start_at));
      const endAt = extractTime(String(i.end_at));
      const courtIndex =
        courtsOptions.findIndex((item) => item.value == String(i.club_id)) + 3;
      arr.push({
        startAt: getIndexInTimeRange(startAt) + 2,
        endAt: getIndexInTimeRange(endAt) + 3,
        courtIndex: courtIndex,
      });
    });
    setTimePoints(arr);
  }, [MatchStore.matches]);

  const [courtsOptions, setCourtsOptions] = useState<Array<Option>>([]);

  useEffect(() => {
    const options = CourtStore.courts.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setCourtsOptions(options);
  }, [CourtStore.courts]);

  const getIndexInTimeRange = (time: string) => {
    return timeRange.indexOf(time);
  };

  const handleChangeCourtOption = (option: SingleValue<Option>) => {
    if (option) {
      console.log(option);
    }
    setSelectedCourt(option);
  };
  const handleChangeClubOption = (option: SingleValue<Option>) => {
    if (option) {
      console.log(option);
    }
    setSelectedClub(option);
  };

  const handleChangeStartOption = (option: SingleValue<Option>) => {
    if (option) {
      console.log(option);
    }
    setSelectedStartOption(option);
  };

  const handleChangeEnd = (option: SingleValue<Option>) => {
    if (option) {
      console.log(option);
    }
    setSelectedEndOption(option);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("create");

    console.log(selectedClub);
    console.log(selectedCourt);
    console.log(selectedStartOption);
    console.log(selectedEndOption);
  };

  return (
    <form onSubmit={onSubmit}>
      <Label>Clubs:</Label>

      <Select
        defaultValue={selectedClub}
        onChange={handleChangeClubOption}
        options={CourtStore.clubCanCreateMatch.map((club) => ({
          label: club.name,
          value: String(club.id),
        }))}
      />

      <Label>Time start</Label>

      <Select
        options={options}
        defaultValue={selectedStartOption}
        onChange={handleChangeStartOption}
      />

      <div className="mt-5">
        <Label>Time end</Label>
        <Select
          options={options}
          defaultValue={selectedEndOption}
          onChange={handleChangeEnd}
        />
      </div>
      <div className="mt-5">
        <Label>Court:</Label>

        <Select
          options={courtsOptions}
          defaultValue={selectedCourt}
          onChange={handleChangeCourtOption}
        />
      </div>
      {BookingStore.selectedTimePoint && (
        <div>court: {BookingStore.selectedTimePoint.court}</div>
      )}
      <div className="mt-3">
        <div className={`bg-primary p-5 rounded-xl ${style.booking}`}>
          {courtsOptions.map((item) => (
            <div className="col-start-1">{item.label}</div>
          ))}
          <div className="col-start-1 row-start-1"></div>
          {timeRange.map((item) => (
            <div className="row-start-1">{item}</div>
          ))}
          {selectedStartOption && selectedEndOption && selectedCourt && (
            <BookingTimePoint
              court={
                Number(
                  courtsOptions.findIndex(
                    (item) => item.value == selectedCourt.value
                  )
                ) + 2
              }
              isNewMatch={true}
              timeEnd={getIndexInTimeRange(selectedEndOption.value) + 3}
              timeStart={getIndexInTimeRange(selectedStartOption.value) + 2}
            />
          )}
          {timePoints.map((item) => (
            <BookingTimePoint
              court={item.courtIndex}
              timeEnd={item.endAt}
              timeStart={item.startAt}
            />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
});
