---
title: 코어 자바스크립트 정리 - 3. this
date: '2022-02-19T22:45:32.169Z'
description: 자바스크립트에서 this 란?
category: 'Books'
keywords: '코어 자바스크립트, this'
image: 'https://velog.velcdn.com/images/khy226/post/f3aebb1f-455b-481a-b690-f8aaa467517d/316439749g.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/f3aebb1f-455b-481a-b690-f8aaa467517d/316439749g.jpeg" style="width: 50%; padding-bottom: 50px;">

### this 란?

- 대부 타 객체지향 언어에서 this는 클래스로 생성한 인스턴스 객체를 의미. 클래스 내부에서만 사용
- Javascript 에서 this는 어디서는 사용 가능.
- 함수와 객체(메서드)의 구분이 느슨한 자바스크립트에서 this는 실질적으로 이 둘을 구분하는 거의 유일한 기능

---

### 1. 상황에 따라 달라지는 this

- js에서 this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다.
- 즉, this는 함수를 호출할 때 결정된다. 함수를 어떤 방식으로 호출하느냐에 따라 값이 달라짐.

#### **전역공간에서 this**

- 전역 공간에서 this는 전역 객체를 가리킨다.
- 전역 객체는 js 런타임 환경에 따라 다른 이름, 정보를 가지고 있는데 브라우저 환경에서 전역객체는 window이고, Node.js에서는 global이다.

![https://user-images.githubusercontent.com/72732446/154790750-638e0380-98fa-4af7-ad7f-b409ca9bf5d6.png](https://user-images.githubusercontent.com/72732446/154790750-638e0380-98fa-4af7-ad7f-b409ca9bf5d6.png)

#### 전역변수와 전역객체:

- **전역변수를 선언하면 자바스크립트 엔진을 이를 전역객체의 프로퍼티로 할당한다.**

```jsx
var a = 1
console.log(a) // 1
console.log(window.a) // 1
console.log(this.a) // 1
```

- 위 예시에서 window.a 와 this.a의 값이 모두 1로 출력된다.
- 그 이유는 자바스크립트의 모든 변수는 특정 객체(LexicalEnvironment) 의 프로퍼티로서 동작하기 때문임.
- 실행 컨텍스트는 변수를 수집해서 LE의 프로퍼티로 저장한다 ⇒ 이후 어떤 변수를 호출하면 L.E를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환.
- 단순하게 (window.)이 생략된 것이라고 여겨도 됨

#### var변수 대신 window프로퍼티 할당:

```jsx
var a = 1
window.b = 2
console.log(a, window.a, this.a) // 1 1 1
console.log(b, window.b, this.b) // 2 2 2
```

전역변수 선언과 전역객체의 프로터티 할당 시 같은 결과가 나온다.

하지만, 전역변수 선언과 전역객체의 프로터티 할당 사이에서 차이가 나는 경우가 있다. 바로 호이트싱 여부 및 configurable(변경 및 삭제 가능성) 여부이다.

아래는 전역 변수, 전역 객체의 삭제 동작이다:

```jsx
var a = 1
delete window.a // false
console.log(a, window.a, this.a) /// 1 1 1

window.c = 3
delete window.c // true
console.log(c, window.c, this.c) // Uncaught ReferenceError: c is not defined
```

위 예시에서 차이점이 나온다. 변수에 delete연산자를 사용할 때 (window.)를 생략한 것으로 이해하면 된다.

- (window.) 전역객체의 프로퍼티로 할당한 경우에는 삭제가 된다.
- (var) 하지만, 전역변수로 선언한 경우에는 삭제가 되지 않는다. 이는 사용자가 의도치 않게 삭제하는 것을 방지하기 위해 마련한 방어 전략이다. (false 리턴)

#### **메서드 호출 시, 그 메서드 내부에서의 this**

- 함수: 미리 정의한 동작을 수행하는 코드 뭉치로, 독립적인 기능 수행
- 메서드: 미리 정의한 동작을 수행하는 코드 뭉치로, 자신을 호출한 대상 객체에 관한 동작을 수행

```jsx
var func = function (x) {
  console.log(this, x)
}
func(1) // Window {...} 1

var obj = {
  method: func,
}
obj.method(2) // { method: f } 2
```

- func라는 익명함수를 호출하니 this로 전역객체 Window가 출력된다
- obj.method라는 메서드를 호출하니, this로 obj가 출력된다.
- 즉, 원래의 익명 함수는 그대로인데 이를 변수에 담아 호출한 경우와 obj 객체의 프로퍼티에 할당해서 호출한 경우의 this가 달라진다.

#### **메서드 내부에서의 this**

어떤 함수를 메서드로서 호출하는 경우, 호출 주체는 바로 함수명(프로퍼티명) 앞의 객체이다.

```jsx
var obj = {
  methodA: function () {
    console.log(this)
  },
  inner: {
    methodB: function () {
      console.log(this)
    },
  },
}

object.methodA() // {methodA: f, inner: {...} } ( === obj )
object.inner.methodB() // {methodB: F} ( === obj.inner)
```

---

### 함수로서 호출할 때 그 함수 내부에서의 this

**1) 함수 내부에서의 this**

