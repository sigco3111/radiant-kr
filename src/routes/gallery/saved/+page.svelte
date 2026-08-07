<script lang="ts">
	import GalleryGrid from '$lib/components/GalleryGrid.svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import { shaders } from '$lib/shaders';
	import { getSavedIds } from '$lib/saved-shaders.svelte';
	import { getContext } from 'svelte';
	import type { ColorScheme } from '$lib/color-schemes';

	const getScheme = getContext<() => ColorScheme>('colorScheme');

	const savedShaders = $derived(shaders.filter((s) => getSavedIds().includes(s.id)));
</script>

<svelte:head>
	<title>저장된 셰이더 — Radiant</title>
</svelte:head>

<GalleryHeader
	title="저장됨"
	description={savedShaders.length === 0
		? '아직 저장된 셰이더가 없습니다. 갤러리에서 셰이더를 북마크하여 여기에 모아보세요.'
		: `저장된 셰이더 ${savedShaders.length}개.`}
	count={savedShaders.length}
/>
<GalleryGrid shaders={savedShaders} scheme={getScheme()} />

{#if savedShaders.length === 0}
	<div class="empty-cta">
		<a href="/gallery/all">전체 셰이더 둘러보기 &rarr;</a>
	</div>
{/if}

<style>
	.empty-cta {
		text-align: center;
		padding-bottom: 3rem;
	}
	.empty-cta a {
		font-size: 0.8rem;
		color: #c8956c;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	.empty-cta a:hover {
		text-decoration: underline;
	}
</style>
