---
title: 2022 프론트엔드 취준 기록
date: '2022-06-10T22:45:32.169Z'
description: 3개월 간의 취준을 마치며
category: 'Career'
image: 'https://velog.velcdn.com/images/khy226/post/69c95fd5-5f8d-4008-979b-8c5f3dfdc10e/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/69c95fd5-5f8d-4008-979b-8c5f3dfdc10e/image.png" style="width: 60%; padding-bottom: 50px;">

## **들어가며**

본 게시글은 [useEffect 완벽 가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/#tldr-too-long-didnt-read---%EC%9A%94%EC%95%BD) 를 정리 & 요약하는 글입니다.

---

## **요약 (TL;DR)**

> 💡 **🤔 질문: `useEffect` 로 `componentDidMount` 동작을 흉내내려면 어떻게 하지?**

- `useEffect(fn, [])` 를 사용해서 비슷하게 흉내낼 수 있음.
- 차이점은, `componentDidMount` 와는 달리 prop, state를 잡아두기 때문에 초기 prop, state를 확인할 수 있음
- 즉, 비슷하긴 하나, useEffect는 `componentDidMount` 및 다른 라이프사이클 모델과 다르다.

<br />

> 💡 **🤔 질문: `useEffect` 안에서 데이터 페칭은 어떻게 할까? 두번째 인자로 오는 배열(`[]`) 은 뭘까?**

- useEffect 사용 원리 설명 글: [https://www.robinwieruch.de/react-hooks-fetch-data/](https://www.robinwieruch.de/react-hooks-fetch-data/)
- [ ]는 빈 의존성 배열로, useEffect에 리액트 데이터 흐름에 관여하는 어떠한 값도 사용하지 않겠다는 뜻. 즉, 다른 props & state에 영향받지 않고 처음 컴포넌트가 새롭게 생성되는 시점에 **한 번** 실행됨
- 잘못된 방식으로 의존성 체크를 생략하는 것 보다 의존성을 필요로 하는 상황을 제거하는 몇 가지 전략을(주로 `useReducer`, `useCallback`) 사용하는게 권장됨

<br />

> 💡 **🤔 질문: 의존성 배열에 함수를 명시해도 될까?**

- prop & state를 필수로 요구하지 않는 함수는 컴포넌트 바깥에서 선언 후 호이스팅 권장
- useEffect 안에서 사용되는 함수는 useEffect 내부에 선언하는 것 권장
- 만약 useEffect가 render 스코프 안에 있는 함수를 사용하고 있다면, 함수를 useCallback으로 감싸야 함

<br />

> 💡 **🤔 질문: 왜 가끔씩 데이터 페칭이 무한루프에 빠지는걸까?**

- useEffect를 사용할 때 두번째 인자로 의존성 배열을 전달하지 않으면 무한루프에 빠질 수 있음. **의존성 배열이 없다면 useEffect는 매 렌더마다 실행**되기 때문
- 또한, 항상 바뀌는 값을 의존성 배열안에 넣으면 무한루프에 빠질 수 있음
- 해결방안: 의존 값을 지우는 것 보다는, 무한루프 문제의 근원을 파악해서 해결
  - ex) 함수 때문에 무한 루프 빠지면, 이펙트 안에 함수를 집어 넣거나, 호이스팅 하거나, useCallback을 사용할 수 있음. 객체의 경우 useMemo 사용

<br />

> 💡 **🤔 질문: 왜 가끔씩 이펙트 안에서 이전 state나 prop 값을 참조할까?**

- useEffect는 항상 렌더링이 일어날 때 마다 prop과 state를 지켜본다.
  - 해결방안: 의존성 배열에 올바른 값 넣었는지 확인해야함
  - exhaustive-deps 린트 규칙 사용해서 방지할 수 있음
- 만약 변경된 prop, state를 사용하고 싶다면 가변성 ref에 넣어서 관리할 수 있음

---

## **모든 렌더링은 고유의 Prop과 State가 있다**

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

- 위 예제에서 count는 그저 ‘숫자'임. 데이터 바인딩을 하지 않음
- 버튼을 클릭해서 state를 업데이트 할 때마다, 리액트는 컴포넌트를 호출한다. 따라서, setCount를 호출하면 변경된 count 값과 함께 컴포넌트를 호출하고 DOM을 업데이트 하는 것
- 즉, 컴포넌트가 다시 호출되고, 각각의 랜더링마다 격리된 고유의 `count`값을 “보는” 것임

<br />

## **모든 렌더링은 고유의 이벤트 핸들러를 가진다**

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count)
    }, 3000)
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  )
}
```

위 코드는 3초뒤에 count 값과 alert를 띄워주는 코드이다.

- 만약 아래 설명대로 실행을하면 alert에 어떤 숫자가 띄워질까?
  - 카운터를 3으로 증가시킴
  - show alert 버튼 누름
  - 3초 타임아웃 전에 카운터를 5로 증가시킴
- 예제 링크: [https://codesandbox.io/s/w2wxl3yo0l](https://codesandbox.io/s/w2wxl3yo0l)
- 놀랍게도, ‘show alert’을 눌렀을 당시의 state를 잡아두기 때문에 5가 아닌 ‘3’이 alert에 나온다.

그렇다면 왜 이런 결과가 나왔을까?

- 위에서 말했듯이, `count`값은 매번 별개의 함수 호출마다 존재하는 상수값이다.
- **우리의 함수는 여러번 호출되지만(랜더링마다 한 번씩), 각각의 랜더링에서 함수 안의 `count` 값은 상수이자 독립적인 값(특정 랜더링 시의 상태)으로 존재한다.**
- 따라서 효과적으로, 각각의 랜더링은 고유한 “버전”의 `handleAlertClick`을 리턴한다. 그리고 각각의 버전은 고유의 `count`를 “기억” 한다

```tsx
// 3이 나오는 이유

