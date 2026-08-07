import { error } from '@sveltejs/kit';
import { getShaderById } from '$lib/shaders';
import { hasArticle, articles, articleMeta } from '$lib/articles';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = ({ params }) => {
	const shader = getShaderById(params.id);
	if (!shader) {
		throw error(404, '셰이더를 찾을 수 없습니다');
	}
	if (!hasArticle(params.id)) {
		throw error(404, '이 셰이더에 대한 심층 분석이 아직 작성되지 않았습니다');
	}
	const meta = articleMeta[params.id];
	return { shader, meta };
};

export function entries() {
	return Object.keys(articles).map((id) => ({ id }));
}
