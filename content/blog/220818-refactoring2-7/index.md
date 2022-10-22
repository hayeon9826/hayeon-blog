---
title: 리팩터링 2판 7장 정리
date: '2022-08-18T11:49:32.169Z'
description: 본 게시글은 리팩터링 2판 스터디 내용을 정리 & 요약하는 글입니다.
category: 'Study'
keywords: '리팩터링 2판, 스터디, javascript'
image: 'https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png" style="width: 40%; padding-bottom: 50px;"/>

## **들어가며**

> 본 게시글은 사내 스터디로 공부한 [리팩터링 2판 (마틴 파울러)](hhttp://www.yes24.com/Product/Goods/89649360) 7장을 정리 & 요약하는 글입니다.

> 매 챕터마다 돌아가며 설명을 했기 때문에, 본인이 정리한 일부 주제들만 정리했습니다. (나머지 내용은 추후 업데이트 예정)

---

# Chapter 07. 캡슐화

<br />

## 7.6 클래스 인라인하기

### 개요

- (7.5) 클래스 추출하기를 거꾸로 돌리는 리팩터링

#### Before

```java
class Person {
  get officeAreaCode() {return this._telephoneNumber.areaCode;}
  get officeNumber()   {return this._telephoneNumber.number;}
}
class TelephoneNumber {
  get areaCode() {return this._areaCode;}
  get number()   {return this._number;}
}

```

#### After

```java
class Person {
  get officeAreaCode() {return this._officeAreaCode;}
  get officeNumber()   {return this._officeNumber;}
}
```

### 배경

- 제 역할을 못 해서 그대로 두면 안 되는 클래스가 대상
  - 역할을 옮기는 리팩터링 후 특정 **클래스에 남은 역할이 거의 없을 때** 주로 발생
  - 이 역할이 없는 클래스를 가장 많이 사용하는 클래스로 흡수시킴
- 두 클래스의 기능을 지금과 다르게 배분하고 싶을 때에도 사용
  - 두 클래스를 인라인 해서 하나로 합친 두, 다시 새로운 클래스로 추출하는게 쉬울 수도 있음

### 결과

- 불필요하게 분리된 클래스 제거

<br />

### 절차

1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단순히 작업을 소스 클래스로 위임해야 한다.
2. 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다.
3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
4. 소스 클래스를 삭제한다.

<br />

### 예시

#### Before

```java
// 배송 클래스
class Shipment {
  get trackingInfo() {
    return this.trackingInformation.display;
  }

  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}

// 배송 추적 정보를 표현하는 클래스
class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany; // 배송 회사
  }

  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }

  get trackingNumber() {
    return this._trackingNumber; // 추적 번호
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }

  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}
```

- **TrackingInformation**이 제 역할을 못하고 있어 바로 **Shipment** 클래스에서 사용할 수 있도록 인라인 하려고 함

<br />

### 절차

1. **TrackingInformation**이 메서드를 호출하는 코드를 찾는다. 아래와 같이 외부에서 직접 호출하는 **TrackingInformation**의 메서드들을 모두 **Shipment**로 옮긴다.

```java
// 클라이언트
aShipment.trackingInformation.shippingCompany = request.vendor;
```

<br />

2 단, 함수 옮기기(8.1)과는 다른 방식으로 옮겨야함. 먼저 **Shipment**에 **위임 함수**를 만들고, 클라이언트가 이를 호출하도록 수정

![](https://velog.velcdn.com/images/khy226/post/585fb463-5dae-455d-bede-3c457086994e/image.png)

<br />

3. 모든 클라이언트 코드를 변경했으면, **TrackingInformation**의 모든 요소를 **Shipment**로 옮긴다.

![](https://velog.velcdn.com/images/khy226/post/042661a9-eb17-4a96-b801-8f4131ed1a68/image.png)

<br />

4. 다 옮겼으면 **TrackingInformation** 클래스를 삭제한다.

#### After

```java
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }

  get shippingCompany() {
    return this._shippingCompany;
  }

  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }

  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
}
```

---

## 참고

> - [리팩터링 2판 (마틴 파울러, 2020.04)](hhttp://www.yes24.com/Product/Goods/89649360)
