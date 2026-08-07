import { error } from '@sveltejs/kit';
import { techniqueLabels, type ShaderTechnique } from '$lib/shaders';
import { filterShaders, getFilterTitle, getFilterDescription } from '$lib/gallery-filters';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const technique = params.technique as ShaderTechnique;
	if (!(technique in techniqueLabels)) throw error(404, '알 수 없는 기법입니다');
	const filtered = filterShaders('technique', technique);
	return {
		shaders: filtered,
		title: getFilterTitle('technique', technique),
		description: getFilterDescription('technique', technique, filtered.length)
	};
};

export function entries() {
	return (['webgl', 'canvas-2d'] as const).map((technique) => ({ technique }));
}