// 처음 랜더링 시
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 0)
    }, 3000)
  }
  // ...
  ;<button onClick={handleAlertClick} /> // 0이 안에 들어있음
  // ...
}

// 클릭하면 함수가 다시 호출된다
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 1)
    }, 3000)
  }
  // ...
  ;<button onClick={handleAlertClick} /> // 1이 안에 들어있음
  // ...
}

// 또 한번 클릭하면, 다시 함수가 호출된다
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 2)
    }, 3000)
  }
  // ...
  ;<button onClick={handleAlertClick} /> // 2가 안에 들어있음
  // ...
}
```

즉, 이벤트 핸들러가 특정 랜더링에 “속해 있으며”, 얼럿 표시 버튼을 클릭할 때 *그 랜더링 시점의*
 `counter`state를 유지한 채로 사용하는 것

- 위 예제를 통해 알 수 있듯이, **특정 랜더링 시 그 내부에서 props와 state는 영원히 같은 상태로 유지된다.**
- props와 state가 랜더링으로부터 분리되어 있다면, 이를 사용하는 어떠한 값(이벤트 핸들러를 포함하여)도 분리되어 있는 것

## **모든 렌더링은 고유의 이펙트를 가진다**

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

그렇다면 위 예제에서 effect가 어떻게 최신의 `count` 상태를 읽을 수 있을까?

- 데이터 바인딩? 옵저버? 가변값? ⇒ 모두 아님!
- 위에서 말했듯이, `count`는 특정 컴포넌트 랜더링에 포함되는 상수임. 이펙트에도 똑같은 개념 적용
- ***이펙트 함수 자체가* 매 랜더링마다 별도로 존재하고, 각각의 이펙트 버전은 매번 렌더링에 ‘속한’ count값을 ‘보게’ 된다.**
- 즉, 이펙트는 매 렌더링 마다 다른 함수이며, 각각의 이펙트 함수는 그 랜더링에 “속한” props와 state를 “본다”.

아래와 같은 단계로 count 값이 변경되어 화면에 보여진다

```tsx
// 최초 랜더링 시
function Counter() {
  // ...
  useEffect(
    // 첫 번째 랜더링의 이펙트 함수
    () => {
      document.title = `You clicked ${0} times`
    },
  )
  // ...
}

// 클릭하면 함수가 다시 호출된다
function Counter() {
  // ...
  useEffect(
    // 두 번째 랜더링의 이펙트 함수
    () => {
      document.title = `You clicked ${1} times`
    },
  )
  // ...
}

