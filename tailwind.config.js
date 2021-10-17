module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			spacing: {
				128: '32rem',
			},
			gridTemplateRows: {
				'[auto,auto,1fr]': 'auto auto 1fr',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
};
