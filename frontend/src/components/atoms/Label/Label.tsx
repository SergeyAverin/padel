interface IInputProps extends React.PropsWithChildren {
  /** Атрибут html for, указывающий на имя поле ввода */
  htmlFor?: string;
}

/** Компонент с текстом перед полем ввода */
export const Label: React.FC<IInputProps> = ({ htmlFor, children }) => {
  return (
    <div className="mb-3">
      <label className="text-[16px] font-medium" htmlFor={htmlFor}>
        {children}
      </label>
    </div>
  );
};
