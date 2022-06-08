---
title: 코어 자바스크립트 - 5. 클로저
date: "2022-02-28T22:45:32.169Z"
description: 클로저란, 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우, A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상
---

<img src="https://velog.velcdn.com/images/khy226/post/7eb2ca26-55b0-4476-a22b-26fe6ef63531/316439749g.jpeg" style="width: 50%; padding-bottom: 50px;">



### 1. 클로저의 의미 및 원리이해

- 클로저는 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성
- 클로저란, 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우, A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상


> - MDN 정의: 클로저란 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상
    - 선언될 당시의 lexical environment: 실행 컨텍스트의 구성 요소 중 하나인 outerEnvironmentReference에 해당함.
    - LexicalEnvironment의 environmentRecord와 outerEnvironmentReference에 의해 변수의 유효범위인 스코프가 결정되고, 스코프 체인이 가능
    
- 즉, 어떤 컨텍스트 A에서 선언한 내부 함수 B의 실행 컨텍스트가 활성화된 시점에는 B의 outerEnvironmentReference가 참조하는 대상인 A의 LexicalEnvironment에도 접근 가능
    - A에서는 B에서 선언한 변수에 접근 불가.
    - 반대로 B에서는 A에서 선언한 변수 접근 가능
    

단, 내부함수 B에서 외부 변수 A를 참조하는 경우에만 해당됨. 외부 변수를 참조하지 않으면 B가 A의 LexicalEnvironment를 사용할 수 없음!

**외부 함수의 변수를 참조하는 내부 함수 (1)**

```jsx
var outer = function () {
	var a = 1;
	var inner = function () {
		// inner 함수에는 a 변수가 없으므로, outerEnvironmentReference에서 outer 변수의 a 참조
		console.log(++a); // 2
	};
	inner();
};

outer();
```

- 일반적인 함수 및 내부 함수에서의 동작과 차이 없음
- outer의 LexicalEnvironment에 속하는 변수가 모두 가비지 컬렉팅 대상에 포함됨.

<Br />

**외부 함수의 변수를 참조하는 내부 함수 (2)**

```jsx
var outer = function () {
	var a = 1;
	var inner = function () {
		return ++a; // 2
	};
	return inner(); // inner 함수 실행 결과를 리턴함. 
	// 즉, outer 함수의 실행 컨텍스트가 종료된 시점에는 a 변수를 참조하는 대상이 없어짐
	// a, inner 변수 값들은 언젠간 가비지 컬렉터에의해 소멸
};

var outer2 = outer();
connsole.log(outer2);  // 2
```

- 일반적인 함수 및 내부 함수에서의 동작과 차이 없음
- outer의 LexicalEnvironment에 속하는 변수가 모두 가비지 컬렉팅 대상에 포함됨.

<Br />

**외부 함수의 변수를 참조하는 내부 함수 (3)**

```jsx
var outer = function () {
	var a = 1;
	var inner = function () {
		return ++a; // 2
	};
	return inner; // (1) inner 함수 실행 결과가 아닌, 'inner 함수 자체'를 리턴함. 
};

var outer2 = outer();  // (2) 
connsole.log(outer2);  // (3) 2 
connsole.log(outer2);  // (4) 3
```

- 위 두 예시와는 달리, 변수 a가 가비지 컬렉팅 대상에서 제외됨.

#### [실행 결과]

- (1) 3번 예시는 1, 2번과는 다르게 inner 함수 자체를 리턴.
- (2) outer 함수의 실행 컨텍스트가 종료될 때, outer2 변수는 outer의 실행 결과인 inner 함수를 참조함.
- (3) 따라서, outer2를 호출하면 앞서 반환된 함수인 inner가 실행됨. 이때, inner 함수인 실행 컨텍스트의 environmentRecord는 수집할 정보가 없으므로 (inner 함수내에 선언된 변수 없음), LexicalEnvrionment가 참조복사됨. 즉, outer 함수의 LexicalEnvironment가 담김. 스코프 체이닝에 따라 outer에서 선언한 변수 a에 접근해서 1증가시켜 2출력
- (4) 다시 outer2를 호출하면, 같은 방식으로 a의 값을 2에서 3으로 1 증가시킨 후, 3을 반환


