/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ]
      },
      typography: {
        DEFAULT: {
          css: {
            'h1': {
              fontSize: '2em'
            },
            'h2': {
              marginTop: '1em',
              marginBottom: '0.5em'
            },
            'ul > li': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem'
            },
            'ol > li': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem'
            },
            'ul > li:first-child': {
              marginTop: '0'
            },
            'ul > li:last-child': {
              marginBottom: '0'
            },
            'ol > li:first-child': {
              marginTop: '0'
            },
            'ol > li:last-child': {
              marginBottom: '0'
            },
            // Table styles
            'table': {
              marginTop: '0',
              marginBottom: '0'
            },
            'thead': {
              borderBottomWidth: '1px'
            },
            'thead th': {
              padding: '0',
              backgroundColor: 'transparent',
              borderBottom: '1px solid #e5e7eb',
              fontWeight: '600'
            },
            'tbody td': {
              padding: '0',
              borderBottom: '1px solid #e5e7eb'
            },
            'tbody tr:last-child td': {
              borderBottom: '1px solid #e5e7eb'
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};