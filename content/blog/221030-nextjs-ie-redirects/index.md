---
title: 'IE11 브라우저에서 유저 리다이렉트 시키기 (feat. Next.js Redirects)'
date: '2022-10-30T11:45:32.169Z'
description: 'Next.js에서 IE 브라우저 리다이렉트를 시키기!'
category: 'React'
keywords: 'IE11, Next.js, Redirects'
image: 'https://velog.velcdn.com/images/khy226/post/23a9a3ba-791e-493a-b0c3-5b26e9da8390/image.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/23a9a3ba-791e-493a-b0c3-5b26e9da8390/image.jpeg" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

2022년 6월 15일 마이크로소프르는 27년만에 [인터넷 익스플로러(IE) 11 브라우저 버전 대부분에 대한 지원을 종료](https://learn.microsoft.com/ko-kr/lifecycle/announcements/internet-explorer-11-end-of-support)하겠다고 선언하였다. 아직 국내 관공서에서는 익스플로러를 많이 사용하고 있어 아쉬운 사람들도 있겠지만, 개발자의 입장에서는 매우 반가운 소식이었다. 익스플로러 브라우저에서만 적용되지 않는 javascript, css 등 크로스브라우징 이슈가 많아서 대응하기 가장 힘든 브라우저였는데, 공식 종료 선언이라니..! 😇

<br />

덕분에 회사에서도 익스플로러 대응을 하지 않기로 하였고, 인터넷 익스플로러(IE11)로 접속한 사용자들에게 경고 페이지를 띄워주는 수단이 필요했다. 처음에는 `getInitialProps`를 사용해서 IE 사용자들에게 static 페이지를 보여줘야 할지 고민이었는데, 해당 메서드를 사용하면 `_app.tsx` 등 다른 페이지에서 영향이 가기 때문에 익스플로러 접속 시 url을 경고 페이지로 리다이렉트 시킬 수 있는 방법을 리서치 하였다. 그 중에 잘 정리된 [Redirect IE11 users in NextJS](https://ruud.je/blog/redirect-ie11-nextjs/)글을 참고하였고, Next.js의 `rewrites`를 사용해 IE11 접속 유저들을 경고 페이지로 리다이렉트 시키는 방법을 적용하였다.

<br />

> 아래 글은 [Redirect IE11 users in NextJS](https://ruud.je/blog/redirect-ie11-nextjs/)글을 번역 & 정리한 글이다.

<br />

---

## NextJS의 Redirects

Next.js 버전 9.5부터는 `next.config.js`에서 `redirects`를 선언할 수 있다.

> 자세한 내용은 [공식 문서 - Redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) 참고

<br />

`redirects` 속성은 리디렉션 배열을 반환하는 비동기 함수를 받는다.

이 배열안에 있는 리디렉션에 따라 홈페이지에서 `/ie_warning.html`(public 폴더에서 제공되는 파일)로 이동되며, 서버가 302 HTTP 상태 코드를 반환한다는 의미인 'non-permanenet'로 설정된다. permanent가 true로 설정된 경우 301 상태 코드가 반환된다.

<br />

> 참고:
>
> - **HTTP 302**: `302 Found` 리다이렉트 상태 응답 코드는 클라이언트가 요청한 리소스가 [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) 헤더에 주어진 URL에 일시적으로 이동되었음을 가리킴 - [출처](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/302)
> - **HTTP 301**: `HTTP 301 Moved Permanently` 리다이렉트 상태 응답 코드는 요청한 리소스가 [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) 헤더에 주어진 URL로 완전히 옮겨졌다는 것을 나타냄 - [출처](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/301)

<br />

```jsx
module.exports = {
  redirects: async () => {
    return [
      {
        source: '/',
        permanent: false,
        destination: '/ie_warning.html',
      },
    ]
  },
}
```

NextJS를 다시 시작하면 홈 페이지에서 정적 파일로 리디렉션된다. 하지만 이럴 경우, 모든 브라우저에서 redirect가 일어날 것이므로 추가적인 설정이 필요하다.

<br />

## User-Agent 헤더 체크

그렇다면 IE11을 사용하는 사용자만 리디렉션하려면 어떻게 해야 할까?

<br />

Redirects의 `has` 속성을 이용하면 되는데, 요청(request)에 있어야 할 여러가지 '속성'들을 체크할 수 있다. 예를 들어 헤더, 쿠키 또는 쿼리 매개 변수 등이 있다.

이 중에서, 우리는 header의 `User-Agent`를 확인하면 된다. 모든 IE11 사용자 에이전트는 `user-agent`에 'Trident'라는 단어를 포함하므로 정규식 문자열을 사용하여 헤더에 해당 단어가 포함되어 있는지 확인하면 된다.

<br />

> 참고:
>
> - **User-Agent(사용자 에이전트)**: 사용자 에이전트(user agent)는 사용자를 대표하는 컴퓨터 프로그램으로, 웹 맥락에선 브라우저를 의미합니다. 브라우저는 서버에 보내는 모든 요청에 사용자 에이전트 문자열이라고 부르는, 자신의 정체를 알리는 [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) HTTP 헤더를 보냅니다. 이 문자열은 보통 브라우저 종류, 버전 번호, 호스트 운영체제를 포함합니다. - [출처](https://developer.mozilla.org/ko/docs/Glossary/User_agent)

<br />

```jsx
module.exports = {
  redirects: async () => {
    return [
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*Trident.*)',
          },
        ],
        permanent: false,
        destination: '/ie_warning.html',
      },
    ]
  },
}
```

> 참고:
>
> - **왜 Trident인가?**: 트라이던트(Trident)는 MS의 IE에서 사용하고 있는 레이아웃 엔진의 이름이며, MSHTML이라고도 합니다. 그리고 이 엔진은 IE가 4.0 버전일 때부터 도입되어 현재까지 사용되고 있습니다. 그러므로 IE 브라우저를 구분해낼 수 있는 유일한 값이기도 합니다. (다른 브라우저에서는 트라이던트 엔진을 사용하지 않으니까요) - [출처](https://ooz.co.kr/67)

NextJS를 다시 시작하고 IE11의 브라우저로 홈페이지 접속을 해보자. 다른 브라우저는 리디렉션하지 않지만 IE11로 접속한 사용자는 `/ie_warning.html` 페이지로 리디렉션되는 것을 확인할 수 있다.

하지만 지금은 루트 홈페이지에서만('/' 경로) 실행되는데, 이 작업이 모든 페이지에서 실행되도록 하려면 다음 작업을 수행한다.

<br />

## 전체 사이트 Redirect 하기

모든 페이지에서 리디렉션을 하기 위해서는 아래와 같은 정규식과 문자열을 적용하면 된다.

<br />

```jsx
module.exports = {
  redirects: async () => {
    return [
      {
        source: '/:path((?!ie11_warning.html$).*)',
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '(.*Trident.*)',
          },
        ],
        permanent: false,
        destination: '/ie11_warning.html',
      },
    ]
  },
}
```

NextJS를 다시 시작하면 `/ie_warning.html`을 제외한 모든 페이지에서 리디렉션이 실행된다. 리디렉션 loop를 방지하려면 위와 같이 예외처리가 필요하다.

<br />

## 결론

위 글을 통해서 손쉽게 IE11 브라우저 대응을 할 수 있었다. Next.js의 redirect를 사용해서 특정 조건의 환경에서 원하는 페이지로 리다이렉트를 쉽게 시킬 수 있다는 것을 직접 작업하며 다시 한번 Next.js의 편리함을 느낄 수 있었다. 또한, IE11 브라우저는 user-agent값에 'Trident'가 들어있다는 사실을 처음 알게 되었는데, 해당 단어가 MS의 IE에서 사용하고 있는 레이아웃 엔진의 이름이라는 것도 흥미로웠다.

redirect 외에도 비슷하게 [rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites)를 사용해서 적용할 수도 있다. rewrites는 url는 변경하지 않고 페이지 내용만 변경할 수 있게 해주는 메서드이므로 필요에 따라 원하는 메서드를 적용하면 된다.

---

## 출처

> - [Redirect IE11 users in NextJS](https://ruud.je/blog/redirect-ie11-nextjs/)
