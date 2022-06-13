---
title: Next.js Router 정리
date: '2022-02-18T22:45:32.169Z'
description: Next.js 라우터 사용시 정확한 정의를 모르고 사용하는 부분이 많은 것 같아 자주 사용하는 메서드를 정리해보았습니다.
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/fabead09-b8b2-4569-9f97-2e0d0b368ec3/next.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/fabead09-b8b2-4569-9f97-2e0d0b368ec3/next.png" style="padding-bottom: 50px;">

## Next.js Router 정리

Next.js 라우터 사용시 정확한 정의를 모르고 사용하는 부분이 많은 것 같아 자주 사용하는 메서드를 정리해보았습니다.
또한, next.js에서 왜 `<Link>` 태그를 사용하는지에 대해서도 정리해보았습니다.

<hr />


### Next/Router

Next.js에서 라우터를 사용하려면 `useRouter` 훅을 사용해서 `router` 객체에 접근할 수 있습니다. 아래 예시를 보겠습니다.

(참고로, `useRouter` 는 리액트 훅 이므로 클래스 내부에서 사용 불가합니다.)

```jsx
import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink
```

라우터에서 자주 사용하는 메서드입니다: `router.push`, `router.replace`, `router.prefetch`, `router.beforePopState`, `router.back`, `router.reload`, `router.events`.

이중에서 가장 헷갈렸던 router.push, router.replace의 차이점과 자주 사용하는 router.back 정도만 정리해보겠습니다. 자세한 설명은 공식 도큐 [next/router | Next.js](https://nextjs.org/docs/api-reference/next/router) 참고 부탁드립니다.

### router.push

client-side 전환을 할 수 있도록 도와주고 Next/link 대신 사용할 수 있습니다.

router.push는 라우터 히스토리 스택에 새로운 url을 쌓아줍니다. 예를 들어 home > login > item 순으로 페이지를 이동했을 때, router.push를 사용해 'mypage'로 이동한다면 라우터 히스토리 스택에는 home > login > item > mypage가 쌓입니다. 마지막 페이지에서 뒤로가기를 누르면 'item' 페이지로 되돌갑니다.

#### 사용법:

```jsx
router.push(url, as, options)
```

- url: [필수] 라우팅 하려는 url
- as: [선택] 브라우저 url 바에 보여지는 path
- options: [선택] ]scroll(라우팅 후 스크롤업), shallow, locale 등의 옵션이 있습니다.

주의: `router.push`는 외부 url 사용시에는 적합하지 않습니다. a tag의 target="\_blank" 를 사용하거나 window.location을 사용하는 것이 낫습니다.

#### 예시:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/about')}>
      Click me
    </button>
  )
}
```

### router.replace

router.push와 비슷하게 동작하지만, 라우터 히스토리 스택에 새로운 url을 추가하지 않습니다. 대신 기존에 있던 현재 페이지 route를 새로운 url로 대체합니다.

예를 들어, home > login > item 순으로 페이지를 이동했을 때, router.replace를 사용해 'mypage'로 이동한다면 라우터 히스토리 스택에는 현재 페이지인 item이 mypage로 대체됩니다. 즉, home > login > mypage가 쌓입니다. 마지막 페이지에서 뒤로가기를 누르면 'login' 페이지로 되돌아갑니다.

#### 사용법 (router.push와 동일):

```jsx
router.replace(url, as, options)
```

#### 예시:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.replace('/home')}>
      Click me
    </button>
  )
}
```

### router.push vs router.replace 정리

정리하자면, `router.push`는 라우터의 history 스택 제일 위에 새로운 url을 쌓는 것이고, `router.replace`는 스택 제일 위에 있는 원소를 새로운 url로 바꾸는 것 입니다.

- 이전의 라우팅 히스토리를 모두 유지하고 싶다면 `router.push` 를 사용하면 됩니다.
- 만약 현재 라우팅 히스토리를 다른 url로 변경하고 싶다면 (예: 로그인 후 마이페이지 이동했을 때. back 버튼 누르면 다시 로그인 페이지로 가지 않기 위해 로그인 url을 history에서 제거) `router.replace`를 사용하면 됩니다.

### router.back

히스토리에서 전단계로 이동합니다. 브라우저의 'back'버튼을 누르는 것과 동일하게 동작합니다.

`window.history.back()`와 같이 동작합니다.

```javascript
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
  )
}
```

---

### Next/Link

