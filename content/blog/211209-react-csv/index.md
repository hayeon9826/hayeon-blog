---
title: React-csv로 csv 파일 다운로드하기
date: "2021-12-09T22:40:32.169Z"
description: 리액트 프로젝트에서 react-csv 패키지를 사용해 csv 파일을 다운로드 하는 방법을 정리해보았다.
---

<img src="https://velog.velcdn.com/images/khy226/post/9129592c-bb81-4fa9-9227-c07c4b8a4150/react.png" style="width: 60%; padding-bottom: 50px;">



리액트 프로젝트에서 csv 파일 다운로드 하는 방법을 정리해보았다. react-csv 패키지를 사용하였고, 사용방법도 쉬워서 예제 코드만 봐도 쉽게 이해할 수 있다.



### React-csv

`react-csv` 는 csv 파일을 다운로드 받을수 있는 패키지이다. 주간 다운로드 수도 많고 마지막 업데이트도 2020년 4월로 오래되지 않아서 괜찮은 패키지인것 같아 사용했다.

- yarn 링크: https://yarnpkg.com/package/react-csv
- github 링크: https://github.com/react-csv/react-csv


<br/>

#### 예시)

data props에 배열 데이터를 주면, 해당 데이터를 csv 형태로 다운로드 받을 수 있다. 코드 예시는 아래와 같다:

```typescript
import { CSVLink, CSVDownload } from "react-csv";

const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
<CSVLink data={csvData}>Download me</CSVLink>;
// or
<CSVDownload data={csvData} target="_blank" />;
```



> *참고: csv는 엑셀과 달리 raw 데이터이므로 포매팅이나 스타일을 입힐 수 없다. 스타일을 입히고 싶다면 sheetjs나 xlsx와 같은 패키지 사용을 추천한다.

<br/>

### 0. 컴포넌트

react-csv는 `CSVLink` 와 `CSVDownload` 두 가지 컴포넌트를 제공한다. 

- `CSVLink`: 엑셀 파일을 다운로드 할 수 있는 링크 컴포넌트 이다. 해당 링크를 클릭했을 때에만 csv 파일을 다운받을 수 있다.
- `CSVDownload`: 해당 컴포넌트가 마운트 될 때 자동으로 csv를 다운로드할 수 있는 컴포넌트이다.


나는 사용자가 클릭시에만 csv를 다운로드 하는 기능 구현을 위해 `CSVLink` 를 사용했다.



#### 컴포넌트와 props

`CSVLink` 컴포넌트에서는 여러가지 props 를 사용할 수 있다.

- `data`: csv 파일에서 정보가 들어가는 부분이다. data는 이중배열, 객체 배열 혹은 문자열 형식으로 사용할 수 있다.
- `header`: csv 파일에서 필드를 지정할 수 있는 부분이다. label과 key값을 줄 수 있다.
- `filename`: 다운로드 받는 csv 파일 이름을 지정할 수 있다.
- `onClick`: 링크를 클릭할 때 동기 / 비동기적으로 여러 작업을 수행하고자 할 때 사용할 수 있다.


아래는 props를 사용한 예제이다.

#### 예시)

```typescript
const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" }
];

const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

<CSVLink 
  data={data} 
  headers={headers} 
  filename={'CSV 데이터'}
  onClick={() => {
    console.log("링크 클릭함");
  }}
  >
  Download me
</CSVLink>;
```



예제 프로젝트에서 csv 다운로드 링크를 클릭 시 특정 주문 데이터(배송 전)를 다운 받을 수 있도록 구현해보았다.

우선 `header`를 선언하고 주문 데이터를 react-query로 가져온 후, 주문 데이터를 헤더에 맞게 mapping 하였다. 또한, `onClick` props를 주어 엑셀 다운받기 전, `confirm()` 메서드로 사용자의 확인을 받아 '예'를 클릭했을 때만 다운로드 받을 수 있게 제한을 걸었다.

<hr/>

### 1. 설치
yarn, npm 혹은 cdn으로 설치가 가능하다.

- yarn
```
yarn add react-csv
```
- npm
```
npm install react-csv --save;
```
- cdn
```
<script src="https://cdn.rawgit.com/abdennour/react-csv/6424b500/cdn/react-csv-latest.min.js" type="text/javascript"></script>
```


<br/>


### 2. 헤더 선언, 주문 데이터 가져오기

우선 `CSVLink` 헤더에 들어갈 header 변수를 선언하고, 주문 데이터를 react-query로 가져왔다.

