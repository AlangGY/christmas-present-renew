import { css, cva, cx } from "@/styled-system/css";
import { CSSProperties } from "react";

interface Props {
  zIndex?: number;
  width: number;
  height: number;
  lightColor: string;
  darkColor: string;
  label?: string;
  animationType?: "rotate" | "pop";
}

export function Cube({
  zIndex,
  width,
  height,
  lightColor,
  darkColor,
  label,
  animationType = "rotate",
}: Props) {
  const cubeColor = {
    boxShadow: `0px 0px 5px 1px ${lightColor}`,
    background: `linear-gradient(0deg, ${darkColor}, ${lightColor})`,
  };

  return (
    <div
      className={cubeContainer}
      style={{
        width,
        height,
        zIndex,
      }}
    >
      <div className={cubeStyle({ animationType })}>
        <div
          className={cx(
            cubeFaceStyle,
            css({
              transform: "rotateY(  0deg) translateZ(100px)",
            })
          )}
          style={{ ...cubeColor, width, height }}
        >
          {label}
        </div>
        <div
          className={cx(
            cubeFaceStyle,
            css({
              transform: "rotateY( 90deg) translateZ(100px)",
            })
          )}
          style={{ ...cubeColor, width, height }}
        />
        <div
          className={cx(
            cubeFaceStyle,
            css({
              transform: "rotateY(180deg) translateZ(100px)",
            })
          )}
          style={{ ...cubeColor, width, height }}
        />
        <div
          className={cx(
            cubeFaceStyle,
            css({
              transform: "rotateY(-90deg) translateZ(100px)",
            })
          )}
          style={{ ...cubeColor, width, height }}
        />
        <div
          className={cx(
            cubeFaceStyle,
            css({
              transform: "rotateX(90deg) translateZ(100px)",
            })
          )}
          style={{ ...cubeColor, width, height: width }}
        />
      </div>
    </div>
  );
}

const cubeContainer = css({
  position: "relative",
});

const cubeStyle = cva({
  base: {
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 1s",
    transform: "rotateX(-10deg) rotateY(10deg)",
  },
  variants: {
    animationType: {
      rotate: {
        _groupHover: {
          transform: "rotateX(-10deg) rotateY(50deg)",
        },
      },
      pop: {
        _groupHover: {
          transform:
            "rotateX(-10deg) rotateY(45deg) rotateZ(45deg) translate3d(-46px, -62px, 21px) scale(1.1)",
        },
      },
    },
  },
});

const cubeFaceStyle = css({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  fontWeight: "bold",
  color: "white",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
});
