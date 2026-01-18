import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#fff7e6',
//           100: '#ffedcc',
//           200: '#ffe0a3',
//           300: '#ffd479',
//           400: '#ffc750',
//           500: '#faa807', // Your primary color
//           600: '#e69900',
//           700: '#cc8800',
//           800: '#b37700',
//           900: '#996600',
//         },
//         secondary: {
//           50: '#fffae6',
//           100: '#fff4cc',
//           200: '#ffeca3',
//           300: '#ffe479',
//           400: '#ffdc50',
//           500: '#ffd13d', // Your secondary color
//           600: '#ffc61a',
//           700: '#ffbb00',
//           800: '#e6a900',
//           900: '#cc9600',
//         },
//       },
//       fontFamily: {
//         'primary': ['Poppins', 'sans-serif'],
//         'secondary': ['Roboto', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }