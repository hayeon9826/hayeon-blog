---
title: Firestore 데이터 관리 방법 알아보기
date: '2022-10-14T11:45:32.169Z'
description: 'Firestore 데이터 저장 / 수정 / 삭제 가져오기 예제 정리'
category: 'React'
keywords: 'Firebase, Firestore, NoSQL'
image: 'https://velog.velcdn.com/images/khy226/post/930f050d-6e88-4b6c-b031-dbf798a78fb2/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/930f050d-6e88-4b6c-b031-dbf798a78fb2/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

## 들어가며

최근 토이 프로젝트를 시작했는데, 스키마 없이 빠르게 DB 세팅을 위해 Firestore를 사용하기로 했다. DB 도입을 위해 가장 중요하게 생각한 요소는 '빠르고 간편한' 데이터베이스가 필요했고, Firebase의 간편한 NoSQL인 Firestore를 사용하기로 했다.

Firebase 및 Firestore는 공식 도큐에 자세히 설명이 되어 있어서, [Firebase 사이트 공식 도큐](https://firebase.google.com/docs/firestore?hl=ko)만 봐도 이해가 잘 되었다. 공식 도큐를 참고해서 간단하게 Firestore이 어떤 서비스인지 알아보고 기본적인 데이터 생성, 수정, 가져오기, 삭제 방법을 정리하려고 한다.

(추가로, 기존에 Firestore로 채팅을 만드는 포스트를 쓴적이 있는데, ([링크](https://hayeondev.gatsbyjs.io/220125-firestore-react-chat-app/)) 채팅 구현을 위해서는 해당 글을 참고해도 좋을 것 같다.)

<Br />

## Firebase이란?

<img src="https://velog.velcdn.com/images/khy226/post/930f050d-6e88-4b6c-b031-dbf798a78fb2/image.png" style="width: 50%; margin: 0 auto;" />

<br />

Firebase는 구글에서 제공하는 모바일 앱/웹을 위한 플랫폼이다. Firebase는 인증(authentication), 데이터베이스(firestore, realtime database), 스토리지, 푸시 알림, 호스팅, Function 등 여러 기능을 제공하기 때문에 개발자가 직접 일일이 기능을 개발할 필요가 없다. 백엔드 기능을 클라우드 서비스 형태로 제공하기 때문에 간단한 조작으로 서버리스 애플리케이션 개발이 가능하며, 서버를 구입할 필요도 없다. (일정 용량까지 무료: 가격 정책은 [Firebase Pricing](https://firebase.google.com/pricing) 페이지 참고)

덕분에, Firebase 플랫폼을 통해 적은 비용으로 매우 빠르고 편리하게 앱/웹을 만들 수 있다.

<Br />

## Firestore이란?

<img src="https://velog.velcdn.com/images/khy226/post/c57ebdf3-d650-4a15-9eb5-851b5cdbfd68/image.png" style="width: 50%; margin: 0 auto;"/>

<br />

Firestore는 구글(firebase)에서 지원하는 **NoSQL 데이터베이스 서비스**로, 실시간 리스너를 통해 사용자와 기기간 데이터의 실시간 동기화가 가능하다. 또한, Cloud Firestore는 앱에서 많이 사용되는 데이터를 캐시하기 때문에 기기가 오프라인 상태가 되더라도 앱에서 데이터를 쓰고 읽고 수신 대기하고 쿼리할 수 있다.

> - Cloud Firestore는 모바일 앱 개발을 위한 Firebase의 최신 데이터베이스로서 실시간 데이터베이스의 성공을 바탕으로 더욱 직관적인 새로운 데이터 모델을 선보입니다. 또한 실시간 데이터베이스보다 풍부하고 빠른 쿼리와 원활한 확장성을 제공합니다. [출처: 데이터베이스 선택: Cloud Firestore 또는 실시간 데이터베이스](https://firebase.google.com/docs/firestore/rtdb-vs-firestore?hl=ko)

파이어베이스 공식 도큐에서는 Firestore의 구조를 아래와 같이 설명하고 있다:

![](https://velog.velcdn.com/images/khy226/post/ec113b87-98db-4975-bd87-fa44b663dc49/image.png)

> 이미지 출처: [Understanding Collection Group Queries in Cloud Firestore](https://firebase.blog/posts/2019/06/understanding-collection-group-queries)

<br />

- Firestore는 **NoSQL 문서 중심의 데이터베이스**입니다. SQL 데이터베이스와 달리 테이블이나 행이 없으며, **컬렉션**으로 정리되는 문서에 데이터를 저장합니다.
- 각 문서에는 **키-값 쌍**이 들어 있습니다. Cloud Firestore는 작은 문서가 많이 모인 **컬렉션**을 저장하는 데 최적화되어 있습니다.
- 모든 문서는 **컬렉션에 저장**되어야 합니다. 문서는 하위 컬렉션 및 중첩 객체를 포함할 수 있으며, 둘 다 문자열 같은 기본형 필드나 목록 같은 복합 객체를 포함할 수 있습니다.
- 컬렉션과 문서는 Cloud Firestore에서 암시적으로 생성됩니다. 사용자는 컬렉션 내의 문서에 데이터를 할당하기만 하면 됩니다. 컬렉션 또는 문서가 없으면 Cloud Firestore에서 자동으로 생성합니다.

<br />

아래 사진은 Firestore의 실제 예시이다.
Post라는 컬렉션 (기존 DB에 비유하자면 Post 모델) 하위에 여러가지 문서들(기존 DB에서는 각각의 레코드)이 있다. 그리고 각 문서들에는 필드가 있다.

![](https://velog.velcdn.com/images/khy226/post/72309ec5-6b9a-47cf-bbe0-7fcd4e4663f0/image.png)

<br />

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

이제 세팅까지 다 되었다면, 위에서 생성한 Firestore를 가지고 데이터를 가져오고 / 생성 / 수정 / 삭제하는 방법에 대해서 알아보자.

---

<br />

## 데이터 가져오기

데이터를 가져오기 위해서는 아래 세 가지 함수를 활용할 수 있다.

- collection
- getDocs
- query

> - 컬렉션의 문서를 쿼리하여 하나의 요청으로 여러 문서를 검색할 수 있습니다. 예를 들어 where()를 사용하여 특정 조건을 충족하는 모든 문서를 쿼리하고 get()을 사용하여 결과를 가져올 수 있습니다.

<br />

Firestore에서 `firebase/firestore`의 함수를 이용해 바로 데이터를 가져올 수 있다. 특히, 따로 next/api 폴더에서 서버 사이드 요청을 하지 않아도 바로 적용이 된다는 점이 간편했다. (api 폴더 내에서 가져오도록 작성할 수도 있음)

<br />

데이터를 가져오기 위해서는 위에서 생성한 `db`(Firestore) 객체를 가져와서 원하는 콜렉션과 쿼리를 추가해주면 된다. `firebase/firestore`의 collection, query, where, getDocs 를 사용해서 원하는 조건의 데이터를 가져올 수 있다.

<br />

쿼리 형식은 `query(콜렉션, where문)`으로 적용할 수 있다.

```javascript
import { db } from 'config/firebase' // 위에서 정의한 firebase 설정 파일
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
import { db } from 'config/firebase'
import { collection, getDocs } from 'firebase/firestore'

// 'posts' 컬렉션의 모든 문서들을 가져옴
const querySnapshot = await getDocs(collection(db, 'posts'))
querySnapshot.forEach(doc => {
  // 가져온 모든 문서들을 확인
  console.log(doc.id, ' => ', doc.data())
})
```

_더 많은 예제는 [Firestore - 데이터 읽기](https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko) 파트에서 확인할 수 있다._

<Br />

## 데이터 생성

- setDoc
- addDoc

> 다음과 같은 몇 가지 방법으로 Cloud Firestore에 데이터를 쓸 수 있습니다.
>
> - 문서 식별자를 명시적으로 지정하여 컬렉션 내의 문서 데이터를 설정합니다.
> - 컬렉션에 새 문서를 추가합니다. 이 경우 Cloud Firestore에서 자동으로 문서 식별자를 생성합니다.
> - 자동으로 생성된 식별자로 빈 문서를 만들고 나중에 데이터를 할당합니다.

<br />

데이터는 `setDoc`과 `addDoc`으로 추가해 줄 수 있다. 두 함수의 차이점은, setDoc의 경우 ID를 직접 지정할 수 있으나, addDoc은 아이디가 자동으로 생성 된다는 것이다.

두 함수 사용하는 형식은 거의 동일하다. 함수(콜렉션, 데이터) 방식으로 호출하면 된다.

<br />

우선 setDoc의 경우, `setDoc(doc(db, 컬렉션 이름, 아이디), 데이터)` 형식으로 넣어주면 된다.

```javascript
import { doc, setDoc } from 'firebase/firestore'

// 데이터 id 지정해서 추가
await setDoc(doc(db, 'cities', 'new-city-id'), data)
```

<Br />

비슷하게, addDoc의 경우도 컬렉션과 데이터를 넣어준다. 다만, 아이디는 넣지 않아도 자동으로 생성된다. `addDoc(doc(db, 컬렉션 이름), 데이터)` 형식

```javascript
import { collection, addDoc } from 'firebase/firestore'

// 데이터 추가 (id는 자동 생성됨)
const docRef = await addDoc(collection(db, 'cities'), {
  name: 'Tokyo',
  country: 'Japan',
})
```

_데이터 생성 함수는 [공식문서: Cloud Firestore에 데이터 추가](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko)에서 더 자세히 확인할 수 있다_

<br />

## 데이터 수정

- updateDoc
- setDoc

> - 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트하려면 update() 메서드를 사용합니다.
> - 단일 문서를 만들거나 덮어쓰려면 set() 메서드를 사용합니다.

<Br />

데이터는 updateDoc setDoc으로 수정 할 수 있다. 두 함수의 차이점은, updateDoc의 경우 특정 필드만 수정 할 수 있고, setDoc은 지정한 데이터를 통째로 변경해버린다. (지정한 데이터가 없다면 추가함)

`updateDoc`으로 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트 할 수 있다.

```javascript
import { doc, updateDoc } from 'firebase/firestore'

const washingtonRef = doc(db, 'cities', 'DC')

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true,
})
```

<br />

`setDoc`으로 문서를 일괄 업데이트 할 수 있다.

```javascript
import { doc, setDoc } from 'firebase/firestore'

// "cities" 콜렉션에 "LA" 아이디 문서가 있다면 업데이트, 아니라면 그냥 추가
await setDoc(doc(db, 'cities', 'LA'), {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA',
})
```

_데이터 수정은 [공식문서: Cloud Firestore에서 데이터 추가 - 문서 업데이트](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data)에서 더 자세히 확인할 수 있다_

<Br />

## 데이터 삭제

- deleteDoc
- updateDoc, deleteField

> - 문서를 삭제하려면 delete() 메서드를 사용합니다.
> - 문서에서 특정 필드를 삭제하려면 문서를 업데이트할 때 FieldValue.delete() 메서드를 사용합니다.

<Br />

데이터 삭제는 두 가지 함수를 사용할 수 있다. 도큐먼트를 한번에 삭제하고 싶다면 deleteDoc를 사용하면 되고, 특정 필드만 지우고 싶다면 deleteField와 updateDoc를 사용할 수 있다.

<Br />

우선 deleteDoc를 통해 다큐먼트를 삭제하는 방법이다.

```javascript
import { doc, deleteDoc } from 'firebase/firestore'

await deleteDoc(doc(db, 'cities', 'DC'))
```

<br />

특정 필드만 삭제하고 싶다면 아래와 같이 사용하면 된다. 삭제를 원하는 필드에 deleteField를 사용하고, 해당 문서를 updateDoc으로 업데이트하면 된다.

```javascript
import { doc, updateDoc, deleteField } from 'firebase/firestore'

const cityRef = doc(db, 'cities', 'BJ')

// Remove the 'capital' field from the document
await updateDoc(cityRef, {
  capital: deleteField(),
})
```

_데이터 삭제 함수는 [공식문서: Cloud Firestore에서 데이터 삭제](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko)에서 더 자세히 확인할 수 있다_

---

<Br />

## 마치며

- 간단한 사이드 프로젝트를 시작하거나, 빠르게 프로젝트 세팅이 필요한 경우에 Firebase를 사용하는 걸 추천한다. 물론 Firebase 이외에도 데이터베이스를 지원하는 간편한 대체 기술들이 있지만, (prisma, supabase, aws amplify 등) 하나의 플랫폼에서 이렇게 여러가지 기능들을 제공하는 서비스는 Firebase가 1등 인 것 같다. 또한, 설정 해야하는 코드량도 매우 적어서 개발하기 편하고, 구글이 호스팅하고 있다는 점도 신뢰가 간다.

- 처음 프로젝트를 생성했을 때 Firebase의 인증 시스템으로 2시간 내에 로그인 / 회원가입 기능도 만들 수 있었는데 매우 편리했다. (지금은 next/auth로 대체했지만..) 만약 직접 구현해야 했다면 서버, 세션처리 (혹은 jwt), 보안처리, 비밀번호 및 아이디 찾기 등 구현해야할 기능이 한두개가 아니었을 것이다. 이런 기능들을 한번에 사용할 수 있다는게 정말 편리했다.

- 특히, NoSQL 데이터베이스 Firestore를 빠르게 적용할 수 있다는 것이 가장 좋았다. 따로 서버를 구축하지 않고도, Firebase에서 제공하는 함수들만으로 데이터를 생성, 수정, 삭제, 접근 할 수 있다는 것이 효율적이었다. 특히, Firestore는 RTSP(Real Time Stream Protocol)가 적용되어 실시간으로 데이터들이 전송되는데, 따로 업데이트를 하지 않아도 실시간으로 데이터들을 받아볼 수 있어서 짧은 코드로 사용자 경험을 높일 수 있었다.

- Firebase에서 제공하는 콘솔도 매우 편리했다. 콘솔은 쉽게 말해서 서버 관리자 페이지인데, 직관적인 UI와 앱의 모든 firebase 기능들을 한번에 관리할 수 있어서 효율적이었다. 구글측에서 보안을 보장해주다는 점도 신뢰가 갔고, 실시간으로 데이터가 업데이트 되는 것을 확인하거나, 인증/서버/DB의 설정을 빠르게 변경 할 수 있는 것도 유용했다.

<Br />

- 하지만 Firebase를 사용하는중에 몇 가지 불편한 점도 있었다. 우선 가끔 서버 요청이 지연 될 때가 있다. 이번 프로젝트에서는 아직 데이터가 몇 없어 별로 불편하진 않았지만, 이전 프로젝트에서 실시간 채팅 기능을 구현했었는데 채팅 내용이 늦게 도착하거나 버벅거리는 현상들이 종종 있었다. 아무래도 서버가 해외에 있다는 것이 가장 큰 원인인 것 같다.
- 또한, Firestore에서 복잡한 쿼리를 사용하긴 어렵다는 점이 단점이다. 기본적으로 사용할 수 있는 쿼리문은 `where`에 한정되어 있고, 흔한 `OR`, `LIKE`문도 지원되지 않는다고 한다. 만약 서비스가 고도화 되고, 구체적인 쿼리가 필요한 경우에는 firestore에만 의존하기에는 어려울 것 같다. 그리고 Firestore의 콘솔이 비교적 가독성이 떨어졌다. 아마 NoSQL 형식의 디비라서 인 것 같기도 한데, 한번에 테이블 구조로 데이터를 확인 할 수 없고, 필터링도 제약적이어서 불편한점이 있었다.

<Br />

---

## 참고

> - [[공식도큐] Firebase 프로젝트 이해](https://firebase.google.com/docs/projects/learn-more)
> - [[공식도큐] 데이터베이스 선택: Cloud Firestore 또는 실시간 데이터베이스](https://firebase.google.com/docs/firestore/rtdb-vs-firestore?hl=ko)
> - [[공식도큐] Cloud Firestore에 데이터 추가](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko)
> - [[공식도큐] 트랜잭션 및 일괄 쓰기](https://firebase.google.com/docs/firestore/manage-data/transactions?hl=ko)
> - [[공식도큐] Cloud Firestore에서 데이터 삭제](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko)
> - [[공식도큐] Cloud Firestore로 데이터 가져오기](https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko)
> - [Firebase란?](https://beomseok95.tistory.com/106)
