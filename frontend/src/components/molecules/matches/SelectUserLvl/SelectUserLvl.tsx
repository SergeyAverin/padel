import { Heading, HeadingVariant } from "@atoms/index";
import Select from "@atoms/Select";
import React from "react";

interface SelectUserLvlProps {
  title: string;
  onChange: (option: { label: string; value: string }) => void;
}

export const SelectUserLvl: React.FC<SelectUserLvlProps> = ({
  title,
  onChange,
}) => {
  return (
    <>
      <Heading variant={HeadingVariant.H2}>{title}</Heading>
      <Select
        onChange={onChange}
        defaultValue={{ label: "1", value: "1" }}
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
          { label: "6", value: "6" },
          { label: "7", value: "7" },
          { label: "8", value: "8" },
          { label: "9", value: "9" },
          { label: "10", value: "10" },
        ]}
      />
    </>
  );
};