- 함수를 함수로서 호출할 경우에는 this가 지정되지 않는다. 이는 호출 주체(객체)를 명시하지 않고 개발자가 코드에 직접 관여해서 실행했기 때문에 호출 주체의 정보를 알 수 없음
- 따라서, 함수에서의 this는 전역 객체를 가리킨다.

**2) 메서드 내부함수에서의 this**

```jsx
var obj1 = {
  outer: function () {
    console.log(this) // (1) obj1
    var innerFunc = function () {
      console.log(this) // (2) 전역객체(window) (3)obj2
    }
    innerFunc() // --- (2) 실행

    var obj2 = {
      innerMethod: innerFunc,
    }
    object2.innerMethod() // --- (3) 실행
  },
}
obj1.outer() // ----(1) 실행
```

- this 바인딩에 관해서 함수 실행하는 당시의 주변 환경(메서드 내부인지, 함수 내부인지 등)은 중요하지 않고, 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건임

#### this를 바인딩하지 않는 함수

- ES6에서는 함수 내부에서 this가 전역 객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 화살표 함수 (arrow function)를 새로 도입함.
- 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용할 수 있음.

```jsx
var obj = {
  outer: function () {
    console.log(this) // (1) { outer: f}
    var innerFunc = () => {
      console.log(this)
    }
    innerFunc()
  },
}
obj.outer()
```

**콜백함수 호출 시 그 함수 내부에서의 this**

- 콜백함수란 함수 A의 제어권을 다른 함수(또는 메서드)B에게 넘겨주는 경우, 함수 A를 콜백 함수라고 한다.
- 콜백 함수에서의 this는 상황에 따라 변한다.
- 제어권을 가지는 함수 (메서드)가 콜백 함수에서 this를 무엇으로 할지를 결정하고, 특별히 정의하지 않은 경우 전역객체를 바라본다.

**생성자 함수 내부에서의 this**

- 생성자 함수: 어떤 공통된 성질을 지니는 객체들을 생성하는데 사용하는 함수
  - 객체지향 언어: 생성자는 클래스, 클래스를 통해 만든 객체를 인스턴스 라고 함.
- 프로그래밍적으로 ‘생성자'는 구체적인 인스턴스를 만들기 위한 일종의 틀
- js에서 new 명령어와 함께 함수를 호출하면 해당 함수가 생성자로서 동작함.
- 어떤 함수가 생성자 함수로서 호출된 경우, 내부에서의 this는 곧 새로 만들 구체적인 인스턴스 자신

예시)

```jsx
var Cat = function (name, age) {
  //  Cat 변수에 익명 함수 할당
  this.bark = '야옹'
  this.name = name
  this.age = age
}

var choco = new Cat('초코', 7) // 생성자 함수 내부에서의 this는 choco 인스턴스
console.log(choco)

// Cat { bark: "야옹", name: "초코", age: 7} --- Cat 클래스의 인스턴스 객체 출력
```

---

### 2. 명시적으로 this를 바인딩 하는 방법

- 아래 메서드들을 통해 this에 별도의 대상을 바인딩 할 수도 있다. (call, apply, bind 메서드)

#### 1) **call 메서드**

```jsx
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

- call 메서드: 메서드의 호출 주체인 함수를 즉시 실행하도록 명령
- call 메서드의 첫 번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 함
- 즉, 함수를 그냥 실행하면 this는 전역객체를 참조하지만, call 메서드를 이용하면 임의의 객체를 this로 지정 가능

```jsx
var func = function (a, b, c) {
  console.log(this, a, b, c)
}

func(1, 2, 3) // Window{ ... } 1 2 3
func.call({ x: 1 }, 4, 5, 6) // { x:1 } 4 5 6
```

#### 2) **apply 메서드**

```jsx
Function.prototype.apply(thisArg[, argsArray])
```

- apply 메서드: call 메서드와 기능적으로 동일. 다만, 두번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정

```jsx
var func = function (a, b, c) {
  console.log(this, a, b, c)
}

