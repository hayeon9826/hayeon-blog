---
title: '[React] 리액트란?'
date: '2021-09-21T22:40:32.169Z'
description: 리액트 원리 & 특징 정리
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/cda5a5aa-07b7-46c1-b983-bcb3b4c82d57/react.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/cda5a5aa-07b7-46c1-b983-bcb3b4c82d57/react.png" style="width: 50%; padding-bottom: 50px;">

<div style="border: 0.5px solid lightgray; padding: 10px;">
  <a href="#intro"><b>i 리액트란?</b></a>
  <br />
  <a href="#definition" style="margin-left: 20px;">0) 용어정리</a>
  <br />
  <b>ii 리액트의 원리 & 특징:</b>
  <br />
  <a href="#jsx" style="margin-left: 20px;">1) JSX</a>
  <br />
  <a href="#dataflow" style="margin-left: 20px;">2) 단방향 데이터 흐름</a>
  <br />
  <a href="#virtual" style="margin-left: 20px;">3) 가상 돔</a>
  <br />
  <a href="#props" style="margin-left: 20px;">4) 컴포넌트와 Props</a>
  <br />
  <a href="#state" style="margin-left: 20px;">5) State와 생명주기</a>
</div>

<br>

## <div id="intro">리액트란?</div>

React.js는 주로 **싱글 페이지 어플리케이션(single-page application, SPA)**을 위한 UI를 구축하는 데 사용되는 **오픈 소스 자바스크립트 라이브러리**다. 즉, React를 사용하면 페이지를 다시 로드하지 않고도 데이터를 변경할 수 있는 대용량 웹 애플리케이션을 만들 수 있다. **가상 돔(Virtual DOM)**이라는 개념을 사용해 웹 애플리케이션의 퍼포먼스를 최적화 하였고, 재사용 가능한 UI 구성 요소를 만들 수도 있다.

React의 주요 목적은 <u>빠르고 확장 가능하며 단순</u>하다는 것이다. 리액트는 MVC 템플릿의 **View(V)**에 해당하며, UI에서만 작동한다. MVC의 Angular JS와 같은 다른 자바스크립트 라이브러리나 프레임워크의 조합과 함께 사용할 수 있다.

React는 페이스북에서 일하는 소프트웨어 엔지니어인 Jordan Walke에 의해 처음 만들어졌으며, 2011년 Facebook의 뉴스피드와 2012년 Instagram.com에 처음 배포되었다.

<hr>

### <div id="definition">0) 용어정리</div>

#### 엘리먼트(Element):

```jsx
const element = <h1>Hello, world</h1>
```

- 엘리먼트는 React 앱의 가장 작은 단위이다.
- 엘리먼트는 화면에 표시할 내용을 기술한다.
- 브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plain object) 쉽게 생성할 수 있다.
- 엘리먼트는 React 어플리케이션을 구성하는 블럭이다.
- 엘리먼트는 바로 사용되지는 않으며, 컴포넌트에서 리턴받아서 사용한다.
- React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트한다.

#### 컴포넌트(Component):

- React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.
- 컴포넌트는 props(“properties”의 줄임말)를 받아 엘리먼트를 출력하는 클래스나 함수이다.
- 컴포넌트는 render() 메서드가 있는 클래스나 함수이다.
- props를 인풋으로 받으며, 엘리먼트 tree를 반환한다.

```jsx
// <Welcome />은 컴포넌트를 나타내며, 범위 안에 Welcome이 있어야한다.

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
  // 2. Welcome 컴포넌트는 결과적으로 <h1>Hello, Sara</h1> 엘리먼트를 반환
}

const element = <Welcome name="Sara" />
// 1. React는 {name: 'Sara'}를 props로 하여 Welcome 컴포넌트를 호출
```

- 아래처럼 외부 컴포넌트를 import 해서 사용할 수도 있다.

```jsx
import { NavBar } from './Components.js'
```

#### 인스턴스(Instance):

- 프로그래밍에서 인스턴스는 클래스의 복제본과 같은것. 클래스의 구조로 컴퓨터 저장공간에서 할당된 실체.
- 즉, 인스턴스는 클래스형 컴포넌트에서 this로 참조하는 것.
- 함수형 컴포넌트는 인스턴스를 갖고 있지 않다.
- 클래스 컴포넌트만이 인스턴스를 갖고 있으나, 리액트가 인스턴스를 만들고 관리하므로 직접 컴포넌트 인스턴스를 만들지 않아도 된다.

