---
title: 'useMemo와 useCallback는 왜, 언제 사용할까?'
date: '2023-02-02T11:45:32.169Z'
description: '메모이제이션을 담당하는 useMemo와 useCallback 이라는 두 가지 리액트 훅을 살펴보고 각각의 장점과 단점이 뭐가 있는지 알아보자.'
category: 'React'
keywords: 'useCallback, useMemo, 메모이제이션'
image: 'https://velog.velcdn.com/images/khy226/post/202a520f-c04c-4220-b3e1-23ca62181218/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/202a520f-c04c-4220-b3e1-23ca62181218/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

### 들어가며

리액트는 강력하고 효율적인 자바스크립트 라이브러리이다. 컴포넌트 기반 아키텍처를 제공하여 개발자가 재사용 가능한 코드를 작성하고 복잡한 사용자 경험을 만들 수 있도록 한다. 다른 기술과 마찬가지로, 잘만 쓴다면 코드를 보다 효율적이고 사용하기 쉽게 만드는 데 도움이 될 수 있다. 하지만 사용하는 기술의 장단점을 정확히 파악하지 못하고 적용한다면, 오히려 비효율적인 코드를 짤 위험이 있다.

효율적인 리액트 코드를 위해서는 여러가지 방법이 있는데, 간단하게 적용할 수 있는 방법은 바로 **'메모이제이션'** 을 활용하는 것이다. 대표적으로 useMemo와 useCallback 훅이 있다. 메모이제이션을 담당하는 useMemo와 useCallback 이라는 두 가지 리액트 훅을 살펴보고 각각의 장점과 단점이 뭐가 있는지 알아보자.

<br />

### 메모이제이션

리액트 코드를 효율적으로 짜는데에 '메모이제이션'을 빼놓을 수 없다. 메모이제이션(memoization)은 값비싼 함수 호출의 결과를 캐싱하고 동일한 입력이 다시 발생할 때 캐싱된 결과를 반환하는 프로그래밍 기술이다. 이 기술은 동일한 입력으로 여러 번 호출되는 함수 또는 컴포넌트가 있을 때 React에서 유용할 수 있다. 메모이제이션를 사용하면 동일한 결과를 불필요하게 다시 계산하지 않고, 캐시된 결과를 반환할 수 있다. 따라서, useCallback, useMemo와 같은 메모이제이션 훅을 통해 성능을 향상시키고 코드의 복잡성을 줄일 수 있다.

<br />

#### 메모이제이션 예시 (피보나치 수열)

대표적인 예로 피보나치 수열을 구하는 상황을 들 수 있다. 재귀를 이용해서 피보나치 수열을 구하는 방식이다.

```javascript
function fib(n) {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

console.log(fib(5))
// fib 함수 실행 횟수: 15
```

위 함수로 `fib(5)`를 구하면 총 15번의 호출을 하게 된다. 함수를 재귀적으로 호출하기 때문에 `fib(5)`를 구하기 위해 `fib(4)`, `fib(3)`을 호출하고 `fib(4)`를 구하기 위해 `fib(3)`, `fib(2)` 가 호출되고.. 이렇게 상위 값을 구하기 위해 이전에 계산했던 값들을 반복해서 호출하게 된다.

<br />

반복 호출을 막기 위해서는 메모이제이션을 활용할 수 있다. 만약 이미 함수가 실행되어 연산된 값이 있다면, 함수를 다시 호출하지 않고 기존에 연산된 값을 재활용하는 방식이다.

아래 함수는 이번엔 이미 연산한 값은 다시 계산하지 않도록 memo라는 배열에 각 단계의 값을 저장하는 메모이제이션 피보나치 함수이다.

```javascript
const memo = [0, 1]

const fib = function (n) {
  // 이미 연산된 값이 있다면 return
  if (memo[n] || n <= 1) return memo[n]

  const result = fib(n - 1) + fib(n - 2)
  // 아니라면 해당 값 계산해서 memo에 저장
  memo[n] = result

  return result
}

console.log(fib(5))
// fib 함수 실행 횟수: 9
```

이번에는 `memo` 배열에 이전에 연산된 값들을 넣어, 이미 연산된 함수의 경우 다시 호출하지 않고 해당 값을 반환해주는 메모이제이션을 적용했다. 이전에는 같은 함수를 15번 호출했지만, 메모이제이션을 적용 후 9번만 실행되었다.

<br />

### UseMemo

