import { User } from "@/modules/models/user";
import { Avatar } from "@radix-ui/themes";

interface Props {
  user: User;
  color?: string;
}

export function UserAvatar({ user, color }: Props) {
  return (
    <Avatar
      fallback={user.name[0].toUpperCase()}
      color={user.personalColor.color}
    />
  );
}
