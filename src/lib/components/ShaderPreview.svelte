<script lang="ts">
	import type { Shader } from '$lib/shaders';

	let {
		shader,
		layout = 'full',
		filter = 'none'
	}: {
		shader: Shader;
		layout: 'full' | 'hero' | 'background' | 'accent';
		filter: string;
	} = $props();

	/** Hides the .label overlay, injects FPS counter, and detects interaction hints. */
	function hideLabel(node: HTMLIFrameElement) {
		let hintEl: HTMLElement | null = null;

		function onLoad() {
			try {
				const doc = node.contentDocument;
				if (!doc) return;
				const label = doc.querySelector('.label') as HTMLElement | null;
				if (label) label.style.display = 'none';

				// Inject FPS counter
				if (!doc.getElementById('fps-counter')) {
					const el = doc.createElement('div');
					el.id = 'fps-counter';
					el.style.cssText = 'position:fixed;top:8px;right:10px;font:10px/1 monospace;color:rgba(200,149,108,0.4);z-index:99;pointer-events:none;';
					doc.body.appendChild(el);
					const script = doc.createElement('script');
					script.textContent = `(function(){var f=0,lt=performance.now(),el=document.getElementById('fps-counter');function t(){f++;var n=performance.now();if(n-lt>=1000){el.textContent=f+" fps";f=0;lt=n;}requestAnimationFrame(t);}requestAnimationFrame(t);})();`;
					doc.body.appendChild(script);
				}

				// Detect mouse/touch interaction from script content
				const scripts = doc.querySelectorAll('script');
				let src = '';
				scripts.forEach(s => { src += s.textContent || ''; });

				const hasMouseDown = /addEventListener\s*\(\s*['"]mouse(down|up)['"]/.test(src);
				const hasClick = /addEventListener\s*\(\s*['"]click['"]/.test(src);
				const hasMouseMove = /addEventListener\s*\(\s*['"]mousemove['"]/.test(src);
				const hasTouch = /addEventListener\s*\(\s*['"]touch(start|move)['"]/.test(src);

				let hint = '';
				if (hasClick && hasMouseMove) {
					hint = '이동 및 클릭하여 상호작용';
				} else if (hasMouseDown && hasMouseMove) {
					hint = '드래그하여 상호작용';
				} else if (hasClick) {
					hint = '클릭하여 상호작용';
				} else if (hasMouseMove) {
					hint = '커서를 움직여 상호작용';
				}

				// Remove any previous hint
				if (hintEl) { hintEl.remove(); hintEl = null; }

				if (hint) {
					const container = node.closest('.mock-layout');
					if (container) {
						hintEl = document.createElement('div');
						hintEl.className = 'interaction-hint';
						hintEl.textContent = hint;
						container.appendChild(hintEl);
					}
				}
			} catch {
				/* cross-origin or security restriction — ignore */
			}
		}
		node.addEventListener('load', onLoad);
		return {
			destroy() {
				node.removeEventListener('load', onLoad);
				if (hintEl) hintEl.remove();
			}
		};
	}

	/** Sends heroConfig params to the iframe once it loads. */
	function sendHeroParams(node: HTMLIFrameElement) {
		if (!shader.heroConfig) return { destroy() {} };
		const params = shader.heroConfig.params;
		function onLoad() {
			for (const p of params) {
				node.contentWindow?.postMessage({ type: 'param', name: p.name, value: p.value }, '*');
			}
		}
		node.addEventListener('load', onLoad);
		return {
			destroy() {
				node.removeEventListener('load', onLoad);
			}
		};
	}

	const hasCustomHero = !!shader.heroConfig;
</script>

<div class="preview layout-{layout}">
	{#if layout === 'hero' && hasCustomHero}
		<div class="mock-layout hero-custom-layout">
			<iframe use:hideLabel use:sendHeroParams src="/{shader.file}" title={shader.title} style:filter></iframe>
			<div class="hero-custom-overlay" aria-hidden="true">
				<div class="mock-nav">
					<span class="mock-logo">아크메</span>
					<span class="mock-links">
						<span>기능</span>
						<span>가격</span>
						<span>소개</span>
					</span>
				</div>
				<div class="hero-body">
					<div class="mock-content">
						<h2>여기서 다음 위대한 아이디어가 시작됩니다</h2>
						<p>제품을 돋보이게 하는 생성형 셰이더를 갖춘 아름다운 랜딩 페이지.</p>
						<div class="mock-btn">시작하기</div>
					</div>
				</div>
			</div>
		</div>
	{:else if layout === 'hero'}
		<div class="mock-layout hero-layout" aria-hidden="true">
			<div class="mock-nav">
				<span class="mock-logo">아크메</span>
				<span class="mock-links">
					<span>기능</span>
					<span>가격</span>
					<span>소개</span>
				</span>
			</div>
			<div class="hero-body">
				<div class="mock-content">
					<h2>여기서 다음 위대한 아이디어가 시작됩니다</h2>
					<p>제품을 돋보이게 하는 생성형 셰이더를 갖춘 아름다운 랜딩 페이지.</p>
					<div class="mock-btn">시작하기</div>
				</div>
				<div class="hero-shader">
					<iframe use:hideLabel src="/{shader.file}?p=1.8" title={shader.title} style:filter></iframe>
				</div>
			</div>
		</div>
	{:else if layout === 'background'}
		<div class="mock-layout bg-layout" aria-hidden="true">
			<iframe use:hideLabel src="/{shader.file}" title={shader.title} style:filter></iframe>
			<div class="mock-overlay">
				<div class="mock-overlay-content">
					<h2>환영합니다</h2>
					<p>다크닝 레이어와 함께 전체 뷰포트 셰이더 배경 위에 콘텐츠가 오버레이됩니다.</p>
					<div class="mock-btn">액션 유도</div>
				</div>
			</div>
		</div>
	{:else if layout === 'accent'}
		<div class="mock-layout accent-layout" aria-hidden="true">
			<iframe use:hideLabel src="/{shader.file}" title={shader.title} style:filter></iframe>
			<div class="mock-content">
				<h2>크리에이티브 스튜디오</h2>
				<p>셰이더가 오른쪽에서 극적인 액센트로 페이드인되어 콘텐츠와 함께 깊이감을 만듭니다.</p>
				<div class="mock-btn">자세히 보기</div>
			</div>
		</div>
	{:else}
		<div class="mock-layout full-layout">
			<iframe use:hideLabel src="/{shader.file}" title={shader.title} style:filter></iframe>
		</div>
	{/if}
</div>

<style>
	.preview {
		width: 100%;
		background: #0a0a0a;
		border: 1px solid rgba(200, 149, 108, 0.12);
		border-radius: 8px;
		overflow: hidden;
	}

	.mock-layout {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
	}
	.full-layout {
		aspect-ratio: unset;
		height: 100%;
	}

	iframe {
		border: none;
		display: block;
	}

	/* Full layout */
	.full-layout iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
	}

	/* Hero layout: nav on top, content left + frameless shader right */
	.hero-layout {
		display: flex;
		flex-direction: column;
		background: #0a0a0a;
	}
	.mock-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		border-bottom: 1px solid rgba(200, 149, 108, 0.06);
		flex-shrink: 0;
	}
	.mock-logo {
		font-weight: 600;
		font-size: 0.9rem;
		color: #c8956c;
		letter-spacing: 0.05em;
	}
	.mock-links {
		display: flex;
		gap: 1rem;
		font-size: 0.7rem;
		color: rgba(232, 224, 216, 0.35);
	}
	.hero-body {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 2rem 6rem;
		flex: 1;
		min-height: 0;
	}
	.hero-body .mock-content {
		flex: 1;
		padding: 0 1rem;
	}
	.hero-shader {
		flex: 0 0 40%;
		align-self: stretch;
		position: relative;
	}
	.hero-shader iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	/* Custom hero layout: full-viewport shader with content overlaid */
	.hero-custom-layout {
		background: #0a0a0a;
	}
	.hero-custom-layout > iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.hero-custom-overlay {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.hero-custom-overlay .mock-nav {
		border-bottom-color: rgba(200, 149, 108, 0.1);
	}
	.hero-custom-overlay .hero-body {
		flex: 1;
		min-height: 0;
	}

	/* Background layout: shader behind content, strong darkening */
	.bg-layout iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
	}
	.mock-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		background: rgba(10, 10, 10, 0.7);
		padding: 2rem;
		z-index: 1;
		pointer-events: none;
	}
	.mock-overlay-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		pointer-events: auto;
	}

	/* Accent layout: shader's left side visible, anchored to right edge */
	.accent-layout {
		overflow: hidden;
	}
	.accent-layout iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		-webkit-mask-image: linear-gradient(to right, transparent 0%, black 40%);
		mask-image: linear-gradient(to right, transparent 0%, black 40%);
	}
	.accent-layout > .mock-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		max-width: 45%;
		padding: 2rem 2.5rem;
	}

	/* Shared mock content styles */
	.mock-content h2,
	.mock-overlay h2 {
		font-size: 1.3rem;
		font-weight: 500;
		margin-bottom: 0.6rem;
		color: #e8e0d8;
	}
	.mock-content p,
	.mock-overlay p {
		font-size: 0.75rem;
		color: rgba(232, 224, 216, 0.5);
		line-height: 1.6;
		max-width: 30ch;
	}
	.mock-overlay p {
		max-width: 42ch;
	}
	.mock-btn {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.45rem 1rem;
		font-size: 0.7rem;
		font-weight: 500;
		color: #0a0a0a;
		background: #c8956c;
		border-radius: 4px;
		letter-spacing: 0.03em;
		width: fit-content;
	}

	/* Interaction hint label */
	.preview :global(.interaction-hint) {
		position: absolute;
		bottom: 12px;
		right: 14px;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(200, 149, 108, 0.8);
		background: rgba(10, 10, 10, 0.75);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(200, 149, 108, 0.12);
		padding: 4px 10px;
		border-radius: 4px;
		pointer-events: none;
		z-index: 10;
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	@media (max-width: 640px) {
		.hero-body {
			padding: 1rem 1.5rem;
			flex-direction: column;
		}
		.hero-shader {
			flex: 0 0 50%;
		}
		.mock-content h2, .mock-overlay h2 {
			font-size: 1rem;
		}
		.mock-content p, .mock-overlay p {
			font-size: 0.65rem;
		}
	}
</style>
