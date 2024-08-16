import { useAnimation } from "@hooks/useAnimation";
import classNames from "classnames";
import React from "react";

interface ISlideProps {
  title: string;
  text: string;
  animation: string;
  index: number;
  step: number;
}
export const Slide: React.FC<ISlideProps> = ({
  animation,
  step,
  text,
  title,
  index,
}) => {
  const container = useAnimation(animation);
  return (
    <div
      className={classNames({
        block: index == step,
        hidden: index != step,
      })}
    >
      <div className="mx-auto w-[250px] mt-[38px]">
        <div ref={container}></div>
      </div>
      <div className="text-center text-[24px]">{title}</div>
      <div className="text-center  w-[75%] mx-auto">{text}</div>
    </div>
  );
};
