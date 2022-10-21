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

---

## Toast UI Editor란? 왜 사용했는가?

> The Editor allows you to edit your Markdown documents using text or WYSIWYG and comes with Syntax Highlighting, Scroll-Sync, Live Preview, and Chart features.

<br />

Toast UI Editor 공식 문서에 따르면, 해당 에디터는 **"텍스트 또는 WYSIWYG를 사용하여 마크다운 문서를 편집할 수 있으며 구문 강조 표시, 스크롤 동기화, 실시간 미리 보기 및 차트 기능을 제공"** 한다.

<br />

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

특히, React 전용으로 제공하는 `@toast-ui/react-editor` wrapper 라이브러리도 있어서 편리하게 적용할 수 있었다. 한국에서 만든 프로젝트여서 한국어 지원도 잘 되어있었고, 위 사진에서 볼 수 있듯이 마크다운과 위지위 편집 모드를 동시에 지원한다는 점이 큰 장점이었다.

NHN이라는 큰 기업에서 유지보수를 하고 있어 지속적으로 업데이트가 되고 있다는 점이 신뢰성 있었다. 오늘 기준으로 `@toast-ui/editor` 라이브러리는 21일 전에 업데이트가 되어있으며, `@toast-ui/react-editor` 역시 최신 React 17까지 지원이 되고 있었다.

유지보수와 함께 공식 문서도 매우 친절하게 작성되어 있어 보고 적용하는데 도움이 많이 되었다. 게다가, 여러가지 브라우저에서 (크롬, IE, 엣지, 사파리, 파이어폭스)모두 지원이 되었기 때문에 토이 프로젝트에 적용하는데 문제가 없어보였다.

<br />

