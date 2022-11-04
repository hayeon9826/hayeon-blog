---
title: 'MSW(Mock Service Worker)로 더욱 생산적인 FE 개발하기'
date: '2022-11-04T11:45:32.169Z'
description: 'MSW(Mock Service Worker)는 Service Worker를 이용해 서버를 향한 실제 네트워크 요청을 가로채서(intercept) 모의 응답 (Mocked response)를 보내주는 API Mocking 라이브러리이다.'
category: 'Development'
keywords: 'MSW'
image: 'https://velog.velcdn.com/images/khy226/post/b1e15d45-146c-46c6-8a81-d12ff388398b/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/b1e15d45-146c-46c6-8a81-d12ff388398b/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

## FE 개발의 불편함

현업에서 프론트 개발을 하면서 겪게되는 불편함 중 하나가 백엔드 개발에 의존한다는 것이다. 백엔드 API가 나와야 프론트엔드에서 데이터를 가져오거나 처리할 수 있다. 따라서 기간 내 개발을 위해, 우선 화면 UI만 먼저 작업하고, 백엔드 API 완성까지 기다려야 하는 경우가 종종 있다. 예를 들어, 1차 프로젝트 개발기간이 총 3주인데 기획 / 백엔드 / 프론트엔드 작업기간이 각각 최소 10일 정도 필요하다고 할 때, 프론트엔드는 개발 도중에 API가 나올 때 까지 무한정 대기해야하는 상황이 올 수 있다.

<Br />

