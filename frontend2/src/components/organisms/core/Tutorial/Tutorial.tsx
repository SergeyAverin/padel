import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import Select from "@atoms/Select";
import { useAnimation } from "@hooks/useAnimation";
import SelectHand from "@organisms/user/SelectHand";
import SelectPosition from "@organisms/user/SelectPosition";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TutorialEditProfielForm from "@organisms/user/TutorialEditProfielForm";
import classNames from "classnames";
import { useSetLvlMutation } from "@redux/api/userApi";
import { useAuthUser } from "@hooks/useAuthUser";

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

export const Tutorial: React.FC = () => {
  const [setLvl] = useSetLvlMutation();
  const [selectedLvl, setSelectedLvl] = useState({
    label: "1 - initiation",
    value: "1",
  });

  const [step, setStep] = useState(1);
  const onChange = (item: { label: string; value: string }) => {
    setLvl(Number(item.value));
    setSelectedLvl(item);
  };
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
      title="Connect with Players"
      text="Look for padel partners who share your skill and passion."
      index={1}
      step={step}
    />,
    <Slide
      animation="/ScoreAnimation.json"
      title="Padel Level"
      text="Join Padel games according to your level."
      index={2}
      step={step}
    />,
    <Slide
      animation="/WinAnimation.json"
      title="Padel Clubs Near You"
      text="Find clubs in your city and stay updated on their games."
      index={3}
      step={step}
    />,
    <Slide
      animation="/MedalAnimation.json"
      title="Player Profile"
      text="Share your padel stats, including game history, playing position, and which hand you play with."
      index={4}
      step={step}
    />,
    <div>
      <div className="">
        <div className="">
          <SelectHand />
        </div>
      </div>
    </div>,
    <div>
      <div className="">
        <div className="">
          <SelectPosition />
        </div>
      </div>
    </div>,
    <div>
      <div className="flex justify-center">
        <div className="w-full p-5">
          <Heading variant={HeadingVariant.H1}>
            <div className="text-[24px]">
              On a scale from 1 to 10, how would you rate your padel level?
              Please refer to the equivalences below (Spanish scale 1-7 and A-D
              scale):
            </div>
          </Heading>
          <div className="overflow-y-scroll h-[300px] ">
            <LvlDescription lvl="1" title="Beginner (Level 1 / D-)">
              <ul>
                <li>Learning the basic rules of the game.</li>
                <li>
                  Practicing fundamental strokes (forehand, backhand, volley).
                </li>
                <li>Short points, few exchanges.</li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="2" title="Beginner (Level 1.5 / D)">
              <ul>
                <li>Learning to control the ball with more stability.</li>
                <li>Understanding ball trajectories.</li>
                <li>First simple rallies.</li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="3" title="Beginner+ (Level 2 / D+)">
              <ul>
                <li>Playing more regularly with short rallies.</li>
                <li>Basic use of the walls (rebounds) and lobs.</li>
                <li>Starting to develop precision in strokes.</li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="4" title="Intermediate (Level 3 / C)">
              <ul>
                <li>
                  Improving precision with basic strokes (forehand, backhand,
                  volley).
                </li>
                <li>Understanding basic tactics (placement, lobs).</li>
                <li>First team play (communication with partner).</li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="5" title="Intermediate+ (Level 3.75 / C+ B-)">
              <ul>
                <li>More accurate volleys and shots.</li>
                <li>Improving court movement and positioning.</li>
                <li>Better use of the walls to vary the ball’s trajectory.</li>
                <li>Participating in amateur tournaments.</li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="6" title="Intermediate++ (Level 4.25 / B)">
              <ul>
                <li>Ability to finish points more often.</li>
                <li>Stronger defense, especially using the double walls.</li>
                <li>Improving smash power and precision.</li>
                <li>Better management of match rhythm.</li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="7" title="Advanced (Level 4.75 / B+)">
              <ul>
                <li>
                  Mastering defensive and attacking shots (lob, smash, volley).
                </li>
                <li>Advanced use of the walls for angled shots.</li>
                <li>Ability to attack quickly after a lob or return.</li>
                <li>
                  Anticipating the opponent’s moves and adjusting strategy.
                </li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="8" title="Advanced+ (Level 5.25/ A-)">
              <ul>
                <li>Mastering complex shots like vibora and bandeja.</li>
                <li>Better control over shot speed and placement.</li>
                <li>Developing mental strength to perform under pressure.</li>
                <li>Increasing tactical shot variation.</li>
              </ul>
            </LvlDescription>

            <LvlDescription lvl="9" title="Expert (Level 6 / A)">
              <ul>
                <li>
                  Mastering all smashes (flat, vibora, bandeja) and shot
                  variations.
                </li>
                <li>
                  Excellent court positioning, anticipating opponent’s shots.
                </li>
                <li>Solid defense with quick, accurate counterattacks.</li>
                <li>Finishing points consistently after rallies.</li>
              </ul>
            </LvlDescription>
            <LvlDescription lvl="10" title="Elite (Level 7 / A+)">
              <ul>
                <li>
                  World-class level of play with highly sophisticated
                  strategies.
                </li>
                <li>
                  Mastery of all match situations, adapting to any opponent.
                </li>
                <li>
                  Dominating the rhythm and seamlessly transitioning between
                  attack and defense.
                </li>
                <li>Flawless execution of advanced shots.</li>
              </ul>
            </LvlDescription>
          </div>
          <div className="w-[285px] m-auto mt-5">
            <Select
              defaultValue={selectedLvl}
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
    <div>
      <div className="">
        <div className="">
          <TutorialEditProfielForm next={next} prev={prev} />
        </div>
      </div>
    </div>,
  ];

  const authUser = useAuthUser();
  useEffect(() => {
    if (authUser) {
      if (authUser.is_first_open == null) {
        localStorage.setItem("isOpen", "true");
      }
      if (authUser.is_first_open == false) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
  }, [authUser]);

  return (
    <div className="flex flex-col justify-between h-min-[200px]">
      {isOpen && (
        <div className="fixed flex flex-col justify-between  left-0 top-0 overflow-y-auto bg-primary pb-5 text-fg w-full h-full z-[1000] transition-all">
          {!(step in [1, 2, 3, 4, 5]) && step > 3 && sliders[step - 1]}
          {sliders[0]}
          {sliders[1]}
          {sliders[2]}
          {sliders[3]}
          {step != 8 && (
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
    </div>
  );
};

export const TutorialPortal = () => {
  return ReactDOM.createPortal(
    <Tutorial />,
    document.querySelector("#tutorial") as Element
  );
};