![](https://velog.velcdn.com/images/khy226/post/9dc01543-e56b-4bf1-9353-423d6cbebc16/image.png)

_Toast UI Editor Browser Support 이미지 [출처: 공식 홈페이지](https://ui.toast.com/tui-editor)_

<br />

---

## 사용방법

### 라이브러리 설치

```javascript
// yarn 설치
yarn add @toast-ui/editor @toast-ui/react-editor // 최신 버전

// npm 설치
npm i --save @toast-ui/editor @toast-ui/react-editor
```

더욱 자세한 설명은 [공식문서의 Install Guide](https://nhn.github.io/tui.editor/latest/#-install)를 참고하면 좋다.

<br />

### Editor 사용방법

Next.js 프로젝트에 Editor 라이브러리를 직접 import 해서 사용한다면, 아래와 같은 에러를 만날것이다.

> window is not defined, document is not defined...

<br />

에디터 라이브러리는 브라우저 객체 (window, document)를 참조하고 있기 때문에, 브라우저 객체가 있는 **클라이언트 사이드**에서만 작동을 한다.

반면, Next.js는 기본적으로 SSR(서버 사이드 렌더링)으로 동작하기 때문에, 기본적으로 각 페이지들을 빌드시 미리 렌더링을 한다(pre-render). 이때, 실행환경은 브라우저가 아니라 node 이기 때문에, `window is not defined, document is not defined`과 같은 client-side 에러가 난다.

<br />

따라서, 클라이언트 사이드에서만 작동해야하는 라이브러리 (예: 브라우저 에디터)는 디폴트로 적용되는 **SSR 옵션을 끄고 동적(dynamic)으로 import** 해야한다. 본인은 TuiEditor.tsx 이라는 에디터 컴포넌트를 만든 후, 해당 컴포넌트를 동적으로 import 하는 방식으로 적용을 했다.

<br />

- 에디터 컴포넌트 `@components/TuiEditor.tsx`

```javascript
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor } from '@toast-ui/react-editor'

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ]

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '} // 글 수정 시 사용
          initialEditType="markdown" // wysiwyg & markdown
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
          hideModeSwitch={true}
          height="calc(100% - 10rem)"
          theme={''} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      )}
    </>
  )
}

export default TuiEditor
```

<br />

그리고 해당 컴포넌트를 보여주고 싶은 화면에서 dynamic import를 해와서 ref를 설정해주었다.

- 포스트 작성 페이지 `@pages/posts/new`

```javascript
import { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const NoSsrEditor = dynamic(() => import('components/TuiEditor'), {
  ssr: false,
});

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const ref = useRef<any>(null);


  return (
    <>
      <Layout noFooter noNav className="h-screen w-full overflow-hidden">
        <form
          onSubmit={handleSubmit(async (data) => {
            ...
          })}
          className="h-screen w-full"
        >
   		  ...
          <NoSsrEditor content="" editorRef={ref} />
          ...
        </form>
      </Layout>
    </>
  );
};

export default Page;
```

<br />

---

### code-syntax-highlight 플러그인

기본 에디터에서는 코드 하이라이팅 기능이 들어가 있지 않아서 회색/검정색으로만 표시가 된다. code-syntax-highlight를 추가해서 코드를 조금 더 가독성 있게 만들 수 있다.

<br />

- 에디터 컴포넌트 코드 예시

```javascript
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs'; // prism 테마 추가

...

const TuiEditor = ({ content = '', editorRef }: Props) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '}
          initialEditType="markdown"
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
          hideModeSwitch={true}
          height="calc(100% - 10rem)"
          theme={''} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]} // 추가!
        />
      )}
    </>
  );
};

export default TuiEditor;

```

<br />

위 예시처럼 code-syntax-highlight 플러그인 설정을 완료하면 코드 블록 색상이 추가된다.

<br />

![](https://velog.velcdn.com/images/khy226/post/24cb6163-2c73-4a4e-948c-d20dfddecc2d/image.png)

_code-syntax-highlight 플러그인 코드 블록 예시_

<br />

---

### Viewer 사용방법

뷰어도 마찬가지로 tui-editor의 Viewer를 import 해서 사용하면 된다. 다만, 뷰어 역시 브라우저 객체를 참조하기 때문에, 클라이언트 사이드에서만 작동할 수 있도록 SSR 옵션을 취소해줘야 한다. 따라서, dynamic import를 위해 TuiViewer.tsx 컴포넌트를 따로 만들어 뷰어가 필요한 포스트 상세 페이지에 동적 import를 해주었다.

<br />

- 뷰어 컴포넌트 `@components/TuiViewer.tsx`

```javascript
import '@toast-ui/editor/dist/toastui-editor.css'
import { Viewer } from '@toast-ui/react-editor'
import 'prismjs/themes/prism.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import Prism from 'prismjs'

interface Props {
  content: string;
}

const TuiEditor = ({ content = '' }: Props) => {
  return (
    <>{content && <Viewer initialValue={content || ''} plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]} />}</>
  )
}

export default TuiEditor
```

<br />

해당 뷰어 컴포넌트를 포스트 상세 페이지에 동적으로 가져와 사용

- 포스트 상세페이지 `@pages/posts/[id]`

```javascript
import dynamic from 'next/dynamic';

const NoSsrViewer = dynamic(() => import('components/TuiViewer'), {
  ssr: false,
});


function PostPage() {
  ...
  return (
    <div className="mt-8">
      {post?.content && <NoSsrViewer content={post?.content} />}
	</div>
  )
}
```

<br />

---

### 적용 예시

최종적으로 적용된 코드는 아래와 같다. `calc(100% - 10rem)` 로 에디터가 뜨도록 하였고, 상단에는 제목 input을 하단에는 버튼(뒤로가기 및 작성하기)를 추가하였다.

<br />

- 에디터 컴포넌트 `@components/TuiEditor.tsx`

```javascript
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import { Editor } from '@toast-ui/react-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'prismjs/themes/prism.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import Prism from 'prismjs'

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ]

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '} // 글 수정 시 사용
          initialEditType="markdown" // wysiwyg & markdown
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
          hideModeSwitch={true}
          height="calc(100% - 10rem)"
          theme={''} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
    </>
  )
}

export default TuiEditor
```

<br />

- 포스트 작성 페이지 `@pages/posts/new`

```javascript
import { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { Layout } from 'components/index';
import dynamic from 'next/dynamic';

const NoSsrEditor = dynamic(() => import('components/TuiEditor'), {
  ssr: false,
});

type FormValues = {
  title: string;
};

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const ref = useRef<any>(null);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <Layout noFooter noNav className="h-screen w-full overflow-hidden">
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const editorIns = ref?.current?.getInstance();
              // 에디터 작성 내용 markdown으로 저장
              const contentMark = editorIns.getMarkdown();

              // contentMark 길이 체크
              if (contentMark?.length === 0) {
                throw new Error('내용을 입력해주세요.');
              }

              // add firestore
              await addDoc(collection(db, 'posts'), {
                title: data.title,
                content: contentMark,
                createdAt: new Date(),
              });

              toast.success('포스트를 작성했습니다.', {
                autoClose: 1000,
              });

              router.replace('/');
            } catch (e) {
              console.log(e);
              toast.error(`${e}` || '다시 시도해주세요.', {
                autoClose: 1000,
              });
            }
          })}
          className="h-screen w-full"
        >
          <div className="mx-2 my-4 p-2 md:mx-8 lg:mx-8">
            <div className="relative">
              <label htmlFor="name" className="text-sm leading-7 text-gray-600">
                제목{' '}
                <span className="ml-2 text-xs text-red-500">
                  {errors.title?.message}
                </span>
              </label>
              <input
                {...register('title', {
                  required: '필수 입력 사항입니다.',
                })}
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력해주세요"
                className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

		  // 에디터 컴포넌트 추가
          <NoSsrEditor content="" editorRef={ref} />
          // 뒤로가기 및 작성 버튼 추가
          <div className="fixed bottom-0 flex h-12 w-full lg:h-14">
            <button
              className="h-full w-[40%] bg-gray-500 text-sm font-medium text-white hover:bg-gray-700 md:text-base lg:text-base"
              onClick={handleGoBack}
            >
              뒤로가기
            </button>
            <button
              className="h-full w-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 md:text-base lg:text-base"
              type="submit"
            >
              작성하기
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Page;
```

<br />

완성된 에디터 화면은 아래와 같다:

![](https://velog.velcdn.com/images/khy226/post/c158044c-88c3-46fd-9ff0-88e4b98a2aed/image.png)

_PC 화면 - 에디터 작성 화면_

<br />
<br />

<img src="https://velog.velcdn.com/images/khy226/post/319e0eb8-e907-489c-9af2-78e8218aee32/image.png" style="width: 50%" />

_모바일 화면 - 에디터 작성 화면_

<br />

---

## Toast UI Editor 단점

개인적으로 Toast UI 외에도 TinyMCE, Summernote, React-Quill, 네 가지의 에디터들을 적용해 본 경험이 있는데, 이 중 Toast UI Editor은 꽤나 만족스러웠다. 위에서 적었듯이 깔끔한 UI와 공식문서, 지속적인 유지보수 등이 좋았다. 그리고 여러가지 플러그인이 있어서 다양한 기능을 추가할 수 있다는 점이 유용했다.

<br />

다만, 아쉬운점 몇 가지가 있는데:

- react-editor wrapper의 react 18 미지원
- SSR 미지원
- 글자 크기 상세 조정 미지원
- 이미지 사이즈 선택 불가

<br />

우선 `@toast-ui/react-editor`을 react 18 프로젝트에 적용하면 dependency 경고가 뜬다. 아직 React 18에 대응하는 버전이 없다는 답변을 받았는데 (2202.10.12 기준) 관련 내용은 추후 업데이트 되면 해소될 수 있을 것 같다. [링크](https://github.com/nhn/tui.editor/issues/2790). 또한, 아직 SSR 지원이 되지 않아 dynamic import로 세팅을 해야한다는 점이 약간 불편했다. (`@toast-ui/editor` 뿐만 아니라, 대부분 에디터 라이브러리들이 SSR을 지원하지 않고, 웹 에디터는 SSR에서 돌아갈 필요가 없긴하다.)

가장 최근에 올린 [Toast Ui Editor 3.0 출시 문서](https://ui.toast.com/posts/ko_20210617)이 작년 6월에 출시가 되었는데, 해당 문서에서 **플러그인 생태계 확장 / SSR 지원 / 동시 편짐 기능 지원** 등을 다음 업데이트 사항에 계획하고 있다고 한다. 조만간 업데이트들이 반영되면 더욱 향상된 기능을 사용할 수 있을 것 같다.

글자 크기 역시 상세 px로 조절을 할 수 없다는 것이 불편했다. 기본적으로 heading 1, 2, 3, 4, 5.. 등으로 조절할 수는 있으나 구체적인 px 단위로는 글자 크기를 바꿀 수 없다. 이분도 플러그인 확장을 하면서 해소될 수 있길 기대해본다.

마지막으로, [해당 글](https://juni-official.tistory.com/225)에 따르면, 이미지 사이즈 선택이 불가능하다고 한다. 이미지 속성을 변경하기 위해서는 사용자가 직접 마크다운을 건드려서 수정이 필요하다. 이부분도 다음 업데이트에서 관련 플러그인이 나오면 해소될 수 있을 것 같다.

<br />

---

## 참고

> - [TOAST UI Editor 공식 문서](https://ui.toast.com/tui-editor)

- [[React] Next.js + Toast UI Editor 사용](https://juni-official.tistory.com/225)
- [React 18 (ES6)에서 Toast UI Editor plugins 사용하기 (codeSyntaxHighlight)](https://velog.io/@y0ungg/React-18-ES6%EC%97%90%EC%84%9C-Toast-UI-Editor-plugins-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-codeSyntaxHighlight)
- [[React] TOAST UI markdown Editor 사용하기](https://velog.io/@bluejoyq/react-toast-ui-editor)
- [위지위그 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9C%84%EC%A7%80%EC%9C%84%EA%B7%B8)
- [ssr시 에디터 적용(dynamic import)](https://velog.io/@kip/ssr%EC%8B%9C-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%81%EC%9A%A9dynamic)
