---
title: 리팩터링 2판 1장 정리
date: '2022-07-15T11:45:32.169Z'
description: 본 게시글은 리팩터링 2판 1장을 정리 & 요약하는 글입니다.
category: 'Study'
keywords: '리팩터링 2판, 스터디, javascript'
image: 'https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3975db29-45c8-4a8c-92fd-3d2b934f1326/image.png" style="width: 40%; padding-bottom: 50px;"/>

## **들어가며**

> 본 게시글은 사내 스터디로 공부한 [리팩터링 2판 (마틴 파울러)](hhttp://www.yes24.com/Product/Goods/89649360) '1장'을 정리 & 요약하는 글입니다.

---

# Chapter 01. 첫번째 예시

<br />

## 1.1. 자, 시작해보자!

### 서론

- 리팩토링은 겉으로 드러나는 코드의 기능(겉보기 동작)은 바꾸지 않으면서 내부 구조를 개선하는 방식으로 소프트웨어 시스템을 수정하는 과정
- 즉, 리팩토링을 한다는 것은 코드를 작성하고 난 뒤에 설계를 개선하는 일
- 리팩토링역사와 여러 원칙을 하나씩 설명하면 지루하기 때문에, 리팩토링을 실제로 해보는 예를 앞에 배치함

### 예시

- 다양한 연극을 외주로 받아서 공연하는 극단이 있다.
- 공연 요청이 들어오면 연극의 장르와 관객 규모를 기초로 비용을 책정

  - 연극의 종류
    - 비극
    - 희극
  - 포인트가 있어서 다음번 의뢰 시 공연료를 할인받을 수 있음

<br />

- 아래는 극단이 공연할 연극 정보 JSON

```json
// play.json

{
  "hamlet": { "name": "Hamlet", "type": "tragedy" },
  "as-like": { "name": "As You Like It", "type": "comedy" },
  "othello": { "name": "Othello", "type": "tragedy" }
}
```

```json
// invoices.json

[
  {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet", //공연 ID
        "audience": 55 //관객수
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  }
]
```

<br />

- 공연료 청구서를 출력하는 코드
  - 참고: [Intl.NumberFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency_formatting)

```javascript
const statement = (invoice, plays) => {
  let totalAmount = 0 //총액
  let volumeCredits = 0 //포인트
  let result = `청구 내역 (고객명: ${invoice.customer})\n`

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format

  for (let perf of invoice.performances) {
    const play = plays[perf.playID]
    let thisAmount = 0 //이 공연 금액

    switch (play.type) {
      case 'tragedy': {
        thisAmount = 40000
        if (perf.audience > 30) thisAmount += 1000 * (perf.audience - 30)
        break
      }
      case 'comedy': {
        thisAmount = 30000
        if (perf.audience > 20) thisAmount += 10000 + 500 * (perf.audience - 20)
        thisAmount += 300 * perf.audience
        break
      }
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`)
    }

    volumeCredits += Math.max(perf.audience - 30, 0)
    if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5)
    result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`
    totalAmount += thisAmount
  }
  result += `총액: ${format(totalAmount / 100)}\n`
  result += `적립 포인트: ${volumeCredits}점\n`
  return result
}

export default statement
```

<br />

- 코드 실행 결과

```
청구 내역 (고객명: BigCo)
Hamlet: $650.00 (55석)
As You Like It: $580.00 (35석)
Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
```

---

## 1.2 예시 프로그램을 본 소감

### 소감

- 앞서 본 코드는 아주 잘 작동함
- 조금 지저분해 보여도 컴파일러는 잘 이해함
- 만약 다른 사람이 이 코드를 이해하고 수정할 일이 없다면 굳이 시간을 내서 수정할 필요는 없을 것

> 프로그램이 잘 작동하는 상황에서 그저 코드가 **‘지저분하다‘**는 이유료 불평하는 것은 프로그램의 구조를 너무 미적인 기준으로만 판단하는 건 아닐까

- 코드를 수정하려면 사람이 개입되고, 사람은 미적 상태에 민감하다.
- 설계가 나쁜 시스템은 수정하기 어렵다.
- 무엇을 수정할지 찾기 어렵다면 실수를 저질러서 버그가 생길 가능성도 높아진다.

<br />

> 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다.

