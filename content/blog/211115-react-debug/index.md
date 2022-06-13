---
title: '[React] 디버깅: 폼 필드 value 값이 undefined 일때'
date: '2021-11-15T22:40:32.169Z'
description: 'Warning: A component is changing an uncontrolled input of type text to be controlled.'
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/9c51dee0-dc11-4272-bf79-4476efa910a4/react.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/9c51dee0-dc11-4272-bf79-4476efa910a4/react.png" style="width: 60%; padding-bottom: 50px;">

### 문제상황

폼 필드를 작업하던 도중, 아래와 같은 에러가 떴다.

```
Warning: A component is changing an uncontrolled input of type text to be controlled.
Input elements should not switch from uncontrolled to controlled (or vice versa).
Decide between using a controlled or uncontrolled input element for the lifetime of the component.*
```

input 필드에 `uncontrolled` 값이 `controlled`로 바뀌었다고 에러가 뜬다.

`uncontrolled` input 엘리먼트는 `undefined` 값 인풋을 뜻하고, `controlled` 는 값이 유효한 인풋을 말한다. 구체적인 정의는 [리액트 공식 도큐](https://ko.reactjs.org/docs/glossary.html#%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-vs-%EB%B9%84%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)를 참고하면 좋다:

> ### 제어 컴포넌트 (Controlled) vs 비제어 컴포넌트 (Uncontrolled)
>
> React는 두 가지 방식으로 form 입력을 처리합니다.
>
> React에 의해 입력값이 제어되는 엘리먼트를 **제어 컴포넌트(controlled component)** 라고 합니다. 사용자가 제어 컴포넌트에 데이터를 입력하면 **변경 이벤트 핸들러**가 호출되고 코드가 (업데이트된 값으로 다시 렌더링에 의해) **입력의 유효 여부를 결정**합니다. 다시 렌더링하지 않으면 form 엘리먼트는 변경되지 않은 상태로 유지됩니다.
>
> **비제어 컴포넌트(uncontrolled component)** 는 form 엘리먼트가 **React 외부**에서 작동하는 것처럼 작동합니다. 사용자가 form 필드(input box, dropdown 등)에 데이터를 입력하면 업데이트된 정보가 React에서 별도 처리할 필요 없이 엘리먼트에 반영됩니다. 그러나, 이는 특정 필드가 특정 값을 갖도록 **강제할 수 없다**는 의미이기도 합니다.
>
> 대부분은 **controlled component**를 사용해야 합니다.
>
> 출처: [제어 컴포넌트 vs. 비제어 컴포넌트](https://ko.reactjs.org/docs/glossary.html#%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-vs-%EB%B9%84%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)

### 디버깅

에러가 나는 부분은 아래와 같았다:

```javascript
// 사용자 데이터를 가져옴
const { data: currentUser, isFetching } = useQuery(
    "currentUser",
    async () => {
      const { data } = await axios.get("/api/users?id=current");
      return data;
    }
  );
  ...


// 폼
return(
<form>
    <input
      type="text"
      {...register("email")}
      value={currentUser?.email}
      placeholder="이메일을 입력해주세요"
    />
</form>
)
```

`currentUser` 데이터를 처음 렌더링 할 때 `email` 필드에는 `undefined` 값이 들어간다.

```react
value={undefined}
```

따라서, 처음에 해당 input은 초깃값이 없는 `uncontrolled` 상태가 된다.

하지만 렌더링이 끝나면 currentUser 값을 모두 불러와 `email` 필드에도 유효한 값이 채워져 `controlled` 상태로 변한다.

```react
value={"test@test"}
```

input 엘리먼트가`uncontrolled` 에서 `controlled` 로 변해 에러가 뜨는 것이었다.

> Input elements **should not switch from uncontrolled to controlled** (or vice versa).

### 해결책

해결책은 두 가지가 있다.

1. `value` 대신 `defaultValue` 값을 넣어준다.

```react
defaultValue={currentUser?.email}
```

> ### Value? DefaultValue?
>
> React 렌더링 라이프사이클에서 form 요소의 **value** 속성은 DOM의 값보다 우선시합니다. 제어되지않는 컴포넌트를 사용하는 경우 React가 초기값을 지정하고 후속 업데이트를 제어하지않는 것이 좋습니다. 이런 케이스를 다루기 위해 value 대신 **defaultValue** 속성을 지정할 수 있습니다. [출처](https://reactjs-kr.firebaseapp.com/docs/uncontrolled-components.html)
>
> \*참고: 일반적으로 값이 변경되지 않는 읽기 전용인 값은 **value**로 정의하고, 값이 변경되는 기본값이 있는 요소는 **defaultValue**로 정의한다.

2. `value` 값이 없어도 `undefined` 값이 뜨지 않도록 default 값을 넣어준다.

```javascript
// {undefined || ''} 는 ''를 반환
value={currentUser?.email || ''}
```

### 참고

> - [[Stack Overflow] A component is changing an uncontrolled input of type text to be controlled error in ReactJS](https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-error)