> 출처: https://ko.reactjs.org/docs/rendering-elements.html

<hr>

## 리액트의 원리 & 특징:

### <div id="jsx">1) JSX</div>

```jsx
const element = <h1>Hello, world!</h1>
```

리액트에서는 일반적인 javascript이 아닌, 위와 같은 **JSX(JavaScript XML)**라는 템플릿 언어를 사용한다. 즉, JSX는 JavaScript를 확장한 문법이다. XML과 매우 비슷하게 생겼으며, 브라우저에서 실행되기 전에 코드가 **번들링**되는 과정에서 **바벨**을 통해 일반 자바스크립트 형태의 코드로 변환된다.

> - **바벨(Babel)** 은 타 프로그래밍 언어나 마크업 언어를 자바스크립트로 번역하는 Javascript 컴파일러이다.

JSX는 **자바스크립트와 HTML**을 동시에 사용하며, HTML에 자바스크립트의 변수들을 바로 사용할 수 있는 일종의 **템플릿 언어**(Template language)다.

```jsx
const name = 'velog'
const element = <h1>Hello, {name}</h1>

ReactDOM.render(element, document.getElementById('root'))
```

Jsx의 중괄호 `{}`안에 Javascript <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%ED%91%9C%ED%98%84(%EC%8B%9D)" target="_blank" rel="noreferrer noopener" rel="noreferrer noopener">유효한 표현식</a>을 사용할 수 있다. 위의 예시에서는 name이라는 변수를 선언한 후 중괄호로 감싸 JSX 안에 사용하였다. 따라서 화면에는 "Hello, name"이 아닌, name 변수에 담긴 값이 적용되어 `"Hello, velog"` 라는 값이 나타난다.

JSX는 React **엘리먼트(element)**, 즉 **객체**를 생성한다. 그리고 Babel은 JSX를 React.createElement() 호출로 컴파일한다.

<hr>

### <div id="dataflow">2) 단방향 데이터 흐름</div>

리액트에서 데이터는 부모에서 자식으로 한방향으로 흐른다. 즉, 부모로부터 자식으로만 데이터가 전달된다. 이것을 **단방향 데이터 흐름 (One Way Data Flow)** 라고 한다. 위에서 아래 방향으로만 데이터가 흐르기 때문에 코드가 좀 더 간단하고, 디버깅이 예측 가능해 유지보수가 용이하다.

React에서 컴포넌트가 'props'와 'state'를 수신하고 HTML을 반환하는 간단한 기능이라고 가정하자. **자식** 컴포넌트가 **부모**로부터 'props'를 받았을 때, 필요한 prop이면 수정(render)하고, 아니라면 해당 컴포넌트를 사용할 수 있는 자식에게 **전달**한다.

단방향 데이터 흐름에서는 사용자 UI의 데이터 변경을 감시하는 **하나의 Watcher**가 자바스크립트의 **데이터 갱신을 감지**하여 사용자의 UI 데이터를 갱신한다. 사용자가 UI를 통해 자바스크립트의 데이터를 갱신할 때는, **이벤트**를 통해 갱신하게 된다.

