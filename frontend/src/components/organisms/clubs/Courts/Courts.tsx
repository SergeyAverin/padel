import React, { useState } from "react";

import { Button, ButtonVariant, Input, Spinner } from "@atoms/index";
import HelpBanner from "@organisms/core/HelpBanner";
import {
  useCreateCourtMutation,
  useDeleteCourtMutation,
  useGetCourtsQuery,
} from "@redux/api/courtApi";
import { IClub } from "@schemas/club";

interface ICourtsProps {
  club: IClub;
}

export const Courts: React.FC<ICourtsProps> = ({ club }) => {
  const [deleteCourt] = useDeleteCourtMutation();
  const [createCourt] = useCreateCourtMutation();
  const { data, isLoading } = useGetCourtsQuery(club.id);

  const onDeleteCourt = (courtId: number) => {
    deleteCourt(courtId);
  };
  const [courtName, setCourtName] = useState("");
  const onCreateCourt = (e: React.FormEvent) => {
    e.preventDefault();
    createCourt({
      name: courtName,
      clubId: club.id,
    });
    setCourtName("");
  };
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <div>
            <HelpBanner isInNavigation={true} localStorageKey="help_add_court">
              Here you can add the court of your club so that users can add
              matches in the discarded court
            </HelpBanner>
            <form onSubmit={onCreateCourt}>
              <div className="mt-5">
                <Input
                  name="court_name"
                  value={courtName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCourtName(e.target.value)
                  }
                />
                <div className="mt-2"></div>
                <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
                  Add court
                </Button>
              </div>
            </form>
            {data.length != 0 && (
              <table className="min-w-full border-collapse border border-gray-200 mt-5">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((court) => (
                    <tr className="bg-gray-100" key={court.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {court.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div onClick={() => onDeleteCourt(court.id)}>
                          <Button variant={ButtonVariant.DANGER}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
};
