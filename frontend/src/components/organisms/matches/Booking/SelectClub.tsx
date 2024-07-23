import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { Label } from "@atoms/index";
import CourtStore from "@store/courts";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}

export const SelectClub: React.FC = observer(() => {
  const [selectedClub, setSelectedClub] = useState<SingleValue<Option>>(null);
  useEffect(() => {
    CourtStore.getClubCanCreateMatch();
  }, []);

  const handleChangeClubOption = (option: SingleValue<Option>) => {
    if (option) {
      BookingStore.selectClub(option.value);
    }
    setSelectedClub(option);
  };
  return (
    <>
      <Label>Clubs:</Label>

      <Select
        defaultValue={selectedClub}
        onChange={handleChangeClubOption}
        options={CourtStore.clubCanCreateMatch.map((club) => ({
          label: club.name,
          value: String(club.id),
        }))}
      />
    </>
  );
});
