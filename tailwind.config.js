/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milktea: {
          50: '#FAF6F0',
          100: '#F5ECE1',
          200: '#EAD7C4',
          300: '#DCC1A4',
          400: '#C9A37D',
          500: '#B08257',
          600: '#94663B',
          700: '#784E2A',
          800: '#5C391D',
          900: '#3D2411',
          950: '#241408',
        },
        boba: {
          black: '#26150B',
          pearl: '#3B2112',
          caramel: '#9A4D1A',
          amber: '#C77724',
          foam: '#FCFAF7',
          bg: '#FBF7F2',
          card: '#FFFFFF',
          border: '#E8DBCF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        chinese: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'SimSun', 'sans-serif']
      }
    },
  },
  plugins: [],
}
