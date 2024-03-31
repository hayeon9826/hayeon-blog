---
title: '[Next.js] dev 모드에서 잦은 리로딩 방지하기 (feat. next.config.js)'
date: '2022-11-12T11:45:32.169Z'
description: 'next.config.js에서 onDemandEntries로 리로딩을 방지할 수 있다!'
category: 'React'
keywords: 'next.js, onDemandEntries, next.config.js'
image: 'https://velog.velcdn.com/images/khy226/post/11147acc-5ece-4b5e-afbb-25212312eff2/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/11147acc-5ece-4b5e-afbb-25212312eff2/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

프로젝트를 하던 중, **dev 모드에서 계속 페이지가 자동으로 리로드 되는 현상**이 있었다. 관련해서 문서를 찾아보니, next.js 개발 모드에서는 일정 시간동안 페이지에 접속하지 않으면 Webpack 컴파일에서 제거가 된다고 한다. ([관련 내용](https://github.com/vercel/next.js/issues/3743)) 그리고 버퍼에 유지될 수 있는 페이지들이 next.config.js에 기본적으로 제한이 되어있다.

## next.config.js에서 onDemandEntries 설정하기

[공식 도큐](https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries)에 따르면 Next.js는 개발 중에 빌드된 페이지를 메모리에서 정리하거나 보관할 수 있는 몇 가지 옵션을 제공한다.

<br />

> Next.js exposes some options that give you some **control over how the server will dispose or keep in memory built pages** in development.
>
> To change the defaults, open next.config.js and add the **onDemandEntries** config:

<br />

기본값을 변경하려면 next.config.js에 있는 `onDemandEntries` 옵션을 추가해야 한다. 기본 설정은 아래와 같이 되어있고, 필수 옵션이 아니므로 꼭 추가하지 않아도 된다. 물론 next.config.js 내용은 개발 모드에서만 적용된다.

```jsx
module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}
```

<br />

위 내용을 아래와 같이 변경을 해주었더니 개발중에 페이지가 리로드되는 현상이 해결되었다. maxInactiveAge는 한시간으로 늘려주었고, pagesBufferLength는 20으로 설정했다.

```jsx
const MS_PER_SECOND = 1000
const SECONDS_PER_HOUR = 3600
const PAGES_BUFFER_LENGTH = 20

module.exports = {
  onDemandEntries: {
    maxInactiveAge: SECONDS_PER_HOUR * MS_PER_SECOND,
    pagesBufferLength: PAGES_BUFFER_LENGTH,
  },
}
```

<br />

---

## (추가) next.config.js란?

관련 문제를 해결하면서 next.config.js 도큐를 다시 한번 읽어보았다. 처음 세팅을 할 때는 사실 별 고민을 하지 않고 default 값으로 세팅하여 사용하였는데, 유용한 설정 옵션들이 많이 있었다.

<br />

우선, `next.config.js`는 JSON 파일이 아닌, **Node.js 모듈**이다. next.config.js는 파일명에서도 알 수 있듯 Next.js 프로젝트에서 추가적인 설정을 할 수 있도록 하는 Node.js 모듈이며, 프로젝트 루트에 생성해서 사용하면 된다. (`package.json` 옆에 위치) 해당 파일은 Next.js의 서버 및 빌드 단계에서 사용되며, **브라우저 빌드에서는 포함되지 않는다.**

<br />

기본적으로 아래와 같이 next config를 설정할 수 잇으며, module.export로 export하여 사용할 수 있다.

```jsx
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}

module.exports = nextConfig
```

<br />

이 외에도 아래와 같이 여러 상황에 따른 적용방법이 있다:

```jsx
// 1. ECMAScript 모듈의 경우 next.config.mjs 파일 생성하여 아래와 같이 작성:
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}

export default nextConfig

// 2. 함수형으로 사용하는 경우:
module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return nextConfig
}

// 3. Next.js 12.1.0 이상에서는 아래와 같이 async 함수로 사용할 수 있음:
module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return nextConfig
}

// 4. next/constants의 phase를 참고하여 원하는 단계(phase)에만 적용할 수 있음
// 사용 가능한 phase 참고: https://github.com/vercel/next.js/blob/5e6b008b561caf2710ab7be63320a3d549474a5b/packages/next/shared/lib/constants.ts#L19-L23
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    }
  }

  return {
    /* config options for all phases except development here */
  }
}
```

<br />

Next.config.js의 설정은 모두 '옵션'이고 필수가 아니다. 따라서 필요한 설정만 찾아서 변경을 하는 것을 추천한다고 한다. 전체 옵션은 [해당 파일](https://github.com/vercel/next.js/blob/canary/packages/next/server/config-shared.ts#L158)에서 확인할 수 있으나, 모든 옵션을 볼 필요는 없고 필요한 feature들만 검색해서 변경하면 된다. Next.js 공식 도큐 (https://nextjs.org/docs/api-reference/next.config.js/introduction) 에서 해당 내용들을 확인할 수 있다.

<br />

아래는 자주 사용하는 다섯가지 next.config.js 옵션들이다.

<br />

---

### Environment Variables

next.config.js 파일의 `env`옵션에 환경 변수를 추가하여 사용할 수 있다.

```jsx
module.exports = {
  env: {
    customKey: 'my-value',
  },
}
```

위와 같이 추가함 경우, 코드에서 바로 `process.env.customKey` 형식으로 환경 변수에 접근할 수 있다.

```jsx
function Page() {
  return <h1>The value of customKey is: {process.env.customKey}</h1>
}

export default Page
```

이렇게 설정을 해주면, Next.js는 빌드 시간에 `process.env.customKey`를 `my-value`라는 값으로 대체한다. 따라서, 빌드를 한 후 아래와 같이 나타난다:

```jsx
return <h1>The value of customKey is: {'my-value'}</h1>
```

<br />

### Base Path

만약 Next.js 프로젝트를 서브도메인 혹은 서브 path로 배포하고 싶다면 `basePath` 옵션을 설정할 수 있다. 기본적으로 base path는 `/` 루트 path로 설정되어 있는데, 해당 옵션을 추가하여 내가 원하는 도메인을 루트 도메인으로 변경할 수 있다. (예를 들어 `/docs`라는 basePath를 설정하면, 모든 페이지들이 `/docs`라는 경로 아래에 추가된다.

```jsx
module.exports = {
  basePath: '/docs',
}
```

(\*참고: 해당 설정은 빌드 타임에 세팅 되므로 값을 변경하고 싶다면 꼭 re-building 단계를 거쳐야한다.)

<br />

위와 같이 basePath를 설정하면 `next/link` 와 `next/router`의 기본 루트 경로도 해당 basePath로 기본 설정이 된다. 예를 들어 `<Link href="/about">` 라는 next/link 태그를 사용하면, 해당 링크는 `/about`가 아닌 `/docs/about` 경로로 적용된다.

```jsx
export default function HomePage() {
  return (
    <>
      <Link href="/about">About Page</Link>
    </>
  )
}
```

위 코드의 결과 html:

```html
<a href="/docs/about">About Page</a>
```

<br />

### Redirects

Redirects의 경우 [IE11 브라우저에서 유저 리다이렉트 시키기 (feat. Next.js Redirects)](https://hayeon-blog.vercel.app/221030-nextjs-ie-redirects/)에서 잠깐 다뤘던 내용이다. Redirect 설정을 통해 특정 요청 경로를 원하는 경로로 리다이렉트 시킬 수 있다. 이때는 리다이렉트 되는 것 이기 때문에, 페이지 내용과 함께 url도 바뀐다.

<br />

```jsx
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
```

위 코드의 경우, 사용자가 `/about`경로에 접근하면 바로 `/` 루트 페이지로 리다이렉트 시켜버린다. 추가적으로 넣을 수 있는 옵션은 source, destination, permanent가 있다.

- `source`: 사용자가 접근하는 요청 경로 패턴
- `destination`: `source`에 맞는 패턴 경로로 들어온 사용자들을 라우팅(리다이렉트)할 경로
- `permanent` (true / false): true이면 클라이언트/검색 엔진에 리디렉션을 영구적으로 캐시하도록 지시하는 `308` 상태 코드를 사용하고, false이면 `307` 임시 상태 코드를 사용해 캐시되지 않도록 함

<br />

### Rewrites

Rewrites는 Redirect와 매우 유사하다. 다만, Rewrites의 경우 url을 바꾸지 않고, 페이지 내용만 다른 경로의 페이지로 매핑해서 보여준다. 즉, redirect는 페이지 내용과 url이 모두 바뀌지만, rewrites는 url은 유지된 채 페이지 내용만 변경되는 것이 차이점이다. 사용방법은 아래와 같다.

```jsx
module.exports = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ]
  },
}
```

[공식 도큐](https://nextjs.org/docs/api-reference/next.config.js/rewrites)를 참고하면 추가적인 options와 활용사례를 확인할 수 있다.

<br />

### Custom Webpack Config

next.config.js 파일에서 커스텀 Wepack 설정을 할 수도 있다. (단, 예외 사항이 있으니 자세한 내용은 [Next,js 공식 문서: Custom Webpack Config](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config)를 참고하면 된다.)

```jsx
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Important: return the modified config
    return config
  },
}
```

webpack 함수에 대한 두 번째 인수 객체는 다음과 같다:

- `buildId`(String): 빌드 간의 고유 식별자로 사용되는 빌드 ID
- `dev`(Boolean): 컴파일을 개발 중에 수행할지 여부를 나타내는 필드
- `isServer`(Boolean): 서버 측 컴파일의 경우 true이고, 클라이언트 측 컴파일은 false로 적용
- `nextRuntime`(String | undefined): 서버 컴파일의 target 런타임. "edge" 또는 "nodejs"로 적용하고, 클라이언트 컴파일은 "undefined"로 적용
- `defaultLoaders`(Object): Next.js에서 내부적으로 사용하는 기본 로더
  - `babel`(Object): 기본 babel-loader 구성

<br />

---

### 참고

- [Next.js: Configuring onDemandEntries](https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries)
- https://github.com/vercel/next.js/issues/29184
- https://github.com/vercel/next.js/issues/3743
- [Next.js: next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)
