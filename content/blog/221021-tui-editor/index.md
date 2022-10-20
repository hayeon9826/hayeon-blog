---
title: '[React] Toast UI Editor 적용기'
date: '2022-10-21T11:45:32.169Z'
description: 'Next.js 프로젝트에 Toast UI Editor 적용하기'
category: 'React'
keywords: '에디터, Tui-Editor'
image: 'https://velog.velcdn.com/images/khy226/post/1b0003a2-f089-4153-bc6e-995900655e31/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/1b0003a2-f089-4153-bc6e-995900655e31/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

## 들어가며

최근 토이 프로젝트를 작업하며 텍스트 에디터를 적용할 일이 생겼다. 사용성을 위해 에디터를 사용하면 바로 화면에 표시될 수 있는 WYSIWYG(위즈윅) 에디터를 적용하려고 관련 에디터를 찾아보았다.

<br />

> **위지위그(WYSIWYG: What You See Is What You Get, "보는 대로 얻는다")** 는 문서 편집 과정에서 화면에 포맷된 낱말, 문장이 출력물과 동일하게 나오는 방식을 말한다. 이는 편집 명령어를 입력하여 글꼴이나 문장 형태를 바꾸는 방식과 구별된다.
> 출처: [위키백과](https://ko.wikipedia.org/wiki/%EC%9C%84%EC%A7%80%EC%9C%84%EA%B7%B8)

<br />

TinyMCE, Summernote, React-Quill 등 [여러 에디터](https://blog.hubspot.com/website/best-wysiwyg-html-editor)들이 있었지만 레이아웃이 깔끔하고, 사용성이 좋으며, 한국어 지원이 되고, 지속적인 유지보수가 가능한 에디터를 우선순위로 잡고 찾아보았다. 그 중 NHN에서 만든 [Toast UI Editor](https://ui.toast.com/tui-editor)를 찾아서 적용하게 되었다

<br />

![](https://velog.velcdn.com/images/khy226/post/1b0003a2-f089-4153-bc6e-995900655e31/image.png)

_Toast UI Editor 예시 이미지 [출처: 공식 홈페이지](https://ui.toast.com/tui-editor)_

<br />

## Toast UI Editor란? 왜 사용했는가?

> The Editor allows you to edit your Markdown documents using text or WYSIWYG and comes with Syntax Highlighting, Scroll-Sync, Live Preview, and Chart features.

- 깔끔한 UI
- 여러가지 기능 제공 (라이브러리)
- 자세한 공식 문서
- React 지원 (@toast-ui/react-editor)
- 지속적인 유지보수 (NHN 제작)
- MIT 라이센스
- 마크다운 화면 스플리팅 기능
- 다크테마 적용 가능

<br />

Toast UI Editor는 NHN에서 지원하는 무료(MIT 라이센스) 위지윅 에디터이다. Toast Editor 이외에도 차트, 캘린더, 이미지 에디터, 컬러 팔레트, 코드 컬러 등 여러가지 플러그인이 지원이 되어서 매우 편리해보였다. 또한, 다크 테마도 지원이 되고 있다는 점이 유용했다.

<br />

![](https://velog.velcdn.com/images/khy226/post/ef4199be-f050-4bf7-bf27-fac8f844ffd8/image.png)

_Toast UI Editor 예시 이미지 (상단 - 다크테마 적용, 하단 - 차트 플러그인 적용) [출처: 공식 홈페이지](https://ui.toast.com/tui-editor)_

<br />

특히, React 전용으로 제공하는 `@toast-ui/react-editor` wrapper 라이브러리도 있어서 편리하게 적용할 수 있었다. 한국에서 만든 프로젝트여서 한국어 지원도 잘 되어있었고, 위 사진에서 볼 수 있듯이 마크다운과 위지위 편집 모드를 동시에 지원한다는 점이 큰 장점이었다.

NHN이라는 큰 기업에서 유지보수를 하고 있어 지속적으로 업데이트가 되고 있다는 점이 신뢰성 있었다. 오늘 기준으로 `@toast-ui/editor` 라이브러리는 21일 전에 업데이트가 되어있으며, `@toast-ui/react-editor` 역시 최신 React 17까지 지원이 되고 있었다.

유지보수와 함께 공식 문서도 매우 친절하게 작성되어 있어 보고 적용하는데 도움이 많이 되었다. 게다가, 여러가지 브라우저에서 (크롬, IE, 엣지, 사파리, 파이어폭스)모두 지원이 되었기 때문에 토이 프로젝트에 적용하는데 문제가 없어보였다.

<br />

![](https://velog.velcdn.com/images/khy226/post/9dc01543-e56b-4bf1-9353-423d6cbebc16/image.png)

_Toast UI Editor Browser Support 이미지 [출처: 공식 홈페이지](https://ui.toast.com/tui-editor)_

<br />

## 사용방법

### Editor 사용방법

### code-syntax-highlight 플러그인

### Viewer 사용방법

### 적용 예시

![](https://velog.velcdn.com/images/khy226/post/c158044c-88c3-46fd-9ff0-88e4b98a2aed/image.png)

_PC 화면_

<br />

<img src="https://velog.velcdn.com/images/khy226/post/319e0eb8-e907-489c-9af2-78e8218aee32/image.png" style="margin: 0 auto; width: 50%; padding-bottom: 50px;"/>

_모바일 화면_

<br />

## Toast UI Editor 단점

## 참고

> - [TOAST UI Editor 공식 문서](https://ui.toast.com/tui-editor)

- [[React] Next.js + Toast UI Editor 사용](https://juni-official.tistory.com/225)
- [React 18 (ES6)에서 Toast UI Editor plugins 사용하기 (codeSyntaxHighlight)](https://velog.io/@y0ungg/React-18-ES6%EC%97%90%EC%84%9C-Toast-UI-Editor-plugins-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-codeSyntaxHighlight)
- [[React] TOAST UI markdown Editor 사용하기](https://velog.io/@bluejoyq/react-toast-ui-editor)
- [위지위그 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9C%84%EC%A7%80%EC%9C%84%EA%B7%B8)