// 또 한번 클릭하면, 다시 함수가 호출된다
function Counter() {
  // ...
  useEffect(
    // 세 번째 랜더링의 이펙트 함수
    () => {
      document.title = `You clicked ${2} times`
    },
  )
  // ..
}
```

#### 첫번째 렌더링 실행 과정:

> - 리액트: state가 `0` 일 때의 UI를 보여줘.

- 컴포넌트
  - 여기 랜더링 결과물로 `<p>You clicked 0 times</p>` 가 있어.
  - 그리고 모든 처리가 끝나고 이 이펙트를 실행하는 것을 잊지 마: `() => { document.title = 'You clicked 0 times' }`.
- 리액트: 좋아. UI를 업데이트 하겠어. 이봐 브라우저, 나 DOM에 뭘 좀 추가하려고 해.
- 브라우저: 좋아, 화면에 그려줄게.
- 리액트: 좋아 이제 컴포넌트 네가 준 이펙트를 실행할거야.
  - `() => { document.title = 'You clicked 0 times' }` 를 실행하는 중.

#### 버튼 클릭 시 렌더링 실행 과정:

> - 컴포넌트: 이봐 리액트, 내 상태를 `1` 로 변경해줘.

- 리액트: 상태가 `1` 일때의 UI를 줘.
- 컴포넌트
  - 여기 랜더링 결과물로 `<p>You clicked 1 times</p>` 가 있어.
  - 그리고 모든 처리가 끝나고 이 이펙트를 실행하는 것을 잊지 마: `() => { document.title = 'You clicked 1 times' }`.
- 리액트: 좋아. UI를 업데이트 하겠어. 이봐 브라우저, 나 DOM에 뭘 좀 추가하려고 해.
- 브라우저: 좋아, 화면에 그려줄게.
- 리액트: 좋아 이제 컴포넌트 네가 준 이펙트를 실행할거야.
  - `() => { document.title = 'You clicked 1 times' }` 를 실행하는 중.

## **모든 렌더링은 고유의 … 모든 것을 가진다**

그렇다면 과연 아래 코드를 여러번 실행하면 어떤 결과가 나올까?

```tsx
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`)
    }, 3000)
  })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

- 예제 링크: [https://codesandbox.io/s/lyx20m1ol](https://codesandbox.io/s/lyx20m1ol)
- 답: 콘솔에 로그가 순서대로 (1, 2, 3, 4, 5) 나온다.

그렇다면 클래스 컴포넌트로 만들면 어떻게 동작할까?

```tsx
componentDidUpdate() {
  setTimeout(() => {
     console.log(`You clicked ${this.state.count} times`);
  }, 3000);
}
```

- 예제 링크: [https://codesandbox.io/s/kkymzwjqz3](https://codesandbox.io/s/kkymzwjqz3)
- 답: 놀랍게도 콘솔에 1, 2, 3, 4, 5 라고 나오지 않고, 5, 5, 5, 5, 5 마지막 숫자만 5번 나온다.
  - 이유는 `this.state.count`값은 특정 랜더링 시점의 값이 아니라 언제나 최신의 값을 가리키기 때문. 그래서 매번 5가 찍혀있는 로그를 보게 된다.
  - 이 예시에서 발생한 진짜 문제의 근원은 클로저 자체가 아니라 가변값 변경(mutation)이기 때문
  - 위 문제점은 ‘클로저'를 사용해서 해결할 수 있다. ([https://codesandbox.io/s/w7vjo07055](https://codesandbox.io/s/w7vjo07055))

## **클린업(Cleanup)이란?**

- 본질적으로 클린업의 목적은 구독과 같은 이펙트를 “되돌리는” 것

```tsx
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.id, handleStatusChange)
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.id, handleStatusChange)
  }
})
```

과연 클린업 단계는 아래와 같이 일어날까?

- 리액트가 `{id: 10}` 을 다루는 이펙트를 클린업한다.
- 리액트가 `{id: 20}` 을 가지고 UI를 랜더링한다.
- 리액트가 `{id: 20}` 으로 이펙트를 실행한다.

#### ⇒ 놀랍게도 위 단계는 틀렸다!

- 리액트는 [브라우저가 페인트 하고 난 뒤에야](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f) 이펙트를 실행 (덕분에 대부분의 이펙트가 스크린 업데이트를 가로막지 않기 때문에 앱을 빠르게 만들어 줌)
- 따라서, **이전 이펙트는 새 prop과 함께 리랜더링 되고 난 *뒤에* 클린업됨**

<br />

#### 옳은 클린업 단계는 아래와 같음:

- 리액트가 `{id: 20}` 을 가지고 UI를 랜더링한다.
- 브라우저가 실제 그리기를 한다. 화면 상에서 `{id: 20}` 이 반영된 UI를 볼 수 있다.
- 리액트는 `{id: 10}` 에 대한 이펙트를 클린업한다.
- 리액트가 `{id: 20}` 에 대한 이펙트를 실행한다.

어떻게 위와 같은 단계가 일어날까?

> 💡 컴포넌트가 랜더링 안에 있는 **모든** 함수는 (이벤트 핸들러, 이펙트, 타임아웃이나 그 안에서 호출되는 API 등) 랜더가 호출될 때 정의된 props와 state 값을 잡아두기 때문에!

즉, 이펙트의 클린업은 “최신” prop을 읽지 않는다. 클린업이 정의된 시점의 랜더링에 있던 값을 읽는 것

```jsx
// 첫 번째 랜더링, props는 {id: 10}
function Example() {
  // ...
  useEffect(
    // 첫 번째 랜더링의 이펙트
    () => {
      ChatAPI.subscribeToFriendStatus(10, handleStatusChange)
      // 첫 번째 랜더링의 클린업
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(10, handleStatusChange)
      }
    },
  )
  // ...
}

