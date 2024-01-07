"use client";

import { useRoom } from "@/modules/feature/room/useRoom";
import { Present } from "@/modules/models/present";
import { User } from "@/modules/models/user";
import { ChristmasBoxListCarousel } from "@/modules/ui/ChristmasBox/ChristmasBoxListCarousel";
import { ContentLayout } from "@/modules/ui/ContentLayout/ContentLayout";
import { FooterLayout } from "@/modules/ui/Footer/FooterLayout";
import { HeaderLayout } from "@/modules/ui/Header/HeaderLayout";
import { PresentForm } from "@/modules/ui/PresentForm/PresentForm";
import { UserAvatar } from "@/modules/ui/User/UserAvatar";
import { UserAvatarList } from "@/modules/ui/User/UserAvatarList";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const mockPresents = [
  new Present(1, "1", "1", "1"),
  new Present(2, "2", "2", "2"),
  new Present(3, "3", "3", "3"),
  new Present(4, "4", "4", "4"),
  new Present(5, "5", "5", "5"),
];

export default function RoomPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const color = searchParams.get("color");
  const me = useMemo(
    () => new User(name ?? "unknown", color ?? "unknown"),
    [name, color]
  );

  const {
    myState,
    users,
    presents,
    isAllUserHaveRegisteredPresent,
    postPresent,
    toggleReady,
  } = useRoom({
    myUser: me,
  });

  return (
    <>
      <HeaderLayout center={<Heading>크리스마스 선물 고르기</Heading>} />
      <ContentLayout>
        <PresentForm
          onSubmit={(form) => {
            postPresent(
              new Present(
                Date.now(),
                me.name,
                form.description,
                form.description
              )
            );
          }}
        />
        <form
          className={flex({
            justifyContent: "center",
            marginTop: "2",
          })}
        >
          <Button
            type="button"
            color={myState?.isReady ? "red" : "green"}
            onClick={() => {
              toggleReady();
            }}
          >
            {myState?.isReady ? "준비 취소" : "준비 완료"}
          </Button>
        </form>
        <Flex
          justify="center"
          className={css({
            marginTop: "5px",
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "8px",
          })}
        >
          {isAllUserHaveRegisteredPresent && (
            <ChristmasBoxListCarousel
              presents={presents}
              onClickPresent={() => {}}
            />
          )}
        </Flex>
      </ContentLayout>
      <FooterLayout
        right={
          <UserAvatarList>
            {users.map((user) => (
              <UserAvatar
                key={user.user.name}
                user={user.user}
                isReady={user.isReady}
              />
            ))}
          </UserAvatarList>
        }
      />
    </>
  );
}