```typescript
// header 선언
const headers = [
    { label: 'Order ID', key: 'orderId' },
    { label: 'Item ID', key: 'itemId' },
    { label: 'Language', key: 'language' },
    { label: 'Created At', key: 'createdAt' },
  ];

// react-query로 (ready) 배송준비 상태의 주문 데이터 가져오기
// 최대 100개 까지만 가져올 수 있도록 함
  const {
    status,
    error,
    data: { objects: orders } = {},
  } = useQuery<Objects<Order>, Error>(
    ['orders', 'created_at desc'],
    getObjects({
      model_name: 'order',
      q: { s: 'created_at desc', status_eq: 'ready'},
      per: '100',
    }),
    {
      enabled: !!currentUser,
    },
  );
```

<br/>

### 3.  주문 데이터를 header에 맞게 매핑

타입스크립트 적용을 위해 orderData의 인터페이스를 선언해주고, 

```typescript
// 인터페이스 선언
interface tableProps {
  orderId?: string;
  itemId?: string;
  language?: 'ko' | 'en';
  createdAt?: string;
}

// 2 에서 가져온 order 데이터를 헤더에 맞게 매핑
  const orderData =
    orders &&
    orders.map((order) => {
      const data: tableProps = {};

      container.orderId = order?.id;
      container.itemId = order?.item?.id;
      container.language = order?.language;
      container.createdAt = order?.created_at;

      return data;
    });
```

<br/>

리턴된 orderData는 여러 객체의 배열 형식이다. 헤더에 들어가는 key를 기준으로 정렬하였다:
```react
예시: orderData = [
	{orderId: 1, itemId: 2, language: 'ko', createdAt: 20210903}, 
     	{orderId: 2, itemId: 6, language: 'ko', createdAt: 20211011},
        {orderId: 2, itemId: 6, language: 'ko', createdAt: 20211011},
      ...
     ]
```

<br/>

### 4. `CSVLink` 컴포넌트 적용

앞서 선언한 data, header를 `CSVLink` 컴포넌트에 적용해주고, 추가로 `onClick`과 `filename`props도 같이 선언해주었다.

`onClick` 의 경우, confirm 창에서 '확인'을 누르면 `true` 가 리턴되어 csv 파일이 다운로드 되며, '취로'를 누르면 `false` 가 리턴되어 다음 작업이 수행되지 않는다.

`filename` 는 moment 라이브러리를 사용해 현재 날짜에 맞는 이름으로 다운로드 받을 수 있도록 설정해주었다.

```typescript
// data, headers, onClick, filename 설정
  <CSVLink
      data={orderData}
      headers={headers}
    	// confirm 창에서 '확인'을 눌렀을 때만 csv 파일 다운로드
      onClick={() => {
        if (confirm('csv파일을 다운로드 받겠습니까?')) {
          return true;
        } else {
          return false;
        }
      }}
      filename={`배송 준비 주문_${moment().format('YYYYMMDD')}`}
      >
    엑셀 다운로드
</CSVLink>
```

<hr/>

### 5. 결과

주문 데이터를 최대 100개 까지 가져와, `주문 id / 상품 id / 언어 / 생성일`을 다운로드할 수 있는 기능을 구현하였다. '엑셀 다운로드' 버튼을 클릭하면 엑셀을 다운 받을 것이냐는 confirm 창이 뜨고, '확인'을 눌렀을 때 해당 csv 파일이 다운로드 된다.

프로젝트 예시 사진은 아래와 같다.

<br/>

1) 엑셀 다운로드 버튼 레이아웃

![스크린샷 2021-12-09 오후 12 40 22](https://user-images.githubusercontent.com/72732446/145336363-f86a4a6a-4f84-40bb-b63a-7ccce5f847a1.png)




2) '엑셀 다운로드' 버튼 눌렀을 때 confirm 창 띄우기

![스크린샷 2021-12-09 오후 12 40 30](https://user-images.githubusercontent.com/72732446/145336546-4662bcea-b0fd-4c0a-a538-718184bc2f0b.png)




3) confirm 창에서 '확인' 버튼 누르고 다운로드 된 csv 파일

![스크린샷 2021-12-09 오후 1 54 05](https://user-images.githubusercontent.com/72732446/145336763-768b86d8-d979-4785-9ff2-826b3350513e.png)





<hr/>

### 참고:

> - [react-csv 깃헙 공식 도큐](https://github.com/react-csv/react-csv)
> - [React로 Excel 파일 만들기](https://velog.io/@jjanmo/React%EB%A1%9C-Excel-%ED%8C%8C%EC%9D%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0)