- 만약, 청구 내역을 HTML로 출력하는 기능이 필요하다고 가정해보자.
- 가장 간단하게는 `statement()` 함수를 새로 만들어서 `htmlStatement()` 함수를 만들 수 있을 것
- 이렇게 하게 되면 컴파일러는 잘 이해하겠지만, 만약 수정할 일이 생긴다면 두 번 수정해야 하는 재앙이 초래됨. 버그 발생 확률이 높아지는 건 덤

<br />

- **리팩터링이 필요한 이유는 바로 이러한 변경 때문이다.**

---

## 1.3 리팩터링의 첫 단계

### 테스트 코드

- 리팩터링을 시작한다고 했을때, 리팩터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드부터 마련해야함
- **왜?** 사람은 실수를 하기 마련.
- 프로그램이 클수록 수정 과정에서 예상치 못한 문제가 발생할 가능성이 크기에, `테스트코드 작성 -> 동작확인 -> 리팩터링` 순으로 해야 안전하게 리팩터링 할 수 있음

### 테스트 코드 작성 방법

- 앞 예시들의 statement 함수는 공연료 청구서를 받아 문자열로 결과를 반환
- 따라서 다양한 청구서 데이터를 만들어, 그에 맞는 결과값이 제대로 나오는지 검증하는 테스트를 작성하면 됨

<br />

### 테스트 코드 작성

- statement 함수 및 json 데이터는 상단 참고
- 예상 결과를 변수로:

```javascript
const RECEIPT = `청구내역 (고객명: BigCo)
  hamlet : $650.00 (55석)
  As You Like It : $580.00 (35석)
  Othello : $500.00 (40석)
  총액: $1,730.00
  적립 포인트: 47점`
```

- test code 작성

```javascript
describe('공연료 영수증을 출력하는 함수', () => {
  const [invoice] = JSON.parse(JSON.stringify(invoicesData));
  const plays = JSON.parse(JSON.stringify(playsData));

  test('첫 번째 예시', () => {
    expect(beforeStatement(invoice, plays).replace(/\s/g, '')).toMatch(
      RECEIPT.replace(/\s/g, ''),
    );
  });

  test('첫 번째 예시 - 리팩토링 (Plain Text)', () => {
    expect(plainStatement(invoice, plays).replace(/\s/g, '')).toMatch(
      RECEIPT.replace(/\s/g, ''),
    );
  });
```

- 이렇게 리팩터링 전에 테스트코드를 작성하여 동작결과를 예측하고, 후에 리팩토링후의 테스트코드도 동일한 결과가 나오는지 테스트를 함으로써 보다 안전하게 관리가 가능

### 주의점

- 테스트 코드는 자가진단을 하게 만들어(자동 테스트), 사용자에게 피로감을 덜주어야 함.
- 따라서 이를위해 테스트 프레임워크를 사용하는 것이 바람직 (Jest, Mocha, Jasmine, AVA)

### 결론

- **리팩토링 하기 전에 제대로 된 테스트부터 마련한다. 테스트는반드시 자가진단하도록 만든다.**

---

## 1.4 statement() 함수 쪼개기

### 적용 사항

- 리팩터링은 프로그램 수정을 작은단계로 나눠서 진행
- 그래서 중간에 실수하더라도 버그를 쉽게 찾을 수 있음
- `함수 추출 -> 변수명 변경 -> 변수 인라인 -> 반복문 쪼개기` 순서로 진행

<br />

- **함수 추출하기**: 코드조각을 함수로 추출할 때 코드가 하는일을 설명하는 이름을 지어준다
- **변수명 변경**: 변수의 이름을 더 명확하게 변경
- **변수 인라인으로 변경**: 임시변수들을 없애고 질의 함수로 변경하는 과정
- **반복문 쪼개기**: 변수값을 누적시키는 부분을 분리

- 리팩토링 후 코드

