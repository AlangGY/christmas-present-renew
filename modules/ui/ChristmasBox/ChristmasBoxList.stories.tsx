import { StoryObj } from "@storybook/react";
import { ChristmasBoxListCarousel } from "./ChristmasBoxListCarousel";
import { Present } from "@/modules/models/present";

export default {
  title: "ChristmasBoxList",
  component: ChristmasBoxListCarousel,
};

type Story = StoryObj<typeof ChristmasBoxListCarousel>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    presents: [
      new Present(1, "1", "1", "1"),
      new Present(2, "2", "2", "2"),
      new Present(3, "3", "3", "3"),
    ],
  },
};
