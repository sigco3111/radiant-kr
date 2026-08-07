<script lang="ts">
	import { shaders } from '$lib/shaders';
	import { colorSchemes, type ColorScheme } from '$lib/color-schemes';
	import ShaderCard from '$lib/components/ShaderCard.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import Changelog from '$lib/components/Changelog.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	let activeScheme: ColorScheme = $state(colorSchemes[0]);
	let heroVisible = $state(true);
	let heroEl: HTMLElement | undefined = $state(undefined);
	const siteUrl = 'https://radiant-shaders.com';
	const pageUrl = siteUrl;
	const shareImageVersion = '3';
	const shareImageUrl = `${siteUrl}/og-image.jpg?v=${shareImageVersion}`;
	const xHandle = '@pbakaus';

	const featuredIds = ['event-horizon', 'gilded-fracture', 'kinetic-grid', 'flow-field', 'torn-paper', 'silk-cascade'];
	const featuredShaders = $derived(
		featuredIds
			.map((id) => shaders.find((s) => s.id === id))
			.filter((s): s is NonNullable<typeof s> => s != null)
	);

	onMount(() => {
		var heroObs = new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }, { threshold: 0.05 });
		if (heroEl) heroObs.observe(heroEl);

		return () => {
			heroObs.disconnect();
		};
	});
</script>

<svelte:head>
	<title>Radiant — 오픈 소스 셰이더 & 효과</title>
	<meta name="description" content="웹을 위한 130개 이상의 프로덕션 준비 셰이더와 시각 효과. 의존성 없음. 바로 사용하세요." />
	<link rel="canonical" href={pageUrl} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:site_name" content="Radiant" />
	<meta property="og:title" content="Radiant — 오픈 소스 셰이더 & 효과" />
	<meta property="og:description" content="웹을 위한 130개 이상의 프로덕션 준비 셰이더와 시각 효과. 의존성 없음. 바로 사용하세요." />
	<meta property="og:image" content={shareImageUrl} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:alt" content="다양한 생성형 셰이더와 효과가 보이는 Radiant 갤러리 미리보기." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={pageUrl} />
	<meta name="twitter:site" content={xHandle} />
	<meta name="twitter:creator" content={xHandle} />
	<meta name="twitter:title" content="Radiant — 오픈 소스 셰이더 & 효과" />
	<meta name="twitter:description" content="웹을 위한 130개 이상의 프로덕션 준비 셰이더와 시각 효과. 의존성 없음. 바로 사용하세요." />
	<meta name="twitter:image" content={shareImageUrl} />
	<meta name="twitter:image:alt" content="다양한 생성형 셰이더와 효과가 보이는 Radiant 갤러리 미리보기." />
</svelte:head>

<div bind:this={heroEl}>
	<Hero scheme={activeScheme} visible={heroVisible} onschemechange={(s) => activeScheme = s} />
</div>

<section class="featured" id="gallery">
	<header>
		<h2>추천</h2>
		<p>컬렉션에서 엄선한 항목.</p>
	</header>
	<div class="featured-grid">
		{#each featuredShaders as shader (shader.id)}
			<ShaderCard {shader} scheme={activeScheme} />
		{/each}
	</div>
	<div class="browse-cta">
		<a href="/gallery" class="btn btn-solid">전체 컬렉션 둘러보기 &rarr;</a>
	</div>
</section>

<HowToUse />

<Changelog />

<Pricing />

<Footer />

<style>
	.featured {
		scroll-margin-top: var(--nav-height, 56px);
		padding: 4rem 3rem;
	}
	.featured header {
		margin-bottom: 2rem;
	}
	.featured header h2 {
		font-size: 1.5rem;
		font-weight: 300;
		letter-spacing: 0.05em;
		color: #c8956c;
	}
	.featured header p {
		margin-top: 0.5rem;
		font-size: 0.85rem;
		color: rgba(232, 224, 216, 0.5);
	}
	.featured-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}
	.browse-cta {
		text-align: center;
		margin-top: 2.5rem;
	}
	.btn {
		display: inline-block;
		padding: 0.75rem 2rem;
		font-size: 0.9rem;
		font-weight: 500;
		border-radius: 6px;
		letter-spacing: 0.02em;
		transition: background 0.2s;
		cursor: pointer;
		text-decoration: none;
	}
	.btn-solid {
		background: #c8956c;
		color: #0a0a0a;
	}
	.btn-solid:hover {
		background: #d4a57c;
	}

	@media (max-width: 900px) {
		.featured-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 640px) {
		.featured {
			padding: 3rem 1.5rem;
		}
		.featured-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
