---
title: 왜 리액트를 배워야 할까?
date: '2022-07-31T11:45:32.169Z'
description: 수많은 프론트엔드 기술중에 왜 하필 리액트를 배워야하는지에 대해서 간단히 알아보려고 한다.
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/a43a882d-ebe3-4770-9d91-f59def45ae1d/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/a43a882d-ebe3-4770-9d91-f59def45ae1d/image.png" style="width: 80%; padding-bottom: 50px;"/>

수많은 프론트엔드 기술중에 왜 하필 리액트를 배워야하는지에 대해서 간단히 알아보려고 한다.

<br />

![리액트 공식 페이지](https://velog.velcdn.com/images/khy226/post/3875a3ed-f091-434e-985f-c22d5da8206c/image.png)

<br />

공식 도큐에 따르면, 리액트는 **‘사용자 인터페이스를 만들기 위한 JavaScript 라이브러리’** 이다. 그리고 2022년 현재 가장 인기있는 프론트엔드 라이브러리 중 하나이다.

리액트에 대해서 자세히 알아보기 전에 **‘프론트엔드 라이브러리’** 가 무엇이고, 왜 필요한지에 대해서 알아보자.

---

### 프론트엔드 라이브러리?

![웹사이트 vs 웹애플리케이션](https://velog.velcdn.com/images/khy226/post/e0101876-62db-4d14-b27d-105c24c4c752/image.png)

웹사이트를 만들 때, 프론트엔드 라이브러리 없이 순수 html, css, javascript으로도 만들 수 있다. HTML, CSS로 정적인 페이지를 만들고, javascript를 추가해 동적인 페이지로 개선시킬 수 있다.

하지만, 단순 웹페이지가 아닌, 수많은 기능들과 상태를 관리해야하는 ‘웹 애플리케이션'을 만든다면 이야기가 더 복잡해진다.

예를 들어, 다음과 같은 카운터 예제를 순수 javascript로 만든다고 해보자.

```html
<div>
  <h1>Counter Example</h1>
  <div id="count">0</div>
  <button id="add">+</button>
</div>
```

id가 ‘add’ 라는 버튼을 눌러 카운터 값을 하나씩 늘려준다는 코드를 javascript 만으로 짠다면 다음과 같이 작업할 수 있다.

```javascript
var count = 0
var countDiv = document.getElementById('count')
var addBtn = document.getElementById('add')

addBtn.onclick = function () {
  count++
  countDiv.innerText = count
}
```

각 DOM 엘리먼트에 대한 레퍼런스를 찾고, 해당 DOM 에 접근하여 직접 숫자를 변경해주면 된다.

만약 구현하려는 프로젝트가 사용자와의 인터랙션이 별로 없다면, javascript 만을 이용해서 그냥 직접 구현하는 것도 괜찮다. 하지만 프로젝트가 규모가 커지고, 정말 다양한 유저 인터페이스와 인터랙션을 제공하게 된다면, 그 <u>많은 DOM 요소들을 직접 관리하고 코드 정리하는 것은 정말 어렵고 복잡</u>해진다.

예를 들어, 여러가지 counter 버튼을 만들어야 한다면 코드가 점점 길어지고, 관리해야하는 상태와 엘리먼트도 많아진다.

```html
<div>
  <h1>Counter Example 2</h1>
  <div id="count1">0</div>
  <button id="add1">+</button>

  <div id="count2">0</div>
  <button id="add2">+</button>

  <div id="count2">0</div>
  <button id="add3">+</button>
  ...
</div>

<script>
  // 엘리먼트 마다 따로 정의를 해야함
  var count1 = 0;
  var countDiv1 = document.getElementById('count1');
  var addBtn1 = document.getElementById('add1');

  var count2 = 0;
  var countDiv2 = document.getElementById('count2');
  var addBtn2 = document.getElementById('add2');

  var count3 = 0;
  var countDiv3 = document.getElementById('count3');
  var addBtn3 = document.getElementById('add3');

  ...

  // 각각의 DOM 에 접근하여 직접 숫자를 변경
  addBtn1.onclick = function() {
    count1++;
    countDiv1.innerText = count1;
  }

  addBtn2.onclick = function() {
    count2++;
    countDiv2.innerText = count2;
  }

  addBtn3.onclick = function() {
    count3++;
    countDiv3.innerText = count3;
  }

  ...
</script>
```

위 예시처럼 복잡한 웹 개발을 할 때, 귀찮은 DOM 관리와 상태값 업데이트 관리를 최소화하고, 오직 기능 개발과 사용자 인터페이스를 구현하는 것에 집중 할 수 있도록 하기 위해서 다양한 프론트엔드 라이브러리와 프레임워크가 만들어졌다.

<br />

![프론트엔드 예시](https://velog.velcdn.com/images/khy226/post/90b2e98f-47fd-4e8d-8f1f-32cd13d82ef7/image.png)

<br />

예를 들어, 리액트를 사용하면 위 예제를 더욱 직관적이고 간단하게 구현할 수 있다.

```jsx
import React, { useState } from 'react'

function Example() {
  // "count 1, 2, 3" 라는 새 상태 변수를 여러개 선언
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  return (
    <div>
      <h1>Counter Example (React)</h1>
      <div>{count1}</div>
      <button onClick={() => setCount1(count1 + 1)}>+</button>
      <div>{count2}</div>
      <button onClick={() => setCount2(count2 + 1)}>+</button>
      <div>{count3}</div>
      <button onClick={() => setCount3(count3 + 1)}>+</button>
    </div>
  )
}
```

---

### 프론트엔드 개발 트렌드

![프론트엔드 개발 트렌드](https://velog.velcdn.com/images/khy226/post/3705a4d4-8621-4f93-b519-27422676fff1/image.png)
<br />

2022 현재 대표적인 프론트엔드 라이브러리에는 React, Angular, Vue, Preact, Svelte 등이 있다.
<br />

![프론트엔드 3대장](https://velog.velcdn.com/images/khy226/post/3165282b-858f-4168-b5cb-2aab2c4aebe5/image.png)

특히, 2016년부터 2022년 현재까지 프론트엔드 3대장으로는 React, Angular, Vue를 고를 수 있다. npm trend에서 다운로드 수를 확인해보면 6년간 1위는 리액트가 차지하고 있다. 각 프론트엔드 라이브러리 / 프레임워크의 특징은 아래와 같다.

### React.js

- 프론트엔드 UI 라이브러리
- 메타(페이스북) 개발자 Jordan Walke 제작
- 메타에서 지원 & 유지보수
- Virtual DOM 지원
- SPA, SSR
- JSX(자바스크립트 확장 문법) 사용

### Angular.js

- TS 기반 오픈소스 JS 프레임워크
- 구글 앵귤러팀 제작
- All In One 프레임워크
- 양방향 바인딩
- 체계적이고, 잘 정리된 문서와 튜토리얼
- 비교적 큰 러닝커브

### Vue.js

- 오픈소스 JS 프레임워크
- 구글 개발자 Even You 제작
- Virtual DOM 지원
- 양방향 & 단방향 바인딩 지원
- Single File Component
- 비교적 작은 러닝커브
  <br />

![React vs. Angular vs. Vue](https://velog.velcdn.com/images/khy226/post/581298f7-51d8-4301-9b66-c66cbe619806/image.png)
<br />

세 기술의 차이점 중 하나는, React는 '라이브러리'이고, Angular & Vue는 '프레임워크' 라는 점이다. 라이브러리와 프레임워크는 프로그래밍 흐름에 대한 ‘제어 권한' 주체가 다르다는 점에서 가장 큰 차이가 있다.

- 프레임워크 (Angular, Vue): 흐름의 제어 권한을 개발자가 아닌, **‘프레임워크’** 가 가지고 있음. 따라서 개발자는 **프레임워크에** 맞춰서 개발을 해야함
- 라이브러리 (React): 라이브러리가 아닌, **‘개발자'** 가 흐름을 제어함. 따라서 **개발자가** 라이브러리에서 필요한 기능만 가져다가 사용함

간단하게 그림으로 표현하자면 아래와 같다.
<br />

![프레임워크 vs 라이브러리](https://velog.velcdn.com/images/khy226/post/1e076d92-50a7-4a7d-96c2-a37e18500e0e/image.png)

---

### 그렇다면, 왜 하필 리액트인가?

#### 1) 숫자로 볼 수 있는 전세계 리액트 트렌드

![리액트 usage chart](https://velog.velcdn.com/images/khy226/post/a6fb76f9-ac76-423f-9118-d94551efb072/image.png)

웹 기술에 대한 시장 점유율 및 국가별 분석 내용을 제공하는 사이트 [Built With](https://trends.builtwith.com/javascript/React)에 따르면, 리액트는 전세계적으로 많은 사랑을 받고있는 라이브러리이다.

구체적으로, 상위 1만개의 사이트 중 **40.6% 이상은 리액트를 사용** 하고 있으며, 2022 기준 리액트는 프론트엔드 라이브러리의 주류라는 근거에 뒷받침한다. 예를 들어, 에어비앤비, 인스타그램, 페이스북, 넷플릭스 거대 기업들이 React를 사용해서 제작되었다. 이런 큰 기업들은 안정적인 작동을 위해 기존 기술을 계속 사용하려는 경향이 있기 때문에, React를 사용하는 트렌드는 한번에 바뀌지 않을 것이라고 예측된다.

즉, 지금 시대에 React를 배우는 것은 매우 효율적인 일이라고 할 수 있다. 특히, 우리나라에서도 카카오, 네이버, 11번가, 삼성, lg 등 여러 기업들이 리액트를 사용중이다. 아래는 국내 React 사이트 예시 그림이다. (국내 리액트 사이트 총 30,919개)
<br />

![리액트 국내 chart](https://velog.velcdn.com/images/khy226/post/82d54809-00d4-4ce9-88cc-e3ee2a044f2b/image.png)

#### 2) 거대기업 (메타)의 후원을 든든히 받는 리액트

![meta & React](https://velog.velcdn.com/images/khy226/post/37132f8a-f99b-4dbd-92a4-24d2d637033b/image.png)

<br />

페이스북은 React의 든든한 후원자이다. 특히, React JS는 페이스북에서 개발한 라이브러리이며, 현재도 큰 자금을 투자하며 리액트를 지속적으로 개선하고 있다.

아무리 오픈소스 프로젝트라도, 투자를 받지 못하면 지속적인 유지보수는 어려울 수 있다. 다행히도, 리액트는 페이스북이라는 거대 기업이 지속적으로 투자하고, 개발자들을 고용해서 React JS를 지속적으로 개선하는 중이므로, 하루 아침에 리액트가 없어지지는 않을 것이다.

따라서, 지금 리액트를 사용하는 것은 안정적이라고 할 수 있다.

#### 3) 리액트의 매우 큰 개발 커뮤니티

ReactJs는 매우 큰 개발 커뮤니티를 가지고 있다. ReactJs는 매우 큰 커뮤니티를 가지고 있다. 개발을 할 때, ‘커뮤니티’는 매우 중요한데 React JS는 javascript와 매우 가깝기 때문에 거대한 커뮤니티를 가지고 있다.
<br />

![스택오버플로우 리액트](https://velog.velcdn.com/images/khy226/post/f5081660-4888-4728-b706-f132dd7ad12e/image.png)
<br />

예를 들어, 리액트는 개발자 커뮤니티 **stackoverflow** 에서 키워드 인기순 16위에 오를 정도로 (401,569 개의 질문) 유명한 주제이다. 큰 커뮤니티 덕분에 **질 좋은 도큐와 책, 강의, 가이드, 라이브러리, 개발자** 들이 있다. 채용 사이트만 찾아봐도 ‘리액트' 개발자를 뽑는 공고들이 압도적으로 많고, 리액트와 관련된 문서들이 정말 많다.

위와 같은 이유로, 특정 기술을 배울 때 해당 기술에 대한 생태계가 존재한다는 것은 매우 중요하다. 따라서, ReactJS를 배우는 것은 매우 좋은 선택이라고 할 수 있다.

---

### 리액트란?

![리액트 공식 페이지](https://velog.velcdn.com/images/khy226/post/3875a3ed-f091-434e-985f-c22d5da8206c/image.png)
<br />

처음에 보여준 리액트 공식 도큐 화면을 다시 읽어보자. 공식 문서에 따르면, 리액트는 **“사용자 인터페이스를 만들기 위한 JavaScript 라이브러리”** 라고 한다. 여기서 중요한 두 가지 개념이 나오는데, '라이브러리'와 '사용자 인터페이스'이다.

#### 1) 라이브러리

프로그래밍에서 라이브러리란 무엇일까?

> **라이브러리(영어: library)** 는 주로 소프트웨어를 개발할 때 컴퓨터 프로그램이 사용하는 비휘발성 자원의 모임이다. 여기에는 구성 데이터, 문서, 도움말 자료, 메시지 틀, 미리 작성된 코드, 서브루틴(함수), 클래스, 값, 자료형 사양을 포함할 수 있다. (위키백과)
> <br />

![라이브러리](https://velog.velcdn.com/images/khy226/post/e5341a2f-e4c2-4fff-adb8-45c927238591/image.png)
<br />

실생활에서 라이브러리는 ‘도서관'이라는 뜻으로 책을 기능단위에 맞게 모아둔다. 프로그래밍에서도 비슷하게 이해하면 된다.
프로그래밍에서 라이브러리란 특정 프로그래밍에서 자주 사용되는 기능들을 모아서 묶은것을 뜻한다. (ex. 문자열 기능, 숫자 기능, 날짜 기능 등)

#### 2) 사용자 인터페이스

사용자 인터페이스란 무엇일까?

> **사용자 인터페이스** 또는 **유저 인터페이스(영어: user interface, UI)**는 사람(사용자)과 사물 또는 시스템, 기계, 컴퓨터 프로그램 등 사이에서 의사소통을 할 수 있도록 일시적 또는 영구적인 접근을 목적으로 만들어진 물리적, 가상적 매개체를 뜻한다.

즉, 사용자 인터페이스는 사용자와 컴퓨터가 서로 상호작용을 하기 위해 중간에서 서로 입출력을 제어해 주는 것을 말한다. 예를 들어, 화면에서 자주 볼 수 있는 버튼, 배너, 헤더, 텍스트 입력창 등이 있다. 버튼 누르면 특정 화면을 보여주고 사용자 입력에 반응하는 것도 역시 사용자 인터페이스라고 할 수 있다.
<br />

![사용자 인터페이스](https://velog.velcdn.com/images/khy226/post/ac3df4b3-e015-44b6-bd75-53535321fd29/image.png)
<br />

리액트로 사용자들이 화면에서 보고 누를 수 있는 요소들을 더욱 직관적이게 개선하거나, 인터렉티브하게 만들 수 있다. 즉, 리액트는 대표적인 UI 라이브러리이다. (=화면을 만들기 위한 기능들을 모아놓은 것)

---

### 왜 리액트를 배워야 할까? (리액트의 장점)

거대한 커뮤니티와 많은 다운로드수. 이외에도 왜 굳이 리액트를 사용해야하는지 모르겠다면? 리액트의 특징과 장점에 대해서 더 자세히 알아보자

#### 장점 1: 재사용성 (컴포넌트)

React 는 `컴포넌트 기반의 아키텍처`를 가지고 있어, 개발자가 가능한 많은 코드를 재사용하도록 권장한다. 이러한 `재사용 가능한 컴포넌트`는 생산성과 유지 보수를 용이하게 하여 React 의 큰 이점 중 하나이다.

리액트는 ‘컴포넌트' 단위로 구현을 하는데, 이때 컴포넌트는 UI의 조각이다. 따라서, 컴포넌트들을 활용해서 독립적, 재사용가능한 개발을 할 수 있다.
<br />

![재사용성](https://velog.velcdn.com/images/khy226/post/cb2ae3b3-7e2c-4a25-b0ea-a7435dbefe34/image.png)
<br />

예를 들어, 위 화면에서 1, 2, 3의 컴포넌트를 만들어 놓으면 하나하나 개발하는게 아니라, 재사용을 해서 더 빠르고 효율적이게 구현할 수 있다. 만약 하나의 요소가 변화할때, 다른 많은 요소들이 변화하는 복잡한 로직을 작업할 경우 React 는 컴포넌트 재사용성으로 보완 가능하다.

#### 장점 2: 빠른 렌더링 (가상 돔)

React는 변경된 화면을 다시 렌더링하기 전에, 미리 Virtual DOM(가상돔)에 넣고, 기존의 DOM과의 비교를 통해 바뀐 부분만 렌더링 한다. 그렇다면 가상돔이 무엇일까?
<br />

![가상돔](https://velog.velcdn.com/images/khy226/post/f8a1f2ad-4ea7-454f-b0f7-a69dd1722c92/image.png)
<br />

가상돔은 이름 그대로 가상의 DOM이다. 위 사진에서 볼 수 있듯이, 리액트에서 인터렉션이 발생하면 바로 브라우저 돔에 접근하지 않고, 가상 돔에 한번 렌더링한다. 그리고 이를 기존의 DOM과 비교를 해서(Diffing) 변화가 필요한 곳만 실제 돔에 렌더링한다.

이를 통해 리액트는 비효율적인 DOM 조작을 줄인다. 가상의 돔은 말 그대로 ‘가상' 이기 때문에 연산 시간이 거의 걸리지 않아서 매우 빠르기 때문이다. 덕분에 리액트는 브라우저 내에서 발생하는 연산의 양을 줄여 성능을 개선한다

#### 장점 3: 단방향 데이터 흐름 (안정성)

마지막으로, React는 안정성을 보장하는 `단방향 데이터 흐름`이 특징이다.

일반적으로 프레임워크들은 양방향 데이터 흐름을 특징으로 하여, 변경이 발생할 때 마다 전체 어플리케이션도 변경되는 일이 생긴다. 이와는 반대로, 리액트는 부모에서 자식으로만 데이터가 흐른다. 한 방향으로 데이터가 흐른다는 의미는 자식의 구성 요소가 부모의 구성 요소에 영향을 미칠 수 없다는 것이다.

![data flow](https://cdn-images-1.medium.com/max/1600/1*PBgAz9U9SrkINPo-n5glgw.gif)

덕분에 특정 부분의 변경이 전체 앱의 구조에 영향을 미치지 않아 안정적이고, 쉬운 디버깅과 유지관리의 장점이 있다.

---

리액트를 본격적으로 알아보기 전, 왜 프론트엔드 라이브러리가 생겼고 그중 왜 하필 우리는 ‘리액트'를 배우는 건지 소개를 해보았다.

이러한 기본 지식들을 바탕으로, ‘왜' 리액트를 배워야 하고 어떤 방식으로 공부를 해야 하는지에 대해서 고민해보고 천천히 알아가면 더 쉽게 배울 수 있을 것이다.

---

### 출처

> - [누구든지 하는 리액트 1편: 리액트는 무엇인가](https://velopert.com/3612)

- [React, Angular, Vue.js 비교](https://velog.io/@goblin820/TIL-2-Vue-React-Angular)
- [리액트의 장점과 단점](https://www.inflearn.com/course/%EC%B2%98%EC%9D%8C-%EB%A7%8C%EB%82%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8/unit/113259)
- [Pros and Cons of React](https://thecodest.co/blog/pros-and-cons-of-react)
- [노마드 코더 - Why React](https://nomadcoders.co/react-for-beginners/lectures/3256)
