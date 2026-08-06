# Radiant KR — 한국 전통 색채 셰이더 컬렉션

**한국적 색감과 모티프가 추가된 Radiant 셰이더 갤러리.**

원본 [pbakaus/radiant](https://github.com/pbakaus/radiant) (MIT)을 기반으로, 한국 전통 오방색(五方色)·한국적 모티프가 가미된 셰이더 1개(신년 폭죽)가 포함된 독립 포크입니다. **upstream PR은 보내지 않으며**, sigco3111 계정에서 단독 운영됩니다.

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
# → build/ 폴더에 정적 산출물 (Vercel 배포용)
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

---

## 📜 원본 attribution

이 저장소는 다음 원본에서 파생되었습니다:

- **원본**: [pbakaus/radiant](https://github.com/pbakaus/radiant)
- **저자**: pbakaus 및 Radiant 기여자
- **라이선스**: MIT
- **원본 commit 기반**: 2026-08-06 시점 클론

원본의 96개 셰이더는 모두 그대로 보존되어 있습니다. 이 저장소의 추가분은 `static/new-year-fireworks.html`과 `src/lib/shaders.ts`의 신규 엔트리 1개뿐이며, 모두 동일 MIT 라이선스를 따릅니다.

---

## 🌐 Vercel 배포

이 저장소는 Vercel 정적 사이트로 즉시 배포 가능합니다:

```bash
vercel deploy --prod
# 또는 GitHub 연동 후 자동 배포
```

`vercel.json`은 이미 원본에 포함되어 있어 별도 설정 불필요 (`outputDirectory: "build"`).

---

## 🗂️ 구조

```
static/
├── *.html                            # 원본 96개 셰이더
└── new-year-fireworks.html           # [신규] 한국적 폭죽 셰이더

src/
├── lib/shaders.ts                    # 원본 96개 + 신규 1개 카탈로그
└── ...                               # SvelteKit 갤러리
```

---

**유지보수**: sigco3111 · **라이선스**: MIT (원본 + 추가분 동일)