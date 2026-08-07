import { error } from '@sveltejs/kit';
import { tagLabels, type ShaderTag } from '$lib/shaders';
import { filterShaders, getFilterTitle, getFilterDescription } from '$lib/gallery-filters';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const tag = params.tag as ShaderTag;
	if (!(tag in tagLabels)) throw error(404, '알 수 없는 태그입니다');
	const filtered = filterShaders('tag', tag);
	return {
		shaders: filtered,
		title: getFilterTitle('tag', tag),
		description: getFilterDescription('tag', tag, filtered.length)
	};
};

export function entries() {
	return Object.keys(tagLabels).map((tag) => ({ tag }));
}
