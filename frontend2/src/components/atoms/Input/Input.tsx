import classNames from "classnames";

interface IInputProps {
  /** Значение html атрибута name */
  name: string;

  /** Значение компонента ввода */
  value: string | number;

  /** Функция вызываемая при вводе значения, в поле ввода */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Если true, редактирование поле ввода будут отключено */
  disabled?: boolean;

  /** Тип компонента ввода */
  type?: string;

  /**  Текст подсказки */
  placeholder?: string;

  requirement?: boolean;

  haveBackground?: boolean;
}

/** Компонент для ввода данных */
export const Input: React.FC<IInputProps> = ({
  name,
  value,
  onChange,
  type,
  disabled,
  placeholder,
  requirement = true,
  haveBackground = true,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={classNames(
          "absolute left-[10px] top-[-25%] pl-2 pr-2 text-[14px] focus:text-highlight",
          {
            "bg-primary": haveBackground,
            "bg-bg": !haveBackground,
          }
        )}
      >
        {name}
      </label>
      <input
        className={classNames(
          "w-full h-[40px] p-[20px] text-[16px] rounded-2xl  outline-none transition-all",
          "border-2 border-grey placeholder-grey",
          "focus:border-highlight text-fg",
          {
            "bg-primary": haveBackground,
            "bg-bg": !haveBackground,
          }
        )}
        name={name}
        id={name}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        required={requirement}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  disabled: false,
};
