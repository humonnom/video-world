# 전체 설명 및 목차

이 문서는 회원가입, 로그인 기능을 가진 웹 애플리케이션의 개발 과정과 주요 기능, 그리고 프로젝트 실행 방법에 대해 설명합니다.

## 목차

1. [프로젝트 실행 방법](#프로젝트-실행-방법)
2. [회원가입 및 로그인 기능 구현](#회원가입-및-로그인-기능-구현)
3. [Form 컴포넌트 설명](#form-컴포넌트-설명)
4. [데이터 유효성 검사 시스템](#데이터-유효성-검사-시스템)
5. [사용된 주요 기술 스택](#사용된-주요-기술-스택)

---

# 프로젝트 실행 방법

이 프로젝트는 **Next.js와 npm을 사용하여 개발**되었습니다. 아래 단계에 따라 프로젝트를 실행할 수 있습니다.

## 사전 요구사항

- **Node.js**
- **npm (Node.js와 함께 설치됨)**

## 설치

1. 프로젝트 저장소를 클론하거나 다운로드합니다.
2. 터미널에서 프로젝트 디렉토리로 이동합니다.
3. 다음 명령어를 실행하여 필요한 패키지를 설치합니다.

```bash
npm install
```

## 개발 서버 실행

개발 서버를 실행하려면 다음 명령어를 사용합니다.

```bash
npm run dev
```

이 명령어를 실행하면 Next.js 개발 서버가 시작되고, 기본적으로 `http://localhost:3000`에서 애플리케이션에 접근할 수 있습니다.

## 프로덕션 빌드

프로덕션 환경에서 애플리케이션을 빌드하려면 다음 명령어를 사용합니다.

```bash
npm run build
```

이 명령어는 최적화된 프로덕션 빌드를 생성합니다.

## 추가 스크립트

- `npm run lint`: **Prettier를 사용하여 코드 스타일을 자동으로 수정하고, Next.js의 ESLint 설정을 적용**합니다.
- `npm test`: **Jest를 사용하여 테스트를 실행**합니다.
- `npm run test:watch`: **Jest를 watch 모드로 실행**하여 파일 변경 시 자동으로 테스트를 다시 실행합니다.

위 단계에 따라 프로젝트를 설치, 실행, 빌드 및 테스트할 수 있습니다.

---

# 기술 스택

## 프레임워크 및 라이브러리

- **Next.js**: React 기반의 서버 사이드 렌더링 프레임워크
- **React**: UI 구축을 위한 JavaScript 라이브러리
- **React Query**: 데이터 fetching, 캐싱 및 동기화를 위한 라이브러리
- **Axios**: HTTP 클라이언트 라이브러리
- **bcryptjs**: 비밀번호 해싱을 위한 라이브러리
- **date-fns**: 날짜 조작 및 포맷팅을 위한 라이브러리
- **next-seo**: Next.js 애플리케이션의 SEO 관리를 위한 패키지
- **react-toastify**: 토스트 알림을 쉽게 추가할 수 있는 라이브러리
- **ts-pattern**: TypeScript 패턴 매칭 라이브러리

## 테스팅

- **Jest**: JavaScript 테스팅 프레임워크
- **Testing Library**: React 컴포넌트 테스트를 위한 라이브러리
- **jsdom**: Node.js 환경에서 브라우저 DOM 시뮬레이션을 위한 라이브러리
- **next-router-mock**: Next.js 라우터 모의 객체 라이브러리

## 스타일링 및 포맷팅

- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **Prettier**: 코드 포맷터
- **ESLint**: JavaScript 및 TypeScript 코드 품질 도구

## 기타

- **TypeScript**: JavaScript에 정적 타입 지원을 추가하는 언어
- **Autoprefixer**: CSS에 자동으로 vendor-prefix를 추가하는 PostCSS 플러그인
- **PostCSS**: CSS 변환을 위한 도구
# video-world
