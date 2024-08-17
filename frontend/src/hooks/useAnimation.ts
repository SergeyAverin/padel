import lottie, { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";

export const useAnimation = (animationPath: string) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (container.current) {
      const animation: AnimationItem = lottie.loadAnimation({
        container: container.current, // the DOM element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath, // the path to the animation JSON
      });

      return () => {
        animation.destroy(); // Clean up animation when component unmounts
      };
    }
  }, [animationPath]);
  return container;
};
