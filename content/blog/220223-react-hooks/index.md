---
title: 자주 사용하는 React Hook 알아보기
date: '2022-02-23T22:45:32.169Z'
description: 'React Hook 이란? 🧐 Hook React 버전 16.8부터 React 요소로 새로 추가된 기능이다. 함수형 컴포넌트에서도 클래스형 컴포넌트의 기능을 사용할 수 있게 하는 몇 가지 기술을 Hook 이라고 부른다.'
category: 'React'
keywords: 'React, React hook, 리액트, 리액트 훅'
image: 'https://velog.velcdn.com/images/khy226/post/8b67ffd0-1c77-48d5-bf4c-f563d3f7a49e/img.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/8b67ffd0-1c77-48d5-bf4c-f563d3f7a49e/img.png" style=" padding-bottom: 50px;">

---

## 1. 콜백 함수란?

- 콜백함수: 다른 코드의 인자로 넘겨주는 함수.
- 다른 코드(함수 또는 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수.

## React Hook 이란? 🧐

Hook React 버전 16.8부터 React 요소로 새로 추가된 기능이다. <u>함수형 컴포넌트에서도 클래스형 컴포넌트의 기능을 사용할 수 있게 하는 몇 가지 기술</u>을 Hook 이라고 부른다.

덕분에 기존에 함수형 컴포넌트에서 할 수 없던 상태값 관리 (useState), 컴포넌트 생명 주기 함수 (useEffect) 등을 이용할 수 있게 되었다.

#### Hook 특징:

- Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수이다.
- Hook은 Class 안에서 동작하지 않는다.
- 대신 class 없이도 React를 사용할 수 있게 해준다.

> ### 함수형 컴포넌트와 클래스형 컴포넌트 차이:

#### 클래스형 :

- state, lifeCycle 관련 기능 사용 가능
- 메모리 자원을 함수형 컴포넌트보다 조금 더 사용
- 임의 메서드를 정의할 수 있음

#### 함수형 :

- state, lifeCycle 관련 기능사용 불가능 **(Hook을 통해 해결 됨)**
- 메모리 자원을 함수형 컴포넌트보다 덜 사용
- 컴포넌트 선언이 편함

#### 출처: [클래스형과 함수형 차이](https://velog.io/@sdc337dc/0.%ED%81%B4%EB%9E%98%EC%8A%A4%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)

<hr />

## Hook이 생긴 이유? 🤔

기존의 클래스형 컴포넌트에는 문제점이 꽤 있었다:

- 컴포넌트 사이에서 상태 로직을 재사용하기 어려움
- 복잡한 컴포넌트는 이해하기 어려움
- 사람과 기계를 혼동시킴 (클래스를 사용하기 위해서는 Javascript의 this 키워드 작동을 알아야 하는데, 사용자에게 큰 혼란을 주며, 코드의 재사용성과 구성이 어려움)
- 클래스의 문법이 어려움

이러한 문제점들을 해결하기 위해, 클래스 없이도 리액트의 여러 기능들을 사용할 수 있도록 Hook을 개발하였다.

> 그렇다고 Class 형 컴포넌트를 없애지는 않는다. React는 항상 하위 호환성을 중요시 하기 때문에, 앞으로도 계속 Class 컴포넌트를 지원한다고 한다. 다만, 앞으로 작성하는 코드에는 Hook을 활용하는 것이 좋다.

<hr />

## Hook 사용 규칙 ✌️

Hook은 그냥 JavaScript 함수이지만, 두 가지 규칙을 준수해야 한다.

- 최상위(at the top level) 에서만 Hook을 호출해야 한다. 즉, 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행할 수 없다.
- React 함수 컴포넌트 내에서만 Hook을 호출해야 한다. 일반 Javascript 함수 내에서는 호출할 수 없다.

<hr />

## 기본 Hook

### 📌 State Hook

`useState` 는 상태를 관리하는 Hook 이다. 기본적인 특징은 아래와 같다:

- 함수형 컴포넌트 (function component) 안에 state를 추가해서 사용한다.
- 현재 상태를 나타내는 `state` 값과, 이 값을 없데이트 하는 함수를 쌍으로 제공한다.
- `state`는 컴포넌트가 다시 렌더링 되어도 그대로 유지된다.
- `state`는 초기값을 받는다. (optional)
- `state`는 객체일 필요가 없다. 문자열, 숫자, null, 객체, 배열 등 여러가지 값을 넣을 수 있다.
- 초기값은 첫 번째 렌더링에만 딱 한번 사용된다.

그 특성들을 아래 예시에서 더 자세히 알아보자.

```jsx
import React, { useState } from 'react'

function Example() {
  // useState Hook을 React에서 가져옴
  // "count"라는 새 상태 변수 선언. 0으로 초기화
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        // 버튼 클릭시 setCount 함수를 호출하여 state 변수(count)를 갱신 // 새로운 count 변수를 Example 컴포넌트에
        넘기며 해당 컴포넌트를 리렌더링 Click me
      </button>
    </div>
  )
}
```

위 예시에서 `const [count, setCount] = useState(0);` 가 바로 state hook 이다. `useState`의 첫번째 인자 `count`는 상태를 나타내고, 두번째 인자 `setCount`는 해당 상태 값을 업데이트 하는 함수이다.

또한, `useState(0)`을 보면 초기값을 0으로 설정한 것을 알 수 있다. 카운터를 셀 때 0부터 세기 위해서 넣었고, 이 초기값은 첫 번째 렌더링에만 딱 한번 사용된다.

'Click me' 라는 버튼을 누르면 `onClick` 이벤트로 `setCount` 함수를 실행시킨다. 함수 안에는 `count + 1`이라고 적혀있는데, 기존 상태값 (count)에 1을 더해주는 함수이다. 즉, 버튼을 누를 때마다 count 상태 변수 값이 하나씩 올라가고 `<p>You clicked {count} times</p>` 에 보여지는 숫자가 1씩 증가한다.

<br />

```jsx
function ExampleWithManyStates() {
  // 상태 변수를 여러 개 선언했습니다!
  const [age, setAge] = useState(42)
  const [fruit, setFruit] = useState('banana')
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }])
  // ...
}
```

또한, 위 예시처럼 하나의 컴포넌트 내에서 여러개의 State Hook을 사용할 수도 있다.

<hr />

### ⚡️ Effect Hook

Effect Hook, 즉 `useEffect` 훅은 함수 컴포넌트 네에서 side effect를 수행할 수 있게 해준다.

> #### 리액트 Side Effect 란?
>
> React 컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 직접 조작하는 모든 동작을 “side effects”(또는 짧게 “effects”)라고 한다. 왜냐하면 해당 동작은 다른 컴포넌트에 영향을 줄 수도 있고, 렌더링 과정에서는 구현할 수 없는 작업이기 때문이다.

즉, 리액트 Class에서 사용했던 `componentDidMount` 나 `componentDidUpdate`, `componentWillUnmount` 를 하나의 API로 통합한 것이 `useEffect` 훅 이다. `useEffect`의 기본적인 특징은 아래와 같다.

- useEffect의 기본 형태는 useEffect(function, deps)로 사용한다. function에는 실행시킬 함수를 넣고, deps는 배열 형태로 나타내는데 검사하고자 하는 특정 값을 넣는다.

```jsx
useEffect(() => {
  console.log('hello') // function
}, []) // deps
```

- `deps` 를 생략하면 모든 렌더링에서 함수가 실행된다.

```jsx
// '리렌더링 될 때 마다' 실행됨
useEffect(() => {
  console.log('hello')
})
```

- `deps` 를 빈 배열([])로 설정하면 첫 렌더링에만 함수가 실행된다.

```jsx
// 처음 렌더링 될 때 '한번만' 실행됨
useEffect(() => {
  console.log('hello')
}, [])
```

- `deps` 에 원하는 props 혹은 state를 넣으면, 해당 값이 바뀔때 마다 함수가 실행된다.

```jsx
// count 라는 변수 (혹은 Props)가 업데이트 될때만 실행됨
useEffect(() => {
  console.log('hello')
}, [count])
```

- `return`을 사용해 클린업(clean-up) 함수 적용 (언마운트 될 때만 실행)

```jsx
// count 라는 변수 (혹은 Props)가 업데이트 될때만 실행됨
useEffect(() => {
  console.log('hello')
  return console.log('bye') // 클린업 함수.
})
```

특정값이 업데이트 되기 직전에 클린업 함수를 실행시키고 싶다면, 뎁스에 특정 값을 넣어주면 된다.

> #### 클린업 (clean-up) 함수란?

- 기존 React의 Class에서는 흔히 componentDidMount에 구독(subscription)을 설정한 뒤 componentWillUnmount에서 이를 정리(clean-up) 한다.
- 이와 동일하게, effect 함수에서도 추가적인 클린업이 필요할 경우, return 이후에 클린업 함수를 적용하면 된다.
- React는 컴포넌트가 **마운트 해제**되는 때에 정리(clean-up)를 실행한다. 그리고 그 정리(clean-up)는 한번만이 아니라, 모든 리렌더링시에 실행된다.

#### 클린업 (clean-up) 함수가 필요한 경우?

외부 데이터에 구독(subscription)을 설정해야 하는 경우에 클린업 함수가 필요하다. 이런 경우에 메모리 누수가 발생하지 않도록 정리(clean-up)하는 것은 매우 중요하기 때문.

DOM을 업데이트한 뒤에 문서의 타이틀을 바꾸는 컴포넌트를 예제를 살펴보자.

```jsx
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  // componentDidMount, componentDidUpdate와 비슷합니다
  useEffect(() => {
    // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

위 `useEffect`함수는 `deps`를 생략했기 때문에 모든 리렌더링에서 아래 함수를 실행한다.

```jsx
;() => {
  // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
  document.title = `You clicked ${count} times`
}
```

기존 클래스 생명주기(LifeCycle)로 치자면 `componentDidMount`와 `componentDidUpdate` 일때 해당 함수를 실행시켜주는 것이다.

위 예제를 실행하면, 화면 첫 렌더링 시 useState의 초기값 '0'이 문서 타이틀에 나타난다. 그리고 버튼을 클릭할 때마다 setCount 함수를 호출해 count 변수를 바꿔주고, DOM을 바꾼 뒤에 “effect” 함수를 실행해 변경된 count 값을 문서 타이틀에 보여준다.

그 외에도 아래와 같은 특성을 띈다:

- Effects는 컴포넌트 안에 선언되어있기 때문에 props와 state에 접근할 수 있다.
- 기본적으로 React는 매 렌더링 이후에 effects를 실행한다. (첫 번째 렌더링도 포함)
- Effect를 “해제”할 필요가 있다면, 해제하는 함수를 반환해주면 됨 (optional)
- `useState`와 마찬가지로 컴포넌트 내에서 여러개의 effect를 사용 가능

<hr />

## 추가 Hooks

### useContext

`useContext`는 기존의 React에 존재하는 Context를 더 편하게 사용할 수 있게 한다.

Context란, 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있는 것을 뜻한다. context API를 사용하기 위해서는 `Provider` , `Consumer` , `createContext` 세 가지 개념을 알고 있어야 한다.

- createContext : context 객체를 생성
- Provider : 생성한 context를 하위 컴포넌트에게 전달
- Consumer : context의 변화를 감시하는 컴포넌트

아래 예제를 통해 더 자세히 알아보자.

#### App.js

```jsx
import React, { createContext } from 'react'
import Children from './Children'

// AppContext 객체 생성
export const AppContext = createContext()

const App = () => {
  const user = {
    name: '사용자',
    age: '25',
  }

  return (
    <>
      // context provider 에 user 값을 전달
      <AppContext.Provider value={user}>
        <div>
          <Children />
        </div>
      </AppContext.Provider>
    </>
  )
}

export default App
```

#### Children.js

```jsx
import React, { useContext } from 'react'
import { AppContext } from './App'

const Children = () => {
  // useContext를 이용해서 props를 불러옴
  const user = useContext(AppContext)
  return (
    <>
      <h3>user의 name은 {user.name}입니다.</h3>
      <h3>user의 age는 {user.age}입니다.</h3>
    </>
  )
}

export default Children
```

#### 결과

```
user의 name은 사용자입니다.
user의 age는 25입니다.
```

<hr />

### useReducer

`useReducer` 는 `useState`의 대체 함수(hook)이다. 기능은 비슷하나, 더 복잡한 함수를 필요로 할때 useReducer를 쓴다. 기본 구조는 다음과 같다.

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

useState와 동일하게, state를 관리하고 업데이트할 수 있다. 다수의 하윗값을 포함하는 <u>복잡한 정적 로직</u>을 만들거나, 다음 state가 <u>이전 state에 의존적</u>인 경우에 useState 대신 `useReducer`를 사용한다.

앞서 살펴본 `useContext` 와 같이 사용되는 경우가 많다.

기존 `useState`로 만든 카운터를 `useReducer`로 변경하면 아래와 같다.

```jsx
const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}
```

<hr />

### useCallback

`useCallback`을 사용하면 메모이제이션된 콜백을 반환한다. 즉, `useCallback`은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다.

> #### 메모이제이션이란?
>
> 메모이제이션(memoization)은 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다.
> 출처: [위키](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)

useCallback은 `useCallback(fn, deps)` 와 같은 형태로 사용하는데, useEffect와 마찬가지로 함수와 의존성 배열을 인자로 갖는다.

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b) // function
  },
  [a, b], // deps
)
```