useMemo는 **메모이제이션된 값을 반환**하는 리액트 훅이다. 앞서 말한 '메모이제이션 피보나치 함수'와 같이 직전에 연산된 값이 있다면, 다시 연산을 하지 않고, 해당 값을 반환한다.

useMemo 사용법은 아래와 같다:

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

- 첫번째 인자에는 값을 연산하고 반환하는 함수를 넣어준다.
- 두번째 인자에는 의존성 배열을 넣어준다. (특정 값 a, b가 변경되었을 때 다시 연산하라고 알려주는 배열)

<br />

useMemo는 의존성이 변경되었을 때에만 메모이제이션된 값을 다시 계산한다. 따라서, 기존에 매 렌더링마다 실행되었던 복잡한 계산을 방지해준다. (만약 배열이 없는 경우 매 렌더링 마다 새로운 값을 계산하게 된다.)
특히, 복잡한 계산이나 외부 데이터가 필요한 작업에 특히 유용하다.

useMemo를 사용하려면 함수형 컴포넌트를 만들어 사용하면 된다. useMemo 훅 안에는 연산 및 값을 반환하는 함수와 계산이 의존하는 값의 목록인 의존성 배열이라는 두 가지 인수를 사용한다.

동작하는 방식은 다음과 같다: useMemo 훅이 연산을 수행하면 결과를 메모리에 저장한다. 입력 목록의 값이 하나라도 변경되면 다시 연산을 하게 된다. 이렇게 하면 결과가 항상 최신 상태로 유지되는 동시에, 불필요한 재연산을 피할 수 있다.

<br />

#### useMemo 예시

아래 예를 통해 더 자세히 알아보자.

```jsx
import { useState } from 'react'

export default function App() {
  const [val1, setVal1] = useState(0)
  const [val2, setVal2] = useState(0)

  const handleAdd1 = () => {
    setVal1(prev => prev + 1)
  }

  const handleAdd2 = () => {
    setVal2(prev => prev + 1)
  }

  const computedVal = val1 * val1
  console.log('computedValue', computedVal)

  return (
    <>
      <div>val1: {val1}</div>
      <div>val2: {val2}</div>
      <div>val3: {computedVal}</div>
      <br />
      <button type="button" onClick={handleAdd1}>
        Add val1
      </button>
      <button type="button" onClick={handleAdd2}>
        Add val2
      </button>
    </>
  )
}
```

<img src="https://velog.velcdn.com/images/khy226/post/b99e824f-9cfd-4614-ab13-e4e5df00a66f/image.gif" alt="usememo test" style="width: 50%; margin: 0 auto;">

<br />

- 위 예시에는 `val1`과 `val2` 라는 두 상태가 있고, 각 상태의 값을 1씩 증가 시키는 버튼이 있다.
- `val1` \* `val1` 를 연산한 값을 `computedVal` 라는 변수로 정의하고, 화면에는 val3으로 나타내고 있다.
- 위 코드의 문제점은, `val1` 만 사용하는 `computedVal`의 값이, 아무 상관 없는`val2`를 증가시켜도 다시 계산된다는 것이다.
- 그 이유는 `val2`의 값을 증가시키면, `val2` 상태가 변화되기 때문에 `val1`의 값이 같아도 리액트가 상태 변화를 화면에 표시하기 위해 컴포넌트를 리렌더링 시킨다. 따라서 의존하지 않는 `val2`값이 변해도 `computedVal`의 연산이 계속 재실행된다.

<br />

위 문제점을 해결하기 위해서는 useMemo를 사용하면 된다. `computedVal` 함수를 아래와 같이 메모이제이션 한다면, `val2` 상태가 변화되어도 연산을 다시 실행하지 않는다. 의존성 배열안에 있는 `val1` 값이 변경되었을 때에만 `computedVal`가 연산된다.

```jsx
import { useState, useMemo } from 'react'

...

const computedVal = useMemo(() => {
  console.log(val1 * val1)
  return val1 * val1;
}, [val1]);
```

<img src="https://velog.velcdn.com/images/khy226/post/759f2283-5211-4a71-889b-d74cad28dcaf/image.gif" alt="usememo test" style="width: 50%; margin: 0 auto;">

위 gif에서 볼 수 있듯이, 'Add val1' 버튼을 누를 때만 콘솔이 찍히고, 'Add val2'를 누르면 콘솔이 찍히지 않는다. 즉, useMemo를 활용하여 `computedVal` 함수가 의존하고 있는 `val1` 상태가 변했을 때만 재연산을 할 수 있도록 최적화를 하였다.

