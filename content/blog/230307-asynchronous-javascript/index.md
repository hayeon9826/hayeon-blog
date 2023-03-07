---
title: '[번역] 비동기 자바스크립트 이해하기 (Understanding Asynchronous JavaScript)'
date: '2023-0307T11:45:32.169Z'
description: '[번역] 비동기 자바스크립트 이해하기 (Understanding Asynchronous JavaScript)'
category: 'Javascript'
keywords: 'Javascript, asynchronous'
image: 'https://velog.velcdn.com/images/khy226/post/b8498b36-46f8-46f2-b612-834e4c60e997/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/b8498b36-46f8-46f2-b612-834e4c60e997/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

## 들어가며

> 본 게시글은 [Understanding Asynchronous JavaScript - Learn How JavaScript Works](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)를 번역한 글입니다.

자바스크립트는 한 번에 하나의 일만 처리하는 것을 의미하는 **싱글 스레드 프로그래밍** 언어이다. 즉, 자바스크립트 엔진은 단일 스레드에서 한 번에 하나의 명령만 처리할 수 있다.

단일 스레드 언어는 동시성 문제에 대해 걱정할 필요가 없기 때문에 코드를 단순화하지만, 메인 스레드를 차단하지 않고 네트워크 작업을 하는 등 긴 처리작업을 수행할 수 없음을 의미한다.

API에서 데이터를 요청하는 것을 상상해 보자. 상황에 따라 서버가 요청을 처리하는 동안 메인 스레드를 차단하여 웹 페이지가 응답하지 않을 수 있다.

이럴때를 대비해서 비동기 자바스크립트를 사용하는 것이다. callback, Promise 및 async/await와 같은 **비동기 자바스크립트**를 사용하면 메인 스레드를 차단하지 않고 처리시간이 긴 네트워크 요청을 수행할 수 있다.

훌륭한 자바스크립트 개발자가 되기 위해 이 모든 개념을 배울 필요는 없지만, 아는 것은 매우 큰 도움이 된다 :)

<br />

## 자바스크립트와 동기 (Synchronous)

그렇다면 **동기(synchronous) 자바스크립트**는 어떻게 작동할까?

비동기 자바스크립트로 들어가기 전에, 먼저 동기 자바스크립트 코드가 자바스크립트 엔진 내에서 어떻게 실행되는지 이해해 보자.

- 예시:

```javascript
const second = () => {
  console.log('Hello there!')
}
const first = () => {
  console.log('Hi there!')
  second()
  console.log('The End')
}
first()
```

위의 코드가 자바스크립트 엔진 내부에서 어떻게 실행되는지 이해하기 위해서는 **실행 컨텍스트**(execution context)와 **콜 스택**(call stack, 실행 스택이라고도 함)의 개념을 이해해야 한다.

<br />

### 실행 컨텍스트 (execution context)

실행 컨텍스트는 자바스크립트 코드가 평가되고 실행되는 환경의 추상적인 개념이다. 자바스크립트에서 실행되는 모든 코드는 **실행 컨텍스트** 내에서 실행된다.

함수 코드는 **함수 실행 컨텍스트** 내에서 실행되고, 전역 코드는 **전역 실행 컨텍스트** 내에서 실행된다. 즉, 각 함수에는 고유한 실행 컨텍스트가 있다.

<br />

### 콜 스택 (call stack)

**콜 스택**은 코드 실행 중에 생성된 모든 실행 컨텍스트를 저장하는 데 사용되는 **LIFO(Last in, First Out)** 구조의 스택이다.

자바스크립트는 단일 스레드 프로그래밍 언어이기 때문에 **단일 콜 스택**을 가지고 있다. 콜 스택은 LIFO 구조를 가지며, 이는 항목들이 스택의 맨 위에서만 추가되거나 제거될 수 있음을 의미한다.

위의 코드 예시로 돌아가서 자바스크립트 엔진 내에서 코드가 어떻게 실행되는지 이해해 보자.

```javascript
const second = () => {
  console.log('Hello there!')
}
const first = () => {
  console.log('Hi there!')
  second()
  console.log('The End')
}
first()
```

