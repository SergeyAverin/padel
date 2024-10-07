import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { useSetMatchStatusMutation } from "@redux/api/matchApi";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import React, { useState } from "react";

interface ISetMatchStatusProps {
  match: IMatch;
}

export const SetMatchStatus: React.FC<ISetMatchStatusProps> = ({ match }) => {
  const [changeMatchStatus] = useSetMatchStatusMutation();
  const [selectedOption, setSelectedOption] = useState<Option>({
    value: match.status,
    label: match.status,
  });
  const handleChange = (option: Option) => {
    if (option) {
      changeMatchStatus({
        matchId: match.id,
        status: option.value,
      });
    }
    setSelectedOption(option);
  };
  interface IMatchStatusMap {
    [key: string]: Option;
  }
  const matchStatusMap: IMatchStatusMap = {
    done: { value: MatchStatusEnum.DONE, label: "Closed" },
    expectation: {
      value: MatchStatusEnum.EXPECTATION,
      label: "Pending",
    },
    cancel: { value: MatchStatusEnum.CANCEL, label: "Cancel" },
  };
  const default2 = matchStatusMap[selectedOption?.value as string];
  return (
    <>
      <Select
        defaultValue={default2}
        onChange={handleChange}
        options={[
          { value: MatchStatusEnum.DONE, label: "Closed" },
          {
            value: MatchStatusEnum.EXPECTATION,
            label: "Pending",
          },
          {
            value: MatchStatusEnum.CANCEL,
            label: "Cancel",
          },
        ]}
      />
    </>
  );
};