// 다음 랜더링, props는 {id: 20}
function Example() {
  // ...
  useEffect(
    // 두 번째 랜더링의 이펙트
    () => {
      ChatAPI.subscribeToFriendStatus(20, handleStatusChange)
      // 두 번째 랜더링의 클린업
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(20, handleStatusChange)
      }
    },
  )
  // ...
}
```

## **lifecycle이 아니라, 동기화**

- **리액트는 우리가 지정한 props와 state에 따라 DOM과 동기화한다**
- 즉, 렌더링 시 “마운트” 와 “업데이트” 의 구분이 없음

**`useEffect` 는 리액트 트리 바깥에 있는 것들을 props와 state에 따라 *동기화* 할 수 있게한다.**

```jsx
function Greeting({ name }) {
  useEffect(() => {
    document.title = 'Hello, ' + name
  })
  return <h1 className="Greeting">Hello, {name}</h1>
}
```

- 위 코드는 친숙한 *마운트/업데이트/언마운트* 멘탈 모델과는 다르다
- **만약 컴포넌트가 첫 번째로 랜더링할 때와 그 후에 다르게 동작하는 이펙트를 작성하려고 한다면, 흐름을 거스르는 것!**
- 컴포넌트를 prop A, B, C 순서로 렌더링하던지, 바로 C로 렌더링하던지 별로 신경쓰이지 않아야 함. 잠깐 차이가 있을 수 있지만(예: 데이터를 불러올 때), 결국 마지막 결과물은 같아야 함.

단, 모든 이펙트를 *매번* 랜더링마다 실행하는 것은 효율이 떨어질 수 있음. 이는 아래와 같이 해결할 수 있음

## **리액트에게 이펙트 비교하는 법 가르치기**

- 리액트는 매번의 리렌더링마다 DOM 전체를 새로 그리는 것이 아니라, 리액트가 실제로 바뀐 부분만 DOM을 업데이트함

리액트의 리렌더링 예시)

아래의 컴포넌트를

```html
<h1 className="Greeting">Hello, Dan</h1>
```

이렇게 바꾼다면

```html
<h1 className="Greeting">Hello, Yuzhi</h1>
```

리액트는 두 객체를 비교함

```jsx
const oldProps = { className: 'Greeting', children: 'Hello, Dan' }
const newProps = { className: 'Greeting', children: 'Hello, Yuzhi' }
```

각각의 prop을 짚어보고 `children` 이 바뀌어서 DOM 업데이트가 필요하다고 파악했지만 `className` 은 그렇지 않음. 그래서 그저 아래의 코드만 호출됨

```jsx
domNode.innerText = 'Hello, Yuzhi'
// domNode.className 은 건드릴 필요가 없다
```

<Br />

**그렇다면 이펙트에도 위와 같은 방법을 적용할 수 있을까?**

- 답: **의존성 배열**로 불필요한 useEffect 실행을 방지할 수 있음!

위에서 말한 객체 비교 방식과는 다르게, 이펙트끼리 비교는 불가능함

- 리액트는 함수를 호출해보지 않고 함수가 어떤 일을 하는지 알아낼 수 없기 때문

```jsx
let oldEffect = () => {
  document.title = 'Hello, Dan'
}
let newEffect = () => {
  document.title = 'Hello, Dan'
}
// 리액트가 이 배열을 같은 배열이라고 인식할 수 있을까?
```

그래서 특정한 이펙트가 불필요하게 다시 실행되는 것을 방지하고 싶다면 의존성 배열을(“deps” 라고 알려짐) `useEffect`의 인자로 전달할 수 있음!

```jsx
useEffect(() => {
  document.title = 'Hello, ' + name
}, [name]) // 우리의 의존성
```

- **이건 마치 우리가 리액트에게 “이봐, 네가 이 함수의 *안을* 볼 수 없는 것을 알고 있지만, 랜더링 스코프에서 `name` 외의 값은 쓰지 않는다고 약속할게.” 라고 말하는 것과 같음**

따라서, 현재와 이전 이펙트 발동 시 이 값들이 같다면 동기화할 것은 없으니 리액트는 이펙트를 스킵할 수 있음

```jsx
const oldEffect = () => {
  document.title = 'Hello, Dan'
}
const oldDeps = ['Dan']

