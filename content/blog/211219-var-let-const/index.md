---
title: var, let, const의 차이점
date: '2021-12-19T22:40:32.169Z'
description: var, let, const의 개념과 차이점에 대해서 알아보자.
category: 'Javascript'
image: 'https://velog.velcdn.com/images/khy226/post/e61f69c5-ce3c-4586-a9b8-479a92008367/js.001.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/e61f69c5-ce3c-4586-a9b8-479a92008367/js.001.jpeg" style="width: 60%; padding-bottom: 50px;">

> 본 게시물은 [Var, Let, and Const – What's the Difference?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/) 글을 번역하였습니다.

<br />

_ES2015(ES6)와 함께 새로운 기능들이 많이 출시되었다. 많은 자바스크립트 개발자들이 현재 ES6의 새로운 기능들에 익숙해졌고, 자주 사용하고 있다._

물론 이 말이 맞을 수도 있지만, ES6의 특성 중 일부는 여전히 일부 개발자들에게 어려운 과제로 남아있다.

ES6와 함께 제공되는 주요 기능 중 하나는 변수 선언에 사용할 수 있는 `let`과 `const` 이다. 문제는, 우리가 사용해온 기존의`var` 과 차이점이 무엇인지 정확히 모르는 것이다. 만약 이 차이점에 대해 여전히 명확하지 않다면, 이 글을 반드시 읽어주길 바란다.

이 글에서는 `var`, `let` 및 `const`의 스코프(범위), 사용 방법 및 호이스팅에 대해 논의한다.

<hr />

### Var

ES6가 등장하기 전에는 대부분 `var` 을 사용했다. 그러나 `var`로 선언된 변수에는 몇몇 문제가 있었고, 이를 보완하기 위해 새로운 변수 선언 방식이 등장해야 했다. 이 문제에 대해 논의하기 전에 `var` 에 대해 좀 더 자세히 알아보도록 하자.

### Var의 스코프

**스코프**(scope)는 기본적으로 변수를 사용할 수 있는 위치를 의미한다. `var` 선언은 전역(global) 변수로 사용되거나 함수, 지역(local) 변수로도 사용된다.

`var` 변수가 함수 외부에 선언되면 스코프는 전역(global)이 된다. 즉, 함수 블록 외부에 `var`로 선언된 모든 변수를 전체 window에서 사용할 수 있다.

`var`가 함수 내에서 선언되면 **함수 스코프**를 갖는다. 즉, 해당 함수 내에서만 사용 가능하며, 액세스할 수 있다.

더 자세히 이해하기 위해 아래 예를 살펴보자.

```javascript
var greeter = 'hey hi'

function newFunction() {
  var hello = 'hello'
}
```

여기서 `greeter`는 함수 밖에 존재하는 전역 스코프이며, `hello`는 함수 내에 있으므로 함수 스코프이다. 그래서 함수 밖에서는 변수 `hello`에 접근할 수 없다. 아래 예시를 보자:

```javascript
    var 테스터 = "hey hi";

    기능 newFunction() {
        var hello = "hello";
    }
    console.log(hello); // 오류: hello가 정의되지 않았습니다.
```

함수 밖에서는 `hello`를 사용할 수 없기 때문에 오류가 발생한다.

### var는 재선언 및 업데이트가 가능하다

즉, `var` 는 아래와 같이 동일한 스코프 내에서 변수 재선언을 할 수 있고 오류가 발생하지 않는다.

```javascript
var greeter = 'hey hi'
var greeter = 'say hello'
```

그리고 업데이트 또한 가능하다:

```javascript
var greeter = 'hey hi'
greeter = 'say hello'
```

### var의 호이스팅

우선 **호이스팅**에 대해서 알아보자. 호이스팅의 사전적 의미는 아래와 같다:

> JavaScript에서 호이스팅(hoisting)이란, 인터프리터가 **변수와 함수의 메모리 공간**을 **선언 전에 미리 할당**하는 것을 의미합니다. `var`로 선언한 변수의 경우 호이스팅 시 `undefined`로 변수를 초기화합니다. 반면 `let`과 `const`로 선언한 변수의 경우 호이스팅 시 변수를 초기화하지 않습니다.
>
> 호이스팅을 설명할 땐 주로 **"변수의 선언과 초기화를 분리한 후, 선언만 코드의 최상단으로 옮기는"** 것으로 말하곤 합니다. 따라서 변수를 정의하는 코드보다 사용하는 코드가 앞서 등장할 수 있습니다. 다만 선언과 초기화를 함께 수행하는 경우, 선언 코드까지 실행해야 변수가 초기화된 상태가 됨을 주의하세요.
>
> \*출처: [호이스팅 - MDN Web Docs](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)

`호이스팅(hoisting)`은 **변수와 함수 선언이 코드 실행 전에 해당 스코프의 맨 위**로 이동하는 자바스크립트 메커니즘이다. 즉, 만약 아래와 같은 코드를 실행하면:

```javascript
console.log(greeter)
var greeter = 'hello'
```

다음과 같이 해석된다:

```javascript
var greeter
console.log(greeter), // greeter is undefined
  (greeter = 'hello')
```

즉, `var` 변수는 해당 스코프의 맨 위로 올라가고 `undefined` 값으로 초기화된다.

### var의 문제점

하지만 `var` 에는 문제점이 있다. 아래 예를 보자:

```javascript
var greeter = 'hey hi'
var times = 4

if (times > 3) {
  var greeter = 'say Hello instead'
}

console.log(greeter) // "say Hello instead"
```

`times > 3`는 true를 반환하기 때문에, `greeter`는 처음에 정의된 `'hey hi'` 대신, `"say Hello instead"`로 다시 정의된다. `greeter`를 다시 정의하려는 경우에는 문제가 되지 않지만 <u> `greeter`가 이전에 이미 정의되어 있다는 것을 인식하지 못하는 경우</u>에는 문제가 된다.

즉, 코드의 다른 부분에서 `greeter`를 사용한 경우, 의도하지 않은 값이 출력될 수 있으며, 코드에 많은 버그가 발생할 수 있다. 이것이 바로 `let`과 `const`이 필요한 이유이다.

<hr />

### Let

요즘 변수 선언에는`let`이 더 선호된다. `let`은 앞서 설명한 `var`의 문제점들을 해결해주는데, 어떻게 해결하는지 더 자세히 알아보자.

### let은 블록 스코프 내에서 작동한다.

**블록(block)**은 {}으로 바인딩된 코드 덩어리이다. 즉, {} 안에 있는 것은 모두 블록이다.

따라서 블록에 `let`으로 선언된 변수는 해당 블록 내에서만 사용할 수 있다. 예를 들어 아래 코드를 보자.

```javascript
let greeting = 'say Hi'
let times = 4

if (times > 3) {
  let hello = 'say Hello instead'
  console.log(hello) // "say Hello instead"
}
console.log(hello) // hello is not defined
```

블록 외부에서 `hello`를 사용하면 `undefined`오류가 반환된다. 이는 `let`변수는 블록 스코프내에서만 작동되기 때문이다.

### let은 업데이트할 수는 있지만 재선언할 수는 없다.

`var`와 마찬가지로, `let`으로 선언된 변수는 스코프 내에서 업데이트될 수 있다. 하지만, `var`와 달리 `let` 변수는 해당 스코프 내에서 **다시 선언할 수 없다**.
예를 들어 아래 예제는 작동이 되지만,

```javascript
let greeting = 'say Hi'
greeting = 'say Hello instead'
```

아래 예제는 오류를 반환한다.

```javascript
let greeting = 'say Hi'
let greeting = 'say Hello instead' // error: Identifier 'greeting' has already been declared
```

그러나 동일한 변수가 다른 스코프에서 정의되면 오류가 발생하지 않는다.

```javascript
let greeting = 'say Hi'
if (true) {
  let greeting = 'say Hello instead'
  console.log(greeting) // "say Hello instead"
}
console.log(greeting) // "say Hi"
```

왜 오류가 나지 않을까? 두 인스턴스의 스코프가 다르기 때문에 아예 다른 변수로 취급되기 때문이다.

덕분에 `let`이 `var`보다 더 선호된다. `let`을 사용할 때는 변수가 해당 스코프 내에서만 존재하므로, <u>이전에 동일한 변수명을 사용한 적이 있는지 없는지</u> 신경쓸 필요가 없다.

또한 변수는 한 스코프 내에서 두 번 이상 선언될 수 없기 때문에 앞에서 얘기한 `var`의 문제는 더 이상 발생하지 않는다.

### let 호이스팅

`var`처럼, `let`은 선언을 최상단으로 끌어올린다. 하지만 `undefined`으로 초기화되는 `var`와 달리 `let` 변수는 **초기화되지 않는다**. 따라서 선언 전에 `let` 변수를 사용하려고 하면 `Reference Error`가 발생한다.

<hr />

### Const

`const`로 선언된 변수는 **상수** 값을 유지한다. `const` 선언은 `let` 선언과 과 몇 가지 유사점을 공유한다.

### const 선언은 블록 스코프이다.

`let` 선언과 마찬가지로, `const` 선언은 선언된 블록 내에서만 접근할 수 있다.

### const를 업데이트하거나 다시 선언할 수 없다.

즉, `const`로 선언된 변수의 값은 해당 스코프 내에서 <u>항상 동일하게 유지</u>됨을 의미한다. `const` 로 선언된 변수는 **업데이트하거나 다시 선언할 수 없다.** 따라서 변수를 `const`로 선언하면 아래 작업을 수행할 수 없다.

```javascript
const greeting = 'say Hi'
greeting = 'say Hello instead' // error: Assignment to constant variable.
```

동일하게, 아래 작업도 수행할 수 없다.

```javascript
const greeting = 'say Hi'
const greeting = 'say Hello instead' // error: Identifier 'greeting' has already been declared
```

따라서 모든 `const` 는 **첫 선언에서 초기화**되어야 한다.

하지만 `const`로 선언된 **객체(object)**에 대해서는 다소 다르게 동작한다. <u>`const` 객체는 업데이트할 수 없지만 이 **객체의 속성**은 업데이트할 수 있다.</u> 따라서 `const` 객체를 다음과 같이 선언하면:

```javascript
const greeting = {
  message: 'say Hi',
  times: 4,
}
```

아래와 같이 변경할 수 없지만,

```javascript
greeting = {
  words: 'Hello',
  number: 'five',
} // error:  Assignment to constant variable.
```

다음을 수행할 수 있다.

```javascript
greeting.message = 'say Hello instead'
```

이렇게 하면 오류를 반환하지 않고 `greeting.message` 값이 업데이트된다.

### const의 호이스팅

`let`과 마찬가지로 `const` 선언 역시 최상단으로 호이스팅 되지만, **초기화되지는 않는다.**

차이를 놓칠 경우를 대비해서 다음과 같이 정리한다:

- `var `선언은 전역 혹은 함수 스코프지만, `let` 및 `const`는 블록 스코프이다.
- `var` 변수는 해당 스코프 내에서 업데이트 및 재선언 될 수 있다; `let` 변수는 업데이트될 수 있지만 재선언할 수 없다; `const` 변수는 업데이트와 재선언 모두 불가하다.
- 세 가지 모두 최상단으로 호이스팅된다. 차이점은, `var`은 `undefined` 상태로 초기화되지만, `let` 과 `cont` 는 초기화되지 않는다.
- `var`와 `let`은 초기화하지 않고 선언할 수 있지만, `const`는 선언과 동시에 초기화해야 한다.

<br />
<hr />

### 출처

> - [Var, Let, and Const – What's the Difference?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)
> - [호이스팅 - 용어사전 (MDN Web Docs)](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
