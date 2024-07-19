import { getHoursInRange } from "@utils/timeUtils";
import React, { useEffect, useState } from "react";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";
import style from "./Booking.module.sass";
import BookingTimePoint from "@molecules/matches/BookingTimePoint";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import Select, { SingleValue } from "react-select";
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

  const courtsOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const getIndexInTimeRange = (time: string) => {
    return timeRange.indexOf(time);
  };

  const handleChangeCourtOption = (option: SingleValue<Option>) => {
    if (option) {
      console.log(option);
    }
    setSelectedCourt(option);
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

  return (
    <>
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
          {["cort 1", "cort 2", "cort 3"].map((item) => (
            <div className="col-start-1 w-[50px]">{item}</div>
          ))}
          <div className="col-start-1 row-start-1"></div>
          {timeRange.map((item) => (
            <div className="row-start-1">{item}</div>
          ))}
          {selectedStartOption && selectedEndOption && selectedCourt && (
            <BookingTimePoint
              court={Number(selectedCourt.value) + 1}
              isNewMatch={true}
              timeEnd={getIndexInTimeRange(selectedEndOption.value) + 3}
              timeStart={getIndexInTimeRange(selectedStartOption.value) + 2}
            />
          )}
          <BookingTimePoint court={2} timeEnd={3} timeStart={3} />
          <BookingTimePoint court={3} timeEnd={6} timeStart={2} />
        </div>
      </div>
      <div className="mt-5">
        <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
          Create
        </Button>
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
