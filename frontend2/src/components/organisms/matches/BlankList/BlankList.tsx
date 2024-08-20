import React, { useEffect, useState } from "react";

import { Button, Heading, HeadingVariant } from "@atoms/index";

import Blank from "@organisms/matches/Blank";
import { useGetBlanksQuery } from "@redux/api/blankApi";

export const BlankList: React.FC = () => {
  const { data } = useGetBlanksQuery();
  const [step, setStep] = useState(0);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (data && data?.length > 0) {
      setIsShow(true);
    }
  }, [data]);
  const next = (isArrow: boolean = true) => {
    if (data && step + 1 < data.length) {
      setStep((prev) => prev + 1);
    } else {
      if (!isArrow) {
        setIsShow(false);
      }
    }
  };
  // const prev = () => {
  //   if (step - 1 >= 0) {
  //     setStep((prev) => prev - 1);
  //   }
  // };
  return (
    <>
      {isShow && data && (
        <>
          <div className="fixed w-full h-full top-0 left-0 bg-primary z-50 overflow-y-auto">
            <div className="p-5">
              <Heading variant={HeadingVariant.H2}>
                Select mark for user
              </Heading>
            </div>
            <>
              <Blank
                close={() => setIsShow(false)}
                match={data[step]}
                setNext={() => next(false)}
                navigate={
                  <div className="flex  justify-between items-center">
                    <div>
                      {step + 1} / {data.length}
                    </div>
                    {/* <div className="flex">
                      <div onClick={prev} className="mr-[15px] text-[32px]">
                        ←
                      </div>
                      <div onClick={() => next()} className="text-[32px]">
                        →
                      </div>
                    </div> */}
                  </div>
                }
              />
            </>
          </div>
        </>
      )}
    </>
  );
};