#### 그렇다면 왜 useCallback을 사용해야할까?

하위 컴포넌트에 전달하는 콜백 함수가 inline 함수로 사용되거나 컴포넌트 내에서 함수를 직접 생성하고 있다면, 컴포넌트가 리렌더링 될 때 마다 새로운 함수가 만들어진다.

함수를 반복적으로 재선언하는 것 보다, 한번 만든 함수를 재사용하고 필요할 때만 재생성 하는것이 더 효율적이다. 따라서, useCallback으로 특정 함수를 재사용할 수 있다.

<hr />

### useMemo

`useMemo`는 <u>메모이제이션</u>된 값을 반환한다. 즉, 성능 최적화를 위해 연산된 값을 재사용하는 기능을 가진 훅이다.

> #### memoization 이란?
>
> memoization이란 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법을 말한다.
> memoization을 절적히 적용하면 중복 연산을 피할 수 있기 때문에 메모리를 조금 더 쓰더라도 애플리케이션의 성능을 최적화할 수 있습니다.
> 출처: [React(44) 리액트 훅 - useMemo 란?](https://devbirdfeet.tistory.com/136)

React에서는 컴포넌트가 여러번 렌더링 될 수 있는데, 렌더링 될 때마다 함수를 호출해 반복적으로 연산을 한다. 이때, `useMemo`를 활용해 매번 연산을 하지 않고, 연산된 값을 재사용할 수 있다.

사용법은 아래와 같다. 첫번째 파라미터에는 연산 함수를 넣고, 두번째에는 deps 배열을 넣어주면 된다. 해당 배열안의 내용이 변경될 때마다 등록한 연산 함수를 호출해 값을 연산한다.

```jsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b), // 함수
  [a, b],
) // deps
```

참고:

- 배열이 없는 경우, 매 렌더링 마다 새 값을 계산한다.
- 의존성 배열의 값은 함수에 인자로 전달되지 않는다.
- 단, 함수 안에서 참조되는 모든 값은 의존성 값의 배열에 나타나야 한다.

<hr />

### useRef

`useRef`는 특정 DOM을 선택할 수 있게 하는 훅이다. useRef는 'reference'의 줄임말인데, 말 그대로 무엇인가를 참조할 때 사용된다.

javscript에서 특정 DOM 요소를 선택해야할 때 DOM Selector를 사용해본적이 있을 것이다. React 프로젝트에서도 특정 요소를 잡아 포커싱을 하거나, 선택해야하는 상황이 있다. 이런 상황에서 `useRef` 함수를 사용할 수 있다.

아래 예제를 통해 사용법을 알아보자.
버튼을 누르면 input 태그에 focus를 하는 기능이다.

```jsx
function TextInputWithFocusButton() {
  // 1. Ref 객체 생성
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // 3. Ref 객체의 `current` 는 우리가 선택한 DOM (즉, input)을 가리킴
    // 4. 해당 DOM에게 포커싱을 해주는 DOM API focus()를 호출
    inputEl.current.focus()
  }
  return (
    <>
      // 2. 선택하고 싶은 DOM에 (여기서는 input) 속성으로 ref값 설정
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>인풋 포커스</button>
    </>
  )
}
```

1. 우선 useRef() 함수로 사용할 하나의 const 객체와 focus 함수를 실행할 핸들러 함수(onButtonClick)를 작성해주었다.
2. 선택하고 싶은 DOM 요소에 ref 속성을 주어 ref 값을 설정한다. (input)
3. '인풋 포커스' 라는 버튼을 누르면 onClick 리스너에 의해 onButtonClick 함수가 실행되는데, 2.에서 설정한 ref 값의 'current', 즉 우리가 방금 선택한 DOM을 가리킨다.
4. 그리고 해당 DOM 요소에 focus() 함수를 호출해 input 창을 포커싱한다.

useRef 함수는 current 속성을 가지고 있는 객체를 반환하는데, 인자로 넘어온 초기값을 current 속성에 할당한다. 반환된 객체는 값을 변경해도 다시 렌더링 되지 않는다.또한, React 컴포넌트가 다시 렌더링 되어도, 해당 current 속성값이 변하지 않는다. 이러한 특성을 정리하자면 아래와 같다.

- useRef는 내용 변경되어도 그것을 알려주지는 않는다.
- current 프로퍼티를 변형해도 리렌더링을 발생시키지 않는다. 따라서, 리렌더링할 필요가 없는 변수르르 useRef로 관리할 수도 있다.

<hr />

그 외에도 `useImperativeHandle`, `useImperativeHandle`, `useDebugValue` 등 여러가지 훅이 있다. 자세한 내용은 [공식 도큐](https://ko.reactjs.org/docs/hooks-reference.html)를 참고하면 좋다.

또한, 앞서 설명한 훅 뿐만 아니라, 나만의 훅을 직접 만들 수도 있고 다른 사람들이 만든 여러가지 훅들이 있다. (예시: https://github.com/rehooks/awesome-react-hooks). 내가 원하는 훅이 있는지 확인하고 프로젝트에 활용해봐도 좋을 것 같다.

<hr />

## 참고

> - [리액트 공식 도큐 - Hooks API Reference](https://ko.reactjs.org/docs/hooks-reference.html)
> - [useEffect란](https://velog.io/@jmean12/useEffect%EB%9E%80)
> - [React (Hooks) - useContext 란?](https://velog.io/@jminkyoung/TIL-6-React-Hooks-useContext-%EB%9E%80)
> - [18. useCallback 을 사용하여 함수 재사용하기](https://react.vlpt.us/basic/18-useCallback.html)
> - [메모이제이션 - 위키백과](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)
> - [React.useCallback 이란?](https://velog.io/@rjsdnql123/TIL-React.useCallback-%EC%9D%B4%EB%9E%80)
> - [React(44) 리액트 훅 - useMemo 란?](https://devbirdfeet.tistory.com/136)
> - [React Hooks: useRef() 함수](https://xiubindev.tistory.com/98)
