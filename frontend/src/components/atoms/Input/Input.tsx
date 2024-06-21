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
}

/** Компонент для ввода данных */
export const Input: React.FC<IInputProps> = ({
  name,
  value,
  onChange,
  type,
  disabled,
  placeholder,
}) => {
  return (
    <input
      className={classNames(
        "w-full h-[40px] pl-3 text-[14px] rounded-md bg-bg outline-none transition-all",
        "border-4 border-grey placeholder-grey",
        "focus:border-highlight text-fg"
      )}
      name={name}
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

Input.defaultProps = {
  type: "text",
  disabled: false,
};
