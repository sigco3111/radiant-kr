<script lang="ts">
	import type { Shader } from '$lib/shaders';
	import { articleMeta } from '$lib/articles';
	import ArticleShell from '$lib/components/article/ArticleShell.svelte';
	import Sandbox from '$lib/components/article/Sandbox.svelte';
	import Code from '$lib/components/article/Code.svelte';
	import Aside from '$lib/components/article/Aside.svelte';
	import LissajousMath from '$lib/components/article/LissajousMath.svelte';

	let { shader }: { shader: Shader } = $props();
	const meta = articleMeta['analog-drift'];

	const lissajousCode = `// One frame's worth of curve. Two sines, orthogonal axes.
const N = 3000;
const coverage = 2 * Math.PI * Math.max(Math.ceil(a), Math.ceil(b));
const step = coverage / N;

ctx.beginPath();
for (let i = 0; i <= N; i++) {
  const t = i * step;
  const x = cx + Math.sin(a * t + delta) * size;
  const y = cy + Math.sin(b * t) * size;
  if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
}
ctx.stroke();`;

	const phosphorCode = `// Instead of clearing the canvas, draw black at low alpha over it.
// Every old pixel decays exponentially: brightness *= (1 − fadeAlpha)
// per frame. Smaller alpha = longer phosphor persistence.
const fadeAlpha = 0.025 * TRAIL_LENGTH;
ctx.fillStyle = \`rgba(10, 10, 10, \${fadeAlpha})\`;
ctx.fillRect(0, 0, W, H);

// Then draw this frame's curve on top. Each frame's stroke is the
// brightest layer; older frames recede toward black.
drawCurve(a, b, delta);`;

	const thicknessCode = `// Pre-compute all (x, y) into typed-array buffers, once per frame.
for (let i = 0; i <= N; i++) {
  const t = i * step;
  ptX[i] = cx + Math.sin(a * t + delta) * size;
  ptY[i] = cy + Math.sin(b * t) * size;
}

// Then stroke in batches of 20 points, with one thickness per batch
// sampled from the segment speed at the batch's midpoint.
const batch = 20;
for (let i = 0; i < N; i += batch) {
  const end = Math.min(i + batch, N);
  const mid = Math.min(i + (batch >> 1), N - 1);
  const dx = ptX[mid + 1] - ptX[mid];
  const dy = ptY[mid + 1] - ptY[mid];
  const speed = Math.sqrt(dx * dx + dy * dy);

  // The inverse-speed formula: thicker where the curve lingers.
  let mult = 1.0 / (1.0 + speed * 0.25);
  mult = 0.6 + mult * 1.2;
  ctx.lineWidth = BASE * mult;

  ctx.beginPath();
  ctx.moveTo(ptX[i], ptY[i]);
  for (let j = i + 1; j <= end; j++) ctx.lineTo(ptX[j], ptY[j]);
  ctx.stroke();
}`;

	const driftCode = `// 10 waypoints in (a, b, δ) space. Each one is a closed or
// near-closed Lissajous figure chosen by eye.
const waypoints = [
  { a: 1, b: 1, delta: Math.PI / 2 },   // circle
  { a: 1, b: 2, delta: 0 },              // figure-8
  { a: 2, b: 3, delta: Math.PI / 4 },    // trefoil
  { a: 3, b: 4, delta: Math.PI / 6 },    // rose-like
  // …six more
];

function easeCubic(x) {
  return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2;
}

function getParams(t) {
  const n = waypoints.length;
  const pos = (t % n + n) % n;
  const idx = Math.floor(pos);
  let frac = pos - idx;
  frac = easeCubic(frac);            // <-- the analog feel
  const from = waypoints[idx];
  const to   = waypoints[(idx + 1) % n];
  return {
    a:     from.a     + (to.a     - from.a)     * frac,
    b:     from.b     + (to.b     - from.b)     * frac,
    delta: from.delta + (to.delta - from.delta) * frac
  };
}`;

	const harmonicsCode = `// Sub-harmonic (drawn first, behind everything else)
drawCurve(a * 0.5, b * 0.5, delta * 0.7 - time * 0.05, 0.42,
  'rgba(180, 130, 90, 1)', 0.18, 0.6);

// 3rd harmonic
drawCurve(a * 3, b * 2, delta * 1.5 + time * 0.08, 0.32,
  'rgba(200, 149, 108, 1)', 0.20, 0.7);

// 2nd harmonic
drawCurve(a * 2, b * 2, delta + time * 0.15, 0.34,
  'rgba(200, 149, 108, 1)', 0.28, 0.9);

// Main trace (drawn last, brightest, on top)
drawCurve(a, b, delta, 0.38, 'rgba(220, 180, 130, 1)', 0.85, 1.5);`;
</script>

