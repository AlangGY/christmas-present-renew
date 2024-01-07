import { useEffect, useMemo, useState } from "react";
import { PresenceState, RoomFetcher } from "./RoomFetcher";
import { User } from "@/modules/models/user";
import { Present } from "@/modules/models/present";

interface Props {
  myUser: User;
}

export function useRoom({ myUser }: Props) {
  const roomFetcher = useMemo(() => new RoomFetcher(), []);
  const [roomState, setRoomState] = useState<PresenceState[]>([]);
  const myState = useMemo(
    () => roomState.find((state) => state.user?.name === myUser.name),
    [roomState, myUser]
  );
  const users = useMemo(
    () =>
      roomState
        .filter(
          (state): state is { user: User; isReady?: boolean } => !!state.user
        )
        .map((state) => ({
          user: new User(state.user.name, state.user.personalColor.color),
          isReady: state.isReady,
        })),
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

  const isAllUserHaveRegisteredPresent = useMemo(
    () =>
      users.every(
        (user) =>
          presents.some((present) => present.owner === user.user.name) &&
          user.isReady
      ),
    [users, presents]
  );

  const postPresent = (present: Present) => {
    roomFetcher.postPresent(present);
  };

  const toggleReady = () => {
    if (!myState?.isReady && !myState?.present) {
      alert("선물을 등록해주세요.");
      return;
    }
    roomFetcher.updateReadyState(!roomFetcher.localState?.isReady);
  };

  useEffect(() => {
    roomFetcher.joinRoom("test", myUser);
    roomFetcher.setOnSyncState((roomState) => setRoomState(roomState ?? []));
  }, [roomFetcher, myUser]);

  return {
    myState,
    users,
    presents,
    isAllUserHaveRegisteredPresent,
    postPresent,
    toggleReady,
  };
}
