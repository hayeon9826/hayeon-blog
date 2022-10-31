---
title: 'requestAnimationFrame으로 자연스러운 애니메이션 만들기 (feat: react-spring)'
date: '2022-10-31T11:45:32.169Z'
description: 'requestAnimationFrame이란?'
category: 'Javascript'
keywords: 'requestAnimationFrame, react-spring'
image: 'https://velog.velcdn.com/images/khy226/post/5ecbed3a-0038-4f84-a470-c5218e1b7a53/image.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/5ecbed3a-0038-4f84-a470-c5218e1b7a53/image.jpeg" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

## 들어가며

리액트에서 자연스러운 애니메이션을 작업할 수 있는 `react-spring` 라이브러리를 사용하던 중, react-spring의 `@react-spring/rafz`에서 **requestAnimationFrame**라는 브라우저 API 기술을 사용해 자연스러운 모션을 만든다는 것을 알게되었다.

<br />

> **참고:**
>
> **React-Spring 이란?** 자연스러운 애니메이션을 위해 스프링의 물리적 원리를 기반으로 만든 애니메이션 라이브러리이다.
> 공식 사이트에 의하면 아래와 같이 설명하고 있다:
>
> "react-spring is a spring-physics based animation library that should cover most of your UI related animation needs. It gives you tools flexible enough to confidently cast your ideas into moving interfaces."
>
> 공식 사이트 참고: https://react-spring.dev/

<br />

대략 아래와 같은 코드로 useTransition과 같은 메서드를 구현하고 있었다.

```javascript

/**
 * Schedule an update for next frame.
 * Your function can return `true` to repeat next frame.
 */
// 다음 프레임을 위한 스케줄
export const raf: Rafz = fn => schedule(fn, updateQueue)

// 여기서 window.requestAnimationFrame를 nativeRaf로 정의!!
let nativeRaf =
  typeof window != 'undefined'
    ? (window.requestAnimationFrame as NativeRaf)
    : () => {}


// 애니메이션 시작, 멈춤, loop 함수
function start() {
  if (ts < 0) {
    ts = 0
    if (raf.frameLoop !== 'demand') {
      nativeRaf(loop)
    }
  }
}

function stop() {
  ts = -1
}

function loop() {
  if (~ts) {
    nativeRaf(loop)
    raf.batchedUpdates(update)
  }
}


```