<ArticleShell
	{shader}
	title={meta.title}
	subtitle={meta.subtitle}
	author={meta.author}
	readingTime={meta.readingTime}
>
	<p>
		두 사인파를 2D 캔버스에서 서로 다른 축에 그린다. 프레임 사이에 캔버스를 지우지 않는 것이 이 효과의 핵심이다.
	</p>

	<p>
		모양은 리사주 도형에서, 빛은 CRT의 인광 잔상에서 온다. 전자빔이 지나간 뒤에도 화면이 잠시 빛나는 성질을 흉내 낸다.
	</p>

<Aside type="note" title="왜 해야 할까?">
		{#snippet children()}
			<p>
		Analog Drift는 오실로스코프처럼 보이지만 이 기법은 경로 표시기, 시계열 탐색기, 오디오 시각화에도 적용할 수 있다.
	</p>
		{/snippet}
	</Aside>

	<h2 id="lissajous">리사주 도형</h2>

	<p>
		리사주 도형은 1850년대 줄스 앙투안 리사주가 소리굽쇠에 붙인 거울로 빛을 반사하며 연구했다. 매개변수식은 두 사인파로 이루어진다.
	</p>

	<p class="equation">
		<code>x(t) = sin(a·t + δ)</code>
		<br />
		<code>y(t) = sin(b·t)</code>
	</p>

	<p>
		a는 X 좌표의 주기, b는 Y 좌표의 주기이며 δ는 두 파형 사이의 위상 차이다. t를 충분히 움직이면 한 바퀴를 그린다. <code>a</code> <code>t</code> <code>b</code> <code>δ</code> <code>t</code>
	</p>

<LissajousMath caption="세 개의 슬라이더와 하나의 방정식입니다. 정수비(1:1, 2:3, 3:5)는 닫힌 곡선을 만들고, 정수가 아닌 비는 절대 닫히지 않는 조밀한 면을 만듭니다." />

	<p>
		a와 b의 비율이 도형의 모양을 정한다. 정수 비율은 닫힌 곡선을 만들고 무리수 비율은 상자를 조밀하게 채운다. <code>a:b</code>
	</p>

	<p>
		위상 δ는 두 진동이 만나는 방식을 조절한다. 값을 움직이면 숫자 8 모양이 포물선과 기울어진 도형으로 변한다.
	</p>

<Code code={lissajousCode} lang="js" caption="한 프레임을 그리는 과정입니다. 매개변수 범위의 3000개 점을 하나의 beginPath와 한 번의 stroke로 그립니다. 나머지는 Canvas 2D가 처리합니다." />

	<h2 id="phosphor">인광 잔상</h2>

	<p>
		정적인 리사주 도형은 수학 그래프다. 캔버스를 지우지 않고 낮은 알파의 검정을 덧칠하면 CRT 같은 잔상이 생긴다. <code>ctx.clearRect</code> <code>fillRect(black)</code>
	</p>

	<p>
		이 감쇠는 지수 함수로 설명된다. 오래된 픽셀은 검정으로 향하고 새 픽셀은 최대 밝기로 나타나므로 선두가 가장 밝게 남는다. <code>α</code> <code>n</code> <code>v · (1 − α)^n</code> <code>(0.975)^60 ≈ 0.22</code>
	</p>

<Code code={phosphorCode} lang="js" caption="인광 잔상의 핵심 전체입니다. 의미 있는 코드는 세 줄뿐입니다." />

	<Sandbox
		src="/learn/analog-drift/01-phosphor-trail.html"
		title="1단계 — 인광 궤적"
		caption="토글은 완전 지우기(기억 없음)와 인광 페이드(지수 감쇠) 사이를 전환합니다. 같은 애니메이션 곡선이 어떻게 달라지는지 확인해 보세요."
		aspect="16/9"
		params={[
			{ name: 'FADE', label: '페이드 알파', min: 0.005, max: 0.1, step: 0.005, default: 0.025 },
			{ name: 'SPEED', label: '위상 속도', min: 0.1, max: 3.0, step: 0.05, default: 1.0 }
		]}
		toggle={{ name: 'PHOSPHOR', label: '인광 잔상', onValue: 1, offValue: 0, default: true }}
	/>

	<p>
		실제 CRT 인광체의 감쇠는 더 복잡하지만, 지수 감쇠만으로도 시각적 인상은 충분히 재현된다. <code>fillRect</code>
	</p>

	<h2 id="thickness">속도가 밝기를 결정한다</h2>

	<p>
		실제 오실로스코프에서는 곡선이 천천히 지나는 곳이 더 밝다. 전자빔이 그 픽셀에 오래 머물러 광자가 더 많이 쌓이기 때문이다.
	</p>

	<p>
		간단한 방법은 구간 속도를 샘플링하고 선 너비를 반대로 조절하는 것이다. 느린 곳은 굵고 빠른 곳은 가늘어진다.
	</p>

	<p class="equation">
		<code>thickness = base · (0.6 + 1.2 / (1 + speed · 0.25))</code>
	</p>

	<p>
		조절값은 경험적으로 정한다. 빠른 구간이 사라지지 않게 바닥값을 두고, 숫자를 움직여 보기 좋은 흔적을 찾는다.
	</p>

	<Code code={thicknessCode} lang="js" caption="먼저 모든 점을 타입 배열에 계산한 뒤, 배치마다 하나의 두께를 적용해 20개씩 선을 그립니다. 배칭 덕분에 Canvas 2D의 그리기 횟수를 관리할 수 있습니다. 그렇지 않으면 구간마다 lineWidth를 호출하는 비용이 약 150배 더 커집니다." />

	<Sandbox
		src="/learn/analog-drift/02-velocity-thickness.html"
		title="2단계 — 속도에 따른 굵기"
		caption="어느 쪽이든 같은 3:2 도형입니다. 변조를 켜면 느린 고리는 굵어지고 빠른 스윕은 가늘게 유지됩니다. 강도 슬라이더로 효과를 과장하거나 부드럽게 만들 수 있습니다."
		aspect="16/9"
		params={[
			{ name: 'STRENGTH', label: '변조 강도', min: 0.0, max: 1.0, step: 0.02, default: 0.5 }
		]}
		toggle={{ name: 'MODULATE', label: '속도 변조 굵기', onValue: 1, offValue: 0, default: true }}
	/>

	<p>
		변조를 끄면 도형은 평평한 테두리처럼 보인다. 켜면 같은 점과 색을 사용해도 전자빔이 머문 시간이 느껴져 무게가 생긴다.
	</p>

	<h2 id="drift">매개변수 공간을 떠돌기</h2>

	<p>
		완성된 효과는 매개변수 a, b, δ를 미리 고른 지점 사이에서 천천히 움직이는 데서 나온다. 잔상이 이전 도형과 새 도형을 이어 준다. <code>(a, b, δ)</code>
	</p>

	<p>
		웨이포인트 선택은 수학보다 큐레이션에 가깝다. 원, 숫자 8, 세잎 모양과 장미 모양을 의도적으로 배열하면 움직임이 설계된 여행처럼 읽힌다.
	</p>

	<p>
		보간 방식도 중요하다. 선형 보간은 기계적이지만 ease-in-out cubic은 양끝에서 느리고 가운데서 빨라 손으로 돌리는 노브 같은 느낌을 준다.
	</p>

	<Code code={driftCode} lang="js" caption="웨이포인트 저장, 이징 곡선, 보간입니다. 인아웃 3차 이징은 수학적 선택이 결과의 아날로그 느낌에 직접 영향을 주는 부분입니다." />

	<Sandbox
		src="/learn/analog-drift/03-drift.html"
		title="3단계 — 웨이포인트 드리프트"
		caption="도형은 열 개의 웨이포인트를 순환하며 이동합니다. 이징을 끄면 소프트웨어 애니메이션처럼 느껴지고, 다시 켜면 손으로 노브를 돌리는 듯한 느낌이 납니다. 오른쪽 위 표시에서 (a, b, δ)를 실시간으로 확인할 수 있습니다."
		aspect="16/9"
		params={[
			{ name: 'SPEED', label: '드리프트 속도', min: 0.1, max: 3.0, step: 0.05, default: 1.0 }
		]}
		toggle={{ name: 'EASING', label: '인아웃 3차 이징', onValue: 1, offValue: 0, default: true }}
	/>

	<h2 id="harmonics">고조파 배음</h2>

	<p>
		세 개의 추가 리사주 곡선을 기본 곡선 뒤에 겹치면 더 조밀한 고조파와 느린 저조파가 생긴다. <code>(2a, 2b)</code> <code>(3a, 2b)</code> <code>(a/2, b/2)</code>
	</p>

	<p>
		네 곡선은 같은 웨이포인트를 공유하므로 함께 변형된다. 결과는 복잡하지 않으면서 순수한 사인파보다 풍부하게 보인다.
	</p>

	<Code code={harmonicsCode} lang="js" caption="레이어 순서가 중요합니다. 뒤에서 앞으로 그려 가장 밝은 레이어가 위에 오도록 합니다. 각 고조파에 고유한 알파, 두께, 시간 이동을 적용해 모두 한 덩어리 모양으로 위상 고정되지 않게 합니다." />

	<Sandbox
		src="/learn/analog-drift/04-harmonics.html"
		title="4단계 — 고조파"
		caption="2:3 도형을 고정하고 세 고조파 레이어를 켜고 끌 수 있습니다. 하나씩 꺼 보세요. 2차 고조파가 시각적 영향은 가장 크고, 저조파는 보이지 않지만 가장 강하게 느껴집니다."
		aspect="16/9"
		toggle={{ name: 'H2', label: '2× harmonic', onValue: 1, offValue: 0, default: true }}
	/>

	<p>
		고조파는 화면의 작은 부분만 차지하지만 신호가 인공적이지 않고 풍성하다는 인상을 크게 강화한다.
	</p>

	<h2 id="final">모든 요소 합치기</h2>

	<p>
		최종 단계에서는 희미한 격자, CRT 광택, 청록색 보조 흔적과 밝은 인광 점을 더한다. 필수는 아니지만 각각의 효과는 쉽게 추가할 수 있다. <code>shadowBlur</code> <code>δ + 0.01</code>
	</p>

	<Sandbox
		src="/learn/analog-drift/05-final.html"
		title="5단계 — 모두 합치기"
		caption="전체 효과입니다. 웨이포인트 드리프트, 인광 페이드, 속도 굵기, 고조파, 블룸, 청록색 강조, 인광 점, 그리드를 포함합니다. 드리프트 속도와 궤적 길이만 조절할 수 있고 나머지는 보기 좋게 고정했습니다."
		aspect="16/9"
		params={[
			{ name: 'DRIFT_SPEED', label: '드리프트 속도', min: 0.1, max: 2.0, step: 0.05, default: 0.5 },
			{ name: 'TRAIL_LENGTH', label: '궤적 길이', min: 0.3, max: 2.0, step: 0.05, default: 1.0 }
		]}
	/>

	<h2 id="performance">왜 빠르게 실행되는가</h2>

	<p>
		세 곡선을 3000점씩 초당 60회 다시 그리면 Canvas 2D가 초당 수십만 점을 처리해야 한다.
	</p>

	<p>
		좌표는 시작할 때 미리 할당한 Float64Array 버퍼에 저장한다. 프레임마다 쓰레기가 생기지 않으므로 가비지 컬렉터가 뜨거운 루프를 방해하지 않는다. <code>Float64Array(4001)</code>
	</p>

	<p>
		선 너비별로 스트로크를 묶으면 곡선 하나당 드로잉 호출을 크게 줄일 수 있다. 경로는 각 묶음 안에서 연속으로 그린다. <code>beginPath</code> <code>stroke</code> <code>moveTo</code> <code>lineTo</code>
	</p>

	<p>
		shadowBlur는 비용이 크므로 주된 흔적과 청록색 강조층에만 적용하고 고조파에는 사용하지 않는다. <code>shadowBlur</code>
	</p>

	<p>
		이 셰이더는 개발 도구를 연 2019년형 노트북에서도 60fps를 유지한다. 병목은 수학이나 메모리가 아니라 Canvas 2D 상태를 플러시하는 횟수다.
	</p>

	<h2 id="where-to-go">다음으로 읽을 자료</h2>

	<p>
		리사주 곡선 자료는 닫힌 곡선 조건과 유리수, 무리수 비율을 자세히 설명한다. 매개변수식만 빠르게 보려면 MathWorld도 유용하다.
	</p>

	<p>
		같은 기법은 모든 2D 매개변수 곡선으로 확장할 수 있다. 사인파 대신 장미 곡선이나 실시간 오디오 파형을 넣어도 잔상 렌더링은 그대로 작동한다. <code>r = cos(k·θ)</code>
	</p>

	<p>
		analog-drift 셰이더는 434줄의 HTML이다. 곡선 수학과 렌더링 설정, 매개변수 연결이 들어 있으며 의존성 없이 어느 페이지에도 넣을 수 있다.
	</p>
</ArticleShell>

<style>
	.equation {
		font-family: 'SF Mono', monospace;
		font-size: 0.95em;
		text-align: center;
		padding: 0.8rem 0;
		color: rgba(232, 224, 216, 0.85);
	}
	.equation code {
		background: none;
		padding: 0;
		font-size: inherit;
	}
</style>
