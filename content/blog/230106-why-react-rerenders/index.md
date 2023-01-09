---
title: '[번역] 왜 리액트는 리렌더링을 할까? (Why React Re-Renders)'
date: '2023-01-06T11:45:32.169Z'
description: 'React 컴포넌트는 상태가 바뀔 때마다 리렌더링을 합니다. 그리고...'
category: 'React'
keywords: 'react, rerender, 리렌더링'
image: 'https://velog.velcdn.com/images/khy226/post/90d32a0e-1420-4831-a83b-c89b73d760a1/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/90d32a0e-1420-4831-a83b-c89b73d760a1/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

> 본 게시물은 [Why React Re-Renders - Joshua Comeau](https://www.joshwcomeau.com/react/why-react-re-renders/) 를 번역 & 요약한 글 입니다.

## 들어가며

React 개발자에게 **"React에서 리렌더를 유발하는 것은 무엇인가요?"** 와 같은 질문을 하면 몇 가지 다른 대답을 얻을 수 있을 것입니다.

다만, 이 주제에 대해 많은 오해들이 있고, 불확실하게 이해한 개발자들이 많을 수 있습니다. React의 렌더 주기를 이해하지 못한다면 React.memo를 사용하는 방법이나 useCallback에서 함수를 wrapping해야 하는 시기를 완벽히 이해하기 어렵기 때문에, 리렌더링 원리를 이해하는 것은 매우 중요합니다.

<br />

이 튜토리얼에서는 **React가 언제, 왜 리렌더링되는지** 에 대한 개념을 알아보려고 합니다. 또한 React devtool를 사용하여 특정 컴포넌트가 리렌더링된 이유를 설명하는 방법에 대해서도 알아 볼 것입니다.

<br />

## 리액트 핵심 동작 원리

그럼, 근본적인 사실부터 시작해봅시다. 리액트의 모든 리렌더는 **상태 변화**로부터 시작됩니다. 이는 React에서 컴포넌트가 다시 렌더링할 수 있는 **유일한 "트리거(trigger)"** 입니다.

> 질문: 음, 그건 아마 옳지 않은 것 같아요... 결국, 컴포넌트는 props가 바뀌면 다시 렌더링되지 않나요? context는 어떤가요??

<br />

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

<br />

위 예시에서는 세 가지 컴포넌트가 있습니다: `App`, `Counter`, `BigCountNumber`. 맨 위에 있는 `App` 컴포넌트는 `Counter`를 렌더링하고, 해당 Counter 컴포넌트는 `BigCountNumber`를 렌더링합니다.

React에서 모든 상태 변수는 특정 컴포넌트 인스턴스에 연결됩니다. 이 예시에서는 `Counter`컴포넌트와 연관된 단일 상태인 `count`가 있습니다. 이 `count` 상태가 변경될 때마다 `Counter`가 다시 렌더링됩니다. 그리고 `Counter`가 `BigCountNumber`를 렌더링하고 있기 때문에, 해당 컴포넌트도 리렌더링 될 것입니다.

<br />

여기 이 원리가 작동하는 것을 보여주는 gif가 있습니다. "Increment(증가)" 버튼을 클릭하면 상태 변경이 트리거 됩니다.

![counter example](https://velog.velcdn.com/images/khy226/post/a17a23d7-37bc-431d-822a-412723373cd2/image.gif)

(초록색은 컴포넌트가 다시 렌더링되고 있음을 나타냅니다.)

<br />

이제, 첫번째 오해를 풀어봅시다. **#1: 상태 변수가 변경될 때마다 앱 전체가 다시 렌더링됩니다.**

<br />

일부 개발자들은 React의 모든 상태 변경이 애플리케이션 전체의 렌더링을 강제한다고 알고 있지만, 이것은 사실이 아닙니다. 리렌더링은 **상태 + 하위 항목(있는 경우)** 을 가지고 있는 컴포넌트에만 영향을 미칩니다. 따라서, 이 예에서 **App 컴포넌트**는 **count 상태 변수**가 변경될 때 다시 렌더링할 필요가 없습니다.

하지만 이것을 규칙적으로 외우기보다는, 한 걸음 뒤로 물러서서 왜 이런 식으로 작동하는지 알아보겠습니다.

<br />

React의 "주요 역할"은 **애플리케이션 UI를 React 상태와 동기화 상태를 유지**하는 것입니다. 그리고 리렌더의 요점은 **무엇을 변경해야 하는지 알아내는 것**입니다.

위의 "Counter" 예시를 살펴보겠습니다. 애플리케이션이 처음 마운트되면 React는 모든 컴포넌트를 렌더링하고 다음과 같은 DOM 스케치를 제공합니다:

<br />

```html
<main>
  <p>
    <span class="prefix">Count:</span>
    0
  </p>
  <button>Increment</button>
</main>
<footer>
  <p>Copyright 2022 Big Count Inc.</p>
</footer>
```

사용자가 버튼을 클릭하면 count 상태 변수가 0에서 1로 바뀝니다. 과연 UI에 어떤 영향을 미칠까요?

**React는 Counter 및 BigCountNumber 컴포넌트에 대한 코드를 다시 실행하고 원하는 DOM의 새 스케치를 생성합니다:**

```html
<main>
  <p>
    <span class="prefix">Count:</span>
    1
  </p>
  <button>Increment</button>
</main>
<footer>
  <p>Copyright 2022 Big Count Inc.</p>
</footer>
```

각 렌더는 카메라로 찍은 사진과 같은 스냅샷으로, **현재 애플리케이션 상태**를 기준으로 UI가 어떻게 보여야 하는지를 보여줍니다.

React는 **"차이점 찾기"** 게임을 통해 이 두 스냅샷 사이에 무엇이 변경되었는지 확인합니다. 이 경우 문단에 **0에서 1로 변경된 텍스트 노드**가 있는 것을 확인하고 스냅샷과 일치하도록 텍스트 노드를 편집합니다. 작업이 완료된 것에 만족한 React는 다시 자리를 잡고 다음 상태 변화를 기다립니다.

<br />

#### 리액트 Core 루프:

위 과정을 염두에 두고 렌더 그래프를 다시 살펴보겠습니다:

![counter example](https://velog.velcdn.com/images/khy226/post/a17a23d7-37bc-431d-822a-412723373cd2/image.gif)

<br />

count 상태는 Counter 컴포넌트와 연관되어 있습니다. React 애플리케이션에서는 데이터가 **위로 흐를 수 없기 때문에**, 이러한 상태 변화가 가장 상위에 있는 `<App/>`에 영향을 미칠 수 없다는 것을 알고 있습니다. 따라서 우리는 그 컴포넌트를 다시 렌더링할 필요가 없습니다.

하지만 Counter의 child인 BigCountNumber를 다시 렌더링 해야 합니다. 해당 컴포넌트는 카운트 상태를 실제로 표시하기 때문입니다. BigCountNumber를 다시 렌더링하지 않으면 문단의 텍스트 노드가 0에서 1로 변경되는 것을 알 수 없습니다. 우리는 이 컴포넌트를 스케치에 포함시켜야 합니다.

<br />

리렌더의 요점은 **상태 변경이 사용자 인터페이스에 어떤 영향을 미치는지** 파악하는 것입니다. 따라서 정확한 스냅샷을 얻으려면 영향을 받을 수 있는 모든 구성 요소를 다시 렌더링해야 합니다.

<br />

## 리렌더링이 Props 때문이라고?

이제 두번째 오해 **#2: 컴포넌트는 props가 바뀌기 때문에 다시 렌더링됩니다** 에 대해서 알아봅시다.

> _\*참고: props 는 properties 의 줄임말이며, 컴포넌트끼리 값을 전달하는 수단입니다._

<br />

아래 업데이트된 예를 들어 살펴보겠습니다.

아래 코드에서, 우리의 "Counter" 앱은 완전히 새로운 컴포넌트인 Decoration을 받았습니다:

```jsx
import React from 'react'

import Decoration from './Decoration'
import BigCountNumber from './BigCountNumber'

function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {/* 👇 This fella is new 👇 */}
      <Decoration />
    </main>
  )
}

export default Counter
```

> [Code Sandbox](https://codesandbox.io/s/nhic1f?file=/Counter.js&from-sandpack=true) 원본 링크에서 확인하기

<br />

아래와 같이 배 모양 Decoration이 추가되었습니다.

![](https://velog.velcdn.com/images/khy226/post/953dc687-b779-4a82-9c73-ae18a7c44a82/image.png)

(모든 컴포넌트가 하나의 큰 파일에 포함되어 있어 조금 복잡해졌기 때문에 다시 구성했습니다. 그러나 새로운 Decoration 컴포넌트를 제외하고는 전체 컴포넌트 구조는 동일합니다.)

우리의 Counter 앱은 이제 구석에 Decoration 컴포넌트로 만들어진 귀여운 돛단배가 있습니다. 이 돛단배는 count 상태에 의존하지 않으니, count가 바뀌어도 아마 다시 렌더링하지는 않겠죠?

> 음, 정확히는 '아니요'

<br />

![](https://velog.velcdn.com/images/khy226/post/08059c52-6b0a-4883-80cd-de038d02ea47/image.gif)

컴포넌트가 리렌더링될 때, props를 통해 특정 상태 변수를 전달받는지 여부에 관계없이, 해당 컴포넌트의 모든 하위 항목을 다시 렌더링하려고 합니다.

<br />

하지만 이건 직관에 어긋나는 것 같긴 합니다. 우리가 Decoration의 props로 count를 넘기지도 않는데, 왜 다시 렌더링할 필요가 있을까요??

여기 답이 있습니다: **리액트는 Decoration이 count 상태 변수에 직접적으로 의존하는지 간접적으로 의존하는지 100% 확실하게 알 수 없습니다.**

<br />

이상적으로 리액트의 컴포넌트는 항상 "순수(pure)"할 것입니다. 순수 컴포넌트는 동일한 props가 제공될 때 항상 동일한 UI를 생성하는 컴포넌트입니다.

하지만 현실에서는, 우리의 많은 컴포넌트들은 순수하지 않습니다. 순수하지 않은(impure) 구성 요소를 만드는 것은 놀라울 정도로 쉬운데, 아래 예제를 확인해봅시다:

<br />

```jsx
function CurrentTime() {
  const now = new Date()
  return <p>It is currently {now.toString()}</p>
}
```

이 컴포넌트는 현재 시간에 의존하기 때문에 렌더링될 때마다 다른 값을 표시합니다!

<br />

이 문제의 골치아픈 점은 refs(참조)와 관련이 있습니다. ref를 props으로 전달하면 React는 마지막 렌더 이후로 변형했는지 여부를 알 수 없습니다. 그래서 리액트는 안전성을 위해 리렌더링을 선택합니다.

React의 **#1 목표는 사용자가 보는 UI가 애플리케이션 상태와 "동기화"되도록 하는 것입니다.** 따라서 React는 너무 많은 렌더링을 한다는 점에서 오류를 범하게 됩니다. 사용자에게 오래된 UI를 보여주는 위험을 감수하고 싶지 않기 때문입니다.

<br />

그래서, 우리가 가지고 있던 오해로 돌아가면, props들은 리렌더링과는 아무 상관이 없습니다. 즉, count prop가 변경된다고 BigCountNumber 컴포넌트가 다시 렌더링되지 않습니다.

상태 변수 중 하나가 업데이트되었기 때문에 컴포넌트가 다시 렌더링되면, 해당 다시 렌더링이 트리 아래로 흘러 내려(cascade) React가 이 새 스케치의 세부 정보를 채우고 새 스냅샷을 캡쳐합니다.

<br />

이것이 일반적인 작동 프로세스지만, 이를 조정할 수 있는 방법이 있습니다.

<br />

### 순수 컴포넌트를 만드는 법

React.memo, 혹은 React.PureComponent 클래스 컴포넌트에 익숙할 것 입니다. 이 두 가지 도구를 사용하면 **특정 리렌더 요청을 무시**할 수 있습니다.

아래 예시를 참고해주세요:

<br />

```jsx
function Decoration() {
  return <div className="decoration">⛵️</div>
}
export default React.memo(Decoration)
```

Decoration 컴포넌트를 React.memo로 둘러싸는 것은 React에게 "이 컴포넌트가 순수하다는 것을 알아요. props가 바뀌지 않는 한, 다시 렌더링할 필요가 없습니다." 라고 말하는 것과 같습니다.

이 방식을 **memoization(메모이제이션)** 이라고 합니다.

<br />

R이 빠져있지만, 동일하게 "기억하는 것(memorization)"이라고 생각할 수 있습니다. 메모이제이션의 개념은, React가 이전 스냅샷을 기억한다는 것 입니다. 만약 props가 변경되지 않은 경우 React는 새 스냅샷을 생성하지 않고 이미 생성된 이전 단계의 스냅샷을 재사용합니다.

<br />

React.memo를 사용하여 BigCountNumber와 Decoration을 모두 감싼다고 가정해 보겠습니다. 이것이 리렌더에 미치는 영향은 다음과 같습니다:

![](https://velog.velcdn.com/images/khy226/post/9836d405-0b23-4ab1-9f10-e8bfddc5dc47/image.gif)

count가 변경되면 Counter를 다시 렌더링하고 React는 두 하위 컴포넌트를 모두 렌더링하려고 합니다.

이때, BigCountNumber가 count를 props로 사용하고, 해당 props가 변경되었기 때문에 BigCountNumber가 다시 렌더링됩니다. **그러나 Decoration의 props는 변경되지 않았기 때문에 원래 생성된 스냅샷이 다시 사용됩니다.**

<br />

저는 React.memo가 게으른 사진 작가라고 생각합니다. 똑같은 사진을 5장 찍어달라고 하면 1장을 찍어서 5장을 주는 것이죠. 사용자의 지시사항이 변경될 때만 사진사가 새 사진을 찍는 것과 같은 원리입니다.

여기 라이브 코드 버전이 있습니다. 메모이제이션된 각 컴포넌트에는 console.info 호출이 추가되어 있으므로 각 구성 요소가 다음을 렌더링하는 시점을 콘솔에서 정확하게 확인할 수 있습니다:

<br />

```jsx
import React from 'react'

function Decoration() {
  console.info('Decoration render')

  return <div className="decoration">⛵️</div>
}

export default React.memo(Decoration)
```

> [Code Sandbox](https://codesandbox.io/s/gmn02r?file=%2FDecoration.js&from-sandpack=true) 원본 링크에서 확인하기

![](https://velog.velcdn.com/images/khy226/post/2b5671d7-dde8-4190-9330-b30e13453ec3/image.png)

- 위 사진처럼, 첫 렌더링때는 Decoration이 렌더링 되지만, Increment 버튼을 다시 누르면 Decoration이 리렌더 되지 않습니다.

<br />

여러분은 왜 이것이 기본 동작이 아닌지 궁금해 할 수도 있습니다. 이게 우리가 원하는 거 아닐까요? 렌더링할 필요가 없는 렌더링 컴포넌트를 건너뛰면 성능이 향상될까요?

<br />

개발자로서 우리는 리렌더가 얼마나 비싼지 과대평가하는 경향이 있다고 생각합니다. 우리의 Decoration 컴포넌트의 경우, 리렌더는 번개같이 빠릅니다.

만약 컴포넌트 여러 개의 props가 있고 하위 child가 많지 않은 경우에는, 구성요소를 다시 렌더링하는 것에 비해 props가 변경되었는지 확인하는 것이 실제로 느릴 수 있습니다.

<br />

따라서 우리가 생성하는 모든 컴포넌트를 메모하는 것은 역효과를 낳을 것입니다. React는 이러한 스냅샷을 매우 빠르게 캡처하도록 설계되었습니다! 하지만, **하위 요소가 많은 컴포넌트나, 내부 작업을 많이 하는 컴포넌트의 경우 memoization** 이 상당히 도움이 될 수 있습니다.

> **참고: 추후 리액트에 변경될 수 있는 것들!**
> React 팀은 컴파일 단계에서 코드를 "자동 메모(memo)"할 수 있는지 여부를 적극적으로 조사하고 있습니다. 아직 연구 단계지만 초기 실험은 유망해 보입니다. [영상 참고](https://www.youtube.com/watch?v=lGEMwh32soc)

<br />

### 컨텍스트(context)에 대해

우리는 아직 context에 대해 전혀 이야기하지 않았지만, 다행스럽게도, 리액트는 이것을 너무 복잡하게 만들지 않았습니다.

> **컨텍스트(context)란?**
>
> - context는 React 컴포넌트 트리 안에서 전역적(global)이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법입니다.
> - context를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있습니다.

기본적으로 컴포넌트의 상태가 변경되면 컴포넌트의 모든 하위 항목이 다시 렌더링됩니다. 그래서, 우리가 context 통해 모든 child들에게 그 상태를 제공한다고 해도 기존 프로세스는 변하지 않습니다; 어느 쪽이든, 그 컴포넌트들을 다시 렌더링 될 것입니다!

이제 순수 컴포넌트의 관점에서 컨텍스트는 "보이지 않는 props" 또는 "내부 props"과 같습니다.

<br />

예를 들어 보겠습니다. 다음은 UserContext 컨텍스트를 사용하는 순수 컴포넌트입니다:

```javascript
const GreetUser = React.memo(() => {
  const user = React.useContext(UserContext)
  if (!user) {
    return 'Hi there!'
  }
  return `Hello ${user.name}!`
})
```

이 예시에서, GreetUser는 props가 없는 순수 컴포넌트지만, user가 React의 상태로 저장되고 컨텍스트를 통해 전달되는 "보이지 않는" 또는 "내부" 의존성을 가집니다.

만약, 해당 user 상태 변수가 변경되면 리렌더가 실행되고, GreetUser는 새 스냅샷을 생성할 것 입니다. React는 이 컴포넌트가 특정 컨텍스트를 소비하고 있다는 것을 알 수 있으므로 마치 props처럼 취급합니다.

<br />
위 예시는 다음과 거의 같습니다:

```javascript
const GreetUser = React.memo(({ user }) => {
  if (!user) {
    return 'Hi there!'
  }
  return `Hello ${user.name}!`
})
```

context를 이용한 심화 예시입니다:

```jsx
import React from 'react'

const UserContext = React.createContext()

function UserProvider({ children }) {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    // Pretend that this is a network request,
    // fetching user data from the backend.
    window.setTimeout(() => {
      setUser({ name: 'Kiara' })
    }, 1000)
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function App() {
  return (
    <UserProvider>
      <GreetUser />
    </UserProvider>
  )
}

const GreetUser = React.memo(() => {
  const user = React.useContext(UserContext)

  if (!user) {
    return 'Hi there!'
  }

  return `Hello ${user.name}!`
})

export default App
```

> [Code Sandbox](https://codesandbox.io/s/8dphpe?file=%2FApp.js&from-sandpack=true)에서 실제 예시를 확인해보세요.

![](https://velog.velcdn.com/images/khy226/post/f96652a9-17fa-4c17-ba0a-a2bb8b69f713/image.gif)

<br />

이는 순수 컴포넌트가 React.useContext hook와 함께 컨텍스트를 사용하는 경우에만 발생합니다. 따라서, context가 의존하지 않는 순수 컴포넌트들까지 바꾼다는 걱정은 하지 않아도 됩니다.

<br />

## 추가: ChatGPT에게 물어보기

위 글을 정리하면서 갑자기 ChatGPT도 리액트의 리렌더링 원리를 알까? 하는 궁금증이 들었습니다. 얼마나 정확히 설명하는지 아래와 같이 질문을 해보았습니다.

> - 리액트 리렌더링의 원리는?

<br />

그리고 아래와 같은 답변을 받았습니다:

<br />

- 리액트는 컴포넌트가 변경될 때 마다 새로운 인스턴스를 이전 인스턴스와 비교해 변경된 점만 DOM에 업데이트한다.
- 위 개념을 리렌더링이라고 한다.
- 일반적으로 컴포넌트의 props나 state가 변경되면 리렌더링이 된다.
- 리액트는 shouldComponentUpdate() 메소드를 통해 리렌더링 수행 필요성을 결정한다.
- 그리고 ...?

![chat gpt ko](https://velog.velcdn.com/images/khy226/post/90d32a0e-1420-4831-a83b-c89b73d760a1/image.png)

> _(한국어로 물어보니까 답을 끝까지 안하는..?)_

기본적으로 리액트의 렌더링 원리를 잘 설명하였지만, 한국어로 물어보았을 때는 문단을 계속 마무리 하지 않고, 렌더링 성능 개선을 위한 답변을 주지 않았습니다.

<br />
<br />

답변이 너무 길어서 그런가 하고 영어로 물어봤는데, 아래와 같은 답변을 완성해주었습니다.

![chat gpt en](https://velog.velcdn.com/images/khy226/post/9d0039b9-ab28-48e8-b0a4-bc5f3c25086e/image.png)

> _(영어로 물어보니까 끝까지 잘 대답해준다)_

<br />

##### ChatGPT의 답변을 정리하자면 아래와 같다:

- React는 컴포넌트의 상태나 props가 변경되면 리렌더링을 한다
- 그 이유는, 컴포넌트가 변경된 input을 나타내야하지 때문이다.
- 리액트는 가상돔을 통해 변경된 사항을 정리하고, 이전 버전과 비교하여 변경된 부분만 리렌더링 한다.
- 컴포넌트의 state나 props가 변경되는 방법은 여러가지가 있다: setState 메서드로 직접 업데이트 하거나, 부모 컴포넌트가 새로운 props를 제공하거나, event action 으로 부터 새로운 props를 받았을 때.
- 리액트의 렌더링 행위는 직관적이지 않다고 생각할 수 있다.
- 하지만, DOM에서 변경된 부분만 업데이트함으로, 전체 컴포넌트를 모두 렌더링 하는게 아니라 더욱 효율적이게 필요한 부분만 리렌더할 수 있다.
- 이를 통해 더욱 빠르고, responsive한 사용자 인터페이스를 만들 수 있다

<br />

<hr />

## 출처

> - [Why React Re-Renders - Joshua Comeau](https://www.joshwcomeau.com/react/why-react-re-renders/)
> - [React 공식 도큐 - context](https://ko.reactjs.org/docs/context.html#when-to-use-context0)
