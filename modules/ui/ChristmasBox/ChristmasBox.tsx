import { css, cx } from "@/styled-system/css";
import { Cube } from "../Cube/Cube";

interface Props {
  label?: string;
  isOpened?: boolean;
  onClick?: () => void;
}

export function ChristmasBox({ label, isOpened, onClick }: Props) {
  return (
    <div
      className={cx(
        "group",
        css({
          position: "relative",
          width: "200px",
          height: "200px",
        })
      )}
      onClick={onClick}
    >
      <Cube
        zIndex={1}
        width={200}
        height={50}
        darkColor="#296b01"
        lightColor="#1dac04"
        animationType="pop"
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
      />
    </div>
  );
}
