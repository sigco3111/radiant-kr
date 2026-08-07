export interface ColorScheme {
	id: string;
	name: string;
	swatch: string;
	filter: string;
}

export const colorSchemes: ColorScheme[] = [
	{
		id: 'amber',
		name: '앰버',
		swatch: '#c8956c',
		filter: 'none'
	},
	{
		id: 'monochrome',
		name: '모노',
		swatch: '#999',
		filter: 'grayscale(1)'
	},
	{
		id: 'blue',
		name: '블루',
		swatch: '#6c8ec8',
		filter: 'hue-rotate(175deg)'
	},
	{
		id: 'rose',
		name: '로즈',
		swatch: '#c86c8e',
		filter: 'hue-rotate(300deg) saturate(1.1)'
	},
	{
		id: 'emerald',
		name: '에메랄드',
		swatch: '#6cc889',
		filter: 'hue-rotate(90deg) saturate(1.2)'
	},
	{
		id: 'arctic',
		name: '아틱',
		swatch: '#b8ccd8',
		filter: 'hue-rotate(180deg) saturate(0.5) brightness(1.1)'
	}
];