const newEffect = () => {
  document.title = 'Hello, Dan'
}
const newDeps = ['Dan']

// 리액트는 함수 안을 살펴볼 수 없지만, deps를 비교할 수 있다.
// 모든 deps가 같으므로, 새 이펙트를 실행할 필요가 없다.
```

## **리액트에게 의존성으로 거짓말하지 마라**

deps를 지정한다면, **컴포넌트에 있는 *모든* 값 중 그 이펙트에 사용될 값은 *반드시* 거기 있어야 함!**

- 하지만 아래 예시처럼 의존성 배열에 값을 생략하는 경우가 여럿 있음

```jsx
function SearchResults() {
  async function fetchData() {
    // ...
  }

  useEffect(() => {
    fetchData()
  }, []) // 이게 맞을까요? 항상 그렇진 않지요. 그리고 더 나은 방식으로 코드를 작성하는 방법이 있습니다.

  // ...
}
```

- 위 코드는 데이터 불러오는 로직이 무한 루프에 빠질 수도 있고, 소켓이 너무 자주 반응할 수도 있음
- 마운트 될 때만 이펙트를 실행시키고 싶다고 해도, 의존성을 제거하는건 방법이 아님. (해결 방법은 다음 챕터에서 확인)

또 다른 문제점 예시:

count를 1초마다 1씩 올리는 에펙트 코드를 짜고 싶다고 하자.

```jsx
const count = // ...
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])
```

- 위 예시에서 빈 의존성 배열을 적용하면, 리액트는 배열. 비교하고 다음 이펙트를 업데이트 하지 않을 것임
- 따라서 아래와 같이 한 번만 적용이되고 끝남

![https://overreacted.io/29e53bd0c9b7d2ac70d3cd924886b030/interval-wrong.gif](https://overreacted.io/29e53bd0c9b7d2ac70d3cd924886b030/interval-wrong.gif)

## **의존성을 솔직하게 적는 두 가지 방법**

1. **첫 번째 방법은 컴포넌트 안에 있으면서 이펙트에서 사용되는 *모든* 값이 의존성 배열 안에 포함되도록 고치는 것**

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1)
  }, 1000)
  return () => clearInterval(id)
}, [count])
```

- `count`를 deps에 추가함으로서 의존성 배열을 올바르게 만듦.
- 이제 `count` 값은 이펙트를 다시 실행하고 매번 다음 인터벌에서 `setCount(count + 1)`
   부분은 해당 랜더링 시점의 `count` 값을 사용

![https://overreacted.io/5734271ddfa94d2d65ac6160515e0069/interval-rightish.gif](https://overreacted.io/5734271ddfa94d2d65ac6160515e0069/interval-rightish.gif)

원하는대로 동작하는 것 처럼 보이겠지만, `count` 값이 바뀔 때마다 인터벌은 해제되고 다시 설정됨.

#### 그렇다면 이를 해결하기 위한 두번째 전략은?

**2) 두 번째 전략은 이펙트의 코드를 바꿔서 우리가 원하던 것 보다 자주 바뀌는 값을 *요구하지* 않도록 만드는 것**

- 의존성 배열에 거짓말을 하지 않고 그냥 의존성을 *더 적게* 넘겨주도록 바꾸면 됨

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1)
  }, 1000)
  return () => clearInterval(id)
}, [])
```

- 1과는 달리, 이펙트의 의존성에서 `count` 를 제거하도록 만들었음
  - 왜냐하면 count는 단지 setCount를 위해서 존재함. 이 경우에는 스코프 안에서 count를 쓸 필요가 없음. 따라서, count를 제거하고 setCount 에 **_함수 형태의 업데이터_**를 사용하면 됨
  - 이펙트는 더 이상 랜더링 스코프에서 `count`값을 읽어 들이지 않음

![https://overreacted.io/f128ad20c28317ed27a3cb68197fc906/interval-right.gif](https://overreacted.io/f128ad20c28317ed27a3cb68197fc906/interval-right.gif)

위 두 방법을 통해 \**의존성을 제거하지 않고도 실제로 *문제를 해결했음!\*

## **액션을 업데이트로부터 분리**

- 기존 counter 예제에서 step 이라는 상태 변수를 추가해보았다 (인터벌은 `step`입력값에 따라 `count`값을 더함)

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step)
    }, 1000)
    return () => clearInterval(id)
  }, [step])
  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  )
}
```

