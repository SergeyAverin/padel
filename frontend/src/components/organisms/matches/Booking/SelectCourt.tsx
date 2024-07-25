import React, { useEffect, useState } from "react";
import BookingStore from "@store/booking";
import Select from "@atoms/Select";

import { Label } from "@atoms/index";
import { observer } from "mobx-react-lite";
import CourtStore from "@store/courts";
import MatchStore from "@store/match";

interface Option {
  value: string;
  label: string;
}

export const SelectCourt: React.FC = observer(() => {
  const [courtsOptions, setCourtsOptions] = useState<Array<Option>>([]);
  const [selectedCourt, setSelectedCourt] = useState<Option>(null);

  useEffect(() => {
    const options = CourtStore.courts.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    setCourtsOptions(options);
    BookingStore.setCourtOption(options);
  }, [CourtStore.courts]);

  useEffect(() => {
    if (BookingStore.selectedClubId) {
      CourtStore.getCourts(Number(BookingStore.selectedClubId));
      MatchStore.loadClubMatches(Number(BookingStore.selectedClubId));
    }
  }, [BookingStore.selectedClubId]);

  const handleChangeCourtOption = (option: Option) => {
    if (option) {
      BookingStore.setSelectCourt(option.value);
    }
    setSelectedCourt(option);
  };
  return (
    <>
      {BookingStore.selectedClubId && BookingStore.selectedData && (
        <div className="mt-5">
          <Label>Court:</Label>

          <Select
            options={courtsOptions}
            defaultValue={selectedCourt}
            onChange={handleChangeCourtOption}
            placeholder="Select court"
          />
        </div>
      )}
    </>
  );
});
