/** @type { import('@storybook/server-webpack5').StorybookConfig } */
const config = {
  stories: ["../web/**/*.mdx", "../web/**/*.stories.@(json|yaml|yml)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/server-webpack5",
    options: {},
  },
  docs: {
    autodocs: 'tags',
  },
};
export default config;