> 전체 코드는 [Github 링크](https://github.com/pmndrs/react-spring/blob/master/packages/rafz/src/index.ts)에서 확인할 수 있다.

<br />

위 코드를 보면 `window.requestAnimationFrame`로 nativeRaf를 정의하고, nativeRaf에 `loop` 함수를 감싸서 애니메이션 작동시키고 있다. 대략 보면 requestAnimationFrame으로 애니메이션을 실행하는 것처럼 보이는데, `requestAnimationFrame`은 도대체 무엇인지 더 구체적으로 알아보자.

<br />

## 배경

애니메이션을 구현하기 위해서는 크게 두 가지가 있다: **css와 javascript**를 사용하는 것이다. 주로 간단한 애니메이션의 경우, css의 `transform`, `translate`등을 이용해서 움직이는 효과를 낼 수 있다. 더 나아가 `transition-duration` 속성을 추가해 애니메이션의 속도를 조절할 수도 있다. 하지만 조금 더 복잡하거나 애니메이션을 더 섬세하기 조절하기 위해서는 javascript의 `setTimeout()` 이나 `setInterval()`를 이용할 수 있다.

주의해야 할 점은, Javascript의 setTimeout, setInterval 메서드는 로직이 복잡해지면 이벤트 루프의 delay에 의해서 부자연스러운 애니메이션을 만들 수 있다는 문제점이 있다는 것이다.

<br />

### setTimeout, setInterval 작동 원리 & 한계

Javascript에는 이벤트 루프가 있어 해당 루프에서 지속적으로 Javascript를 실행한다. 과거에는 애니메이션을 구현하기 위해서 대부분 `setTimeout()` 이나 `setInterval()`를 사용했다. 다들 알겠지만, `setTimeout()` 은 n 밀리초 뒤에 설정한 코드를 반복해서 실행하게 하는 함수이다. 예를 들어, 아래와 같이 애니메이션을 구현할 수 있었다.

```javascript
const startAnimation = () => {
  // ...
  setTimeout(startAnimation, 1000 / 60)
}

setTimeout(startAnimation, 1000 / 60)
```

동일하게,`setInterval()`도 같은 형태로 사용할 수 있다.

```javascript
const startAnimation = () => {
  // ...
}

setInterval(startAnimation, 1000 / 60)
```

만약 해당 애니메이션을 멈춰야 한다면, 아래와 같이 timer라는 변수에 setTimout 함수를 할당한 뒤, clearTimeout으로 setTimeout / setInterval 레퍼런스를 멈출 수 있었다.

```javascript
let timer

const startAnimation = () => {
  // ...
  timer = setTimeout(startAnimation, 1000 / 60)
}

timer = setTimeout(startAnimation, 1000 / 60)

// ...

clearTimeout(timer)
```

> **참고**
>
> `startAnimation()`에 정의된 1000 / 60 이라는 시간은 모니터의 주사율(초당 60 repaints를 실행함) 에 따라 적용되었다. '주사율'이란 화면에 1초 기준 얼마나 많은 장면을 표시할 수 있는지 나타내는 수치로, 단위는 Hz(헤르츠)를 사용한다. 예를 들어 60Hz 모니터는 1초 동안 60 단계로 쪼개서 화면을 보여줄 수 있다.
> 즉, 평균적으로 모니터는 60Hz의 주사율을 가지고 있기 때문에 밀리초 단위로 계산을 하면, 한 프레임을 표시하는데 16ms 정도가 걸리게 된다.

<br />

하지만, setTimout, setInterval은 paint와 render가 일어난 이후에 실행이 되기 때문에 애니메이션이 자연스럽지 못한 경우가 생길 수 있다. 아무리 정확한 밀리초를 적용하더라도 만약 브라우저가 다른 작업을 수행중인 경우, setTimout 호출이 repaint 시간에 맞추지 못해 다음 주기로 지연될 수도 있다.

<br />

![setTimeout chart](https://velog.velcdn.com/images/khy226/post/77f6fc0c-1331-4b44-ad38-9868f23947e0/image.png)

> 위 사진에서 초록색은 paint이고, 보라색은 render를 뜻한다. 그리고 노란 박스가 바로 setTimeout, setInterval을 뜻한다.

<br />

위 경우, setTimout이 하나의 프레임에 한번만 사용되었기 때문에 정상적으로 동작한다. 하지만 아래와 같이 애니메이션 호출이 지연된다면 어떻게 될까:

![](https://velog.velcdn.com/images/khy226/post/25df2c64-ba64-4f82-bf9c-0e22d0319e5a/image.png)

<br />

이벤트 루프의 코드 블러킹 때문에 특정 프레임에서 setTimeout이 실행되지 못하는 경우가 생길 수 있다. 이 경우, 애니메이션이 끊기는 현상이 발생한다.

![](https://velog.velcdn.com/images/khy226/post/e04965d5-3a48-46c0-9752-5ed8d17cc597/image.png)

<br />

더 나아가, 실행되지 않은 애니메이션이 다음 프레임에서 여러번 호출 될 수 가 있는데, 애니메이션이 버벅거리거나 원하지 않는 결과가 나올 수 있다. 즉, 하나의 프레임을 놓치게 되고 다음 프레임에서 애니메이션이 연속으로 두 번이나 호출되게 되어 부자연스럽고 버벅거리는 애니메이션을 보게 된다.

이러한 setTimout, setInterval의 문제점을 해결하기 위해서 `requestAnimationFrame`이 나왔다.

<br />
<br />

## requestAnimationFrame이란?

`window.requestAnimationFrame()`은 비교적 최근에 나온 브라우저 API로, 브라우저에게 수행하길 원하는 애니메이션을 알려주고, 다음 repaint가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출한다.

애니메이션 전용 API는 아니지만, 대부분 애니메이션 활용을 위해서 사용된다고 한다. 현재 대부분 브라우저에서 사용할 수 있다 (IE 10+ 포함)

<br />

<img src="https://velog.velcdn.com/images/khy226/post/f5aacbbc-9838-4c2c-86a8-b2c0eeb16445/image.png" style="width: 80%;">

<br />

`requestAnimationFrame`의 코드는 setTimeout, setInterval과 매우 유사한 방식으로 작성되지만, 실행되는 방식은 매우 다르다. 우선 코드를 확인해보자

```javascript
let req

const startAnimation = () => {
  req = requestAnimationFrame(startAnimation)
  // animate code
}

requestAnimationFrame(startAnimation)

// ...

cancelAnimationFrame(req) // 애니메이션 멈춤
```

<br />
<br />

코드만 살펴보면 setTimeout, setInterval과 다를게 없어 보인다. 하지만 가장 큰 차이점은, requestAnimationFrame은 render과 repaint **이전에** 실행이 된다는 것이다. 아래 사진을 참고하자:

![requestAnimationFrame chart](https://velog.velcdn.com/images/khy226/post/1a045b51-e8af-4e7b-8188-80af3a22e9d8/image.png)

<br />

보라색은 render를 뜻하고, 초록색은 paint를 뜻한다. 그리고 노란색이 바로 requestAnimationFrame을 보여준다. requestAnimationFrame의 애니메이션은 항상 **렌더링과 페인트 이전에 실행**이 되기 때문에 조금 더 예측 가능한 애니메이션을 만들 수 있다. 그리고 이벤트 루프의 코드 블러킹 현상 또한 걱정하지 않아도 된다.

따라서, requestAnimationFrame을 사용하면 지연 및 블로킹 현상이 나타나지 않아서 setTimeout, setInterval에 비해 더욱 부드러운 애니메이션을 제공한다.

<br />

### requestAnimationFrame의 최적화

requestAnimationFrame의 또 다른 장점은 CPU 전력 소모를 줄일 수 있다는 것이다. setInterval & setTimout 과는 다르게, `requestAnimationFrame`은 CPU에 매우 친화적이기 때문에 현재 창이나 탭이 보이지 않으면 애니메이션이 중지된다.

브라우저에서 여러 탭을 띄워놓고 있을 때 현재 웹페이지가 비활성화되면, setInterval 함수는 백그라운드에서 호출되는 순간마다 계속 실행된다. 반면에, `requestAnimationFrame` 함수는 **화면에 repaint가 일어날 때만 호출되므로 백그라운드에서 호출되지 않고 대기**한다. 특정 웹페이지에 들어갔다가 백그라운드에 켜놓으면 이유 없이 CPU와 전력을 소모하므로 사용자 관점에서는 `requestAnimationFrame`을 사용하는 것이 좋다.

따라서, `requestAnimationFrame`을 사용하면 브라우저는 리소스 사용을 더욱 최적화할 수 있고, 애니메이션을 더 부드럽게 만들 수 있다.

<br />

<br />

## requestAnimationFrame 사용 방법

### Syntax

requestAnimationFrame는 아래와 같이 사용한다

```javascript
requestAnimationFrame(callback)
```

애니메이션 콜백함수를 requestAnimationFrame로 감싸주면 된다.

<Br />

### Parameters

- requestAnimationFrame는 파라미터로 `callback`을 하나 받는데, 다음 repaint때 호출할 애니메이션 콜백 함수이다.

<br />

### Return Value

- requestAnimationFrame를 호출하면 해당 요청에 대한 id값이 `long` 정수 형태로 반환된다. 해당 id는 콜백 리스트에서 해당 요청을 구분할 수 있고, 아래와 같이 cancelAnimationFrame에 넣어서 콜백 요청을 취소할 수 있다.

```javascript
cancelAnimationFrame(requestID)
```

requestAnimationFrame를 호출하여 스케줄된 애니메이션 프레임 요청을 취소할 때는 cancelAnimationFrame를 사용한다.

<br />
<br />

## requestAnimationFrame 예시

아래처럼 requestAnimationFrame으로 파란색 원이 점점 커지게 하는 애니메이션을 적용할 수 있다. repaint 이전에 모든 애니메이션 함수가 호출되므로 부드럽게 작용한다. (gif로 따면서 약간 부자연스러워 지긴 했지만 [링크](https://codepen.io/hayeon9826/pen/mdKegWQ)로 들어가면 더 자세하기 볼 수 있다)

![](https://velog.velcdn.com/images/khy226/post/cf214b9f-c370-4522-b076-23d2e3220e34/image.gif)

<br />

코드는 아래와 같이 구성되어 있다.

- html 및 css:

```html
<div class="container">
  <div id="box"></div>
</div>
```

```css
#box {
  background: #007fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
```

- requestAnimationFrame 적용:

`box`라는 id를 가진 div 엘리먼트를 잡아서 2초 (2000 밀리초)동안 width, height를 늘리도록 하는 애니메이션이다. 박스는 0.1px/ms 속도로 width, height가 커지게 설계되어있다.

```javascript
// 세팅
var start = null
var element = document.getElementById('box')

// 애니메이션
function step(timestamp) {
  if (!start) start = timestamp
  var progress = timestamp - start
  // 박스 엘리먼트의 width, height 늘리기

  element.style.width = Math.min(progress / 10, 200) + 'px'
  element.style.height = Math.min(progress / 10, 200) + 'px'

  // 2000 밀리초 (2초) 동안만 실행
  if (progress < 2000) {
    window.requestAnimationFrame(step)
  }
}

// requestAnimationFrame 으로 애니메이션 시작
window.requestAnimationFrame(step)
```

> [codepen 링크](https://codepen.io/hayeon9826/pen/mdKegWQ)에서 더 자세히 확인할 수 있다.

<br />

## 마무리

- react-spring 덕분에 requestAnimationFrame이라는 개념을 자세히 알아볼 수 있어서 좋았다. 라이브러리 코드를 뜯어보면서 왜 이렇게 동작하는지 확인하면서 원리를 이해할 수 있었다.
- 기존에 setTimeout, setInterval를 사용하면 가끔 끊기는 느낌이 없지 않아 있었는데 확실히 requestAnimationFrame은 repaint 이전에 미리 적용이 돼서 애니메이션이 더 부드럽게 나온다
- requestAnimationFrame의 가장 큰 장점중 하나가 바로 CPU 리소스 및 배터리 수명을 지킬 수 있다는게 아닐까 싶다. 페이지가 비활성 상태가 되면 repaint가 일어나지 않으므로, 자동으로 requestAnimationFrame의 애니메이션 함수 호출도 중지된다는게 큰 장점이다. setInterval의 경우에는 비활성 상태에도 백그라운드에서 계속 실행이 되어서 사용하면서 리소스 낭비가 되지 않는지 따로 신경을 써줘야했는데, requestAnimationFrame은 알아서 일시 중지가 된다는게 편리했다.

---

## 참고

> - [react-spring/rafz 코드 예시](https://github.com/pmndrs/react-spring/blob/master/packages/rafz/src/index.ts)
> - [[HTML] requestAnimationFrame](https://velog.io/@0715yk/HTML-requestAnimationFrame)
> - [MDN: window.requestAnimationFrame()](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)
> - [The requestAnimationFrame() guide](https://flaviocopes.com/requestanimationframe/)
> - [시간을 다루는 방법 - setTimeout, setInterval, Request Animation Frame](https://blog.makerjun.com/411591d9-c47b-4d8d-8f9e-1246d8dd1a2f)
> - [[디스플레이 상식사전 #9] 주사율(Refresh Rate)](https://news.lgdisplay.com/kr/2022/02/%EB%94%94%EC%8A%A4%ED%94%8C%EB%A0%88%EC%9D%B4-%EC%83%81%EC%8B%9D%EC%82%AC%EC%A0%84/)