![data flow](https://cdn-images-1.medium.com/max/1600/1*PBgAz9U9SrkINPo-n5glgw.gif)

> 사진 출처: https://tkssharma.gitbook.io/react-training/day-01/react-js-3-principles/one-way-data-flow

<hr>

### <div id="virtual">3) 가상 돔</div>

**가상 돔 (Virtual DOM)**은 리액트의 가장 큰 특징 중 하나이다. 리액트를 만든 개발자들은 기존 javascript의 <u>비효율적인 DOM 변경 방식</u>을 해결하기 위해 '가상 돔 (Virtual DOM)'을 대중화했다.

기존 javascript는 페이지 변경이 일어나면 매우 비효율적이게 모든 페이지(DOM)를 변경한다. 예를 들어 1~10까지 적힌 리스트가 있을 때, 첫 번째 숫자 하나를 뺐다고 치자. javascript는 변경된 하나의 숫자 뿐만아니라, <u>전체 리스트를 통째로 업데이트</u> 한다. 그리고 이는 성능 문제로도 연결된다.

리액트는 **실제 돔의 복제본인 가상 돔 (Virtual DOM)**을 통해 이런 성능 문제를 해결한다. 가상 돔은 실제 DOM의 모든 요소들과 완벽히 똑같은 구조를 가지고 있지만, 화면에 있는 요소를 직접 바꿀 수는 없다. 따라서, 실제 DOM 과는 다르게 훨씬 **가볍고 빠르다**. 다시말해, 가상 돔은 실제 DOM을 변경하기 위한 **설계도**와 같은 역할을 한다.

- 예를 들어, 이사 갈 새 집을 샀다고 가정하자. 모든 인테리어는 괜찮은데, 화장실의 구조만 마음에 들지 않는다. 기존의 Javascript는, 화장실 하나를 변경하기 위해 온 집을 다 부수고 다시 처음부터 집을 짓는 비효율적인 공사를 한다.

이런 문제를 해결하기 위해 가상 돔의 개념이 도입되었다. 바로 설계도이다. **설계도**에 <u>변경을 원하는 부분만 체크</u>해서 시공업자에게 전달을 해주면 시공업자는 설계도를 확인해서 **내가 원하는 변경사항만** 수정작업을 해줄 수 있다. 이렇게 하면 집의 구조를 통째로 갈아 엎는 것 보다 가격도 적게 들고 시간도 절약된다. 변경을 원하는 부분만 비교하고, 빠르게 변경을 할 수 있도록 하는 설계도가 **가상 돔**의 역할이다.

![virtual dom](https://www.oreilly.com/library/view/learning-react-native/9781491929049/assets/lnrn_0201.png)

> 사진 출처: https://www.oreilly.com/library/view/learning-react-native/9781491929049/ch02.html

#### 그렇다면 React에서 가상 돔은 어떤 방식으로 작동될까?

JSX 요소를 렌더링하면 모든 **가상 DOM 개체가 업데이트**된다. 비효율적으로 들리지만, 가상 DOM은 매우 빠르게 업데이트 할 수 있기 때문에 실제 비용은 별로 들지 않는다.

가상 DOM이 업데이트되면, React는 업데이트 직전에 생성된 가상 DOM과 새로 업데이트된 가상 DOM을 비교한다. 그리고 DOM에서 변경된 오브젝트들을 정확하게 파악한다. 이 과정을 **"Diffing(비교)"**이라고 한다.

React가 변경된 가상 DOM 오브젝트들을 알게 되면, 실제 DOM에서 해당 오브젝트만 업데이트한다. 즉, React는 DOM의 **필요한 부분만 업데이트**할 수 있기에 성능이 매우 좋다. 정리하자면 아래와 같다.

1. 새로운 가상 DOM이 업데이트 된다.
2. 기존의 가상 DOM과 비교해서 어떤 오브젝트가 변경되었는지 파악한다.
3. 변경된 오브젝트만 실제 DOM에서 업데이트한다.
4. 실제 DOM이 변경되면서 화면도 업데이트 된다.

> 출처: https://www.codecademy.com/articles/react-virtual-dom

<hr>

### <div id="props">4) 컴포넌트 기반</div>

리액트를 개발할 때, 독립적인 컴포넌트를 사용해서 UI를 구성한다. 이는 javascript의 함수와 유사하다.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

// 위 Welcom 컴포넌트는 “props”라고 하는 임의의 입력을 받은 후, 리액트 엘리먼트를 반환한다.

const Button = () => {
  return <button>Click Button!</button>
}

// props는 필수가 아니므로 위 Button 컴포넌트 처럼 props를 받지 않아도 된다.

const App = () => {
  return (
    <div>
      <Welcome name="velog" />
      <Button />
      <Welcome name="velog2" />
      <Button />
    </div>
  )
}
```

위 예시처럼 독립적인 컴포넌트를 재사용할 수 있으며, 개발 생산성을 높일 수 있다. 또한, 컴포넌트로 묶어서 코드를 작성하면 테스트하기 쉬워 유지 보수하기 수월해진다.

<hr>

### <div id="state">5) State와 생명주기</div>

#### 상태 (State)

React 컴포넌트에는 **'state(상태)** 객체가 있다. state란 말 그대로 '상태'를 나타낸다. state는 **컴포넌트의 속성 값**을 저장하거나 변경할 수 있는 객체이다. state가 변경되면 컴포넌트가 다시 **렌더링**되며, 보통 클릭하거나 제출하는 등의 이벤트와 동반되어 사용된다.

- props와 비슷한 개념인데, props는 (함수 매개변수처럼) 컴포넌트에 전달되는 반면 state는 (함수 내에 선언된 변수처럼) 컴포넌트 안에서 관리된다.
- `setState` 함수를 이용하여 컴포넌트 내에서 state를 변경 할 수 있다.

```jsx
class Car extends React.Component {
  constructor(props) {
    super(props)
    // constructor(생성자)로 초기 state 값 초기화
    this.state = {
      brand: 'Ford',
      model: 'Mustang',
      color: 'red',
      year: 1964,
    }
  }
  changeColor = () => {
    this.setState({ color: 'blue' })
    // color 값을 blue로 변경하고, render() 메서드가 호출된다.
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        // {this.state.속성명} 으로 해당 상태값을 호출한다
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeColor}
          // changeColor 함수를 호출한다. 버튼을 누르면 color 값이 바뀐다.
        >
          Change color
        </button>
      </div>
    )
  }
}
```

> 출처: https://www.w3schools.com/react/react_state.asp

#### 생명주기 (LifeCycle)

React에서 컴포넌트는 여러가지 생명주기를 가진다. 리액트의 생명주기는 크게 **Mount(생성), Update(갱신), Unmount(파기)** 세 가지로 나뉜다. 특정 주기마다 사용할 수 있는 API가 있는데, 이를 LifeCycle API 라고 한다.
![lifecycle](https://images.velog.io/images/khy226/post/bcdd03e6-2eda-4c91-9c94-8a0df593e20e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.31.40.png)

> 사진 출처: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

컴포넌트가 브라우저에 **생성, 갱신, 파기** 될 때에 맞춰 어떠한 작업을 행하려고 할때, LifeCycle API를 활용할 수 있다. 다양한 메서드들이 컴포넌트 생명주기 동안 특정 시점에 실행되는데, 대표적인 메서드는 아래와 같다.

1. **Mount(생성)**: 아래 메서드들은 컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때에 순서대로 호출된다.

- <a href="https://ko.reactjs.org/docs/react-component.html#constructor" target="_blank" rel="noreferrer noopener">constructor()</a>
- <a href="https://ko.reactjs.org/docs/react-component.html#static-getderivedstatefromprops" target="_blank" rel="noreferrer noopener">static getDerivedStateFromProps()</a>
- <a href="https://ko.reactjs.org/docs/react-component.html#render" target="_blank" rel="noreferrer noopener">render()</a>
- <a href="https://ko.reactjs.org/docs/react-component.html#componentdidmount" target="_blank" rel="noreferrer noopener">componentDidMount()</a>
  <br>

2. **Update(갱신)**: props 또는 state가 변경되면 갱신이 발생합니다. 아래 메서드들은 컴포넌트가 다시 렌더링될 때 순서대로 호출된다.

- <a href="https://ko.reactjs.org/docs/react-component.html#static-getderivedstatefromprops" target="_blank" rel="noreferrer noopener">static getDerivedStateFromProps()</a>
- <a href="https://ko.reactjs.org/docs/react-component.html#shouldcomponentupdate" target="_blank" rel="noreferrer noopener">shouldComponentUpdate()</a>
- <a href="https://ko.reactjs.org/docs/react-component.html#render" target="_blank" rel="noreferrer noopener">render()</a>
- <a href="https://ko.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate" target="_blank" rel="noreferrer noopener">getSnapshotBeforeUpdate()</a>
- <a href="https://ko.reactjs.org/docs/react-component.html#componentdidupdate" target="_blank" rel="noreferrer noopener">componentDidUpdate()</a>
  <br>

3. **Unmount(마운트 해제) **:아래 메서드는 컴포넌트가 DOM 상에서 제거될 때에 호출된다.

- <a href="https://ko.reactjs.org/docs/react-component.html#componentwillunmount" target="_blank" rel="noreferrer noopener">componentWillUnmount()</a>

> 출처: https://ko.reactjs.org/docs/react-component.html

<hr>

<br><br>

> 참고:
> https://www.c-sharpcorner.com/article/what-and-why-reactjs/ > https://dev-yakuza.posstree.com/ko/react/create-react-app/react/ > https://helloworld-88.tistory.com/350 > https://www.codecademy.com/articles/react-virtual-dom
