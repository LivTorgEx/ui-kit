import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    page: { control: { type: "number", min: 0 } },
    totalPages: { control: { type: "number", min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: { page: 0, totalPages: 5 },
};

export const MiddlePage: Story = {
  args: { page: 2, totalPages: 5 },
};

export const LastPage: Story = {
  args: { page: 4, totalPages: 5 },
};

export const SinglePage: Story = {
  args: { page: 0, totalPages: 1 },
};

function InteractiveDemo() {
  const [page, setPage] = useState(0);
  return (
    <div className="bg-gray-900 p-6 rounded-2xl">
      <Pagination page={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};

export const CustomLabels: Story = {
  args: {
    page: 1,
    totalPages: 4,
    previousLabel: "Prev",
    nextLabel: "Next",
  },
};
