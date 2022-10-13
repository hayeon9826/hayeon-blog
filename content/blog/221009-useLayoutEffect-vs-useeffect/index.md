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

"`useLayoutEffect`는 서버 렌더러의 아웃풋으로 인코딩할 수 없으므로, 서버에서 아무 작업도 수행하지 못한다. 이로 인해 초기 hydration이 적용되지 않는 UI와 의도했던 UI가 일치하지 않게 된다. 따라서, 이 문제를 방지하려면 **'클라이언트'에서 렌더링하는 컴포넌트에서만 `useLayoutEffect`를 사용**해야 한다."

<br/>

기본적으로 SSR에서는 자바스크립트가 로드되기 전까지 useLayoutEffect와 useEffect를 사용할 수 없다. 따라서 Next.js와 같은 SSR 환경에서 useLayoutEffect를 사용하면 위와 같은 경고 문구가 발생한다.

그렇다면, 우선 useEffect와 useLayoutEffect의 차이점은 무엇인지 확인해보자.

<br/>

## useLayoutEffect vs useEffect

<img src="https://velog.velcdn.com/images/khy226/post/95d77133-c054-4935-aa16-70c80b217d45/image.png" style="width: 60%" />

> 사진 출처: [hook-flow (Github)](https://github.com/donavon/hook-flow)

<br/>

### useEffect

```jsx
useEffect(() => {
  effect
  return () => {
    cleanup
  }
}, [dependencies])
```

- `useEffect`는 렌더링 이후에 실행되는 함수이다.
- DOM의 레이아웃 렌더(render)와 페인트(paint)가 끝난 후에야 호출되는 이펙트 함수이다.
- **렌더(render) -> 페인트(paint) -> `useEffect`** 순으로 실행된다.
- 따라서, DOM이 그려진 후에 다시 이펙트 내부의 함수들이 실행되며 리렌더링(re-renderig)이 실행된다.
- 에펙트 함수와 DOM 화면이 복잡해지면 렌더링 시간이 복잡해지거나, 상태값이 이펙트에 의존할 경우 화면이 깜박이는 현상을 겪을 수 있어 사용성을 해칠 수 있다.

<br/>

### useLayoutEffect

```jsx
useLayoutEffect(() => {
  effect
  return () => {
    cleanup
  }
}, [dependencies])
```

- `useLayoutEffect`는 위에 설명한 `useEffect`의 문제를 해결하기 위해서 등장한 훅이다.
- `useEffect`와 `useLayoutEffect` 훅의 형태는 완전히 동일하다
- 다른점은, 브라우저가 화면을 DOM에 그리기(paint) 전에 `useLayoutEffect`를 실행한다는 것이다.
- 따라서 **렌더(render) -> `useLayoutEffect` -> 페인트(paint)** 순으로 실행된다
- DOM의 페인트(paint) 단계 이전에 실행되기 때문에, `useLayoutEffect`는 DOM을 조작하는 코드가 있어도 깜빡이는 현상을 내지 않는다. 따라서 더욱 자연스러운 사용자 경험을 제공한다.

<br/>

### 예시)

- 아래와 같이 useEffect와 useLayoutEffect를 보여주는 코드가 있다. 해당 화면을 새로고침하면 희미하게 차이가 느껴진다.

```jsx
import { useEffect, useLayoutEffect, useState } from 'react'

function App() {
  const [effect, setEffect] = useState('')
  const [layoutEffect, setLayoutEffect] = useState('')

  useEffect(() => {
    setEffect('useEffect')
  }, [])

  useLayoutEffect(() => {
    setLayoutEffect('useLayoutEffect')
  }, [])

  return (
    <>
      <div>
        이것은 <span className="text-primary">{effect}</span> 입니다.
      </div>
      <div>
        이것은 <span className="text-primary">{layoutEffect}</span> 입니다.
      </div>
    </>
  )
}

export default App
```

<img src="https://velog.velcdn.com/images/khy226/post/fc53e73d-efe9-405b-bcd1-b0e8027a0e78/image.gif" style="width: 50%" />
<br />

1. `useEffect`의 경우에는 `이것은 '' 입니다.` 를 먼저 페인트를 한다.
2. 이후, 이펙트 내부의 `setEffect`를 호출하게 된다.
3. 이때, 리렌더링이 수행되며 `이것은 useEffect 입니다.`가 화면에 보여진다.

<br />

반면, `useLayoutEffect`는 다른 순서로 코드가 실행된다.

1. `useLayoutEffect` 이펙트 내부의 `setLayoutEffect`가 먼저 수행된다.
2. `이것은 useLayoutEffect 입니다.`가 페인트 되며 화면에 보여진다.

<br/>

## 왜 SSR에서는 useLayoutEffect 경고 문구가 뜨는가?

리액트 도큐먼트에 보면 `useLayoutEffect`에 대해서 아래와 같이 서술한다.

> The signature is identical to useEffect, but it fires synchronously after all DOM mutations.

`useLayoutEffect`는 useEffect와 달리, 모든 DOM 효과들이 실행된 이후에 **동기적**으로 실행되고, 작업이 완료되면 브라우저 페인팅이 시작된다. 또한, `useLayouteffect는`는 특히 리액트의 **생명 주기**와도 크게 관련이 있는데, useLayouteffect는 `componentDidMount`와 `componentDidUpdate` 시점에 실행된다.

SSR를 처리할 때 js 제대로 로드되지 않으면 useEffect와 useLayoutEffect가 모두 작동하지 않다는것 까지는 동일하다. 하지만 왜 하필 `useLayoutEffect`만 해당 경고가 뜨는것일까? 명확한 이유를 찾기 위해서 여러 도큐를 찾아보았는데 구체적인 이유를 알려주는곳은 별로 없었다. 그 중 가장 설득력 있는 설명은 아래와 같았다:

> When dealing with SSR, both useEffect & useLayoutEffect won't work unless that JavaScript has been properly loaded. Therefore, there's the above warning we might see in the console. The reason why it doesn't generate with useEffect is, it is not concerned with the render cycle of the component unlike useLayoutEffect is concerned and cares what users would see on the very first render of the component.

> 출처: [What is useLayoutEffect Hook & how it compares to useEffect?
> ](https://javascript.works-hub.com/learn/what-is-uselayouteffect-hook-and-how-it-compares-to-useeffect-b0f0f)

useLayoutEffect와 달리, useEffect는 컴포넌트의 생명 주기와 밀접한 관련이 없으며 사용자가 컴포넌트의 요소의 첫 번째 렌더링에서 어떤것을 볼 수 있는지 비교적 중요하지 않기 때문이라고 한다. 따라서 `useLayoutEffect`를 SSR에서 사용했을 때 경고 문구가 뜨지만, useEffect는 따로 경고가 뜨지 않는다는 것이다.

<br />

그렇다면 해당 경고는 어떤 방식으로 해결할 수 있을까?

<br/>

## 해결책: useEffect(), lazily show

SSR에서 나오는 `useLayoutEffect` 경고 문구는 아래와 같이 두 가지 방법으로 해결할 수 있다. 더욱 자세한 방법은 [uselayouteffect-ssr.md](https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85)에서 확인할 수 있다.

### 방법 1: useEffect로 변경하기

단순하게 useLayoutEffect 대신, `useEffect`를 사용하면 된다. 단, 이 경우에는 첫 렌더링마다 매번 실행되므로 첫 렌더링 할 때 크게 영향이 없는 경우에 사용하면 된다.
예를 들어, 단순히 상태를 세팅하거나 페이지 로드 후 데이터를 가져오는 등의 경우에서 사용할 수 있다.

```javascript
function MyComponent() {
  useEffect(() => {
    // ...
  })
}
```

### 방법 2: useLayoutEffect로 컴포넌트를 지연시켜(lazyily show) 나타내기

조건부 렌더링을 통해 useLayoutEffect 이펙트가 필요한 하위 항목을 서버에서 미리 렌더링 된 HTML에서 제외할 수 있다.

아래와 같이, 클라이언트 측의 JS가 먼저 로드되고 hydrate할 때까지 렌더링되는 컴포넌트들을 지연시킬 수 있다.
useEffect는 DOM이 모두 그려진 뒤에 작동하므로, useEffect내에 setShowChild라는 함수를 두어 DOM이 모두 그려진 뒤에야 showChild 상태값을 업데이트 시킨다.
따라서, 해당 상태값이 참일때만 useLayoutEffect가 있는 컴포넌트를 보여주도록 할 수 있다.

```javascript
function Parent() {
  const [showChild, setShowChild] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null
  }

  return <Child {...props} />
}

function Child(props) {
  useLayoutEffect(() => {
    // This is where your layout effect logic can be
  })
}
```

<br />

## TL;DR

- `useEffect는` DOM의 레이아웃 렌더(render)와 페인트(paint)가 끝난 후에야 호출되는 이펙트 함수이다.
  따라서, `useEffect`는 상태값이 이펙트에 의존할 경우 화면이 깜박이는 현상을 겪을 수 있어 사용성을 해칠 수 있다.
- `useLayoutEffect`는 위에 설명한 useEffect의 문제를 해결하기 위해서 등장한 훅이다.
- `useLayoutEffect`는 DOM의 페인트(paint) 단계 이전에 실행되기 때문에, DOM을 조작하는 코드가 있어도 깜빡이는 현상을 내지 않는다.
- 주의해야할 점은, `useLayoutEffect`를 SSR 환경에서 사용하면 warning 문구가 뜬다. (WARNING: 클라이언트에서 렌더링하는 컴포넌트에서만 useLayoutEffect를 사용해라..)
- `useLayoutEffect`는 useEffect와 달리, 모든 DOM 효과들이 실행된 이후에 동기적으로 실행되고, 작업이 완료되면 브라우저 페인팅이 시작된다. 또한, useLayouteffect는 componentDidMount와 componentDidUpdate 시점에 실행되어 리액트의 생명 주기와도 크게 관련이 있기 때문에 (useLayoutEffect만!) 경고 문구가 뜬다.
- 위 경고 문구를 해결하기 위해선, useLayoutEffect를 `useEffect`로 변경하거나, useLayoutEffect로 컴포넌트를 지연시켜(lazyily show) 나타내면 된다.

<br />

---

<br />

## 참고

> - [What is useLayoutEffect Hook & how it compares to useEffect?](https://javascript.works-hub.com/learn/what-is-uselayouteffect-hook-and-how-it-compares-to-useeffect-b0f0f)
> - [SSR에서 useLayoutEffect 사용하기](https://brunch.co.kr/@devapril/47)
> - [uselayouteffect-ssr.md](https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85)
> - [useLayoutEffect 훅에 대하여](https://merrily-code.tistory.com/46)
> - [useLayoutEffect - React 공식도큐](https://ko.reactjs.org/docs/hooks-reference.html#uselayouteffect)
> - [useLayoutEffect and server rendering](https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85)
> - [Github: hook-flow](https://github.com/donavon/hook-flow)
