<section class="changelog" id="changelog">
	<header>
		<h2>새로운 기능</h2>
	</header>
	<div class="entries">
		<div class="entry">
			<div class="entry-header">
				<span class="version">v1.1</span>
				<span class="date">March 19, 2026</span>
			</div>
			<ul>
				<li>모든 셰이더에 마우스 및 터치 인터랙션 추가 — 이동, 클릭, 드래그로 상호작용</li>
				<li>신규 셰이더: 피드백 루프, 디더 그라데이션, 아날로그 드리프트, 셰터드 플레이즈, 페인티드 스트라타, 신스 리본, 홀로그램 글리치</li>
	<li>문라이트 립플을 3D 원근, 프레넬 물 효과, 조절 가능한 파동 강도로 재작성</li>
				<li>이클립스 글로우 다듬기 — 비대칭 코로나, 부드러운 다이아몬드 링, 깔끔한 파티클</li>
				<li>갤러리 라이브 모드 토글 — 보이는 모든 셰이더를 한 번에 미리보기</li>
				<li>셰이더별 기본 컬러 스킴</li>
				<li>여러 셰이더 성능 개선</li>
			</ul>
		</div>
		<div class="entry">
			<div class="entry-header">
				<span class="version">v1.0</span>
				<span class="date">March 18, 2026</span>
			</div>
			<ul>
				<li>프로덕션 준비 셰이더 및 효과 50종 이상과 첫 출시</li>
				<li>태그, 기법, 영감별 필터링 갤러리</li>
				<li>컬러 스킴 선택 가능한 인터랙티브 홈</li>
				<li>MIT 라이선스, 의존성 없음</li>
			</ul>
		</div>
	</div>
</section>

<style>
	.changelog {
		scroll-margin-top: var(--nav-height, 56px);
		padding: 5rem 3rem;
		max-width: 900px;
		margin: 0 auto;
		border-top: 1px solid rgba(200, 149, 108, 0.08);
	}
	header {
		margin-bottom: 2.5rem;
	}
	header h2 {
		font-size: 1.5rem;
		font-weight: 300;
		letter-spacing: 0.05em;
		color: #c8956c;
	}
	.entries {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}
	.entry {
		padding-left: 1.5rem;
		border-left: 1px solid rgba(200, 149, 108, 0.15);
	}
	.entry-header {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}
	.version {
		font-size: 0.9rem;
		font-weight: 500;
		color: rgba(232, 224, 216, 0.8);
	}
	.date {
		font-size: 0.75rem;
		color: rgba(232, 224, 216, 0.3);
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	li {
		font-size: 0.82rem;
		line-height: 1.7;
		color: rgba(232, 224, 216, 0.45);
		padding-left: 1rem;
		position: relative;
	}
	li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgba(200, 149, 108, 0.3);
	}
	li + li {
		margin-top: 0.25rem;
	}

	@media (max-width: 640px) {
		.changelog {
			padding: 3rem 1.5rem;
		}
	}
</style>
