---
title: Next.js 프로젝트에 React-Quill(텍스트 에디터) 적용하기
date: "2021-11-11T22:40:32.169Z"
description: React-Quill 은 리액트 텍스트 에디터로, Destkop/Mobile을 모두 지원하는 몇 안되는 Rich Text Editor 중 하나이다.
---

<img src="https://velog.velcdn.com/images/khy226/post/f1effb96-012f-402e-8f35-203adc0d8f61/next%20logo.png" style="width: 60%; padding-bottom: 50px;">



### 0. React-Quill?

 React-Quill 은 리액트 텍스트 에디터로, Destkop/Mobile을 모두 지원하는 몇 안되는 Rich Text Editor 중 하나이다. 줄바꿈, 글꼴, 글자색, 사진, 영상 등을 쉽게 적용할 수 있다.

자세한 설명은 공식도큐를 확인하면 좋다:

- https://github.com/zenoamaro/react-quill
- https://quilljs.com/

<hr>

### 1. React-Quill 설치

- 우선 패키지를 설치한다.

```terminal
yarn add react-quill
```



- 패키지 설치가 끝나면, 에디터를 사용하는 페이지에 quill style을 Import 한다.

```terminal
import 'react-quill/dist/quill.snow.css';
```



<hr>

### 2. Quill 동적으로 가져오기

Quill은 ssr 지원이 되지 않기 때문에 단순히  `import ReactQuill from react-quill` 처럼 static import을 하면 에러가 뜬다.

```terminal
document is not defined
```

> ### SSR?
>
> SSR(Server side rendering)은 화면에서 보여줄 **페이지의 View를 서버 단에서 렌더링을 한 후, 클라이언트에게 제공한다.** View를 미리 렌더링해서 사용자에게 웹 화면으로 보여주고, 이후에 웹 페이지를 동작하게 하거나 구성하는 리소스들을 로드한다. 완벽하게 기능이 모두 갖춰진 상태로 로드하는게 아니라, 최소한의 UI만 먼저 제공 하여 로딩 속도가 빠른 것 처럼 느끼게 해주기 위함이다.
>
> ### document is not defined 에러가 나는 이유
>
> document는 모든 view 및 기능이 로드된 시점에 정의가 되는데, document가 정의되기 전에 react-quill이 로드 되고, 정의되지 않은 document를 조작하려고 해서 에러가 발생하는 것이다.
>
> 즉,  `document 정의 -> react-quill 로드 -> react-quill 이 document 조작`의 순서가 되어야 하는데,
> `react-quill 로드 -> react-quill 이 document 조작 -> document 정의` 순서가 되니, 에러가 발생되는 것이다.



Next.js는 JavaScript 용 ES2020 [dynamic import()](https://github.com/tc39/proposal-dynamic-import) 을 지원하는데, 모듈을 동적으로 import할 수 있도록 한다. dynamic import을 하면 Quill Editor를 서버 측 모듈에 포함하지 않고, 런타임시에 모듈을 import할 수 있다.

```react
import dynamic from 'next/dynamic'
```

> ### Dynamic Import?
>
> 대부분의 코드들은 사용자가 보는 첫 페이지에는 필요하지 않다. 따라서, 첫 페이지 진입시에 필요한 최소한의 코드만 다운 받고, 사용자가 특정 페이지나 위치에 도달할 때마다 코드를 로드 한다면, 첫 페이지의 초기 성능을 올릴 수 있다.
>
> 이런 방식을 lazy-load 게으른 로딩이라고 한다. `Dynamic Import` 를 사용하면, 런타임시에 필요한 `module` 을 `import` 할 수 있다.
>
> 출처: [Dynamic Import 로 웹페이지 성능 올리기](https://pks2974.medium.com/dynamic-import-%EB%A1%9C%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%B1%EB%8A%A5-%EC%98%AC%EB%A6%AC%EA%B8%B0-caf62cc8c375)



`{ssr : false}`로 세팅하고, 로드되는 동안의 상태를 렌더링할 수 있든 loading 함수도 설정할 수 있다. 아래와 같이 작성하여 만든 quill 컴포넌트를 원하는 페이지에 임포트해서 사용하면 된다.

```terminal
const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
```

> *댓글에서 알려주셔서 수정했습니다. 기존에는 바로 `dynamic(import("react-quill")` 로 임포드 했었는데, build 에러가 떠서 `dynamic(() => import('react-quill')` 로 변경이 필요하다고 하십니다 :)



그리고 만든 QuillWrapper 컴포넌트를 페이지에서 사용할 때는 아래와 같이 기본 theme 값을 주고 사용하면 된다.

```react
export default function Home() {
  return <QuillWrapper  theme="snow" />
}
```



아래와 같이 기본 텍스트 에디터가 뜨면 성공이다.

![react-quill simple](https://user-images.githubusercontent.com/72732446/141233152-24014c87-d10c-4d43-bd47-2c75abe169be.png)



<hr>

### 3. Quill 커스터마이징

기본 feature 이외에도 이미지, 비디오와 같은 기능을 추가할 수 있다.

아래는 [Use Quill as a rich text editor in next.js](https://www.simplenextjs.com/posts/next-rich-editor-quill) 에서 사용한 예제이다:

```react
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export default function Home() {
  return <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
}
```



Quill 컴포넌트에 modules와 format를 적용하면 헤더, 폰트, 링크, 이미지, 비디오 등 기능이 추가된 것을 볼 수 있다.

![react-quill advanced](https://user-images.githubusercontent.com/72732446/141233784-1d30e28d-20cf-4c49-b324-5f6dd1adbe17.png)

- Formik 내에서도 textarea 대신 사용할 수 있다.

```react
 <QuillWrapper
      theme={'snow'}
       id={'description'}
   		 placeholder={'설명을 입력해주세요'}
       value={values.description}
       modules={modules}
       formats={formats}
       onChange={(event) => setFieldValue('description', event)}
  /> 
```





아래 링크에서 Quill 툴바 설정에 대해서 더 자세히 볼 수 있다:

https://quilljs.com/docs/modules/toolbar/

Quill 포맷 참고:

https://quilljs.com/docs/formats/



<hr>

### 참고

- [Dynamic Import 로 웹페이지 성능 올리기](https://pks2974.medium.com/dynamic-import-%EB%A1%9C%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%B1%EB%8A%A5-%EC%98%AC%EB%A6%AC%EA%B8%B0-caf62cc8c375)
- [next, react-quill 사용시 document is not defined,  Expected server HTML to contain a matching 에러 문제](https://m.blog.naver.com/choirj91/222044740530)
- [Nextjs에서 Quill Editor 적용하기](https://jaddong.tistory.com/entry/Nextjs%EC%97%90%EC%84%9C-Quill-Editor-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

- [Use Quill as a rich text editor in next.js](https://www.simplenextjs.com/posts/next-rich-editor-quill)

