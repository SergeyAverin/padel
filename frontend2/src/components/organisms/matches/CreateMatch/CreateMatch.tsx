import {
  clubIdSelector,
  courtSelector,
  dateSelector,
  endAtSelector,
  genderSelector,
  isPrivateSelector,
  isShowNextSelector,
  lvlMaxSelector,
  lvlMinSelector,
  startAtSelector,
  stepSelector,
  tagSelector,
  user1Selector,
  user2Selector,
  user3Selector,
  user4Selector,
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
import { useCreateMatchMutation } from "@redux/api/createMatchApi";
import { extractDayAndMonth } from "@utils/dateUtils";
import { Desk } from "./Desk";
import { SelectGender } from "./SelectGender";
import { SelectUsers } from "./SelectUsers";

export const CreateMatch: React.FC = () => {
  const step = useSelector(stepSelector);
  const selectedClub = useSelector(clubIdSelector);
  const selectedDate = useSelector(dateSelector);
  const startAt = useSelector(startAtSelector);
  const endAt = useSelector(endAtSelector);
  const court = useSelector(courtSelector);
  const lvlMin = useSelector(lvlMinSelector);
  const lvlMax = useSelector(lvlMaxSelector);
  const isPrivate = useSelector(isPrivateSelector);
  const tag = useSelector(tagSelector);
  const isShowNext = useSelector(isShowNextSelector);
  const gender = useSelector(genderSelector);

  const user1 = useSelector(user1Selector);
  const user2 = useSelector(user2Selector);
  const user3 = useSelector(user3Selector);
  const user4 = useSelector(user4Selector);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [createMatch] = useCreateMatchMutation();
  useEffect(() => {
    if (step == STEP_COUNT && startAt && endAt && selectedDate) {
      navigation("/");
      const b = extractDayAndMonth(selectedDate);
      const [hoursStart, minutesStart] = startAt.split(":").map(Number);
      const [hoursEnd, minutesEnd] = endAt.split(":").map(Number);
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
      createMatch({
        club_id: Number(selectedClub),
        court_id: Number(court),
        end_at: startDate,
        start_at: endDate,
        is_private: isPrivate,
        match_lvl: `${lvlMin}-${lvlMax}`,
        tag_id: Number(tag),
        gender: gender,

        user_1: user1,
        user_2: user2,
        user_3: user3,
        user_4: user4,
      });
      dispatch(resetState());
    }
  }, [step]);
  return (
    <div className="min-h-[450px] flex flex-col justify-between pt-5">
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
          <div className="mt-5">
            <Desk />
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

      {step == 6 && (
        <div>
          <SelectGender />
        </div>
      )}

      {step == 7 && (
        <div>
          <SelectUsers />
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

      <div className="mt-5">
        <div className="text-right text-[18px] pr-[25px] mb-3">
          {step}/{STEP_COUNT - 1}
        </div>
        {isShowNext && (
          <div className="h-[50px]">
            <Button
              variant={ButtonVariant.FULL_HIGHLIGHT}
              onClick={() => dispatch(nextStep())}
            >
              {step + 1 == STEP_COUNT ? "Create" : "Next"}
            </Button>
          </div>
        )}
        <div className="h-[50px] mt-3">
          {step - 1 != 0 && (
            <Button
              variant={ButtonVariant.OUTLINED}
              onClick={() => dispatch(prevStep())}
            >
              Prev
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
