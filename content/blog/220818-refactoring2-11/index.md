---
title: 리팩터링 2판 11장 정리
date: '2022-08-18T11:52:32.169Z'
description: 본 게시글은 리팩터링 2판 스터디 내용을 정리 & 요약하는 글입니다.
category: 'Study'
keywords: '리팩터링 2판, 스터디, javascript'
image: 'https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png" style="width: 40%; padding-bottom: 50px;"/>

## **들어가며**

> 본 게시글은 사내 스터디로 공부한 [리팩터링 2판 (마틴 파울러)](hhttp://www.yes24.com/Product/Goods/89649360) 11장을 정리 & 요약하는 글입니다.

> 매 챕터마다 돌아가며 설명을 했기 때문에, 본인이 정리한 일부 주제들만 정리했습니다. (나머지 내용은 추후 업데이트 예정)

---

# Chapter 11. API 리팩터링

<br />

## 11.6 질의 함수를 매개변수로 바꾸기

#### Before

```javascript
targetTemperature(aPlan)

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
  // 생략
```

#### After

```javascript
targetTemperature(aPlan, thermostat.currentTemperature)

function targetTemperature(aPlan, currentTemperature) {
  // 생략
```

### 배경

- 함수 안에서 전역 변수를 참조하거나, 제거 대상인 원소를 참조하는 경우에는 (=함수 안에 두기엔 거북한 참조) **매개변수**로 바꿀 필요가 있다
- 모듈을 개발할 때 **순수 함수**를 따로 구분하고, 가변 원소들을 다루는 로직으로 순수 함수를 감싸는 패턴을 많이 활용한다
- **순수 함수**란?
  - 동일한 인자가 주어졌을 때 항상 동일한 결과를 반환하며, 외부의 상태를 변경하지 않는 함수

<br />

### 효과

- 똑같은 값을 건네면 매번 똑같은 결과를 내는 함수를 만들기 때문에 다루기 쉽다 (**참조 투명성**)
- **참조 투명성이란?**
  - 투명하게 전달되는 파라미터외에 다른 외부 세계의 영향을 받지 않는 특징을 의미한다 (= 모든 참조가 투명하다)

<br />

### 적용시점

- 함수에서 **참조 투명하지 않은** 원소에 접근하는 경우
- 책임 소재를 프로그램의 어디에 배정하느냐의 문제는 정답이 있는 것이 아니다, 따라서 상황에 따라 더 나은 쪽으로 개선하기 쉽게 설계해두는게 중요하다

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

1. 변수 추출하기로 이 메서드에서 사용할 매개 변수를 준비

```javascript
get targetTemperature() {
  const selectedTemperature = thermost.selectedTemperature;  // 변수 추출!
  if (selectedTemperature > this._max) {
    return this._max;
  } else if (selectedTemperature < this._min) {
    return this._min;
  } else {
    return selectedTemperature;
  }
}
```

<br />

2. 매개변수 값을 구하는 코드를 제외한 나머지를 메서드로 추출하기 쉬워짐

```javascript
get targetTemperature() {
  const selectedTemperature = thermost.selectedTemperature;
  return this.xxNEWtargetTemperature(selectedTemperature);  // 메서드화
}

// 메서드 추출!
xxNEWtargetTemperature(selectedTemperature){
  if (selectedTemperature > this._max) {
    return this._max;
  } else if (selectedTemperature < this._min) {
    return this._min;
  } else {
    return selectedTemperature;
  }
}
```

<br />

3. 방금 추출한 변수를 인라인. 원래 메서드에는 단순한 호출만 남도록

```javascript
// HeatingPlan 클래스
get targetTemperature() {
  // 기존 selectedTemperature 변수 인라인!
  return this.xxNEWtargetTemperature(thermostat.selectedTemperature);
}
```

<br />

4. 메서드까지 인라인

```javascript
if (
  thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) > // 메서드 인라인!
  thermostat.currentTemperature
) {
  setToHeat()
} else if (
  thePlan.xxNEWtargetTemperature(thermostat.selectedTemperature) < // 메서드 인라인!
  thermostat.currentTemperature
) {
  setToCool()
} else {
  setOff()
}
```

<br />

5. 메서드의 이름을 원래 메서드 이름으로 변경 (접두어 제거)

```javascript
class HeatingPlan {
  get targetTemperature(selectedTemperature) {    // 메서드 이름 변경!
    if (selectedTemperature > this._max) {
      return this._max;
    } else if (selectedTemperature < this._min) {
      return this._min;
    } else {
      return selectedTemperature;
    }
  }
}

// 호출자
if (
  thePlan.targetTemperature(thermostat.selectedTemperature) > // 메서드 이름 변경!
  thermostat.currentTemperature
) {
  setToHeat();
} else if (
  thePlan.targetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
) {
  setToCool();
} else {
  setOff();
}
```

<br />

### Before & After

```javascript
/** * 리팩토링 전 */

targetTemperature(aPlan)

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature
  // 생략
}

/** * 리팩토링 후 */
targetTemperature(aPlan, thermostat.currentTemperature)

function targetTemperature(aPlan, currentTemperature) {
  // 생략
}
```

<br />

---

## 참고

> - [리팩터링 2판 (마틴 파울러, 2020.04)](hhttp://www.yes24.com/Product/Goods/89649360)
