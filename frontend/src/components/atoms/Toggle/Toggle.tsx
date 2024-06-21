import classNames from "classnames";

import { useChangeToggle } from "./hooks/useChangeToggle";

interface IToggleProps {
  /** Функция вызываемая при переключении переключателя,
   * принимает текущее состояние переключателя */
  onChange: (isActive: boolean) => void;

  /** Изначальное состояние переключателя */
  defaultValue: boolean;

  /** Выключает возможность переключать переключатель */
  isDisable?: boolean;
}

/** Компонент переключателя */
export const Toggle: React.FC<IToggleProps> = ({
  onChange,
  defaultValue,
  isDisable,
}) => {
  const { onClick, isActive } = useChangeToggle(
    defaultValue,
    onChange,
    isDisable
  );
  return (
    <div
      onClick={onClick}
      className={classNames(
        "h-[20px] w-[40px] rounded-full relative flex justify-start items-center transition-all",
        {
          "bg-grey": !isActive,
          "bg-highlight": isActive,
        }
      )}
    >
      <div
        className={classNames(
          "bg-fg border-4 w-[25px] h-[25px] absolute rounded-full  transition-all",
          {
            "right-[0%]": isActive,
            "border-highlight": isActive,
            "border-grey": !isActive,
            "right-[38%]": !isActive,
          }
        )}
      ></div>
    </div>
  );
};

Toggle.defaultProps = {
  isDisable: false,
};
