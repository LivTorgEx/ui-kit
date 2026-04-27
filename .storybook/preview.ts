import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "../src/style.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "dark",
    }),
  ],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#030712" },
        { name: "light", value: "#f9fafb" },
      ],
    },
    layout: "padded",
  },
};

export default preview;
