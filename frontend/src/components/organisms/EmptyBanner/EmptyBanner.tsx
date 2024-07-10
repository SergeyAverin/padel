import React, { useEffect, useRef } from "react";

import lottie, { AnimationItem } from "lottie-web";

interface IEmptyBannerProps {
  text?: string;
  icon?: React.ReactNode;
}

export const EmptyBanner: React.FC<IEmptyBannerProps> = ({
  text = "Empty",
  icon,
}) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (container.current) {
      const animation: AnimationItem = lottie.loadAnimation({
        container: container.current, // the DOM element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/EmptyAnimation.json", // the path to the animation JSON
      });

      return () => {
        animation.destroy(); // Clean up animation when component unmounts
      };
    }
  }, []);
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div>
        {icon ? (
          icon
        ) : (
          <div className="mx-auto w-[250px] mt-[38px]">
            <div ref={container}></div>
          </div>
        )}
      </div>
      <div>{text}</div>
    </div>
  );
};
