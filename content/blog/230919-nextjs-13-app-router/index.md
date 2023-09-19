---
title: 'Next.js 13 업데이트 된 내용 정리 & App 라우터 자세히 알아보기'
date: '2023-09-19T11:45:32.169Z'
description: 'Next.js 13의 App 라우터란?'
category: 'React'
keywords: 'Next.js 13, App Router'
image: 'https://velog.velcdn.com/images/khy226/post/0eafc97c-9a08-46b6-a49b-aedee92eefc6/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/0eafc97c-9a08-46b6-a49b-aedee92eefc6/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

# 개요

2022.10.25에 발표한 Next.js 13에서 변경되는 내용들을 정리해보았습니다. (현재 2023.09 기준 Next.js 13.4 까지 업데이트가 되어서 13.4 기준으로 리서치) 우선은 업데이트 된 내용들을 모아서 정리한 후에, 가장 크게 변경되는 Next.js 13 App Router에 대해서 구체적으로 알아보겠습니다. 또한, Next.js 13 App Router로 업데이트 하는 방법에 대해서도 정리해보겠습니다.

<br />

# Next.js 13에서 업데이트 된 내용

## App Router

- 기존에 pages/ 디렉토리에서 라우팅 되던 방식과 다르게, app/ 디렉토리로 라우팅 하는 방식이 추가됨
- app/ 디렉토리를 생성하여 라우팅을 설정할 수 있으며, 라우팅 환경 개선 뿐만 아니라, 레이아웃, 서버 컴포넌트, 스트리밍, 데이터 패칭까지도 지원하는 형태로 향상

  - Layout: 리렌더링 방지를 위한 레이아웃 제공 (기존 \_app.tsx 파일과 비슷한 개념)
  - Server Component: app 디렉토리 내 파일은 디폴트로 서버 컴포넌트로 동작함
  - Streaming: app 디렉토리는 렌더링되는 UI 단위를 점진적으로 렌더링 & 스트리밍할 수 있는 기능 제공
  - Data Fetching 지원: fetch() Web API를 사용할 수 있게 되어, 컴포넌트 레벨에서도 SSR 적용 가능

- app/ 폴더로 기존 파일 시스템 라우팅을 구현할 수 있으며, 여기의 page.js가 해당 경로(라우팅)의 페이지 컴포넌트가 됨
- pages/ 라우팅과 함께 사용 가능 (점진적 업데이트)

<br />

- 기존 pages 라우터 방식

```jsx
// pages/index.js
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

- 새로운 앱 라우터 방식

```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/page.js
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
```

<br />

## Layout

- app 파일 시스템을 통해서 기본 레이아웃을 정의할 수 있음
- 공통적인 레이아웃 UI를 children을 감싸는 컴포넌트 형태로 제공. 이를 통해 공통 레이아웃의 상태를 유지하고, 불필요한 리렌더링을 방지할 수 있으며, 컴포넌트 간 상호작용 향상

![](https://velog.velcdn.com/images/khy226/post/0eafc97c-9a08-46b6-a49b-aedee92eefc6/image.png)

- 폴더 경로 안에 layout.js 컴포넌트를 추가하면 공통 레이아웃 적용 가능

```jsx
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return <section>{children}</section>
}
```

![](https://velog.velcdn.com/images/khy226/post/b4525a12-7769-4a0b-86ae-e86c05d93fab/image.png)

- app 디렉토리 루트에 있는 RootLayout은 필수이며, 그 하위에 있는 폴더에서는 커스텀 레이아웃을 만들 수 있음. 이때, 위 사진처럼 상위 레이아웃이 하위 레이아웃을 감싸는 구조

```jsx
// app/layout.js (필수)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

<br />

## React Server Component

