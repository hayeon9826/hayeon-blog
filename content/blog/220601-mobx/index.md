---
title: MobX 훑어보기
date: '2022-06-01T22:45:32.169Z'
description: 상태관리 라이브러리, MobX 개념 알아보기
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/2e1f3cef-4882-4fca-ba2e-6c26a2791534/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/2e1f3cef-4882-4fca-ba2e-6c26a2791534/image.png" style="width: 50%; padding-bottom: 50px;">

### MobX란?

- Redux와 또 다른 **상태 관리 라이브러리**이다. 기본적으로 객체지향 느낌이 강하며 (Redux와 달리) Component와 State를 연결하는 번잡한 보일러플레이트 코드들을 데코레이터 제공으로 깔끔하게 해결한다.

#### 기본 동작 원리 및 개념(**Observable**):

- ‘추적한다’는 뜻을 가짐. 속성(property), 모든 객체, 배열, map과 set은 observable로 설정될 수 있음
- Mobx에서 Rerendering 대상이 되는 state(상태, 값)를 관찰 대상(observable value)라고 칭하며 **@observable**데코레이터로 지정한 **State는 관찰대상**으로 지정되고 그 State는 값이 변경될 때 마다 렌더링 된다
- 객체를 observable로 만드는 가장 기본적인 방법은 `makeObservable`를 사용하여 속성마다 주석을 지정하는 것. 아래는 주석 예시
  - `observable` 은 state를 저장하는 추적 가능한 필드를 정의 - `action`은 state를 수정하는 메서드를 표시 - `computed`는 state로부터 새로운 사실을 도출하고 그 결괏값을 캐시 하는 getter를 나타냄

