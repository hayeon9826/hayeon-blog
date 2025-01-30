---
title: 'vanilla-extract 알아보기'
date: '2025-01-30T11:45:32.169Z'
description: 'vanilla-extract는 zero-runtime 특성을 가지고 있는 CSS-in-JS 라이브러리다. 즉, 스타일을 런타임에서 적용하는 것이 아니라 빌드 타임에서 처리하여 최적화된 CSS를 생성한다는 특징이 있다.'
category: 'React'
keywords: 'CSS in JS, Vanilla Extract, Styling'
image: 'https://velog.velcdn.com/images/khy226/post/8c2faefe-f834-4cf6-b07e-cfc668f1fc42/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/8c2faefe-f834-4cf6-b07e-cfc668f1fc42/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

## vanilla-extract란?

`vanilla-extract`는 **zero-runtime** 특성을 가지고 있는 CSS-in-JS 라이브러리다. 즉, 스타일을 런타임에서 적용하는 것이 아니라 **빌드 타임**에서 처리하여 최적화된 CSS를 생성한다는 특징이 있다.

이러한 방식 덕분에 다음과 같은 장점을 갖고 있다:

- **Zero-runtime**: 런타임에서 스타일을 생성하지 않기 때문에 성능 부담이 없음
- **TypeScript 지원**: 정적 타입 시스템을 활용하여 스타일을 안전하게 관리 가능
- **CSS 변수 활용**: `createVar` API를 통해 강력한 CSS 변수 지원
- **Bundler 통합 지원**: Vite, Webpack, Rollup, Parcel 등과 통합 가능

