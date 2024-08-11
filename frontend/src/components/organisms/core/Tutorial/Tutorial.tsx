import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import Select from "@atoms/Select";
import { useAnimation } from "@hooks/useAnimation";
import SelectHand from "@organisms/account/SelectHand";
import SelectPosition from "@organisms/account/SelectPosition";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UserStore from "@store/account/user";
import TutorialEditProfielForm from "@organisms/account/TutorialEditProfielForm";
import classNames from "classnames";

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

const onChange = (item: { label: string; value: string }) => {
  UserStore.changeLvl(Number(item.value));
};

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
    <div>
      <div className="">
        <div className="text-center">
          <TutorialEditProfielForm next={next} prev={prev} />
        </div>
      </div>
    </div>,
    <div>
      <div className="flex justify-center">
        <div className="w-full p-5">
          <Heading variant={HeadingVariant.H1}>
            How would you rate your level of padel play?
          </Heading>
          <div className="overflow-y-scroll h-[300px] ">
            <LvlDescription lvl="1" title="Initiation">
              I'm staring to play
              <br />I am interested in the rule
            </LvlDescription>

            <LvlDescription lvl="2" title="Beginner">
              I'm starting to learn the basic moves <br />
              I know the rules
              <br />
              The game is slow, the games are short
            </LvlDescription>

            <LvlDescription lvl="3" title="Beginner+">
              I play 1 time a month <br />
              I'm starting to pull off a few lobs
              <br />
              I'm starting to play with the windows
            </LvlDescription>

            <LvlDescription lvl="4" title="Intermediate">
              I play several times a month
              <br />
              I am starting the competition as an amateur
              <br />
              === Atack === <br />
              I climb on the fly after a lob
              <br />
              I make volleys of forehand and backhand
              <br />
              === Defense === <br />
              I let the ball pass and wait for the rebound. <br />I pass my lobs
              1fols out of 2
            </LvlDescription>

            <LvlDescription lvl="5" title="Intermediate+">
              I play at least 1 time a week <br />
              I'm starting to do approved tournaments <br />
              === Atack === <br />
              I finish points on the fly
              <br />
              Jo finishes points by smashing flat
              <br />
              === Defense === <br />
              I vary between returns in the feet and the lob <br />
              I'm starting to defend the double windows
            </LvlDescription>

            <LvlDescription lvl="6" title="ADVANCED">
              I regularly do approved tournaments
              <br />
              === Atack === <br />
              I finish points in a facelifted smash
              <br />
              I vary the zones and the speeds of my flights
              <br />
              === Defense === <br />
              I manage to slow down or speed up the game <br />I counterattack
              the opponent's smashes
            </LvlDescription>

            <LvlDescription lvl="7" title="ADVANCED+">
              I win several matches during the approved tournaments
              <br />
              === Atack === <br />
              I master the different forms of smashes (vibora and bandeja)
              <br />
              I finish points by getting the ball out
              <br />
              === Defense === <br />
              I manage to defend by turning around the ball
              <br />I make comebacks, in the feet or lobes
            </LvlDescription>

            <LvlDescription lvl="8" title="Expert">
              I am reaching the final stages approved tournaments
              <br />
              === Atack === <br />
              I master all the attack moves I vary the different smashes
              according to of the opponent's game
              <br />
              I finish points by getting the ball out
              <br />
              === Defense === <br />I counterattack by varying the blows I
              master the double windows
            </LvlDescription>

            <LvlDescription lvl="9" title="Expert+">
              I am classified between 400 and 200 French
              <br />
              === Atack === <br />
              I master all the attack moves I will finish the point as soon as
              the opportunity presents itself
              <br />
              I finish points by getting the ball out
              <br />
              === Defense === <br />I master all the defense moves
              <br />I master all the counterattack moves
            </LvlDescription>
            <LvlDescription lvl="10" title="Elit">
              I am part of the French Top 200
            </LvlDescription>
          </div>
          <div className="w-[300px] m-auto mt-5">
            <Select
              defaultValue={{ label: "1 - initiation", value: "1" }}
              onChange={onChange}
              options={[
                { label: "1 - Initiation", value: "1" },
                { label: "2 - Beginner", value: "2" },
                { label: "3 - Beginner+", value: "3" },
                { label: "4 - Intermediate", value: "4" },
                { label: "5 - Intermediate+", value: "5" },
                { label: "6 - initiation", value: "6" },
                { label: "7 - initiation", value: "7" },
                { label: "8 - initiation", value: "8" },
                { label: "9 - initiation", value: "9" },
                { label: "10 - initiation", value: "10" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>,
  ];

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
          {!(step in [1, 2, 3, 4, 5]) && step > 3 && sliders[step - 1]}
          {sliders[0]}
          {sliders[1]}
          {sliders[2]}
          {sliders[3]}
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
