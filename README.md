# Portfolio

풀스택 개발자 포트폴리오 웹사이트. 순수 HTML/CSS/JS로 제작되어 빌드 과정 없이 바로 배포됩니다.

🔗 **Live:** https://newbiehwang.github.io/portfolio/

## 구성

| 파일 | 설명 |
|------|------|
| `index.html` | 페이지 구조 (Hero · About · Skills · Projects · Contact) |
| `styles.css` | 다크 모던 테마 · 반응형 레이아웃 · 애니메이션 |
| `script.js` | 네비게이션 · 모바일 메뉴 · 스크롤 리빌 |

## 커스터마이징 가이드

내용을 본인 것으로 바꾸려면 `index.html`에서 아래를 수정하세요.

- **이름 / 직무** — `<title>`, 네비 로고 `SH`, About 코드 블록, 푸터
- **소개 문구** — `.hero-sub`, About 섹션 `<p>`
- **기술 스택** — Skills 섹션의 `.tags span`
- **프로젝트** — `.project-card` 3개 (제목·설명·태그·링크 `href="#"`)
- **연락처** — 이메일(`mailto:`), GitHub/LinkedIn/Blog 링크

색상 테마는 `styles.css` 상단 `:root`의 `--accent`, `--accent-2` 값만 바꾸면 전체가 함께 바뀝니다.

## 로컬 미리보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 배포

`main` 브랜치에 푸시하면 GitHub Pages가 자동으로 반영합니다.
