<script lang="ts">
	import type { Shader } from '$lib/shaders';
	import { articleMeta } from '$lib/articles';
	import ArticleShell from '$lib/components/article/ArticleShell.svelte';
	import Sandbox from '$lib/components/article/Sandbox.svelte';
	import Code from '$lib/components/article/Code.svelte';
	import Aside from '$lib/components/article/Aside.svelte';
	import Math from '$lib/components/article/Math.svelte';
	import Blackbody from '$lib/components/article/Blackbody.svelte';
	import TemperaturePlot from '$lib/components/article/TemperaturePlot.svelte';
	import Compare from '$lib/components/article/Compare.svelte';

	let { shader }: { shader: Shader } = $props();
	const meta = articleMeta['event-horizon'];

	// ─── Code excerpts ────────────────────────────────────────────
	const geodesicCode = `// Schwarzschild geodesic step (in fragment shader)
// d²x/dλ² = -1.5 · RS · L² / r⁵ · x   where L = |x × v|
vec3 Lvec = cross(pos, vel);
float L2 = dot(Lvec, Lvec);
float gravCoeff = -1.5 * RS * L2;

for (int i = 0; i < 200; i++) {
  float r = length(pos);
  float h = 0.16 * clamp(r - 0.4 * RS, 0.06, 3.5);  // adaptive step

  // a(x) = gravCoeff / r⁵ · x
  float invR5 = 1.0 / (r*r*r*r*r);
  vec3 acc  = (gravCoeff * invR5) * pos;

  // Velocity-Verlet — symplectic, conserves energy
  vec3 p1 = pos + vel * h + 0.5 * acc * h * h;
  float invR15 = 1.0 / pow(length(p1), 5.0);
  vec3 acc1 = (gravCoeff * invR15) * p1;
  vec3 v1 = vel + 0.5 * (acc + acc1) * h;

  if (length(p1) < RS * 0.35) { absorbed = true; break; }
  pos = p1; vel = v1;
}`;

	const noviCode = `// Novikov-Thorne temperature profile (1973)
// T(r) ∝ r^(-3/4) · (1 − √(r_isco / r))^(1/4)
float xr = ISCO / r;
float tProfile = pow(ISCO / r, 0.75)
               * pow(max(0.001, 1.0 - sqrt(xr)), 0.25);

// Gravitational redshift: light from deep in the well loses energy
float gRedshift = sqrt(max(0.01, 1.0 - RS / r));
tProfile *= gRedshift;

vec3 col = blackbodyColor(tProfile);`;

	const dopplerCode = `// Doppler beaming from Keplerian orbital motion.
// orbDir is tangent to the orbit at this point on the disk.
float orbSpeed = sqrt(0.5 * RS / max(r, DISK_IN));
vec3  orbDir   = normalize(vec3(-hit.z, 0.0, hit.x));

float dop = 1.0 + 2.0 * dot(normalize(vel), orbDir) * orbSpeed;
dop = max(0.15, dop);

// Brightness scales as Doppler^3 (relativistic beaming).
// Frequency shifts blue-ward on approach, red on retreat.
float boost     = dop * dop * dop;
float colorTemp = tProfile * pow(dop, 1.8) * 1.2;
vec3  col       = blackbodyColor(colorTemp) * intensity * boost;`;

	const crossingCode = `// A ray can cross the y=0 disk plane MULTIPLE times after lensing.
// Crossing 1: the disk in front of the hole.
// Crossing 2: the back of the disk, wrapped over the top.
// Crossing 3+: the photon ring — light orbiting near r=1.5·RS.
if (pos.y * p1.y < 0.0 && diskAccum.a < 0.97) {
  float t = pos.y / (pos.y - p1.y);
  vec3 hit = mix(pos, p1, t);
  vec4 dc = shadeDisk(hit, vel, time);

  // Crisp 1px photon ring would alias horribly; attenuate later passes.
  if (diskCrossings >= 2) { dc.rgb *= 0.15; dc.a *= 0.15; }

  // Alpha-over compositing (front-to-back).
  diskAccum.rgb += dc.rgb * dc.a * (1.0 - diskAccum.a);
  diskAccum.a   += dc.a * (1.0 - diskAccum.a);
  diskCrossings++;
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
		머리글의 이미지는 프래그먼트 셰이더가 화면의 각 픽셀에서 가상의 광자를 거꾸로 추적해 만든 결과다.
	</p>

	<p>
		픽셀 하나에도 많은 계산이 필요하지만, 미리 계산한 조회 테이블 없이 노트북 GPU에서 초당 60회 실행된다.
	</p>

	<p>
		각 절은 앞 절 위에 물리 법칙 하나를 더한다. 샌드박스는 기능을 끈 최종본이 아니라 실제 부분 셰이더다.
	</p>

	<Aside type="tip" title="이 글을 읽는 법">
		{#snippet children()}
			<p>
		블랙홀을 넣기 전의 기준선은 간단하다. 각 픽셀이 공간으로 직선 광선을 쏘고 절차적 별밭을 샘플링한다.
	</p>
		{/snippet}
	</Aside>

	<h2 id="straight-rays">아무것도 없는 곳에서 시작하기: 직선 광선</h2>

	<p>
		이제 광선을 휘게 만든다. 이후의 모든 추가 작업은 광선이 이동 중 무엇을 만나는지에 관한 문제다.
	</p>

	<Sandbox
		src="/learn/event-horizon/01-rays.html"
		title="1단계 — 공간을 가로지르는 직선 광선"
		caption="프레임 안에서 드래그해 주변을 둘러보세요. 카메라는 일정한 거리를 유지하며 공전하고, 광선은 직선으로 나아갑니다. 이제 이 광선을 휘어 보겠습니다."
		aspect="16/8"
		params={[
			{ name: 'ROTATE_SPEED', label: '자동 회전', min: 0, max: 1, step: 0.05, default: 0.5 },
			{ name: 'NEBULA', label: '성운 강도', min: 0, max: 1.5, step: 0.05, default: 1.0 }
		]}
	/>

	<p>
		질량이 큰 천체는 시공간을 휘게 하고, 빛은 그 휘어진 공간의 최단 경로인 측지선을 따른다.
	</p>

	<h2 id="gravity">중력만 놓고 보기</h2>

	<p>
		평면에서 <strong>측지선</strong>을 보면 중력이 없을 때는 광선이 평행하지만, 중심 질량에 가까울수록 안쪽으로 휘고 결국 붙잡힌다.
	</p>

	<p>
		굴절 각도는 광선이 질량에 얼마나 가까이 지나갔는지에 거의 좌우된다. 광자 구 바깥에서는 탈출하고 안쪽에서는 나선형으로 떨어진다.
	</p>

	<Sandbox
		src="/learn/event-horizon/geodesic-2d.html"
		title="2D 측지선 실험장"
		caption="위에서 내려다본 모습입니다. 프레임 어디든 클릭하고 드래그해 직접 광선을 발사해 보세요. 흰 광선은 탈출하고, 빨간 광선은 광자 구면 안쪽으로 떨어져 흡수됩니다. r = 1.5·RS의 점선 원이 광자 구면입니다. 여기에 접선으로 들어간 빛은 잠시 공전한 뒤 진행 방향을 결정합니다."
		aspect="16/9"
		params={[
			{ name: 'MASS', label: '질량 (RS)', min: 0.2, max: 2.0, step: 0.05, default: 1.0 }
		]}
	/>

	<p>
		회전하지 않고 전하도 없는 슈바르츠실트 블랙홀에서 광자의 공간 궤적은 다음 식을 따른다.
	</p>

	<h3 id="the-equation">적분할 방정식</h3>

	<p>
		여기서 x는 블랙홀에 대한 광자의 위치이고 r은 그 거리다. RS는 사건의 지평선인 슈바르츠실트 반지름이며 L은 각운동량이다.
	</p>

	<Math display>
		{#snippet children()}d²x / dλ² = −(3/2) · RS · L² / r⁵ · x{/snippet}
	</Math>

	<p>
		코드에서는 에너지를 보존하는 벨로시티-베르렛 적분기를 사용해 먼 곳에서는 큰 걸음을, 가까운 곳에서는 작은 걸음을 내딛는다. <Math>{#snippet children()}x{/snippet}</Math> <Math>{#snippet children()}r = |x|{/snippet}</Math> <Math>{#snippet children()}RS{/snippet}</Math> <Math>{#snippet children()}L = |x × v|{/snippet}</Math>
	</p>

	<p>
		직선 광선을 이 반복문으로 바꾸면 별이 휘어진 시공간을 통해 보이는 중력 렌즈 효과를 얻는다.
	</p>

	<Code code={geodesicCode} lang="glsl" caption="픽셀마다 실행되는 반복문 안에 중력 물리 전체가 들어 있습니다. 실시간으로 동작하게 만드는 비결은 4번째 줄의 적응형 보폭입니다. 멀리서는 성큼 나아가고, 가까이서는 촘촘하게 샘플링합니다." />

	<p>
		적분 단계를 낮추면 광선이 흔들리고 가장자리의 별이 반짝인다. 중요한 기하를 건너뛰기 때문이다.
	</p>

	<Sandbox
		src="/learn/event-horizon/02-bending.html"
		title="2단계 — 빛 휘기"
		caption="1단계와 같은 별밭이지만, 이제 각 광선은 슈바르츠실트 측지선을 따릅니다. 질량을 높여 보세요. 실루엣 근처의 별이 늘어나고, 가장자리에는 별이 복제된 희미한 아인슈타인 고리가 생깁니다. 그리드 토글을 켜면 얼룩 잡음 없이 기하를 볼 수 있습니다."
		aspect="16/8"
		params={[
			{ name: 'ROTATE_SPEED', label: '자동 회전', min: 0, max: 1, step: 0.05, default: 0.3 },
			{ name: 'MASS', label: '질량 (RS)', min: 0.3, max: 2.0, step: 0.05, default: 1.0 },
			{ name: 'STEPS', label: '적분 단계', min: 30, max: 200, step: 5, default: 200 }
		]}
		toggle={{ name: 'SHOW_GRID', label: '배경 그리드 표시', default: false }}
	/>

	<p>
		슈바르츠실트 반지름은 태양에서는 3킬로미터다. 셰이더에서는 RS = 1.0을 장면의 자연 단위로 삼는다.
	</p>

	<Aside type="definition" title="슈바르츠실트 반지름">
		{#snippet children()}
			<p>
		실제 블랙홀은 빛나지 않고 검다. 유명한 사진에서 보이는 것은 마찰로 뜨거워진 플라스마의 강착원반이다. <Math>{#snippet children()}RS = 2GM / c²{/snippet}</Math> <code>RS = 1.0</code>
	</p>
		{/snippet}
	</Aside>

	<h2 id="the-disk">빛나는 플라스마 원반</h2>

	<p>
		온도는 균일하지 않다. 블랙홀 가까이 도는 플라스마는 더 빠르게 움직이고 더 밝게 방출한다.
	</p>

	<p>
		r_isco는 가장 안쪽의 안정한 원궤도다. 그 안에서는 플라스마가 궤도를 유지하지 못하고 블랙홀로 떨어진다.
	</p>

	<Math display>
		{#snippet children()}T(r) ∝ r^(−3/4) · (1 − √(r_isco / r))^(1/4){/snippet}
	</Math>

	<p>
		온도는 흑체 근사로 색에 대응시킨다. 뜨거운 물질은 파랗고 중간 온도는 흰색이며 차가운 물질은 붉다. <Math>{#snippet children()}r_isco{/snippet}</Math> <Math>{#snippet children()}r_isco = 3·RS{/snippet}</Math> <Math>{#snippet children()}r^(−3/4){/snippet}</Math>
	</p>

	<TemperaturePlot
		caption="노비코프-손 프로필의 반지름에 따른 원반 온도입니다. 각 온도에 대응시킨 실제 흑체 색으로 채색합니다. ISCO 슬라이더를 움직이면 안쪽 경계가 바깥으로 이동하면서 원반 전체가 어두워지고 바깥쪽으로 밀려납니다."
	/>

	<p>
		전체 원반 셰이더는 케플러 흐름을 따른 난류와 동심원 구조, 부드러운 안쪽과 바깥쪽 페이드를 온도 분포에 더한다.
	</p>

	<Blackbody caption="슬라이더를 움직여 주어진 유효 온도가 셰이더의 톤 매핑을 거친 뒤 어떤 색이 되는지 확인해 보세요. T ≈ 0.3에서는 짙은 빨강, T ≈ 0.8에서는 흰색이며, 1.0을 넘으면 차가운 파랑으로 이동합니다." />

	<p>
		두 요소를 합치면 먼 쪽 원반의 빛이 중력에 의해 위로 휘어 실루엣 위의 후광으로 보인다.
	</p>

	<Code code={noviCode} lang="glsl" caption="원반 셰이딩 함수 안의 온도 프로필과 흑체 색입니다. 6번째 줄의 적색편이 계수 sqrt(1 − RS/r)는 중력 우물 속 모든 광원에 대해 계산하는 것과 같은 적색편이입니다." />

	<Sandbox
		src="/learn/event-horizon/03-disk-flat.html"
		title="3단계 — 원반만 보기 (렌즈 효과 없음)"
		caption="강착원반만 위에서 내려다본 모습입니다. 중력으로 휘어지지 않고 원근 효과도 없습니다. 적도면을 곧바로 내려다보고 있습니다. ISCO 슬라이더를 움직여 안쪽 경계와 밝기 정점이 바깥으로 이동하는 모습을 확인해 보세요."
		aspect="16/9"
		params={[
			{ name: 'ISCO', label: '안쪽 안정 원궤도 반지름', min: 2.0, max: 6.0, step: 0.05, default: 3.0 },
			{ name: 'INNER', label: '내부 글로우 경계', min: 1.5, max: 4.0, step: 0.05, default: 2.2 },
			{ name: 'OUTER', label: '외곽 경계', min: 8, max: 22, step: 0.5, default: 14 },
			{ name: 'TURBULENCE', label: '난기류', min: 0, max: 1, step: 0.05, default: 1.0 },
			{ name: 'RINGS', label: '링 대비', min: 0, max: 1, step: 0.05, default: 1.0 },
			{ name: 'SPEED', label: '회전 속도', min: 0.1, max: 3, step: 0.1, default: 1.0 }
		]}
	/>

	<h2 id="lensing-disk">블랙홀 주위로 원반 감싸기</h2>

	<p>
		기울기를 높이면 위쪽 호가 두꺼워진다. 원반이 넓어진 것이 아니라 뒤쪽 원반이 렌즈 효과로 <em>더 많이</em> 보이는 것이다.
	</p>

	<Sandbox
		src="/learn/event-horizon/04-disk-lensed.html"
		title="4단계 — 원반 + 중력 렌즈 (아직 도플러 없음)"
		caption="카메라를 기울여 원반의 먼 쪽이 실루엣 위로 올라오는 모습을 보세요. 이 단계에서는 원반의 양쪽이 똑같이 밝습니다. 기하에는 중력을 적용했지만, 아직 운동에는 상대론을 적용하지 않았습니다."
		wide
		aspect="16/8"
		params={[
			{ name: 'ROTATION_SPEED', label: '카메라 궤도', min: 0, max: 1, step: 0.05, default: 0.3 },
			{ name: 'TILT', label: '기울기', min: -0.6, max: 0.6, step: 0.02, default: 0.0 },
			{ name: 'ROTATE', label: '회전', min: -3.14, max: 3.14, step: 0.05, default: 0.0 },
			{ name: 'DISK_INTENSITY', label: '디스크 밝기', min: 0.3, max: 2, step: 0.1, default: 1.0 }
		]}
	/>

	<p>
		대표 셰이더는 한쪽이 더 밝다. 이 비대칭이 전체 장면에서 가장 인상적인 물리 효과다.
	</p>

	<h2 id="doppler">한쪽이 더 밝은 이유</h2>

	<p>
		원반의 플라스마는 빛의 속도에 가까운 비율로 공전한다. 다가오는 쪽은 도플러 비밍으로 밝아지고 청색편이된다.
	</p>

	<p>
		밝기 증가는 도플러 인자의 세제곱에 비례하므로 작은 속도 차이도 큰 밝기 차이로 바뀐다.
	</p>

	<p>
		M87과 Sgr A*의 실제 사진에서도 고리 한쪽이 더 밝은 같은 비대칭을 볼 수 있다.
	</p>

	<Code code={dopplerCode} lang="glsl" caption="원반 셰이더 안에서 도플러 비밍과 주파수 이동을 처리합니다. orbSpeed는 케플러 궤도에서 얻습니다 (v ≈ √(GM/r), 이 단위계에서는 √(0.5·RS/r))." />

	<Sandbox
		src="/learn/event-horizon/05-doppler.html"
		title="5단계 — 원반 + 렌즈 + 도플러 빔"
		caption="도플러 슬라이더는 비대칭을 0(4단계의 대칭 원반)에서 1(완전한 상대론적 비밍)까지 조절합니다. 카메라를 옆으로 드래그하면 다가오는 쪽과 멀어지는 쪽의 차이가 극적으로 드러납니다. 토글을 눌러 도플러 효과를 깔끔하게 켜고 끌 수 있습니다."
		wide
		aspect="16/8"
		params={[
			{ name: 'TILT', label: '기울기', min: -0.6, max: 0.6, step: 0.02, default: 0.0 },
			{ name: 'ROTATE', label: '회전', min: -3.14, max: 3.14, step: 0.05, default: 0.0 },
			{ name: 'ROTATION_SPEED', label: '카메라 궤도', min: 0, max: 1, step: 0.05, default: 0.25 },
			{ name: 'DISK_INTENSITY', label: '디스크 밝기', min: 0.3, max: 2, step: 0.1, default: 1.0 }
		]}
		toggle={{ name: 'DOPPLER', label: '상대론적 도플러 비밍', onValue: 1, offValue: 0, default: true }}
	/>

	<Aside type="note" title="실제 블랙홀은 어떤 모습일까?">
		{#snippet children()}
			<p>
		실제 블랙홀은 흔들리고 극 방향 제트를 내뿜으며, 단순한 모델보다 훨씬 복잡한 원반 물리를 가진다.
	</p>
			<p>
		카메라를 크게 기울이면 실루엣 가장자리에 광자 고리라는 가느다란 밝은 선이 보인다.
	</p>
		{/snippet}
	</Aside>

	<h2 id="photon-ring">광자 고리</h2>

	<p>
		광선이 원반 평면을 여러 번 통과할 수 있다는 사실만으로도 여러 겹의 얇은 고리가 자연스럽게 만들어진다.
	</p>

	<p>
		광자 고리는 매우 얇기 때문에 한 픽셀로 샘플링하면 깜박이는 모아레가 생긴다. 뒤쪽 교차의 강도를 낮추면 이를 완화할 수 있다.
	</p>

	<Code code={crossingCode} lang="glsl" caption="적분 반복문 안의 원반 교차 처리기입니다. 세 번째 이후의 교차는 강도를 15%로 낮춥니다. 그렇지 않으면 1픽셀 고리에서 버징 형태의 앨리어싱이 생깁니다." />

	<Aside type="warning" title="선명한 특징의 안티앨리어싱">
		{#snippet children()}
			<p>
		1080p 화면의 모든 픽셀이 초당 60회 광선 행진을 실행하므로, 블랙홀 근처에서는 초당 수억 단계가 필요하다.
	</p>
		{/snippet}
	</Aside>

	<h2 id="performance">노트북에서 60fps로 실행하기</h2>

	<p>
		가장 큰 절약은 가변 단계 크기에서 나온다. 멀리서는 큰 간격으로 이동하고 가까이서는 간격을 줄인다.
	</p>

	<p>
		각운동량과 가속도의 상수항은 광선마다 한 번만 계산하고, 충분히 멀어진 광선은 조기에 종료한다. <code>h = 3.5</code> <code>h ≈ 0.06</code> <code>h = 0.16 · clamp(r − 0.4·RS, 0.06, 3.5)</code>
	</p>

	<p>
		슈바르츠실트는 쉬운 경우다. 회전하는 커 블랙홀은 시공간을 끌고 가지만, 시각적으로는 훨씬 적은 수학으로도 충분한 결과를 얻는다. <Math>{#snippet children()}L²{/snippet}</Math> <code>1/r²</code> <code>1/r⁵</code> <code>(invR²)² / r</code>
	</p>

	<p>
		전체 셰이더는 별밭, 측지선 적분, 원반의 흑체 색, 알파 합성, 도플러 비밍과 톤 곡선을 차례로 연결한다. <code>0.35·RS</code>
	</p>

	<Aside type="tip" title="커 블랙홀은 어떨까?">
		{#snippet children()}
			<p>
		모든 요소와 매개변수를 켜 두었다. 색 분산 슬라이더는 흑체 매핑에 스펙트럼 차원을 하나 더한 효과다.
	</p>
		{/snippet}
	</Aside>

	<h2 id="putting-together">모든 요소 합치기</h2>

	<p>
		관련 논문과 구현을 차례로 읽으면 좋다. Starless는 케르 지원을 갖춘 엄밀한 오프라인 버전이고, 다른 자료는 측지선과 영화 속 외형을 설명한다. <code>&lt;iframe&gt;</code>
	</p>

	<p>
		소스는 600줄이 되지 않는 HTML이다. 빌드 과정 없이 배경, 히어로 이미지, 배경화면으로 사용할 수 있다.
	</p>

	<Sandbox
		src="/{shader.file}"
		title="최종 셰이더"
		caption="모든 요소를 합쳤습니다. /shader/event-horizon과 같은 파일이며, 전체 화면에 바로 사용할 수 있고 모든 매개변수가 실시간으로 작동하며 60fps를 유지합니다."
		wide
		aspect="16/8"
		params={[
			{ name: 'ROTATION_SPEED', label: '카메라 궤도', min: 0.05, max: 1.0, step: 0.05, default: 0.3 },
			{ name: 'DISK_INTENSITY', label: '디스크 밝기', min: 0.3, max: 2.0, step: 0.1, default: 1.0 },
			{ name: 'TILT', label: '기울기', min: -1.5, max: 1.5, step: 0.05, default: 0.0 },
			{ name: 'ROTATE', label: '회전', min: -3.14, max: 3.14, step: 0.05, default: 0.0 },
			{ name: 'CHROMATIC', label: '색 분산', min: 0, max: 1, step: 0.05, default: 0.0 }
		]}
	/>

	<h2 id="reading">다음으로 읽을 자료</h2>

	<p>
		소스는 600줄이 되지 않는 HTML이다. 빌드 과정 없이 배경, 히어로 이미지, 배경화면으로 사용할 수 있다.
	</p>

	<p>
		소스는 600줄이 되지 않는 HTML이다. 빌드 과정 없이 배경, 히어로 이미지, 배경화면으로 사용할 수 있다.
	</p>
</ArticleShell>
