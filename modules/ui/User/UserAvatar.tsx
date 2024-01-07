import { User } from "@/modules/models/user";
import { Avatar } from "@radix-ui/themes";

interface Props {
  user: User;
  isReady?: boolean;
}

export function UserAvatar({ user, isReady }: Props) {
  return (
    <Avatar
      fallback={user.name[0].toUpperCase()}
      color={user.personalColor.color}
      style={{
        border: isReady ? "2px solid var(--green-8)" : "2px solid var(--red-8)",
      }}
    />
  );
}
