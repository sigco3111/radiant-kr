<script lang="ts">
	import GalleryGrid from '$lib/components/GalleryGrid.svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import { shaders } from '$lib/shaders';
	import { getContext } from 'svelte';
	import type { ColorScheme } from '$lib/color-schemes';
	const getScheme = getContext<() => ColorScheme>('colorScheme');
</script>

<svelte:head>
	<title>전체 셰이더 — Radiant</title>
</svelte:head>

<GalleryHeader title="전체 셰이더" description="{shaders.length}개의 프로덕션 준비 셰이더와 효과. 클릭하여 둘러보고, 설정하고, 다운로드하세요." count={shaders.length} />
<GalleryGrid shaders={shaders} scheme={getScheme()} />