![](https://velog.velcdn.com/images/khy226/post/068d8324-4a90-4a2c-a072-9b96159b930c/image.png)

<Br />

> PO: 프론트엔드 개발 혹시 어디까지 진행되셨을까요?
>
> 프론트엔드: 아직 API가 안나와서 조금 더 기다려야할 것 같습니다..🥲

<Br />

만약 개발중에 추가 수정사항이 발생하더라도, API 및 백엔드 개발에 의존적인 부분이라면 위의 비효율적인 프로세스를 계속 반복해야한다. 촉박한 기간 내에 API 의존적인 개발을 하게 된다면, 프론트엔드는 기간 막바지까지 기능 개발을 해야하고 그만큼 테스트할 수 있는 시간은 줄어들게 된다.

이러한 대기 상황을 줄이고 백엔드 개발과 최대한 효율적으로 협업하기 위해 어떻게 하면 될까 고민하게 되었다. 그러던 중, 동료분께서 "백엔드 API가 나오기 전에 프론트엔드에서 msw 라는 툴을 사용해서 **Mocking API로 개발**하는게 어떻겠느냐"고 제안하여 적용하게 되었다.

<Br />

---

## 일반적인 Mocking 방식

일반적으로 아래와 같은 방법으로 Mocking을 진행할 수 있다.

- 어플리케이션 내부 로직에 직업 Mocking 하기
- 네이티브 모듈 (http, https, XMLHttpRequest) 바꿔치기
- Mocking 서버 만들기

<Br />

가장 간단한 방법은 화면에 필요한 데이터 상태별로 애플리케이션에 직접 Mocking 로직을 구현하는 것이다. 구현이 쉽다는 장점이 있디만, 서비스 로직을 수정해야하고 HTTP 메서드 및 응답 상태에 따른 대응이 쉽지 않다는 단점이 있다.

두번째 방법으로는 네이티브 모듈(http, https, XMLHttpRequest)을 바꿔치기해서 원하는 응답을 받을 수 있게 Mocking 하는 것이다. 하지만 이 경우에도 실제 환경과 차이가 발생하기 때문에 end-to-end 테스트에 좋지 않다는 단점이 있다.

마지막으로는 Mocking 서버를 직접 만드는 것이다. 이 방법은 실제 서비스 로직을 수정하지 않아도 된다는 장점이 있다. 하지만, 구현하는데 꽤나 많은 시간이 들고, 실제 서버와 비슷하지만 다른 방식으로 동작하기 때문에 기존 코드를 수정해야하는 일도 생길 수 있다.

<br />

위 세 가지 방식들의 문제점을 해결할 수 있는게 바로 **MSW(Mock Server Worker)** 를 사용한 Mocking이다. MSW를 사용하면 서비스 로직을 직접 수정할 필요도 없고, 네이티브 라이브러리를 바꿔치지 않아도 되며, 직접 모킹 서버를 구현할 필요도 없다. 또한, 어플리케이션 레벨이 아닌 네트워크 레벨에서 요청을 가로채 응답을 보내기 때문에 모든 종류의 네트워크 라이브러리 (axios, react-query 등) 및 네이티브 fetch 메서드와 함께 사용할 수 있다. 그렇다면 도대체 MSW는 어떤 라이브러리이고, 어떤 방식으로 작동하는지에 대해서 알아보자.

<Br />

---

## MSW(Mock Service Worker)란?

**[MSW(Mock Service Worker)](https://mswjs.io/docs/)** 는 Service Worker를 이용해 서버를 향한 실제 네트워크 요청을 가로채서(intercept) 모의 응답 (Mocked response)를 보내주는 API Mocking 라이브러리이다. MSW를 사용하면 직접 Mock 서버를 구현하지 않아도, 네트워크 수준에서 API를 Mocking 할 수 있다. Mocking 테스트를 위한 노드(node.js)환경, 개발 및 디버깅을 위한 브라우저 환경에서 모두 사용할 수 있다는 장점이 있다. 또한, 소스 코드 수정 없이 모킹이 필요한 환경에서만 MSW 인스턴스를 실행해 API Mocking을 적용할 수 있다.

MSW가 이런 기능을 제공할 수 있는 이유는 바로 **[Service Worker](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)** 를 이용해 HTTP 요청을 가로채기 때문이다.

<Br />

### Service Worker란?

MDN 도큐에서는 Service Worker를 아래와 같이 정의하고 있다:

> 서비스 워커는 웹 응용 프로그램, 브라우저, 그리고 (사용 가능한 경우) 네트워크 사이의 **프록시 서버 역할**을 합니다. 서비스 워커의 개발 의도는 여러가지가 있지만, 그 중에서도 효과적인 오프라인 경험을 생성하고, **네트워크 요청을 가로채서 네트워크 사용 가능 여부에 따라 적절한 행동을 취하고**, 서버의 자산을 업데이트할 수 있습니다. 또한 푸시 알림과 백그라운드 동기화 API로의 접근도 제공합니다. [출처: MDN - Service Worker API](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)

<Br />

Service Worker는 브라우저가 백그라운드에서 실행하는 스크립트로, 애플리케이션의 UI 블록 없이 연산을 처리할 수 있다. (웹 애플리케이션의 메인 스레드와 분리된 별도의 백그라운드 스레드에서 실행됨)

Service Worker는 웹 서비스와 브라우저 및 네트워크 사이에서 프록시 서버의 역할을 하며, 오프라인에서도 서비스를 사용할 수 있도록 한다. Service Worker의 수명 주기는 웹페이지와는 완전히 별개이기 때문에 아래와 같은 기능에서 많이 사용되고 있다.

> - 높은 비용의 계산을 처리할 때, 푸시 이벤트를 생성할 때
> - 백그라운드 데이터 동기화.
> - 다른 출처에서의 리소스 요청을 응답.
> - 위치정보, 자이로 센서 등 계산에 높은 비용이 들어가는 다수의 페이지에서 함께 사용할 수 있도록 데이터 업데이트를 중앙화
> - 개발 목적으로서 CoffeeScript, Less, CJS/AMD 모듈 등의 의존성 관리와 컴파일.
>   백그라운드 서비스 훅
> - 특정 URL 패턴에 기반한 사용자 지정 템플릿 제공
> - 성능 향상. 사진 앨범의 다음 사진 몇 장처럼, 사용자가 필요로 할 것으로 생각되는 리소스의 pre-fetching 등
>
> [출처: MDN - Service Worker API](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)

<Br />

단, Service Worker는 IE와 같은 일부 브라우저에서 지원이 되지 않으며, HTTPS 보안 프로토콜 환경이 필요하다. (localhost 환경 제외). 네트워크 중간에서 연결을 가로채고 조작하는 기능 때문에 반드시 HTTPS가 제공되어야 한다.

따라서, MSW는 Service Worker 덕분에 다른 라이브러리에 종속되지 않고 호환성 문제 없이 모의 API를 작동시킨다.

<Br />

---

## MSW 작동 방식

MSW가 브라우저에서 어떻게 동작하는지 알아보자. 우선, MSW 라이브러리를 설치하면 브라우저에 Service Worker을 등록한다. 이후, 브라우저에서 이루어지는 실제 네트워크 요청들을 (예를 들어 `fetch`이벤트로 보낸 네트워크 요청 등) Service Worker가 가로채게 된다. Service Worker는 가로챈 요청을 복사해서 실제 서버가 아닌 클라이언트 사이드에 있는 MSW 라이브러리로 보낸 후, 등록된 핸들러를 통해 모의 응답(Mocked response)을 제공 받는다. 마지막으로, 제공받은 모의 응답(Mocked response)을 브라우저에게 그대로 전달하게 된다.

이러한 과정을 통해, 실제 서버와 직접적인 연결 없이 보내는 요청에 대한 응답을 Mocking 할 수 있게된다. 따라서, 백엔드 API가 아직 준비되지 않아도 MSW로 가상 API를 등록하고 프론트에서 테스트할 수 있다.

<Br />

![](https://velog.velcdn.com/images/khy226/post/49ca8fe5-ce19-4c98-b4eb-14f70b53410b/image.png)

> <small>Mock Service Worker 다이어그램 (출처: https://mswjs.io/docs/#request-flow-diagram) </small>

<Br />

정리하자면 아래와 같다:

1. 브라우저가 Service Worker에 요청을 보냄
2. Service Worker가 해당 요청을 가로채서 복사함
3. 서버에 요청을 보내지 않고, MSW 라이브러리의 핸들러와 매칭시킴
4. MSW가 등록된 핸들러에서 모의 응답 (mocked response)를 Service Worker에게 전달함
5. 마지막으로, Service Worker가 모의 응답을 브라우저에게 전달함

<Br />

참고로, Service Worker는 브라우저 환경에서만 실행 가능하다. node 환경에서는 [node-request-interceptor](https://github.com/mswjs/interceptors) 라이브러리를 활용해 네이티브 (`http`, `https`, `XMLHttpRequest`) 모듈을 확장(extending)해서 리퀘스트를 처리를 해야한다.

<Br />

---

## MSW 적용 예시

그렇다면 모의 응답을 제공하는 msw 핸들러는 과연 어떻게 생겼을까. [공식 도큐](https://mswjs.io/docs/#how-does-it-work)의 예시를 통해서 먼저 알아보자.

Mock Service Worker를 사용하면 선언적 [요청 핸들러](https://mswjs.io/docs/basics/request-handler) (declarative request handler)를 사용하여 URL, RegExp 또는 사용자 지정 기준에 따라 요청을 가로챌 수 있게 하고, 모의 응답을 반환하는 응답 함수를 제공한다.

<Br />

다음은 POST 메서드의 `/login` 요청을 모킹하는 msw 파일 예시다.

```javascript
// src/mocks.js
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.post('/login', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('username')

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authenticated',
        }),
      )
    }

    return res(
      ctx.json({
        firstName: 'John',
      }),
    )
  }),
)

// Register the Service Worker and enable the mocking
worker.start()
```

<Br />

- HTTP POST 요청을 처리하기 위해 `rest.post` 함수를 사용해 요청을 보낸다.
- 핸들러 함수의 첫번째 파라미터에는 `'/login'` 라는 요청 경로를 넣었고, 두번째 파라미터에는 [response resolver](https://mswjs.io/docs/getting-started/mocks/rest-api#response-resolver)라는 콜백 함수를 넣었다.
- Response resolver에는 세 가지 인자를 받는다: req, res, ctx
  - `req`: 매칭되는 요청에 대한 정보
  - `res`: 모의 응답을 만들 수 있는 유틸리티
  - `ctx`: 모의 응답의 HTTP 상태 코드, 헤더, 바디 등을 만들 수 있는 함수들
- 위 `req`, `res`, `ctx`를 사용해서 원하는 조건에 따라 모의 응답을 작성한다.
  - 사용자가 검증되었는지 `isAuthenticated` 여부를 세션 스토리지의 username 값으로 판별한다
  - 만약 검증된 사용자라면 `firstName: 'John'` 이라는 값을 리턴한다
  - 만약 검증되지 않았다면, 403 응답과 함께 `errorMessage: 'Not authenticated'` 이라는 값을 리턴한다.
- 최종적으로, 작성한 worker를 `worker.start()`로 등록한다

<br />

브라우저별로 세팅 절차가 다르기 때문에 [공식 도큐 - Integrate](https://mswjs.io/docs/getting-started/integrate) 내용을 확인해서 세팅하면 된다. 해당 글에서는 '브라우저' 기준으로 msw를 적용할것이다.

<Br />

---

## MSW 직접 적용하기

### MSW 라이브러리 설치

msw를 설치하고자 하는 프로젝트에서 npm 혹은 yarn 커맨드로 `msw`라이브러리를 설치할 수 있다.

```
npm install msw --save-dev
# or
yarn add msw --dev
```

<br />

### 브라우저에 서비스 워커 등록

브라우저에서 사용하기 위해서는 MSW를 서비스 워커에 등록하는 과정이 필요한데, 아래의 명령어를 실행하면 서비스 워커 등록을 위한 파일이 `public` 폴더에 추가된다.

```
npx msw init public/ --save
```

`public/` 폴더는 주로 프로젝트의 정적 리소스를 담는 폴더이다. create-react-app, next.js에 기본적으로 세팅이 되어있다.

다른 프로젝트의 경우 public 디렉토리가 다를 수 있는데, [해당 링크](https://mswjs.io/docs/getting-started/integrate/browser#where-is-my-public-directory)에서 참고할 수 있다.

<br />

### Worker 설정

`src/mocks/browser.js` 파일을 생성해서 worker 설정을 해야한다

```
touch src/mocks/browser.js
```

생성한 `browser.js` 파일에서 worker 인스턴스를 생성하고, 요청 핸들러를 정의한다.

```javascript
// src/mocks/browser.js
import { setupWorker } from 'msw'
import { handlers } from './handlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
```

<br />

### Worker 실행

이제 어플리케이션 소스에 워커를 실행하는 코드를 추가하자.

```javascript
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(<App />, document.getElementById('root'))
```

<br />

### Worker 적용 확인

애플리케이션을 다시 시작하고, 브라우저 콘솔에서 아래와 같은 메세지가 뜨면 모킹이 활성화된 것이다.

```javascript
[MSW] Mocking enabled.
```

이제 개발 서버에서 앱을 실행하면, 실제 서버가 아닌 MSW에서 응답을 보낼 수 있게 된다.

<br />

### 요청 핸들러 작성

이제 세팅이 완료 되었으니, 서버 대신 msw에서 모의 응답을 줄 수 있도록 요청 핸들러를 작성해보자. HTTP 요청일 들어왔을 때, 내가 원하는 대로 임의의 응답을 해줄 수 있는 핸들러 코드이다.

코드는 되도록이면 `mocks` 폴더에 두는 것이 좋다. `src/mocks/handlers.js`에 요청 핸들러를 작성해보자.

```javascript
import { rest } from 'msw'

const posts = ['게시글1', '게시글2', '게시글3']

export const handlers = [
  // 포스트 목록
  rest.get('/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos))
  }),

  // 포스트 추가
  rest.post('/posts', (req, res, ctx) => {
    posts.push(req.body)
    return res(ctx.status(201))
  }),
]
```

REST API를 모킹하기 위해 MSW의 `rest`객체를 사용하였다. 포스트 목록을 조회하기 위한 `GET /posts`는 배열에 담긴 포스트를 응답해주고, 새로운 포스트 등록을 위한 `POST /posts`는 요청 바디로 넘어온 포스트를 배열에 추가한다.

<Br />

### Service Worker 요청 테스트

이제 `fetch()`함수로 `GET /posts` 요청을 보내보자. 실제 서버가 아닌, MSW에서 가짜 응답을 보내줄 것이다.

- 요청:

```javascript
fetch('/posts')
  .then(response => response.json())
  .then(data => console.log(data))
```

- 응답:

```javascript
[MSW] 18:04:24 GET /posts (200 OK)
["게시글1", "게시글2", "게시글3"]
```

<Br />

---

## MSW 다양한 사례

기본적인 내용 이외에도 다양한 케이스에서 [msw를 활용할 수 있는 방법](https://mswjs.io/docs/recipes)들이 있다. 이중, 유용하게 사용할 수 있는 네 가지 사례를 정리해보았다.

<Br />

### Cookies

보안상의 이유로`fetch`에서 Set-Cookie 및 Set-Cookie2 헤더를 설정할 수 없다.

그러나 Mock Service Worker는 클라이언트 측에서 실행되므로, 보안 위반 없이 응답으로부터 Mocked 쿠키를 수신하는 것과 유사한 기능을 제공할 수 있다. `document.cookie` 문자열에 지정된 쿠키를 직접 설정하는 `ctx.cookie()` 응답 변환기 함수(response transformer function)를 사용하면 된다.

**예시**

```javascript
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.post('/login', (req, res, ctx) => {
    return res(
      // Calling `ctx.cookie()` sets given cookies
      // on `document.cookie` directly.
      ctx.cookie('auth-token', 'abc-123'),
    )
  }),
)

worker.start()
```

<Br />

### Query parameters

인터셉트된 요청의 쿼리 매개 변수에 액세스하려면 `req.url` 인스턴스에서 `searchParams` 속성을 사용하면 된다. 이 속성의 값은 모든 쿼리 매개 변수를 포함하는 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 인스턴스이다.

예를 들어, MSW로 테스트를 할 때 요청 파라미터에 따라 다른 응답을 줘야하는 경우가 있는데, 이때 핸들러에서 `req` 객체를 통해 파라미터에 접근이 가능하다.

```javascript
import { setupWorker, rest } from 'msw'
const worker = setupWorker(
  rest.get('/products', (req, res, ctx) => {
    const productId = req.url.searchParams.get('id')
    return res(
      ctx.json({
        productId,
      }),
    )
  }),
)
worker.start()
```

**Request**

`GET fetch('/products?id=123')`

**Response**

`200 OK`

**Body**

```javascript
{
  // Where '123' is the value of `req.url.searchParams.get('id')`
  // parsed from the request URL.
  "productId": "123"
}
```

더 자세한 설명은 [링크](https://mswjs.io/docs/recipes/query-parameters)에서 확인할 수 있다.

<Br />

### Response patching

Response patching은 모의 응답(mocked response)이 실제 응답을 기반으로 데이터를 구성할 수 있게한다. 이 기법은 핸들러에서 실제 서버에 요청을 보낸 후 받은 데이터에 디버깅 등에 필요한 정보를 임의로 덧붙이는 방식으로 작동한다.

아래는 [Github API v3](https://docs.github.com/en/rest)에서 응답을 패칭하는 예시이다:

```javascript
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.get('https://api.github.com/users/:username', async (req, res, ctx) => {
    // Perform an original request to the intercepted request URL
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()

    return res(
      ctx.json({
        location: originalResponseData.location,
        firstName: 'Not the real first name',
      }),
    )
  }),
)

worker.start()
```

**Request**

`GET 'https://api.github.com/users/octocat'`

**Response**

`200 OK`

**Body**

```javascript
{
  // Resolved from the original response
  "location": "San Francisco",
  "firstName": "Not the real first name"
}
```

더 자세한 설명은 [링크](https://mswjs.io/docs/recipes/response-patching)에서 확인할 수 있다.

<Br />

### Mocking error responses

msw로 요청에 대한 에러 응답을 mocking 할 수도 있다. 오류 응답을 예외가 아닌 실제 응답으로 처리함으로써, 표준을 준수하고 클라이언트 코드가 유효한 오류 응답을 수신하고 처리하는지 확인할 수 있다.

아래는 로그인 `POST`요청에서 에러 응답을 mocking 하는 예제이다:

```javascript
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.post('/login', async (req, res, ctx) => {
    const { username } = await req.json()

    return res(
      // Send a valid HTTP status code
      ctx.status(403),
      // And a response body, if necessary
      ctx.json({
        errorMessage: `User '${username}' not found`,
      }),
    )
  }),
)

worker.start()
```

**Request**

`POST '/login'`

**Body**

```javascript
{
  "username": "admin"
}
```

**Response**

`403 Forbidden`

**Body**

```javascript
{
  "errorMessage": "User 'admin' not found"
}
```

더 자세한 설명은 [링크](https://mswjs.io/docs/recipes/mocking-error-responses)에서 확인할 수 있다.

<Br />

---

## 마무리하며

- 현업에서 MSW를 도입해 개발을 하면서 굉장이 편리하다고 느꼈다.
- 정해진 기간에 백엔드와 프론트엔드가 동시에 개발을 시작하는데, API가 준비되지 않은 상황에서도 프론트 개발을 빠르게진행할 수 있었고, 여유롭게 개발을 마쳐 테스트 시간을 더 많이 확보할 수 있었다.
- 특히, 직접 네트워크 응답 상태를 조절하면서 내가 원하는 화면 (성공 화면, 로딩 화면, 에러 화면)을 더 빠르고 효율적이게 개발할 수 있었다. req에 에러코드를 전달해서 디버깅을 하는데도 쉬웠다.
- 개발 도중에 피드백을 하거나, 리드분께 보고하는 상황에서도 API 없이 MSW 만으로 시연이 가능해서 매우 유용했다.
- 또한, MSW를 활용해서 쉽게 에러 상황을 재현하는게 가능해져서 특정 상황을 재현하고 디버깅 하는데도 유용하게 사용할 수 있었다.
- 단점이 있다면 처음에 service worker의 개념을 이해하는데 어려움이 있었다는 정도?

결론은 API 구현을 기다리지 않고 빠르게 프론트엔드 개발을 시작하고 싶다면 MSW 도입을 적극 추천한다.

<Br />

---

## 참고

> - [Mock Service Worker로 만드는 모의 서버](https://blog.rhostem.com/posts/2021-03-20-mock-service-worker)
> - [MSW로 백앤드 API 모킹하기](https://www.daleseo.com/mock-service-worker/)
> - [Mocking으로 생산성까지 챙기는 FE 개발](https://tech.kakao.com/2021/09/29/mocking-fe/)
> - [Mock Service Worker 공식 도큐](https://mswjs.io/docs/)
> - [[MDN] Service Worker API](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)
> - [ServiceWorker 이모저모 이야기](https://so-so.dev/web/service-worker/)
