---
title: 리팩터링 2판 8장 정리
date: '2022-08-18T11:50:32.169Z'
description: 본 게시글은 리팩터링 2판 스터디 내용을 정리 & 요약하는 글입니다.
category: 'Study'
keywords: '리팩터링 2판, 스터디, javascript'
image: 'https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png" style="width: 40%; padding-bottom: 50px;"/>

## **들어가며**

> 본 게시글은 사내 스터디로 공부한 [리팩터링 2판 (마틴 파울러)](hhttp://www.yes24.com/Product/Goods/89649360) 8장을 정리 & 요약하는 글입니다.

> 매 챕터마다 돌아가며 설명을 했기 때문에, 본인이 정리한 일부 주제들만 정리했습니다. (나머지 내용은 추후 업데이트 예정)

---

# Chapter 08. 기능 이동

<br />

## 8.8 반복문을 파이프라인으로 바꾸기

#### Before

```javascript
const names = []
for (const i of input) {
  if (i.job === 'programmer') {
    names.push(i.name)
  }
}
```

#### After

```javascript
const names = input.filter(i => i.job === 'programmer').map(i => i.name)
```

### 배경

- 기존에는 객체 컬렉션을 순회할 때 반복문을 많이 사용함
- 하지만 언어가 발달하면서 더 나은 구조를 제공. 바로 **‘컬렉션 파이프라인'**
- 각 연산은 컬렉션을 입력받아 다른 컬렉션을 내 뱉음 (ex. map, filter)
  - map: 함수를 사용해 입력 컬렉션의 각 원소 변환
  - filter: 또 다른 함수를 사용해 입력 컬렉션을 필터링해 부분 집합 리턴
- 파이프라인으로 표현하면 이해 쉬워짐. 파이프라인을 따라가면서 객체가 어떻게 처리 되는지 읽을 수 있음
  - _컴퓨터 과학에서 파이프라인(영어: pipeline)은 한 데이터 처리 단계의 출력이 다음 단계의 입력으로 이어지는 형태로 연결된 구조를 가리킨다._ [출처: 위키백과](<https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8_(%EC%BB%B4%ED%93%A8%ED%8C%85)#:~:text=%EC%BB%B4%ED%93%A8%ED%84%B0%20%EA%B3%BC%ED%95%99%EC%97%90%EC%84%9C%20%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8,%ED%96%A5%EC%83%81%EC%9D%84%20%EA%BE%80%ED%95%A0%20%EC%88%98%20%EC%9E%88%EB%8B%A4.>)

<br />

### 절차

1. 반복문에서 사용하는 컬렉션을 가리키는 변수 생성

2. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체한다. 이때 컬렉션 파이프라인 연산은 1) 에서 만든 반복문 컬렉션 변수에서 시작하여, 이전 연산과 결과를 기초로 연쇄적으로 수행. 하나를 대체할 때마다 테스트

3. 반복문의 모든 동작을 대체 했다면 반복문 삭제

<br />

### 8.8.4 반복문을 파이프라인으로 바꾸기 - 예시

#### Before

```javascript
// 회사의 지점 사무실 정보를 CSV로 정리 (일부)
const data = `office, country, telephone
Chicago, USA, +1 312 373 1000
Beijing, China, +86 4008 900 505
Bangalore, India, +91 80 4064 9570
Proto Alergre, Brazil, +55 51 3079 3550
Chennai, India, +91 44 660 44766`

// 인도에 있는 사무실을 찾아서 도시명 & 전화번호 반환
function acquireData(input) {
  const lines = input.split('\\n') // 컬렉션
  let firstLine = true
  const result = []

  for (const line of lines) {
    // 반복문
    if (firstLine) {
      firstLine = false
      continue
    }
    if (line.trim() === '') {
      continue
    }
    const record = line.split(',')
    if (record[1].trim() === 'India') {
      result.push({ city: record[0].trim(), phone: record[2].trim() })
    }
  }
  return result
}

module.exports = acquireData(data)
```

<br />

### 변환 절차

1. 반복문에서 사용하는 컬렉션을 가리키는 별도 변수 생성 **(루프 변수)**

![](https://velog.velcdn.com/images/khy226/post/832819c3-462e-4650-bf09-005c9e17eb6c/image.png)

<br />

2 반복문에서 첫 if문은 CSV 첫 줄 건너뛰는 역할. 즉, 해당 slice() 연산을 루프 변수에서 수행하고, 반복문 안의 if문 제거

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
