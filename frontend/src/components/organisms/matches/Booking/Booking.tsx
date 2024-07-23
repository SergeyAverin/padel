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
  const [selectedCourt, setSelectedCourt] = useState<SingleValue<Option>>(null);

  const getIndexInTimeRange = (time: string) => {
    return timeRange.indexOf(time);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("create");

    console.log(selectedCourt);
    console.log(selectedStartOption);
    console.log(selectedEndOption);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* select match */}

      {BookingStore.selectedTimePoint && (
        <div>court: {BookingStore.selectedTimePoint.court}</div>
      )}

      <div className="mt-5">
        <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
});
