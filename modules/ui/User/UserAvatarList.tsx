import { Flex } from "@radix-ui/themes";

interface Props {
  children: React.ReactNode;
}

export function UserAvatarList({ children }: Props) {
  return <Flex gap="2">{children}</Flex>;
}
