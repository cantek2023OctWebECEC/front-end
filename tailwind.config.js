/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			100: '#fca5a5',
			200: '#ffedd5',
			300: '#f1f5f9',
			400: '#a7f3d0',
			500: '#134e4a',
		},
	},
	plugins: [],
};
