---
title: '[번역] 왜 리액트에서 리렌더링이 발생하는가'
date: '2023-01-06T11:45:32.169Z'
description: 'React 컴포넌트는 상태가 바뀔 때마다 리렌더링을 합니다. 그리고'
category: 'React'
keywords: 'react, rerender, 리렌더링'
image: 'https://velog.velcdn.com/images/khy226/post/90d32a0e-1420-4831-a83b-c89b73d760a1/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/90d32a0e-1420-4831-a83b-c89b73d760a1/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

> 본 게시물은 [Why React Re-Renders - Joshua Comeau](https://www.joshwcomeau.com/react/why-react-re-renders/) 를 번역 & 요약한 글 입니다.

## 들어가며

React 개발자에게 **"React에서 리렌더를 유발하는 것은 무엇인가요?"**와 같은 질문을 하면 몇 가지 다른 대답을 얻을 수 있을 것입니다.

다만, 이 주제에 대해 많은 오해들이 있고, 불확실하게 이해한 개발자들이 많을 수 있습니다. React의 렌더 주기를 이해하지 못한다면 React.memo를 사용하는 방법이나 useCallback에서 함수를 wrapping해야 하는 시기를 완벽히 이해하기 어렵기 때문에, 리렌더링 원리를 이해하는 것은 매우 중요합니다.

이 튜토리얼에서는 **React가 언제, 왜 리렌더링되는지**에 대한 개념을 알아보려고 합니다. 또한 React devtool를 사용하여 특정 컴포넌트가 리렌더링된 이유를 설명하는 방법에 대해서도 알아 볼 것입니다.

## 리액트 핵심 동작 원리

그럼, 근본적인 사실부터 시작해봅시다. 리액트의 모든 리렌더는 **상태 변화**로부터 시작됩니다. 이는 React에서 컴포넌트가 다시 렌더링할 수 있는 **유일한 "트리거(trigger)"**입니다.

> 질문: 음, 그건 아마 옳지 않은 것 같아요... 결국, 컴포넌트는 props가 바뀌면 다시 렌더링되지 않나요? context는 어떤가요??

여기서 중요한 것이 있습니다: 특정 컴포넌트가 다시 렌더링되면 **모든 하위 컴포넌트도 다시 렌더링됩니다.**

예를 들어 보겠습니다:

```jsx
import React from 'react'

function App() {
  return (
    <>
      <Counter />
      <footer>
        <p>Copyright 2022 Big Count Inc.</p>
      </footer>
    </>
  )
}

function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </main>
  )
}

function BigCountNumber({ count }) {
  return (
    <p>
      <span className="prefix">Count:</span>
      {count}
    </p>
  )
}

export default App
```

> [Code Sandbox](https://codesandbox.io/s/736lp6?file=/App.js&from-sandpack=true) 원본 링크에서 확인하기

위 예시에서는 세 가지 컴포넌트가 있습니다: `App`, `Counter`, `BigCountNumber`. 맨 위에 있는 `App` 컴포넌트는 `Counter`를 렌더링하고, 해당 Counter 컴포넌트는 `BigCountNumber`를 렌더링합니다.

React에서 모든 상태 변수는 특정 컴포넌트 인스턴스에 연결됩니다. 이 예시에서는 `Counter`컴포넌트와 연관된 단일 상태인 `count`가 있습니다. 이 `count` 상태가 변경될 때마다 `Counter`가 다시 렌더링됩니다. 그리고 `Counter`가 `BigCountNumber`를 렌더링하고 있기 때문에, 해당 컴포넌트도 리렌더링 될 것입니다.

여기 이 원리가 작동하는 것을 보여주는 gif가 있습니다. "Increment(증가)" 버튼을 클릭하면 상태 변경이 트리거 됩니다.

<img src="https://velog.velcdn.com/images/khy226/post/a17a23d7-37bc-431d-822a-412723373cd2/image.gif" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="counter example"/>

(초록색은 컴포넌트가 다시 렌더링되고 있음을 나타냅니다.)

## 리렌더링이 Props 때문이라고?

### 순수 컴포넌트를 만드는 법

### 컨텍스트에 대해

## Dev tool를 이용한 리액트 톺아보기

### Dev tool를 이용한 리렌더 톺아보기

## 더 나아가

## 마무리하며 - 퍼포먼스 팁

## 추가: ChatGPT에게 물어보았다

![chat gpt ko](https://velog.velcdn.com/images/khy226/post/90d32a0e-1420-4831-a83b-c89b73d760a1/image.png)

![chat gpt en](https://velog.velcdn.com/images/khy226/post/9d0039b9-ab28-48e8-b0a4-bc5f3c25086e/image.png)

<hr />

## 출처

> [Why React Re-Renders - Joshua Comeau](https://www.joshwcomeau.com/react/why-react-re-renders/)
