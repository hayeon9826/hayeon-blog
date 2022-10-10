---
title: SSR에서는 UseLayoutEffect 대신 useEffect를 사용하자!
date: '2022-10-09T11:45:32.169Z'
description: 'Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded...'
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/b8f38c4f-b698-4a04-9f76-608cd7fda15b/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/b8f38c4f-b698-4a04-9f76-608cd7fda15b/image.png" style="padding-bottom: 50px;"/>

ssr에서 useLayoutEffect를 사용하던 도중, 아래와 같은 에러가 발생했다.

> Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.

직역하자면 아래와 같다:

**"`useLayoutEffect`는 서버 렌더러의 아웃풋으로 인코딩할 수 없으므로, 서버에서 아무 작업도 수행하지 못한다. 이로 인해 초기 hydration이 적용되지 않는 UI와 의도했던 UI가 일치하지 않게 된다. 따라서, 이 문제를 방지하려면 '클라이언트'에서 렌더링하는 컴포넌트에서만 `useLayoutEffect`를 사용해야 한다."**

기본적으로 SSR에서는 자바스크립트가 로드되기 전까지 useLayoutEffect와 useEffect를 사용할 수 없다. 따라서 Next.js와 같은 SSR 환경에서 useLayoutEffect를 사용하면 위와 같은 경고 문구가 발생한다.

그렇다면 왜 useEffect에서는 해당 warning이 발생하지 않고, useLayoutEffect에서만 발생하는걸까? 두 개념의 차이점을 확인해보자.

## useLayoutEffect vs useEffect

## 왜 SSR에서는 useLayoutEffect 경고 문구가 뜨는가?

## 해결책: useIsomorphicLayoutEffect()

## 참고

> - [SSR에서 useLayoutEffect 사용하기](https://brunch.co.kr/@devapril/47)
> - [useIsomorphicLayoutEffect() - usehooks ts](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect)
> - [useLayoutEffect 훅에 대하여](https://merrily-code.tistory.com/46)
> - [useLayoutEffect - React 공식도큐](https://ko.reactjs.org/docs/hooks-reference.html#uselayouteffect)
> - [useLayoutEffect and server rendering](https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85)
