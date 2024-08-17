import { useCreateTagMutation } from "@redux/api/tags";

export const useCreateTag = (
  value: string,
  setValue: (string: string) => void
) => {
  const [createTagMutation] = useCreateTagMutation();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value != "") {
      createTagMutation(value);
    }
    setValue("");
  };
  return onSubmit;
};
