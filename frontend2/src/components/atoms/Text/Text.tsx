/** Компонент содержащий текст */
export const Text: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="text-[18px]">{children}</div>
    </>
  );
};
