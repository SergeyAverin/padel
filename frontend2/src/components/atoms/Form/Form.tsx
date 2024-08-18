interface IFormProps extends React.PropsWithChildren {}

interface IFormProps {
  /** Функция вызываемая при отправки формы */
  onSubmit: (event: React.FormEvent) => void;
}

/** Обертка для формы */
export const Form: React.FC<IFormProps> = ({ children, onSubmit }) => {
  return (
    <form className="bg-primary rounded-xl p-5" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