- app directory 내부에서는 모든 컴포넌트가 기본적으로 서버 컴포넌트로 동작함

  - 서버 컴포넌트는 복잡한 인터페이스를 구축하는 동시에 클라이언트로 전송되는 JavaScript의 양을 줄여, 초기 페이지 로드 속도를 높일 수 있음
  - 또한, 경로(route)가 로드될 때, Next.js 및 React 런타임이 로드되어 캐시가 가능하고 크기를 예측할 수 있음
  - 서버 컴포넌트 vs 클라이언트 컴포넌트: 컴폰넌트가 렌더링 되는 장소가 서버인지 클라이언트인지의 차이. 서버 컴포넌트는 서버에서 한 번 해석 된 후 클라이언트로 전달됨

- 클라이언트 컴포넌트: 만약 app directory 내부에서 클라이언트 컴포넌트를 사용하고 싶다면 파일 최상단에 use client라는 directive를 명시해야 함

  - useState, useEffect 훅을 사용하는 경우
  - 특정 브라우저 API에 의존성이 있는 경우
  - 특정 Event Listeners를 추가하는 경우

```jsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked the Count++ button {count} times</p>
      <button onClick={() => setCount(count + 1)}>Count++</button>
    </div>
  )
}
```

<br />

## Streaming

- app/ 디렉토리는 UI의 렌더링 단위를 점진적으로 렌더링하고 렌더링된 단위를 클라이언트로 부분적으로 스트리밍할 수 있는 기능을 제공

  - 스트리밍: SSR로 렌더링을 하면 블로킹이 될 수 있음. 이를 개선하기 위해 스트리밍으로 페이지의 HTML을 작은 청크로 분할하고, 서버에서 클라이언트로 점진적으로 청크를 전송할 수 있음. 이를 통해 UI를 렌더링하기 전에 모든 데이터를 기다릴 필요 없이 페이지의 일부를 더 빨리 표시할 수 있음

  ![](https://velog.velcdn.com/images/khy226/post/26fbfa7f-cfc3-470d-93e3-16e17cda2a6a/image.png)

- 또한, loading.js 파일을 만들어서 트리밍 형태의 로딩 UI를 생성할 수 있음. loading.js 파일을 생성하면 React Suspense를 자동으로 래핑하여 로딩 화면을 보여주고, 라우트 세그먼트의 내용을 로드하는 동안 서버에서 즉시 로딩 상태를 표시하고, 렌더링이 완료되면 자동으로 새로운 콘텐츠로 교체됨

```jsx
/* app/dashboard/loading.tsx */

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

- 같은 폴더에서 loading.js는 layout.js 안에 중첩됨. `<Suspense>` 경계에서 page.js 파일과 그 아래의 모든 자식을 자동으로 래핑함

![](https://velog.velcdn.com/images/khy226/post/d6235a37-2771-4d28-b68b-8b8d3431baa8/image.png)

<br />

## Data Fetching

- fetch() Web API를 사용할 수 있게 되면서, 이제는 컴포넌트 레벨에서도 SSR의 적용이 가능함
- React는 fetch() API의 중복제거를 제공하며, Next.js는 캐싱과 재요청 처리까지 지원하려고 함.
- 이를 통해, 기존의 SSG, SSR, ISR(Incremental Static Regeneration) 등의 기법을 아래와 같은 fetch() 옵션으로 대체 가능

```jsx
// This request should be cached until manually invalidated.
// Similar to `getStaticProps`.
// `force-cache` is the default and can be omitted.
fetch(URL, { cache: 'force-cache' })

// This request should be refetched on every request.
// Similar to `getServerSideProps`.
fetch(URL, { cache: 'no-store' })

// This request should be cached with a lifetime of 10 seconds.
// Similar to `getStaticProps` with the `revalidate` option.
fetch(URL, { next: { revalidate: 10 } })
```

<br />

## Turbopack (beta)

- Next.js 13에서는 Rust 기반의 JS 번들링 툴인 Turbopack이 포함됨.

  - Turbopack은 개발에 필요한 최소한의 어셋만 번들링해서 시작시간이 매우 빠름
  - Webpack 보다 700배 빠른 업데이트
  - Vite 보다 10배 빠른 업데이트
  - Webpack 보다 4배 빠른 cold start(Single Page 표현을 위해 로컬에 데이터를 불러오고 HTML 기반으로 로드준비가 된 상태)

![](https://velog.velcdn.com/images/khy226/post/5d160d18-e1b8-4f6e-b308-5ff441da47c0/image.png)

<br />

## New next/Image

- 기존의 Image 컴포넌트에 좀 더 강력한 기능들을 부가해서, layout 변경 없이 간단히 이미지를 표시하고 파일을 최적화하여 성능을 향상
- 클라이언트 측에서 더 적은 양의 Javascript 코드를 가짐
- 더 쉽게 스타일링과 설정이 가능
- alt 속성을 필수로 제한하여 웹 접근성 향상
- 웹 플랫폼에 맞게 조정 (사이즈와 화질 등) - 이미지 로드가 느리면 기존 레이아웃이 밀리는 Layout Shift를 방지 (width, height 필수)
- hydration을 필요로 하지 않는 네이티브 lazy-loading 으로 속도 향상
- (참고) 기존 이미지 컴포넌트는 next/legacy/image로 변경됨

<br />

## New @next/font (beta)

- 구글 폰트를 내장한 새로운 폰트 시스템 도입
- 커스텀 폰트를 포함하여 폰트를 자동으로 최적화
- 개인 정보 보호 및 성능 향상을 위한 외부 네트워크 요청 제거
- 모든 폰트 파일에 대한 내장형 자동 자체 호스팅 제공
- CSS size-adjust 속성을 적용하여 자동으로 레이아웃 이동이 발생하지 않음

```jsx
import { Inter } from '@next/font/google';

const inter = Inter();

<html className={inter.className}>
```

<br />

## Improved next/link

- `<Link>` 컴포넌트에 더 이상 수동으로 `<a>` 태그를 하위에 추가할 필요가 없어짐
- `<Link>`는 이제 기본값으로 `<a>` 태그를 렌더링하며, `<a>` 태그의 Props들을 정상적으로 전달할 수 있음

```jsx
import Link from 'next/link'

// Next.js 12: `<a>` has to be nested otherwise it's excluded
<Link href="/about">
  <a>About</a>
</Link>

// Next.js 13: `<Link>` always renders `<a>`
<Link href="/about">
  About
</Link>
```

<br />

---

# App Router 알아보기

## 기본 용어

![](https://velog.velcdn.com/images/khy226/post/62f4c3d2-ffd4-4a59-86ac-a7ddba54c562/image.png)

- 트리(Tree): 계층 구조를 시각화하는 방법 (ex. 부모와 자식 컴포넌트를 가진 컴포넌트 트리, 폴더 구조 등)
- 서브트리(Subtree): 트리의 일부로, 새로운 루트(첫 번째)에서 시작하여 마지막 잎(마지막)까지 이어짐
- 루트(Root): 트리나 서브트리의 첫 번째 노드 (ex. 루트 레이아웃)
- 잎(Leaf): 자식이 없는 서브트리의 노드 (ex. URL 경로의 마지막 세그먼트)

![](https://velog.velcdn.com/images/khy226/post/3a9219e1-40c0-4616-9911-6970ce40731b/image.png)

- URL 세그먼트(Segment): 슬래시로 구분된 URL 경로의 일부
- URL 경로(Path): 도메인 다음에 오는 URL의 일부 (세그먼트로 구성)

<br />

## 앱 라우터

- 앱 라우터는 새로운 app 디렉토리에서 작동. app 디렉토리는 기존 pages 디렉토리와 병렬로 작동하여 점진적인 적용을 가능하게 함. 이를 통해 애플리케이션의 일부 라우트를 새로운 동작으로 전환하면서 기존 동작을 유지하기 위해 pages 디렉토리를 계속 사용할 수 있음.
- app 디렉토리 안에 page.js 파일을 만들어서 공개적으로 접근 가능한 URL 경로를 만들 수 있음
  > 참고: 앱 라우터는 페이지 라우터보다 우선합니다. 서로 다른 디렉토리에 있는 라우트가 동일한 URL 경로로 해석되어서는 안 되며, 이렇게 되면 충돌을 방지하기 위해 빌드 시간에 에러가 발생합니다.

![](https://velog.velcdn.com/images/khy226/post/e03b2faf-2ad6-4435-8534-bc050fcfd8e1/image.png)

- 기본적으로 app 디렉토리 내부의 컴포넌트는 리액트 서버 컴포넌트로 동작 (성능 최적화). 만약 클라이언트 컴포넌트로 사용하고 싶다면, ‘use client’ 디렉티브를 파일 상위에 정의

<br />

## 폴더와 파일

Next.js는 파일 시스템 기반의 라우터를 사용하며:

- 폴더(Folders)는 라우트를 정의하는데 사용. 라우트는 중첩된 폴더의 단일 경로로, 루트 폴더에서 시작하여 page.js 파일을 포함하는 마지막 잎 폴더까지 파일 시스템의 계층 구조를 따름.
- 파일(Files)은 라우트 세그먼트에 대해 표시될 UI를 생성하는데 사용

<br />

## 라우트 세그먼트

- 라우트의 각 폴더는 라우트 세그먼트를 나타냄
- 각 라우트 세그먼트는 URL 경로의 해당 세그먼트에 매핑됨
  ![](https://velog.velcdn.com/images/khy226/post/7edde05f-2847-409b-a9b3-5769038b0d43/image.png)

<br />

## 중첩된 라우트

- 폴더를 서로 중첩시켜서 중첩된 라우트 생성 가능
- ex. app 디렉토리에 두 개의 새 폴더를 중첩하여 새로운 /dashboard/settings 라우트를 추가할 수 있음

  - /dashboard/settings 라우트는 세 가지 세그먼트로 구성됨:
  - / (루트 세그먼트)
  - dashboard (세그먼트)
  - settings (잎 세그먼트)

<br />

## 파일 규칙

Next.js는 중첩된 라우트에서 특정 동작을 가진 UI를 생성하기 위해 일련의 특별한 파일을 제공함:

- layout: 세그먼트와 그 자식들에 대한 공유 UI
- page: 라우트의 고유한 UI를 만들고 공개적으로 접근 가능하게 만드는 파일
- loading: 세그먼트와 그 자식들에 대한 로딩 UI
- not-found: 세그먼트와 그 자식들에 대한 404 UI
- error: 세그먼트와 그 자식들에 대한 에러 UI
- global-error: 글로벌 에러 UI
- route: 서버 측 API 엔드포인트 (기존 pages의 api 폴더 역할)
- template: 커스텀 된 (리렌더링) 레이아웃 UI
- default: 병렬 라우트에 대한 fallback UI
  > 참고: .js, .jsx, .tsx 파일 확장자 모두 사용 가능

<br />

## 컴포넌트 계층 구조

라우트 세그먼트의 특별한 파일에서 정의된 React 컴포넌트들은 특정 계층 구조로 렌더링 됨:

- layout.js
- template.js
- error.js (React error boundary)
- loading.js (React error boundary)
- not-found.js (React error boundary)
- page.js 또는 중첩된 layout.js

![](https://velog.velcdn.com/images/khy226/post/00485328-2a41-4aeb-a722-c17a1966256a/image.png)

- 중첩된 라우트에서는, 세그먼트의 컴포넌트들이 부모 세그먼트의 컴포넌트 내부에 중첩됨:
  ![](https://velog.velcdn.com/images/khy226/post/e19ff9a5-b73c-4e53-817c-6391c96d1b11/image.png)

<br />

## Colocation

- 꼭 라우팅 되는 페이지가 아니어도, app 디렉토리 안에 커스텀 파일 (ex. 컴포넌트, 스타일, 테스트 등)을 배치할 수 있음
- 폴더가 라우팅을 정의하지만, page.js 또는 route.js에서 반환된 내용만이 공개적으로 접근 가능함

![](https://velog.velcdn.com/images/khy226/post/c272c46b-e740-4fc6-a1cd-ab91c93ee188/image.png)

<br />

## 라우트 정의

- 앞서 말한 것 처럼, app router는 파일 시스템에 의해서 라우팅 됨.
- 각각의 폴더가 라우트 세그멘트가 되어, URL 세그멘트로 매핑이 되며, 중복된 경로를 만들기 위해서는 원하는 경로 이름으로 폴더를 중복 생성하면 됨
  ![](https://velog.velcdn.com/images/khy226/post/3318046f-c43e-4f68-8376-78754dc8641b/image.png)
- 폴더를 만든 후에, page.js 파일을 생성해야 공개적으로 접근 가능한 라우트 세그멘트가 됨
  ![](https://velog.velcdn.com/images/khy226/post/7b8693d2-e8aa-446a-b7dd-23c3fb75f967/image.png)
- ex) 위 예시에서 /dashboard/analytics URL는 공개적으로 접근 가능하지 않음. 왜냐면 대응되는 page.js 파일이 없기 때문에. 해당 폴더에는 경로 대신, 컴포넌트, 이미지, 스타일시트 등을 담을 수 있음
- page.js 파일은 기존 pages 라우트에서 만들었던 페이지와 동일한 형태로 작업할 수 있음. 해당 내용이 UI로 표시됨:

```jsx
// app/page.js
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

<br />

## 페이지와 레이아웃

### Pages

- Route의 유일하게 UI를 보여줄 수 있는 페이지
- 기본적으로 서버 컴포넌트로 구성되며, 따로 클라이언트 컴포넌트 설정 가능. 데이터 페칭 가능

### Layout

- 여러 pages 간에 공유되는 UI
- layout은 상태를 보존하고, 인터렉티브를 유지하고, 리렌더링을 하지 않음
- layout.js 파일에서 default export로 정의할 수 있음
- child 레이아웃이나 child 페이지가 있는 경우에, 항상 children props 설정

```jsx
// app/dashboard/layout.tsx

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

- 모든 페이지에 공유되는 루트 레이아웃은 반드시 html, body 태그가 있어야 함
- 레이아웃은 기본으로 children props를 통해 중첩됨
- 레이아웃도 기본적으로 서버 컴포넌트지만, 클라이언트 컴포넌트로 설정 가능
- 특정 라우트에서 공유되는 레이아웃을 제외하고 싶다면, Route Group을 사용할 수 있음. (중괄호로 감싼 폴더)
- 레이아웃은 데이터를 페치할 수 있음. 같은 데이터 여러번 페치 가능. 하지만 부모 자식 레이아웃끼리 데이터 전달 X
- layout.js와 page.js 파일은 같은 폴더에 정의 가능. 레이아웃은 page.js를 감싼다.

<br />

### Root Layout (필수)

- app 디렉토리 루트에 필수로 루트 레이아웃을 정의해야함
- 루트 레이아웃은 반드시 html, body 태그가 있어야 함
- route group를 사용해서 여러 루트 레이아웃을 만들 수 있음

```jsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

<br />

### 중첩 레이아웃

- 기본적으로 레이아웃은 중첩됨. children prop을 통해 하위에 있는 경로들을 감싼다
  ![](https://velog.velcdn.com/images/khy226/post/0035c71f-c3b4-4833-9e87-eb9c63d75c10/image.png)

```jsx
// app/dashboard/layout.tsx

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

<br />

### Templates

- 템플릿은 레이아웃과 비슷하게 layout, page를 감싼다.
- 하지만, template는 새로운 인스턴스를 만든다 (layout은 route, state를 유지함)
- 사용자가 template를 공유하는 페이지를 변경하면, 컴포넌트의 새로운 인스턴스가 마운트되어 DOM 요소가 다시 생성됨. 즉, Template에서는 상태가 유지되지 않고, 모든 effect는 다시 연결됨
- Next.js에서는 아래와 같은 특별한 상황이 아닌 경우, Layout 사용을 권장함

  - CSS, 애니메이션 라이브러리로 애니메이션 시작, 종료할 때
  - useEffect, useState에 의존하는 기능
  - 기본 프레임워크 동작을 변경하는 경우 (페이지 변경할 때 마다 Suspense Boundary의 fallback 보여주기 등)

```jsx
// app/template.tsx

export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

<br />

## 라우트 그룹 (Route Groups)

- 일반적으로 앱 디렉토리에서는 중첩된 폴더가 URL 경로에 매핑됨. 하지만, 폴더를 Route 그룹으로 표시하여 해당 폴더가 경로의 URL 경로에 포함되지 않도록 할 수 있음
- Route Group을 통해 URL 경로 구조에 영향을 주지 않고, 라우트 세그먼트와 프로젝트 파일을 논리적으로 구성할 수 있음
- 컨벤션: 라우트 그룹은 폴더 이름을 괄호로 묶음으로써 생성할 수 있음 (folderName)
  ![](https://velog.velcdn.com/images/khy226/post/99d17849-2771-4a8b-afb9-d7038e751037/image.png)
- 아래와 같은 상황에서 Route Group 활용 가능:

  - 사이트 섹션, 목적별 또는 팀별로 경로를 구성 할 때 (Grouping)
  - 동일한 라우트 세그먼트 수준에서 중첩된 레이아웃을 사용할 때
    - 여러 루트 레이아웃을 포함하여 동일한 세그먼트에 여러 중첩 레이아웃 만들기
  - 특정 세그먼트를 레이아웃으로 선택 할 때

- 각각의 Route Group 마다 같은 URL 계층을 가져도, 다른 layout을 적용할 수 있음.

  - 아래 예시처럼 (marketing), (shop)은 app 하단의 최상위 루트지만, Route Group을 이용해서 별개의 레이아웃 구성할 수 있음.

![](https://velog.velcdn.com/images/khy226/post/8ce4b74c-c51f-442a-a035-f6cb6e66afb5/image.png)

<br />

## 로딩과 스트리밍

### 즉시 로딩 상태 (Instant Loading States)

- 로딩: app 라우터에서 loading.js 파일을 생성하면 React Suspense와 함께 로딩 UI를 보여줌
- Instant Loading States: 인스턴트 로딩 상태는 탐색 시 즉시 표시되는 대체 UI. 스켈레톤, 스피너, 혹은 화면의 작은 부분(커버 사진, 제목 등)과 같은 의미 있는 요소를 사전 렌더링하여 로딩 상태를 만들 수 있음
  ![](https://velog.velcdn.com/images/khy226/post/c24ebb81-755a-480c-939d-e132d60f539c/image.png)

```jsx
// app/dashboard/loading.tsx
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

- 위 예시에서 보이는 loading.js 파일은, 같은 폴더 내에 있는 layout.js에 의해서 감싸진다. 그리고 해당 로딩 Suspense는 page.js 를 감싸게 되는 구조가 된다:

![](https://velog.velcdn.com/images/khy226/post/ed25226d-d269-4942-b36d-580dc2274080/image.png)

- 꼭 loading.js 파일을 사용하지 않아도, 직접 React Suspense Boundary 사용해서 커스텀 할 수 있음

### Streaming

- 아래와 같은 Next.js의 서버 사이드 렌더링(Server-Side Rendering, SSR)의 제한 사항을 개선해주는 방식. Next.js는 페이지를 사용자에게 보여주기 전에 서버에서 모든 데이터 가져오기가 완료되어야 하기 때문에 느릴 수 있음.
  ![](https://velog.velcdn.com/images/khy226/post/861d0088-c71d-44c0-9a79-7a177fee8e1b/image.png)

- Streaming을 통해서 페이지의 HTML을 작은 청크로 분할하고 서버에서 클라이언트로 점진적으로 청크를 전송. 이를 통해 UI를 렌더링하기 전에 모든 데이터를 기다릴 필요 없이 페이지의 일부를 더 빨리 표시할 수 있음
  ![](https://velog.velcdn.com/images/khy226/post/01acf49b-d714-4877-8ebd-8c1c8d716172/image.png)

- 각 컴포넌트는 청크로 간주될 수 있는데, 우선순위가 높은 컴포넌트(예: 제품 정보) 또는 데이터에 의존하지 않는 컴포넌트(예: 레이아웃)를 먼저 보냄으로써 React의 hydration을 더 일찍 시작할 수 있음. 우선순위가 낮은 컴포넌트(예: 리뷰, 관련 제품)는 데이터를 가져온 후에 동일한 서버 요청에서 전송될 수 있음
- 스트리밍은 페이지 렌더링을 차단하지 않고 긴 데이터 요청이 페이지를 방해하는 것을 방지하고자 할 때 특히 유용

```jsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

- 위 예시에서 `<Suspense>`는 비동기 작업(예: 데이터 가져오기)을 수행하는 컴포넌트를 감싸고, 작업이 진행되는 동안 대체 UI(예: 스켈레톤, 스피너)를 표시한 다음 작업이 완료되면 컴포넌트를 교체하는 방식으로 동작함
- Suspense를 사용하면 아래와 같은 장점이 있음:
  - 스트리밍 서버 렌더링: 서버에서 클라이언트로 HTML을 점진적으로 렌더링
  - 선택적 하이드레이션: React는 사용자 상호작용에 기반하여 먼저 상호작용 가능한 컴포넌트를 우선적으로 처리

<br />

## 에러 핸들링

![](https://velog.velcdn.com/images/khy226/post/f6d0ec81-26db-4286-8b26-110aa0d17eaf/image.png)

- error.js 파일 규칙을 사용하면 중첩된 경로에서 런타임 오류를 우아하게 처리할 수 있음
- React Error Boundary 내에 라우트 세그먼트와 해당 중첩된 하위 항목을 자동으로 wrapping
- 파일 시스템 계층 구조를 사용하여 세분화를 조정하여 특정 세그먼트에 맞는 오류 UI 생성
- 오류를 해당 세그먼트로 격리 시켜서 나머지 앱은 정상적으로 동작
- 전체 페이지 새로고침 없이 오류로부터 복구를 시도하는 기능 추가
- 라우트 세그멘트 내에 error.js 파일을 추가하고, React 컴포넌트를 export 해서 에러 UI 생성 가능

```jsx
// app/dashboard/error.tsx
'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

### error.js 작동 방식

- error.js 파일은 자동으로 중첩된 하위 세그먼트나 page.js 컴포넌트를 감싸는 React Error Boundary를 생성
- error.js 파일에서 내보내는 React 컴포넌트는 fallback(대체) 컴포넌트로 사용
- 에러가 에러 바운더리 내에서 발생하면 에러는 포함되고 fallback(대체) 컴포넌트가 렌더링
- fallback 에러 컴포넌트가 활성화되면 에러 바운더리 밖의 레이아웃은 상태를 유지하고 상호작용할 수 있으며, 에러 컴포넌트에서 에러 복구 기능을 표시할 수 있음

![](https://velog.velcdn.com/images/khy226/post/b32855b2-9209-4c78-ad6b-95f21713904b/image.png)

### Error 복구

- 일시적인 에러의 경우, 다시 시도하면 문제가 해결될 수 있음
- 이 경우, 오류 컴포넌트는 reset() 함수를 사용해서 사용자가 오류를 복구할 수 있도록 유도
- 해당 함수가 실행되면 Error Boundary 내용을 리렌더링 하려고 시도함. 성공하면 에러 컴포넌트가 리렌더링된 결과로 대체됨

```jsx
// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

<br />

### Root Layout Error 처리

- Root app/error.js 바운더리는 Root app/layout.js 또는 app/template.js 컴포넌트에서 발생하는 에러를 처리하지 않음
- 루트 레이아웃 컴포넌트를 처리하기 위해서는 루트 app 디렉토리에 app/global-error.js 파일을 생성해야 함
- 기존 error.js와는 다르게, app/global-error.js 파일은 전체 애플리케이션을 감싸며, 루트 레이아웃이 활성화 되었을 때 fallback 컴포넌트가 대체함. (일반적으로 루트 컴포넌트는 덜 동적이므로 자주 트리거되지 않음)
- global-error.js가 정의 되었더라도, 전역적으로 공유되는 UI가 포함된 루트 레이아웃 내에서 렌더링될 fallback 컴포넌트가 있는 root error.js를 정의하는 것이 권장됨

```jsx
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

<br />

## App Router Next.js 13 으로 업데이트 하기

- 공식문서 참고: [Upgrading: From Pages to App](https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration)
- 기본적으로 node.js (16.14), eslint (최신), next.js (13.4)으로 업데이트를 해줘야함
- Image, Link, Script, Font 등의 새로운 기능 업데이트는 공식 문서 참고

## Pages에서 App 라우터로 업데이트하는 방법:

### 1. app 디렉토리 생성

- Next.js 버전 업데이트 후, app 디렉토리 생성 (src/ 디렉토리 내부 루트에 위치)

### 2. Root Layout 생성

- app/layout.tsx 파일을 생성하여 레이아웃 작업
- `<html>`과 `<body>` 태그 정의
- 기존 pages 라우터의 pages/\_app.tsx와 pages/\_document.tsx 파일을 대체하므로, 해당 내용 적용

### 3. next/head 마이그레이션

- Next.js의 Metadata 객체로 `<head>` 태그 정의 (SEO)

```jsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page Title',
}

export default function Page() {
  return '...'
}
```

### 4. Pages 마이그레이션

- 기존 index 파일들을 page.js 파일로 변경
- 클라이언트 컴포넌트를 정의하려면 페이지 상위에 `‘use client’` 디렉티브 입력
  ![](https://velog.velcdn.com/images/khy226/post/154f01b9-2715-47b9-990d-d97ab068155e/image.png)

### 5. 라우팅 hook 마이그레이션

- app 디렉토리에서 라우팅 훅은 next/navigation에서 import하여 사용해야함:
- [useRouter()](https://nextjs.org/docs/app/api-reference/functions/use-router), [usePathname()](https://nextjs.org/docs/app/api-reference/functions/use-pathname), [useSearchParams()](https://nextjs.org/docs/app/api-reference/functions/use-search-params)

### 6. Data Fetching 마이그레이션

- 기존에 사용하던 getServerSideProps 나 getStaticProps 메서드로 데이터 페칭을 하지 않음. 대신, 더 간단한 API로 대체됨
- React Server Component의 fetch() 와 async 사용

```jsx
export default async function Page() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })

  return <div>...</div>
}
```

### 7. 스타일링

- tailwind.config.js 파일에 `./app/**/*.{js,ts,jsx,tsx,mdx}` 해당 내용 추가
- 기존 pages 디렉토리에서는 글로벌 스타일이 pages/\_app.js 에만 한정되었지만, app 디렉토리에서는 레이아웃, 페이지, 컴포넌트에 모두 import 해서 적용 가능

<br />

---

## 참고

> - [Next.js 13 ](https://nextjs.org/blog/next-13)
> - [Next13의 주요 기능에 대해 알아보자.](https://d-dual.tistory.com/86)
> - [Next.js 13 변경사항](https://abangpa1ace.tistory.com/279)
> - [03) Next.js 페이지와 라우팅](https://wikidocs.net/197683#_11)
> - [[NextJS] Pages, Layouts](https://min-kyung.tistory.com/154)
> - [[NextJS 13] Routing - Error Handling(에러처리)](https://rocketengine.tistory.com/entry/NextJS-13-Routing-Error-Handling%EC%97%90%EB%9F%AC%EC%B2%98%EB%A6%AC)
