<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const siteUrl = 'https://radiant-shaders.com';
	const pageUrl = `${siteUrl}/learn`;
	const xHandle = '@pbakaus';
	const description =
		'Radiant 셰이더의 인터랙티브 장문 아티클. 각 글은 기법, 수학, 트레이드오프를 단계별로 다루며, 모든 단계에서 직접 만져볼 수 있는 라이브 샌드박스를 제공합니다.';
</script>

<svelte:head>
	<title>심층 분석 — Radiant</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={pageUrl} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:site_name" content="Radiant" />
	<meta property="og:title" content="심층 분석 — Radiant" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content={xHandle} />
	<meta name="twitter:title" content="심층 분석 — Radiant" />
	<meta name="twitter:description" content={description} />
</svelte:head>

<main class="page">
	<header class="head">
		<div class="eyebrow">Radiant · 심층 분석</div>
		<h1>Radiant 셰이더의 인터랙티브 워크스루</h1>
		<p class="lede">
			각 아티클은 한 가지 셰이더를 한 번에 한 메커니즘씩 처음부터 다시 만듭니다. 수학은 페이지에, 코드는 페이지에, 모든 단계는 드래그하고 조작하고 부수고 싶은 라이브 샌드박스입니다.
		</p>
	</header>

	{#if data.entries.length === 0}
		<div class="empty">아직 작성된 심층 분석이 없습니다.</div>
	{:else}
		<div class="grid">
			{#each data.entries as entry (entry.id)}
				<ArticleCard id={entry.id} shader={entry.shader} meta={entry.meta} />
			{/each}
		</div>
	{/if}

	<footer class="more">
		<p>더 많은 글이 준비 중입니다. 그 동안 <a href="/gallery">전체 셰이더 갤러리</a>를 둘러보세요.</p>
	</footer>
</main>

<style>
	.page {
		max-width: 1200px;
		margin: 0 auto;
		padding: calc(var(--nav-height, 56px) + 4rem) 2rem 6rem;
	}
	.head {
		max-width: 760px;
		margin-bottom: 4rem;
	}
	.eyebrow {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(200, 149, 108, 0.75);
		margin-bottom: 1.25rem;
	}
	h1 {
		font-size: clamp(2rem, 4vw, 2.8rem);
		font-weight: 400;
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: #e8e0d8;
		margin: 0 0 1.25rem;
		max-width: 22ch;
	}
	.lede {
		font-size: 1.05rem;
		line-height: 1.6;
		color: rgba(232, 224, 216, 0.65);
		margin: 0;
		max-width: 64ch;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
		gap: 1.5rem;
	}
	.empty {
		padding: 3rem;
		text-align: center;
		color: rgba(232, 224, 216, 0.4);
		border: 1px dashed rgba(200, 149, 108, 0.2);
		border-radius: 8px;
		font-family: 'SF Mono', monospace;
		font-size: 0.9rem;
	}

	.more {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(200, 149, 108, 0.08);
	}
	.more p {
		font-size: 0.9rem;
		color: rgba(232, 224, 216, 0.5);
		margin: 0;
	}
	.more a {
		color: #c8956c;
		border-bottom: 1px solid rgba(200, 149, 108, 0.3);
		transition: border-color 0.2s;
	}
	.more a:hover {
		border-bottom-color: #c8956c;
	}

	@media (max-width: 640px) {
		.page {
			padding: calc(var(--nav-height, 56px) + 2rem) 1.25rem 4rem;
		}
		.head {
			margin-bottom: 2.5rem;
		}
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
