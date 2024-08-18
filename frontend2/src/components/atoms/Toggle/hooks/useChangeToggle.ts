import { useEffect, useState } from "react";

/**
 * Возвращает функцию для переключения переключателя
 * и текущее состояние переключателя
 * */
export const useChangeToggle = (
  defaultValue: boolean, // Значение переключателя по умолчанию
  onChange: (isActive: boolean) => void, // Вызываемая функция при нажатии на переключатель
  isDisable: boolean = false // Выключает возможность переключать toggle
) => {
  const [isActive, setIsActive] = useState(defaultValue);

  useEffect(() => {
    setIsActive(defaultValue);
  }, [defaultValue]);

  const onClick = () => {
    if (isDisable == false) {
      setIsActive((prev) => {
        onChange(!prev);
        return !prev;
      });
    }
  };

  return { onClick, isActive };
};
