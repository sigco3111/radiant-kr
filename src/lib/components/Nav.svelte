<script lang="ts">
	import { getSavedIds } from '$lib/saved-shaders.svelte';
	const savedCount = $derived(getSavedIds().length);
</script>

<nav>
	<a href="/" class="logo">Radiant</a>
	<div class="links">
		<a href="/gallery">갤러리</a>
		<a href="/learn">심층 분석</a>
		<a href="/#how-to-use">사용법</a>
		<a href="https://github.com/sigco3111/batgrl-gallery" target="_blank" rel="noopener noreferrer">GitHub</a>
		<a href="https://github.com/pbakaus/radiant" target="_blank" rel="noopener noreferrer" class="upstream-link" title="원본 Radiant 저장소">원본</a>
		{#if savedCount > 0}
			<a href="/gallery/saved" class="saved-link">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
				</svg>
				{savedCount}
			</a>
		{/if}
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--nav-height, 56px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(200, 149, 108, 0.1);
	}
	.logo {
		font-size: 1.1rem;
		font-weight: 300;
		color: #c8956c;
		letter-spacing: 0.05em;
	}
	.links {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}
	.links a {
		font-size: 0.8rem;
		color: rgba(232, 224, 216, 0.5);
		transition: color 0.2s;
	}
	.links a:hover {
		color: #c8956c;
	}
	.links a.upstream-link {
		font-size: 0.7rem;
		color: rgba(200, 149, 108, 0.4);
		letter-spacing: 0.05em;
	}
	.links a.upstream-link:hover {
		color: rgba(200, 149, 108, 0.75);
	}
	.saved-link {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		color: #c8956c !important;
		border: 1px solid rgba(200, 149, 108, 0.35);
		border-radius: 12px;
		padding: 0.2rem 0.6rem;
		font-size: 0.75rem;
	}
	.saved-link:hover {
		background: rgba(200, 149, 108, 0.1);
		border-color: rgba(200, 149, 108, 0.6);
	}

	@media (max-width: 640px) {
		nav {
			padding: 0 1rem;
		}
		.links {
			gap: 1rem;
		}
	}
</style>
