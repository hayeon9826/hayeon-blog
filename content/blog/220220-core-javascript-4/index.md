---
title: 코어 자바스크립트 정리 - 4. 콜백함수
date: '2022-02-20T22:45:32.169Z'
description: '콜백함수: 다른 코드의 인자로 넘겨주는 함수'
category: 'Books'
keywords: '코어 자바스크립트, 콜백, callback'
image: 'https://velog.velcdn.com/images/khy226/post/f3aebb1f-455b-481a-b690-f8aaa467517d/316439749g.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/f3aebb1f-455b-481a-b690-f8aaa467517d/316439749g.jpeg" style="width: 50%; padding-bottom: 50px;">

---

## 1. 콜백 함수란?

- 콜백함수: 다른 코드의 인자로 넘겨주는 함수.
- 다른 코드(함수 또는 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수.

## 2. 제어권

### 1) 호출 시점

```jsx
var count = 0
var cbFufnc = function () {
  // 콜백함수
  console.log(count)
  if (++count > 4) clearInterval(timer)
}
var timer = setInterval(cbFunc, 300)

// -- 실행 결과 --
// 0 (0.3초)
// 1 (0.6초)
// 2 (0.9초)
// 3 (1.2초)
// 4 (1.5초)
```

- setInterval에 전달한 첫번째 인자인 cbFunc함수가 바로 콜백함수이고, 0.3초마다 자동으로 실행됨
- 콜백 함수 내부에서 count 값을 출력하고, count를 1초 증가시킨 다음, 그 값이 4보다 크면 반복 실행을 종료
- setInterval이라는 ‘다른코드'에 첫번째 인자로 cbFunc 함수를 넘겨주자, 제어권을 넘겨받은 setInterval이 스로 판단에 따라 적절한 시점(0.3초)마다 이 익명함수를 실행함.
- 이처럼, 콜백함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가짐

| code                      | 호출 주체   | 제어권      |
| ------------------------- | ----------- | ----------- |
| cbFunc();                 | 사용자      | 사용자      |
| setInterval(cbFunc, 300); | setInterval | setInterval |

### 2) 인자

콜백 함수 예제 (map):

```jsx
var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index)
  return currentValue + 5
})
console.log(newArr)

// -- 실행 결과 --
// 10 0
// 20 1
// 30 2
// [15, 25, 35]
```

위에서 사용한 map 함수는 아래와 같이 콜백 함수로 구성되어 있다.

```jsx
Array.prototype.map(callback[, thisArg]}
callback: function(currentValue, index, array)
```

- map 메서드에 정의된 규칙에는 콜백 함수의 인자로 넘어올 값들 및 그 순서도 포함되어있음.
- 콜백 함수를 호출하는 주체가 사용자가 아닌 Map 메서드 이므로, map 메서드가 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지가 전적으로 map메서드에게 달림
- 이처럼, 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 가짐

### 3) this

- 콜백함수도 함수이기 때문에, 기본적으로 this가 전역객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조함.

```jsx
setTimeout(function () {
  console.log(this)
}, 300) // (1) Window { ... }
;[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this) // (2) Window { ... }
})

document.body.innerHTML += '<button id="a">클릭</button>'
document.body.querySelector('#a').addEventListener('click', function (e) {
  console.log(this, e) // (3) <button id="a">클릭</button>
}) //  MouseEvent { isTrusted: true, ... }
```

- (1) setTimeout은 내부에서 콜백 함수를 호출할 때 call 메서드의 첫 번째 인자에 전역 객체를 넘기기 때문에, 콜백 함수 내부에서의 this가 전역 객체를 가리킴
- (2) forEach는 ‘별도의 인자로 this를 받는 경우'에 해당된다. 하지만, 별도의 인자로 this를 넘져주지 않았기 때문에 전역 객체를 가리킴
- (3) addEventListener는 내부에서 콜백 함수를 호출할 때 call 메서드의 첫번째 인자에 addEventListener 메서더의 this를 그래도 넘기도록 정의됨

## 3. 콜백 함수는 함수다

- 콜백 함수는 함수다
- 즉, 콜백 함수로 어떤 객체의 메서드를 전달하더라고 그 메서드는 메서드가 아닌 ‘함수'로서 호출된다.

```jsx
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i)
  },
}
obj.logValues(1, 2) // (1) {vals: [1, 2, 3], logValues: f} 1 2
;[4, 5, 6].forEach(obj.logValues) // (2) Window  {...} 4 0
```

- (1) obj 객체의 logValues는 메서드로 정의됨. 따라서 (1) 에서는 이 메서드의 이름앞에 점이 있으니 메서드로서 호출. 이때, this는 obj를 가리키고, 인자로 넘어온 1, 2가 출력됨
- (2) 이 메서드를 forEach 함수의 콜백 함수로서 전달함. obj를 this로 하는 메서드를 그대로 전달한게 아니라, obj.logValues가 가리키는 함수만 전달. 즉, forEach에 의해 콜백이 함수로서 호출이 되고, 별도로 this를 지정하지 않았으므로 함수 내부에서의 this는 전역객체를 바라봄
- 즉, 객체의 메서드를 콜백 함수로 전달하면 해당 객체를 this로 바라볼 수 없다.

## 4. 콜백 함수 내부의 this에 다른 값 바인딩하기

- 위에서 “객체의 메서드를 콜백 함수로 전달하면 해당 객체를 this로 바라볼 수 없다.” 라고 했다. 하지만, 그럼에도 콜백 함수 내부의 this가 객체를 바라보게하고 싶다면?
  - 전통적으로는 this를 다른 변수(OTHER)에 담아, 콜백 함수로 활용할 함수에서는 this 대신 그 변수(OTHER)를 사용하게 하고, 이를 클로저로 만드는 방식을 씀

**콜백 함수 내부의 this에 다른값을 바인딩(전통적인 방식):**

```jsx
var obj1 = {
  name: 'obj1',
  func: function () {
    var self = this
    return function () {
      console.log(self.name)
    }
  },
}
var callback = obj1.func() // (1)
setTimeout(callback, 1000) // (2) obj1
```

- obj1.func 메서드 내부에서 self 변수에 this를 담고, 익명함수를 반환한다.
- (1) 에서 obj1.func()를 호출하면 앞서 선언한 내부함수가 반환되어 callback 변수에 담긴다.
- (2)에서 이 callback을 setTimeout함수에 인자로 전달하면 1초 뒤 callback이 실행되면서 ‘obj1’을 출력한다.
- 하지만 위 코드는 너무 번거롭고 비효율적이다.

콜백 함수 내부에서 this를 사용하지 않을 경우:

```jsx
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(obj1.name)
  },
}
setTimeout(obj1.func, 1000)
```

ES5의 bind 메서드를 활용해서 바인딩 할 수도 있다:

```jsx
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(this.name)
  },
}
setTimeout(obj1.func.bind(obj1), 1000)
```

## 5. 콜백 지옥과 비동기 제어

- 콜백 지옥(callback hell): 콜백 함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상으로, 자바스크립트에서 흔히 발생하는 문제이다.
  - 주로 이벤트 처리나 서버 통신과 같이 비동기적인 작업을 수쟁하기 위해 이런 형태가 자주 등장함
- 비동기(aynchronous): 독의 반대말. 현재 실쟁중인 코드의 완료 여부와 무관하게, 즉시 다음코드로 넘어가는 실행 방식.
  - 사용자의 요청에 의해 특정 시간 경과전까지 함수 실행을 보류하거나 (setTimeout), 사용자의 직접적인 개입이 있을 때 어떤 함수를 실행하도록 대기하거나(addEventListener), 웹브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 응답이 왔을 때 함수를 실행하도록 대기하는 등(XMLHttpRequest), 별도의 요청, 실행 대기, 보류 등과 관련된 코드는 비동기적인 코드이다.

콜백 지옥 예시:

```jsx
setTimeout(
  function (name) {
    var coffeeList = name
    console.log(coffeeList)

    setTimeout(
      function (name) {
        coffeeList += ', ' + name
        console.log(coffeeList)

        setTimeout(
          function (name) {
            coffeeList += ', ' + name
            console.log(coffeeList)
            setTimeout(
              function (name) {
                coffeeList += ', ' + name
                console.log(coffeeList)
              },
              500,
              '에스프레소',
            )
          },
          500,
          '카페라떼',
        )
      },
      500,
      '카페모카',
    )
  },
  500,
  '아메리카노',
)

// 결과:
// 아메리카노
// 아메리카노, 카페모카
// 아메리카노, 카페모카, 카페라떼
// 아메리카노, 카페모카, 카페라떼, 에스프레소
```

결과:

![https://user-images.githubusercontent.com/72732446/154844316-b5b1e996-7dce-4f50-b6d5-af2faad685c9.png](https://user-images.githubusercontent.com/72732446/154844316-b5b1e996-7dce-4f50-b6d5-af2faad685c9.png)

- 위 코드는 0.5초 주기마다 커피목록을 수집하고 출력한다. 각 콜백은 커피 이름을 전달해 목록에 커피명을 추가한다.
- 위 콜백 함수들의 가족성을 개선하려면 현재 익명함수들을 기명함수로 전환하는 방법이 있다

#### 콜백 지옥 해결 1 - 기명함수로 전환

```jsx
var coffeeList = ''

var addAmericano = function (name) {
  coffeeList += name
  console.log(coffeeList)
  setTimeout(addMocha, 500, '카페모카')
}

var addMocha = function (name) {
  coffeeList += ', ' + name
  console.log(coffeeList)
  setTimeout(addLatte, 500, '카페라떼')
}

var addLatte = function (name) {
  coffeeList += ', ' + name
  console.log(coffeeList)
  setTimeout(addEspresso, 500, '에스프레소')
}

var addEspresso = function (name) {
  coffeeList += ', ' + name
  console.log(coffeeList)
}

setTimeout(addAmericano, 500, '아메리카노')
```

결과:

- 위 방식 코드는 가독성을 높이고, 함수 선언과 호출만 구분할 수 있다면 위에서부터 아래로 순서대로 읽어내려가는 데 어려움이 없음
- 하지만 위 코드가 최선이라고 할 수는 없음. 일회성 함수를 전부 변수에 할당하는 것이 비효율적임
- 자바스크립트는 십수 년간 비동기적인 작업을 동기적으로, 혹은 동기적인 것처럼 보이게끔 처리해주는 장치를 마련함.
- ES6에서는 Promise, Generator 등이 도입됐고, ES2017에서는 aync/await 가 도입됨.

#### 콜백 지옥 해결 2 - 비동기 작업의 동기적 표현

**1) Promise 예시**

```jsx
var addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var newName = prevName ? prevNAme + ', ' + name : name
        console.log(newName)
        resolve(newName)
      }, 500)
    })
  }
}
addCoffee('아메리카노')().then(addCoffee('카페모카')).then(addCoffee('카페라떼')).then(addCoffee('에스프레소'))
```

- new 연산자와 함께 호출한 Promise의 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행되지만, 그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행 되지 전까지는 다음(then) 또는 오류 구문(catch)로 넘어가지 않는다.
- 따라서, 비동기 작업이 완료되어야만 resolve 또는 reject를 호출하는 방법으로 비동기 작업의 동기적 표현이 가능함.

**2) Generator**