![call stack example](https://velog.velcdn.com/images/khy226/post/1684828d-b8aa-4b56-9f4a-bb6bd9c0fabc/image.png)

> <small>이미지 참고: [Understanding Asynchronous JavaScript](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)</small>

<br />

### 그래서 어떻게 동작하는 걸까?

이 코드가 실행되면 전역 실행 컨텍스트가 생성되고(`main()`으로 표현됨) 콜 스택의 맨 위로 올라가게 된다. 이어서 `first()` 호출이 발생하면 또다시 콜 스택의 맨 위로 올라가게 된다.

그런 다음 `console.log('Hi there!')`를 스택의 맨 위로 밀어넣고, 완료되면 스택에서 제거가 된다 (pop). 그 다음에, `second()`를 호출하므로, `second()` 함수는 스택의 맨 위로 푸시된다.

`console.log('Hello there!')`는 스택의 맨 위로 올라가고, 완료되면 스택에서 제거된다 (pop). 동일하게, `second()` 함수가 완료되면 스택에서 제거된다.

`console.log('The End')`가 스택의 맨 위로 푸시되고 완료되면 다시 스택에서 제거된다. 그 후 `first()` 함수가 실행 완료 되면 스택에서 제거됩니다.

프로그램은 이 시점에서 실행을 완료하므로 전역 실행 컨텍스트(`main())`가 스택에서 제거된다.

<br />

## 자바스크립트와 비동기 (Asynchronous)

이제 콜 스택에 대한 기본적인 개념과 JavaScript의 동기 작동 방식이 어떻게 진행되는지 알게 되었으니, JavaScript의 비동기(Asynchronous)에 대해서 알아보자.

<br />

### 자바스크립트에서 비동기가 불가능한 이유? (Blocking)

Blocking 이란 무엇일까? 개념을 알아보기 위해 아래 예시를 살펴보자.
아래처럼 이미지 처리 또는 네트워크 요청을 동기식으로 수행한다고 가정해보자.

- 예시:

```javascript
const processImage = image => {
  /**
   * doing some operations on image
   **/
  console.log('Image processed')
}
const networkRequest = url => {
  /**
   * requesting network resource
   **/
  return someData
}
const greeting = () => {
  console.log('Hello World')
}
processImage(logo.jpg)
networkRequest('www.somerandomurl.com')
greeting()
```

이미지 처리 및 네트워크 요청을 수행하는 데에는 시간이 걸린다. 따라서, `processImage()` 함수가 호출되면 이미지 크기에 따라 시간이 많이 걸릴 수 있다.

`processImage()` 함수가 실행 완료되면 스택에서 제거된다. 그런 다음 `networkRequest()` 함수가 호출되고 스택에 추가된다. 동일하게, 해당 함수 실행을 완료하는 데도 시간이 걸릴 것이다.

마지막으로 `networkRequest()` 기능이 완료되면 `greeting()` 함수가 호출되는데,`console.log` 문만 포함되므로 `greeting()` 함수는 즉시 실행되어 반환된다.

따라서 `processImage()` 또는 `networkRequest()`와 같은 처리가 긴 함수는 실행이 완료될 때까지 기다려야 한다. 즉, **처리시간이 긴 함수들이 콜 스택이나 메인 스레드를 차단하고 있다는 것**을 의미한다. 위의 코드가 실행되는 동안에는 다른 작업을 수행할 수 없으며, 이는 매우 불편하다.

<br />

### 그래서 해결방안은?

가장 간단한 해결책은 **비동기 콜백(asynchronous callbacks)** 이다. 비동기 콜백을 사용하여 코드를 blocking 하지 않으며 실행할 수 있다.

- 예시:

```javascript
const networkRequest = () => {
  setTimeout(() => {
    console.log('Async Code')
  }, 2000)
}
console.log('Hello World')
networkRequest()
```

위 예시에서 네트워크 요청을 시뮬레이션하기 위해 `setTimeout` Web API를 사용했다. `setTimeout`은 JavaScript 엔진의 일부가 아니라 **Web API**(브라우저에서) 혹은 C/C++ API(node.js에서)이다.

이 코드가 어떻게 실행되는지 이해하려면 **이벤트 루프** 및 **콜백 큐**(태스크 큐 또는 메시지 큐라고도 함)와 같은 몇 가지 개념을 더 이해해야 한다.

![event loop example](https://velog.velcdn.com/images/khy226/post/9de1dd8b-5369-4aeb-a6e5-74076e296160/image.png)

> <small>이미지 참고: [Understanding Asynchronous JavaScript](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)</small>

**이벤트 루프**, **웹 API** 및 **메시지 큐/태스크 큐**는 JavaScript 엔진의 일부가 아니라 **브라우저의 JavaScript 런타임 환경** 또는 Nodejs JavaScript 런타임 환경의 일부이다.(Nodej의 경우) (Nodejs에서는 웹 API가 C/C++ API로 대체된다.)

이제 위의 코드로 돌아가서 어떻게 **비동기적인 방식**으로 실행되는지 확인해보자.

```javascript
const networkRequest = () => {
  setTimeout(() => {
    console.log('Async Code')
  }, 2000)
}
console.log('Hello World')
networkRequest()
console.log('The End')
```

![event loop gif](https://miro.medium.com/v2/resize:fit:720/1*sOz5cj-_Jjv23njWg_-uGA.gif)

> <small>이미지 출처: [Understanding Asynchronous JavaScript](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)</small>

브라우저에서 위 코드가 로드되면 `console.log('Hello World')`가 스택으로 푸시되어 실행되고, 실행이 종료된 후 스택에서 제거(pop off)된다. 다음으로 `networkRequest()`에 대한 호출이 발생하므로 스택의 맨 위로 푸시된다.

다음 `setTimeout()` 함수가 호출되어 스택의 맨 위로 푸시된다. 이때, `setTimeout()`에는 1) callback 과 2) milliseconds 시간(밀리초)의 두 가지 인수가 있다.

`setTimeout() `메서드는 Web API 환경에서 2초(`2s`)의 타이머를 시작한다. 이때, `setTimeout()` 실행이 완료되면 스택에서 제거된다. 그 후에는 `console.log('The End')`가 스택에 푸시되어 실행되고 완료된 후 스택에서 제거된다.

그러는 동안 타이머가 만료되어 콜백이 **메시지 큐**로 푸시된다. 그러나 콜백은 즉시 실행되지 않으며, 여기서 **이벤트 루프**가 시작된다.

<br />

### 이벤트 루프

**이벤트 루프(event loop)** 의 역할은 콜 스택을 조사하고 **콜 스택이 비어 있는지 여부를 확인**하는 것이다. 콜 스택이 비어 있으면, 실행 대기 중인 보류 중인 콜백이 있는지 확인하기 위해 메시지 큐를 조사한다.

위 예시의 경우, 메시지 큐에 콜백이 하나 포함되어 있으며, 해당 시점에서 콜 스택은 비어 있다. 따라서 이벤트 루프는 콜백을 스택의 맨 위로 밀어 넣는다.

그 후 `console.log('Async Code')`가 스택의 맨 위에 푸시되어 실행되고, 실행이 완료되면 스택에서 분리된다. 이 시점에서 콜백이 완료되어 스택에서 제거되고 프로그램이 마침내 완료된다.

<br />

### DOM 이벤트

**메시지 큐(Message Queue)** 에는 클릭 이벤트 및 키보드 이벤트와 같은 DOM 이벤트의 콜백도 포함된다.

- 예시:

```javascript
document.querySelector('.btn').addEventListener('click', event => {
  console.log('Button Clicked')
})
```

DOM 이벤트에서 이벤트 리스너(event listener)는 웹 API 환경에서 특정 이벤트(ex. 클릭 이벤트)가 발생하기를 기다린다. 이때, 이벤트가 발생하면 콜백 함수는 실행 대기 중인 메시지 큐에 배치된다.

동일하게, 이벤트 루프는 콜 스택이 비어 있는지 확인하고, 비어 있고 콜백이 실행되면 이벤트 콜백을 스택으로 밀어넣는다.

이렇게, 메시지 큐를 사용하여 실행 대기 중인 모든 콜백을 저장하는 비동기 콜백과 DOM 이벤트가 어떻게 실행되는지 배웠다.

<br />

### ES6의 태스크 큐

ES6는 자바스크립트에서 프로미스(Promise)가 사용하는 **job queue/micro-task queue** 의 개념을 도입하였다. 메시지 큐과 작업 큐의 차이점은, 작업 큐가 메시지 큐보다 우선 순위가 높다는 것이다. 즉, **job queue/micro-task queue 내의 Promise 작업이 메시지 큐 내의 콜백 전에 실행**된다는 것을 의미한다.

- 예시:

```javascript
console.log('Script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
new Promise((resolve, reject) => {
  resolve('Promise resolved')
})
  .then(res => console.log(res))
  .catch(err => console.log(err))
console.log('Script End')
```

- 결과:

```javascript
Script start
Script End
Promise resolved
setTimeout
```

**Promise 응답**이 메시지 큐보다 우선 순위가 높은 **마이크로 태스크 큐** 안에 저장되기 때문에, promise가 `setTimeout` 전에 실행된다는 것을 알 수 있다.

이번에는 두 가지 promise와 두 가지 `setTimeout`으로 다른 예를 들어 보자.

- 예시:

```javascript
console.log('Script start')
setTimeout(() => {
  console.log('setTimeout 1')
}, 0)
setTimeout(() => {
  console.log('setTimeout 2')
}, 0)
new Promise((resolve, reject) => {
  resolve('Promise 1 resolved')
})
  .then(res => console.log(res))
  .catch(err => console.log(err))
new Promise((resolve, reject) => {
  resolve('Promise 2 resolved')
})
  .then(res => console.log(res))
  .catch(err => console.log(err))
console.log('Script End')
```

결과:

```javascript
Script start
Script End
Promise 1 resolved
Promise 2 resolved
setTimeout 1
setTimeout 2
```

이벤트 루프가 메시지 큐/태스크 큐의 작업보다 **마이크로 태스크 큐(micro-task queue)** 의 작업을 우선시하기 때문에 `setTimeout`의 콜백 전에 두 promise들이 먼저 실행된다는 것을 알 수 있다.

만약 이벤트 루프가 마이크로 태스크 큐에서 태스크를 실행하는 동안 다른 promise가 해결된다면, 해당 promise는 동일한 마이크로 태스크 큐 끝에 추가될 것이다. 따라서, 콜백이 실행되기를 기다리는 시간에 관계없이 **메시지 큐 내의 콜백 전에 실행**될 것이다.

- 예시:

```javascript
console.log('Script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
new Promise((resolve, reject) => {
  resolve('Promise 1 resolved')
}).then(res => console.log(res))
new Promise((resolve, reject) => {
  resolve('Promise 2 resolved')
})
  .then(res => {
    console.log(res)
    return new Promise((resolve, reject) => {
      resolve('Promise 3 resolved')
    })
  })
  .then(res => console.log(res))
console.log('Script End')
```

- 결과:

```javascript
Script start
Script End
Promise 1 resolved
Promise 2 resolved
Promise 3 resolved
setTimeout
```

따라서 **마이크로 태스크 큐(micro-task queue)의 모든 태스크는 메시지 큐의 태스크보다 먼저 실행**된다. 즉, 이벤트 루프는 메시지 큐에서 콜백을 실행하기 전에 먼저 마이크로 태스크 큐를 비운다.

## 마무리하며

해당 포스트를 통해 비동기 자바스크립트가 어떻게 작동하는지 그리고 자바스크립트 런타임 환경을 함께 만드는 콜 스택, 이벤트 루프, 메시지 큐/태스크 큐, 작업 큐/마이크로 태스크 큐와 같은 다른 개념들을 배웠다. 훌륭한 자바스크립트 개발자가 되기 위해 이 모든 개념을 배울 필요는 없지만, 이러한 개념을 아는 것은 큰 도움이 될 것이다:)

---

## 출처

- [Understanding Asynchronous JavaScript](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)
