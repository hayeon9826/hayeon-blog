---
title: 'React 19 RC, Next.js 15 RC 미리보기'
date: '2024-09-09T11:45:32.169Z'
description: '이번 년 초에 React 19와 Next.js 15의 RC 버전이 출시되었다. 정식 버전이 출시되기 전에 어떤 기능이 새로 추가되었는지 정리해보자.'
category: 'React'
keywords: 'React19, Nextjs15'
image: 'https://velog.velcdn.com/images/khy226/post/db60b39a-f918-4d57-8068-7c1c5aa2e329/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/db60b39a-f918-4d57-8068-7c1c5aa2e329/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

> **RC(Release Candidate) 버전:** 최종 버그 수정과 안정성 검증을 거쳐, 정식 출시를 목표로 하는 단계

이번 년 초에 React 19와 Next.js 15의 RC 버전이 출시되었다. 정식 버전이 출시되기 전에 어떤 기능이 새로 추가되었는지 정리해보자.

# React 19 RC 정리

React 19는 개발자 경험을 향상시키고, 일반적인 패턴을 간소화하며 성능을 개선하는 여러 새로운 기능과 개선 사항을 도입했다. 아래는 주요 변경 사항과 코드 예제를 포함한 요약이다.

1. **Actions**

   Actions는 데이터 변경 후 상태 업데이트를 처리하는 새로운 방법이다. 기존에는 비동기 요청의 대기 상태, 오류 처리, 낙관적 업데이트 등을 수동으로 관리해야 했지만, Actions는 이러한 작업을 자동으로 처리한다.

   예시: 기존 방식과 새로운 방식 비교

   ```jsx
   // 기존 방식: 비동기 요청의 대기 상태 수동 관리
   function UpdateName() {
     const [name, setName] = useState('')
     const [error, setError] = useState(null)
     const [isPending, setIsPending] = useState(false)

     const handleSubmit = async () => {
       setIsPending(true)
       const error = await updateName(name)
       setIsPending(false)
       if (error) {
         setError(error)
         return
       }
       redirect('/path')
     }

     return (
       <div>
         <input value={name} onChange={e => setName(e.target.value)} />
         <button onClick={handleSubmit} disabled={isPending}>
           Update
         </button>
         {error && <p>{error}</p>}
       </div>
     )
   }

   // React 19의 새로운 방식: useTransition 사용
   function UpdateName() {
     const [name, setName] = useState('')
     const [error, setError] = useState(null)
     const [isPending, startTransition] = useTransition()

     const handleSubmit = () => {
       // 변경된 내용!
       startTransition(async () => {
         const error = await updateName(name)
         if (error) {
           setError(error)
           return
         }
         redirect('/path')
       })
     }

     return (
       <div>
         <input value={name} onChange={e => setName(e.target.value)} />
         <button onClick={handleSubmit} disabled={isPending}>
           Update
         </button>
         {error && <p>{error}</p>}
       </div>
     )
   }
   ```

   위 예시에서 `useTransition`을 사용하여 대기 상태를 자동으로 관리한다. 이 방식은 현재 UI를 반응형으로 유지하면서 데이터 변경을 처리한다.

2. **`useActionState`**

   `useActionState`는 Actions에서 자주 사용하는 사례를 더 쉽게 만들기 위한 새로운 훅이다. 비동기 작업을 처리하면서 대기 상태와 오류를 간단하게 관리할 수 있다.

   ```jsx
   const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
     const error = await updateName(formData.get('name'))
     if (error) {
       return error
     }
     redirect('/path')
     return null
   }, null)

   function ChangeName() {
     return (
       <form action={submitAction}>
         <input type="text" name="name" />
         <button type="submit" disabled={isPending}>
           Update
         </button>
         {error && <p>{error}</p>}
       </form>
     )
   }
   ```

3. **`<form>` Actions와 `useFormStatus`**

   React 19에서는 `<form>`, `<input>`, `<button>` 요소의 `action`과 `formAction` 속성에 함수를 전달할 수 있다. 이는 폼을 자동으로 제출하고 상태를 관리하는 데 유용하다.

   ```jsx
   import { useFormStatus } from 'react-dom'

   function SubmitButton() {
     const { pending } = useFormStatus()
     return (
       <button type="submit" disabled={pending}>
         Submit
       </button>
     )
   }
   ```

4. **`useOptimistic`**

   낙관적 업데이트를 쉽게 관리할 수 있도록 하는 새로운 훅이다. 비동기 요청 중에도 최종 상태를 미리 보여주고, 요청이 완료되거나 오류가 발생하면 자동으로 상태를 업데이트한다.

   ```jsx
   function ChangeName({ currentName, onUpdateName }) {
     const [optimisticName, setOptimisticName] = useOptimistic(currentName)

     const submitAction = async formData => {
       const newName = formData.get('name')
       setOptimisticName(newName)
       const updatedName = await updateName(newName)
       onUpdateName(updatedName)
     }

     return (
       <form action={submitAction}>
         <p>Your name is: {optimisticName}</p>
         <input type="text" name="name" disabled={currentName !== optimisticName} />
       </form>
     )
   }
   ```

