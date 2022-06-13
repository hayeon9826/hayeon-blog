---
title: 'React 리스트와 Key'
date: '2021-09-08T22:40:32.169Z'
description: 'Warning: Each child in an array or iterator should have a unique "key" prop 🤔'
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/9d2040af-d5a5-4add-ad6c-d50c6e819d27/0_XCgoYU9sqt95P8J0.png'
---

![img](https://velog.velcdn.com/images/khy226/post/9d2040af-d5a5-4add-ad6c-d50c6e819d27/0_XCgoYU9sqt95P8J0.png)

리액트를 개발하면서 아래와 같은 경고 메세지를 정말 많이 본다.

> Warning: Each child in an array or iterator should have a unique "key" prop

리액트에서 리스트를 사용할 때 왜 `key`를 넣어주어야 하는지 대략적으로만 알고 있었는데 좀 더 구체적으로 알기 위해서 도큐를 정리해보았다.

(\*정리하자면, 리액트에서 `key`는 컴포넌트 배열을 렌더링 할 때, 어떤 원소에 변경이 있는지 식별하기 위한 고유한 값이다.)
<br />

### Key Props 사용 동기

리액트의 `render()` 함수는 React 엘리먼트 트리를 렌더링 하는데, 해당 트리에서 변경된 사항이 있으면 리액트는 변경된 UI를 **갱신**한다.

이 때, 하나의 트리를 다른 트리로 변환하기 위해서는 최소 O(n^3)의 복잡도를 가지는데, 이는 1000개의 엘리먼트를 그리기 위해 10억번의 비교 연산을 수행해야 한다는 것으로 매우 비효율적이다.

효율을 높이기 위해, React는 두 가지 가정을 기반하여 **O(n)**의 복잡도를 가진 알고리즘을 사용한다.

> 1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
> 2. 개발자가 **key prop** 을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.

<br />

### 재조정 (Reconciliation)

리액트에서 페이지에 변화가 일어나면, 전체 페이지를 수정하는 것이 아니라 **비교 알고리즘 (Diffing Algorithm) ** 을 사용해서 변경된 엘리먼트만 수정을 한다.

#### 1. 엘리먼트 타입이 다른 경우

```jsx
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

위 예시처럼 두 루트 엘리먼트 타입이 다르면 (`<div>` 와 `<span>`) 이전 트리를 버리고 **완전히 새로운 트리**를 생성한다.

트리를 버릴 때, 이전 DOM 노드들을 모두 파괴하며 기존의 `<Counter />` 컴포넌트에서는** `componentWillUnmount()`** 가 실행된다. 루트 엘리먼트 아래의 모든 컴포넌트도 언마운트되고 그 state도 사라진다.

이후, 새로운 트리가 만들어 질 때 새로운 DOM 노드들이 DOM에 삽입되며 **`componentDidMount()` **가 이어서 실행된다.

즉, 위 예시에서 이전 `<Counter/>`는 사라지고, 새로 다시 마운트가 될 것 이다.

#### 2. 엘리먼트 타입이 같은 경우

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

같은 타입의 두 React DOM 엘리먼트를 비교할 때, React는 두 엘리먼트의 속성을 확인해 동일한 내역은 유지하고 **변경된 속성들만 갱신**한다.

위 예시에서는 다른 엘리먼트는 똑같이 유지하면서 `className`만 수정을 한다.

DOM 노드의 처리가 끝나면, 이어서 해당 노드의 자식들을 재귀적으로 갱신하는데, 인스턴스는 동일하게 유지되어 렌더링 간 state가 유지된다.

React는 새로운 엘리먼트의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 **props**를 갱신하고, **`componentDidUpdate`**를 호출한다.

<br />

### 자식에 대한 재귀적 처리

그렇다면 우리는 왜 `key props`를 사용해야 하는가?

바로 자식 노드 중에 **변경사항**이 있는지 없는지 체크하기 위해서 이다. 아래 예시를 통해서 `key prop`의 필요성을 알 수 있다.

DOM 노드의 자식들을 재귀적으로 처리할 때, React는 기본적으로 **동시에 두 리스트를 순회하고 차이점이 있으면 변경**을 한다.

```jsx
// 변경 전
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 변경 후
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

위 예시처럼 자식의 끝에만 새로운 엘리먼트를 추가하면, 마지막 엘리먼트인 `<li>third</li>`를 트리(리스트)에 **추가**하는 작업을 할 것이다.

하지만 아래처럼 맨 앞에 엘리먼트를 추가하는 경우에는 어떨까

```jsx
// 변경 전
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

// 변경 후
<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

위 예시의 경우, React는 모든 요소가 바뀌었다고 생각하고 **모든 자식을 변경**한다.

<br />

### Key 속성 사용

위 두 번째 예시와 같은 문제를 해결하기 위해, React에서 `key` 속성을 사용한다. React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인할 수 있다.

```jsx
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

이처럼 `key` prop을 넘겨주면 React는`'2014'` key를 가진 엘리먼트가 새로 추가되었고, `'2015'`와 `'2016'` key를 가진 엘리먼트는 그저 이동만 하면 되는 것을 알 수 있다.

<br />

### 주의사항

- `key`는 일반적으로 데이터의 **식별자 (id)**를 사용하면 된다.

- 만약 식별자를 사용할 수 없다면, 데이터 구조에 ID 속성을 추가하거나 데이터 일부에 해시를 적용해서 `key`를 생성할 수 있다.

- `key`는 오로지 **형제 사이에서만 유일**하면 되고, 전역에서 유일할 필요는 없다.

- (비추천) 배열의 인덱스를 `key`로 사용할 수 있으나, 항목의 순서가 바뀌었을 때 key 또한 바뀌어 문제가 될 수도 있다. (문제상황 예시: https://codepen.io/pen?&editors=0010)

<br />
<br />
<br />

> 참고: https://ko.reactjs.org/docs/reconciliation.html#the-diffing-algorithm