#### 의문점: inner 함수 실행시점에는 outer 함수 실행이 종료되었는데, 어떻게 outer 함수의 LexicalEnvironment에 접근하는가?
- 이는 가비지 컬렉트 동작 방식 때문
- 어떤 값을 참조하는 변수가 하나라도 있다면, 그 값은 수집 대상에 포함시키지 않는다.
- 위 예시에서, outer 함수는 실행 종료 시점에 inner 함수를 반환한다. 외부 함수인 outer의 실행이 종료 되더라도, 내부 함수인 inner함수의 outerEnvironmentReference 언젠가 outer2를 실행함으로써 호출될 가능성 있음. 따라서, outer 함수의 lexicalEnvironment는 수집대상에서 제외.

즉, 위 예시를 통해 다시 클로저의 정의를 확인할 수 있음:

- **클로저란, 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우, A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상**

---

### 2. 클로저와 메모리 관리

- 클로저를 이용하면 메모리 누구가 된다고 클로저 사용을 지양해야한다고 주장하는 사람들이 있음.

> 메모리 누수: 개발자의 의도와 달리 어떤 값의 참조 카운트가 0이 되지 않아 가비지 컬렉팅의 수거 대상이 되지 않는 경우

- 하지만, 메모리 소모는 클로저의 본질적인 특성일 뿐.
- 개발자가 클로저를 사용해 의도적으로 참조 카운트를 0이 되지 않게 설계한 경우는 ‘누수'라고 볼 수 없음.

**클로저의 메모리 관리 방법:**

- 클로저는 어떤 필요에 의해 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생함.
- 그렇다면, 그 필요성이 사라진 지점에는 더는 메모리를 소모하지 않게 해주면 됨. 즉, 참조 카운트를 0으로 만들어 주면 됨
- 참조카운트를 0으로 만들기 위해서는, **식별자에 참조형이 아닌 기본형 데이터 (null혹은 undefined)를 할당**하면 됨.

#### 클로저 메모리 관리 예시:

- return 에 의한 클로저의 메모리 해제

```jsx
// return 에 의한 클로저의 메모리 해제
var outer = (function () {
	var a = 1;
	var inner = function () {
		return ++a;
	}
	return inner;
})();

console.log(outer());
console.log(outer());
outer = null; // outer 식별자의 inner 함수 참조를 끊음
```

---

### 3. 클로저 활용 사례

#### 3-1. 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

#### 1) 콜백함수를 내부함수로 선언, 외부 변수 직접 참조

```jsx
const fruits = ['apple', 'banana', 'peach'];
const $ul = document.createElement('ul'); // (공통 코드)

fruits.forEach(function (fruit) { // (A) forEach 콜백
	var $li = document.createElement('li');
   $li.innerText = fruit;
   $li.addEventListener('click', function() {// (B) 클릭 이벤트 핸들러
      alert('your choice is ' + fruit); // fruit 외부 변수 참조
   });

   $ul.appendChild($li);
});

document.body.appendChild($ul);
```

- (A): fruits의 개수만큼 실행, 그때마다 새로운 실행 컨텍스트 활성화
- (B): (A)의 실행 종료 여부와 무관하게 클릭 이벤트에 의해 실행됨. outerEnvironmentReference가 (A)의 LexicalEnvironment를 참조. 따라서 (B)함수가 참조할 예정인 변수 fruit에 대해서는 (A)가 종료된 후에도 가비지 컬렉터대상에서 제외되고, 계속 참조 가능


####  2) bind 활용 - 인자 전달

- (B) 함수가 다른 곳에서도 쓰일 경우 반복을 줄이기 위해 (B) 함수를 외부로 분리

```jsx
var alertFruit = function (fruit) { // (1)
   alert('your choice is ' + fruit);
}

fruits.forEach(function (fruit) {
   const $li = document.createElement('li');
   $li.innerText = fruit;
   $li.addEventListener('click', alertFruit.bind(null, fruit)); // (2)
   $ul.appendChlid($li);
});

document.body.appendChild($ul);
```

