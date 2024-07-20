import React from "react";

export const AddUserInMatch: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center p-2">
        <div className="w-[60px] h-[60px] border-2 border-highlight text-highlight rounded-full border-dashed flex justify-center items-center">
          +
        </div>
        <div className="text-[12px] text-center mt-2">1</div>
        <div className="text-[12px] text-center mt-1">1</div>
      </div>
    </>
  );
};
