import { Button, ButtonVariant } from "@atoms/index";
import React, { useState } from "react";
import { Slide } from "./Slide";
import SelectHand from "@organisms/user/SelectHand";
import SelectPosition from "@organisms/user/SelectPosition";

export const Tutorial: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
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
  const sliders = [
    <Slide
      animation="/FindFriendsAnimation.json"
      title="Find frinds"
      text="Look for padel playmates who are equal in strength to you."
      index={1}
      step={step}
    />,
    <Slide
      animation="/ScoreAnimation.json"
      title="Lvl"
      text="All users have lvl, which shows their current level of play in padel."
      index={2}
      step={step}
    />,
    <Slide
      animation="/WinAnimation.json"
      title="Clubs"
      text="Search for padel clubs in your city. And you see the matches of this club."
      index={3}
      step={step}
    />,
    <Slide
      animation="/MedalAnimation.json"
      title="Profile"
      text="All users can see your match history and information about what position and what hand you play in padel."
      index={4}
      step={step}
    />,
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

  return (
    <div className="flex flex-col justify-between fixed left-0 top-0 overflow-y-auto bg-primary pb-5 text-fg w-full h-full z-[1000] transition-all">
      <div>
        {!(step in [1, 2, 3, 4, 5]) && step > 3 && sliders[step - 1]}
        {sliders[0]}
        {sliders[1]}
        {sliders[2]}
        {sliders[3]}
      </div>
      <div>
        {step != 7 && (
          <div className="flex justify-center items-center">
            <div>
              <div className="w-[280px] mt-5">
                <Button
                  type="submit"
                  variant={ButtonVariant.FULL_HIGHLIGHT}
                  onClick={() => next()}
                >
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
        )}
      </div>
    </div>
  );
};
