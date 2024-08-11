import React from "react";

import { Heading, HeadingVariant, Loading } from "@atoms/index";

import Blank from "@organisms/matches/Blank";
import BlankStore from "@store/matches/blank";

export const BlankList: React.FC = () => {
  return (
    <>
      {BlankStore.matchWithOutBlank.length > 0 && (
        <>
          <div className="fixed w-full h-full top-0 left-0 bg-primary z-50 overflow-y-auto">
            <div className="p-5">
              <Heading variant={HeadingVariant.H2}>
                Select mark for user
              </Heading>
            </div>

            {BlankStore.isLoading && (
              <div className="flex justify-center items-center mt-[100px] w-full">
                <Loading />
              </div>
            )}
            {!BlankStore.isLoading && (
              <>
                {BlankStore.matchWithOutBlank.map((item) => (
                  <Blank match={item} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
