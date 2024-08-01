import React, { useEffect, useState } from "react";
import { SelectClub } from "./SelectClub";
import { SelectDate } from "./SelectDate";
import { SelectStartAt } from "./SelectStartAt";
import { SelectEndAt } from "./SelectEndAt";
import { SelectCourt } from "./SelectCourt";
import { BookingDesk } from "./BookingDesk";
import BookingStore from "@store/booking";
import { Button, ButtonVariant, Label, Toggle } from "@atoms/index";
import { extractDayAndMonth } from "@utils/dateUtils";
import { useNavigate } from "react-router-dom";
import { SelectMatchLvl } from "./SelectMatchLvl";
import TagsStore from "@store/tags";
import Select from "@atoms/Select";

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
        Number(BookingStore.selectedCourt),
        isPrivate,
        selectedTagId
      );
      navigate("/matches");
    }
  };
  const [isPrivate, setIsPrivate] = useState(false);
  const [tagsOptoin, setTagOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  useEffect(() => {
    const t = TagsStore.tags.map((tag) => {
      return { label: tag.name, value: String(tag.id) };
    });
    setTagOptions(t);
  }, [TagsStore.tags]);
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
        <div className="mb-3">
          <Label>Is private:</Label>
        </div>
        <Toggle
          defaultValue={isPrivate}
          onChange={(item) => setIsPrivate(item)}
          isDisable={false}
        />
      </div>
      {isPrivate && (
        <div className="mt-5">
          <div className="mb-3">
            <Label>Select user group how can join in match</Label>
          </div>
          <Select
            options={tagsOptoin}
            onChange={(i) => setSelectedTagId(Number(i.value))}
          />
        </div>
      )}
      <div className="mt-5">
        <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};