- (1) 공통 함수로 쓰고자 콜백 함수를 외부로 꺼냄
- (2) addEventListener는 콜백 함수를 호출할 때 첫 번째 인자에 '이벤트 객체'를 주입하기 때문에 bind메서드로 인자를 전달
    - 다만 이렇게 하면 이벤트 객체가 인자로 넘어오는 순서가 바뀌고, 함수 내부에서의 this가 원래와 달라지게 된다. 이런 변경사항이 발생하지 않게 하려면 bind 메서드가 아닌 ‘다른 방식’으로 풀어야한다.
    - ‘다른 방식’이란 고차함수를 활용하는 것. 함수형 프로그래밍에서 자주 쓰임


#### 3) 고차함수 활용 - 클로저 적극 활용

```jsx
const alertFruitBuilder = function (fruit) { // 외부 함수
	 return function () { // 내부 함수 (1)
      alert('your choice is ' + fruit); // 외부 변수 참조
   };
};

fruits.forEach(function (fruit) {
   const $li = document.createElement('li');
   $li.innerText = fruit;
   $li.addEventListener('click', alertFruitBuilder(fruit)); (2)
   $ul.appendChild($li);
});
```

- (1) alertFruitBuilder라는 함수 내부에서는 다시 익명함수를 반환하는데, 이 익명함수가 바로 기존의 alertFruit함수다.
- (2) 이벤트 핸들러에서 alertFruitBuilder 함수를 실행하면서 fruit 값을 인자로 전달한다.
    - 이 함수의 실행 결과가 다시 함수가 되며, 이렇게 반환된 함수를 리스너에 콜백 함수로써 전달함.
- 이후에 클릭 이벤트가 발생하면 이 함수의 실행 컨텍스트가 열리면서 alertFruitBuilder의 인자로 넘어온 fruit를 outerEnvironmentReference에 의해 참조할 수 있게 됨.  즉, alertFruitBuilder의 실행 결과로 반환된 함수에는 클로저가 존재

<hr />

### 3-2. 접근 권한 제어 (정보 은닉)

- 정보 은닉(information hiding): 어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자 하는 현대 프로그래밍 언어의 중요한 개념이.
- 접근 권한에는 public, private, protected의 세 종류가 있다.
    - public : 외부에서 접근 가능
    - private : 내부에서만 사용, 외부에 노출 않되는 것
    

클로저를 이용하면 함수 차원에서 public한 값과 private한 값을 구분하는 것이 가능하다.

```jsx
const outer = function () {
   let a = 1;
   const inner = function () {
      return ++a;
   };
   return inner; // (1)
};

const outer2 = outer();
console.log(outer2());
console.log(outer2());
```

- (1) outer 함수를 종료할 때, inner 함수를 반환함으로써 outer 함수의 지역 변수인 a의 값을 외부에서도 읽을 수 있음
- 즉, return을 활용해 (클로저) 외부 스코프에서 함수 내부의 변수들 중 선택적으로 일부의 변수에 대한 접근 권한을 부여 가능.

#### [closure: 닫혀있음, 폐쇄성, 완결성]
- outer 함수는 외부(전역 스코프)로부터 철저하게 격리된 닫힌 공간. 외부에서는 outer 함수를 실행할 수 있지만, outer 함수 내부에는 어떠한 개입도 할 수 없음.
- 외부에서는 오직 outer 함수가 return한 정보에만 접근할 수 있음. 즉, return 값이 외부에 정보를 제공하는 유일한 수단
- 따라서, 외부에 제공하고자 하는 정보들을 모아서 return하고, 내부에서만 사용할 정보들은 return 하지 않는 것으로 접근 권한 제어가 가능. return한 변수들은 public member가 되고, 그렇지 않으면 private member가 되는 것.

#### [정리]

클로저를 활용해 접근권한을 제어하는 방법은 다음과 같다:

