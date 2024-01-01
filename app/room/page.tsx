"use client";

import { useRoom } from "@/modules/feature/room/useRoom";
import { Present } from "@/modules/models/present";
import { User } from "@/modules/models/user";
import { ChristmasBoxListCarousel } from "@/modules/ui/ChristmasBox/ChristmasBoxListCarousel";
import { FooterLayout } from "@/modules/ui/Footer/FooterLayout";
import { HeaderLayout } from "@/modules/ui/Header/HeaderLayout";
import { PresentForm } from "@/modules/ui/PresentForm/PresentForm";
import { UserAvatar } from "@/modules/ui/User/UserAvatar";
import { UserAvatarList } from "@/modules/ui/User/UserAvatarList";
import { css } from "@/styled-system/css";
import { Box, Flex, Heading } from "@radix-ui/themes";
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

  const { users, presents, postPresent } = useRoom({
    user: me,
  });

  return (
    <>
      <Box
        px="4"
        height="100%"
        style={{
          backgroundColor: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <HeaderLayout center={<Heading>크리스마스 선물 고르기</Heading>} />
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
        <Flex justify="center" className={css({})}>
          <ChristmasBoxListCarousel
            presents={presents}
            onClickPresent={() => {}}
          />
        </Flex>
        <div
          className={css({
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          })}
        >
          <FooterLayout
            right={
              <UserAvatarList>
                {users.map((user) => (
                  <UserAvatar key={user.name} user={user} />
                ))}
              </UserAvatarList>
            }
          />
        </div>
      </Box>
    </>
  );
}
