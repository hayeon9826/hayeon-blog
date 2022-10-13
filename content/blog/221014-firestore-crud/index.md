---
title: SSR에서는 UseLayoutEffect 대신 useEffect를 사용하자!
date: '2022-10-14T11:45:32.169Z'
description: 'Firestore에 데이터 저장 / 수정 / 삭제 가져오기 예제 배워보기'
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/930f050d-6e88-4b6c-b031-dbf798a78fb2/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/930f050d-6e88-4b6c-b031-dbf798a78fb2/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

## 들어가며

최근 토이 프로젝트를 시작했는데, 스키마 없이 빠르게 DB 세팅을 위해 Firestore를 사용하기로 했다. DB 도입을 위해 가장 중요하게 생각한 요소는 '빠르고 간편한' 데이터베이스가 필요했고, Firebase의 간편한 NoSQL인 Firestore를 사용하기로 했다.

Firebase 및 Firestore는 공식 도큐에 자세히 설명이 되어 있어서, [Firebase 사이트 공식 도큐](https://firebase.google.com/docs/firestore?hl=ko)만 봐도 이해가 잘 되었다. 공식 도큐를 참고해서 간단하게 Firestore이 어떤 서비스인지 알아보고 기본적인 데이터 생성, 수정, 가져오기, 삭제 방법을 정리하려고 한다.

(추가로, 기존에 Firestore로 채팅을 만드는 포스트를 쓴적이 있는데, ([링크](https://hayeondev.gatsbyjs.io/220125-firestore-react-chat-app/)) 채팅 구현을 위해서는 해당 글을 참고해도 좋을 것 같다.)

## Firebase이란?

<img src="https://velog.velcdn.com/images/khy226/post/930f050d-6e88-4b6c-b031-dbf798a78fb2/image.png" style="width: 60%; margin: 0 auto;" />

Firebase는 구글에서 제공하는 모바일 앱/웹을 위한 플랫폼이다. Firebase는 인증(authentication), 데이터베이스(firestore, realtime database), 스토리지, 푸시 알림, 호스팅, Function 등 여러 기능을 제공하기 때문에 개발자가 직접 일일이 기능을 개발할 필요가 없다. 백엔드 기능을 클라우드 서비스 형태로 제공하기 때문에 간단한 조작으로 서버리스 애플리케이션 개발이 가능하며, 서버를 구입할 필요도 없다. (일정 용량까지 무료: 가격 정책은 [Firebase Pricing](https://firebase.google.com/pricing) 페이지 참고)

덕분에, Firebase 플랫폼을 통해 적은 비용으로 매우 빠르고 편리하게 앱/웹을 만들 수 있다.

## Firestore이란?

<img src="https://velog.velcdn.com/images/khy226/post/c57ebdf3-d650-4a15-9eb5-851b5cdbfd68/image.png" style="width: 60%; margin: 0 auto;"/>

Firestore는 구글(firebase)에서 지원하는 **NoSQL 데이터베이스 서비스**로, 실시간 리스너를 통해 사용자와 기기간 데이터의 실시간 동기화가 가능하다. 또한, Cloud Firestore는 앱에서 많이 사용되는 데이터를 캐시하기 때문에 기기가 오프라인 상태가 되더라도 앱에서 데이터를 쓰고 읽고 수신 대기하고 쿼리할 수 있다.

> - Cloud Firestore는 모바일 앱 개발을 위한 Firebase의 최신 데이터베이스로서 실시간 데이터베이스의 성공을 바탕으로 더욱 직관적인 새로운 데이터 모델을 선보입니다. 또한 실시간 데이터베이스보다 풍부하고 빠른 쿼리와 원활한 확장성을 제공합니다. [출처: 데이터베이스 선택: Cloud Firestore 또는 실시간 데이터베이스](https://firebase.google.com/docs/firestore/rtdb-vs-firestore?hl=ko)

파이어베이스 공식 도큐에서는 Firestore의 구조를 아래와 같이 설명하고 있다:

![](https://velog.velcdn.com/images/khy226/post/ec113b87-98db-4975-bd87-fa44b663dc49/image.png)

> 이미지 출처: [Understanding Collection Group Queries in Cloud Firestore](https://firebase.blog/posts/2019/06/understanding-collection-group-queries)

- Firestore는 **NoSQL 문서 중심의 데이터베이스**입니다. SQL 데이터베이스와 달리 테이블이나 행이 없으며, **컬렉션**으로 정리되는 문서에 데이터를 저장합니다.
- 각 문서에는 **키-값 쌍**이 들어 있습니다. Cloud Firestore는 작은 문서가 많이 모인 **컬렉션**을 저장하는 데 최적화되어 있습니다.
- 모든 문서는 **컬렉션에 저장**되어야 합니다. 문서는 하위 컬렉션 및 중첩 객체를 포함할 수 있으며, 둘 다 문자열 같은 기본형 필드나 목록 같은 복합 객체를 포함할 수 있습니다.
- 컬렉션과 문서는 Cloud Firestore에서 암시적으로 생성됩니다. 사용자는 컬렉션 내의 문서에 데이터를 할당하기만 하면 됩니다. 컬렉션 또는 문서가 없으면 Cloud Firestore에서 자동으로 생성합니다.

아래 사진은 Firestore의 실제 예시이다. Post라는 컬렉션 (기존 DB에 비유하자면 Post 모델) 하위에 여러가지 문서들(기존 DB에서는 각각의 레코드)이 있다. 그리고 각 문서들에는 필드가 있다.

![](https://velog.velcdn.com/images/khy226/post/72309ec5-6b9a-47cf-bbe0-7fcd4e4663f0/image.png)

### Firestore 세팅 방법

1. Firebase Console > Firestore에서 '데이터베이스 만들기' 버튼 클릭
2. 프로덕션 모드 선택
3. Firestore 데이터베이스 물리적 위치 선택 (본인은 가장 가까운 asia-northeast3로 지정)
4. 규칙 수정 > 임시로 테스트 할때는 read, write를 모두 할 수 있도록 설정

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Firebase 콘솔에서 세팅까지 완료했다면, 리액트 프로젝트에서 firebaseApp, firestore 초기화

```javascript
// Firebase SDK에서 필요한 함수들 import 하기
import { initializeApp, getApp, FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase 설정
export let app: FirebaseApp
// 처음 Firesbase 프로젝트 생성할 때 나오는 key들을 .env 파일에 넣고 작업
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
}

// Firebase 초기화
try {
  app = getApp('app')
} catch (e) {
  app = initializeApp(firebaseConfig, 'app')
}

// Firestore 초기화
export const db = getFirestore(app)
```

이제, 위에서 생성한 Firestore를 가지고 데이터를 가져오고 / 생성 / 수정 / 삭제하는 방법에 대해서 알아보자.

---

## 데이터 가져오기

> - 컬렉션의 문서를 쿼리하여 하나의 요청으로 여러 문서를 검색할 수 있습니다. 예를 들어 where()를 사용하여 특정 조건을 충족하는 모든 문서를 쿼리하고 get()을 사용하여 결과를 가져올 수 있습니다.

데이터를 가져오기 위해서는 위에서 생성한 `db`(Firestore) 객체를 가져와서 원하는 콜렉션과 쿼리를 추가해주면 된다. `firebase/firestore`의 collection, query, where, getDocs 를 사용해서 원하는 조건의 데이터를 가져올 수 있다.

쿼리 형식은 `query(콜렉션, where문)`으로 적용할 수 있다.

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore'

// 카테고리가 기타(etc)인 모든 posts 데이터를 가져오는 쿼리
const q = query(collection(db, 'posts'), where('category', '==', 'etc'))

// getDocs 함수에 위에 정의한 쿼리를 적용해서 모든 문서들을 가져온다.
const querySnapshot = await getDocs(q)
querySnapshot.forEach(doc => {
  // 가져온 모든 문서들을 확인
  console.log(doc.id, ' => ', doc.data())
})
```

혹은, 쿼리 없이 where() 필터를 생략하고 컬렉션의 모든 문서들을 검색할 수도 있다.

```javascript
import { collection, getDocs } from 'firebase/firestore'

// 'posts' 컬렉션의 모든 문서들을 가져옴
const querySnapshot = await getDocs(collection(db, 'posts'))
querySnapshot.forEach(doc => {
  // 가져온 모든 문서들을 확인
  console.log(doc.id, ' => ', doc.data())
})
```

<Br />

_더 많은 예제는 [Firestore - 데이터 읽기](https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko) 파트에서 확인할 수 있다._

## 데이터 생성 / 수정

## 데이터 삭제

## 데이터 실시간 리스너

## 마치며

---

## 참고

> - [[공식도큐] Firebase 프로젝트 이해](https://firebase.google.com/docs/projects/learn-more)
> - [[공식도큐] 데이터베이스 선택: Cloud Firestore 또는 실시간 데이터베이스](https://firebase.google.com/docs/firestore/rtdb-vs-firestore?hl=ko)
> - [[공식도큐] Cloud Firestore에 데이터 추가](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko)
> - [[공식도큐] 트랜잭션 및 일괄 쓰기](https://firebase.google.com/docs/firestore/manage-data/transactions?hl=ko)
> - [[공식도큐] Cloud Firestore에서 데이터 삭제](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko)
> - [[공식도큐] Cloud Firestore로 데이터 가져오기](https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko)
> - [Firebase란?](https://beomseok95.tistory.com/106)
