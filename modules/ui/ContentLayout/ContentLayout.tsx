import { css } from "@/styled-system/css";
import { Box } from "@radix-ui/themes";

interface Props {
  children?: React.ReactNode;
}

export function ContentLayout({ children }: Props) {
  return (
    <Box
      px="4"
      className={css({
        flexGrow: 1,
        position: "relative",
        // TODO: header와 footer 높이를 고정값으로 쓰지 않고, 자동으로 계산해서 쓰도록 하기
        height: "calc(100% - 72px - 72px)",
        backgroundColor: "var(--gray-a2)",
      })}
    >
      {children}
    </Box>
  );
}
