import { css } from "@/styled-system/css";

export function TestUI() {
  return <div className={style}>Test</div>;
}

const style = css({
  bg: "red",
  width: "100px",
  height: "100px",
});
