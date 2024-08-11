import React, { useEffect, useState } from "react";
import Select from "@atoms/Select";
import { Label, Spinner } from "@atoms/index";
import CourtStore from "@store/clubs/courts";
import BookingStore from "@store/matches/booking";
import { observer } from "mobx-react-lite";
import MatchStore from "@store/matches/match";

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
    if (CourtStore.clubCanCreateMatch.length > 0) {
      const opton = CourtStore.clubCanCreateMatch.map((club) => ({
        label: club.name,
        value: String(club.id),
      }));
      BookingStore.selectClub(opton[0].value);
      setSelectedClub(opton[0]);
    }
  }, [CourtStore.clubCanCreateMatch]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    CourtStore.getClubCanCreateMatch().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleChangeClubOption = (option: Option) => {
    if (option) {
      BookingStore.selectClub(option.value);
    }
    setSelectedClub(option);
  };
  useEffect(() => {
    if (BookingStore.selectedClubId) {
      CourtStore.getCourts(Number(BookingStore.selectedClubId));
      MatchStore.loadClubMatches(Number(BookingStore.selectedClubId));
    }
  }, [BookingStore.selectedClubId]);

  return (
    <>
      {isLoading && <Spinner />}
      {CourtStore.clubCanCreateMatch.length == 0 && !isLoading ? (
        <div className="bg-primary p-5 rounded-2xl shadow-md">
          <div className="text-[24px] mb-1">⚠️</div>
          You can only create matches in clubs from your bookmarks, but you do
          not have any clubs in your notes!
        </div>
      ) : (
        <div>
          {!isLoading && (
            <>
              <Label>Choose a club where to create a match :</Label>
              <Select
                defaultValue={selectedClub}
                onChange={handleChangeClubOption}
                options={CourtStore.clubCanCreateMatch.map((club) => ({
                  label: club.name,
                  value: String(club.id),
                }))}
                isLoading={isLoading}
                placeholder="Select club"
              />
            </>
          )}
          {selectedClub && CourtStore.courts.length == 0 && !isLoading && (
            <div className="bg-primary p-5 rounded-2xl shadow-md mt-5">
              <div className="text-[24px] mb-1 ">⚠️</div>
              You can't form a club in this club as the club doesn't have a
              registered court.
            </div>
          )}
        </div>
      )}
    </>
  );
});
