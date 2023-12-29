import { StoryObj } from "@storybook/react";
import { TestUI } from "./Test";

export default {
  title: "Test",
  component: TestUI,
};

type Story = StoryObj<typeof TestUI>;

export const Default: Story = {};
