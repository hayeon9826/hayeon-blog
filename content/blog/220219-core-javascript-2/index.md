---
title: 코어 자바스크립트 정리 - 2. 실행 컨텍스트
date: "2022-02-19T22:40:32.169Z"
description: '실행 컨텍스트(execution context): 실행할 코드에 제공할 환경 정보들을 모아놓은 객체'
---

<img src="https://velog.velcdn.com/images/khy226/post/f3aebb1f-455b-481a-b690-f8aaa467517d/316439749g.jpeg" style="width: 50%; padding-bottom: 50px;">


### 1. 실행 컨텍스트란?

- 실행 컨텍스트(execution context): 실행할 코드에 제공할 환경 정보들을 모아놓은 객체이다.
    - 자바스크립트는 어떤 실행 컨텍스트가 활성화되는 시점에 선언된 변수를 위로 끌어올리고(호이스팅), 외부 환경 정보를 구성하고, this 값을 설정하는 등의 동작을 수행
    - 동일 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성하고, 이를 콜 스택(call stack)에 쌓아올렸다가, 가장 위에 쌓여있는 컨텍스트와 관련 있는 코드들을 실행하는 식으로 전체 코드의 환경과 순서 보장.
    - 우리가 흔히 실행 컨텍스트를 구성하는 방법은 **함수를 실행하는 것** 뿐이다.
    