1. 함수에서 지역변수 및 내부함수 등을 생성
2. 외부에 접근권한을 주고자 하는 대상들로 구성된 참조형 데이터(대상이 여럿일 때는 객체나 배열, 하나일 때는 함수)를 return
	- return 한 변수들은 공개 멤버가 되고, 그렇지 않은 변수들은 비공개 멤버가 된다.
    
<hr />

### 3-3. 부분 적용 함수

- 부분 적용 함수(partially applied function): n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있도록 하는 함수
- this를 바인딩해야 하는 점을 제외하면 bind메서드의 실행 결과가 바로 부분 적용 함수

**부분 적용 함수 구현 1)**

```jsx
const partial = function(){
  const originalPartialArgs = arguments;
  const func = originalPartialArgs[0];
  if(typeof func !== 'function'){
     throw new Error('첫 번째 인자가 함수가 아닙니다.');
  }
  return function(){
	  // 외부함수의 areguments를 함수 빼고 두 번째 인자부터 배열로 만듬
    // 첫 번째 인자 배열
    const partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    // 두 번째 인자 배열
    const restArgs =  Array.prototype.slice.call(arguments); // 현재 함수의 arguments
    return func.apply(this, partialArgs.comcat(restArgs)); // 인자를 합쳐서 func 실행
    // 여러 개의 인자들을 하나의 배열로 보냄(apply) func에서는 배열 자체가 아니라 배열 속 원소들을 인자로 받음
  };
};

const add = function() {
	let result = 0;
  	for (let i = 0; i < arguments.length; i++){
    	result += arguments[i];
    }
	return result;
}

const addPartial = partial(add, 1,2,3,4,5);
console.log(addPartial(6,7,8,9,10));   // 55

const dog = {
	name: '강아지',
  	greet: partial(function(prefix, suffix) {
    	return prefix + this.name + suffix;
    }, '왈왈, ')
}

dog.greet('입니다!'); // 왈왈, 강아지 입니다!
```

- 첫 번째 인자로 원본 함수를, 두 번째 인자 이후부터는 미리 적용할 인자들을 전달하고, 반환할 함수(부분 적용 함수)에서는 다시 나머지 인자들을 받아 이들을 모아(concat) 원본 함수를 호출(apply)
- 실행 시점의 this를 그대로 반영함으로써 this에는 아무런 영향을 주지 않게 된다.

하지만, 위 예시의 경우 반드시 인자를 앞에서부터 차례로 전달할 수 밖에 없다. 인자들을 원하는 위치에 미리 넣어놓고 나중에 빈 자리에 인자를 채워넣어 실행할 수 있도록 코드를 수정해보자:

**부분 적용 함수 구현 2)**

```jsx
Object.defineProperty(window, '_', {
 	value: 'EMPTY_SPACE',
  writable: false,
  configurable: false,
  enumerable: false
});

const partial12 = functino(){
  const originalPartialArgs = arguments;
  const func = originalPartialArgs[0];
  if(typeof func !== 'function'){
     throw new Error('첫 번째 인자가 함수가 아닙니다.');
  }
  return function(){
    const partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    const restArgs =  Array.prototype.slice.call(arguments);

    // (**) 추가된 for문. 비어있으면(_) restArgs 인자들 차례대로 끼워 넣기
    for (var i = 0; i < partialArgs.length; i++){
      	if(partialArgs[i] === _) {
          partialArgs[i] = restArgs.shift();
        }
    }
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

const addPartial2(add, 1,2,_,4,5,_,_,8,9);
console.log(addPartial(3,6,7,10)); //55

```

- 이번에는 '비워놓음'을 표시하기 위해 미리 전역객체에 '_*'*라는 프로퍼티를 준비하면서 삭제 변경 등의 접근에 대한 방어 차원에서 여러 가지 프로퍼티 속성을 설정함.
- (**) 에 추가된 부분을 보면 예시(1)과 차이가 있다. 처음에 넘겨준 인자들 중 *'_*'로 비워놓은 공간마다 나중에 넘어온 인자들이 차례대로 끼워 들어가도록 구현했다.
    - 부분 적용 함수를 만들 때 미리부터 실행할 함수의 모든 인자 개수를 맞춰 빈 공간을 확보하지 않아도 됨.

