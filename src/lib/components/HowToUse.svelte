<section class="how-to-use" id="how-to-use">
	<header>
		<h2>사용법</h2>
		<p>npm 없음. 빌드 단계 없음. 의존성 없음.</p>
	</header>
	<div class="steps">
		<div class="step">
			<span class="step-number">1</span>
			<h3>선택</h3>
			<p>컬렉션을 둘러보고 마음에 드는 셰이더를 찾아보세요. 각 셰이더는 단일 HTML 파일로 자체 완결되어 있습니다.</p>
		</div>
		<div class="step">
			<span class="step-number">2</span>
			<h3>복사</h3>
			<p>소스를 보고 복사하세요. 그것이 전부입니다. 패키지, import, 번들러 설정 없습니다.</p>
		</div>
		<div class="step">
			<span class="step-number">3</span>
			<h3>AI로 리믹스</h3>
			<p>소스를 Claude Code, Cursor, Codex 또는 다른 AI 코딩 도구에 붙여넣으세요. 색상 변경, 타이밍 조정, 프로젝트에 맞는 효과 적용을 요청하세요.</p>
		</div>
	</div>
</section>

<style>
	.how-to-use {
		scroll-margin-top: var(--nav-height, 56px);
		padding: 5rem 3rem;
		max-width: 900px;
		margin: 0 auto;
		border-top: 1px solid rgba(200, 149, 108, 0.08);
	}
	header {
		margin-bottom: 3rem;
	}
	header h2 {
		font-size: 1.5rem;
		font-weight: 300;
		letter-spacing: 0.05em;
		color: #c8956c;
	}
	header p {
		margin-top: 0.5rem;
		font-size: 0.85rem;
		color: rgba(232, 224, 216, 0.5);
	}
	.steps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2.5rem;
	}
	.step {
		position: relative;
	}
	.step-number {
		display: block;
		font-size: 2.5rem;
		font-weight: 200;
		color: rgba(200, 149, 108, 0.45);
		line-height: 1;
		margin-bottom: 0.75rem;
	}
	.step h3 {
		font-size: 1rem;
		font-weight: 500;
		color: rgba(232, 224, 216, 0.85);
		margin-bottom: 0.5rem;
	}
	.step p {
		font-size: 0.85rem;
		line-height: 1.6;
		color: rgba(232, 224, 216, 0.45);
	}

	@media (max-width: 640px) {
		.how-to-use {
			padding: 3rem 1.5rem;
		}
		.steps {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
