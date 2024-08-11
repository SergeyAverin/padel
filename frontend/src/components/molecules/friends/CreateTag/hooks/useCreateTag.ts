import TagStore from "@store/friends/tags";

export const useCreateTag = (
  value: string,
  setValue: (string: string) => void
) => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value != "") {
      TagStore.createTag(value);
    }
    setValue("");
  };
  return onSubmit;
};