> 더욱 구체적인 설명은 [공식 도큐](https://vanilla-extract.style/documentation/getting-started/)에서 확인 가능하다.

## CSS-in-JS란?

CSS-in-JS는 **스타일을 JavaScript 코드 안에서 정의하고 사용**하는 패턴이다. 대표적인 예로 `styled-components`, `emotion`, `stitches` 등이 있다. 이를 사용하면 컴포넌트 단위로 스타일을 관리할 수 있고, 동적 스타일을 적용할 수 있는 장점이 있다.

그러나 대부분의 CSS-in-JS 라이브러리는 런타임에서 스타일을 처리하기 때문에 성능 문제를 유발한다는 문제점이 있다. 반면, `vanilla-extract`는 빌드 타임에서 스타일을 추출(zero-runtime)하여 이러한 문제를 해결한다.

## 다른 CSS-in-JS 라이브러리와 비교

| 라이브러리            | Zero-runtime | TypeScript 지원 | 성능 최적화 | CSS 변수 지원 |
| --------------------- | ------------ | --------------- | ----------- | ------------- |
| styled-components     | ❌           | ⭕              | ❌          | ❌            |
| emotion               | ❌           | ⭕              | ❌          | ❌            |
| stitches (유지보수 X) | ⭕           | ⭕              | ⭕          | ⭕            |
| vanilla-extract       | ⭕           | ⭕              | ⭕          | ⭕            |

## vanilla-extract 세팅 방법

### 설치

vanilla-extract를 사용하기 위해서는 npm이나 yarn을 사용해서 패키지를 설치하면 된다.

```sh
npm install @vanilla-extract/css
```

### Next.js에서 설정

참고로 Next.js에서는 `vanilla-extract`를 사용할 때 `@vanilla-extract/next-plugin`을 추가로 설치하고 `next.config.js`에 설정을 추가해야 한다.

```sh
npm install @vanilla-extract/next-plugin
```

`next.config.js`:

```js
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

const withVanillaExtract = createVanillaExtractPlugin()
module.exports = withVanillaExtract({
  reactStrictMode: true,
})
```

---

## vanilla-extract API 정리

vanilla-extract에는 수많은 API가 있는데, 그 중 자주 사용하는 API에 대해서 정리해보도록 하자.

### style

`style` 함수는 개별 요소의 스타일을 정의하는 가장 기본적인 API다. JavaScript 객체로 스타일을 선언하며, 빌드 시 자동으로 CSS 클래스가 생성되게 한다. 이를 통해 스타일 충돌 없이 안전하게 CSS를 관리할 수 있다.

```ts
import { style } from '@vanilla-extract/css'

export const container = style({
  padding: 10,
  display: 'flex',
})
```

### styleVariants

`styleVariants`는 하나의 스타일을 여러 변형으로 쉽게 확장할 수 있도록 도와주는 기능이다. 같은 요소에서 여러 스타일 옵션을 적용할 필요가 있을 때 유용하며, 버튼이나 카드 같은 UI 요소에서 자주 사용된다.

```ts
import { styleVariants } from '@vanilla-extract/css'

export const button = styleVariants({
  primary: { background: 'blue', color: 'white' },
  secondary: { background: 'gray', color: 'black' },
})
```

### createVar

CSS 변수를 정의하고 활용할 때 사용하는 API다. 이 변수는 `style` 또는 `globalStyle` 내에서 사용될 수 있으며, 테마 설정 시 매우 유용하다. 이를 통해 동적으로 색상이나 폰트 크기 등을 조정할 수 있다.

```ts
import { createVar, style } from '@vanilla-extract/css'

const myVar = createVar()

export const myStyle = style({
  vars: {
    [myVar]: 'purple',
  },
})
```

### layer

`layer`는 특정 스타일 계층을 정의하여 스타일 충돌을 방지하는 데 사용된다. 여러 스타일 그룹을 명확히 구분할 수 있어, 프로젝트에서 다양한 스타일 레이어를 조정할 때 유용하다.

```ts
import { style, layer } from '@vanilla-extract/css'

const typographyLayer = layer()

const text = style({
  '@layer': {
    [typographyLayer]: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
})
```

## vanilla-extract Global API 정리

이제 특정 CSS 스타일을 전역적으로 적용할 때 사용하는 vanilla-extract Global API에 대해서 알아보자.

### globalStyle

`globalStyle`은 특정 HTML 요소나 클래스를 전역적으로 스타일링하는 API다. 일반적인 CSS의 `body`, `html`, `a` 태그에 적용할 수 있으며, 모든 페이지에서 동일한 스타일을 유지하고 싶을 때 사용된다.

```ts
import { globalStyle } from '@vanilla-extract/css'

globalStyle('body', {
  margin: 0,
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f4f4',
})
```

### createGlobalTheme

테마를 정의하고 글로벌하게 적용할 때 사용된다. 프로젝트 전반에서 일관된 색상, 폰트 크기, 간격 등을 유지하고 싶을 때 유용하다. 이를 활용하면 다양한 테마를 쉽게 변경할 수 있다.

```ts
import { createGlobalTheme } from '@vanilla-extract/css'

export const theme = createGlobalTheme(':root', {
  color: {
    primary: 'blue',
    secondary: 'gray',
  },
  font: {
    body: 'Arial',
    heading: 'Roboto',
  },
})
```

---

## 자주 사용하는 vanilla extract 패키지

vanilla extract만 가지고 동적인 스타일을 생성하거나 복잡한 스타일링을 하는데 제약이 있을 수 있다. 이를 위해서 여러 패키지를 제공하는데, 크게 recipe, sprinkles, dynamic 등이 있다.

### **recipe (다중 변형 스타일링)**

`recipe`는 `vanilla-extract/recipes` 패키지에서 제공하는 API로, **다양한 변형(variants)** 을 지원하는 스타일을 생성하는 기능을 제공한다. 버튼, 카드, 알림과 같이 스타일이 여러 가지 상태나 크기, 색상을 가질 수 있는 컴포넌트에서 특히 유용하다.

#### **특징**

- 여러 스타일 변형(variants)을 정의하고 쉽게 관리 가능
- 기본 스타일(base), 개별 변형(variants), 조합된 변형(compoundVariants) 설정 가능
- TypeScript와 함께 사용하면 자동 완성 및 타입 체크 가능

#### **사용 예시**

```ts
import { recipe } from '@vanilla-extract/recipes'

export const button = recipe({
  base: {
    borderRadius: 6,
    padding: 12,
  },
  variants: {
    color: {
      neutral: { background: 'gray' },
      primary: { background: 'blue', color: 'white' },
      danger: { background: 'red', color: 'white' },
    },
    size: {
      small: { fontSize: '12px', padding: '8px' },
      medium: { fontSize: '16px', padding: '12px' },
      large: { fontSize: '20px', padding: '16px' },
    },
  },
  compoundVariants: [
    {
      variants: { color: 'primary', size: 'large' },
      style: { fontWeight: 'bold' },
    },
  ],
  defaultVariants: {
    color: 'neutral',
    size: 'medium',
  },
})
```

### **언제 사용해야 할까?**

- 버튼, 카드, 모달과 같이 **다양한 변형이 필요한 UI 요소**를 스타일링할 때
- 여러 개의 변형을 하나의 **객체**로 관리하고 싶을 때
- 특정 변형 조합을 위해 **추가 스타일을 적용할 필요가 있을 때** (예: `compoundVariants`)

---

### **sprinkles (유틸리티 스타일 적용)**

`sprinkles`는 `vanilla-extract/sprinkles` 패키지를 사용하여 **유틸리티 스타일을 정의하고 적용**할 수 있는 API다. Tailwind CSS처럼 특정 속성(예: `padding`, `margin`, `display`, `color` 등)을 모아 관리할 수 있다.

#### **사용 예시**

```ts
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'block', 'flex'],
    padding: ['0', '4px', '8px', '16px'],
    margin: ['0', '4px', '8px', '16px'],
    backgroundColor: ['white', 'gray', 'blue'],
  },
})

export const sprinkles = createSprinkles(responsiveProperties)
```

#### **사용법**

```ts
import { sprinkles } from './styles.css'

export const button = style([sprinkles({ padding: '16px', backgroundColor: 'blue' }), { borderRadius: '8px' }])
```

### **언제 사용해야 할까?**

- **반응형 스타일을 쉽게 적용**하고 싶을 때 (`tablet`, `desktop` 조건 활용)
- **클래스 이름을 최적화**하여 불필요한 스타일 중복을 줄이고 싶을 때
- 여러 CSS 속성을 조합하여 **재사용성 높은 스타일링**을 원할 때

---

### **dynamic (런타임 동적 스타일 적용)**

`dynamic`은 `@vanilla-extract/dynamic` 패키지에서 제공하는 API로, **CSS 변수를 런타임에서 변경할 수 있도록 지원**하는 기능이다. 보통 `vanilla-extract`는 **빌드 타임에 정적인 CSS를 생성**하지만, `dynamic`을 사용하면 **런타임에서도 동적으로 스타일을 조정**할 수 있다.

#### **특징**

- `assignInlineVars`를 사용하여 CSS 변수를 동적으로 설정 가능
- `setElementVars`를 이용해 특정 DOM 요소에 직접 변수 적용 가능
- 다크 모드, 사용자 지정 테마, 실시간 스타일 변경에 유용함

#### **사용 예시 (React 컴포넌트 내 동적 스타일 적용)**

```ts
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { style, createVar } from '@vanilla-extract/css'

const backgroundColorVar = createVar()

export const container = style({
  vars: {
    [backgroundColorVar]: 'white',
  },
})

export function ThemedComponent({ themeColor }: { themeColor: string }) {
  return (
    <div className={container} style={assignInlineVars({ [backgroundColorVar]: themeColor })}>
      동적으로 스타일 적용됨!
    </div>
  )
}
```

#### **언제 사용해야 할까?**

- **사용자가 직접 설정하는 테마** (예: 다크 모드, 컬러 변경 등)
- **실시간 스타일 변경이 필요한 경우** (예: 슬라이더로 폰트 크기 조절)
- **CSS 변수를 활용하여 최적화된 성능 유지**하고 싶을 때 (클래스 재생성이 아닌 변수 변경 방식)

### **요약**

| 기능      | `recipe`                             | `sprinkles`                       | `dynamic`                             |
| --------- | ------------------------------------ | --------------------------------- | ------------------------------------- |
| 역할      | 다양한 변형 스타일 정의              | 유틸리티 스타일 정의              | 런타임에서 CSS 변수 변경              |
| 사용 목적 | 버튼, 카드 같은 컴포넌트 스타일 변형 | Tailwind처럼 유틸리티 스타일 사용 | 사용자 테마 적용, 동적 스타일 변경    |
| 특징      | 여러 변형(variants) 및 조합 지원     | 반응형 지원, 속성 최적화          | `assignInlineVars`로 동적 스타일 적용 |

---

## vanilla-extract + Rollup 설정 방법

### Rollup이란?

Rollup은 JavaScript 모듈 번들러로, 특히 라이브러리 개발에 많이 사용된다. 트리 셰이킹(Tree-shaking) 기능을 통해 사용되지 않는 코드를 제거하여 더 작은 번들 크기를 만들 수 있다. `vanilla-extract`를 사용하면 CSS가 정적으로 추출되므로, Rollup과 함께 사용할 경우 최적화된 CSS 파일을 생성할 수 있다.

### Rollup 설정 방법

```sh
npm install --save-dev @vanilla-extract/rollup-plugin
```

`rollup.config.js`:

```js
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'

export default {
  plugins: [vanillaExtractPlugin()],
}
```

### 다른 빌드 방법

- **Webpack**: Webpack에서도 `@vanilla-extract/webpack-plugin`을 사용할 수 있으며, 큰 프로젝트에서 더 널리 사용됨
- **Vite**: 빠른 개발 환경을 원한다면 Vite와 통합하여 사용할 수도 있음
- **Parcel**: 간단한 설정으로 `vanilla-extract`를 활용할 수 있음

---

## 마무리하며

`vanilla-extract`는 Zero-runtime 방식의 CSS-in-JS 라이브러리로, 성능 문제를 최소화하면서도 강력한 스타일링 기능을 제공한다. 특히 TypeScript와의 궁합이 좋으며, 빌드 타임에서 정적으로 CSS를 생성하여 퍼포먼스를 향상시킨다.

### vanilla-extract의 주요 장점

- **런타임 비용 없음**: CSS가 빌드 타임에 정적으로 생성됨
- **정적 분석 가능**: TypeScript와 함께 사용하여 안전한 스타일 관리
- **최적화된 번들 크기**: Rollup, Webpack 등과 함께 사용하면 최소한의 CSS만 포함됨
- **CSS 변수 및 테마 지원**: `createVar`, `createTheme` API를 통한 동적 스타일 적용 가능

CSS-in-JS의 장점을 유지하면서도 런타임 부담을 줄이고 싶다면,`vanilla-extract`를 사용해보는 것도 좋을 것 같다.

---

## 참고

> - [Vanilla extract 공식 도큐](https://vanilla-extract.style/)
> - ChatGPT 4o 답변 참고
