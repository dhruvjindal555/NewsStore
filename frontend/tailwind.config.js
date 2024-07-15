/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-55': '55vh',
      },
      backgroundImage: {
        'my-gradient-1': 'linear-gradient(90deg, hsla(176, 61%, 87%, 1) 0%, hsla(150, 54%, 86%, 1) 50%, hsla(301, 68%, 84%, 1) 100%)',
        'my-gradient-2': 'linear-gradient(90deg, hsla(202, 71%, 27%, 1) 0%, hsla(176, 45%, 66%, 1) 100%)',
    }
    },
  },
  plugins: [],
}

