import React from "react";

import { Heading, HeadingVariant } from "@atoms/index";

import Blank from "@organisms/matches/Blank";
import { useGetBlanksQuery } from "@redux/api/blankApi";

export const BlankList: React.FC = () => {
  const { data } = useGetBlanksQuery();
  return (
    <>
      {data && data.length > 0 && (
        <>
          <div className="fixed w-full h-full top-0 left-0 bg-primary z-50 overflow-y-auto">
            <div className="p-5">
              <Heading variant={HeadingVariant.H2}>
                Select mark for user
              </Heading>
            </div>

            <>
              {data.map((item) => (
                <Blank match={item} />
              ))}
            </>
          </div>
        </>
      )}
    </>
  );
};
