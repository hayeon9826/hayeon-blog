---
title: 'CommonJS vs. ES Module 알아보기'
date: '2024-08-15T11:45:32.169Z'
description: '모듈화를 구현하기 위한 두 가지 주요 시스템 CommonJS와 ES Module에 대해서 알아보기'
category: 'Javascript'
keywords: 'CJS, ESM, Javascript, module'
image: 'https://velog.velcdn.com/images/khy226/post/ba2041d0-ca89-4e09-b5db-5f2eb97bbd76/image.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/ba2041d0-ca89-4e09-b5db-5f2eb97bbd76/image.jpeg" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

## CommonJS vs. ES Module

**CommonJS**와 **ES Module**은 JavaScript에서 모듈화를 구현하기 위한 두 가지 주요 시스템입니다. 모듈 시스템은 코드를 재사용 가능하게 만들고, 유지보수성을 높이며, 복잡한 애플리케이션을 관리하는 데 중요한 역할을 합니다. CommonJS는 주로 Node.js 환경에서 사용되고, ES Module(ESM)은 JavaScript의 공식 모듈 시스템으로, 브라우저와 Node.js 모두에서 지원됩니다.

### 1. **CommonJS (CJS)**

**CommonJS**는 Node.js 환경에서 널리 사용되는 모듈 시스템입니다. CommonJS는 모듈을 파일 단위로 정의하고, `require()` 함수로 모듈을 불러오며, `module.exports` 또는 `exports` 객체를 사용해 모듈을 내보냅니다.

### 개념 설명:

- **모듈 임포트**: `require()` 함수를 사용하여 다른 모듈을 가져옵니다. 이 함수는 동기적으로 작동하며, 파일이 로드될 때 코드를 실행합니다.

```jsx
const moduleA = require('./moduleA')
```

- 모듈 익스포트: module.exports 또는 exports 객체를 사용하여 모듈의 내용을 내보냅니다.

```jsx
module.exports = function () {
  console.log('Hello, CommonJS')
}
```

### 2. **ES Module (ESM)**

**ES Module**(ESM)은 ECMAScript 2015(ES6)에서 도입된 JavaScript의 표준 모듈 시스템입니다. ESM은 브라우저와 Node.js에서 모두 지원되며, 모듈을 정적으로 분석할 수 있어 **Tree Shaking** 같은 최적화 기법이 가능하게 합니다.

### 개념 설명:

- **모듈 임포트**: `import` 문을 사용하여 다른 모듈을 가져옵니다. 이 문은 비동기적으로 작동할 수 있으며, 정적으로 분석됩니다.
  ```jsx
  import moduleA from './moduleA.js'
  ```
- **모듈 익스포트**: `export` 문을 사용하여 모듈의 내용을 내보냅니다. `export default`로 기본 내보내기를 할 수 있고, `export`를 사용해 여러 항목을 내보낼 수도 있습니다.
  ```jsx
  export function hello() {
    console.log('Hello, ES Module')
  }

  export default hello
  ```

### 3. **차이점**

1. **문법 및 사용법**
   - **CommonJS**: `require()` 함수로 모듈을 불러오고, `module.exports`나 `exports`로 내보냅니다. 동기적으로 작동하며, 주로 Node.js 환경에서 사용됩니다.
   - **ES Module**: `import`와 `export` 문법을 사용하여 모듈을 관리합니다. 비동기적이며, 정적 분석이 가능해 Tree Shaking과 같은 최적화가 용이합니다. 브라우저와 Node.js 모두에서 사용 가능합니다.
2. **동작 방식 (중요)**
   - **CommonJS**: 모듈은 <u>런타임에 평가되며, `require()` 호출 시 모듈을 로드하고 실행</u>합니다. 이 동작은 <u>동기적</u>이기 때문에, 코드를 실행할 때 **블로킹**될 수 있습니다.
   - **ES Module**: 모듈은 <u>정적으로 분석되어, 빌드 타임 또는 로드 타임에 미리 결정</u>됩니다. `import`는 <u>비동기적</u>으로 동작할 수 있어, 코드 로딩이 비동기적인 환경에 적합합니다.
3. **모듈화 철학**
   - **CommonJS**: **런타임**에 모듈을 로드하고, 각각의 모듈이 단일 객체로 내보내지며, 객체의 프로퍼티로 다른 값들을 노출합니다.
   - **ES Module**: **정적인 모듈 시스템**을 따르며, `export`를 통해 여러 값(함수, 객체, 변수 등)을 각각 내보낼 수 있습니다. 각 모듈은 개별적으로 내보내진 것들을 필요에 따라 가져올 수 있습니다.