```javascript
function statement(invoice, plays) {
  let result = `청구 내역(고객명: ${invoice.customer})\n`
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`
  }
  result += `총액: ${usd(totalAmount())}\n`
  result += `적립 포인트: ${totalVolumeCredits()}점\n`
  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0
    result += Math.max(aPerformance.audience - 30, 0)
    if ('comedy' === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5)
    return result
  }

  function totalVolumeCredits() {
    let volumeCredits = 0
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf)
    }
    return volumeCredits
    /**
     * 1. 반복문쪼개기
     * 2. 문장슬라이드하기 (위치 변경)
     * 3. 함수 추출하기
     * 4. 변수 인라인하기
     */
  }
  function totalAmount() {
    let result = 0
    for (let perf of invoice.performances) {
      result += amountFor(perf)
    }
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  // play는 aPerformance에서 오는 값이라서 제거
  function amountFor(aPerformance) {
    let result = 0

    switch (playFor(aPerformance).type) {
      case 'tragedy': //비극
        result = 40000
        if (aPerformance.audience > 30) result += 1000 * (aPerformance.audience - 30)
        break
      case 'comedy': //희극
        result = 30000
        if (aPerformance.audience > 20) result += 1000 + 500 * (aPerformance.audience - 20)
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }
}
```

---

## 1.5 중간 점검: 난무하는 중첩함수

- 위 네 단계 뿐만 아니라, 중첩함수를 여러개의 보조 함수로 빼낼 수 있음

```javascript
export function statement(invoice, plays) {
  let result = `청구내역 (고객명: ${invoice.customer})\n`

  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`
  }

  result += `총액 ${usd(totalAmount())}\n`
  result += `적립 포인트 ${totalVolumeCredits()}점\n`

  return result

  function totalAmount() {
    let result = 0

    for (let perf of invoice.performances) {
      result += amountFor(perf)
    }
    return result
  }

  function totalVolumeCredits() {
    let result = 0

    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf)
    }
    return result
  }

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(
      aNumber / 100,
    )
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0

    result += Math.max(aPerformance.audience - 30, 0)

    if ('comedy' === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5)
    }

    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance) {
    let result = 0

    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 40_000

        if (aPerformance.audience > 30) {
          result += 1_000 * (aPerformance.audience - 30)
        }
        break
      case 'comedy':
        result = 30_000

        if (aPerformance.audience > 20) {
          result += 10_000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    return result
  }
}
```

---

## 1.6 계산 단계와 포맷팅 단계 분리하기

> 텍스트, html 등 다른 형식으로 계산결과를 보여주고 싶다면?

### 단계 분리하기

1. 계산단계 → statement()에 필요한 **데이터 처리 함수**
2. 포맷팅단계 → 처리한 결과를 텍스트나 HTML 로 **표현하는 함수**

### 분리 절차

1. render 단계를 함수로 추출
2. render 위해 계산 함수들이 render 함수 내부로 들어가도록 함
3. 표현하는 역할만 하기위해 render 함수는 전달받은 데이터만 처리할 수 있도록 함
4. 이를 위해 render 함수의 인자는 data 객체 하나로 통일
5. 데이터처리 함수에서 data 객체에 필요한 정보를 추가
6. data 객체에 정보를 추가하기 위해, 자연스럽게 계산함수들이 데이터처리 함수로 이동

### 추가작업

- 분리된 함수를 별도의 파일에 저장 (1.7장 설명)
- `Object.assign({}, data)` 를 이용해 얕은 복사를 수행
  - 가변데이터는 금방 상하기 때문에 불변데이터로 취급
- 반복문을 파이프라인으로 변경
  - 8.8 장에서 설명
  - 객체가 파이프라인을 따라 흐르며 어떻게 처리되는지를 자연스럽게 읽을 수 있음
  - 즉 논리를 파악하기 쉬워짐

```javascript
// statement()에 필요한 데이터 처리
function createStatementData(invoice, plays) {
  // 두번째 단계에 전달할 중간 데이터구조 생성
  const result = {}
  result.customer = invoice.customer
  result.performances = invoice.performances.map(enrichPerformance)
  result.totalAmount = totalAmount(result)
  result.totalVolumeCredits = totalVolumeCredits(result)
  return result

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance) {
    let result = 0

    switch (aPerformance.play.type) {
      case 'tragedy': {
        result = 40000
        if (aPerformance.audience > 30) result += 1000 * (aPerformance.audience - 30)
        break
      }
      case 'comedy': {
        result = 30000
        if (aPerformance.audience > 20) result += 10000 + 500 * (aPerformance.audience - 20)
        result += 300 * aPerformance.audience
        break
      }
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
    }

    return result
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0
    result += Math.max(aPerformance.audience - 30, 0)
    if (aPerformance.play.type === 'comedy') {
      result += Math.floor(aPerformance.audience / 5)
    }
    return result
  }

  // for 반복문을 파이프라인으로 변경
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  // for 반복문을 파이프라인으로 변경
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}

function statement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}

// 처리한 결과를 HTML로 표현
function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`
  result += '<table>\n'
  result += '<tr><th>연극</th><<th>좌석 수</th><th>금액</th></tr>\n'
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>\n`
    result += `  <td>${usd(perf.amount)}</td></tr>\n`
  }

  result += `<p>총액: ${usd(data.totalAmount)}</p>\n`
  result += `<p>적립 포인트: ${data.totalVolumeCredits}점</p>\n`
  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }
}

export default statement
```

---

## 1.7 중간점검: 두 파일(과 두 단계)로 분리됨

- 위에서 작성한 코드를 두 파일 (두 단계)로 분리할 수 있음

- statement.js

```javascript
// statement.js

// middle data
import { createStatementData } from './1-6-createStatementData.js'

export { htmlStatement }
export { statement }

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}
function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\\n`
  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience}석)\\n`
  }
  result += `총액 : ${usd(data.totalAmount / 100)}\\n`
  result += `적립 포인트 : ${data.totalVolumeCredits}점\\n`
  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber)
  }
}
function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}
function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\\n`
  result += '<table>\\n'
  result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>'
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`
    result += `<td>${usd(perf.amount)}</td></tr>\\n`
  }
  result += '</table>\\n'
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\\n`
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\\n`
  return result
}
function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber)
}
```