- 예제 링크: [https://codesandbox.io/s/zxn70rnkx](https://codesandbox.io/s/zxn70rnkx)

코드 설명:

- step을 이펙트 안에서 사용하고 있기 때문에 의존성 배열에 추가
- 따라서, step이 변경되면 인터벌을 다시 시작함

하지만,

> `step`이 바뀐다고 인터벌 시계가 초기화되지 않는 것을 원한다면?

> 이펙트의 의존성 배열에서 `step`을 제거하려면?

정답: **어떤 상태 변수가 다른 상태 변수의 현재 값에 연관되도록 설정하려고 한다면, 두 상태 변수 모두 `useReducer` 로 교체할 수 있음**

```tsx
const [state, dispatch] = useReducer(reducer, initialState)
const { count, step } = state

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' }) // setCount(c => c + step) 대신에
  }, 1000)
  return () => clearInterval(id)
}, [dispatch])
```

- **리액트는 컴포넌트가 유지되는 한 `dispatch` 함수가 항상 같다는 것을 보장함**
- 따라서 위의 예제에서 인터벌을 다시 구독할 필요조차 없음.
- 의존성 배열에서 제거할 수도 있고, 위 예시처럼 명시할 수도 있음

#### useReducer가 하는일은?

- 이펙트 안에서 상태를 읽는 대신 *무슨 일이 일어났는지* 알려주는 정보를 인코딩하는 *액션을* 디스패치함
- 이렇게 하여 이펙트는 `step` 상태로부터 분리되어 있게됨
- 이펙트는 *어떻게* 상태를 업데이트 할지 신경쓰지 않고, 단지 *무슨 일이 일어났는지 알려줌*. 그리고 리듀서가 업데이트 로직을 모아둠

```tsx
const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
```

## **함수를 이펙트 안으로 옮기기**

- 흔한 실수 중 하나가 함수는 의존성에 포함되면 안된다고 생각하는 것

```tsx
function SearchResults() {
  const [data, setData] = useState({ hits: [] });

  async function fetchData() {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=react',
    );
    setData(result.data);
  }

  useEffect(() => {
    fetchData();
  }, []); // 이게 괜찮을까?
```

- 위 코드는 일단 잘 동작한다.
- 하지만, 아래 예시처럼 fetchData 함수가 더 커지거나, state/props를 사용한다면 동기화가 되지 않는 문제가 생길 수 있다.

```tsx
// 문제점 예시

function SearchResults() {
  const [query, setQuery] = useState('react')

  // 이 함수가 길다고 상상해 봅시다
  function getFetchUrl() {
    return 'https://hn.algolia.com/api/v1/search?query=' + query
  }

  // 이 함수가 길다고 상상해 봅시다
  async function fetchData() {
    const result = await axios(getFetchUrl())
    setData(result.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ...
}
```

해결 방안: useEffect 안에서만 사용하는 함수는 이펙트 안에 넣자

```tsx
function SearchResults() {
  // ...
  useEffect(() => {
    // 아까의 함수들을 안으로 옮겼어요!
    function getFetchUrl() {
      return 'https://hn.algolia.com/api/v1/search?query=react'
    }
    async function fetchData() {
      const result = await axios(getFetchUrl())
      setData(result.data)
    }
    fetchData()
  }, []) // ✅ Deps는 OK
  // ...
}
```

- 함수를 이펙트 안에 넣음으로써 변동하는 ‘의존성'에 신경 쓸 필요가 없음.

만약 query 라는 새로운 state를 사용한다고 하면, 해당 상태만 의존성 배열에 추가해주면 됨

```tsx
function SearchResults() {
  const [query, setQuery] = useState('react')

  useEffect(() => {
    function getFetchUrl() {
      return 'https://hn.algolia.com/api/v1/search?query=' + query
    }

    async function fetchData() {
      const result = await axios(getFetchUrl())
      setData(result.data)
    }

    fetchData()
  }, [query]) // ✅ Deps는 OK
  // ...
}
```

- 위 예시처럼 작업해주면, query가 바뀔 때 마다 데이터를 다시 fetching 할 수 있음
- `eslint-plugin-react-hooks`플러그인의 `exhaustive-deps`린트 룰 덕분에 에디터에서 빠져있는 의존성 분석이 가능함

## **하지만 저는 이 함수를 이펙트 안에 넣을 수 없어요**

- 때때로, 함수를 이펙트 안에 넣고 싶지 않을 수 있음
- 예를 들어, 한 컴포넌트에서 여러개의 이펙트에서 같은 함수/prop 호출이 필요하지만 **로직을 복붙하고 싶지 않을 때**

예시: 두 이펙트가 getFetchUrl 함수를 호출

```tsx
function SearchResults() {
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query
  }

  useEffect(() => {
    const url = getFetchUrl('react')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, []) // 🔴 빠진 dep: getFetchUrl

  useEffect(() => {
    const url = getFetchUrl('redux')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, []) // 🔴 빠진 dep: getFetchUrl

  // ...
}
```

- 위 예시는 getFetchUrl이 의존성 배열에 빠져있기 때문에, 동기화가 되지 않는다.

그렇다면 아래처럼 의존성 배열에 함수를 추가한다면?

```tsx
function SearchResults() {
  // 🔴 매번 랜더링마다 모든 이펙트를 다시 실행한다
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query
  }
  useEffect(() => {
    const url = getFetchUrl('react')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, [getFetchUrl]) // 🚧 Deps는 맞지만 너무 자주 바뀐다

  useEffect(() => {
    const url = getFetchUrl('redux')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, [getFetchUrl]) // 🚧 Deps는 맞지만 너무 자주 바뀐다

  // ...
}
```

- 위 경우에는, 렌더링이 너무 자주 바뀌게 된다. 따라서 좋은 방법이 아님

#### 두 가지 해결책이 있음:

1. 함수를 컴포넌트 스코프 외부에 작성한다
2. useCallback 훅을 사용한다.

먼저, 함수를 컴포넌트 스코프 외부로 끌어올리면 이펙트 안에서 자유롭게 사용할 수 있음

```tsx
// ✅ 데이터 흐름에 영향을 받지 않는다
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query
}
function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, []) // ✅ Deps는 OK

  useEffect(() => {
    const url = getFetchUrl('redux')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, []) // ✅ Deps는 OK

  // ...
}
```

- 저 함수는 랜더링 스코프에 포함되어있지 않으며 데이터 흐름에 영향을 받을 수 없기 때문에 deps에 명시할 필요가 없음

(중요) 두번째로는 useCallback 훅으로 함수를 감쌀 수 있음

```tsx
function SearchResults() {
  const [query, setQuery] = useState('react')

  // ✅ query가 바뀔 때까지 항등성을 유지한다
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query
  }, [query]) // ✅ 콜백 deps는 OK

  useEffect(() => {
    const url = getFetchUrl('react')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, [getFetchUrl]) // ✅ 이펙트의 deps는 OK

  useEffect(() => {
    const url = getFetchUrl('redux')
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, [getFetchUrl]) // ✅ 이펙트의 deps는 OK

  // ...
}
```

### useCallback

- useCallback은 의존성 체크에 레이어를 하나 더 더하는 것
- 함수의 의존성을 제거하는 것 보다는, 함수가 필요할 때만 변경할 수 있도록 함
- 위 예제에서, useCallback deps에 query를 포함했다. 즉, query가 바뀔 때 마다 getFetchUrl을 사용하는 이펙트가 다시 실행된다.
- 반대로 말하면, query값이 가으면 getFetchUrl 함수는 이전과 동일하며 이펙트도 실행되지 않는다.

## **함수도 데이터 흐름의 일부인가?**

- 위에서 설명한 데이터 패턴은 클래스 컴포넌트에서 사용하면 제대로 동작하지 않는다.
- 즉, 이펙트와 라이프사이클은 다르게 동작한다
- 아래는 위의 코드를 클래스 컴포넌트로 치환한 예시이다

```tsx
class Parent extends Component {
  state = {
    query: 'react',
  }
  fetchData = () => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query
    // ... 데이터를 불러와서 무언가를 한다 ...
  }
  render() {
    return <Child fetchData={this.fetchData} />
  }
}

class Child extends Component {
  state = {
    data: null,
  }
  componentDidMount() {
    this.props.fetchData()
  }
  render() {
    // ...
  }
}
```

useEffect는 componentDidMount와 componentDidUpdate가 섞여 있다고 알려져 있다. 하지만 신기하게도 위 로직은 componentDidUpdate에서는 동작하지 않는다

```tsx
class Child extends Component {
  state = {
    data: null,
  }
  componentDidMount() {
    this.props.fetchData()
  }
  componentDidUpdate(prevProps) {
    // 🔴 이 조건문은 절대 참이 될 수 없다
    if (this.props.fetchData !== prevProps.fetchData) {
      this.props.fetchData()
    }
  }
  render() {
    // ...
  }
}
```

- fetchData는 클래스 메서드이고, state가 바뀐다고 이 메서드가 달라지지 않는다
- `this.props.fetchData`는 `prevProps.fetchData`와 같기 때문에 절대 다시 데이터를 페칭하지 않는다
- 위 조건문을 제거한다면 매번 렌더링 할 때마다 데이터를 불러오게 된다. (이것도 해결책 아님)

#### 해결방안: query 자체를 Child 컴포넌트에 넘기는 방법.

`Child`컴포넌트가 `query`를 직접 사용하지 않음에도 불구하고 `query`가 바뀔 때 다시 데이터를 불러오는 로직은 해결할 수 있음

```jsx
class Parent extends Component {
  state = {
    query: 'react',
  }
  fetchData = () => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query
    // ... 데이터를 불러와서 무언가를 한다 ...
  }
  render() {
    return <Child fetchData={this.fetchData} query={this.state.query} />
  }
}

class Child extends Component {
  state = {
    data: null,
  }
  componentDidMount() {
    this.props.fetchData()
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.props.fetchData()
    }
  }
  render() {
    // ...
  }
}
```

- **클래스 컴포넌트에서, 함수 prop 자체는 실제로 데이터 흐름에서 차지하는 부분이 없다**
- 메소드는 가변성이 있는 `this`변수에 묶여 있기 때문에 함수의 일관성을 담보할 수 없게 됨. 그러므로 우리가 함수만 필요할 때도 “차이” 를 비교하기 위해 온갖 다른 데이터를 전달해야 함
- 이때, **`useCallback` 을 사용하면, 함수는 명백하게 데이터 흐름에 포함됨**
- 만약 함수의 입력값이 바뀌면 함수 자체가 바뀌고, 만약 그렇지 않다면 같은 함수로 남아있다고 말 할 수 있음

비슷하게, `useMemo`또한 복잡한 객체에 대해 같은 방식의 해결책을 제공함

```jsx
function ColorPicker() {
  // color가 진짜로 바뀌지 않는 한
  // Child의 얕은 props 비교를 깨트리지 않는다
  const [color, setColor] = useState('pink')
  const style = useMemo(() => ({ color }), [color])
  return <Child style={style} />
}
```

## **경쟁 상태(race condition)에 대해**

아래는 클래스로 데이터를 불러오는 전통적인 예제임

```jsx
class Article extends Component {
  state = {
    article: null,
  }
  componentDidMount() {
    this.fetchData(this.props.id)
  }
  async fetchData(id) {
    const article = await API.fetchArticle(id)
    this.setState({ article })
  }
  // ...
}
```

- 위 코드에는 버그가 있음. 컴포넌트 업데이트 상황을 다루지 않았음
- componentDidUpdate를 추가하면 아래처럼 변경할 수 있음
  <Br />

```jsx
class Article extends Component {
  state = {
    article: null,
  }
  componentDidMount() {
    this.fetchData(this.props.id)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id)
    }
  }
  async fetchData(id) {
    const article = await API.fetchArticle(id)
    this.setState({ article })
  }
  // ...
}
```

- 하지만, 위 코드에도 역시 버그가 있음. ‘순서'를 보장할 수 없기 때문
- ex) 만약 `{id: 10}`으로 데이터를 요청하고 `{id: 20}`으로 바꾸었다면, `{id: 20}`의 요청이 먼저 시작된다. 그래서 먼저 시작된 요청이 더 늦게 끝나서 잘못된 상태를 덮어씌울 수 있다
- 이를 **경쟁 상태**라고 하며, (보통 비동기 호출의 결과가 돌아올 때까지 기다린다고 여김) 위에서 아래로 데이터가 흐르면서 `async`/ `await`이 섞여있는 코드에 흔히 나타난다.

위 경쟁상태를 해결하기 위해서는:

- 비동기 접근 방식에 ‘취소' 기능을 지원해, 클린업 함수에서 바로 비동기 함수를 취소하는 방법
- 또는, boolean 값으로 흐름이 멈춰야 하는 타이밍 조절하기

```jsx
function Article({ id }) {
  const [article, setArticle] = useState(null)

  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      const article = await API.fetchArticle(id)
      if (!didCancel) {
        setArticle(article)
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, [id])

  // ...
}
```

---

### 출처

> - [useEffect 완벽 가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/)
