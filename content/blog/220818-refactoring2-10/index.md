---
title: 리팩터링 2판 10장 정리
date: '2022-08-18T11:51:32.169Z'
description: 본 게시글은 리팩터링 2판 스터디 내용을 정리 & 요약하는 글입니다.
category: 'Study'
keywords: '리팩터링 2판, 스터디, javascript'
image: 'https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png" style="width: 40%; padding-bottom: 50px;"/>

## **들어가며**

> 본 게시글은 사내 스터디로 공부한 [리팩터링 2판 (마틴 파울러)](hhttp://www.yes24.com/Product/Goods/89649360) 10장을 정리 & 요약하는 글입니다.

> 매 챕터마다 돌아가며 설명을 했기 때문에, 본인이 정리한 일부 주제들만 정리했습니다. (나머지 내용은 추후 업데이트 예정)

---

# Chapter 10. 조건부 로직 간소화

<br />

## 10.6 어서션 추가하기

#### Before

```java
if (this.discountRate)
  base = base - (this.discountRate * base);
```

#### After

```javascript
assert(this.discountRate >= 0)
if (this.discountRate) base = base - this.discountRate * base
```

### 배경

- 특정 조건이 참일 때만 제대로 동작하는 가정이 코드에 항상 명시적으로 기술되어 있지는 않음
  - ex) 제곱근 계산은 입력이 양수일 때만 정상 동작
- 이를 해결하기 위해, 어서션(assertion: 단언, 확언)을 이용해 코드 자체에 삽입하는 방법이 있음
  - _console.assert() 메서드는 주어진 가정이 거짓인 경우 콘솔에 오류 메시지를 출력합니다. 참인 경우, 아무것도 하지 않습니다._ [출처: MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/console/assert)
- 어서션은 항상 참이라고 가정하는 조건부 문장으로 어서션이 실패했다는 건 프로그래머가 잘못했다는 뜻
- 어서션이 있고 없고가 프로그램 기능의 정상 동작에 아무런 영향을 주지 않도록 작성되어야 함
- 어서션은 오류 찾기 뿐만 아니라, 프로그램이 어떤 상태임을 가정한 채 실행되는지 다른 개발자에게 알려주는 좋은 소통 도구.
  - 단, 테스트 코드가 있다면 어서션의 디버깅 용도로서의 효용은 줄어든다

<br />

### 절차

1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가

#### 예시

```javascript
// 고객이 상품 구입 시 할인율을 적용받는 코드

applyDiscount(aNumber) {
  return (this.discountRate)
    ? aNumber - (this.discountRate * aNumber)
    : aNumber;
}
```

<br />

- 할인율은 항상 양수라는 가정이 깔려있다.
- 3항 표현식에는 어서션을 넣을 장소가 적당치 않으니, if-then 문장으로 재구성

```javascript
applyDiscount(aNumber) {
  if (!this.discountRate) return aNumber;
  else return aNumber - (this.discountRate * aNumber);
}
```

<br />

- 그 다음, 간단히 어서션 추가

```javascript
applyDiscount(aNumber) {
  if (!this.discountRate) return aNumber;
  else {
    assert(this.discountRate >= 0);
    return aNumber - (this.discountRate * aNumber);
  }
}
```

---

## 참고

> - [리팩터링 2판 (마틴 파울러, 2020.04)](hhttp://www.yes24.com/Product/Goods/89649360)