- createStatementData.js

```javascript
export default function createStatementData(invoice, plays) {
  const result = {}

  result.customer = invoice.customer
  result.performances = invoice.performances.map(enrichPerformance)
  result.totalAmount = totalAmount(statementData)
  result.totalVolumeCredits = totalVolumeCredits(statementData)
  return result

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumneCreditFor(result)
    return result
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
  function amountFor(aPerformance) {
    let result = 0

    switch (playFor(aPerformance).type) {
      case 'tragedy': //비극
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case 'comedy': //희극
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }
    // (2)
    return result
  }
  function volumneCreditFor(perf) {
    let result = 0
    result += Math.max(perf.audience - 30, 0)
    // 희극 관객 5명마다 추가 포인트를 제공한다
    if (playFor(perf).type === 'comedy') result += Math.floor(perf.audience / 5)
    return result
  }
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}
```

- 처음보다는 코드량이 늘음.

  - 함수로 추출하면서 함수 본문을 열고 닫는 괄호가 덧붙어서

- **장점: 전체 로직을 구성하는 요소 각각이 더 뚜렷이 부각됨**
- 계산하는 부분과 출력 형식을 다루는 부분이 분리됨
  - 따라서, 모듈화 되어 각 부분이 하는 일과 그 부분들이 맞물려 돌아가는 과정을 파악하기 쉬워짐
  - 프로그래밍에서는 무조건 간결함 보다는, ‘명료함'이 중요
- 모듈화 덕분에 계산 코드 중복 안해도 html 버전 만들 수 있음

- 항시 **코드베이스를 작업하기 전보다 더 건강하게 고친다**는 변형 규칙을 적용하길 권장함

---

## 1.8 다형성을 활용해 계산 코드 재구성하기

- 희극, 비극 서브클래스가 각자의 구체적인 계산 로직을 정의하도록 조건부 로직을 다형성으로 바꾸는 작업이 필요
- 1.7절의 createStatementData.js를 변경

### 변경 방법

1. 조건부 함수 amountFor(), volumeCreditFor()를 전용 클래스로 옮긴다.
2. performance 생성 시, createPerformanceCalculator라는 function에서 분기를 통해 각 희극, 비극 전용 클래스로 생성한다.

<Br />

- 결과

```javascript
export default function createStatementData(invoice, plays) {
  ...
  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }
  ...
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error("서브 클래스에서 처리하도록 설계되었습니다.");
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}
class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;

    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
```

---

## 1.9 상태 점검: 다형성을 활용하여 데이터 생성하기

- 마지막으로, 서브 클래스를 사용하여 amount, volumeCredit의 조건부 로직을 생성 함수 하나로 옮길 수 있음

