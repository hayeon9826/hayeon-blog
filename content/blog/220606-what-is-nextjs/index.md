---
title: Next.js 란?
date: "2022-06-06T22:45:32.169Z"
description: SSR를 가능하게 해주는 프레임워크!
category: "React"
---

<img src="https://velog.velcdn.com/images/khy226/post/814c11ee-0626-4947-90a2-3be78a1bb92d/image.jpeg" style="width: 50%; padding-bottom: 50px;">




기존 React앱을 next.js로 변경하는 작업을 하였고, 해당 작업을 하며 공부한 내용을 정리하는 글입니다.

## Next.js 프로젝트 구조
-------------------

> - 기존 ‘src’ 폴더를 없애고, pages 폴더 안에 index.tsx, \_app.tsx, \_document.tsx 추가함
- Next.js에서 페이지 관련 자바스크립트 파일들은 전부 pages 폴더에 보관하면 되며, pages 폴더에 보관한 파일들은 파일명 그대로 route가 된다. (ex. /posts/index.tsx: “/posts”)

![project 구조](https://velog.velcdn.com/images/khy226/post/dd2e71ec-b7ba-48d0-ae55-cbc6db2842e8/image.png)

_app.tsx 코드 예시

```tsx
import React from 'react';
import { RootStoreType } from '../interface';
import { RootProvider } from '../store/rootContext';
import { RootStore } from '../store/rootStore';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../style.css';

const store: RootStoreType = new RootStore();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <RootProvider value={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RootProvider>
    </>
  );
};

export default MyApp;
```

_document.tsx 예시

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Next.js CRUD" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

```

index.tsx 예시

```tsx
import React from 'react';
import List from '../components/List';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => (
  <>
    <List />
  </>
);
export default Home;
```

*   `public 폴더`: 이미지 같은 asset 파일 보관
    
*   `pages 폴더`: 페이지 관련 js 파일 보관 (자동 라우팅)
    
*   `pages/_app.tsx`: 서버 요청시 가장 먼저 실행되는 파일. 모든 페이지에 적용할 공통적인 레이아웃 역할. (global style 적용하는 곳)
    
*   `pages/_document.tsx`: \_app.tsx 파일 다음에 실행되는 파일. 기존 리액트앱의 index.html 역할을 대신하는 js 파일. 모든 페이지에 공통적으로 사용되는 `<head>`나 `<body>` 내용 커스텀. `<head>`안에 공통으로 들어가는 `<meta>` 태그를 지정해서 SEO를 설정해줄 수 있다.
    
*   `pages/index.tsx`: 기본 경로("/") 해당하는 페이지. 첫 화면을 담당하는 페이지임.
    

### 화면 미리보기

<table>
  <thead>
    <tr>
      <th style="text-align: center">후기 작성 폼</th>
      <th style="text-align: center">후기 상세 페이지</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> <img src="https://user-images.githubusercontent.com/38210233/169699139-8b9a770e-f3e1-455e-9bf0-2b7d799babf8.png"  alt="finda pc show" ></td>
       <td><img src="https://user-images.githubusercontent.com/38210233/169699171-27bd831f-7dd8-4599-bd46-f7180b790d8d.png" alt="finda pc edit"></td>
    </tr> 
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th style="text-align: center">후기 수정</th>
      <th style="text-align: center">후기 삭제</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> <img src="https://user-images.githubusercontent.com/38210233/169699195-ce3e3a2d-c24a-4b12-a29a-68f3bdd9e42f.png"  alt="finda pc update" ></td>
       <td><img src="https://user-images.githubusercontent.com/38210233/169699256-d82373f2-0ee2-4565-99bf-0defc33a8ba4.png" alt="finda pc remove"></td>
    </tr> 
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th style="text-align: center">to-do 리스트</th>
      <th style="text-align: center">카운터 페이지</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> <img src="https://user-images.githubusercontent.com/38210233/169699288-514a3be2-4904-4b68-98fb-844aed3521a3.png"  alt="finda todo list" ></td>
       <td><img src="https://user-images.githubusercontent.com/38210233/169699308-e4db8444-159f-47a1-a484-b010ff713e72.png" alt="finda counter"></td>
    </tr> 
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th style="text-align: center">FAQ 페이지</th>
      <th style="text-align: center">404 페이지</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> <img src="https://user-images.githubusercontent.com/38210233/171079427-cb95122f-1c7d-4c1d-89a2-70bf31931d9b.png"  alt="finda faq list" ></td>
       <td><img src="https://user-images.githubusercontent.com/38210233/171079464-ecc67591-312b-4f20-a423-8ce84506f454.png" alt="finda 404"></td>
    </tr> 
  </tbody>
</table>

* * *

## Next.js 란?

### Next.js 개념

React는 **라이브러리**이고, Next.js는 리액트의 **프레임워크**이다.

*   참고: [https://nextjs.org/](https://nextjs.org/)
*   Next.js는 React 라이브러리의 **프레임워크**
    

> 라이브러리는 “어플리케이션을 만들 때 필요한 자원(기능: 함수)의 모임”이고, 프레임워크는 “**코드를 작성하는 기본적인 틀을 제공해서 보다 효율적으로 어플리케이션을 만들 수 있도록 하는 소프트웨어 환경**”이다. 즉, React에서 우리가 모든 것을 직접 생성하고 설정해 주었던 것들이 Next에서는 이미 만들어져 있다.

*   특히, SEO를 위한 **SSR를 가능하게 해주는 프레임워크**이다.
    
    *   SEO: SEO란, Search Engine Optimization의 약자로, SEO는 구글, 네이버와 같은 검색 엔진들이 서버에 등록된 웹사이트를 하나하나씩 돌아 다니면서 웹사이트의 HTML 문서를 분석해주는 것. (사이트를 검색 엔진 결과에 잘 노출 시킬 수 있도록 함) 
    *   **SSR**: ssr이란 **서버사이드 렌더링의 약자로 서버로부터 완전하게 만들어진 html파일을 받아와 페이지 전체를 렌더링 하는 방식**이다.
        

### SSR이란?

리액트는 대표적인 CSR(client side rendering)입니다. 이러한 리액트의 CSR적인 부분에서 SSR 적으로 바꿔 주기 위해서 next.js와 같은 라이브러리를 사용합니다.

*   SSR은 Server Side Rendering, 즉 서버에서 미리 페이지를 만들어 (pre-render) 채워진 HTML을 다운받는다.
*   따라서, SSR를 사용하면 사이트에 접속할 때 **미리 렌더링 된 html**을 불러오게 된다. 필요한 JS 파일을 불러올 때까지(=hydrate) 반응은 하지 않지만, 빠르게 화면을 보일 수 있기에 속도가 빨라 보이게 된다.
    *   **Hydrate**: Server Side 단에서 렌더링 된 정적 페이지와 번들링된 JS파일을 클라이언트에게 보낸 뒤, 클라이언트 단에서 HTML 코드와 React인 JS코드를 서로 매칭 시키는 과정.
    *   HTML 페이지를 서버 단에서 빠르게 Pre-Rendering하고 유저에게 빠른 웹 페이지로 응답할 수 있다는 것이 큰 장점이다. 특히, 이 Pre-Rendering 한 문서는 모든 자바스크립트 요소들이 빠진 굉장히 가벼운 상태 이므로 클라이언트에게 빠른 로딩이 가능하다.
    *  ![hydration img](https://velog.velcdn.com/images/khy226/post/ea69eb35-f5fb-4aa6-abe0-f6964de5902e/image.png)
    * <small>* 사진 출처: [Keeping Server-Side Rendering Cool With React Hydration](https://aboutmonica.com/blog/server-side-rendering-react-hydration-best-practices/) </small>
*   또한, 검색 엔진 봇에 렌더링 된 html을 제공하여 SEO에 좋다.
*   하지만 SSR은 페이지 이동 시 새로운 페이지를 요청하기 때문에 페이지 이동시 깜빡임이 존재하고, 템플릿을 중복해서 로딩하며 이는 서버에 부담을 주기 때문에 성능상 좋지 않다는 단점을 가지고 있다.
    

**Next.js**는 SPA와 SSR의 단점을 해결하기 위해서 리액트에 서버사이드렌더링 기능을 더하여 SPA와 SSR의 장점을 가질 수 있게 된다.

*   리액트에 SSR 기능을 추가하려면 웹 서버를 만들어 주어야 하고, 웹팩 설정, 데이터 로딩, 코드 스플리팅 등 복잡한 과정을 필요로 한다.
    
*   Next.js를 통해 이러한 것들을 설정하지 않고 사용할 수 있게 된다.
    
*   이러한 개발 환경을 설정하는 번거로움을 줄일 수 있는 것이 Next.js의 특징 중 하나이다.
    

### SSR 렌더링 단계

![ssr process](https://velog.velcdn.com/images/khy226/post/031abd39-0ce5-40bb-9a91-5e0b9860911c/image.png)
<small>* 이미지 출처: [Performance differences in Next.js vs. Create React App - LogRocket Blog](https://blog.logrocket.com/next-js-vs-create-react-app/) </small>

1.  SSR을 기반으로 서버에 사전에 저장된 렌더트리(render tree)의 HTML을 로드
    
2.  1) 방식의 `사전 렌더링(pre-render)` 이후에는 CSR 사용
    
3.  페이지가 그려진 이후에 페이지 내부에서 동적인 데이터를 패치`(axios, fetch, XMLHttpRequest)`하는 과정은 `CSR` 방식을 따른다.
    
4.  만약 페이지가 로드될 때 함께 데이터가 패칭되어야 하는 상황이라면 (pre-render)
    
5.  next.js의 데이터 패칭 방식 (① getInitialProps/ ② getStaticProps / ③ getStaticPath / ④ getServerSideProps) 을 이용해 첫 렌더링 시에 HTML 파일 뿐만 아니라 데이터가 패칭될 수 있도록 처리해야 한다.
    

⭐️ ServerSide Cycle 구체적으로 보기

> #### ⭐️ ServerSide Cycle
1.  Next Server가 GET 요청을 받는다.  
2.  요청에 맞는 Page를 찾는다.
3.  \_app.tsx의 getInitialProps가 있다면 실행한다.
4.  Page Component의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
5.  document.tsx의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
6.  모든 props들을 구성하고, \_app.js > page Component 순서로 rendering.
7.  모든 Content를 구성하고 \_document.js를 실행하여 html 형태로 출력한다.
    

이 흐름을 보았을 때, **모든 페이지에 공통적인 데이터 패칭이 필요하다면 \_app.tsx에서 미리 데이터 패칭**을 해주면 되고, **페이지마다 다른 데이터가 필요하다면 페이지마다 데이터 패칭**을 해주면 된다.

### CSR vs. SSR

### Next.js를 사용해야 하는 이유 (수많은 장점!)

#### **1) 사전 렌더링 및 서버사이드 렌더링**

*   서버 사이드 렌더링 기능을 제공하여 클라이언트 사이드 렌더링 환경보다 빠른 렌더링을 불러올 수 있.
    

**2) Hot Code Reloading을 지원**

*   Next 개발 환경에서는 코드 변경 사항이 저장되면 응용 프로그램을 자동으로 다시 로드한다.
    

#### 3) 자동 코드 분할

*   자동 코드 분할 기능 덕분에 코드의 모든 가져오기각 번들로 묶여 각 페이지와 함께 제공된다.
    
*   결과적으로, 불필요한 코드가 페이지에 로드 되지 않는다.
    

#### 4) 추가 설정이 필요 없음

*   Next.js는 기본적으로 웹팩과 바벨을 사용하고 있다. 따라서 이미 서버 사이드 렌더링 및 개발에 필요한 설정이 되어 있으므로 빠르게 개발을 시작할 수 있다.
    
*   사용하고 싶은 플러그인이 있다면 손쉽게 추가하여 사용할 수 있도록 지원을 하고 있다.
    

#### 5) 타입스크립트가 내장됨

*   **Next**를 **타입스크립트**와 함께 사용할 때 **타입** 지원을 통해 편리함과 안정성을 얻을 수 있다.
    
*   **Next**는 **타입스크립트** 설정을 따로 할 필요 없이 사용할 수 있으며 **타입스크립트**를 지원하고 있다.
    

#### 6) 파일기반 내비게이션 기능

*   리액트에서는 라우트를 위해서 `react-dom-router` 라이브러리를 사용하여 라우팅 설정을 해주어야 한다. 그로 인해 페이지의 경로에 대하여 직접 설정을 해줘야 한다.
    
*   하지만 Next.js **파일 시스템 기반** 라우팅을 사용한다.
    
*   폴더의 경로에 따라 페이지의 경로가 설정되어 구축이 빠르고 관리가 편리하다는 장점이 있다.
    
*   (참고로, next.js는 next/link의 `<Link />` 컴포넌트를 사용해서 클라이언트 사이드 네이게이션을 사용해야함)
    

### Next.js 구조

*   Next.js는 구조가 엄격한편은 아님
    
*   assets는 public 폴더에 넣고, 기본 페이지들은 pages에 넣으면 된다. pages 폴더 내의 파일은 자동으로 라우팅이 됨
    
*   가장 먼저 나올 페이지는 `pages/index.tsx`에 설정해주면 되고, head (메타 태그) 및 body 설정은 `pages/_document.tsx`에, 공통 레이아웃은 `pages/_app.tsx`에 설정해주면 된다.
    

다만, pages 폴더 내에는 반드시 ‘페이지’와 관련된 코드만 넣어야 한다. (ex. 컴포넌트 불가)

#### Next.js 폴더 구조 예시

```
/public
    favicon.ico
/src
    /components
        /elements
            /auth
                AuthForm.tsx
                AuthForm.test.ts
            /[Name]
                [Name].tsx
                [Name].test.ts
    /hooks
    /types
    /utils
    /test
        /api
            authAPI.test.js
            [name]API.test.js
        /pages
            index.test.js

    /pages
        /api
          /authAPI
              authAPI.js
          /[name]API
              [name]API.js
        _app.tsx
        _document.tsx
        index.tsx
```

### Next.js 사전 렌더링

*   **Pre-rendering(사전 렌더링)**: 각 페이지들을 사전에 미리 HTML 문서로 생성해서 가지고 있는 것. Next의 pre-rendering 시스템에서는 빌드 타임 때 해당하는 페이지 별로 각각의 HTML 문서를 미리 생성해 가지고 있다가, 서버로 요청이 들어올 때 알맞은 페이지를 반환 해준다.


<table>
  <thead>
    <tr>
      <th style="text-align: center">React (사전 렌더링 X)</th>
      <th style="text-align: center">Next.js (사전 렌더링 O)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> <img src="https://velog.velcdn.com/images/khy226/post/9e91ae28-5b48-4db7-96f4-be11353fe624/image.png"  alt="no pre render" ></td>
       <td><img src="https://velog.velcdn.com/images/khy226/post/21b9216b-7ba0-420d-bacb-a2c324a453ec/image.png" alt="pre render"></td>
    </tr> 
  </tbody>
</table>

### SSG vs. SSR 란?

Next.js 공식 도큐에서는 퍼포먼스 이유등으로 **SSG** 사용을 추천함

*   Next.js는 **SSG(Static Generation), SSR(Server-side Rendering)** 두 가지의 사전 렌더링 방식을 제공한다. 하이브리드 형태로 두 가지 사전 렌더링 방식을 모두 적용할 수 있으나, 공식 도큐에서는 SSG 사용을 추천한다.
    
    *   **Static-Generation** (추천) : HTML을 **빌드 타임**에 각 페이지별로 생성하고 해당 페이지로 요청이 올 경우 이미 생성된 HTML 문서를 반환한다.
        
    *   **Server-Side-Rendering** : 요청이 올 때 마다 해당하는 HTML 문서를 그때 그때 생성하여 반환한다.


<table>
  <thead>
    <tr>
      <th style="text-align: center">SSG 작동 방식</th>
      <th style="text-align: center">SSR 작동 방식</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> <img src="https://velog.velcdn.com/images/khy226/post/7819f1e0-30a4-47b3-bd41-bcfc99c7b127/image.png"  alt="ssg" ></td>
       <td><img src="https://velog.velcdn.com/images/khy226/post/13d8a023-53b5-4496-9142-5c039b615304/image.png" alt="ssr"></td>
    </tr> 
  </tbody>
</table>

#### SSG vs. SSR 비교

<table data-layout="default" data-local-id="7a1aa4c5-28e8-4392-90db-572683772f0b" class="confluenceTable"><colgroup><col style="width: 126.0px;"><col style="width: 306.0px;"><col style="width: 327.0px;"></colgroup><tbody><tr><th class="confluenceTh"><p style="text-align: center;"></p></th><th class="confluenceTh"><p style="text-align: center;"><strong>SSG (Static Generation)</strong></p></th><th class="confluenceTh"><p style="text-align: center;"><strong>SSR (Server Side Rendering)</strong></p></th></tr><tr><td class="confluenceTd"><p style="text-align: center;"><strong>작동 방식</strong></p></td><td class="confluenceTd"><p>HTML을 <strong>빌드 타임</strong>에 각 페이지별로 생성하고 해당 페이지로 요청이 올 경우 이미 생성된 HTML 문서를 반환</p></td><td class="confluenceTd"><p>요청이 올 때 마다 <strong>런타임에</strong> 해당하는 HTML 문서를 그때 그때 생성하여 반환</p></td></tr><tr><td class="confluenceTd"><p style="text-align: center;"><strong>장점</strong></p></td><td class="confluenceTd"><ul><li><p>페이지에 대한 유저들의 요청이 발생하게 되면, 요청에 따라 계속 서버에서 재생성 하는 것이 아니라 <strong>이미 생성이 완료된 페이지</strong>를 반환</p></li><li><p>따라서 생성이 완료된 HTML 문서를 재활용 하기에 <strong><span style="color: rgb(76,154,255);">응답 속도가 매우 빠르다</span></strong></p></li></ul></td><td class="confluenceTd"><ul><li><p>페이지 데이터가 항상 <strong><span style="color: rgb(76,154,255);">최신의 상태</span></strong><span style="color: rgb(76,154,255);">를 유지</span>할 수 있음</p></li><li><p>페이지가 동적 이기 때문에 사용자에게 더 <strong>인터렉티브</strong>한 반응을 할 수 있음</p></li></ul></td></tr><tr><td class="confluenceTd"><p style="text-align: center;"><strong>사례</strong></p></td><td class="confluenceTd"><ul><li><p>퍼포먼스에 집중 (CDN을 통해 더 빠른 응답 가능)</p></li><li><p>마케팅 페이지 / 블로그 게시물 / 제품의 목록 등과 같이 <strong>정적 생성하여 각 요청에 동일한 문서를 반환</strong>할 수 있는 경우</p></li></ul></td><td class="confluenceTd"><ul><li><p><strong>항상 최신 상태</strong>를 유지해야 하는 경우 (요청에 따라 응답해야 할 내용이 시시각각 변함)</p></li><li><p>제품의 상세 페이지 / 분석 차트 등 요청 마다 <strong>다른 내용 또는 형식의 HTML 문서가 반환</strong>되는 경우</p></li></ul></td></tr></tbody></table>

![](https://velog.velcdn.com/images/khy226/post/53715c5e-e401-4577-ab60-3e62332ed6ae/image.png)
<small>* 이미지 출처: [SSR vs SSG in Next.js – tutorial for CTOs and devs](https://tsh.io/blog/ssr-vs-ssg-in-nextjs/) </small>

### Next.js 사전 렌더링 함수

*   `getInitialProps` : Next 9.3 버전 이전엔 `getInitialProps`만으로 사전 렌더링 관련 문제를 전부 해결했지만, 9.3버전부터는 getInitialProps가 3가지로 분리됨
    
*   `getStaticProps`
    
*   `getStaticPath`
    
*   `getServerSideProps`
    

<table data-layout="default" data-local-id="8c2e2b97-9d4a-4224-9283-0e59eca62105" class="confluenceTable"><colgroup><col style="width: 226.67px;"><col style="width: 226.67px;"><col style="width: 226.67px;"></colgroup><tbody><tr><th class="confluenceTh"><p style="text-align: center;"><strong>getStaticProps</strong></p></th><th class="confluenceTh"><p style="text-align: center;"><strong>getStaticPath</strong></p></th><th class="confluenceTh"><p style="text-align: center;"><strong>getServerSideProps</strong></p></th></tr><tr><td class="confluenceTd"><ul><li><p>빌드시 고정되는 값으로 <strong>빌드 이후에는 수정이 불가능</strong>합니다</p></li><li><p>data를 빌드 시에 미리 땡겨와 정적으로(static 하게) 제공합니다</p></li><li><p>매 유저의 요청마다 fetch할 필요가 없는 데이터를 가진 페이지를 렌더링할 때 유리합니다</p></li><li><p>유저에 구애받지 않고 퍼블릭하게 캐시할 수 있는 데이터</p></li><li><p>SEO 등의 이슈로 인해 빠르게 미리 렌더링 해야만 하는 페이지</p></li></ul></td><td class="confluenceTd"><ul><li><p><strong>동적 라우팅 + getStaticProps</strong>를 원할 때 사용</p></li><li><p>정의하지 않은 하위 경로는 접근해도 화면이 뜨지 않는다 (error 페이지로 라우팅)</p></li><li><p>동적 라우팅 시, 라우팅되는 경우의 수를 하나하나 넣어야 함</p></li></ul></td><td class="confluenceTd"><ul><li><p>빌드와 상관없이, <strong>매 페이지 요청마다</strong> 데이터를 서버로부터 가져옴</p></li></ul></td></tr></tbody></table>

### Next.js 사전 렌더링 코드 예시

#### 1) getStaticProps

*   사전 렌더링에서 데이터를 미리 fetch 하고 싶을 때, `getStaticProps` async 함수를 export해서 사용할 수 있다.
    
    *   이 경우, 빌드 타임에 해당 데이터를 미리 사전 렌더링해서 props로 넘겨줄 수 있다.
        
*   `getStaticProps`는 런타임이 아닌, 빌드 타임 (`next build` ) 에서만 실행이 되므로, 변동이 거의 없는 데이터 대상으로만 적용하는게 좋다.
    
    *   단, 개발 모드에서는 (`next dev` ) `getStaticProps`가 항상 호출된다.
        

> You should use `getStaticProps` if:
- 페이지를 렌더링하는 데 필요한 데이터를 사용자의 요청 전, ‘빌드’할 때 사용할 수 있는 경우
- 데이터가 Headless CMS(콘텐츠를 생성/저장/관리하는 콘텐츠 관리 시스템만 제공하고 사용자들에게 콘텐츠가 보이는 부분은 API로 제공하는 시스템)에서 온 경우
- 페이지가 사전 렌더링 되고(SEO용) 매우 빨라야 하는 경우 - getStaticProps는 성능을 위해 CDN에서 캐시할 수 있는 HTML 및 JSON 파일을 생성함
- 데이터를 공개적으로 캐시할 수 있는지 여부. 단, 특정 상황에서 미들웨어를 사용하여 경로를 다시 작성하면 이 상태를 무시할 수 있음
    

#### getStaticProps 예시

```jsx
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

#### getStaticProps 적용 예시 (FAQ 목록)

```jsx
import { GetStaticProps } from 'next';

const FaqPage: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
    ...
}

export const getStaticProps: GetStaticProps = async () => {
  const response: AxiosResponse = await API.getFaqs();
  const faqs: Faq = response.data;

  // Pass faq data to the page via props
  return { props: { faqs } };
  // ...
};

export default FaqPage;

```

#### 2) getStaticPaths

*   특정 페이지의 경로(paths)가 외부 데이터에 의존할 때, `getStaticPaths`를 통해 사전 렌더링을 실행할 수 있다.
    
    *   예를 들어, 하나의 faq 데이터(id: 1)가 존재한다고 했을 때, `faqs/1` 라는 경로를 빌드 타임에 미리 사전 렌더링 할 수 있음
        

> You should use `getStaticPaths` if you’re statically pre-rendering pages that use dynamic routes and:
- 데이터가 데이터베이스에서 온 경우
- 데이터가 파일 시스템에서 온 경우
- 데이터를 공개적으로 캐시 할 수 있는 경우
- 페이지가 사전 렌더링 되고(SEO용) 매우 빨라야 하는 경우 - getStaticProps는 성능을 위해 CDN에서 캐시할 수 있는 HTML 및 JSON 파일을 생성함
    

*   마찬가지로, `getStaticPaths`는 런타임이 아닌, 빌드 타임 (`next build` ) 에서만 실행이 되므로, 변동이 거의 없는 데이터 대상으로만 적용하는게 좋다.
    
    *   단, 개발 모드에서는 (`next dev` ) `getStaticPaths`가 항상 호출된다.
        

#### getStaticPaths 예시

```jsx
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```

#### getStaticPaths 적용 예시 (Post 상세 페이지)

```jsx
import { GetStaticProps, GetStaticPaths } from 'next';

const PostShow: React.FC<{ post: Post }> = ({ post }) => {
    ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios({ url: `${BASE_URL}/post` });
  const data = await response.data;

  const paths = data.map(({ id }: Post) => ({
    params: { id: String(id) }
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response: AxiosResponse = await axios({
    url: `${BASE_URL}/post/${params.id}`
  });

  const post: Post = response.data;

  // Pass post data to the page via props
  return { props: { post } };
}

export default PostShow;
```

#### paths 예시

```jsx
// console.log(paths)
[
  { params: { id: '1' } },
  { params: { id: '2' } },
  { params: { id: '3' } },
  { params: { id: '10' } },
  { params: { id: '11' } }
]

// console.log(params)
{ id: '11' }
```

#### 3) getServerSideProps

*   `getServerSideProps`는 `getStaticProps` 와 비슷하지만 서버 사이드 렌더링을 위한 함수이다.
*   `getStaticProps` 처럼 컴포넌트에 props를 넘겨준다는 공통점이 있지만, 빌드 시가 아닌 **매 request마다 실행**된다는 차이점이 있다.
    *   예를 들어, 자주 업데이트 되는 posts 데이터들을 외부 API로부터 fetch 해서 사전 렌더링 하고 싶을 때 사용
    
> You should use `getServerSideProps` only if: 
- 매 요청 마다 데이터를 가져와서 페이지를 렌더링해야 하는 경우에만 getServerSideProps를 사용해야 한다. 데이터, 혹은 요청 속성(예: 인증 헤더 또는 geolocation) 때문인 경우도 있다. 
- getServerSideProps를 사용하는 페이지는 요청 시 서버 측에서 렌더링 되며 cache-control 헤더가 구성된 경우에만 캐싱 된다.
- 요청 중에 데이터를 렌더링할 필요가 없는 경우 클라이언트 측에서 데이터를 가져오거나 StaticProps를 통해 가져오는 것을 고려해야 한다.

#### getServerSideProps 예시

```jsx
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
```

#### getServerSideProps 적용 예시 (Post 리스트 페이지)

```js
import { GetServerSideProps } from 'next';

const List: React.FC<{ posts: Post[] }> = ({ posts }) => {
    ...
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response: AxiosResponse = await API.getPosts();
  const posts: Post = response.data;

  // Pass post data to the page via props
  return { props: { posts } };
};

export default List;
```
---

### (추가) Next.js로 SEO 관리하기

*   **SEO**: Search Engine Optimization의 약자로 웹에 올리는 컨텐츠가 구글, 네이버, 다음 같은 검색 엔진으로부터 제대로 인식이 될 수 있도록 최적화를 하는 작업
    
*   검색 엔진 최적화에는 여러가지 방법이 존재하나, 기본적으로 페이지에 **메타 태그**를 삽입해서 크롤러가 웹을 잘 분석하고 인덱싱 하는데 도움을 주는 방법이 있다.
    
    *   Next.js는 자체적으로 `Head` 컴포넌트를 제공하기 때문에 쉽게 메타태그를 삽입할 수 있음
        
    *   그 외에도, `next-seo` 등 라이브러리를 사용할 수도 있음
        

![](https://velog.velcdn.com/images/khy226/post/b108c68b-e282-40d5-ab4e-64c54e946630/image.png)


*   예시: pages/\_app.tsx 에 적용한 코드
    

#### layout/meta.tsx

```jsx
import Head from 'next/head';

const Meta = () => (
  <>
    <Head>
      <title>Next.js 게시판</title>
      <meta charSet="utf-8" />
      <meta name="description" content="온보딩 3단계 Next.js로 게시판 만들기" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="Next.js 게시판" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://finda.co.kr/" />
      <meta property="og:image" content="https://cdn.finda.co.kr/images/favicon/finda_192.png" />
      <meta property="og:article:author" content="김하연" />
      <link rel="icon" href="https://cdn.finda.co.kr/images/favicon/finda_192.png" />
    </Head>
  </>
);

export default Meta;
```

#### _app.tsx

```jsx
import Meta from '../layout/meta';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <RootProvider value={store}>
        <Layout>
          {/* SEO 적용 */}
          <Meta />
          <Component {...pageProps} />
        </Layout>
      </RootProvider>
    </>
  );
};

export default MyApp;
```

* * *

### 회고

*   SSR 이라는 개념을 다시 정리할 수 있어서 좋았음
    *   기존 React는 CSR로 작동하기 때문에 상세 페이지 리로딩이 되지 않았으나, Next.js를 적용하고 나서는 모든 페이지 리로드가 가능한 것이 바로 보이는 차이였던 것 같음
        
*   Next.js를 적용하는게 생각보다 어렵지 않아, 리액트에서 ssr, seo를 편리하게 할 수 있었음. Next.js는 편리한 개발 경험과 성능으로 개발자 및 서비스 사용자들에게 좋은 웹 경험을 제공한다고 생각함
    
*   특히, 따로 routing을 하지 않아도 폴더 기반으로 자동 라우팅이 되어서 매우 편리 하였고, typescript를 기본적으로 지원하는 것도 좋았음
    
*   다만 사전 렌더링으로 속도가 더 빨라졌다는게 잘 느껴지지 않았음. 더 자세히 분석을 해보면 좋을 것 같음.
---
### 출처
> - [Next.js 공식 도큐](https://nextjs.org/)
> - [NextJS 시작하기 - 2. React.js와 Next.js의 차이점 (framework vs. library, CSR vs. SSR)](https://gyyeom.tistory.com/56)
> - [SSR(서버사이드 렌더링)과 CSR(클라이언트 사이드 렌더링)](https://miracleground.tistory.com/165#:~:text=Multi%20page%20application%EC%9D%80%20ssr,%EC%84%9C%EB%B2%84%EC%97%90%20%EC%9A%94%EC%B2%AD%EC%9D%84%20%EB%B3%B4%EB%83%85%EB%8B%88%EB%8B%A4.)
> - [[Next.js] 기본 개념 : Next.js 란? Next.js를 왜 사용할까? Next.js의 장점은?](https://velog.io/@syoung125/Next.js-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-1-Next.js-%EB%9E%80-Next.js%EB%A5%BC-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C-Next.js%EC%9D%98-%EC%9E%A5%EC%A0%90%EC%9D%80)
> - [[github] Prepare frontend interview - React](https://github.com/junh0328/prepare_frontend_interview/blob/main/react.md)
> - [Next.js의 Hydrate란?](https://helloinyong.tistory.com/315)
> - [Keeping Server-Side Rendering Cool With React Hydration](https://aboutmonica.com/blog/server-side-rendering-react-hydration-best-practices/)
> - [Next.js Hydrate를 최적화 시킬 수 있을까 (Partial Hydration)](https://helloinyong.tistory.com/316)
> - [Next.js - 소개 및 특징](https://velog.io/@carrot/Next.js-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%ED%8A%B9%EC%A7%95)
> - [Performance differences in Next.js vs. Create React App](https://blog.logrocket.com/next-js-vs-create-react-app/)
> - [SSR vs SSG in Next.js – a practical overview for CTOs and devs](https://tsh.io/blog/ssr-vs-ssg-in-nextjs/)
> - [Next.js 100% 활용하기 (feat. getInitialProps, getStaticPath, getStaticProps, getServerSideProps, storybook)](https://velog.io/@devstone/Next.js-100-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-feat.-initialProps-webpack-storybook)
> - [CRA를 Next.js로 마이그레이션하기](https://iborymagic.tistory.com/102)
> - [[FE] SSR(Server-Side-Rendering) 그리고 SSG(Static-Site-Generation) (feat. NEXT를 중심으로)](https://velog.io/@longroadhome/FE-SSRServer-Side-Rendering-%EA%B7%B8%EB%A6%AC%EA%B3%A0-SSGStatic-Site-Generation-feat.-NEXT%EB%A5%BC-%EC%A4%91%EC%8B%AC%EC%9C%BC%EB%A1%9C)
> - [[NEXT.js] SEO 처리하기 (feat. Head, meta 태그)](https://mingeesuh.tistory.com/entry/NEXTjs-SEO-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0-feat-Head-meta-%ED%83%9C%EA%B7%B8)