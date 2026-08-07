<script lang="ts">
	import type { Shader } from '$lib/shaders';
	import { articleMeta } from '$lib/articles';
	import ArticleShell from '$lib/components/article/ArticleShell.svelte';
	import Sandbox from '$lib/components/article/Sandbox.svelte';
	import Code from '$lib/components/article/Code.svelte';
	import Aside from '$lib/components/article/Aside.svelte';
	import RefractionDecoder from '$lib/components/article/RefractionDecoder.svelte';
	import DropMerger from '$lib/components/article/DropMerger.svelte';

	let { shader }: { shader: Shader } = $props();
	const meta = articleMeta['rain-on-glass'];

	// ─── Code excerpts ──────────────────────────────────────
	const bitmapCode = `// Bake the drop's refraction normals into RGB once, at init time.
// R = vertical offset (centered at 128 = 'no offset')
// G = horizontal offset (same convention)
// B = depth into the drop — scales refraction strength
// A = the visible-area mask
for (var py = 0; py < SIZE; py++) {
  for (var px = 0; px < SIZE; px++) {
    var dx = (px - cx) / cx;
    var dy = (py - cy) / cy;
    dy *= 1.0 + dy * 0.15;            // slight tear shape
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 1.0) continue;

    var nx = dist > 0.001 ? dx / dist : 0;
    var ny = dist > 0.001 ? dy / dist : 0;
    var r     = Math.round(ny * 60 * dist + 128);
    var g     = Math.round(nx * 60 * dist + 128);
    var depth = Math.sqrt(Math.max(0, 1.0 - dist*dist)) * 255;
    var alpha = Math.max(0, 1.0 - Math.pow(dist / 0.45, 6)) * 255;

    var idx = (py * SIZE + px) * 4;
    d[idx]     = r;        // → texture.r in the shader
    d[idx + 1] = g;        // → texture.g
    d[idx + 2] = depth;    // → texture.b
    d[idx + 3] = alpha;    // → texture.a
  }
}`;

	const shaderCode = `precision mediump float;
uniform sampler2D u_waterMap;
uniform sampler2D u_background;
uniform vec2  u_res;
uniform float u_refraction;

void main() {
  vec2 uv      = gl_FragCoord.xy / u_res;
  vec4 water   = texture2D(u_waterMap, vec2(uv.x, 1.0 - uv.y));

  // ─── The whole technique, six lines ───
  vec2  offset      = (vec2(water.g, water.r) - 0.5) * 2.0;
  float depth       = water.b;
  vec2  refractedUV = uv + offset * (256.0 + depth * 256.0) / u_res.x * u_refraction;
  vec4  bg          = texture2D(u_background, refractedUV);

  // Outside a drop: show the background as-is. Inside: show the lensed lookup.
  gl_FragColor = mix(
    texture2D(u_background, uv),
    bg,
    clamp(water.a * 4.0 - 1.0, 0.0, 1.0)
  );
}`;

	const physicsCode = `// Most of the time, do nothing. That's a feature.
// Drops only start sliding when something kicks them — modeled as
// a probability that grows with drop size. Surface tension is just
// "low probability of kick for small drops; higher for big ones."
if (Math.random() < drop.r / (100 * dpr) * dt * 0.5 / SURFACE_TENSION) {
  drop.momentum += rand(0.5, 2.5);
}

// Once moving, fall and shed trail drops behind us.
drop.y += drop.momentum * dt;
drop.momentum *= Math.pow(0.95, dt);  // friction

if (drop.momentum > 0.5 && drop.lastSpawn > 20) {
  spawnTrailDrop(drop);  // a smaller drop, in our slipstream
  drop.r *= 0.97;        // we lose a little water making it
  drop.lastSpawn = 0;
}`;

	const shapeCode = `// The drop's drawn size has three components.
//   scaleY is constant — a real drop on glass is taller than wide.
//   spreadX/Y are transient "splat" factors set on spawn or collision.
//   Both spreads decay every frame, which is surface tension settling.
function drawDrop(d) {
  const SHAPE_TEARDROP = 1.5;
  const w = d.r * 2 * (1 + d.spreadX);
  const h = d.r * 2 * SHAPE_TEARDROP * (1 + d.spreadY);
  ctx.drawImage(dropBitmap, d.x - w/2, d.y - h/2, w, h);
}

// Per frame, in updatePhysics:
drop.spreadX *= Math.pow(0.4, dt);   // rapid X collapse
drop.spreadY *= Math.pow(0.7, dt);   // slower Y settling`;

	const collisionCode = `// Sort by y so we only check nearby drops (O(n·k), not O(n²))
drops.sort((a, b) => a.y - b.y);

for (var i = 0; i < drops.length; i++) {
  var d1 = drops[i];
  for (var j = i + 1; j < Math.min(i + 30, drops.length); j++) {
    var d2 = drops[j];
    if (d1.r <= d2.r) continue;  // only the bigger one absorbs

    var dx = d2.x - d1.x, dy = d2.y - d1.y;
    if (dx*dx + dy*dy < ((d1.r + d2.r) * 0.45) ** 2) {
      // Area conservation with an 0.8 loss factor — some water
      // gets left behind as the merger happens.
      var a1 = Math.PI * d1.r * d1.r;
      var a2 = Math.PI * d2.r * d2.r;
      d1.r = Math.sqrt((a1 + a2 * 0.8) / Math.PI);
      d1.momentum += 1.5;   // mergers snowball
      d1.spreadX = Math.max(d1.spreadX, 0.25);  // small settle wobble
      d1.spreadY = Math.max(d1.spreadY, 0.15);
      d2.killed = true;
    }
  }
}`;
</script>

