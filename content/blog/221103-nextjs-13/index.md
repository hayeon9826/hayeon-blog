---
title: 'Next.js 13 출시'
date: '2022-11-03T11:45:32.169Z'
description: 'Next.js 13이 드디어 출시되었다! 업데이트 된 내용을 알아보자.'
category: 'React'
keywords: 'Next.js 13'
image: 'https://velog.velcdn.com/images/khy226/post/487869e5-ec2b-42aa-8330-374809c19d3a/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/487869e5-ec2b-42aa-8330-374809c19d3a/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

> 해당 글은 [Next.js 13](https://nextjs.org/blog/next-13) 공식 블로그 글을 번역 & 정리한 내용입니다.

<br />

지난주 수요일 (22.10.25) [Next.js Conf](https://nextjs.org/conf) 에서 Next.js 13을 공식 발표했다. 가장 크게 변경된 feature은 아래와 같았다:

- **[`app`/Directory(beta)](https://nextjs.org/blog/next-13#app-directory-beta)**: 더 쉽고, 더 빠르고, 더 적은 client JS.
  - **[Layouts](https://nextjs.org/blog/next-13#layouts)**
  - **[React Server Components](https://nextjs.org/blog/next-13#server-components)**
  - **[Streaming](https://nextjs.org/blog/next-13#streaming)**
- **[Turbopack(alpha)](https://nextjs.org/blog/next-13#introducing-turbopack-alpha)**: Rust 기반 Webpack 대체제로, 속도가 최대 700배 빨라졌습니다.
- **[New next/image (stable)](https://nextjs.org/blog/next-13#nextimage)**: 네이티브 브라우저 lazy loading으로 더 빨라집니다.
- **[New @next/font (beta)](https://nextjs.org/blog/next-13#nextfont)**: 레이아웃 이동이 없는 자동 자체 호스트 글꼴이 추가되었습니다.
- **[Improved next/link](https://nextjs.org/blog/next-13#breaking-changes)**: 자동 `<a>` 태그로 API를 단순화했습니다.

<br />

다음을 실행하여 Next.js 13으로 업데이트 할 수 있다:

```javascript
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

---

## app/ Directory (beta)

Next.js의 가장 인기 있는 기능 중 하나는 '파일 시스템 라우터'이다. `pages` 폴더 안에 파일을 놓으면 추가적인 설정 없이도 경로를 즉시 만들 수 있다.

<br />

Next.js 13에서는 `app/ Directory (beta)`의 도입으로 Next.js의 라우팅 및 레이아웃 환경을 개선했다. 새 라우터는 다음을 지원한다:

- **Layout**: 상태를 보존하고 값비싼 재렌더를 피하면서 경로 간에 UI를 쉽게 공유합니다.
- **Server Components**: 가장 동적인 응용프로그램의 기본 서버 우선 설정.
- **Streaming**: 렌더링되는 즉시 로드 상태 및 스트림을 UI 단위로 표시합니다.
- **Support for Data Fetching**: 비동기 서버 구성 요소 및 확장 가져오기 API를 통해 구성 요소 수준 가져오기가 가능합니다.

<br />

Next.js 13으로 업그레이드할 때 반드시 `app/` 파일 구조를 사용할 필요는 없다. 기존 `pages`기반 구조와 같이 사용하면서 점진적으로 적용할 수 있다.

![](https://velog.velcdn.com/images/khy226/post/582b4927-bcc4-4231-adf2-7adc48a8743a/image.png)

<small>`app/` 파일 구조는 기존 `pages`파일 구조에서 점진적으로 채택할 수 있습니다.</small>

<br />

---

### Layouts

`app/` 파일 구조를 적용하면 navigation에서 사용되는 복잡한 상태를 더 쉽게 관리할 수 있고, re-render를 줄일 수 있으며, 더욱 나아진 라우팅 패턴을 적용할 수 있다. 또한, 레이아웃을 중첩하거나 라우트, 컴포넌트, 테스트 및 스타일과 함께 앱 코드를 배치할 수 있다.

<br />

![](https://velog.velcdn.com/images/khy226/post/ef6be1de-f385-47ea-a539-a22ab14e5956/image.png)

<br />

`app/` 안에 라우팅을 적용하려면 `page.js` 라는 파일이 필요하다:

```javascript
// app/page.js
// 해당 파일은 index 라우트와 매핑된다 (/)
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

<br />

그 다음, 파일 시스템으로 **레이아웃을 정의**할 수 있다. 여러가지 페이지들이 동일한 UI를 공유할 때 레이아웃 기능을 사용하면 좋다. 예를 들어, 네비게이션에 레이아웃을 적용하면 state를 유지하면서 상호작용을 하고, re-rendering을 발생시키지 않는다.

```javascript
// app/blog/layout.js
export default function BlogLayout({ children }) {
  return <section>{children}</section>
}
```

레이아웃 및 pages와 관련된 더 자세한 내용은 [해당 링크](https://beta.nextjs.org/docs/routing/fundamentals)에서 볼 수 있다.

<br />

---

### React Server Components

`app/` 파일 구조는 React의 새로운 Server Components 아키텍처를 지원한다. [Server & Client Components](https://beta.nextjs.org/docs/rendering/server-and-client-components)는 각각 서버와 클라이언트의 장점을 극대화 시키는데, 이를 통해 더 빠른 빌드와 인터렉티브한 앱, 그리고 더 나은 개발 환경을 제공한다.

Server Components를 사용하면 **클라이언트에 전송되는 JavaScript의 양을 줄이면서** 복잡한 인터페이스를 구축할 수 있는 기반을 마련하여, 초기 페이지 로드를 더 빠르게 수행할 수 있다.

route가 로드되면 캐싱이 가능하고 크기를 예측할 수 있는 Next.js와 React의 런타임이 로드된다. 이 런타임은 응용프로그램이 커지더라도 크기가 증가하지 않는다. 또한 런타임은 비동기적으로 로드되어 서버에 있던 HTML이 클라이언트에서 점진적으로 향상될 수 있게 한다.

<br />

Server Components에 대해 자세히 알아보려면 [해당 링크](https://beta.nextjs.org/docs/rendering/server-and-client-components) 참고하면 된다.

---

### Streaming

`app/` 파일 구조는 렌더링된 단위 별 UI를 클라이언트에 점진적으로 렌더링하고 스트리밍할 수 있는 기능을 제공한다.

Server Components 및 Next.js의 중첩 레이아웃을 사용하면, 데이터가 특별히 필요하지 않은 페이지의 일부를 즉시 렌더링하고 데이터를 가져오는(fetching) 페이지의 일부에 대한 로드 상태를 표시할 수 있다. 이 방식을 사용하면 사용자는 페이지와 상호 작용을 시작하기 전에 전체 페이지가 로드되기를 기다릴 필요가 없다.

<br />

![](https://velog.velcdn.com/images/khy226/post/cabbf6d6-a7ce-4772-b272-a2ddd993de51/image.png)

<br />

Vercel에 배포될 때 `app/`구조를 사용하는 Next.js 13 애플리케이션은 기본적으로 Node.js와 Edge 런타임 모두에서 응답을 스트리밍하여 성능을 향상시킨다.

<br />

스트리밍에 대해 자세히 알아보려면 [해당 링크](https://beta.nextjs.org/docs/data-fetching/fundamentals)를 확인하면 된다.

<br />

### Data Fetching

React와 Next.js에서도 `fetch` Web API를 사용할 수 있게 되었다. 자동으로 데이터 요청의 중복을 제거하며 컴포넌트 수준에서 데이터를 가져오기, 캐시 및 재검증할 수 있는 유연한 방법을 제공한다. 즉, Static Site Generation (SSG), Server-Side Rendering (SSR), 그리고 Incremental Static Regeneration (ISR)의 모든 이점을 하나의 API를 통해 사용할 수 있다.

```javascript
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

---

## Turbopack (alpha)

Next.js 13에는 Webpack의 새로운 Rust 기반 후속 제품인 [Turbopack](https://vercel.com/blog/turbopack)이 포함되어 있다.

웹팩은 **30억 번** 이상 다운로드 되었다. 웹 구축에 필수적인 요소였지만, JavaScript 기반 툴링으로 가능한 최대 성능의 한계에 도달했다.

<br />

Next.js 12에서는 Native Rust-power Tooling으로 전환하기 시작했다. Babel에서 마이그레이션 하는 것으로 시작했는데, 그 결과 17배 더 빠른 트렌스파일링이 가능했다. 그런 다음 Terser를 교체하여 6배 더 빠른 minification이 가능해졌다.

<br />

Next.js 13과 함께 Turbopack alpha를 사용하면 다음과 같은 결과를 얻을 수 있다:

- Webpack 보다 **700배 빠른** 업데이트
- Vite 보다 **10배 빠른** 업데이트
- Webpack 보다 **4배 빠른** cold start

<br />

![](https://velog.velcdn.com/images/khy226/post/48a08c15-fcab-4d99-aa8b-40ffbb4adea8/image.png)

<br />

Turbopack은 개발에 필요한 최소한의 asset만 번들링하므로 시작 시간이 매우 빠르다. Turbopack은 3,000개의 모듈이 있는 애플리케이션을 부팅하는 데 1.8초가 걸린다. Vite는 11.4초, Webpack은 16.5초가 걸린다.

Turbopack은 Server Component, 타입스크립트, JSX, CSS 등을 즉시 지원한다.

<br />

> 참고: Next.js의 Turbopack은 현재 `next dev`만 지원한다. [자세한 기능은 해당 글 참고](https://turbo.build/pack/docs/features). 또한, Turbopack을 통해 `next dev`이 가능하도록 작업중에 있다.

<br />

Next.js 13에서 Turpopack alpha를 사용하려면 `next dev --turbo`를 실행하면 된다.

---

## New next/image (stable)

Next.js 13은 레이아웃 변경 없이 이미지를 쉽게 표시하고, on-demand 방식으로 파일을 최적화하여 성능을 향상시킬 수 있는 강력한 `next/image` 컴포넌트를 제공한다.

<br />

새로운 `next/image` 컴포넌트는 아래와 같은 기능을 제공한다:

- 클라이언트 측 JavaScript가 적게 제공됨
- 스타일링 및 구성이 용이함
- 기본적으로 alt 태그를 내장하여 접근성을 향상시킴
- 웹 플랫폼에 맞게 조정
- hydration이 lazy-loading의 필수 요소가 아니어서 더 빠르다

<br />

```javascript
import Image from 'next/image'
import avatar from './lee.png'

function Home() {
  // "alt" is now required for improved accessibility
  // optional: image files can be colocated inside the app/ directory
  return <Image alt="leeerob" src={avatar} placeholder="blur" />
}
```

<br />

[해당 링크](https://nextjs.org/docs/basic-features/image-optimization)에서 Image 컴포넌트에 대해 더 자세히 알아볼 수 있다.

<br />

#### 업그레이드 방법)

기존의 오래된 `next/image`는 `next/legacy/image`로 이름이 변경되었다. 아래와 같이 명령어를 치면 기존의 `next/image`가 `next/legacy/image`로 업데이트 된다.

```javasript
npx @next/codemod next-image-to-legacy-image ./pages
```

<br />

---

## New @next/font (beta)

Next.js 13은 다음과 같은 새로운 폰드 시스템을 도입한다:

- 커스텀 폰트를 포함하여 모든 폰트를 자동으로 최적화
- 개인 정보 보호 및 성능 향상을 위한 외부 네트워크 요청 제거
- 모든 폰트 파일에 대한 자동 self-hosting 내장
- CSS의 [`size-adjust`](https://web.dev/css-size-adjust/) 속성을 자동으로 적용

<br />

이 새로운 폰트 시스템을 통해 성능 개선과 개인 정보를 보호하며 모든 Google 폰트를 편리하게 사용할 수 있다. CSS 및 폰트 파일은 빌드 시간에 다운로드되고 나머지 정적 asset과 함께 self-hosting 된다. **브라우저에서 Google로 요청을 전송하지 않는다.**

```javascript
import { Inter } from '@next/font/google';

const inter = Inter();

<html className={inter.className}>
```

<br />

커스텀 폰트도 자동 self-hosting, 캐싱, pre-loading 기능과 함께 제공된다.

```javascript
import localFont from '@next/font/local';

const myFont = localFont({ src: './my-font.woff2' });

<html className={myFont.className}>
```

<br />

[해당 링크](https://nextjs.org/docs/basic-features/font-optimization)에서 새로운 Font 컴포넌트를 더 자세히 볼 수 있다.

<br />

---

## Improved next/link

새로운 `next/link`에서는 더 이상 수동으로`<a>`를 하위 항목으로 추가할 필요가 없다.

이 옵션은 [12.2](https://nextjs.org/blog/next-12-2)에서 실험 옵션으로 추가되었으며 현재 기본값으로 제공된다. Next.js 13에서 `<Link>`는 항상 `<a>`를 렌더링하며 기본 태그로 props를 전달할 수 있습니다. 예시:

```javascript
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

[해당 링크](https://nextjs.org/docs/api-reference/next/link)에서 새로운 Link 컴포넌트를 확인할 수 있다.

<br />

#### 업데이트 방법)

아래 명령어를 통해 새로운 next/link로 업데이트 할 수 있다.

```javascript
npx @next/codemod new-link ./pages
```

---

## 마무리하며

- Next.js 13에서 개선된 기능이 많이 추가가 되었다. 특히 700배 빨라진 Turbopack과 Layout기능, 그리고 구글 폰트를 바로 적용할 수 있는 next/font가 특히 유용해 보인다. 기존 Next.js 12 파일 구조를 유지하면서 점진적으로 도입이 가능하다고 하니까 천천히 적용해봐야겠다.
- Next.js Conf 신청해놓고..새벽이라 까먹고 놓쳤다 🥲 그래도 블로그에 섬세하게 정리가 되어서 다행이다.
- 회사에도 빨리 도입이 되면 좋겠지만, 파일 시스템을 전체적으로 고쳐야하는게 가장 큰 복병인 것 같다.
- 점진적으로 업그레이드가 가능하다고 하니까 토이 프로젝트에서라도 Next.js 13을 적용해봐야겠다.

<br />

---

## 출처:

> - [[공식 도큐] Next.js 13](https://nextjs.org/blog/next-13)