**부분 적용 함수3) 디바운스**

- 디바운스: 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우 이를 전부 처리하지 않고 처음 또는 마지막에 발생한 이벤트에 대해 한 번만 처리하는 것으로, 프론트엔드 성능 최적화에 큰 도움을 주는 기능 중 하나임.
    - scroll, wheel, mousemove, resize 등에 적용하기 좋다.
    

```jsx
const debounce = function(eventName, func, wait){
  let timeoutId = null;
  return function (event) {
    const self = this; 
    console.log(eventName, 'event 발생');
    clearTimeout(timeoutId); // (2)
    timeoutId = setTimeout(func.bind(self, event), wait);  // (1)
  };
};

const moveHandler = function (e) {
  console.log('move event 처리');
  console.dir(e); // MouseEvent 객체
};

const wheelHandler = function (e) {
  console.log('wheel event 처리');
}

//이벤트가 발생하면 debounce 함수가 실행되고, 내부함수를 리턴, 반환된 내부함수가 이벤트 핸들러가 된다.
document.body.addEventListener('mouse', debounce('move', moveHandler, 500));
document.body.addEventListener('mouse', debounce('move', moveHandler, 700));
```

- (1) 최초 이벤트가 발생하면 (1)코드에 의해 timeout의 대기열에 'wait 시간 뒤에 func를 실행할 것'이라는 내용이 담긴다.
- 그런데 wait 시간이 경과하기 이전에 다시 동일한 event가 발생하면 이번에는 (2)에 의해 앞서 저장했던 대기열을 초기화하고, 다시 (1)번째 줄에서 새로운 대기열을 등록한다. 결국 각 이벤트가 바로 이전 이벤트로부터 wait 시간 이내에 발생하는 한 마지막에 발생한 이벤트만이 초기화되지 않고 무사히 실행될 것이다.
- 참고로, 해당 예제의 디바운스 함수에서 클로저로 처리죄는 변수에는 eventName, func, wait, timeoutId가 있음
- 결과: 실제 이벤트 발생(wait시간 내)은 여러번이지만 이벤트 발생에 따른 콜백함수 실행은 한 번씩 된다.

<hr />

### 3-4. 커링 함수

- 커링 함수: 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출 될 수 있게 체인 형태로 구성한 것. 부분 적용 함수와 기본적인 맥락은 일치하지만 몇 가지 차이가 있다.
    - 부분적용함수: 여러 개의 인자를 전달 가능, 실행결과 재 실행시 원본 함수 무조건 실행
    - 커링함수: 한 번에 하나의 인자만 전달하는 것이 원칙. 중간 과정상의 함수를 실행한 결과는 그 다음 인자를 받기 위해 대기. 마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않음
    

**커링 함수 1)**

```jsx
const curry3 = function(func) {
  return function(a) {
    return function(b){
      return func(a,b);
    }
  }
};

const getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25

const getMinWith10 = curry3(Math.min)(10);
onsole.log(getMinWith10(8)); // 8
console.log(getMinWith10(25)); // 10
```

- getMaxWith10 는 function(b) { return Math.max(10, b) } 과 같다.
- 10과 비교해서 큰 수를 찾는 것을 여러 번 해야 한다면 커링함수를 이용해서 getMaxWith10으로 간단하게 마지막 인수 하나만 추가해 원하는 결과를 얻을 수 있다.

**커링 함수 2)**

```jsx
const curry5 = function(func) {
  return function(a) {
    return function(b) {
      return function(c) {
   		  return function(d) {
      	  return function(e) {
            return func(a,b,c,d,e);
 	   		  };
  		  };
 	    };
    };
  };
};

const getMax = curry5(Math.max);
console.log(getMax(1)(2)(3)(4)(5));// 11

// ES6 화살표함수
const curry5 = func => a => b => c => d =>e => func(a,b,c,d,e);

```

- 인자가 많아질수록 가독성이 떨어진다는 단점이 있다. ES6의 화살표 함수(curry5)를 사용하면 한 줄에 표기할 수 있다.
    - 화살표 함수를 사용하면 커링 함수를 이해하기 훨씬 수월하다. 화살표 순서에 따라 함수에 값을 차례로 넘겨주면 마지막에 func가 호출될 거라는 흐름이 한눈에 파악된다.
