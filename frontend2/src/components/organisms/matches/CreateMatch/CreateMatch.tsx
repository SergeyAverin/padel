import {
  clubIdSelector,
  courtSelector,
  dateSelector,
  endAtSelector,
  isPrivateSelector,
  lvlMaxSelector,
  lvlMinSelector,
  startAtSelector,
  stepSelector,
  tagSelector,
} from "@redux/selectors/createMatchSelectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectClub } from "./SelectClub";
import { Button, ButtonVariant } from "@atoms/index";
import {
  nextStep,
  prevStep,
  resetState,
  STEP_COUNT,
} from "@redux/features/creaetMatchSlice";
import { SelectDate } from "./SelectDate";
import { SelectStartAt } from "./SelectStartAt";
import { SelectEndAt } from "./SelectEndAt";
import { SelectMatchLvl } from "./SelectMatchLvl";
import { SetIsPrivateLvl } from "./SetIsPrivate";
import { SelectCourt } from "./SelectCourts";
import { useNavigate } from "react-router-dom";

export const CreateMatch: React.FC = () => {
  const step = useSelector(stepSelector);
  const selectedClub = useSelector(clubIdSelector);
  const selectedDate = useSelector(dateSelector);
  const startAt = useSelector(startAtSelector);
  const endAt = useSelector(endAtSelector);
  const lvlMin = useSelector(lvlMinSelector);
  const lvlMax = useSelector(lvlMaxSelector);
  const isPrivate = useSelector(isPrivateSelector);
  const tag = useSelector(tagSelector);
  const court = useSelector(courtSelector);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  useEffect(() => {
    if (step == STEP_COUNT) {
      navigation("/profile");
      dispatch(resetState());
    }
  }, [step]);
  return (
    <div className="h-[450px] flex flex-col justify-between pt-5 mb-[80px]">
      {step == 1 && <SelectClub />}
      {step == 2 && <SelectDate />}
      {step == 3 && (
        <div>
          <SelectStartAt />
          <div className="mt-5">
            <SelectEndAt />
          </div>
          <div className="mt-5">
            <SelectCourt />
          </div>
        </div>
      )}
      {step == 4 && (
        <div>
          <SelectMatchLvl />
        </div>
      )}
      {step == 5 && (
        <div>
          <SetIsPrivateLvl />
        </div>
      )}

      {/* <div>
        {selectedClub} <br />
        {selectedDate}
        <br />
        {startAt}
        <br />
        {endAt}
        <br />
        {lvlMin}
        <br />
        {lvlMax}
        <br />
        {String(isPrivate)}
        <br />
        {tag}
        <br />
        {court}
      </div> */}

      <div>
        <div className="text-right text-[18px] pr-[25px] mb-3">
          {step}/{STEP_COUNT - 1}
        </div>
        <div className="h-[50px]">
          <Button
            variant={ButtonVariant.FULL_HIGHLIGHT}
            onClick={() => dispatch(nextStep())}
          >
            Next
          </Button>
        </div>
        <div className="h-[50px] mt-3">
          <Button
            variant={ButtonVariant.OUTLINED}
            onClick={() => dispatch(prevStep())}
          >
            Prev
          </Button>
        </div>
      </div>
    </div>
  );
};