<br />

그렇다면 useMemo는 정확히 어떻게 구성되어있길래 메모이제이션을 가능하게 할까? 페이스북의 리액트 코드 중 useMemo 함수 코드를 확인해보자:

```javascript
// https://github.com/facebook/react/blob/1a106bdc2abc7af190b791d13b2ead0c2c556f7a/packages/react-server/src/ReactFizzHooks.js#L342-L369

function useMemo<T>(nextCreate: () => T, deps: Array<mixed> | void | null): T {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent()
  workInProgressHook = createWorkInProgressHook()

  const nextDeps = deps === undefined ? null : deps

  if (workInProgressHook !== null) {
    const prevState = workInProgressHook.memoizedState
    if (prevState !== null) {
      if (nextDeps !== null) {
        const prevDeps = prevState[1]
        if (areHookInputsEqual(nextDeps, prevDeps)) {
          return prevState[0]
        }
      }
    }
  }

  if (__DEV__) {
    isInHookUserCodeInDev = true
  }
  const nextValue = nextCreate()
  if (__DEV__) {
    isInHookUserCodeInDev = false
  }
  workInProgressHook.memoizedState = [nextValue, nextDeps]
  return nextValue
}
```

위 코드를 보면 이전의 값들과 현재의 값이 다른지 비교를 한후, 값이 다르지 않다면 저장되어있던 이전 상태를 보여주는 메모이제이션을 한다.
<br />
구체적으로, `memoizedState`에 [`value`, `deps`] 값을 저장하고, 이전의 `PrevDeps` 값과 비교한다. 만약 변화가 없다면 이전의 값을 그대로 반환하고, 아니라면 useMemo에 새로 들어온 값과 함수를 실행하여 연산을 하고 해당 값을 `memoizedState`에 새로 저장하는 방식으로 동작한다.

<br />

#### useMemo 주의할 점

위 예시를 통해 알 수 있듯, 연산을 최소화 하고 효율적인 코드를 위해서 useMemo가 유용하다는 것을 알 수 있다. 하지만, useMemo를 사용하기 전 알아야 할 것이 있다.

우선, 계산 결과가 메모되어 있으므로 계산에 대한 입력이 변경되지 않으면 업데이트되지 않는다. 즉, useMemo는 계산에 대한 입력이 일정하게 유지되는 경우에만 유용하다. 또한 useMemo는 메모된 결과에 액세스할 때마다 계속 연산을 수행해야 하기 때문에 잦은 변동이 있는 경우 오히려 성능이 악화될 수 있다.

또한, useMemo는 값을 재활용하기 위해 따로 메모리를 사용하기 때문에 불필요한 값까지 메모이제이션 해버리면 오히려 메모리를 낭비할 수 있다. 연산이 매우 복잡한 계산식이 아닌곳에도 useMemo를 남발한다면, 성능상의 이점 보다는 오히려 코드를 복잡하게 만들어 유지보수를 어렵게 할 위험도 있다.

useMemo는 React에서 계산 비용이 많이 드는 작업을 최적화하기 위한 훌륭한 도구이지만, 적절하게 사용해야만 성능을 향상시키고 코드의 복잡성을 줄이는 데 도움이 될 수 있다. 따라서 프로젝트에 사용하기 전에 useMemo의 제한 사항을 이해하는 것이 중요하다.

<br />

### UseCallback

UseCallback 메모이제이션된 콜백 함수, 즉 이미 생성된 함수를 반환하는 리액트 훅이다.

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

위에서 메모이제이션된 함수는 콜백 함수의 의존성이 변경되었을 때에만 변경된다. 이는 불필요한 렌더링을 방지하기 위해 (ex. shouldComponentUpdate를 사용하여) 참조의 동일성을 보장하거나, 자식 컴포넌트에 의존적인 콜백 함수를 전달할 때 유용하다.

참고로, `useCallback(fn, deps)`은 `useMemo(() => fn, deps)`와 같다. useCallback 의존성 배열에 있는 상태나 props가 변경되지 않는다면, 해당 함수는 다시 생성되지 않는다.

<br />

#### 함수 메모이제이션

