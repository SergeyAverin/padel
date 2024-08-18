import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import { useNavigate } from "react-router-dom";
import { IClub } from "@schemas/club";
import { useDeleteClubMutation } from "@redux/api/clubApi";

interface IDeleteClubFormProps {
  club: IClub;
}

export const DeleteClubForm: React.FC<IDeleteClubFormProps> = observer(
  ({ club }) => {
    const [value, setValue] = useState("");
    const [isError, setIsError] = useState(false);
    const [deleteClub] = useDeleteClubMutation();
    const navigate = useNavigate();
    const onClick = () => {
      if (club && club.name == value) {
        deleteClub(club.id);
        navigate("/clubs");
      } else {
        setIsError(true);
      }
    };
    return (
      <div className="p-5 bg-primary rounded-xl pb-[50px] pt-[50px]">
        <Label>
          <div className="text-[20px] mb-5">Delete club</div>
        </Label>
        {club && (
          <div className="mb-5">Write club name ({club.name}) to delete.</div>
        )}
        {isError && <div className="text-error mb-3">No valid name</div>}
        <Input
          value={value}
          name="clubName"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <div className="mt-5">
          <Button variant={ButtonVariant.DANGER} onClick={onClick}>
            Delete
          </Button>
        </div>
      </div>
    );
  }
);
