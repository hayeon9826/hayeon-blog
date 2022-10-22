---
title: 리팩터링 2판 12장 정리
date: '2022-08-18T11:53:32.169Z'
description: 본 게시글은 리팩터링 2판 스터디 내용을 정리 & 요약하는 글입니다.
category: 'Study'
keywords: '리팩터링 2판, 스터디, javascript'
image: 'https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png" style="width: 40%; padding-bottom: 50px;"/>

## **들어가며**

> 본 게시글은 사내 스터디로 공부한 [리팩터링 2판 (마틴 파울러)](hhttp://www.yes24.com/Product/Goods/89649360) 12장을 정리 & 요약하는 글입니다.

> 매 챕터마다 돌아가며 설명을 했기 때문에, 본인이 정리한 일부 주제들만 정리했습니다. (나머지 내용은 추후 업데이트 예정)

---

# Chapter 12. 상속 다루기

<br />

## 12.1 메서드 올리기

#### Before

```javascript
class Employee {...}

class Salesman extends Employee {
  get name() {...}
}

class Engineer extends Employee {
  get name() {...}
}
```

#### After

```javascript
class Employee {
  get name() {...}
}

class Salesman extends Employee {...}
class Engineer extends Employee {...}
```

### 배경

- 서브클래스들의 중복 메서드는 슈퍼클래스로 메서드를 올리는 리팩터링

<br />

### 효과

- 중복 코드를 제거할 수 있음

<br />

### 적용

- 서브클래스들에 중복된 코드가 존재하는 경우 적용할 수 있음
- 상황에 따라 함수 매개변수화(11.2)나 필드올리기(12.2) 리팩터링을 먼저 진행해야 함

```javascript
class Party {
  constructor() {}

  get monthlyCost() {
    return 30
  }
}

class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12
  }
}

class Department extends Party {
  get annualCost() {
    return this.monthlyCost * 12
  }
}

const employee = new Employee()
const department = new Department()
```

<br />

### 적용 절차

#### 예시

```javascript
// 실내온도 제어 시스템. 사용자는 온도조절기로 온도를 설정할 수 있지만,
// 목표 온도는 난방 계획에서 정한 범위에서만 선택할 수 있음

// HeatingPlan 클래스
class HeatingPlan {
  get targetTemperature(aPlan) {
    if (thermostat.selectedTemperature > this._max) {
      return this._max;
    } else if (thermostat.selectedTemperature < this._min) {
      return this._min;
    } else {
      return thermostat.selectedTemperature;
    }
  }
}

// 호출자
if (thePlan.targetTemperature > thermostat.currentTemperature) { setToHeat();}
else if (thePlan.targetTemperature < thermostat.currentTemperature) { setToCool();}
else { setOff();}
```

<br />

1. 똑같이 동작하는 메서드인지 면밀히 살펴본다

- 실질적으로 하는 일은 같지만 코드가 다르다면 본문 코드가 똑같아질 때까지 리팩터링한다.

```javascript
get annualCost() {
	return this.monthlyCost * 12;
}
```

<br />

2. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서 호출하고 참조 할 수 있는지 확인하다
3. 메서드 시그니처가 다르다면 함수 선언 바꾸기로 슈퍼클래스에서 사용하고 싶은 형태로 통일한다.
4. 정적 검사를 수행한다.
5. 서브클래스 중 하나의 메서드를 제거한다.
6. 테스트한다.
7. 모든 서브클랫의 메서드가 없어질 때까지 다른 서브클래스의 메서드를 하나씩 제거한다.

```javascript
class Party {
  constructor() {}

  get monthlyCost() {
    return 30
  }

  get annualCost() {
    return this.monthlyCost * 12
  }
}

class Employee extends Party {}
class Department extends Party {}

const employee = new Employee()
const department = new Department()
```

<br />

## 12.2 필드 올리기

### Before

```javascript
class Employee {...} // Java

class Salesman extends Employee {
  private String name;
}

class Engineer extends Employee {
  private String name;
}
```

<Br />

### After

```javascript
class Employee {
  protected String name;
}

class Salesman extends Employee {...}
class Engineer extends Employee {...}
```

<br />

### 배경

- 서브클래스들의 중복 필드를 슈퍼클래스로 올리는 리팩터링
- 서브클래스들이 독립적으로 개발 되었거나 뒤늦게 하나의 계층구조로 리팩터링된 경우라면 기능이 중복되는 경우가 자주 있음
- 필드 이름이 같을수도 있지만 다르더라도 비슷하게 사용할 수 있으니 실제 어떻게 사용되는지 분석이 필요함

<br />

### 효과

- 필드 중복 선언을 제거
- 해당 필드를 사용하는 동작을 서브 클래스에서 슈퍼 클래스로 옮길 수 있음

<br />

### 적용

- 완전히 동일하거나 비슷하게 쓰이는 필드들이 서브클래스에 존재하는 경우

<Br />

1. 후보 필드들을 사용하는 곳 모두가 그 필드들을 똑같은 방식으로 사용하지 살펴라
2. 필드들의 이름이 각기 다르다면 똑같은 이름으로 바꾼다(필드 이름 바꾸기)
3. 슈퍼클래스에 새로운 필드를 생성한다. => 서브클래스에서 이 필드에 접근 할 수 있어야한다. (protected 로 선언하면 된다)
4. 서브 클래스의 필드들의 제거한다
5. 테스트한다

<br />

---

## 참고

> - [리팩터링 2판 (마틴 파울러, 2020.04)](hhttp://www.yes24.com/Product/Goods/89649360)