```jsx
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ', ' + name : name)
  }, 500)
}

var coffeeGenerator = function* () {
  var americano = yield addCoffee('', '아메리카노')
  console.log(americano)
  var mocha = yield addCoffee('', '카페모카')
  console.log(mocha)
  var latte = yield addCoffee('', '카페라떼')
  console.log(latte)
  var espresso = yield addCoffee('', '에스프레소')
  console.log(espresso)
}

var coffeeMaker = coffeeGenerator()
coffeeMaker.next()
```

- ‘\*’가 붙은 coffeeGenerator 함수가 바로 Generator 함수이다.
- Generator 함수를 실행하면 Iterator가 반환되는데, Iterator는 next라는 메서드를 가짐.
- 이 next 메서드를 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 yield에서 함수의 실행을 멈춤.
- 이후 다시 next 메서드를 호출하면 앞서 멈췄던 부분부터 시작해서 다음 yield에서 함수의 실행을 멈춤 (반복)
- 따라서, 비동기 작업이 완료되는 시점마다 next 메서드를 호출해준다면 Generator 함수 내부의 소수가 위에서부터 아래로 순차적으로 진행됨

**3) Promise + Async/await**

```jsx
var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name)
    }, 500)
  })
}
var coffeeMaker = async function () {
  var coffeeList = ''
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? ',' : '') + (await addCoffee(name))
  }

  await _addCoffee('아메리카노')
  console.log(coffeeList)
  await _addCoffee('카페모카')
  console.log(coffeeList)
  await _addCoffee('카페라떼')
  console.log(coffeeList)
  await _addCoffee('에스프레소')
  console.log(coffeeList)
}

coffeeMaker()
```

- ES2017에서 가독성도 뛰어나고, 작성법도 간단한 async/await 기능이 추가됨.
- 비동기 작업을 수행하고자 하는 함수 앞에 async를 표기하고, 함수 내부에서 실질적인 비동기 작업이 필요한 위치마다 await를 표기하면 뒤의 내용을 Promise로 자동 전환하고, 해당 내용이 resolve 된 이후에야 다음으로 진행함.
- 즉, Promise의 then과 흡사한 효과 얻을 수 있음.

---

### 출처

> 정재남, 『코어 자바스크립트』, 위키북스(2019), p94-114.
