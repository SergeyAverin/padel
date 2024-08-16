import { Heading, HeadingVariant } from "@atoms/index";
import Select from "@atoms/Select";
import React from "react";

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

export const SelectLvl: React.FC = () => {
  const onChange = (item: { label: string; value: string }) => {
    // UserStore.changeLvl(Number(item.value));
  };

  return (
    <>
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
                I let the ball pass and wait for the rebound. <br />I pass my
                lobs 1fols out of 2
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
      </div>
    </>
  );
};
