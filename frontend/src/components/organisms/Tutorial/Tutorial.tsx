import { Button, ButtonVariant } from "@atoms/index";
import { useAnimation } from "@hooks/useAnimation";
import SelectHand from "@organisms/account/SelectHand";
import SelectPosition from "@organisms/account/SelectPosition";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ISlideProps {
  title: string;
  text: string;
  animation: string;
}
export const Slide: React.FC<ISlideProps> = ({ animation, text, title }) => {
  const container = useAnimation(animation);
  return (
    <div>
      <div className="mx-auto w-[250px] mt-[38px]">
        <div ref={container}></div>
      </div>
      <div className="text-center text-[24px]">{title}</div>
      <div className="text-center">{text}</div>
    </div>
  );
};

export const Tutorial: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const sliders = [
    <Slide animation="/EmptyAnimation.json" title="Title" text="1" />,
    <Slide animation="/EmptyAnimation.json" title="Title" text="2" />,
    <Slide animation="/EmptyAnimation.json" title="Title" text="3" />,
    <div>
      <div className="flex justify-center">
        <div className="w-[280px text-center]">
          <SelectHand />
        </div>
      </div>
    </div>,
    <div>
      <div className="flex justify-center">
        <div className="w-[280px text-center]">
          <SelectPosition />
        </div>
      </div>
    </div>,
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
        <div className="fixed left-0 top-0 overflow-y-auto bg-primary pb-5 text-fg w-full h-full z-[1000] transition-all">
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
