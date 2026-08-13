import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		// Vercel 배포용: root context 서빙 (radiant-kr.vercel.app)
		// Pages는 gh-pages에 별도 basePath 빌드 보존
		paths: { base: '' },
		// prerender 중 일부 에셋(gtag/favicon)이 base 외부일 수 있음 — 경고만 출력
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