![mobx process](https://velog.velcdn.com/images/khy226/post/72b6b83b-37c1-4647-a372-5f08922ccc07/image.png)

### 왜 MobX를 사용하는지?

#### **문제점: 왜 상태관리 라이브러리를 사용하는가?**

- SPA 를 개발할 때, 화면에 보이는 상태들이나 화면에 보이지 않는 상태들도 실시간이나 비동기로 변화하기 때문에 상태가 언제 어떻게 변화하였는지 알 수 없어져 컨트롤하기 힘든 상황에 놓이게 됐음.
- 프로젝트의 규모가 커지고 복잡해지면서 방대한 데이터들을 관리하기 어려워짐.
- **Component 간의 정보 공유의 어려움**

```
Why?
- 자식 컴포넌트 간의 다이렉트 데이터 전달이 불가능
- 자식 컴포넌트들 간의 데이터를 주고 받을 때 상태를 관리하는 부모 컴포넌트를 통해 데이터 전달
- 하지만, 자식 컴포넌트가 많아진다면 상태 관리가 매우 복잡
- 따라서 상태를 관리하는 상위 컴포넌트에서 계속 내려 받아야 함 (Props drilling)
```

![props drilling](https://velog.velcdn.com/images/khy226/post/f2062ad7-64ee-4391-9e21-93941736f024/image.png)
<small> 사진 출처: [Prop Drilling: o que é?](https://www.alura.com.br/artigos/prop-drilling-no-react-js)</small>

#### 해결방안: 전역 상태 관리 스토어 제공

- 전역 상태 관리 스토어를 제공해서 어디에서나 상태들을 관리할 수 있게 한다. 따라서 다중 계증 컴포넌트에서 데이터와 메소드 접근의 복잡성을 해결함.
- 또한, 컴포넌트에 집중된 비즈니스 로직을 분리시킬 수 있다.
- 아래 사진에서 상태관리 라이브러리의 이점을 쉽게 이해할 수 있다 (사진 예시는 Redux 이지만 MobX도 비슷한 원리)

![상태 관리 라이브러리 원리](https://velog.velcdn.com/images/khy226/post/b45c38b8-30e8-4f6d-8668-8a0083410f11/image.png)
<small>사진 출처: [React - Redux framework](https://www.slideshare.net/binhqdgmail/006-react-redux-framework)</small>

- Mobx: 사용하기 쉽고 강력한 기능으로 꾸준한 성장을 하고 있는 상태관리 라이브러리
  - 렌더링 할 State를 관찰대상으로 지정, State를 변경하면 React Component Render 메소드에 의해 Rerendering 되는 아키텍쳐

[예시: Post 리스트 가져오기]

![post MobX 예시](https://velog.velcdn.com/images/khy226/post/c38ef9aa-18e0-4ee7-936a-3f144dfcfc71/image.png)

- 후기 리스트를 가져오기 위해서 **ListComponent에서 PostStore**의 **getPosts**를 호출하여 서버로 부터 가져온 데이터를 선언해둔 **posts** state에 할당 해주면, **ListComponent**에서 **posts** 를 Rendering 하게 되는데 이것이 기본 동작 개념

### Mobx의 장단점

1. 간단하다

   - **MobX는 기본적으로 Reactive Programming으로부터 영감을 받았다**고 한다. Reactive Programming은 데이터의 흐름과 전파에 초점을 맞춘 프로그래밍 패러다임. Reactive Programming의 대표적인 구조는, **어떤 값이 변경이 되면 이 값이 변경되었는지 쳐다보고(Subscribing) 있는 Observer한테 알림을 줘서 리랜더링하도록 알려주는 흐름**이다.
   - Redux와 차이: **Redux와 다른 점은 Action이 직접 State 업데이트**를 한다

2. 객체 지향적

   - 주로 Class를 사용하는데, `class`를 이용함으로써 얻을 수 있는 구조적 장점이 있음
   - Store를 클래스로 관리하면, 상태와 그 업데이트와 관련된 로직은 Store 내에 위치하게 할 수 있다. **상태와 관련된 역할, 책임을 Store에 부여함으로써 상태를 직접 건드는 로직을 컴포넌트로부터 분리**
     할 수 있다.

   3. 직접 상태에 접근해서 업데이트하는 것은 클래스 내부에 있는 메서드, 즉 action만 가능하기 때문에 나름 **캡슐화**도 잘 적용할 수 있다.

3. 불변성 신경쓰지 않아도 됨
   - State의 불변성을 유지하기 위해서 번잡스러운 코드나 ImmutableJs같은 라이브러리를 따로 사용할 필요가 없다.
   - 불변성을 유지하면 서 State를 변경하는 코드는 Object가 Depth가 깊어지게 되면 코드의 가독성이 매우 떨어진다. 그래서 ImmutableJs 라이브러리를 사용하게 되는데, Redux와 같이 사용하게 될 경우 여러가지 설정이 필요하고 추가적인 라이브러리도 필요하다. (MobX는 신경쓰지 않아도 됨)

> #### React에서 불변성의 의미?
>
> React에서 렌더링(화면 업데이트)을 하는 기준은 state가 변경 되었을 때 이다. 이때, 복잡도가 높은 객체의 경우 **변경전/변경후** 자식 property 까지 모두 비교하지 않고,  **state의 레퍼런스**가 변경되었을 때 변경된 것으로 간주 하고 렌더링을 한다.
> 이 경우 **기존 state 값을 직접 변경하는 것이 아니라**, **setState** 메소드를 통해 <u>기존 state값을 바탕으로 변경되어 새로 생성된 객체의 레퍼런스</u>를  변경하는데, 이것을 **불변성**을 유지한다 라고 표현한다.

- 정리하자면, MobX의 장점으로는 객체 지향적, Decorator를 통해 보일러플레이트 사라짐, 캡슐화, 불변성 기본 탑재, Redux에 비해 매우 간단하다는 점이 있다.

### Mobx 기본 원칙

MobX는 *action*이 *state*를 변경하는 단방향 데이터 흐름을 사용하며, 영향을 받는 모든 *view*를 업데이트한다.
![https://ko.mobx.js.org/assets/action-state-view.png](https://ko.mobx.js.org/assets/action-state-view.png)

1. *state*가 변경되면 모든 *derivation*이 **자동으로** 그리고 **원자 단위로** 업데이트 됨. 결과적으로 중간 값을 관찰할 수는 없음
2. 기본적으로 모든 *derivation*은 **동기식**으로 업데이트 됨. , *action*이 *state*를 변경한 직후에 computed 값을 안전하게 검사할 수 있음
3. *computed 값*은 **느리게** 업데이트 됨. 자주 사용되지 않는 computed 값은 부수효과(I/O)에 필요할 때까지 업데이트되지 않음. 만약 view가 계산된 값을 사용하지 않으면 가비지가 자동으로 수집됨.
4. 모든 *computed 값*은 **순수**해야 하며 *state*를 바꾸면 안됨

### Mobx Core 개념

- **Observable**: State의 변화를 감시하는 역할을 한다. observable은 state를 저장하는 추적 가능한 필드라는 것을 의미한다.
- **Action**: State를 수정하는 메서드이다. 예를 들어 카운터 예제에서 숫자를 증가시키고, 감소시키는 등의 액션이 있다.
- **Computed**: state의 변화로 인해 계산된 값이다. computed는 일종의 캐싱인데, computed 내부에서 사용하는 state가 변경되었을때만 새로 계산해서 계산값을 저장해놓고 사용한다 만약에 computed내부 state가 변경되지 않았으면 기존에 계산해놨던 캐싱값을 그대로 다시 사용한다.
- **Reaction**: **observable state**를 변경하면 그에 따른 파생값(**computed**)이 계산된다. 만약에 이 파생값들을 사용하고 있는 곳이 있다면? 거기도 자동으로 변경되어야한다. 그걸 **Reaction**이라고 부른다. 예를들어, 파생값을 사용하는 컴포넌트를 다시 렌더링한다거나 그 파생값을 로그로 남긴다거나 하는 작업들이 **Reaction**이다.

**MobX는 어플리케이션에서 다음 세 가지 개념을 구분한다:**
![mobx 흐름](https://velog.velcdn.com/images/khy226/post/5225cb69-a5ac-4f62-99a9-780997c507c3/image.png)

1. 상태(state): 앱을 구동하는 ‘데이터'임. 값을 보유하고 있는 스프레드시트 셀과 같음.
   - 시간이 지남에 따라 변경하려는 모든 속성을 MobX가 추적할 수 있도록 `observable`로 표시해야함
   - `observable`을 사용하는 것은 객체의 속성을 스프레드시트 셀로 바꾸는 것과 같음
2. 동작(action): 사용자 이벤트, 백엔드 데이터 푸시, 예약된 이벤트 등과 같이 *state* 를 변경하는 코드 조각
   - action은 스프레드시트 셀에 새 값을 입력하는 사용자와 같음
   - 즉, `observable`을 변경하는 코드는 `action`으로 표시하는 것이 좋음
   - action을 사용하면 코드를 구조화하는 데 도움을 줄 수 있으며 의도하지 않은 state 변경도 방지
3. 파생(derivation): state에서 더 이상의 상호작용 없이 파생될 수 있는 *모든 것*이 derivation
   - ex) 사용자 인터페이스, 남은 todos 수와 같은 파생 데이터, 백엔드 api 요청
   - 두 종류의 파생값이 있음:
     - *computed 값* : 현재의 observable state 에서 순수 함수를 사용하여 파생될 수 있는 값. js getter 함수를 사용하면 됨. 스프레드시트 자동 저장처럼, 자동으로 업데이트되지만 필요할 때(무언가 결과에 영향을 미칠 수 있을 때)만 업데이트 됨
     - *reaction* : state가 변경될 때 자동으로 발생해야 하는 부수효과(side effect) (명령형 프로그래밍과 반응형 프로그래밍 사이를 연결해주는 다리 역할). state의 변화나 computed 값의 변화를 볼 수 있으려면 GUI의 일부를 다시 그리는 *reaction* 이 필요함
     - reaction은 computed 값과 유사하지만, 정보를 생성하는 대신 **콘솔 출력, 네트워크 요청, DOM 패치 적용을 위해 React 컴포넌트 트리를 점진적으로 업데이트**하는 등의 부수효과를 생성

### 리액트에 observer 적용하기: observer HOC 사용

- React를 사용하는 경우 [설치 중에 선택한](https://ko.mobx.js.org/installation.html#installation)바인딩 패키지에서 `observer` 함수를 이용하여 컴포넌트를 감싸서 반응형으로 만들 수 있음 (ex. mobx-react의 observer 혹은 Observer)
- 참고: **HOC란** 리액트 컴포넌트를 아규먼트로 받아서 새로운 리액트 컴포넌트를 리턴하는 함수

```jsx
import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react-lite'

const TodoListView = observer(({ todoList }) => (
  <div>
    <ul>
      {todoList.todos.map(todo => (
        <TodoView todo={todo} key={todo.id} />
      ))}
    </ul>
    Tasks left: {todoList.unfinishedTodoCount}
  </div>
))

const TodoView = observer(({ todo }) => (
  <li>
    <input type="checkbox" checked={todo.finished} onClick={() => todo.toggle()} />
    {todo.title}
  </li>
))

const store = new TodoList([new Todo('Get Coffee'), new Todo('Write simpler code')])
render(<TodoListView todoList={store} />, document.getElementById('root'))
```

- observer는 리액트 컴포넌트를 렌더링하는 데이터의 derivation으로 변환함
- MobX에서는 필요할 때마다 컴포넌트가 다시 렌더링 되며, 그 이상은 렌더링 되지않음
- 위 예시에서 onClick 핸들러로 toggle 액션 사용하면 필요한 TodoView 컴포넌트를 강제로 리렌더링함. 하지만, TodoListView 컴포넌트의 경우, 완료되지 않은 작업의 수(unfinishedTodoCount)가 변경된 경우에만 다시 렌더링됨.
- Observer를 통해서 감싸줄 수도 있음 ([https://mobx-react.js.org/observer-component](https://mobx-react.js.org/observer-component))

```jsx
import { Observer } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0

function ObservePerson() {
  return <Observer>{() => <GetStore>{store => <div>{store.wontSeeChangesToThis}</div>}</GetStore>}</Observer>
}
```

### 리액트와 Mobx 같이 사용하기

- MobX는 React와 독립적으로 작동하지만, 일반적으로 React와 함께 사용됨.
- 위에서 설명한 React 컴포넌트를 감싸는 observer HOC 참고!
- Observer HoC는 *렌더링 중에* 사용되는 *모든 observable*에 React 컴포넌트들을 자동으로 구독함. 결과적으로 관련 observable이 변경되면 컴포넌트들을 자동으로 다시 렌더링 됨.
- 또한, _관련된_ 변경사항이 없을 때는 컴포넌트가 다시 렌더링 되지 않음. 따라서, 컴포넌트로부터 접근할 수는 있지만 실제로 읽지 않는 observable은 다시 렌더링 되지 않음.
  - 따라서 위 로직에 따라 MobX는 리액트 앱을 최적화 시키고, 과도한 렌더링을 방지할 수 있음
- **React Context**를 사용해서 외부 state를 사용할 수 있음
  - React Context: context는 컴포넌트안에서 전역적으로 데이터를 공유하도록 나온 개념임. 그런 데이터는 로그인 데이터, 웹 내 사용자가 쓰는 설정파일, 테마, 언어 등등 다양하게 컴포넌트간 공유되어야할 데이터로 사용하면 좋음

---

### 출처

> - [MobX 공식 도큐](https://ko.mobx.js.org/)
> - [Redux와 Mobx](https://nofall.tistory.com/entry/redux와-mobx)
> - [React에서 Mobx 경험기 (Redux와 비교기)](https://techblog.woowahan.com/2599/)
> - [Web: MobX의 장점과 기본 원칙](https://medium.com/hcleedev/web-mobx%EC%9D%98-%EC%9E%A5%EC%A0%90%EA%B3%BC-%EA%B8%B0%EB%B3%B8-%EC%9B%90%EC%B9%99-40a36c1cf634)
> - [ React - Redux framework](https://www.slideshare.net/binhqdgmail/006-react-redux-framework)
> - [props drilling](https://velog.velcdn.com/images/khy226/post/f2062ad7-64ee-4391-9e21-93941736f024/image.png)
> - [context-api란](https://kyounghwan01.github.io/blog/React/react-context-api/#context-api란)
> - [Mobx 공식문서 튜토리얼 getting started](https://simsimjae.tistory.com/453)