5. **새로운 API: `use`**

   React 19에서는 렌더링 중에 자원을 읽기 위한 새로운 API인 `use`를 도입했다. `use`를 사용하여 Promise를 읽고, 그 Promise가 해결될 때까지 컴포넌트를 일시 중지(Suspend)할 수 있다.

   ```jsx
   import { use } from 'react'

   function Comments({ commentsPromise }) {
     const comments = use(commentsPromise) // Promise가 해결될 때까지 일시 중지
     return comments.map(comment => <p key={comment.id}>{comment}</p>)
   }

   function Page({ commentsPromise }) {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <Comments commentsPromise={commentsPromise} />
       </Suspense>
     )
   }
   ```

6. **React Server Components와 Server Actions**

   - **Server Components**는 클라이언트 애플리케이션이나 SSR 서버와 별도의 환경에서 컴포넌트를 미리 렌더링할 수 있는 옵션이다.
   - **Server Actions**는 클라이언트 컴포넌트에서 서버에서 실행되는 비동기 함수를 호출할 수 있게 해준다.

7. **`ref`를 prop으로 사용**

   React 19에서는 `ref`를 함수형 컴포넌트의 prop으로 전달할 수 있게 되어 `forwardRef`가 필요하지 않다.

   ```jsx
   function MyInput({ placeholder, ref }) {
     return <input placeholder={placeholder} ref={ref} />
   }

   // 사용 예시
   ;<MyInput ref={inputRef} />
   ```

8. **문서 메타데이터 지원**

   React 19에서는 `<title>`, `<meta>`, `<link>` 같은 문서 메타데이터 태그를 컴포넌트에서 직접 렌더링하고, 이들을 자동으로 `<head>` 섹션으로 이동시킨다.

   ```jsx
   function BlogPost({ post }) {
     return (
       <article>
         <h1>{post.title}</h1>
         <title>{post.title}</title>
         <meta name="author" content="Josh" />
         <link rel="author" href="<https://twitter.com/joshcstory/>" />
         <meta name="keywords" content={post.keywords} />
         <p>Content goes here...</p>
       </article>
     )
   }
   ```

### React 19로 업그레이드하는 방법

업그레이드 가이드에서는 단계별 지침과 주요 변경 사항을 제공한다. 주의해야 할 브레이킹 체인지와 새로운 기능들을 확인하려면 업그레이드 가이드를 참조하면 된다.

이 요약을 통해 React 19의 새로운 기능과 개선 사항을 이해하고, 프로젝트에 적용할 수 있다. 더 자세한 내용은 공식 문서를 참고하면 된다.

---

# Next.js 15 RC 정리

Next.js 15 Release Candidate (RC)는 Next.js의 최신 기능들을 미리 체험해볼 수 있는 후보 버전이다. 이 RC 버전은 곧 출시될 안정적인 정식 버전 이전에 새로운 기능을 테스트하고 피드백을 제공할 기회를 제공한다. 아래는 Next.js 15 RC의 주요 기능과 변경 사항들을 정리한 내용이다.

### 주요 기능 및 변경 사항

1. **React 19 RC 지원**

   Next.js 15 RC는 React 19 RC를 지원한다. 이는 클라이언트와 서버 모두에서 사용할 수 있는 새로운 기능, 특히 Actions와 같은 API를 제공한다.

2. **React Compiler (실험적)**

   React Compiler는 Meta의 React 팀이 만든 새로운 실험적 컴파일러로, 코드에 대한 깊은 이해를 바탕으로 자동 최적화를 수행한다. 이는 개발자가 수동으로 `useMemo`나 `useCallback`과 같은 API를 사용하는 부담을 줄여준다.

   Next.js 15에서는 React Compiler 지원이 추가되었다. 이를 사용하려면 `babel-plugin-react-compiler`를 설치하고 `next.config.js`에 설정을 추가해야 한다.

   ```bash
   npm install babel-plugin-react-compiler
   ```

   ```javascript
   // next.config.ts
   const nextConfig = {
     experimental: {
       reactCompiler: true,
     },
   }
   module.exports = nextConfig
   ```

