import classNames from "classnames";

import { ButtonVariant } from "./ButtonVariant";

interface IButtonProps extends React.PropsWithChildren {
  /** Функция вызываемая при клике на кнопку */
  onClick?: (event: React.MouseEvent) => void;

  /** Иконка отображаемая в левой части кнопки */
  icon?: React.ReactNode;

  /** Вариант кнопки, влияет на внешний вид кнопки */
  variant?: string;

  /** Тип кнопки */
  type?: "button" | "submit" | "reset" | undefined;
}

/** Компонент кнопки вызывающий функцию при клике на неё */
export const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  icon,
  variant,
  type,
}) => {
  return (
    <button
      type={type ? type : "button"}
      className={classNames(
        "w-full",
        "h-full",
        "p-3 rounded-md select-none cursor-pointer text-center font-montserrat font-bold",
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
      onClick={onClick}
    >
      {/** Отображает иконку в левой части кнопки */}
      {icon && <div className="w-[18px] h-[18px] mr-[8px]">{icon}</div>}

      <div>{children}</div>
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};
