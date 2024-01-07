import { css, cva, cx } from "@/styled-system/css";
import { CSSProperties, useEffect, useLayoutEffect, useRef } from "react";

interface Props {
  zIndex?: number;
  width: number;
  height: number;
  lightColor: string;
  darkColor: string;
  label?: string;
  animationType?: "rotate" | "pop";
  activateAnimation?: boolean;
}

export function Cube({
  zIndex,
  width,
  height,
  lightColor,
  darkColor,
  label,
  animationType = "rotate",
  activateAnimation = false,
}: Props) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const cubeColor = {
    boxShadow: `0px 0px 5px 1px ${lightColor}`,
    background: `linear-gradient(0deg, ${darkColor}, ${lightColor})`,
  };

  useEffect(() => {
    if (!cubeRef.current) return;
    const cube = cubeRef.current;
    const keyframe =
      animationType === "rotate" ? rotateKeyframes : popKeyframes;
    cube.animate(keyframe, {
      duration: 800,
      fill: "forwards",
      easing: "ease-in-out",
      direction: activateAnimation ? "normal" : "reverse",
    });
  }, [animationType, activateAnimation]);

  return (
    <div
      className={cubeContainer}
      style={{
        width,
        height,
        zIndex,
      }}
    >
      <div ref={cubeRef} className={cubeStyle}>
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

const cubeStyle = css({
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 1s",
  transform: "rotateX(-10deg) rotateY(10deg)",
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

const rotateKeyframes: Keyframe[] = [
  { transform: "rotateX(-10deg) rotateY(10deg)" },
  { transform: "rotateX(-10deg) rotateY(50deg)" },
];

const popKeyframes: Keyframe[] = [
  { transform: "rotateX(-10deg) rotateY(10deg)" },
  {
    transform:
      "rotateX(-10deg) rotateY(45deg) rotateZ(45deg) translate3d(-46px, -62px, 21px) scale(1.1)",
  },
];
