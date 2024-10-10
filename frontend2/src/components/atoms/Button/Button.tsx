import classNames from "classnames";

import { ButtonVariant } from "./ButtonVariant";
import React from "react";
import style from "./Button.module.css";

interface IButtonProps extends React.PropsWithChildren {
  /** Функция вызываемая при клике на кнопку */
  onClick?: (event: React.MouseEvent) => void;

  /** Иконка отображаемая в левой части кнопки */
  icon?: React.ReactNode;

  /** Вариант кнопки, влияет на внешний вид кнопки */
  variant?: string;

  /** Тип кнопки */
  type?: "button" | "submit" | "reset" | undefined;

  isLoading?: boolean | null;
}

/** Компонент кнопки вызывающий функцию при клике на неё */
export const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  icon,
  variant,
  type,
  isLoading = false,
}) => {
  return (
    <button
      type={type ? type : "button"}
      className={classNames(
        "w-full relative",
        "h-full",
        "p-3 rounded-3xl select-none cursor-pointer text-center font-montserrat font-bold",
        "flex items-center justify-center",
        {
          /** Стили для кнопок заполненных цветом */
          "bg-highlight": variant == ButtonVariant.FULL_HIGHLIGHT,
          "text-fg":
            variant == ButtonVariant.FULL_HIGHLIGHT || ButtonVariant.DANGER,
          "text-primary ": variant == ButtonVariant.FULL_HIGHLIGHT,

          "bg-[#F54747]": variant == ButtonVariant.DANGER,

          /** Стили для  не заполненных кнопок */
          "border-2 border-indigo-500 ": variant == ButtonVariant.OUTLINED,
          "text-highlight": variant == ButtonVariant.OUTLINED,
        }
      )}
      onClick={(e: React.MouseEvent) => {
        if (onClick) onClick(e);
        navigator.vibrate(30);
      }}
    >
      {/** Отображает иконку в левой части кнопки */}
      {icon && <div className="w-[18px] h-[18px] mr-[8px]">{icon}</div>}

      {isLoading && (
        <div
          className={`absolute left-[25px] ${
            variant != ButtonVariant.FULL_HIGHLIGHT
              ? style.spinnerWhite
              : style.spinnerBg
          }`}
        >
          Loading&#8230;
        </div>
      )}

      <div>{children}</div>
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};
