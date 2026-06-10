# 한빔커뮤니티 (HANBEAM LIFE)

가족 라이프스타일 정보 커뮤니티 + 미니홈 플랫폼. 결혼 준비 → 육아 → 교육까지 생애주기를 함께하는 서비스.

## 구조

정적 사이트입니다. 빌드 과정이 필요 없으며, 이 폴더를 그대로 호스팅하면 됩니다.

```
index.html          메인 사이트 (진입점)
admin.html          관리자 콘솔
app/                화면 컴포넌트(.js)와 스타일(.css)
vendor/             React 라이브러리 (자체 호스팅)
tweaks-panel.js     디자인 토글 패널
```

- React는 `vendor/`에 자체 호스팅되어 외부 차단 환경에서도 동작합니다.
- 화면 코드는 `.js`이며, 원본은 `.jsx`입니다(별도 보관). 코드 수정 시 재컴파일이 필요합니다.
- 폰트(Pretendard, Jua, Gaegu)는 CDN에서 로드합니다. 완전 오프라인이 필요하면 폰트도 로컬화할 수 있습니다.

## 배포 (Vercel)

이 저장소는 빌드 설정이 필요 없습니다.

**방법 A — GitHub 연결 (권장)**
1. 이 폴더를 GitHub 저장소에 push
2. Vercel → Add New → Project → 저장소 Import
3. Framework Preset: **Other**, 별도 설정 없이 Deploy
4. 이후 `git push`마다 자동 배포

**방법 B — 드래그&드롭**
1. Vercel → Add New → Project
2. 이 폴더를 통째로 드래그&드롭 → Deploy

## 데이터 / 콘텐츠

현재 콘텐츠는 `app/data.js`에 포함되어 있습니다(데모 데이터).
실제 서비스로 전환하려면 Supabase 연동이 필요합니다 — `서비스 오픈 가이드` 문서를 참고하세요.

> ⚠️ 프론트엔드에는 Supabase **anon 키만** 사용하세요. `service_role` 키는 절대 포함하지 마세요.
