import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		// Pages 정적 호스팅: subpath deploy (/sigco3111.github.io/radiant-kr/)
		paths: { base: '/radiant-kr' },
		// prerender 중 일부 에셋(gtag/favicon)이 base 외부일 수 있음 — 경고만 출력
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
