<section id="support" class="support">
	<div class="support-content">
		<div class="support-text">
			<h2>오픈 소스</h2>
			<p>
				Radiant은 MIT 라이선스 아래 자유롭고 오픈 소스입니다.
				개인 프로젝트, 상업용 제품, 클라이언트 작업 등 원하는 대로 이 셰이더를 사용하세요.
			</p>
			<p class="secondary">
				이 셰이더가 즐거움을 주거나 시간을 절약해준다면, 팁을 남기는 것을 고려해보세요.
			</p>
		</div>
		<div class="support-actions">
			<a href="https://github.com/sigco3111/batgrl-gallery" class="btn btn-solid" target="_blank" rel="noopener noreferrer">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
				</svg>
				GitHub에서 보기
			</a>
			<a href="https://buy.stripe.com/aFa3cwfsEe3G25R6i48Ra03" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
				팁 남기기 &rarr;
			</a>
			<a href="https://github.com/pbakaus/radiant" target="_blank" rel="noopener noreferrer" class="upstream-link" title="원본 Radiant 저장소">원본 보기 →</a>
		</div>
	</div>
</section>

<style>
	.support {
		padding: 4rem 3rem;
		scroll-margin-top: var(--nav-height, 56px);
		border-top: 1px solid rgba(200, 149, 108, 0.1);
	}
	.support-content {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
	}
	.support-text h2 {
		font-size: 1.5rem;
		font-weight: 300;
		letter-spacing: 0.05em;
		color: #c8956c;
	}
	.support-text p {
		margin-top: 0.75rem;
		font-size: 0.9rem;
		color: rgba(232, 224, 216, 0.6);
		line-height: 1.6;
		max-width: 420px;
	}
	.support-text .secondary {
		color: rgba(232, 224, 216, 0.4);
		font-size: 0.85rem;
	}
	.support-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex-shrink: 0;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.7rem 1.5rem;
		font-size: 0.85rem;
		font-weight: 500;
		border-radius: 6px;
		letter-spacing: 0.02em;
		transition: background 0.2s, border-color 0.2s;
		cursor: pointer;
		text-decoration: none;
		white-space: nowrap;
	}
	.btn-solid {
		background: #c8956c;
		color: #0a0a0a;
		border: 1px solid #c8956c;
	}
	.btn-solid:hover {
		background: #d4a57c;
		border-color: #d4a57c;
	}
	.btn-ghost {
		background: transparent;
		border: 1px solid rgba(200, 149, 108, 0.25);
		color: rgba(232, 224, 216, 0.6);
	}
	.btn-ghost:hover {
		border-color: rgba(200, 149, 108, 0.5);
		color: #e8e0d8;
	}

	.upstream-link {
		display: inline-block;
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: rgba(200, 149, 108, 0.5);
		text-decoration: none;
		letter-spacing: 0.04em;
		text-align: center;
		transition: color 0.2s;
	}
	.upstream-link:hover {
		color: rgba(200, 149, 108, 0.85);
	}

	@media (max-width: 640px) {
		.support {
			padding: 3rem 1.5rem;
		}
		.support-content {
			flex-direction: column;
			align-items: flex-start;
			gap: 2rem;
		}
		.support-actions {
			width: 100%;
		}
		.btn {
			width: 100%;
		}
	}
</style>
