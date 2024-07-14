import TagStore from "@store/tags";

import TrashIcon from "@assets/TrashIcon.svg?react";
import CloseIcon from "@assets/CloseIcon.svg?react";
import AddTag from "@assets/AddTagIcon.svg?react";

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
    TagStore.deleteTag(id);
  };
  return (
    <div className="bg-highlight p-1 font-bold rounded-full  text-bg text-[12px] flex justify-between items-center pl-3 pr-3">
      {isAdd && (
        <div onClick={addTag} className="mr-2">
          <AddTag />
        </div>
      )}

      {text}
      {!isAdd && (
        <div onClick={removeTag} className="ml-3">
          <CloseIcon />
        </div>
      )}
      {isAdd && (
        <div onClick={deleteTag} className="ml-3">
          <TrashIcon />
        </div>
      )}
    </div>
  );
};