앞서 말한 useCallback 사용법을 정리하자면 아래와 같다. 첫번째 인자로 넘긴 함수를, 두번째 인자로 넘긴 의존성 배열내의 값이 변경되기 전까지 저장하고 재사용할 수 있게 해준다.

```javascript
const memoizedFunction = useCallback(함수, 배열)
```

만약 useCallback을 사용하지 않는다면, 아래와 같은 함수는 컴포넌트가 렌더링 될 때마다 새롭게 생성된다.

```javascript
const sum = () => x + y
```

하지만, useCallback을 사용하면 컴포넌트가 다시 렌더링 되더라도, 해당 함수가 의존하고 있는 값들이 바뀌지 않는다면 함수를 새로 생성하지 않고 기존 함수를 계속 반환한다.

```javascript
const add = useCallback(() => x + y, [x, y])
```

사실 컴포넌트를 렌더링 할 때마다 함수를 새로 선언하는 것은 성능상 큰 영향을 끼치지 않는다. 따라서, 모든 함수마다 useCallback을 사용하는 것은 큰 의미가 없고, 오히려 유지 보수를 어렵게 하거나 성능을 해칠 수 있다. useCallback의 의미있는 사용법을 알기 위해서는 자바스크립트의 **함수 동등성**에 대해서 알아야 한다.

<br />

#### 함수 동등성

자바스크립트에서 함수는 객체로 취급이 되기때문에, 함수를 동일하게 만들어도 메모리 주소가 다르면 다른 함수로 간주한다. 바로 메모리 주소에 의한 참조 비교가 일어나기 때문인데, 콘솔창에서 아래와 같이 동일한 코드의 함수를 작성하시고 `===` 연산자로 비교를 해보면 `false`가 반환된다.

```javascript
> const add1 = () => x + y;
undefined
> const add2 = () => x + y;
undefined
> add1 === add2
false
```

만약 특정 함수를 다른 함수의 인자로 넘기거나, 자식 컴포넌트의 props로 넘길 때 함수의 참조가 달라서 예상하지 못한 성능 문제가 생길 수 있다.

이 경우, useCallback을 이용해 함수를 특정 조건이 변경되지 않는 이상 재생성하지 못하게 제한하여 함수 동등성을 보장할 수 있다. (만약 리액트가 함수가 동등하지 않다고 판단한다면 상황에 따라 성능이 악화되거나, 무한루프에 빠지는 등의 문제를 겪을 수 있다.)

<br />

#### useCallback 예시

아래와 같이 데이터를 가져오는 fetchData 함수를 만들고, useEffect에 의존성 배열로 fetchData를 추가해보자.

```javascript
import React, { useState, useEffect } from 'react'

function Profile({ id }) {
  const [data, setData] = useState(null)

  const fetchData = () =>
    fetch(`https://test-api.com/data/${id}`)
      .then(response => response.json())
      .then(({ data }) => data)

  useEffect(() => {
    fetchData().then(data => setData(data))
  }, [fetchData])

  // ...
}
```

- 언뜻 보면 페이지가 마운트 되었을 때 데이터 가져오는 `fetchData` 함수를 호출해 데이터를 잘 가져오는 듯 보인다.
- 하지만, 위에서 설명한듯이 **함수의 동등성** 문제 때문에 예상치 못한 무한루프에 빠지게 된다.
- `fetchData`는 함수이기 때문에 id 값에 관계없이 컴포넌트가 렌더링 될 때마다 새로운 참조값으로 변경이 된다. 함수가 변경되었으므로, 매번 `useEffect`가 실행되어 다시 렌더링이 되고 무한루프에 빠지게 된다.

<br />

이 문제를 해결하기 위해서는 아래와 같이 useCallback을 사용해 함수의 동등성을 유지하면 된다.

```javascript
import React, { useState, useEffect } from 'react'

function Profile({ id }) {
  const [data, setData] = useState(null)

  const fetchData = useCallback(
    () =>
      fetch(`https://test-api.com/data/${id}`)
        .then(response => response.json())
        .then(({ data }) => data),
    [id],
  )

  useEffect(() => {
    fetchData().then(data => setData(data))
  }, [fetchData])

  // ...
}
```

- 이렇게 useCallback 훅을 사용하면, 컴포넌트가 다시 렌더링 되더라도 `fetchData` 함수의 참조값을 동일하게 유지시킨다.
- 따라서, useEffect에 의존성 배열 값에 있는 `fetchData` 함수는 id 값이 변경되지 않는 한, 재호출되지 않는다.

<br />

그렇다면 useCallback은 어떻게 구성되어있길래 이전 함수값을 기억하고 있을까?

아래는 useCallback 동작 코드이다. 앞서 설명한 useMemo 함수를 그대로 이용한다.

```javascript
// https://github.com/facebook/react/blob/1a106bdc2abc7af190b791d13b2ead0c2c556f7a/packages/react-server/src/ReactFizzHooks.js#L445-L450

