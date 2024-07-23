import React from "react";
import { SelectClub } from "./SelectClub";
import { SelectDate } from "./SelectDate";
import { SelectStartAt } from "./SelectStartAt";
import { SelectEndAt } from "./SelectEndAt";
import { SelectCourt } from "./SelectCourt";
import { BookingDesk } from "./BookingDesk";
import BookingStore from "@store/booking";

export const Booking: React.FC = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("create");

    console.log(BookingStore.selectedClubId);
    console.log(BookingStore.selectedData);
    console.log(BookingStore.selectedCourt);
    console.log(BookingStore.startAt);
    console.log(BookingStore.endAt);
  };
  return (
    <form onSubmit={onSubmit}>
      <SelectClub />
      <SelectDate />
      <SelectStartAt />
      <SelectEndAt />
      <SelectCourt />
      <BookingDesk />
    </form>
  );
};
