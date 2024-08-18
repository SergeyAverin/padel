// import TagStore from "@store/friends/tags";

import TrashIcon from "@assets/TrashIcon.svg?react";
import CloseIcon from "@assets/CloseIcon.svg?react";
import AddTag from "@assets/AddTagIcon.svg?react";
import { shortenString } from "@utils/shoringString";
import {
  useAddTagMutation,
  useDeleteTagMutation,
  useRemoveTagMutation,
} from "@redux/api/tags";

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
  const [addTagMutation] = useAddTagMutation();
  const [removeTagMutation] = useRemoveTagMutation();
  const [deleteTagMutation] = useDeleteTagMutation();
  const addTag = () => {
    if (userId) {
      addTagMutation({ tagId: id, userId: userId });
    }
  };
  const removeTag = () => {
    if (userId) {
      removeTagMutation({ tagId: id, userId: userId });
    }
  };
  const deleteTag = () => {
    deleteTagMutation(id);
  };
  return (
    <div className="bg-highlight p-1 font-bold rounded-full  text-bg text-[12px] flex justify-between items-center pl-3 pr-3 select-none">
      {isAdd && (
        <div onClick={addTag} className="mr-2">
          <AddTag />
        </div>
      )}

      {shortenString(text, 10)}
      {!isAdd && (
        <div onClick={removeTag} className="ml-3">
          <CloseIcon stroke="#000" />
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
