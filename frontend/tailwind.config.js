/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#C820A7', // Cor personalizada para o botão
        customPinkTwo: '#A01A86',
        customBg: '#F2F2F2', // Cor personalizada pro background
        customBgGrey: '#B1B1B1', // Cor personalizada pro background workspace
        customPurple: '#a343e4'
      },
      fontFamily: {
        'neue-machina-inktrap-light': ['PP Neue Machina Inktrap Light', 'sans-serif'],
        'neue-machina-inktrap-light-italic': ['PP Neue Machina Inktrap Light Italic', 'sans-serif'],
        'neue-machina-inktrap-regular': ['PP Neue Machina Inktrap Regular', 'sans-serif'],
        'neue-machina-inktrap-regular-italic': ['PP Neue Machina Inktrap Regular Italic', 'sans-serif'],
        'neue-machina-inktrap-ultrabold': ['PP Neue Machina Inktrap Ultrabold', 'sans-serif'],
        'neue-machina-inktrap-ultrabold-italic': ['PP Neue Machina Inktrap Ultrabold Italic', 'sans-serif'],
        'neue-machina-plain-light': ['PP Neue Machina Plain Light', 'sans-serif'],
        'neue-machina-plain-light-italic': ['PP Neue Machina Plain Light Italic', 'sans-serif'],
        'neue-machina-plain-regular': ['PP Neue Machina Plain Regular', 'sans-serif'],
        'neue-machina-plain-regular-italic': ['PP Neue Machina Plain Regular Italic', 'sans-serif'],
        'neue-machina-plain-ultrabold': ['PP Neue Machina Plain Ultrabold', 'sans-serif'],
        'neue-machina-plain-ultrabold-italic': ['PP Neue Machina Plain Ultrabold Italic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


