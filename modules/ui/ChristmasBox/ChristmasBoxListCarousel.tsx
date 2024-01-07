import { Present } from "@/modules/models/present";
import { ChristmasBox } from "./ChristmasBox";
import { css } from "@/styled-system/css";
import { useLayoutEffect, useRef, useState } from "react";
import { flex, hstack } from "@/styled-system/patterns";
import { Button } from "@radix-ui/themes";

interface Props {
  presents: Present[];
  onClickPresent: (present: Present) => void;
}

export function ChristmasBoxListCarousel({ presents, onClickPresent }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {}, []);

  useLayoutEffect(() => {
    if (ulRef.current) {
      ulRef.current.childNodes.forEach((node, index) => {
        if (index === currentIndex) {
          (node as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      });
    }
  }, [currentIndex]);

  const next = () => {
    setCurrentIndex((currentIndex + 1) % presents.length);
  };

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + presents.length) % presents.length);
  };

  return (
    <div className={css({})}>
      <div className={carouselStyle} ref={carouselRef}>
        <ul className={ulStyle} ref={ulRef}>
          {presents.map((present, index) => (
            <li key={present.id}>
              <ChristmasBox label={(index + 1).toString()} />
            </li>
          ))}
        </ul>
      </div>
      <div className={buttonContainerStyle}>
        <Button
          size="4"
          style={{
            flexGrow: 1,
          }}
        >
          <span onClick={prev}>⬅</span>
        </Button>
        <Button
          size="4"
          style={{
            flexGrow: 1,
          }}
        >
          <span onClick={next}>➡</span>
        </Button>
      </div>
    </div>
  );
}

const carouselStyle = flex({
  paddingLeft: "30px",
  paddingRight: "30px",
  justify: "flex-start",
  align: "flex-end",
  width: "320px",
  height: "450px",
  overflowY: "auto",
  overflowX: "hidden",
});

const ulStyle = css({
  display: "flex",
  alignItems: "center",
  p: "25px",
  gap: "100px",
});

const buttonContainerStyle = hstack({
  gap: "10px",
  justifyContent: "center",
});
