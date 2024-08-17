import { Heading, HeadingVariant } from "@atoms/index";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import React from "react";

interface SelectUserLvlProps {
  title: string;
  onChange: (option: { label: string; value: string }) => void;
  value: Option;
}

export const SelectUserLvl: React.FC<SelectUserLvlProps> = ({
  title,
  onChange,
  value,
}) => {
  return (
    <>
      <Heading variant={HeadingVariant.H2}>{title}</Heading>
      <Select
        onChange={onChange}
        defaultValue={value}
        options={[
          { label: "1 | Initiation", value: "-1.5" },
          { label: "2 | Beginner", value: "-1" },
          { label: "3 | Beginner+", value: "-0.75" },
          { label: "4 | Intermediate", value: "-0.5" },
          { label: "5 | Intermediate+", value: "-0.25" },
          { label: "6 | Advanded", value: "0" },
          { label: "7 | Advanded+", value: "0.25" },
          { label: "8 | Expert", value: "0.75" },
          { label: "9 | Expert+", value: "1" },
          { label: "10 | Elite", value: "1.5" },
        ]}
      />
    </>
  );
};