<ArticleShell
	{shader}
	title={meta.title}
	subtitle={meta.subtitle}
	author={meta.author}
	readingTime={meta.readingTime}
>
	<p>
		겉보기와 달리 이 효과는 두 파이프라인이 이어진 결과다. Canvas 2D가 물 맵을 만들고 WebGL 프래그먼트 셰이더가 배경을 굴절시킨다.
	</p>

	<p>
		빠른 비결은 굴절이 계산이 아니라 텍스처 조회라는 점이다. 물방울의 굴절 모양은 시작할 때 한 번 비트맵으로 구워 둔다.
	</p>

	<Aside type="note" title="선행 사례">
		{#snippet children()}
			<p>
		이 기법은 Lucas Bebber의 RainEffect에서 비롯되었다. Radiant 버전은 셰이더 카탈로그에 맞게 다시 작성한 것이다.
	</p>
		{/snippet}
	</Aside>

	<h2 id="a-drop-is-a-lens">물방울은 렌즈다</h2>

	<p>
		창문 앞 도시의 불빛을 물방울 너머로 보면 빛이 뒤집히고 왜곡되며 집중된다. 우리가 흉내 내려는 현상이 바로 이것이다.
	</p>

	<p>
		실제 굴절이라면 픽셀마다 스넬의 법칙을 계산해야 한다. 가능하지만 느리고 과하다. 실제 물방울도 완벽한 구가 아니라 표면 장력으로 눌린 덩어리다.
	</p>

	<p>
		간단한 방법은 물방울의 각 픽셀에 어디에서 샘플링할지만 2D 오프셋으로 저장하는 것이다.
	</p>

	<h2 id="encoding-refraction">굴절을 텍스처로 인코딩하기</h2>

	<p>
		물방울을 256×256 Canvas 2D 비트맵에 한 번 그린다. RGB 채널에는 굴절에 필요한 서로 다른 정보가 들어간다.
	</p>

	<RefractionDecoder
		caption="물방울 안을 클릭하고 드래그해 보세요. R은 세로 오프셋, G는 가로 오프셋, B는 물방울 안쪽 깊이를 인코딩합니다. 오른쪽 화살표는 해당 픽셀이 배경에서 샘플링할 위치를 보여 줍니다."
	/>

	<p>
		중심에서 멀수록 <em>바깥쪽</em>을 향하는 오프셋을 저장한다. 가장자리가 빛을 크게 휘게 하고 중심은 거의 휘지 않는 렌즈의 형태다. <code>d</code> <code>d</code>
	</p>

	<Code code={bitmapCode} lang="js" caption="초기화 때 한 번 만드는 물방울 비트맵입니다. 셰이더나 GPU 없이 순수한 Canvas 2D로 동작합니다. 각 채널을 완전히 제어해야 하므로 ImageData 버퍼를 직접 채웁니다." />

	<p>
		비트맵에서 실제로 보이는 영역은 그려진 반지름보다 작다. 가장자리에서 안전하게 합성하기 위한 여백이 남아 있다. <code>pow(dist / 0.45, 6)</code>
	</p>

	<p>
		세로 방향의 작은 편향은 물방울을 폭보다 약간 높은 눈물방울 모양으로 만든다. 실제 유리의 표면 장력도 같은 형태를 만든다. <code>dy *= 1 + dy * 0.15</code>
	</p>

	<Sandbox
		src="/learn/rain-on-glass/02-normal-map.html"
		 title="2단계 — 물방울 노멀 맵"
		 caption="순수한 Canvas 2D이며 셰이더는 없습니다. 왼쪽은 물방울의 알파 채널(가시 영역 마스크), 오른쪽은 RGB 채널(굴절 오프셋과 깊이를 한 이미지에 저장)입니다."
		aspect="16/9"
	/>

	<h2 id="the-shader">셰이더: 하나의 조회, 두 텍스처</h2>

	<p>
		이제 셰이더가 비트맵을 사용한다. 필요한 텍스처는 물방울 위치를 담은 <strong>물 맵</strong>과 굴절시킬 배경이다.
	</p>

	<Code code={shaderCode} lang="glsl" caption="굴절 셰이더 전체입니다. 유니폼 선언부터 최종 블렌드까지 실제로 작업하는 코드는 여섯 줄입니다." />

	<p>
		저장된 오프셋을 부호 있는 범위로 되돌린 뒤 깊이 채널로 크기를 조절해 배경을 샘플링한다. <code>(g, r) − 0.5</code> <code>* 2.0</code> <code>256 / u_res.x</code> <code>256 · depth</code>
	</p>

	<p>
		아래에서는 마우스로 움직이는 물방울 하나가 절차적 배경을 굴절시킨다. 토글을 켜면 원시 노멀 맵도 직접 볼 수 있다.
	</p>

	<Sandbox
		src="/learn/rain-on-glass/01-single-drop.html"
		 title="1단계 — 물방울 하나"
		 caption="커서를 움직여 물방울의 위치를 정하세요. '노멀 맵 표시' 토글을 켜면 셰이더가 디코딩하는 원본 RGB 비트맵이 나타납니다."
		aspect="16/9"
		params={[
			{ name: 'REFRACTION', label: '굴절 강도', min: 0.1, max: 3.0, step: 0.05, default: 1.0 },
			{ name: 'DROP_SIZE', label: '물방울 크기', min: 200, max: 600, step: 10, default: 380 }
		]}
		toggle={{ name: 'SHOW_NORMAL_MAP', label: '노멀 맵 텍스처 표시', onValue: 1, offValue: 0, default: false }}
	/>

	<h2 id="many-drops">수많은 물방울의 워터 맵</h2>

	<p>
		물방울 하나는 호기심을 자극하지만, 창 전체가 되어야 효과의 핵심이 드러난다. 매 프레임 모든 물방울을 물 맵에 찍어 WebGL 텍스처로 올린다.
	</p>

	<p>
		물방울마다 drawImage를 한 번 호출한다. 이미 올바르게 합성된 비트맵 덕분에 Canvas 2D는 셰이더에서 굴절을 계산하는 것보다 훨씬 빠르다.
	</p>

	<Code code={`waterCtx.clearRect(0, 0, w, h);
for (const drop of drops) {
  const size = drop.r * 2;
  waterCtx.drawImage(
    dropBitmap,
    drop.x - size/2, drop.y - size/2,
    size, size
  );
}`} lang="js" />

	<p>
		실제 물방울은 대부분 가만히 있다. 표면 장력이 중력보다 강하지만, 진동이나 새 물방울이 균형을 깨면 갑자기 미끄러지기 시작한다. <code>drawImage</code>
	</p>

	<Sandbox
		src="/learn/rain-on-glass/03-static-field.html"
		title="3단계 — 정적인 물방울 장"
		caption="200 drops, no motion, just stamping. Adjust the count, size range, and refraction. Reshuffle to see different random placements."
		aspect="16/9"
		params={[
			{ name: 'DROP_COUNT', label: '물방울 개수', min: 20, max: 600, step: 10, default: 200 },
			{ name: 'DROP_SIZE_MIN', label: '최소 크기', min: 10, max: 60, step: 1, default: 30 },
			{ name: 'DROP_SIZE_MAX', label: '최대 크기', min: 40, max: 150, step: 5, default: 90 },
			{ name: 'REFRACTION', label: '굴절', min: 0.1, max: 3.0, step: 0.05, default: 1.0 },
			{ name: 'RESHUFFLE', label: '시드 섞기', min: 1, max: 99, step: 1, default: 1 }
		]}
	/>

	<h2 id="drops-that-move">움직이는 물방울</h2>

	<p>
		이 모든 과정을 물리적으로 모델링하는 대신 확률로 표현한다. 매 프레임 물방울은 운동량을 얻을 확률을 갖고, 움직인 뒤에는 다시 정지 쪽으로 감쇠한다.
	</p>

	<p>
		표면 장력이 낮으면 물방울이 계속 움직여 유리가 줄무늬로 가득 찬다. 높이면 짧게 미끄러진 뒤 제자리에서 멈춘다.
	</p>

	<Code code={physicsCode} lang="js" caption="물방울 하나의 전체 물리 반복문입니다. 여기서 표면 장력은 힘이 아니라 확률의 역수입니다." />

	<Sandbox
		src="/learn/rain-on-glass/04-rolling-drop.html"
		 title="4단계 — 굴러가는 물방울"
		 caption="물리가 적용된 물방울 하나입니다. 물방울은 둥글지 않고 눈물방울 모양이라는 점을 확인해 보세요. 표면 장력을 낮추면 더 쉽게 미끄러지고, 트레일 비율을 높이면 더 빠르게 질량을 흘립니다."
		aspect="16/9"
		params={[
			{ name: 'GRAVITY', label: '중력', min: 0.3, max: 3.0, step: 0.05, default: 1.0 },
			{ name: 'SURFACE_TENSION', label: '표면 장력', min: 0.1, max: 4.0, step: 0.05, default: 1.0 },
			{ name: 'TRAIL_RATE', label: '트레일 비율', min: 0.0, max: 3.0, step: 0.05, default: 1.0 },
			{ name: 'REFRACTION', label: '굴절', min: 0.1, max: 2.0, step: 0.05, default: 1.0 }
		]}
	/>

	<p>
		굴러가는 물방울은 원이 아니다. 실제 물방울은 폭보다 높고 아래가 납작한 눈물방울이며, 셰이더도 같은 방식으로 형태를 속인다.
	</p>

	<h2 id="shape">물방울은 둥글지 않다</h2>

	<p>
		형태는 일정한 세로 비율과 순간적인 튀김 인자를 겹쳐 만든다. 두 인자는 매 프레임 감쇠하며 원래 형태로 돌아온다.
	</p>

	<p>
		감쇠 속도가 중요하다. 가로 퍼짐은 먼저 빠르게 줄고 세로 방향은 더 천천히 안정되어 실제 물방울 같은 비대칭이 생긴다. <code>scaleY</code> <code>spreadX</code> <code>spreadY</code>
	</p>

	<Code code={shapeCode} lang="js" caption="세 줄로 표현한 물방울 형태입니다. 일정한 눈물방울 배율, 순간적인 퍼짐, 프레임마다 기준 형태로 돌아가는 감쇠를 사용합니다." />

	<p>
		이 효과가 없으면 합쳐진 물방울은 두 원이 큰 원으로 바뀌는 것처럼 보인다. 퍼짐을 넣으면 잠시 부풀었다가 다시 모인다. <code>pow(0.4, dt)</code> <code>pow(0.7, dt)</code>
	</p>

	<p>
		두 물방울이 만나면 작은 물방울이 큰 물방울에 흡수된다. 반지름은 늘지만 일부 물은 잔류물로 남아 부피는 대략 보존된다.
	</p>

	<h2 id="merging">합쳐지는 물방울</h2>

	<p>
		면적 보존 공식은 셰이더 전체에서 유일하게 실제 기하를 사용하는 부분이다. 합쳐진 반지름은 손실 계수를 반영해 계산한다.
	</p>

	<p>
		운동량 증가가 장면을 자연스럽게 만든다. 흡수할 때마다 작은 힘을 더해 물방울이 점점 빨라진다.
	</p>

	<Code code={collisionCode} lang="js" caption="충돌 감지와 병합입니다. y 정렬과 30개 이웃으로 제한한 검색 창 덕분에 내부 반복문의 범위가 제한되어 실제로는 O(n)에 가깝게 동작합니다." />

	<p>
		최종 셰이더의 핵심적인 시각적 속임수는 서로 다른 두 배경 텍스처다. 물방울 바깥은 흐린 장면을, 안쪽은 덜 흐린 장면을 샘플링한다. <code>r₁</code> <code>r₂</code> <code>π·r₁² + π·r₂²</code>
	</p>

	<DropMerger caption="반지름을 조절할 수 있는 두 물방울과 병합 결과입니다. r₂²에 곱하는 0.8은 '일부 물이 남는다'는 손실을 나타냅니다." />

	<Sandbox
		src="/learn/rain-on-glass/05-merging-field.html"
		 title="5단계 — 합쳐지는 물방울"
		 caption="시간이 지나면 물방울이 생성되고, 표면 장력이 풀리면 미끄러지며, 닿은 작은 물방울을 흡수합니다. 충돌 순간을 보세요. 합쳐진 물방울은 잠시 퍼졌다가 다시 눈물방울 모양으로 돌아옵니다. 그래서 한 원이 다른 원을 먹는 대신 실제 물리 현상처럼 보입니다."
		aspect="16/9"
		params={[
			{ name: 'SPAWN_RATE', label: '생성 비율', min: 0.1, max: 3.0, step: 0.05, default: 1.0 },
			{ name: 'COLLISION_RADIUS', label: '충돌 반지름', min: 0.1, max: 0.9, step: 0.05, default: 0.45 },
			{ name: 'REFRACTION', label: '굴절', min: 0.1, max: 2.0, step: 0.05, default: 1.0 }
		]}
	/>

	<p>
		젖은 유리가 흐릿한 이유는 표면의 물이 수많은 미세 렌즈처럼 작용하기 때문이다. 실제 물방울은 그 시야를 다시 초점에 모은다.
	</p>

	<h2 id="wet-glass">젖은 유리의 비결</h2>

	<p>
		속임수를 끄면 물방울은 맑은 이미지의 굴절로만 보여 돌기처럼 보인다. 켜면 주변 유리는 흐려지고 물방울은 선명한 창이 된다.
	</p>

	<p>
		Radiant 셰이더는 두 절차적 도시 배경을 사용한다. 추가 텍스처 업로드와 픽셀별 텍스처 샘플링 하나의 비용으로 전체 분위기를 얻는다.
	</p>

	<p>
		실제 셰이더에는 큰 물방울과 별도로 움직이지 않는 작은 분무 물방울 층도 있다.
	</p>

	<Sandbox
		src="/learn/rain-on-glass/06-wet-glass.html"
		 title="6단계 — 젖은 유리 트릭"
		 caption="같은 물방울과 같은 물리입니다. 토글은 물방울 바깥 영역에 도시의 강한 흐림 버전과 선명한 버전 중 어느 쪽을 표시할지 제어합니다. 물방울 자체는 항상 선명한 버전을 샘플링합니다."
		aspect="16/9"
		params={[
			{ name: 'REFRACTION', label: '굴절', min: 0.1, max: 2.5, step: 0.05, default: 1.0 },
			{ name: 'SPAWN_RATE', label: '생성 비율', min: 0.1, max: 2.0, step: 0.05, default: 0.5 }
		]}
		toggle={{ name: 'WET_GLASS', label: '젖은 유리 (두 배경 트릭)', onValue: 1, offValue: 0, default: true }}
	/>

	<p>
		분무 물방울은 충돌하지 않고 운동량도 없다. 큰 물방울이 지나가면 캔버스의 지우기 합성으로 아래의 분무를 지워 깨끗한 흔적을 남긴다.
	</p>

	<h2 id="two-layers">두 겹의 물방울</h2>

	<p>
		우산 위의 비 셰이더도 같은 비트맵과 굴절 셰이더, 거의 같은 물리 루프를 사용한다. 달라지는 것은 생성 표면과 궤적뿐이다. <code>drops[]</code>
	</p>

	<p>
		두 셰이더를 나란히 보면 외형은 크게 다르지만 내부 파이프라인은 동일하다. <code>destination-out</code>
	</p>

	<h2 id="umbrella">같은 비결, 다른 표면</h2>

	<p>
		비가 가득 찬 창은 수백 개의 물방울과 수천 개의 정적 분무, 픽셀별 굴절 조회를 동시에 처리한다.
	</p>

	<p>
		물방울 노멀 맵은 초기화 때 한 번 계산하고, 여러 깊이 변형을 미리 렌더링한다. 이후에는 drawImage 한 번이면 된다.
	</p>

	<Sandbox
		src="/rain-umbrella.html"
		title="우산 위의 비"
		caption="같은 물방울 비트맵과 같은 셰이더를 다른 표면에 적용합니다. 돔의 곡률이 초기 물방울 운동량과 방향을 정하고, 걷는 속도 매개변수가 우산 흔들림을 더합니다."
		aspect="16/9"
		params={[
			{ name: 'RAIN_AMOUNT', label: '비의 양', min: 0.1, max: 2.0, step: 0.05, default: 1.0 },
			{ name: 'REFRACTION', label: '굴절', min: 0.1, max: 3.0, step: 0.05, default: 1.0 },
			{ name: 'WALK_SPEED', label: '걷는 속도', min: 0.0, max: 3.0, step: 0.05, default: 1.0 }
		]}
	/>

	<h2 id="performance">왜 빠르게 실행되는가</h2>

	<p>
		물 맵에는 Canvas 2D가 알맞다. 한 프레임에 하나의 텍스처만 GPU로 올리면 되므로 별도의 복잡한 배칭 관리가 필요 없다.
	</p>

	<p>
		충돌 검사는 y 좌표로 정렬한 뒤 가까운 이웃만 확인한다. 따라서 물방울 수가 늘어도 실제 비용은 거의 선형으로 유지된다. <code>drawImage</code>
	</p>

	<p>
		원문 자료는 깊이 변형, 시차 처리와 빛과 그림자까지 자세히 다룬다. Radiant 버전은 <strong>배경</strong>과 상호작용을 주로 바꾸었다.
	</p>

	<p>
		노멀 맵은 각 픽셀의 표면 방향을 RGB로 저장하는 일반적인 2D 기법이다. 물방울뿐 아니라 바닥, 물, 벽돌에도 적용할 수 있다.
	</p>

	<h2 id="where-to-go">다음으로 읽을 자료</h2>

	<p>
		전체 rain-on-glass 파일은 약 1000줄의 HTML이다. 물리와 배경, 프래그먼트 셰이더가 나뉘어 있으며 어떤 페이지에도 바로 넣을 수 있다.
	</p>

	<p>
		전체 rain-on-glass 파일은 약 1000줄의 HTML이다. 물리와 배경, 프래그먼트 셰이더가 나뉘어 있으며 어떤 페이지에도 바로 넣을 수 있다.
	</p>

	<p>
		전체 rain-on-glass 파일은 약 1000줄의 HTML이다. 물리와 배경, 프래그먼트 셰이더가 나뉘어 있으며 어떤 페이지에도 바로 넣을 수 있다.
	</p>
</ArticleShell>
