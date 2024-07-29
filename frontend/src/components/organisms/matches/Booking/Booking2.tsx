import React from "react";
import { SelectClub } from "./SelectClub";
import { SelectDate } from "./SelectDate";
import { SelectStartAt } from "./SelectStartAt";
import { SelectEndAt } from "./SelectEndAt";
import { SelectCourt } from "./SelectCourt";
import { BookingDesk } from "./BookingDesk";
import BookingStore from "@store/booking";
import { Button, ButtonVariant } from "@atoms/index";
import { extractDayAndMonth } from "@utils/dateUtils";
import { useNavigate } from "react-router-dom";
import { SelectMatchLvl } from "./SelectMatchLvl";

export const Booking: React.FC = () => {
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("create");

    if (BookingStore.selectedData) {
      const b = extractDayAndMonth(BookingStore.selectedData);
      const [hoursStart, minutesStart] = BookingStore.startAt
        .split(":")
        .map(Number);
      const [hoursEnd, minutesEnd] = BookingStore.endAt.split(":").map(Number);
      const now = new Date();
      const year = now.getFullYear();
      const startDate = new Date(
        year,
        b[1] - 1,
        b[0],
        hoursStart,
        minutesStart
      );
      const endDate = new Date(year, b[1] - 1, b[0], hoursEnd, minutesEnd);
      await BookingStore.createMatch(
        startDate,
        endDate,
        Number(BookingStore.selectedClubId),
        Number(BookingStore.selectedCourt)
      );
      navigate("/matches");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <SelectClub />
      <SelectDate />
      <SelectStartAt />
      <SelectEndAt />
      <SelectCourt />
      <BookingDesk />
      <SelectMatchLvl />
      <div className="mt-5">
        <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};
