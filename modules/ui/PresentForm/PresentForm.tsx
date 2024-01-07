import { Box, Button, Flex, TextArea, TextField } from "@radix-ui/themes";

type FormPayload = {
  description: string;
};

interface Props {
  isRegistered?: boolean;
  onSubmit?: (formPayload: FormPayload) => void;
}

export function PresentForm({ isRegistered = false, onSubmit }: Props) {
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
        한줄평 등록하기
        <Flex direction="column" gap="2">
          <TextArea
            id="description"
            size="3"
            placeholder="선물에 대한 한줄평을 작성해주세요!"
          />
          <Button type="submit" color={isRegistered ? "gray" : "green"}>
            {isRegistered ? "수정하기" : "등록하기"}
          </Button>
        </Flex>
      </label>
    </form>
  );
}