func(1, 2, 3) // Window{ ... } 1 2 3
func.apply({ x: 1 }, [4, 5, 6]) // { x:1 } 4 5 6
```

call / apply 메서드를 활용해 중복을 줄일 수 있다. 아래 예시는 생성자 내부에 다른 생성자와 공통된 내용이 있을 경우 call 또는 apply를 이용해 다른 생성자를 호출해 반복을 줄이는 예시이다:

```jsx
function Person(name, gender) {
  this.name = name
  this.gender = gender
}

function Student(name, gender, school) {
  Person.call(this, name, gender)
  this.school = school
}

function Employee(name, gender, company) {
  Person.call(this, name, gender)
  this.company = company
}

var by = new Student('보영', 'female', '단국대')
var jn = new Employee('재난', 'male', '구글')
```

#### 3) **bind 메서드**

> 함수 바인딩이란 특정한 this값과 특정한 매개변수를 넘기면서 다른 함수를 호출하는 함수입니다. 많은 자바스크립트 라이브러리들은 함수를 특정한 컨텍스트에 묶는 함수를 만들었습니다. 일반적으로 이런 함수를 bind()라고 부릅니다. 기본 구조는 아래와 같습니다. (출처: [https://blog.sonim1.com/158](https://blog.sonim1.com/158))

```jsx
function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments)
  }
}
```

ECMAScript5에서 bind()메서드가 도입되었으며 아래와 같이 사용합니다.

```jsx
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```

- ES5에서 추가된 기능. call 과 비슷하지만, 즉시 호출하지는 않고 넘겨 받은 this 및 인수들을 바탕으로 새로운 함수 반환.
- 즉, bind 메서드는 함수에 this를 미리 적용하는 것과 부분 적용 함수를 구현하는 두 가지 목적을 지님

```jsx
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d)
}
func(1, 2, 3, 4) // Window{...} 1 2 3 4

var bindFunc1 = func.bind({ x: 1 })
bindFunc1(5, 6, 7, 8) // { x: 1 } 5 6 7 8

var bindFunc2 = func.bind({ x: 1 }, 4, 5)
bindFunc2(6, 7) // { x: 1} 4 5 6 7
bindFunc2(8, 9) // { x: 1} 4 5 8 9
```

#### 4) **화살표 함수의 예외사항**

- ES6에 새롭게 도입된 화살표 함수는 실행 컨텍스트 생성 시 this를 바인딩 하는 과정이 제외됨.
- 즉, 이 함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근

```jsx
var obj = {
  outer: function () {
    console.log(this) // { outer: [Function: outer] }
    var innerFunc = () => {
      console.log(this) // { outer: [Function: outer] }
    }
    innerFunc()
  },
}
obj.outer()
```

5. **별도의 인자로 this를 받는 경우 (콜백 함수 내에서의 this)**

- 콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this로 지정할 객체(thisArg)를 인자로 지정할 수 있는 경우가 있음.
- 배열 메서드에 이러한 경우가 많이 있으며, 대표적인 예로 forEach가 있음 (ex. foreach, map, filter, some, every, find, findIndex, flatMap, from, 그리고 ES6의 Set, Map)

foreach 메서드 예시:

```jsx
var report = {
  sum: 0,
  count: 0,
  add: function () {
    // arguments 를 배열로 변환해서 args 변수에 담는다
    var args = Array.prototype.slice.call(arguments)
    // 해당 배열(args)를 순회하면서 콜백 함수 실행
    args.forEach(function (entry) {
      this.sum += entry
      ++this.count
    }, this) // 콜백 함수 내부에서의 this가 해당 this로 바인딩 됨!
  },
  average: function () {
    return this.sum / this.count
  },
}
report.add(60, 85, 95)
console.log(report.sum, report.count, report.average()) // 240 3 80
```

#### <해설>

- 60, 85, 90를 인자로 삼아 add 메서드를 호출하면, 이 세 인자를 배열로 만들어 forEach 메서드를 실행
- 콜백 함수 내부에서의 this는 add 메서드에서의 this가 전달된 상태이므로, add 메서드의 this(report)를 그대로 가리킴.
- 따라서, 배열의 세 요소를 순회하면서 report.sum 값 및 report.count 값이 차례로 바뀌고, 순회 마치면 report.sum 에는 240이, report.count에는 3이 담김

---

### 출처

> - 정재남, 『코어 자바스크립트』, 위키북스(2019), p65-93.
> - [19. 자바스크립트 - 함수 바인딩](https://blog.sonim1.com/158)
