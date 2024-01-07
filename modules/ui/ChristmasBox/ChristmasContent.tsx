import { css } from "@/styled-system/css";
import { vstack } from "@/styled-system/patterns";
import { Box, Button, Text } from "@radix-ui/themes";

interface Props {
  children: React.ReactNode;
  isChosenByMe?: boolean;
  chooseAvailable?: boolean;
  onClick?: () => void;
}

export function ChristmasContent({
  children,
  isChosenByMe,
  chooseAvailable,
  onClick,
}: Props) {
  return (
    <Box
      className={vstack({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "30vh",
        transform: "translateY(-80%)",
        zIndex: 2,
        p: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 0 6px -1px rgba(0, 0, 0, 0.3)",
        fontWeight: "bold",

        animation: "showFromBottom 1s ease-in forwards",
      })}
    >
      <Text color="green">한줄평</Text>
      {children}
      {isChosenByMe || chooseAvailable ? (
        <Button color={isChosenByMe ? "red" : "green"} onClick={onClick}>
          {isChosenByMe ? "선택 취소하기" : "선택하기"}
        </Button>
      ) : (
        <div />
      )}
    </Box>
  );
}
