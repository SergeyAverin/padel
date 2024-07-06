interface ITagProps {
  text: string;
  isAdd: boolean;
}

export const Tag: React.FC<ITagProps> = ({ text, isAdd = false }) => {
  return (
    <div className="bg-highlight p-1 font-bold rounded-full w-[80px] text-bg text-[12px] flex justify-between items-center pl-3 pr-3">
      {isAdd && <div>+</div>}

      {text}
      {!isAdd && <div>X</div>}
    </div>
  );
};
