# Radiant KR — 한국 전통 색채 셰이더 컬렉션

**한국적 색감과 모티프가 추가된 Radiant 셰이더 갤러리.**

[![Live](https://img.shields.io/badge/GitHub%20Pages-Live-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://sigco3111.github.io/radiant-kr)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/sigco3111-radiant--kr-181717?logo=github)](https://github.com/sigco3111/radiant-kr)

원본 [pbakaus/radiant](https://github.com/pbakaus/radiant) (MIT)을 기반으로, 한국 전통 오방색(五方色)·한국적 모티프가 가미된 셰이더 1개(신년 폭죽)가 포함된 독립 포크입니다. **upstream PR은 보내지 않으며**, sigco3111 계정에서 단독 운영됩니다.

---

## 🌐 라이브 데모

| 페이지 | URL |
|---|---|
| 갤러리 홈 | https://sigco3111.github.io/radiant-kr |
| 전체 셰이더 목록 | https://sigco3111.github.io/radiant-kr/gallery/all.html |

> ℹ️ SvelteKit `adapter-static` prerender 특성상 URL 끝에 `.html`을 명시해야 접근 가능합니다 (예: `/gallery/all.html`). `.html`을 생략하면 404를 반환합니다.

---

## 🎆 무엇이 다른가?

원본 Radiant는 96개의 zero-dep 생성형 셰이더 컬렉션입니다 (SvelteKit 갤러리 + Canvas/WebGL 셰이더 standalone HTML). 모든 셰이더가 amber 톤 베이스이지만, 어떤 문화적 모티프도 직접 다루지 않습니다.

이 저장소는:

- 🎆 **한국 전통 오방색 (obangsaek) 폭죽 셰이더** 1개 추가 — 청/적/황/백/흑 + 금빛 팔레트
- 🎨 한국 신년 분위기의 navy night sky 배경
- ✨ 클릭으로 어디든 발사 가능한 인터랙티브 폭죽
- 🌸 한국적 모티프 셰이더를 점진적으로 추가할 수 있는 구조

---

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev
# → http://localhost:5173/shader/new-year-fireworks

# 프로덕션 빌드
npm run build
# → build/ 폴더에 정적 산출물 (GitHub Pages 배포용)
```

---

## 🎆 추가된 셰이더

### `new-year-fireworks` — New Year Fireworks
- **태그**: `fill`, `particles`, `organic`
- **기술**: Canvas 2D
- **파라미터**: Burst Rate (0.3~3.0), Particle Density (0.5~2.0)
- **인터랙션**: 화면 어디든 클릭 → 폭죽 발사, 자동 폭죽도 0.8~1.5초 간격
- **컬러 팔레트 (3종 랜덤)**:
  - **오방색**: 청(2E86C1) / 적(E03946) / 황(F1C40F) / 백(F5F5F5) / 흑(2C3E50)
  - **로열 골드**: FFD700 / FFAA33 / C95233 / FFE88A / 8B0000
  - **봄꽃**: FFB7C5 / FF69B4 / FFE88A / B5E8FC / FFD9B3
- **Preview sprite**: `static/previews/new-year-fireworks.webp` (960×3600, 6 컬러 스킴 프레임)

---

## 📜 원본 attribution

이 저장소는 다음 원본에서 파생되었습니다:

- **원본**: [pbakaus/radiant](https://github.com/pbakaus/radiant)
- **저자**: pbakaus 및 Radiant 기여자
- **라이선스**: MIT
- **원본 commit 기반**: 2026-08-06 시점 클론

원본의 96개 셰이더는 모두 그대로 보존되어 있습니다. 이 저장소의 추가분은 다음과 같으며 모두 동일 MIT 라이선스를 따릅니다:

- `static/new-year-fireworks.html` (셰이더 본체)
- `static/previews/new-year-fireworks.webp` (갤러리 카드 썸네일)
- `src/lib/shaders.ts`의 신규 엔트리 1개

---

## 🌐 GitHub Pages 배포

이 저장소는 GitHub Pages 정적 사이트로 배포되어 있습니다.

**라이브 URL**: https://sigco3111.github.io/radiant-kr

SvelteKit `adapter-static`이 `build/` 폴더에 SPA 모드 산출물을 생성하며, gh-pages 브랜치에서 root로 서빙됩니다.

📦 **호스팅 메모 (Vercel 사용 이력)**: 이전에는 Vercel로 배포했으나 2026-08에 Pages로 전환했습니다. `vercel.json`은 원본 보존 (Pages는 SPA rewrites 무해). `vercel deploy` CLI로 재전이 가능하나 현재는 Pages를 권장합니다.

GitHub 푸시 시 자동 재배포는 미설정 상태 — 수동 gh-pages 푸시가 필요할 때 다음 워크플로를 사용하세요:

```bash
npm run build
git checkout gh-pages
rm -rf index.html _app/ _next/ etc...
cp -R build/* .
git commit -am "deploy: github pages"
git push origin gh-pages
# (참고) Vercel 재배포 명령 (보존):
# CI='' vercel deploy --prod --yes
```

---

## 🗂️ 구조

```
static/
├── *.html                                # 원본 96개 셰이더
├── previews/*.webp                       # 원본 96개 preview sprite
├── new-year-fireworks.html               # [신규] 한국적 폭죽 셰이더
└── previews/new-year-fireworks.webp      # [신규] 폭죽 셰이더 preview sprite

src/
├── lib/shaders.ts                        # 원본 96개 + 신규 1개 카탈로그
└── ...                                   # SvelteKit 갤러리
```

---

## 🛠️ 새 셰이더 추가 절차 (참고)

원본 AGENTS.md의 가이드에 따라 새 셰이더를 추가합니다:

1. `static/<name>.html` 셰이더 HTML 작성
2. `src/lib/shaders.ts` 카탈로그에 엔트리 추가
3. `node scripts/generate-previews.mjs --only=<name>`로 preview sprite 생성
4. `npm run build` → GitHub Pages 배포 (`build/` → gh-pages 브랜치)

---

**유지보수**: sigco3111 · **라이선스**: MIT (원본 + 추가분 동일)