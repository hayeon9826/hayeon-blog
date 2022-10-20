---
title: 리팩터링 2판 6장 정리
date: '2022-08-18T11:45:32.169Z'
description: 본 게시글은 리팩터링 2판 스터디 내용을 정리 & 요약하는 글입니다.
category: 'Study'
keywords: '리팩터링 2판, 스터디, javascript'
image: 'https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png" style="width: 40%; padding-bottom: 50px;"/>

## **들어가며**

> 본 게시글은 사내 스터디로 공부한 [리팩터링 2판 (마틴 파울러)](hhttp://www.yes24.com/Product/Goods/89649360) 6장을 정리 & 요약하는 글입니다.

> 매 챕터마다 돌아가며 설명을 했기 때문에, 본인이 정리한 일부 주제들만 정리했습니다. (나머지 내용은 추후 업데이트 예정)

---

# Chapter 06. 기본적인 리팩터링

<br />

## 6.7 변수 이름 바꾸기 (Rename Variable)

### 개요

#### Before

```javascript
let a = height * width
```

#### After

```javascript
let a = height * width
```

### 배경

- 명확한 프로그래밍의 핵심은 **‘이름짓기’**
- 변수는 프로그래머가 하려는 일에 관해 많은 것을 설명해주나 이는 이름을 잘 지었을 때만 해당함
- 필자는 이름 앞에 타입을 드러내는 문자를 붙이는 스타일임 (ex. 매개변수를 aCustomer으로)

<br />

- 이름을 잘못 짓는 경우
  - 고민을 충분히 하지 않아서
  - 개발을 더 하다 보니 문제에 대한 이해도가 높여저서
  - 사용자의 요구가 달라져서 프로그램의 목적이 변해서

<br />

### 적용 시점

- 변수 이름이 목적과 다른 경우, 명확하지 않은 경우
- 사용 범위가 큰 변수일수록 **이름**이 중요함
  - 영속적인 필드 VS 람다식의 변수
  - 람다식 변수는 쉽게 파악가능하여 한 글자로 된 이름을 짓기도 함
  - 값이 영속되는 필드라면 이름에 더 신경 써야 함

<br />

### 절차

1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기(6.6절)를 고려
2. 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경

- 다른 코드에서 참조하는 변수는 적용 불가
- 변수 값이 변하지 않는다면 다른 이름으로 복제본을 만들어서 하나씩 점진적으로 변경

3. 테스트

<br />

### 효과

- 변수명만으로 **코드가 하는 일을 파악**하기 쉬워진다

<br />

- 상수 이름 바꾸기
- 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경한다
- 상수의 이름은 캡슐화 하지 않고도 복제방식으로 점진적으로 바꿀 수 있다
- 기존 이름을 참조하는 코드들을 새 이름으로 점진적으로 바꾸고 다 바꿨다면 기존이름을 삭제한다.

```javascript
// 복제 후 점진적으로 바꾸는 예시
const cpyNm = '애크미 구스베리'

// 원본의 이름을 바꾼 후, 원본의 원래 이름(기존 이름)과 같은 복제본을 만든다
const companyName = '애크미 구스베리'
const cpyNm = companyName
```

---

## 6.8 매개변수 객체 만들기 (Introduce Parameter Object)

### 개요

#### Before

```javascript
function amountInvoiced(startDate, endDate) {...}
function amountReceived(startDate, endDate) {...}
function amountOverdue(startDate, endDate) {...}

```

#### After

```javascript
function amountInvoiced(aDateRange) {...}
function amountReceived(aDateRange) {...}
function amountOverdue(aDateRange) {...}
```

<br />

### 배경

- 데이터가 여러 함수로 함께 몰려다니는 경우 **데이터 구조 하나**로 모아줄 필요가 있다 (=**매개변수 객체** 만들기)
- 즉, 여러 매개변수를 하나로 모아주는 클래스를 만들고 관리
- 같이 업데이트 되어야 할 변수 그룹들을 하나의 데이터 구조로 치환하라

<br />

### 적용 시점

- 데이터 항목 여러개가 **여러 함수로 함께 몰려다니는 패턴**이 있는 경우

<br />

### 효과

- 데이터 사이의 관계가 **명확**해진다
- 함수가 받는 매개변수 수가 줄어들고, 사용하는 이름도 같아져서 **일관성**도 높여 준다
- 궁극적으로 코드를 더 **근본적**으로 바꿔 줄 수 있는 발판을 마련해준다
  - 데이터 구조를 활용하는 형태로 프로그램 동작을 **재구성**하여 문제 영역을 훨씬 **간결하게 표현**하는 새로운 추상적 개념으로 격상된다

<Br />

### 절차

1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만들기

- 필자는 ‘클래스’로 만드는 걸 선호함. 주로 데이터 구조를 값 객체 (value object)로 만듦

2. 테스트
3. 함수 선언 바꾸기(6.5절)로 새 데이터 구조를 매개변수로 추가
4. 테스트
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정. 하나씩 수정할 때마다 테스트
6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 변경
7. 다 바꿨다면 기존 매개변수를 제거하고 테스트

<br />

### 예시

- 온도 측정 값 배열에서 정상 작동 범위를 벗어나는 걸 검사하는 코드

```javascript
// 온도 측정값
const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2021-12-13 21:10' },
    { temp: 53, time: '2021-12-13 21:20' },
    { temp: 58, time: '2021-12-13 21:30' },
    { temp: 53, time: '2021-12-13 21:40' },
    { temp: 51, time: '2021-12-13 21:50' },
  ],
}

// 정상 범위를 벗어난 값 찾는 함수
function readingsOutsideRange(station, min, max) {
  return station.readings.filter(r => r.temp < min || r.temp > max)
}

// 호출문
alert = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor, // 최저 온도
  operatingPlan.temperatureCeiling, // 최고 온도
)
```

<br />

### 문제점

- operatingPlan의 데이터 두 개를 쌍으로 가져와서 전달 하고 있음
- 함수의 arg이름(min, max)와 다르게 Floor, Ceiling으로 사용되고 있음

<br />

### 해결방안:

(위에서 언급한 ‘절차’ 참고)

1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 생성

- 묶은 데이터를 표현하는 클래스부터 선언

```javascript
class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max }
  }
  get min() {
    return this._data.min
  }
  get max() {
    return this._data.max
  }
}
```

2. 함수 선언 바꾸기(6.5절)로 새 데이터 구조를 매개변수로 추가

- 새로 만든 객체를 readingsOutsideRange()의 매개변수로 추가하도록 함수 선언을 변경

```javascript
// 기존 함수에 매개변수 range 추가
function readingsOutsideRange(station, min, max, range) {
  return station.readings.filter(r => r.temp < min || r.temp > max)
}

// 호출문 새 매개변수 자리에 null 추가
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling, null)
```

3. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정

- 온도 범위를 개체 형태로 전달하도록 호출문을 하나씩 변경 (range 객체 추가)

```javascript
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling) // 새로 만든 매개변수 객체

alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling, range) // 기존함수에 매개변수 객체 추가 전달
```

4. 하나씩 수정할 때마다 테스트

5. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 변경

- 매개변수를 사용하는 부분을 하나씩 변경 후 테스트
- 변경 후, 기존 매개변수 제거

```javascript
// max부터 적용 (기존 max 매개변수 제거)
function readingsOutsideRange(station, min, range) {
  return station.readings.filter(r => r.temp < min || r.temp > range.max)
}

// min에도 적용(기존 min 매개변수 제거)
function readingsOutsideRange(station, range) {
  return station.readings.filter(r => r.temp < range.min || r.temp > range.max)
}

// 호출문에 적용
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling)

// 기존 operatingPlan.temperatureCeiling, operatingPlan.temperatureFloor 제거
alerts = readingsOutsideRange(station, range)
```

<br />

### 진정한 값 객체로 거듭나기

- 매개변수 그룹을 객체로 교체하는 일은 시작일 뿐
- 앞에서처럼 클래스로 만들어두면 관련 동작들을 해당 클래스로 모두 옮길 수 있다
  - ex) 해당 예제 에서는 온도가 허용 범위 안에 있는지 검사하는 메서드를 클래스에 추가할 수 있음

```javascript
// 온도가 허용 범위 안에 있는지 검사하는 메서드
function readingsOutsideRange(station, range) {
  return station.readings.filter(r => !range.contains(r.temp))
}

class NumberRage {
  constructor(min, max) {
    this._data = { min: min, max: max }
  }
  get min() {
    return this._data.min
  }
  get max() {
    return this._data.max
  }
  contains(arg) {
    // 온도가 허용 범위 안에 있는지 검사하는 메서드를 클래스에 추가 하기 위한 첫 단계
    return arg >= this.min && arg <= this.max
  }
}
```

---

## 참고

> - [리팩터링 2판 (마틴 파울러, 2020.04)](hhttp://www.yes24.com/Product/Goods/89649360)