- 이 커링 함수가 유용한 경우가 있다. 당장 필요한 정보만 받아서 전달하고 또 필요한 정보가 들어오면 전달하는 식으로 하면 결국 마지막 인자가 넘어갈 때까지 함수 실행을 미루는 셈이 된다. 이를 함수형 프로그래밍에서는 지연실행(lazy execution)이라고 칭한다.
    - **원하는 시점까지 지연시켰다가 실행시키는 것이 요긴한 상황**이라면 커링을 쓰기에 적합하다. 혹은 **프로젝트 내에서 자주 쓰이는 함수의 매개변수가 항상 비슷하고 일부만 바뀌는 경우**에도 유용하다.
    

**커링 함수3)**

```jsx
// ES6 (서버에 요청할 주소의 기본 url, path값, id 값, 실제 서버에 정보 요청(fetch) )
const getInformation = baseUrl => path => id => fetch(baseUrl + path + '/' +id);

//url 전달
const ImgUrl = 'http://imageAddress.com/';
const getImg = getInformation(ImgUrl);

//path전달
const getEmoticon = getImg('emoticon');
const getIcon = getImg('icon');

//실제요청 (마지막 id만전달) -> 원본함수실행
const emoticon1 = getEmoticon(100);
const emoticon2 = getEmoticon(102);
const icon1 = getIcon(205);
const icon2 = getIcon(234);
const icon3 = getIcon(265);

```

- fetch 함수는 url을 받아 해당 url에 HTTP 요청을 한다. 보통 REST API를 이용할 경우 baseUrl은 몇 개로 고정되지만 path나 id값은 매우 많을 수 있다. 이런 상황에서 서버에 정보를 요청할 필요가 있을 때마다.
    - 매번 baseUrl부터 전부 기입해주기보다는 공통적인 요소는 먼저 기억시켜두고 특정한 값(id)만으로 서버 요청을 수행하는 함수를 만들어두는 편이 개발 효율성이나 가독성 측면에서 더 좋을 것이다.

최근의 여러 프레임워크나 라이브러리 등에서 커링을 광범위하게 사용하고 있다. Flux 아키텍처의 구현체 중 하나인 Redux의 미들웨어를 예로 들면 다음과 같다.

**Redux의 미들웨어의 커링 함수**

```jsx
// Redux Middleware 'Logger'
const loger = store => next => action => {
  console.log('dispatching', action);
  console.log('next state', store.getState());
  return next(action);
}

// Redux Middleware 'thunk'
const thunk = store => next => action => {
  return typeof action === 'function'
  ? action(dispatch, store.getState)
  : next(action);
```

- 위 두 미들웨어는 공통적으로 store, next, action 순서대로 인자를 받는다.
- 이 중 store는 프로젝트 내에서 한 번 생성된 이후로는 바뀌지 않는 속성이고, dispatch의 의미를 가지는 next 역시 마찬가지지만, action의 경우는 매번 달라진다.
- 그러니까 store, next 값이 결정되면 logger, thunk에 store, next를 미리 넘겨서 반환된 함수를 저장시켜놓고, 이후에 action만 받아서 처리할 수 있게끔 한 것이다.

<hr />

### 출처
> - 정재남, 『코어 자바스크립트』, 위키북스(2019), p115-145.
> - [5-3 클로저의 활용 사례(외부 데이터 사용, 접근 권한 제어)](https://codingsalon.tistory.com/26)
> - [[JS]클로저 활용예시 (부분적용함수, 커링함수)](https://velog.io/@g0garden/JS%ED%81%B4%EB%A1%9C%EC%A0%80-%ED%99%9C%EC%9A%A9%EC%98%88%EC%8B%9C-%EB%B6%80%EB%B6%84%EC%A0%81%EC%9A%A9%ED%95%A8%EC%88%98-%EC%BB%A4%EB%A7%81%ED%95%A8%EC%88%98)
