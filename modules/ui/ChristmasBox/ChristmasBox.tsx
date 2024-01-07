import { css, cx } from "@/styled-system/css";
import { Cube } from "../Cube/Cube";
import { ChristmasContent } from "./ChristmasContent";
import { useHoverDirty } from "react-use";
import { useRef } from "react";
import { User } from "@/modules/models/user";
import { UserAvatar } from "../User/UserAvatar";

interface Props {
  label?: string;
  content?: React.ReactNode;
  chosenOwner?: User;
  isChosenByMe?: boolean;
  chooseDisabled?: boolean;
  onClickChoosePresent?: () => void;
}

export function ChristmasBox({
  label,
  content,
  chosenOwner,
  isChosenByMe = false,
  chooseDisabled = false,
  onClickChoosePresent,
}: Props) {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHovered = useHoverDirty(hoverRef);
  const isOpened = !!chosenOwner || isHovered;

  return (
    <div
      ref={hoverRef}
      className={cx(
        "group",
        css({
          position: "relative",
          width: "200px",
          height: "200px",
        })
      )}
    >
      {isOpened && (
        <ChristmasContent
          chooseAvailable={!chooseDisabled && (isChosenByMe || !chosenOwner)}
          isChosenByMe={isChosenByMe}
          onClick={onClickChoosePresent}
        >
          {chosenOwner && (
            <div
              className={css({
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(50%, -50%)",
              })}
            >
              <UserAvatar isReady user={chosenOwner} />
            </div>
          )}
          {content}
        </ChristmasContent>
      )}
      <Cube
        zIndex={1}
        width={200}
        height={50}
        darkColor="#296b01"
        lightColor="#1dac04"
        animationType="pop"
        activateAnimation={isOpened}
      />
      <Cube
        width={200}
        height={5}
        darkColor="transparent"
        lightColor="transparent"
      />
      <Cube
        width={200}
        height={100}
        darkColor="#ff0000"
        lightColor="#f94747"
        label={label}
        activateAnimation={isOpened}
      />
    </div>
  );
}
