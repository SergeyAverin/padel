import React, { useEffect, useState } from "react";
import Select from "@atoms/Select";
import { Label } from "@atoms/index";
import CourtStore from "@store/courts";
import BookingStore from "@store/booking";
import { observer } from "mobx-react-lite";

interface Option {
  value: string;
  label: string;
}

export const SelectClub: React.FC = observer(() => {
  const [selectedClub, setSelectedClub] = useState<Option>(
    CourtStore.clubCanCreateMatch.map((club) => ({
      label: club.name,
      value: String(club.id),
    }))[0]
  );
  useEffect(() => {
    CourtStore.getClubCanCreateMatch();
  }, []);

  const handleChangeClubOption = (option: Option) => {
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
        placeholder="Select club"
      />
    </>
  );
});
