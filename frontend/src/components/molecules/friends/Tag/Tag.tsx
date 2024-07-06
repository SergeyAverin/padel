import TagStore from "@store/tags";

interface ITagProps {
  text: string;
  id: number;
  isAdd: boolean;
  userId?: string | null;
}

export const Tag: React.FC<ITagProps> = ({
  text,
  isAdd = false,
  id,
  userId,
}) => {
  const addTag = () => {
    if (userId) {
      TagStore.addTag(userId, id);
    }
  };
  const removeTag = () => {
    if (userId) {
      TagStore.removeTag(userId, id);
    }
  };
  const deleteTag = () => {
    alert("del");
  };
  return (
    <div className="bg-highlight p-1 font-bold rounded-full w-[80px] text-bg text-[12px] flex justify-between items-center pl-3 pr-3">
      {isAdd && <div onClick={addTag}>+</div>}

      {text}
      {!isAdd && <div onClick={removeTag}>X</div>}
      {isAdd && <div onClick={deleteTag}>X</div>}
    </div>
  );
};
