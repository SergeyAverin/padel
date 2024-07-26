import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import Select from "@atoms/Select";
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

interface LvlDescriptionProps extends React.PropsWithChildren {
  title: string;
  lvl: string;
}
const LvlDescription: React.FC<LvlDescriptionProps> = ({
  children,
  lvl,
  title,
}) => {
  return (
    <div className="mb-3">
      <div className="text-[24px] w-[34px] h-[34px] mb-1 rounded-full p-1 bg-highlight text-bg flex items-center justify-center">
        {lvl}
      </div>
      <div className="text-[24px] mb-1">{title}</div>
      <div>{children}</div>
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
    <div>
      <div className="flex justify-center">
        <div className="w-full p-5">
          <Heading variant={HeadingVariant.H1}>Select lvl</Heading>
          <div className="w-[300px] m-auto mb-5">
            <Select
              defaultValue={{ label: "1 - initiation", value: "1" }}
              options={[
                { label: "1 - initiation", value: "1" },
                { label: "2 - initiation", value: "2" },
                { label: "3 - initiation", value: "3" },
                { label: "4 - initiation", value: "4" },
                { label: "5 - initiation", value: "5" },
                { label: "6 - initiation", value: "6" },
                { label: "7 - initiation", value: "7" },
                { label: "8 - initiation", value: "8" },
                { label: "9 - initiation", value: "9" },
                { label: "10 - initiation", value: "10" },
              ]}
            />
          </div>
          <div className="overflow-y-scroll h-[300px] ">
            <LvlDescription lvl="1" title="initiation">
              I am interested in the rules I'm starting to play
            </LvlDescription>

            <LvlDescription lvl="2" title="Débutant">
              I'm starting to learn the basic moves I know the rules The game is
              slow, the games are short
            </LvlDescription>

            <LvlDescription lvl="3" title="Beginner+">
              I play 1 time a month I'm starting to pull off a few lobs I'm
              starting to play with the windows
            </LvlDescription>

            <LvlDescription lvl="3" title="Beginner+">
              I play 1 time a month I'm starting to pull off a few lobs I'm
              starting to play with the windows
            </LvlDescription>
          </div>
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
