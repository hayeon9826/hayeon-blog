---
title: '웹 디버깅 툴과 vConsole'
date: '2022-06-22T11:45:32.169Z'
description: 웹에서 디버깅 할 수 있는 툴(콘솔창)을 도입해보자
category: 'Development'
image: 'https://velog.velcdn.com/images/khy226/post/5b3d6032-641c-4d73-aed6-c851419df3b3/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/5b3d6032-641c-4d73-aed6-c851419df3b3/image.png" style="width: 80%; padding-bottom: 50px;"/>

## 웹 디버깅 툴? 왜 필요한가?

- 웹에서 개발을 할 때, 디버깅 할 수 있는 툴 (콘솔창) 도입의 필요성을 느낌
- PC의 개발자 도구처럼 모바일에서도 콘솔 로그를 확인하며 디버깅할 수 있는 도구가 필요
- 웹뷰 테스트 및 개발 진행을 더 편리하게 하기 위해서 도입
= production 제외한 나머지 환경 (dev, stage)에서만 보일 수 있도록 작업할 수 있는 무언가 필요

<br />
<br />

## vConsole

- 텐센트에서 만든 오픈소스 모바일 웹 콘솔
- github: [GitHub - Tencent/vConsole](https://github.com/Tencent/vConsole)
- yarn: https://yarnpkg.com/package/vconsole
- demo: [vConsole/Demo](http://wechatfe.github.io/vconsole/demo.html)

 <div style="display: flex; width: 40%; gap: 20%;">
    <img src="https://velog.velcdn.com/images/khy226/post/1e59e874-cea3-415c-afc3-ca74ccf62f6e/image.png">
    <img src="https://velog.velcdn.com/images/khy226/post/62a45207-a999-4685-84f0-5186e656da72/image.png">
 </div>

 <br />

 ### 기능
- Logs: `console.log|info|error|...`
- Network: `XMLHttpRequest`, `Fetch`, `sendBeacon`
- Element: HTML elements tree
- Storage: `Cookies`, `LocalStorage`, `SessionStorage`
- Execute JS command manually
- Custom plugins

### 튜토리얼
- [[vConsole] Tutorial](https://github.com/Tencent/vConsole/blob/dev/doc/tutorial.md)
- [[vConsole] Public Properties & Methods](https://github.com/Tencent/vConsole/blob/dev/doc/public_properties_methods.md)
- vConsole 관련 포스트: https://leonkong.cc/posts/vconsole.html  


### 장점
- 다양한 기능 및 플러그인 적용 가능
- 깔끔하고 편리한 UI
- 테마 세팅 가능 (light/dark)
- 쉽고 빠른 설치, 모바일 / 웹 반응형
- 주기적인 관리 (마지막 commit 2022/04/14, 최근 릴리즈 2022/04, 한달 다운로드 86.6k / 주간 다운로드 22,873)
- 매우 작은 용량 (344kb)

<br />

### 단점
- vconsole 버튼 워딩 및 스타일 변경이 안됨
- (아래에 설명할 eruda.js에 비해) 커스터마이징이 어려움 (콘솔창 크기, 투명도, 테마 등)
- 국내 사용이 많이 않아 관련 도큐 적음 (issue 대부분 글 중국어)

<br />

### 적용 방법
- 모든 페이지에 적용할 수 있도록 _app.tsx 페이지에 세팅 (component로 분리해서 사용)
- dev, stage 환경에서만 적용 가능하도록 설정
- indow 객체를 사용하기 때문에 lazyload 적용
- 아래는 코드 예시

```javascript
// _app.tsx
 
  componentDidMount() {
    ...

    // web console 세팅
    const initVConsole = async () => {
      if (window && process.env.ENV !== 'production') {
        const VConsole = (await import('vconsole')).default;
        const el = document.createElement('div');
        document.body.append(el);

        const config = {
          theme: 'dark',
          target: el,
        };

        const console = new VConsole(config);
        console.setSwitchPosition(20, 20);
      }
    }

    // vConsole 호출
    initVConsole();
    ...
  }
```

<br />

### 적용 화면 예시
- 웹 화면 예시
 <div style="display: flex; width: 40%; gap: 20%;">
    <img src="https://velog.velcdn.com/images/khy226/post/be417ac4-4802-496e-af3e-54f18e1cf4d1/image.png">
    <img src="https://velog.velcdn.com/images/khy226/post/0a4a1564-2b3b-4230-87ca-091195f04353/image.png">
 </div>

<br />
<br />

- 모바일 화면 예시
 <div style="display: flex; width: 40%; gap: 20%;">
    <img src="https://velog.velcdn.com/images/khy226/post/acffdc15-e55d-43fd-9bec-6c6e37454114/image.png">
    <img src="https://velog.velcdn.com/images/khy226/post/943c9c76-63d8-4592-8ef3-d35617ebb912/image.png">
 </div>

<br />

---

<br />
<br />

## eruda.js
- 모바일 브라우저를 위한 웹 콘솔
![img](https://velog.velcdn.com/images/khy226/post/5b3d6032-641c-4d73-aed6-c851419df3b3/image.png)
- github: [GitHub - liriliri/eruda](https://github.com/liriliri/eruda)
- yarn: https://yarnpkg.com/package/eruda 
- demo: [Eruda: Console for Mobile Browsers](https://eruda.liriliri.io/)

<br />

### 기능
- [Console](https://github.com/liriliri/eruda/blob/master/doc/TOOL_API.md#console): js 로그를 콘솔에서 보여줌
- [Elements](https://github.com/liriliri/eruda/blob/master/doc/TOOL_API.md#elements): DOM 엘리먼트 확인
- [Network](https://github.com/liriliri/eruda/blob/master/doc/TOOL_API.md#network): 요청 상태 보여줌
- [Resources](https://github.com/liriliri/eruda/blob/master/doc/TOOL_API.md#resources):  localStorage, cookie 정보 보여줌.
- [Info](https://github.com/liriliri/eruda/blob/master/doc/TOOL_API.md#info):  url, user agent 정보 보여줌.
- [Snippets](https://github.com/liriliri/eruda/blob/master/doc/TOOL_API.md#snippets): 자주 사용하는 snippets 추가
- [Sources](https://github.com/liriliri/eruda/blob/master/doc/TOOL_API.md#sources): Html, js, css 소스 뷰어

<br />

### 플러그인
- [eruda-fps](https://github.com/liriliri/eruda-fps): 페이지 fps(frame per second) 정보 보여줌
- [eruda-features](https://github.com/liriliri/eruda-features): 브라우저 feature detection 진행 (브라우저 지원 여부 체크)
- [eruda-timing](https://github.com/liriliri/eruda-timing): 퍼포먼스 & 리소스 timing 보여줌
- [eruda-memory](https://github.com/liriliri/eruda-memory): 페이지 메모리 정보 확인
- [eruda-code](https://github.com/liriliri/eruda-code): js 코드 실행
- [eruda-benchmark](https://github.com/liriliri/eruda-benchmark): js benchmark로 성능 측정
- [eruda-geolocation](https://github.com/liriliri/eruda-geolocation): geolocation 테스트
- [eruda-dom](https://github.com/liriliri/eruda-dom): DOM 트리 확인
- [eruda-orientation](https://github.com/liriliri/eruda-orientation): orientation 테스트
- [eruda-touches](https://github.com/liriliri/eruda-touches): 스크린 터치 보여줌

<br />

### 장점
- 다양한 기능 및 플러그인 적용 가능
- 깔끔하고 편리한 UI (드래그 가능한 플로팅 버튼으로 콘솔 창 열고 닫을 수 있음)
- 원하는 세팅 가능 (콘솔창 사이즈, 투명도, 테마 등)
- 쉽고 빠른 설치
- 모바일 / 웹 반응형
- 주기적인 관리 (마지막 commit 2022/05/20, 한달 간 다운로드 12.6k / 주간 다운로드 2,851)

<br />

### 단점
- 마지막 릴리즈 2년전
- 용량이 작지는 않음 (2.38mb)
- 대체 라이브러리로 vConsole이 있음
- 개인 레포지토리
- 관리가 잘 되고 있지 않다는 issue 글들..
- 국내 도큐 적음

<br />

### 적용 방법
- 모든 페이지에 적용할 수 있도록 _app.tsx 페이지에 세팅 (component로 분리해서 사용)
- dev, stage 환경에서만 적용 가능하도록 설정
- window 객체를 사용하기 때문에 lazyload 적용
- 아래는 코드 예시

```javascript
 // _app.tsx
 
  componentDidMount() {
    ...

    // web console 세팅
    const initEruda = async () => {
      const eruda = (await import('eruda')).default
      if (window && process.env.ENV !== 'production') {
        const el = document.createElement('div');
        document.body.appendChild(el);
        eruda.init({
          container: el,
          tool: ['console', 'elements', 'network', 'resources', 'info', 'snippets', 'sources'],
          useShadowDom: true,
          autoScale: true,
          defaults: {
            displaySize: 50,
            transparency: 1,
            theme: 'Atom One Dark',
          },
        });
      }
    }

    // eruda.js 실행
    initEruda();
    ...
  }
```

<br />

### 적용 화면 예시
- 웹 화면 예시
 <div style="display: flex; width: 40%; gap: 20%;">
    <img src="https://velog.velcdn.com/images/khy226/post/6e0f74e7-3cdd-476a-bfec-8fc734f9d494/image.png">
    <img src="https://velog.velcdn.com/images/khy226/post/1c3c7700-b84c-438a-a6c6-e4f390d75625/image.png">
 </div>

<br />
<br />

- 모바일 화면 예시
 <div style="display: flex; width: 40%; gap: 20%;">
    <img src="https://velog.velcdn.com/images/khy226/post/d73c486b-bdda-4bf8-bb7a-c044e748a71a/image.png">
    <img src="https://velog.velcdn.com/images/khy226/post/3c1ad962-58f0-43da-a39c-daadf993623f/image.png">
 </div>

<br />

---

## 그 외 웹 콘솔 라이브러리
- mobileConsole: [JavaScript console for mobile devices - hnldesign](https://www.hnldesign.nl/work/code/mobileconsole-javascript-console-for-mobile-devices/)
  - 업데이트 버전: [mobileConsole demo - hnldesign](https://code.hnldesign.nl/demo/hnl.MobileConsole.v2.html)
  - 단순 console.log 기능만 제공 /  설치 간단함 (head에 script 추가)

- [js-mobile-console](https://github.com/B1naryStudio/js-mobile-console)
  - ui가 별로임
  - 단순 console.log 기능만 제공 

- [Console.Re | Remote JavaScript Console](https://console.re/#API)
  - 원격 콘솔
  - 적용하기 비교적 복잡함

<br />

---

## 참고
> - [Github - [vConsole] Tutorial](https://github.com/Tencent/vConsole/blob/dev/doc/tutorial.md)
> - [GitHub - liriliri/eruda](https://github.com/liriliri/eruda)