4. **호환성**
   - **CommonJS**: Node.js 환경에서 기본적으로 사용되며, 브라우저 환경에서는 Webpack, Browserify 등의 도구로 번들링해야 합니다.
   - **ES Module**: 브라우저와 Node.js에서 기본적으로 지원되며, 더 넓은 호환성을 가집니다. 특히 ES6 이후의 최신 표준을 사용하는 환경에서 사용됩니다.

### 4. **장단점**

## CommonJS

**장점:**

- **Node.js 친화적**: Node.js에서 기본적으로 지원되며, 서버사이드 애플리케이션에서 널리 사용됩니다.
- **간단한 사용법**: `require()` 함수로 모듈을 쉽게 불러올 수 있습니다. 파일 경로나 패키지 이름만으로 모듈을 동기적으로 로드할 수 있어, 이해하기 쉽습니다.
- **런타임 동작**: 모듈을 런타임에 동적으로 불러올 수 있어, 조건부 로딩이나 동적 경로 처리가 유연합니다.

**단점:**

- **동기적 로딩**: 모듈 로딩이 동기적으로 이루어지기 때문에, I/O가 느리거나 큰 파일을 로드할 때 성능에 영향을 미칠 수 있습니다.
- **브라우저에서의 제한**: CommonJS는 브라우저에서 직접 사용되지 않으며, **브라우저 환경에서 사용하기 위해서는 번들러(예: Webpack, Browserify)가 필요**합니다.

## ES Module (ESM)

**장점:**

- **정적 분석 가능**: ESM은 모듈을 정적으로 분석할 수 있어, Tree Shaking과 같은 최적화가 가능하고, 코드의 사용되지 않는 부분을 자동으로 제거할 수 있습니다.
- **비동기적 로딩**: 모듈을 비동기적으로 로드할 수 있어, 비동기 환경에 적합하고, 성능 최적화에 유리합니다.
- **브라우저 및 Node.js 호환**: 브라우저와 Node.js에서 기본적으로 지원되어, 모듈화된 코드를 다양한 환경에서 일관되게 사용할 수 있습니다.
- **모듈화 표준**: JavaScript의 표준 모듈 시스템으로, 최신 문법과 기능을 사용할 수 있습니다.

**단점:**

- **복잡한 설정**: ESM은 최신 표준이므로, 구형 환경에서는 Babel 같은 트랜스파일러나 번들러가 필요할 수 있습니다.
- **기존 환경과의 호환성 문제**: 기존에 CommonJS를 사용한 코드와의 호환성 문제가 발생할 수 있으며, 두 모듈 시스템을 혼합해서 사용할 때 추가적인 설정이 필요합니다.
- **Node.js에서의 제약**: Node.js에서 ESM을 사용하려면 `package.json` 파일에 `"type": "module"`을 지정해야 하며, CommonJS와의 호환성을 고려해야 합니다.

## CommonJS vs. ES Module 비교 결론

- **CommonJS**는 Node.js 환경에서 기본적으로 사용되는 모듈 시스템으로, 간단하고 직관적인 사용법을 제공하며, 서버사이드 JavaScript 개발에 적합합니다. 그러나, 동기적 로딩과 브라우저 호환성 문제로 인해 클라이언트 사이드에서의 사용에는 제한이 있습니다.

- **ES Module (ESM)**은 JavaScript의 공식 모듈 시스템으로, 브라우저와 Node.js에서 모두 사용할 수 있으며, 정적 분석과 비동기적 로딩을 지원하여 성능 최적화에 유리합니다. ESM은 최신 JavaScript 개발 환경에서 표준으로 자리 잡고 있으며, 트리 쉐이킹과 같은 고급 최적화 기능을 통해 코드의 효율성을 높일 수 있습니다. 그러나, 구형 환경과의 호환성 문제와 설정 복잡성이 단점으로 작용할 수 있습니다.

**선택 기준**은 프로젝트의 특성, 환경, 그리고 호환성 요구 사항에 따라 달라집니다. Node.js 기반 서버사이드 프로젝트에서는 CommonJS가 여전히 유용하지만, 최신 브라우저와 다양한 환경에서 호환성을 고려해야 하는 경우 ES Module이 더 적합한 선택이 될 수 있습니다.

---

## (추가) Typescript로 된 React 프로젝트에서 모듈 시스템 설정하기