3. **Hydration 오류 개선**

   Hydration 오류 메시지가 개선되어, 오류 발생 시 소스 코드와 해결 방법에 대한 제안을 표시한다. 이는 개발자가 문제를 더 쉽게 이해하고 해결할 수 있도록 돕는다. (기존에는 단순히 hydration error 메세지만 떴었는데 이제는 구체적인 소스코드 단위로 오류를 알려준다)
   ![](https://velog.velcdn.com/images/khy226/post/8cbc2953-cbc7-4c8f-b795-4b6e05f3dda8/image.png)

4. **캐싱 업데이트**

   `fetch` 요청, `GET` Route Handlers, 클라이언트 내비게이션에 대한 기본 캐싱이 비활성화되었다. 기본 설정을 유지하려면 캐시 옵션을 명시적으로 설정해야 한다.

   예를 들어, `fetch` 요청의 경우 기본적으로 캐시되지 않으며, `force-cache` 옵션을 사용해 명시적으로 캐싱을 활성화할 수 있다.

   ```javascript
   fetch('https://...', { cache: 'force-cache' })
   ```

5. **부분 사전 렌더링 (실험적)**

   Next.js 15은 부분 사전 렌더링(Partial Prerendering, PPR)을 도입하여 정적 렌더링과 동적 렌더링을 동일한 페이지에서 사용할 수 있다. PPR을 위해 `experimental_ppr` 옵션을 추가하여 점진적으로 채택할 수 있다.

   ```jsx
   // app/page.jsx
   import { Suspense } from "react";
   import { StaticComponent, DynamicComponent } from "@/app/ui";

   export const experimental_ppr = true;

   export default function Page() {
     return (
       <>
         <StaticComponent />
         <Suspense fallback={...}>
           <DynamicComponent />
         </Suspense>
       </>
     );
   }
   ```

6. **`next/after` API (실험적)**

   `next/after`는 사용자의 요청에 대한 응답이 완료된 후 추가 작업을 수행할 수 있도록 도와주는 새로운 API이다. 이는 로그 기록, 분석, 외부 시스템 동기화와 같은 작업을 기본 응답을 방해하지 않고 수행할 수 있게 한다.

   ```javascript
   // next.config.ts
   const nextConfig = {
     experimental: {
       after: true,
     },
   }
   module.exports = nextConfig
   ```

   ```javascript
   // Server Component 예시
   import { unstable_after as after } from 'next/server'
   import { log } from '@/app/utils'

   export default function Layout({ children }) {
     after(() => {
       log() // 응답 이후 실행될 작업
     })
     return <>{children}</>
   }
   ```

7. **create-next-app 업데이트**

   `create-next-app`의 디자인이 업데이트되었으며, 새로운 프로젝트를 시작할 때 Turbopack을 사용 여부를 묻는 프롬프트가 추가되었다. `-turbo` 플래그를 사용해 Turbopack을 활성화할 수 있다.

   ```bash
   npx create-next-app@rc --turbo
   ```

   새 프로젝트를 간단하게 시작할 수 있는 `-empty` 플래그가 추가되어 최소한의 "hello world" 페이지만 남기는 옵션을 제공한다.

   ```bash
   npx create-next-app@rc --empty
   ```

8. **외부 패키지 번들링 최적화**

   외부 패키지를 번들링하여 앱의 초기 시작 성능을 향상시킬 수 있다. `App Router`에서는 외부 패키지가 기본적으로 번들링되며, `Pages Router`에서는 특정 패키지를 번들링할 수 있다.

   ```javascript
   // next.config.ts
   const nextConfig = {
     bundlePagesRouterDependencies: true,
     serverExternalPackages: ['package-name'], // 번들링에서 제외할 패키지 설정
   }
   module.exports = nextConfig
   ```

### 브레이킹 변경 사항

- 최소 React 버전은 이제 19 RC이다.
- `next/image`와 관련된 여러 변경 사항들: `squoosh` 대신 `sharp` 사용, 기본 `Content-Disposition`을 `attachment`로 변경, `src`에 공백이 포함된 경우 오류 발생.
- 기타 성능 및 설정 관련 개선사항들이 포함되어 있다.

### 요약

Next.js 15 RC는 React 19 RC와의 호환성, 새로운 실험적 기능들, 개선된 오류 메시지 및 캐싱 정책 등을 제공하여 개발자들이 최신 기술을 경험하고 테스트할 수 있게 한다. 안정적인 정식 버전 출시 전, Next.js 15 RC를 통해 새로운 기능을 미리 체험하고, 업그레이드 가이드와 릴리즈 노트를 참고하여 프로젝트에 적용할 수 있다.

### 정리를 하며

React 19와 Next.js 15 RC 버전에서 도입된 새로운 기능들은 개발자 경험을 크게 향상시키고, 코드의 간결성과 유지보수성을 높이는 데 중점을 둔 것 같다. 특히 Actions와 같은 기능들이 비동기 작업을 더 쉽게 관리하게 해주고, 성능 최적화에도 도움을 주는 부분이 인상적이다. Next.js 15의 새로운 캐싱 및 렌더링 기능은 복잡한 웹 애플리케이션에서도 빠르고 효율적인 동작을 가능하게 할 것으로 보인다. 전반적으로, 최신 기술들을 빠르게 체험하고 적용할 수 있어 개발자들에게 매우 유익할 것 같다.

---

## 참고

> - [React 19 RC - React 공식 도큐](https://react.dev/blog/2024/04/25/react-19)
> - [Next.js 15 RC - Next.js 공식 도큐](https://nextjs.org/blog/next-15-rc)
