---
title: Firestore로 실시간 채팅 앱 구현 (feat. React, Firebase)
date: "2022-01-25T22:40:32.169Z"
description: '이번 포스트에서는 React 채팅앱에 Firestore를 적용하는 방법을 공유드리고자 합니다. 기존에 polling 방식으로 채팅을 구현했을 때 속도도 너무 느리고, 싱크가 맞지 않아 실시간으로 데이터가 반영될 수 있는 Firestore를 적용했습니다.'
---

<img src="https://velog.velcdn.com/images/khy226/post/32f0c996-207b-4c0b-8df6-f65c147fd9b7/logo-standard.png" style=" padding-bottom: 50px;">



 이번 포스트에서는 React 채팅앱에 **Firestore**를 적용하는 방법을 공유드리고자 합니다.
기존에 polling 방식으로 채팅을 구현했을 때 속도도 너무 느리고, 싱크가 맞지 않아 실시간으로 데이터가 반영될 수 있는 **Firestore**를 적용했습니다.

## Firebase 란?

구글에서 제공하는 플랫폼 서비스로 인증(authentication), 데이터베이스(firestore, realtime database), 스토리지, 호스팅, Function 등 여러 기능을 제공합니다. **백엔드 기능**을 클라우드 서비스 형태로 제공하기 때문에 간단한 조작으로 서버리스 애플리케이션 개발이 가능하며, 개인적으로 이전에 사용했던 aws 보다 훨씬 간단하게 느껴졌습니다.

## Firestore 란?

Firestore는 구글(firebase)에서 지원하는**NoSQL 데이터베이스 서비스**로 실시간 리스너를 통해 사용자와 기기간 데이터의 실시간 동기화가 가능합니다. 또한, Cloud Firestore는 앱에서 많이 사용되는 데이터를 캐시하기 때문에 기기가 오프라인 상태가 되더라도 앱에서 데이터를 쓰고 읽고 수신 대기하고 쿼리할 수 있습니다.

구글 설명은 아래와 같습니다.

> - **Cloud Firestore**는 모바일 앱 개발을 위한 Firebase의 최신 데이터베이스로서 실시간 데이터베이스의 성공을 바탕으로 더욱 직관적인 새로운 데이터 모델을 선보입니다. 또한 실시간 데이터베이스보다 풍부하고 빠른 쿼리와 원활한 확장성을 제공합니다.

작업하기에 앞서, **Firestore**의 기본 구조를 간단하게 훑고 가겠습니다.

## Cloud Firestore 의 기본 구조

