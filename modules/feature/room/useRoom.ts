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

  const chosenPresents = useMemo(
    () =>
      roomState
        .filter<{ choice: Present; user: User }>(
          (state): state is { choice: Present; user: User } => {
            return !!state.choice && !!state.user;
          }
        )
        .map((state) => ({
          present: state.choice,
          chosenBy: state.user,
        })),
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

  const isAllUserChosePresent = useMemo(
    () =>
      users.every(
        (user) =>
          chosenPresents.some(
            (chosenPresent) =>
              chosenPresent.chosenBy.name === user.user.name &&
              chosenPresent.present
          ) && user.isReady
      ),
    [users, chosenPresents]
  );

  const postPresent = (present: Present) => {
    roomFetcher.postPresent(present);
  };

  const choosePresent = (present: Present) => {
    if (
      chosenPresents.some(
        (chosenPresent) =>
          chosenPresent.present?.id === present.id &&
          chosenPresent.chosenBy.name !== myUser.name
      )
    ) {
      alert("이미 선택된 선물입니다.");
      return;
    }
    roomFetcher.togglePresentChoice(present);
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
    chosenPresents,
    isAllUserHaveRegisteredPresent,
    isAllUserChosePresent,
    postPresent,
    toggleReady,
    choosePresent,
  };
}