- 예를 들어, js 콜 스택의 최대 용량을 넘기면 에러를 던진다

    
    ```jsx
    var eternalLoop = function() {
    	return eternalLoop();
    }
    
    // Uncaught RangeError; Maximum call stack size exceeded
    ```
    
    **실행 컨텍스트와 콜 스택 예시:**
    
    ```jsx
    // ------------------------------ (1)
    var a = 1;
    function outer() {
    	function inner() {
    		console.log(a); // undefined
    		var a = 3;
    	}
    	inner(); // ------------------- (2)
    	console.log(a);  // 1
    }
    outer();  // -------------------- (3)
    console.log(a);    // 1
    ```
  위 코드에 대한 설명은 아래와 같다.
    
   >  1. (1) 자바스크립트 코드를 실행하는 순간 **전역 컨텍스트**가 콜 스택에 담긴다.
    2. (3) outer 함수를 호출하면 자바스크립트 엔진은 outer에 대한 환경 정보를 수집해서 **outer 실행 컨텍스트**를 생성한 후 콜 스택에 담는다. (콜 스택 맨 위에 outer 실행 컨텍스트가 놓인 상태가 됐으므로, 전역 컨텍스트와 관련된 코드의 실행을 일시 중단하고 대신 outer 실행 컨텍스트와 관련된 코드, 즉 outer 함수 내부의 코드들을 순차적으로 실행한다.)
    3. (2)** inner 함수의 실행 컨텍스트**가 콜 스택의 가장 위에 담기면 outer 컨텍스트와 관련된 코드의 실행을 중단하고 inner 함수 내부의 코드를 순서대로 진행한다.
    4. inner 함수 실행 종료되면 **콜 스택에서 제거**됨
    5. 아래에 있던 **outer 컨텍스트**가 콜 스택 맨 위에 존재하게 되므로, (2)의 다음줄부터 이어서 실행
    6. a 변수 출력하면 outer 실행 컨텍스트가 **콜 스택에서 제거**되고, 전역 컨텍스트만 남게됨
    7. 실행을 중단했던 (3) 다음줄 이어서 실행
    8. a 변수 값 출력하면 전역 공간에 실행할 코드가 없어 **전역 컨텍스트도 제거**. 콜 스택 비어진 채로 종료
    
    ![https://user-images.githubusercontent.com/72732446/154690714-58816848-4caf-43a8-b4c9-ba399359e37d.png](https://user-images.githubusercontent.com/72732446/154690714-58816848-4caf-43a8-b4c9-ba399359e37d.png)
    
    실행 컨텍스트가 활성화 될 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장함.
    

-  VariableEnvironment: 현재 컨텍스트 내의 실별자들에 대한 정보 + 외부 환경 정보. 선언시점의 스냅샷으로 변경사항 반영 안됨
- LexicalEnvironment: 처음에는 VariableEnvironment와 같지만, 변경사항이 실시간으로 반영됨.
- ThisBinding: this 식별자가 바라봐야 할 대상 객체.
    
  

---

### 2. VariableEnvironment

- VariableEnvironment 에 담기는 내용은 LexicalEnvironment와 같지만, 최초 실행 시의 스냅샷을 유지한다는 점이 다르다.
- 실행 컨텍스트를 처음 생성할 때 VariableEnvironment에 정보를 먼저 담고, 이를 그대로 복사해서 LexicalEnvironment를 만들고, 이후에는 LexicalEnvironment를 주로 활용한다.
- 내부는 environmentRecord와 outer-EnvironmentReference로 구성되어있다.

---

### 3. LexicalEnvironment

- LexicalEnvironment: 어휘적 환경
- 수시로 변하는 환경 정보

**environmentRecord와 호이스팅**

- environmentRecord에는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장됨
- 컨텍스트 내부 전체를 처음부터 끝까지 쭉 훑어나가며 순서대로 수집
- 실행 컨텍스트가 코드를 실행하기 전에 이미 변수 정보를 모두 수집함. 즉, 코드 실행 전에도 자바스크립트 엔진은 이미 해당 환경에 속한 코드의 변수명들을 모두 알고있음. 여기서 호이스팅의 개념이 나옴
- 호이스팅(=끌어올리다): “자바스크립트 엔진은 식별자들을 최상단으로 끌어올려놓은 다음 실제 코드를 실행한다". 즉, 자바스크립트 엔진이 실제로 끌어올리지는 않지만 편의상 끌어올린 것으로 간주!

**호이스팅 규칙**

```jsx
function a (x) { 
	console.log(x); //------------ (1)
	var x;
	console.log(x); //------------ (2)
	var x = 2;
	console.log(x); //------------ (3)
}

a(1)
```

- 위 예제에서 (1)은 함수 호출 시 전달한 1이, (2)는 할당값이 없는 undefine가, (3)에는 할당된 2가 나올 거라고 예측할 수 있다. 하지만 콘솔창에 해당 코드를 찍어보면, 예측과 달리 아래와 같은 결과가 나온다.

**충격의 결과:**

![https://user-images.githubusercontent.com/72732446/154725496-b0217517-0095-4db5-983d-91b427236b71.png](https://user-images.githubusercontent.com/72732446/154725496-b0217517-0095-4db5-983d-91b427236b71.png)

- 호이스팅에 의해서 실제로는 (1) 1, (2) 1, (3) 2 라는 값이 나온다!

**왜 그럴까?**

- a 함수를 실행하는 순간, a 함수의 실행 컨텍스트가 생성된다. 이때 변수명과 함수 선언의 정보를 위로 끌어올린다 (수집). 그래서 예측했던대로 코드가 나오지 않는 것이다.
- 기존 코드에서 호이스팅을 마친코드는 아래와 같이 작동한다.

```jsx
function a (x) { 
	var x;  // 수집 대상 1의 변수 선언 부분
	var x;  // 수집 대상 2의 변수 선언 부분
	var x;  // 수집 대상 3의 변수 선언 부분
	
	x = 1;  // 수집 대상 1의 할당 부분
	console.log(x); //------------ (1)
	console.log(x); //------------ (2)
	x = 2; // 수집 대상 2의 할당 부분
	console.log(x); //------------ (3)
}

a(1)
```

그리고 해당 코드는 아래 과정을 거쳐 작동한다:

```
- 2번째 줄: 변수 x 선언. 메모리 저장공간을 미리 확보하고, 확보한 공간의 주솟값을 변수 x에 연결
- 3번째, 4번째 줄: 다시 변수 x를 선언하나, 이미 있으므로 무시.
- 6번째 줄: x에 1을 할당. 우선 숫자 1을 별도의 메모리에 담고, x에 1주솟값 입력
- 7번째, 8번째 줄: 각 x출력. 모두 1이 출력됨!
- 9번째 줄: x에 2를 할당. 기존 주솟값을 2의 주솟값으로 바꿈
- 10번째 줄: x를 출력. 2가 출력됨. 
- 함수 내부의 모든 코드가 실행됐으므로 실행 컨텍스트가 콜 스택에서 제거됨
```

- 참고로, 호이스팅을 할 때 변수는 선언부와 할당부를 나누어 ‘선언부'만 끌어올리는 반면, 함수 선언은 함수 전체를 끌어올린다.

**함수 선언문과 함수 표현식**

- 호이스팅에는 중요한 개념 두 가지가 있는데, 바로 함수 선언문과 함수 표현식이다. 공통점은 모두 함수를 새롭게 정의할 때 쓰인다는 것 이다.
- 함수 선언문: function 정의부만 존재하고, 별도의 할당 명령이 없음
    - 반드시 함수명이 정의돼 있어야 함
- 함수 표현식: 정의한 function을 별도의 변수에 할당하는 것
    - 함수명 없어도 됨
    

```jsx
function a () {} // 함수 선언문. 함수 a가 곧 변수명
a(); // OK

var b = function () {} // (익명) 함수 표현식. 변수명 b가 곧 함수명.
b();  // OK

var c = function d() {} // 가명 함수 표현식. 변수명은 c, 함수명은 d.
c(); // OK
d();  // ERROR
```

**주의할 점:**

- 자바스크립트에서 변수/함수를 선언할 때 동일한 변수명을 짓지 않도록 주의해야한다.
- 동일한 변수명에 서로 다른 값을 할당할 경우, 나중에 할당한 값이 먼저 할당한 값을 덮어씌운다 (override).

**스코프, 스코프 체인, outerEnvironmentReference**

- 스코프: 스코프(scope)란 식별자에 대한 유효범위이다.
    - ES5 까지의 자바스크립트는 전역 공간을 제외하면, **오직 함수에 의해서만** 스코프가 생성된다.
- 스코프 체인: 이러한 ‘식별자의 유효범위'를 안에서부터 바깥으로 차례로 검색해나가는 것을 스코프 체인이라고 한다.
- outerEnvironmentReference: 이를 가능하게 하는 것이 바로 LexicalEnvironment의 두번째 수집자료인 outerEnvironmentReference이다.

**스코프 체인**

- outerEnvironmentReference는 현재 호출된 함수가 선언된 당시의 LexicalEnvironment를 참조한다. (과거 시점)
    - 편의상 outerEnvironmentReference를 OER, LexicalEnvironment를 LE라고 해보자.
    - 예를 들어 A함수 내부에 B함수가 선언되고, 다시 B함수 내부에 C함수를 선언한 경우, 함수 C의 OER는 함수 B의 LE를 참조한다. 함수 B의 LE에 있는 OER는 다시 함수 B가 선언되던 때 (A)의 LE를 참조한다. 즉, 매우 복잡한 연결 리스트 형태를 띄게 된다.
    - 이런 구조적 특성 덕분에 여러 스코프에서 동일한 식별자를 선언한 경우에는 **무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능**하다.

아래 코드 예시를 통해 스코프 체인을 확인해보자:

```jsx
var a = 1;
var outer = function() {
	var inner = function() {
		console.log(a);
		var a = 3;
	};
	inner();
	console.log(a);
}
outer();
console.log(a)

// 결과: 1, 1
```

**전역변수와 지역변수**

- 말 그대로, 전역 공간에서 선언한 변수는 전역 변수이고, 함수 내부에서 선언한 변수는 무조건 지역변수이다.
    - 위 스코프 체인 예시에서 전역 변수는 전역 스코프에서 선언한 a와 outer이다.
    - 지역 변수는 outer 함수 내부에 선언한 inner과, inner함수 내부에 선언한 a이다
- 코드의 안전성을 위해 가급적 전역변수 사용을 최소화하고, 지역 변수를 사용하는 것이 좋다.

---

### 4. this

- 실행 컨텍스트의 thisBinding에는 this로 지정된 객체가 저장된다.
- 실행 컨텍스트 활성화 당시에 this가 지정되지 않은 경우 this에는 전역 객체가 저장된다.
<hr />

## 참고
> - 정재남, 『코어 자바스크립트』, 위키북스(2019), p36-64.