```javascript
// createStatementData.js

export default function createStatementData(invoice, plays) {
  const result = {}

  result.customer = invoice.customer
  result.performances = invoice.performances.map(enrichPerformance)
  result.totalAmount = totalAmount(result)
  result.totalVolumeCredits = totalVolumeCredits(result)
  return result

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`)
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    throw new Error('서브 클래스에서 처리하도록 설계되었습니다.')
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0)
  }
}
class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30)
    }
    return result
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20)
    }
    result += 300 * this.performance.audience

    return result
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5)
  }
}
```

---

## 1.10 마치며

- 지금까지, `함수 추출하기`, `변수 인라인하기`, `함수 옮기기`, `조건부 로직을 다형성으로 바꾸기` 를 배웠음.
- 정리하자면 아래와 같음 (AS-IS -> TO-BE로 변경)

<br />

#### 함수 추출하기

```javascript
// AS-IS
   volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  // TO-BE
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100);
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }
```

#### 변수 인라인하기

```javascript
// AS-IS
let totalAmount = 0
let volumeCredits = 0
let result = `청구 내역 (고객명: ${invoice.customer})\n`

const format = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
}).format

for (let perf of invoice.performances) {
  const play = plays[perf.playID]
  let thisAmount = 0

  switch (play.type) {
    //비극
    case 'tragedy':
      thisAmount = 40000
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30)
      }
      break

    //희극
    case 'comedy':
      thisAmount = 30000
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20)
      }
      thisAmount += 300 * perf.audience
      break

    default:
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }

  //포인트 적립
  volumeCredits += Math.max(perf.audience - 30, 0)
  //희극 관객 5명마다 추가 포인트 제공
  if ('comedy' === play.type) {
    volumeCredits += Math.floor(perf.audience / 5)
  }

  //청구내역을 출력
  result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`
  totalAmount += thisAmount
}

// TO-BE
let result = `청구내역 (고객명: ${invoice.customer})\n`

for (let perf of invoice.performances) {
  // 청구 내역을 출력한다.
  result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`
}

result += `총액 ${usd(totalAmount())}\n`
result += `적립 포인트 ${totalVolumeCredits()}점\n`

return result
```

#### 함수 옮기기

```javascript
// AS-IS
let totalAmount = 0
let volumeCredits = 0
let result = `청구 내역 (고객명: ${invoice.customer})\n`

const format = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
}).format

for (let perf of invoice.performances) {
  const play = plays[perf.playID]
  let thisAmount = 0

  switch (play.type) {
    //비극
    case 'tragedy':
      thisAmount = 40000
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30)
      }
      break

    //희극
    case 'comedy':
      thisAmount = 30000
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20)
      }
      thisAmount += 300 * perf.audience
      break

    default:
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }

  //포인트 적립
  volumeCredits += Math.max(perf.audience - 30, 0)
  //희극 관객 5명마다 추가 포인트 제공
  if ('comedy' === play.type) {
    volumeCredits += Math.floor(perf.audience / 5)
  }

  //청구내역을 출력
  result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`
  totalAmount += thisAmount
}
// TO-BE
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}
function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\\n`
  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience}석)\\n`
  }
  result += `총액 : ${usd(data.totalAmount / 100)}\\n`
  result += `적립 포인트 : ${data.totalVolumeCredits}점\\n`
  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber)
  }
}
function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}
function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\\n`
  result += '<table>\\n'
  result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>'
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`
    result += `<td>${usd(perf.amount)}</td></tr>\\n`
  }
  result += '</table>\\n'
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\\n`
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\\n`
  return result
}
function usd(aNumber) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber)
}
```

#### 조건부 로직을 다형성으로 바꾸기

```javascript
// AS-IS
function amountFor(aPerformance) {
  let result = 0

  switch (playFor(aPerformance).type) {
    case 'tragedy': //비극
      result = 40000
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30)
      }
      break
    case 'comedy': //희극
      result = 30000
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20)
      }
      result += 300 * aPerformance.audience
      break
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  // (2)
  return result
}

// TO-BE
function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`)
  }
}
```

<br />

- 결국, 좋은 코드를 가늠하는 확실한 방법은 **‘얼마나 수정하기 쉬운가’** 다

---

## 참고

> - [리팩터링 2판 (마틴 파울러, 2020.04)](hhttp://www.yes24.com/Product/Goods/89649360)
