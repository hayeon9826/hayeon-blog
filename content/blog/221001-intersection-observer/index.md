---
title: 'Intersection Observer란? (feat: 무한 스크롤 만들기)'
date: '2022-10-01T11:45:32.169Z'
description: Intersection Observer를 이용해서 무한 스크롤을 만들어보자
category: 'Javascript'
keywords: 'Intersection Observer, 무한 스크롤, infinite scroll'
image: 'https://velog.velcdn.com/images/khy226/post/2fd1db86-796e-4fdf-97d7-556afcc03e7c/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/2fd1db86-796e-4fdf-97d7-556afcc03e7c/image.png" style="width: 40%; padding-bottom: 50px;"/>

## TL;DR

- `addEventListener()`의 `scroll` 이벤트를 이용해서 무한 스크롤을 구현할 수 있지만, reflow 등의 성능 문제가 발생
- 이를 해결하기 위해서 Intersection observer를 사용할 수 있음
- Intersection observer는 브라우저 뷰포트(Viewport)와 원하는 요소(Element)의 교차점을 관찰하며, 요소가 뷰포트에 포함되는지 아닌지 구별하는 기능을 제공함
- `new IntersectionObserver(callback, options)` 방식으로 관찰자를 초기화하고, 관찰할 대상을 지정할 수 있음.
- `boundingClientRect` 등의 메서드를 사용하면, reflow를 일으키지 않고 관찰 대상의 경계를 계산할 수 있음
- 따라서, 무한 스크롤 혹은 특정 요소를 관찰하고 싶을 때는 Intersection observer API 사용을 권장함

<br />

## javascript로 무한 스크롤을 구현한다면?

웹사이트에서 특정 위치 (예를 들면 웹사이트 맨 밑부분)에 도달했을 때 다음 페이지 데이터를 가져오는 '무한 스크롤' 기능을 구현한다고 해보자. 가장 잘 알려진 방법으로는 Javascript 문법 중 `addEventListener()`의 `scroll` 이벤트를 이용해서 구현할 수 있을 것이다.

추가로, `Element.getBoundingClientRect()` 메서드는 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환하는데, `getBoundingClientRect()` 를 통해 우리가 원하는 특정 위치를 정할 수도 있다.

정리하자면, document에 스크롤 이벤트를 등록하여 엘리먼트의 현재 지점을 관찰하고, 엘리먼트가 특정 위치에 도달했을 때 실행할 콜백함수를 등록하여 구현할 수 있다. 구체적인 내용은 아래의 예시 코드를 확인해보자.

```html
<!-- 빈 리스트 -->
<ul id="infinite-list"></ul>
```

```javascript
// 빈 리스트 선택
const listElem = document.querySelector('#infinite-list')

// 20개의 아이템 추가 함수
let nextItem = 1

const loadMore = function () {
  for (let i = 0; i < 20; i++) {
    let item = document.createElement('li')
    item.innerText = 'List Item #' + nextItem++
    listElm.appendChild(item)
  }
}

// ul 리스트 바닥까지 스크롤 했는지 확인
listElm.addEventListener('scroll', function () {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadMore()
  }
})

// 아이템 20개씩 더 가져오는 loadMore함수 실행
loadMore()
```

구현된 리스트는 아래와 같다. (더 자세한 코드는 아래 codepen 링크를 참고!)

<img src="https://velog.velcdn.com/images/khy226/post/0c030214-ca8a-4bc5-85ab-f289500e514c/image.gif" style="width: 50%; margin: 0 auto;"/>