React에서 TypeScript를 사용할 때, 모듈 시스템으로 CommonJS와 ESModules를 선택할 수 있습니다. ESModules는 최신 자바스크립트 표준에 따라 모듈을 가져오고 내보내는 방식이고, CommonJS는 주로 Node.js에서 사용되는 모듈 시스템입니다. TypeScript에서는 `tsconfig.json` 파일을 통해 이 두 모듈 시스템을 설정할 수 있습니다.

### **ESModules 사용 설정**

ESModules는 최신 자바스크립트 표준에 따라 모듈을 관리합니다. 이 방식은 `import`와 `export` 키워드를 사용하여 모듈을 가져오고 내보냅니다.

#### 1. **`tsconfig.json` 설정**

```jsx
{
  "compilerOptions": {
    "module": "ESNext", // 또는 "ES6" 또는 "ES2020"
    "target": "ES6", // ES6 이상의 버전이어야 합니다.
    "moduleResolution": "node",
    "esModuleInterop": true, // CommonJS 모듈과 호환성을 유지하기 위해 추가합니다.
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "jsx": "react",
    // 기타 옵션들...
  }
}
```

- **`module: "ESNext"` 또는 `"ES6"`**: ESModules를 사용하도록 설정합니다.
- **`esModuleInterop: true`**: CommonJS 모듈과의 호환성을 위해 설정합니다.
- **`allowSyntheticDefaultImports: true`**: CommonJS 모듈을 `import` 구문을 통해 기본 내보내기로 가져올 수 있게 합니다.

#### 2. **모듈 사용 예시**

```typescript
// utils.ts
export function add(a: number, b: number): number {
  return a + b
}

// App.tsx
import { add } from './utils'

console.log(add(2, 3)) // 출력: 5
```

### **CommonJS 사용 설정**

CommonJS는 주로 Node.js 환경에서 사용되는 모듈 시스템으로, `require`와 `module.exports`를 사용하여 모듈을 가져오고 내보냅니다.

#### 1. **`tsconfig.json` 설정**

```jsx
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES5", // CommonJS에서는 ES5 이상으로 설정해야 합니다.
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "jsx": "react",
    // 기타 옵션들...
  }
}
```

- **`module: "CommonJS"`**: CommonJS 모듈 시스템을 사용하도록 설정합니다.
- **`esModuleInterop: true`**: CommonJS 모듈과의 호환성을 위해 설정합니다.

#### 2. **모듈 사용 예시**

```typescript
// utils.js
function add(a, b) {
  return a + b
}

module.exports = { add }

// App.tsx
const { add } = require('./utils')

console.log(add(2, 3)) // 출력: 5
```

### **혼합 사용**

TypeScript에서 ESModules와 CommonJS를 혼합하여 사용할 수도 있습니다. 예를 들어, ESModules 스타일로 작성된 코드를 CommonJS 스타일로 가져오는 경우가 있을 수 있습니다. 이를 가능하게 하는 것이 `esModuleInterop`와 `allowSyntheticDefaultImports` 옵션입니다.

```typescript
// utils.ts (ESModule 스타일)
export function add(a: number, b: number): number {
  return a + b
}

// main.js (CommonJS 스타일)
const { add } = require('./utils')
console.log(add(2, 3)) // 출력: 5
```

위 예시에서 `esModuleInterop: true`와 `allowSyntheticDefaultImports: true` 설정 덕분에, `require`를 통해 ESModules에서 작성된 코드를 CommonJS 방식으로 가져올 수 있습니다.

### **결론**

- **ESModules**: `import`와 `export`를 사용하며, 최신 표준을 따릅니다. 대부분의 모던 프론트엔드 환경에서 추천됩니다.
- **CommonJS**: `require`와 `module.exports`를 사용하며, 주로 Node.js 환경에서 사용됩니다.

React와 TypeScript를 사용할 때, 일반적으로 ESModules를 사용하는 것이 권장되지만, 프로젝트에 따라 CommonJS를 사용할 수도 있습니다. `tsconfig.json`에서 `module` 옵션을 적절히 설정하고, `esModuleInterop`과 `allowSyntheticDefaultImports`를 사용하여 두 모듈 시스템 간의 호환성을 유지할 수 있습니다.

---

## 참고

- [[MDN Web Docs] JavaScript modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [[Javascript.info] 모듈 소개](https://ko.javascript.info/modules-intro)
- ChatGPT 4o 답변 참고
