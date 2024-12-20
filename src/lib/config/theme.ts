import { defaultTheme } from 'tailwindcss/defaultTheme';

export const fontConfig = {
  sans: [
    `Inter, ${defaultTheme.fontFamily.sans}`,
    {
      fontFeatureSettings: '"cv02"'
    }
  ],
  serif: [
    `Spectral, ${defaultTheme.fontFamily.serif}`,
    {
      fontFeatureSettings: '"pnum", "onum"'
    }
  ]
};

export const customExtensions = {
  textShadow: {
    DEFAULT: '1px solid var(--tw-shadow-color)'
  },
  gridTemplateRows: {
    auto: 'auto'
  },
  listStyleType: {
    circle: 'circle',
    square: 'square',
    'lower-alpha': 'lower-alpha',
    'lower-roman': 'lower-roman'
  }
};