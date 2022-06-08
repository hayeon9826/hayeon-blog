---
title: "리액트 체크박스 에러 해결"
date: "2021-09-07T22:40:32.169Z"
description: 리액트 checked prop 올바르게 사용하기!
---

![img](https://velog.velcdn.com/images/khy226/post/9d2040af-d5a5-4add-ad6c-d50c6e819d27/0_XCgoYU9sqt95P8J0.png)

### 문제 상황

리액트에서 체크박스를 사용하던 도중에, 아래와 같은 에러가 발생했다.

> Warning: Failed prop type: You provided a `checked prop` to a form field without an onChange handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

에러 내용을 보니, checkbox 인풋을 사용할 때 `onClick` 핸들러와 `checked` 속성을 동시에 사용하면 안된다는 내용이었다.


### 해결 방안

> If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

에러 내용에서 제시한 해결방법은 다음과 같았다.

1. `checked` 속성 대신에 `defaultChecked` 속성을 사용한다.
2. `onClick` 대신에 `onChange` 핸들러를 사용한다.
3. `onClick`을 사용하고 싶으면 `readOnly` 속성을 추가한다.


### 해결 과정 (코드)

에러가 났던 코드:

```javascript
  <input
    type="radio"
    id="short_answer"
    name={`question-type-${i}`}
    value="short_answer"
    className="apperance-none mr-2"
    checked={survey?.question_type === 'short_answer'}
    onClick={() => handleChangeQuestionType(i, 'short_answer')}
  />
```


checked를 defaultChecked로 수정을 하니 에러 로그가 없어졌다.

```javascript
  <input
    type="radio"
    id="short_answer"
    name={`question-type-${i}`}
    value="short_answer"
    className="apperance-none mr-2"
    defaultChecked={survey?.question_type === 'short_answer'}
    onClick={() => handleChangeQuestionType(i, 'short_answer')}
  />
```