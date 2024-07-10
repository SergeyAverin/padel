import { Button, ButtonVariant } from "@atoms/index";
import { useAnimation } from "@hooks/useAnimation";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ISlideProps {
  text: string;
  animation: string;
}
export const Slide: React.FC<ISlideProps> = ({ animation, text }) => {
  const container = useAnimation(animation);
  return (
    <div>
      <div className="mx-auto w-[250px] mt-[38px]">
        <div ref={container}></div>
      </div>
      <div className="text-center text-[24px]">{text}</div>
      <div className="text-center">{text}</div>
    </div>
  );
};

export const Tutorial: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const sliders = [
    <Slide animation="/EmptyAnimation.json" text="1" />,
    <Slide animation="/EmptyAnimation.json" text="2" />,
    <Slide animation="/EmptyAnimation.json" text="3" />,
  ];
  const next = () => {
    if (step + 1 <= sliders.length) {
      setStep((prev) => prev + 1);
    } else {
      localStorage.setItem("isOpen", "false");
      setIsOpen(false);
    }
  };
  const prev = () => {
    if (step - 1 != 0) {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isOpen") == null) {
      localStorage.setItem("isOpen", "true");
    }
    if (localStorage.getItem("isOpen") == "false") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 bg-primary text-fg w-full h-full z-10 transition-all">
          {sliders[step - 1]}
          <div className="flex justify-center items-center">
            <div>
              <div className="w-[280px] mt-5">
                <Button variant={ButtonVariant.FULL_HIGHLIGHT} onClick={next}>
                  Continue
                </Button>
                <div className="mt-5">
                  <Button variant={ButtonVariant.OUTLINED} onClick={prev}>
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const TutorialPortal = () => {
  return ReactDOM.createPortal(
    <Tutorial />,
    document.querySelector("#tutorial") as Element
  );
};
