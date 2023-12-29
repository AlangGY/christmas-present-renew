import { StoryObj } from "@storybook/react";
import { ChristmasBox } from "./ChristmasBox";

export default {
  title: "ChristmasBox",
  component: ChristmasBox,
};

type Story = StoryObj<typeof ChristmasBox>;

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
};
