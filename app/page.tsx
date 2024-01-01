"use client";

import { HeaderLayout } from "@/modules/ui/Header/HeaderLayout";
import { css } from "@/styled-system/css";
import {
  Box,
  Button,
  Heading,
  Section,
  Select,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const avatarColors = [
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "brown",
  "orange",
  "sky",
  "mint",
  "lime",
  "yellow",
  "amber",
  "gold",
  "bronze",
  "gray",
] as const;

export default function Home() {
  const router = useRouter();
  const [color, setColor] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!color) return;
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    const nameInputEl = e.target[0] as HTMLInputElement;
    const name = nameInputEl.value;
    router.push(`/room?name=${name}&color=${color}`);
  };

  return (
    <>
      <HeaderLayout center={<Heading>크리스마스 선물 고르기</Heading>} />
      <Box
        px="4"
        height="100%"
        style={{
          backgroundColor: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Section size="2" />
        <form className={loginFormStyle} onSubmit={handleSubmit}>
          <TextField.Root size="3">
            <TextField.Input placeholder="이름을 입력하세요." />
          </TextField.Root>
          <Select.Root
            size="3"
            defaultValue="색깔을 선택하세요."
            onValueChange={(e) => setColor(e)}
          >
            <Select.Trigger variant="soft" color={color as any} />
            <Select.Content>
              <Select.Item value="색깔을 선택하세요." disabled>
                색깔을 선택하세요.
              </Select.Item>
              {avatarColors.map((color) => (
                <Select.Item key={color} value={color}>
                  {color}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Button>로그인</Button>
        </form>
      </Box>
    </>
  );
}

const loginFormStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
