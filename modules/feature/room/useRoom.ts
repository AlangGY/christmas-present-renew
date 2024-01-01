import { useEffect, useMemo, useState } from "react";
import { PresenceState, RoomFetcher } from "./RoomFetcher";
import { User } from "@/modules/models/user";
import { Present } from "@/modules/models/present";

interface Props {
  user: User;
}

export function useRoom({ user }: Props) {
  const [roomState, setRoomState] = useState<PresenceState[]>([]);
  const users = useMemo(
    () =>
      roomState.map(
        (state) => new User(state.user.name, state.user.personalColor.color)
      ),
    [roomState]
  );
  const presents = useMemo(
    () =>
      roomState
        .map((state) => state.present)
        .filter<Present>(
          (present): present is Present => present !== undefined
        ),
    [roomState]
  );
  const roomFetcher = useMemo(() => new RoomFetcher(), []);

  useEffect(() => {
    roomFetcher.joinRoom("test", user);
    roomFetcher.setOnSyncState((roomState) => setRoomState(roomState ?? []));
  }, [roomFetcher, user]);

  const postPresent = (present: Present) => {
    roomFetcher.postPresent(user, present);
  };

  return { users, presents, postPresent };
}
