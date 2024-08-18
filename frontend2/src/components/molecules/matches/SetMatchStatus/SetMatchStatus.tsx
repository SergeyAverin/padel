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
  return (
    <>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={[
          { value: MatchStatusEnum.DONE, label: "Done" },
          {
            value: MatchStatusEnum.EXPECTATION,
            label: "Expectation",
          },
        ]}
      />
    </>
  );
};
