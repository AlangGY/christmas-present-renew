import { center, hstack } from "@/styled-system/patterns";
import { Box } from "@radix-ui/themes";

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function FooterLayout({ left, center: ct, right }: Props) {
  return (
    <Box className={headerStyles}>
      <div className={leftStyles}>{left}</div>
      <div className={centerStyles}>{ct}</div>
      <div className={rightStyles}>{right}</div>
    </Box>
  );
}

const headerStyles = hstack({
  gap: 0,
  h: "72px",
  backgroundColor: "var(--accent-a4)",
  color: "var(--accent-a11)",
  borderBottom: "1px solid var(--accent-a6)",
  w: "100%",
  p: "0 16px",
});

const leftStyles = center({ w: "32px" });

const centerStyles = center({
  flexGrow: 1,
});

const rightStyles = center({});