export function useCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  return useMemo(() => callback, deps)
}
```

위 useMemo에서 설명한대로 useCallback도 동일한 과정을 거친다:

> memoizedState에 [value, deps] 값을 저장하고, 이전의 PrevDeps 값과 비교한다. 만약 변화가 없다면 이전의 값을 그대로 반환하고, 아니라면 useMemo에 새로 들어온 값과 함수를 실행하여 연산을 하고 해당 값을 memoizedState에 새로 저장하는 방식으로 동작한다.

<br />

정리하자면, useCallback은 리액트 코드를 최적화하고 메모리 소비를 줄일 수 있는 좋은 방법을 제공한다. 함수의 동등성을 유지하게 하여 필요없는 성능 악화나 무한루프를 방지할 수도 있다. 그 중 특히, 계산 비용이 많이 들거나 외부 데이터 소스에 크게 의존하는 기능에 가장 적합하다. 필요한 때에 적절하게 사용하면 성능을 향상시키고 코드의 복잡성을 줄이는 데 도움이 될 수 있다.

<br />

#### useCallback 주의할 점

useCallback 훅으로 함수 재생성을 방지하고, 참조 동등성을 보장하여 성능을 향상시킬 순 있다. 하지만 모든 함수마다 useCallback을 사용하는 것은 오히려 성능을 악화시키고 가독성을 해칠 수 있다.

가끔 React 컴포넌트 내에서 선언하는 모든 함수에 useCallback를 사용하는 경우가 있다. 일반적으로 소프트웨어의 성능 최적화에는 그에 상응하는 대가가 있는데, (예를 들어 코드가 복잡해지거나 메모리를 사용하거나, 유지보수가 어려워지는 등) 모든 함수에 useCallback을 사용하는 것은 오히려 성능을 악화시킬 수 있다.

따라서, useCallback를 사용하기 전에 실질적으로 얻을 수 있는 성능 이점이 어느 정도인지 반드시 예상을 해보고 사용하는 것이 좋다고 한다.

<br />

### useMemo와 useCallback은 언제 사용해야 할까?

그렇다면 useMemo와 useCallback은 정확히 언제 사용하는게 좋을까? 공식 도큐에서는 모든 함수나 계산 값에 useMemo, useCallback을 사용하지 말고 **꼭 필요한 상황**에 쓰라고 적혀있었다. '꼭 필요한 상황들'이 무엇인지 궁금해서 여러 문서를 참고해 아래에 구체적인 사례들을 정리해보았다.

#### ❌ useMemo와 useCallback을 사용하지 말아야 할 경우

- 연산이 복잡하지 않은 함수에 useCallback을 사용하는 것은 메모리 낭비이므로, 간단한 일반 함수들에는 useCallback을 사용하지 않는게 좋다.
- 특히, 단순히 함수 내부에서 setState나 dispatch 함수등을 호출하는 경우에는 useCallback을 사용하지 않는게 좋다. 이미 리액트 자체에서 useState 와 useDispatch에 대한 성능 최적화가 보장되기 때문에, 렌더링이 새로 되어도 해당 함수는 재생성되지 않는다.

```jsx
cosnt handleChange = useCallback((state)=>{ setState(state) }, [] );
```

- useCallback, useMemo의 의존성 배열에 완전히 새로운 객체나 배열을 전달해서는 안된다. 만약 useCallback 내부 함수나 useMemo 내부 값에서 사용하지 않는 props를 전달한다면 메모이제이션을 하는데 소용이 없다.
- 의도적으로 매번 새로운 함수나 값을 계산해야 한다면 굳이 useCallback이나 useMemo를 사용할 필요가 없다.
- DOM에서 다른 컴포넌트를 렌더링하지 않는 컴포넌트 (html 태그만 렌더링하는 컴포넌트)에서는 useMemo를 사용할 필요가 없다.
- div, span, a, img와 같이 호스트 환경 (브라우저 / 모바일)에 속하는 플랫폰 컴포넌트에 전달하는 항목에는 useMemo와 useCallback을 사용할 필요가 없다. 리액트는 해당 컴포넌트들에 함수 참조가 변경되었는지 신경쓰지 않기 때문이다. (ref는 제외)

<br />

#### 🟢 useMemo와 useCallback을 사용해야 하는 경우

- 연산 혹은 처리량이 매우 많아서 렌더링의 문제가 되는 경우, 리렌더시 비용 절감을 위해서 useMemo를 사용하자
- 자식 컴포넌트에서 useEffect가 반복적으로 트리거 되거나, 무한 루프에 빠질 위험이 있을 때 useMemo, useCallback을 사용하자
- 자식 컴포넌트에 함수를 props로 넘길 때, 불필요한 렌더링이 일어난다고 판단된다면 useCallback으로 함수 동등성을 유지해주자.
- 함수 자체가 매우 복잡하거나, 다시 계산하는데 비용이 많이 드는 경우에 useCallback을 사용하자.
- 사용자의 입력값이 `map` 혹은 `filter` 등을 사용하여 이후 렌더링에서도 동일한 참조를 사용할 가능성이 높을 경우 useMemo를 사용해서 메모이제이션을 적용하자
- 리액트 상위 트리에서, 부모가 리렌더링 될 때 자식 컴포넌트까지의 렌더링 전파를 막고 싶을 때 useMemo를 사용하자. 자식 컴포넌트가 useMemo로 메모이제이션 컴포넌트일 경우, 메모이제이션된 props를 사용해 필요한 부분만 리렌더링 할 수 있다.
- ref 함수를 부수작용(side effect)와 함께 전달하거나, ref로 wrapper 함수를 만들 때 useMemo를 사용하자. 리액트는 ref 함수가 변경될 때 마다 과거 값을 null로 호출하고 새로운 함수를 호출하기 때문인데, 이 경우 ref 함수의 이벤트 리스터가 변경되는 등의 불필요한 작업이 일어날 수 있다.

<br />

### 결론

결론적으로, useCallback과 useMemo는 모두 리액트의 코드를 최적화하는 강력한 도구이다. UseCallback은 의존성이 거의 없는 가벼운 기능에 가장 적합하며, useMemo는 계산 집약적인 작업에 가장 적합하다.

함수 또는 컴포넌트가 동일한 입력으로 여러 번 호출되는 경우, 메모이제이션은 리액트에서 유용할 수 있다. 그러나 계산에 대한 입력이 자주 변경되는 경우 메모를 사용하는 것이 최선의 선택은 아닐 수 있다. useMemo와 useCallback을 무작정 사용하는 경우, 코드가 더 복잡해지거나 의존성 배열을 잘못 사용해서 비효율적인 코드를 짤 수도 있다. 또한, 불필요한 값을 메모이제이션 한다면 성능이 오히려 더 악화 될 수 있다.

따라서, 어떤 것이 작업중인 프로젝트에 적합한지 결정하기 전에 useCallback과 useMemo를 사용하는 것의 장점과 단점을 이해하는 것이 중요하다.

사실 이전까지 나는 프로젝트에서 useMemo와 useCallback를 마음대로 사용하면서 '이렇게 하면 최적화가 되겠지?' 라고 멋대로 생각하고 있었다. 하지만 useMemo와 useCallback을 때에 맞게 사용하는 것이 정말 중요하다는 것을 이번 포스팅을 통해 알 수 있었다.

<br />

---

### 참고

> - [Fibonacci and Memoization](https://medium.com/@porzingod/fibonacci-and-memoization-e99f765b97f6)
> - [`useMemo`와 `useCallback`은 언제 사용해야 할까?](https://puterism.com/use-memo-and-use-callback)
> - [React 공식 도큐 - useMemo](https://ko.reactjs.org/docs/hooks-reference.html#usememo)
> - [React 공식 도큐 - useCallback](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)
> - [React Hooks: useCallback 사용법](https://www.daleseo.com/react-hooks-use-callback/)
> - [리액트의 useCallback useMemo, 정확하게 사용하고 있을까](https://yceffort.kr/2022/04/best-practice-useCallback-useMemo)
> - [리액트의 useCallback, 언제 써야할까](https://mooneedev.netlify.app/Frontend/%EC%96%B8%EC%A0%9C%EC%8D%A8%EC%95%BC%ED%95%A0%EA%B9%8C%20useCallback/)