Next.js에서는 a tag 대신, `<Link>` 컴포넌트를 사용해 a tag를 감싸줍니다. `<Link>`를 사용하면 클라이언트 사이드 네비게이션(client-side navigation)을 할 수 있도록 도와줍니다.

```jsx
import Link from 'next/link'

;<h1 className="title">
  Read{' '}
  <Link href="/posts/first-post">
    <a>this page!</a>
  </Link>
</h1>
```

### Client-side navigation?

Client-side navigation 이란 페이지 전환이 javascript로 이루어지는 것 입니다. 브라우저의 기본 navigation보다 훨씬 빠르게 작동하며, 리액트의 SPA(Single Page Application) 특성을 유지하며 페이지 전환을 할 수 있습니다.

아래 예시에서 보듯이, 페이지 전환을 해도 개발자 도구에서 추가한 style 속성이 새로고침 되지 않습니다. 즉, next.js의 `<Link>`를 사용하면 전체 페이지를 로드하지 않고, client-side navigation으로 작동합니다.

![clientside navigation](https://nextjs.org/static/images/learn/navigate-between-pages/client-side.gif)

만약 `<Link>` 대신 `<a href="..">` 태그를 사용하면, 브라우저가 전체 새로고침을 하기 때문에 링크를 클릭하면 배경화면 색깔이 흰색으로 리셋됩니다.

### Code splitting & Prefetching

React를 빌드/배포하면 기본적으로 모든 js, css 파일이 하나의 파일로 번들링되며 하나의 큰 파일이 됩니다. 따로 webpack 설정을 해주지 않는다면, 특정 페이지에 필요없는 다른 파일들까지 번들링 되기 때문에 파일이 커지면 성능에 문제가 될 수도 있습니다. 또한, 한 줄의 js 코드만 수정해도 모든 JS코드를 새로 빌드해야하기 때문에 비효율적입니다. 따라서, 파일을 분리하는 작업인 '코드 스플리팅'을 하는 것이 효율적입니다.

> 예를 들어 페이지가 /main, /about, /post 이렇게 세 가지 페이지로 이루어진 SPA를 개발한다고 할 때 /main 페이지를 들어가는 동안 /about이나 /post 페이지 정보는 사용자에게 필요하지 않을 확률이 높다. 그러한 파일들을 분리하여 지금 사용자에게 필요한 파일만 불러올 수가 있다면 로딩도 빠르게 이루어지고 트래픽도 줄어 사용자 경험이 좋아질 수가 있다. 이와 같이 더 나은 사용자 경험을 위해 코드를 비동기적으로 로딩하는 방법이 있는데 코드 비동기 로딩의 대표적인 예시가 바로 코드 스플리팅이다. 출처: [[React] 코드 스플리팅(Code Splitting) — 오웬의 개발 이야기](https://devowen.com/342)

- 다행히도, Next.js는 자동으로 코드 스플리팅을 해주므로 각 페이지에 필요한 항목만 로드합니다. 즉, 메인 페이지를 렌더링 하면, 다른 페이지의 코드는 처음에 제공되지 않습니다. 덕분에 수백개의 페이지가 있어도 원하는 페이지 (ex. 메인 페이지) 로드를 빠르게 할 수 있습니다.

- 요청한 페이지만 로드되므로 다른 페이지들과 분리됩니다. 따라서 특정 페이지에 오류가 발생해도 나머지 애플리케이션을 정상적으로 작동합니다.

- 또한 'Next.js'의 프로덕션 빌드에서 `<Link>` 요소가 브라우저의 뷰포트에 나타날 때마다, Next.js는 백그라운드에서 연결된 페이지의 코드를 자동으로 prefetch 합니다. 링크를 클릭할 때 해당 링크와 연결된 페이지의 코드가 이미 백그라운드에 로드되어 있어, 페이지 전환이 즉시 이루어집니다.

---

### 출처:

> - [Link Component - Navigate Between Pages | Learn Next.js](https://nextjs.org/learn/basics/navigate-between-pages/link-component)
> - [Client-Side Navigation - Navigate Between Pages | Learn Next.js](https://nextjs.org/learn/basics/navigate-between-pages/client-side)
> - [next/router | Next.js](https://nextjs.org/docs/api-reference/next/router)
> - [[React] 코드 스플리팅(Code Splitting) — 오웬의 개발 이야기](https://devowen.com/342)
> - [React Router History : push와 replace의 차이점](https://velog.io/@gwak2837/React-Router-History-push%EC%99%80-replace%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)