> [Codepen 링크에서 동작 확인하기](https://codepen.io/hayeon9826/pen/jOxxEXq)

<br />

## 기존 scroll 의 문제점

하지만 위와같이 `scroll` 이벤트를 사용하거나, 요소 위치를 계산하는 `getBoundingClientRect()`와 같은 메서드를 사용하면 **성능 문제**가 발생한다.

`scroll` 이벤트의 경우 단시간에 수백번 호출이 되며 동기적으로 실행된다. 또한, 각 엘리먼트 마다 이벤트가 등록되어 있는 경우, 사용자가 스크롤할 때마다 이벤트가 끊임없이 호출되기 때문에 몇배로 성능 문제가 발생한다. 특정 지점을 관찰하는 `getBoundingClientRect()` 역시 계산을 할 때마다 **리플로우** 현상이 일어난다는 단점이 있다. 따라서, 위에 작성한 모든 코드는 **메인 스레드**에서 실행되기 때문에, 이 중 하나라도 호출되면 성능 문제를 일으킬 수 있다.

> **리플로우(reflow)**: 리플로우는 문서 내 요소의 위치와 도형을 다시 **계산**하기 위한 웹브라우저 프로세스의 이름으로, 문서의 일부 또는 전체를 **다시 렌더링**하는 데 사용됩니다. (..생략) 간혹 문서에 있는 단일 요소를 리플로우하려면 상위 요소 및 이어지는 모든 요소도 리플로우해야 할 수 있습니다.
> _출처: [브라우저 리플로우 최소화 [Google Developers]](https://developers.google.com/speed/docs/insights/browser-reflow)_

<br />

특정 뷰포트에 들어오면 박스 색깔을 바꾸는 예시를 통해 알아보자.

![scroll event test](https://velog.velcdn.com/images/khy226/post/66a3db89-614a-45d4-969e-8140f58999e2/image.gif)

```javascript
// 해당 요소가 viewport 내에 있는지 확인
// 참고: https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
function checkViewport(el) {
  let box = el.getBoundingClientRect()
  return (
    box.top >= 0 &&
    box.left >= 0 &&
    box.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    box.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// scroll 이벤트를 추가하고, 해당 element에 callback 함수를 등록
const addScrollEvent = elList => {
  document.addEventListener('scroll', () => {
    elList.forEach(el => {
      if (checkViewport(el)) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  })
}

// 동작시킬 elements리스트에 스크롤 이벤트 등록
const boxList = document.querySelectorAll('.box')
addScrollEvent(boxList)
```

```css
/* active animation 예시 */
/* 참고: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_shake */
.box.active {
  background: #00fa9a;
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
```

> 👉 [codepen 링크 바로가기](https://codepen.io/hayeon9826/pen/abGGONj)
> 코드 참고: [jsfiddle - hyeyoon](http://jsfiddle.net/hyeyoon/g1Lrfw76/22/), [stackoverflow - Dan](https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433)

<br />

원하는 뷰포트에 들어오면 빨간 상자의 색상이 초록생으로 바뀌며, shake 애니메이션이 실행된다. 겉보기에는 잘 동작하지만, 해당 코드를 크롬 개발자 도구의 퍼포먼스 탭을 통해 확인해보면 성능 문제가 발생하는 것을 알 수 있다. 특히,`getBoundingClientRect()`를 호출하는 과정에서 Recalculate Style, 리플로우 현상이 발생한다.

![reflow error](https://velog.velcdn.com/images/khy226/post/7dab56f1-6891-4f65-b5d5-2b25b5518891/image.png)

_사진 출처: [Intersection Observer API의 사용법과 활용방법 [Yoon's Devlog]](http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/)_

<br />

## Intersection Observer란

위에서 언급한 성능 문제를 해결하기 위해, 2016년 4월 구글 개발자 페이지 통해 [Intersection Observer API(교차 관찰자 API)](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)가 소개되었다.

Intersection observer는 브라우저 뷰포트(Viewport)와 원하는 요소(Element)의 **교차점**을 관찰하며, 요소가 뷰포트에 포함되는지 아닌지 구별하는 기능을 제공한다. (더 쉽게는 특정 요소가 사용자 화면에 보이는지 안보이는지 판단함)

Intersection observer는 **비동기적**으로 실행되기 때문에, **메인 스레드에 영향을 주지 않으면서** 요소들의 변경사항들을 관찰할 수 있다. 즉, 위에서 언급한 `scroll` 같은 이벤트 기반의 요소 관찰에서 발생하는 렌더링 성능이나 이벤트 연속 호출 같은 문제들을 해결해준다. 또한, `getBoundingClientRect()` 대신에 IntersectionObserverEntry의 속성을 활용하여 요소들의 위치를 알 수 있기 때문에, **리플로우 현상을 방지**할 수 있다.

<br />

MDN 에서는 아래와 같은 상황들에서 Intersection Observer를 사용할 수 있다고 한다.

- 페이지가 스크롤 되는 도중에 발생하는 이미지나 다른 컨텐츠의 지연 로딩 (lazy loading).
- 스크롤 시에, 더 많은 컨텐츠가 로드 및 렌더링되어 사용자가 페이지를 이동하지 않아도 되게 하는 infinite-scroll 을 구현.
- 광고 수익을 계산하기 위한 용도로 광고의 가시성 보고.
- 사용자에게 결과가 표시되는 여부에 따라 작업이나 애니메이션을 수행할 지 여부를 결정.

위 예시에서 작업한 '특정 뷰포트에 들어오면 박스 색깔을 바꾸는 예시'를 Intersection Observer를 이용해 아래와 같이 변경할 수 있다.

```javascript
// IntersectionObserver 등록
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // 관찰 대상이 viewport 안에 들어온 경우 'active' 클래스 추가
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('active')
    }
    // 그 외의 경우 'active' 클래스 제거
    else {
      entry.target.classList.remove('active')
    }
  })
})

// 관찰할 대상을 선언하고, 해당 속성을 관찰
const boxList = document.querySelectorAll('.box')
boxList.forEach(el => {
  io.observe(el)
})
```

![intersection observer example](https://velog.velcdn.com/images/khy226/post/ebb3294d-cbe3-407a-923a-b0a63108cf63/image.gif)

> 👉 [codepen 링크 바로가기](https://codepen.io/hayeon9826/pen/QWrrbQM)
> 코드 참고: [jsfiddle - hyeyoon](http://jsfiddle.net/hyeyoon/og319zw6/6/)

<br />

해당 코드의 개발자 도구 Performance 탭을 통해 확인해보면, 이전 예제와 달리 리플로우 현상이 발생하지 않는 것을 확인할 수 있다.

![intersection observer](https://velog.velcdn.com/images/khy226/post/41f2596f-26ab-4216-9fe5-2f3a6baa5370/image.png)

_사진 출처: [Intersection Observer API의 사용법과 활용방법 [Yoon's Devlog]](http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/)_

<br />

## Intersection Observer 사용 방법

Intersection Observer API는 다음과 같은 상황에 콜백 함수를 호출한다:

- (1) 대상(target) 요소가 기기 뷰포트나 특정 요소(이 API에서 이를 root 요소 혹은 root로 칭함)와 교차할 때
- (2) 관찰자(observer)가 최초로 타겟을 관측하도록 요청받을 때

![Intersection Observer image](https://velog.velcdn.com/images/khy226/post/2fd1db86-796e-4fdf-97d7-556afcc03e7c/image.png)

<br />

### 기본 문법

Intersection Observer는 `new IntersectionObserver()` 생성자를 통해 인스턴스 (`io`)를 만든다. 그리고 해당 인스턴스로 관찰자 (Observser)를 초기화하고 관찰할 대상을 지정한다.
이때, `new IntersectionObserver()` 생성자는 2개의 인수 (`callback`, `options`)를 갖는다.

```javascript
let io = new IntersectionObserver(callback, options) // observer 초기화

io.observe(element) // 관찰 대상 등록
```

---

### Callback

콜백은 관찰할 대상 (target)이 등록되거나, 가시성(visibility: 해당 요소가 뷰포트 혹은 특정 요소에서 보이거나 보이지 않을 때)에 변화가 생기면 실행된다.

콜백은 2개의 인수(`entries`, `observer`)를 갖는다.

```javascript
const io = new IntersectionObserver((entries, observer) => {}, options)
io.observe(element)
```

<br />

### entries

`entries`는 [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)의 배열을 뜻한다.
IntersectionObserverEntry는 읽기 전용의 여러가지 속성들을 포함한다.

```javascript
let callback = (entries, observer) => {
  entries.forEach(entry => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  })
}
```

구글 개발자 도구로 IntersectionObserverEntry 객체를 확인하면 아래와 같은 구조를 볼 수 있다.

<img src="https://velog.velcdn.com/images/khy226/post/ff0bc983-7f07-4ba5-ab75-38353fe6915d/image.png" style="width: 50%; margin: auto;" />

_사진 출처: [Intersection Observer - 요소의 가시성 관찰 [HEROPY Tech] ](https://heropy.blog/2019/10/27/intersection-observer/)_

<br />

IntersectionObserverEntry 객체의 일곱가지 속성들은 아래와 같다:

- `boundingClientRect`: 관찰 대상의 경계 사각형을 DOMRectReadOnly로 반환
- `intersectionRect`: 관찰 대상의 교차한 영역 정보를 DOMRectReadOnly로 반환
- `intersectionRatio`: 관찰 대상의 교차한 영역의 비율을 `0.0`과 `1.0` 사이의 숫자로 반환 (`intersectionRect` 영역에서 `boundingClientRect` 영역까지 비율, Number)
- `isIntersecting`: 관찰 대상이 교차 상태인지 아닌지 반환(Boolean)
- `rootBounds`: 지정한 루트 요소의 사각형 정보를 DOMRectReadOnly로 반환
- `target`: 관찰 대상 요소(Element) 반환
- `time`: 변경이 발생한 시간 정보(DOMHighResTimeStamp) 반환

<br />

#### 1) boundingClientRect

- 관찰 대상의 경계 사각형 정보를 반환한다 (reflow 없이 계산)
- 기존 javascript의 `Element.getBoundingClientRect()`를 사용해 동일한 값을 얻을 수 있으나, 해당 메서드는 reflow를 일으킨다.

![boundingClientRect 예제](https://velog.velcdn.com/images/khy226/post/fdeb675e-426f-4d8b-8ed7-6bfe9421d45e/image.png)

<br />

#### 2) intersectionRect

- 관찰 대상의 교차한 영역(사각형)에 대한 정보를 반환한다

![intersectionRect 예제](https://velog.velcdn.com/images/khy226/post/e11603bb-cdbc-4a3e-94dc-6e5177724cb4/image.png)

<br />

#### 3) intersectionRatio

- 관찰 대상과 루트 요소와 교차한 영역의 비율을 `0.0`과 `1.0` 사이의 숫자로 반환
- `intersectionRect` 영역에서 `boundingClientRect` 영역까지 비율

![](https://velog.velcdn.com/images/khy226/post/6517aa5c-9651-4b3f-834b-4d3cbc75f67e/image.png)

<br />

#### 4) isIntersecting

- 관찰 대상이 루트 요소와 교차 상태인지 아닌지 반환
- 루트 요소와 교차되면 true, 아니라면 false를 반환한다

![](https://velog.velcdn.com/images/khy226/post/c8327890-de34-436b-8df0-66e125e93405/image.png)

<br />

#### 5) rootBounds

- 지정한 루트 요소의 사각형 정보를 DOMRectReadOnly로 반환
- rootMargin 값으로 루트 요소의 크기를 변경할 수 있음

![](https://velog.velcdn.com/images/khy226/post/896b5e1c-8897-4859-91cb-713250df232e/image.png)

<br />

#### 6) target

- 관찰 대상 요소(Element) 반환

<br />

#### 7) time

- 변경이 발생한 시간 정보(DOMHighResTimeStamp) 반환

---

### observer

콜백 함수가 호출되는 IntersectionObserver를 가리킨다

```javascript
const io = new IntersectionObserver((entries, observer) => {
  console.log(observer)
}, options)

io.observe(element)
```

구글 개발자 도구로 IntersectionObserver 객체를 확인하면 아래와 같은 구조를 볼 수 있다.

<img src="https://velog.velcdn.com/images/khy226/post/0bf05ec4-280f-40b0-9e22-f4414c90bcac/image.png" style="width: 50%; margin: auto;" />

_사진 출처: [Intersection Observer - 요소의 가시성 관찰 [HEROPY Tech] ](https://heropy.blog/2019/10/27/intersection-observer/)_

---

### Options

Options를 통해 관찰이 시작되는 상황에 대한 옵션을 설정할 수 있다. 기본값들이 정해져 있으므로 필수는 아니다.

```javascript
// Options를 설정하고 적용하는 예제
let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
}

let observer = new IntersectionObserver(callback, options)
```

위 예제처럼 `root`, `rootMargin`, `threshold` 세 가지 값을 옵션값으로 설정할 수 있다.

<br />

#### root

대상 객체(target)의 가시성을 확인할 때 사용되는 뷰포트 요소이다. 반드시 대상 객체의 **조상 요소**이어야 하며, root 값이 `null` 이거나 지정되지 않을 때 브라우저의 뷰포트가 기본값으로 설정된다.

```javascript
const io = new IntersectionObserver(callback, {
  root: document.getElementById('viewport'),
})
```

<br />

#### rootMargin

root 가 가진 바깥 여백(Margin)을 뜻한다. CSS의 margin 속성과 유사한데, margin 값을 이용해 root 범위를 확장 / 축소할 수 있다.
px 또는 %로 나타낼 수 있으며, 단위를 꼭 입력해야 한다.

- e.g. "10px 20px 30px 40px" (top, right, bottom, left)

기본값은 0 이다.

```javascript
const io = new IntersectionObserver(callback, {
  rootMargin: '200px 100px', // (top & bottom: 200px, right & left: 100px)
})
```

<br />

#### threshold

observer의 콜백이 실행될 대상 요소(target)의 가시성이 얼마나 필요한지 나타내는 값이다. 숫자 혹은 숫자 배열로 나타낼 수 있다.
기본값은 Array 타입의 `[0]` 이며, 단일 값의 경우 그냥 숫자(Number)로만 적어도 된다.

- 0: 타겟의 가장자리 픽셀이 Root 범위를 바로 교차하는 순간(타겟의 가시성이 0%) 옵저버가 실행됨
- 0.1: 타겟의 가시성이 10%일 때 옵저버가 실행됨
- [0, 0.2, 1]: 타겟의 가시성이 0%, 20%, 100%일 때 모두 옵저버가 실행됨

```javascript
const io = new IntersectionObserver(callback, {
  threshold: 0.1, // or `threshold: [0.1]`
})
```

---

### Methods

Intersection Observer에서 가장 자주 사용되는 세 가지 메서드에 대해서 알아보자

<br />

### observe()

대상 요소 (target)의 관찰을 시작할 때 사용한다.

```javascript
const io = new IntersectionObserver(callback, options)

const div = document.querySelector('div')
const li = document.querySelector('li')

io.observe(div) // div 요소 관찰
io.observe(li) // li 요소 관찰
```

<br />

### unobserve()

대상 요소의 관찰을 중지할 때 사용한다. 관찰을 중지할 하나의 대상 요소를 인수로 지정해야한다.

```javascript
const io = new IntersectionObserver(callback, options)

// ...

io.observe(div)
io.observe(li)

io.unobserve(div) // div 요소 관찰 중지
io.unobserve(div) // li 요소 관찰 중지
```

혹은 콜백의 두번째 인수 `observer`에 적용할 수도 있다.

```javascript
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // 관찰 대상이 교차중이지 않을 경우 실행하지 않음.
    if (!entry.isIntersecting) {
      return
    }
    // 관찰 대상이 교차 상태일 경우 실행
    // 위 실행을 한번만 처리하고 관찰 중지
    observer.unobserve(entry.target)
  })
}, options)
```

<br />

### disconnect()

IntersectionObserver 인스턴스가 관찰하는 모든 요소의 관찰을 중지할 때 사용한다

```javascript
const io = new IntersectionObserver(callback, options)

// ...

io.observe(div)
io.observe(li)

io.disconnect() // io가 관찰하는 모든 요소 (div, li) 관찰 중지
```

---

## 마무리

- scroll과 IntersectionObserver의 차이점을 자세히 알 수 있어서 좋았음
- scroll 보다는 IntersectionObserver를 사용해야 기존 코드 대비 성능 개선할 수 있고, 더욱 간단하게 원하는 영역에서 infinite scroll 등을 구현할 수 있다는 것을 예제로 배울 수 있었음
- Observer가 실시간으로 타겟 요소를 '관찰'하는건 성능에 영향을 끼치지 않나? 라는 의문이 있었는데 기존 scroll에서 문제가 되는 성능 문제 보다는 훨씬 효율적이라는 답변을 받음.
- 하지만 Observer가 구체적으로 어떤 방식, 어떤 원리로 실시간으로 타겟 요소를 '관찰' 하는지에 대해서는 정확히 나와있지 않음. 관련해서 나중에 다시 글을 써봐야겠음

---

### 참고:

- [Intersection Observer API의 사용법과 활용방법 [Yoon's devlog]](http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/)
- [Intersection Observer API로 무한 스크롤 구현하기 [lucid_dream (티스토리)]](https://nohack.tistory.com/124)
- [Intersection Observer - 요소의 가시성 관찰 [HEROPY Tech]](https://heropy.blog/2019/10/27/intersection-observer/)
- [Intersection Observer API [MDN Web Docs]](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
- [실무에서 느낀 점을 곁들인 Intersection Observer API 정리 [ elrion018 (velog)]](https://velog.io/@elrion018/%EC%8B%A4%EB%AC%B4%EC%97%90%EC%84%9C-%EB%8A%90%EB%82%80-%EC%A0%90%EC%9D%84-%EA%B3%81%EB%93%A4%EC%9D%B8-Intersection-Observer-API-%EC%A0%95%EB%A6%AC)
- [브라우저 렌더링 과정 - Reflow Repaint, 그리고 성능 최적화 [박스여우 (티스토리)]](https://boxfoxs.tistory.com/408)
