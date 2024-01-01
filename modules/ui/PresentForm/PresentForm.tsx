import { Button, TextField } from "@radix-ui/themes";

type FormPayload = {
  description: string;
};

interface Props {
  onSubmit?: (formPayload: FormPayload) => void;
}

export function PresentForm({ onSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (e.target instanceof HTMLFormElement) {
          const descriptionInputEl = e.target[0] as HTMLInputElement;
          onSubmit?.({
            description: descriptionInputEl.value,
          });
        }
      }}
    >
      <label htmlFor="description">
        한줄평
        <TextField.Root size="3">
          <TextField.Input
            id="description"
            placeholder="선물에 대한 한줄평을 작성해주세요!"
          />
          <TextField.Slot>
            <Button type="submit">등록</Button>
          </TextField.Slot>
        </TextField.Root>
      </label>
    </form>
  );
}