> SQL 데이터베이스와 달리 테이블이나 행이 없으며, *컬렉션*으로 정리되는 *문서*에 데이터를 저장합니다. 그리고 각 *문서*에는 키-값 쌍이 들어 있습니다. 
출처: [Cloud Firestore 데이터 모델](https://firebase.google.com/docs/firestore/data-model?authuser=1)

Cloud Firestore은 컬렉션(collection)과 도큐먼트(document)로 구성된 트리구조로 이뤄져 있습니다. **컬렉션**은 도큐먼트를 저장하는 공간이고, **도큐먼트**는 딕셔너리 형태로 자료를 저장하는 공간입니다. SQL 테이블로 비교하자면 **도큐먼트**는 테이블의 한 행, 즉 데이터이고 데이터별로 그룹화해서 **컬렉션**에 저장하는 구조입니다.

![document firebase](https://3.bp.blogspot.com/-j9G1FSNk8gw/XQqlQGI_I3I/AAAAAAAADoI/ldmeyycIbmMbcH7-rUHX60rfNIMkDdc7gCLcBGAs/s1600/1.png)

> <small>이미지 출처: [Understanding Collection Group Queries in Cloud Firestore](https://firebase.googleblog.com/2019/06/understanding-collection-group-queries.html)</small>

아래는 Firestore 대시보드 예시입니다. 위에 설명했듯이 컬렉션을 누르면 해당 컬렉션에 속한 도큐먼트가 보이며, 가장 우측에서 도큐먼트 구조를 볼 수 있습니다.

![firestore dashboard](https://user-images.githubusercontent.com/72732446/150793749-aa12b15f-ba63-4589-beb4-11ea976c21a4.png)

컬렉션과 도큐먼트는 아래와 같은 규칙을 따릅니다.

1. 컬렉션은 도큐먼트만 가질 수 있다.
  
2. 도큐먼트는 최대 1MB까지만 저장 가능하다.
  
3. 도큐먼트는 다른 컬렉션을 가리킬 수 있지만, 다른 도큐먼트를 가리킬 수 없다.
  
4. Firestore의 루트는 오직 컬렉션만 가질 수 있다.
  
<hr />

## Firestore 설정

공식문서 참고: [Cloud Firestore 시작하기](https://firebase.google.com/docs/firestore/quickstart?authuser=0)

Firebase 설정이 되어있다는 가정하에 진행하겠습니다.

1. 파이어베이스 프로젝트에서 왼쪽 메뉴바 'Firestore Database'를 눌러주세요. '데이터베이스 만들기'를 눌러주세요.
  

![firestore start](https://user-images.githubusercontent.com/72732446/150793987-0c6d9e47-4e8e-403a-8c6f-6fe57c154fff.png)

2. 프로덕션 모드에서 시작, asia-northeast3를 눌러서 사용설정을 완료해주세요.
  

![firebase setting](https://user-images.githubusercontent.com/72732446/150794082-ef0b3c5b-5c53-4f0e-a975-8141b620a2c2.png)

![firestore setting](https://user-images.githubusercontent.com/72732446/150794407-7cb0b178-4e27-4958-b03c-88763f4dc410.png)

3. Firestore 데이터베이스가 생성되었다면 규칙을 수정해주세요. 저는 임시로 테스트 할때는 read, write를 모두 할 수 있도록 설정해두었습니다.
  

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

> 실서버에서는 **본인이 참여한 데이터만 열람/수정 가능하게 제한**을 두는것이 권장됩니다.

4. (예시) 데이터 > 컬렉션 시작을 눌러 컬렉션 ID를 생성할 수 있습니다. 예시이므로 따라하지 않아도 됩니다. (*추후 react app 에서 채팅방 아이디로 컬렉션을 생성해, 채팅방에 해당 컬렉션의 도큐멘트(=채팅)들을 뿌려줄것입니다.)
  

![start collection](https://user-images.githubusercontent.com/72732446/150794515-98f79868-b59f-49f9-b4d7-13bda7df94ec.png)

![collection example](https://user-images.githubusercontent.com/72732446/150794749-b179155f-025f-44d1-82d2-619b56cda521.png)

> 참고로, 위 사진처럼 Firestore는 NoSQL 데이터베이스 특성에 따라  스키마를 정의하지 않고, 유동적으로 필드를 추가 / 제거할 수 있습니다.

5. (예시) 도큐먼트가 아래와 같이 생성됩니다.
  

![document example](https://user-images.githubusercontent.com/72732446/150794879-c5b90ea1-d0d6-4a4d-84fb-26a9ed3e0229.png)

<hr />

## React app에 Firestore 적용


React app에 Firestore를 적용해 실시간 채팅 앱을 구현해보도록 하겠습니다. 코드는 아래 깃헙을 참고했습니다.

- Github 주소: [GitHub - AlterClassIO/react-firechat: Realtime Chat App built with React, Firebase, and Tailwind CSS. Deployed on Netlify 🚀 🔥](https://github.com/AlterClassIO/react-firechat)

크게 세 가지 컴포넌트를 사용했습니다:
1) firestore의 도큐먼트를 가져오는 `useFirestoreQuery`함수
2) 채팅 데이터를 가져오고 생성하는 `Channel` 컴포넌
3) 그리고 가져온 채팅 내용을 보여주는 `Message` 컴포넌트.

#### 0. @lib 파일에 컬렉션에서 도큐먼트를 가져오는 쿼리 함수를 정의합니다.

하단 코드는 [해당 깃헙](https://github.com/AlterClassIO/react-firechat) 코드를 참고했습니다.

```typescript
export function useFirestoreQuery(query) {
  const [docs, setDocs] = useState([]);

  // Store current query in ref
  const queryRef = useRef(query);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!queryRef?.current?.isEqual(query)) {
      queryRef.current = query;
    }
  });

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setDocs(data);
    });

    // Detach listener
    return unsubscribe;
  }, [queryRef]);

  return docs;
}
```

#### 1. 컴포넌트 components/channel.js 파일을 생성해 firebase & firestore 를 세팅합니다.

```javascript
// firebase 8 이하로 다운그레이드 해서 import 하거나, firebase 9 이상은 compatability 옵션 사용
import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "@lib/firebase";
import { useFirestoreQuery } from "@frontend"


const Channel = ({ id = null }) => {
  // firebase initialize
  firebase.initializeApp(firebaseConfig);
  // get firestore from my firebase app
  const db = firebase.firestore();
  
  // firestore 에서 해당 채널 id의 컬렉션 가져옴. 없으면 새로 생성됨. (여기서 채널은 채팅방을 의미)
  const messagesRef = db.collection(`messages-${id}`);
  // 0. 에서 작성한 useFirestoreQuery 로 도큐먼트 가져옴
  const messages = useFirestoreQuery(
    messagesRef.orderBy("createdAt", "desc").limit(1000)
  );


  // 채팅 메세지 생성시 useState로 새로운 메세지 저장
  const [newMessage, setNewMessage] = useState("");

  // input 필드 포커싱과 하단 스크롤을 위한 useRef
  const inputRef = useRef();
  const bottomListRef = useRef();

  // 채팅 작성했을 때 onChanghandler, onSubmitHandler
  const handleOnChange = (e) => {
    // 추후에 내용 작성
  };

  const handleOnSubmit = async (e) => {
    // 추후에 내용 작성
  }    

}
```

#### 2. 채팅 레이아웃을 생성합니다.

```jsx
return(
    <div className="flex flex-col h-full">
        <div className="overflow-auto h-full">
          <div className="py-4 max-w-screen-lg mx-auto">
            <ul>
              {messages
                ?.sort((first, second) =>
                  first?.createdAt?.seconds <= second?.createdAt?.seconds
                    ? -1
                    : 1
                )
                ?.map((message) => (
                  <li key={message.id}>
                    {/* 추후 Message 컴포넌트 생성해서 채팅 내용 표시 */}
                    <Message {...message} />
                  </li>
                ))}
            </ul>
            <div ref={bottomListRef} className="mb-16" />
          </div>
        </div>
      </div>
  
      {/* 채팅 입력 폼 생성 */}
       <div className="w-full z-20 pb-safe bottom-0 fixed md:max-w-xl p-4 bg-gray-50">
        <form onSubmit={handleOnSubmit} className="flex">
           <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              placeholder="메세지를 입력하세요"
              className="border rounded-full px-4 h-10 flex-1 mr-1 ml-1"
           />
          <button
            type="submit"
            disabled={!(newMessage)}
            className="rounded-full bg-red-400 h-10 w-10"
          >
            <BiSend className="text-white text-xl w-10" />
          </button>
        </form>
      </div>
    )
```

#### 3. 채팅 입력 폼 함수를 작성해줍니다.

```javascript
const Channel = ({ id = null }) => {
  ...
  // 포커싱과 하단 스크롤을 위한 useRef
  const inputRef = useRef();
  const bottomListRef = useRef();

  // 채팅 작성했을 때 onChanghandler, onSubmitHandler
  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };
    

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // 입력한 채팅 공백 제거
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: currentUser?.id,
        displayName: currentUser?.name,
        photoURL: currentUser?.image,
        isRead: false,
      });

      // Clear input field
      setNewMessage("");
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
  } 

  // 그 외, useRef 활용한 모션들
  useEffect(() => {
    if (inputRef.current) {
      // 인풋 포커싱
       inputRef.current.focus();
    }
  }, [inputRef]);  

  // 첫 화면 하단 스크롤
  useEffect(() => {
    if (bottomListRef.current) {
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // messagesRef 업데이트가 될 때 마다 읽음/안읽음 표시 업데이트를 할 수도 있습니다.
    
  }, [messagesRef]);

}
```

#### 4. Message 컴포넌트 작성

```javascript
import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import { imageUrl, useCurrentUser, timeFormat } from "@lib/frontend";
import Image from "next/image";

const Message = ({
  createdAt = null,
  uid = "",
  text = "",
  displayName = "",
  photoURL = "",
  isRead = false,
}) => {
  const { currentUser } = useCurrentUser();
  // 채팅 내용 없으면 보여주지 않음
  if (!(text)) return null;

  return (
    <>
      <div
        className={`flex items-start flex-wrap p-4 ${
          uid === currentUser?.id && "flex-row-reverse"
        }`}
      >
        {currentUser?.id !== uid && (
          <>
            {/*  상대방 프로필 사진 */}
            <div className={`w-10 ${uid === currentUser.id ? "" : "mr-2"}`}>
              {" "}
              <img
                src={photoURL ? imageUrl(photoURL) : "/gray.png"}
                alt="Avatar"
                className="rounded-full mr-4 h-10 w-10"
                width={45}
                height={45}
              />
            </div>
          </>
        )}
        {/* 채팅 내용. 사용자 별로 색깔 구분 */}
        <div
          className={`p-2 rounded-lg  ${
            uid === currentUser.id ? "bg-red-400 text-white " : "bg-gray-100"
          }`}
        >
         {text}
        </div>
        <div className="text-gray-400 text-xs mx-2 flex flex-col">
          {createdAt?.seconds ? (
            <span
              className={`text-gray-500 text-xs ${
                uid === currentUser?.id && "flex-row-reverse"
              }`}
            >
            {/* 읽음 & 안읽음 표시, 시간 표 */}
              {isRead === false && uid === currentUser.id && (
                <div className="text-right text-xs text-red-400">1</div>
              )}
              {timeFormat(new Date(createdAt.seconds * 1000))}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
```

#### 5. 마지막으로, Chat/[id].js 페이지에 완성된 Channel 컴포넌트를 적용시켜주었습니다.


```javascript
import Channel from "@components/channel";

const ChatPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useCurrentUser();

  return <>{currentUser && <Channel id={id} />}</>;
};

export default ChatPage;
```

비슷한 방법으로 ChatList 컴포넌트를 만들어 채팅 목록 기능을 구현할 수 있습니다. 또한, 심화 기능으로 메세지 생성시 이미지 업로드 기능을 추가하거나, 읽음/안 읽음 표시를 구현할 수도 있습니다.

<br />

#### 완성본 예시입니다.
![Hnet-image](https://user-images.githubusercontent.com/72732446/150797834-eca14c18-1a96-4f92-8a6b-eff018050531.gif)

<hr />

## 출처:

> - [Cloud Firestore #1 NoSQL 데이터베이스란 무엇인가?](https://flutter-chobo.tistory.com/1)
> - [Build a REALTIME CHAT APP in 5 MIN with React and Firebase - YouTube](https://www.youtube.com/watch?v=2-LISBTczQE)
> - [GitHub - AlterClassIO/react-firechat: Realtime Chat App built with React, Firebase, and Tailwind CSS. Deployed on Netlify 🚀 🔥](https://github.com/AlterClassIO/react-firechat)
> - [Understanding Collection Group Queries in Cloud Firestore](https://firebase.googleblog.com/2019/06/understanding-collection-group-queries.html)