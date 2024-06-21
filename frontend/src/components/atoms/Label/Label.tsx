interface IInputProps extends React.PropsWithChildren {
  /** Атрибут html for, указывающий на имя поле ввода */
  htmlFor?: string;
}

/** Компонент с текстом перед полем ввода */
export const Label: React.FC<IInputProps> = ({ htmlFor, children }) => {
  return (
    <>
      <label className="text-[16px] font-medium" htmlFor={htmlFor}>
        {children}
      </label>
    </>
  );
};
