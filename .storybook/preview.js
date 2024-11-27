/** @type { import('@storybook/server').Preview } */
const preview = {
  parameters: {
    server: {
      url: 'http://drupal.docker.localhost',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
