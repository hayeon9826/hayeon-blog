---
title: 'Context API를 사용한 상태관리'
date: '2023-05-14T11:45:32.169Z'
description: 'React의 Context API를 이용한 상태관리 방법'
category: 'React'
keywords: 'context, context api, useContext'
image: 'https://velog.velcdn.com/images/khy226/post/892dd1fb-ba3a-400a-9415-f7777a4a4435/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/892dd1fb-ba3a-400a-9415-f7777a4a4435/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

## 상태관리란?

Context API를 알아보기 전에, 리액트에서 상태관리에 대한 개념과 필요성에 대해서 알아보도록 하겠습니다. React에서 컴포넌트 구조는 계층 구조(hierarchical structure)로 이루어져 있습니다. 모든 컴포넌트는 트리(tree) 구조에서 루트(root) 컴포넌트를 가지며, 이 루트 컴포넌트에서 모든 하위 컴포넌트를 렌더링합니다. 이 때, 컴포넌트 간의 데이터 전달은 상위 컴포넌트에서 하위 컴포넌트로 **props**(properties)라는 이름으로 전달됩니다.

<br />

![React 컴포넌트 구조](https://velog.velcdn.com/images/khy226/post/e1515931-ba15-4fec-842c-2424be96d698/image.png)

<br />

리액트에서 **상태(state)** 란 컴포넌트 내부에서 관리되는 값으로, 사용자의 입력, 서버로부터 받은 데이터, 다른 컴포넌트와의 상호작용 등으로 인해 동적으로 변할 수 있는 값입니다. 그리고, 리액트에서 **상태관리는 컴포넌트 간의 데이터 전달과 관리**를 의미합니다. 이를 통해 데이터가 필요한 컴포넌트에서 데이터를 쉽게 가져와 사용할 수 있습니다.

<br />

![React 상태 관리 구조](https://velog.velcdn.com/images/khy226/post/26b79ee4-8a1a-423d-9a0f-2b69958f0b9f/image.png)

<br />

상태(state)는 컴포넌트가 렌더링될 때마다 재설정되기 때문에, 컴포넌트 내부에서 상태를 관리하면 사용자의 입력에 따라 렌더링 결과가 실시간으로 반영됩니다.

그러나 상태가 여러 컴포넌트에서 공유되어야 하는 경우, 상태를 관리하는 컴포넌트를 중심으로 props로 상태값을 전달하는 방식은 번거롭고 복잡해질 수 있습니다. 이러한 문제를 **Props Drilling**이라고 합니다.

## 상태 관리의 문제점: Props Drilling

Props Drilling은 부모 컴포넌트에서 데이터를 전달받은 자식 컴포넌트가, 다시 하위 컴포넌트로 데이터를 전달해야 하는 상황을 말합니다. 이러한 과정에서 매번 Props를 전달해야 하기 때문에 코드가 복잡해지고 유지보수가 어려워집니다.

<br />

![Props Drilling](https://velog.velcdn.com/images/khy226/post/e7d0f08b-e48c-456e-a3f3-61e2d2ba7394/image.png)

<br />

예를 들어, TodoList 컴포넌트에서 각 Todo 아이템에 대한 정보를 렌더링하기 위해서는 TodoItem 컴포넌트로 해당 정보를 전달해야 합니다. 그리고 TodoItem 컴포넌트에서 다시 TodoButton 컴포넌트로 데이터를 전달해야 합니다. 이러한 경우에는 Props Drilling이 발생할 수 있습니다.

<br />

![Props Drilling 예시](https://velog.velcdn.com/images/khy226/post/038c894c-41e4-46fa-ab24-74808aa62c89/image.png)

<br />

이를 해결하기 위해서는 TodoList 컴포넌트에서 TodoItem 컴포넌트로 필요한 정보를 미리 전달하고, TodoItem 컴포넌트에서는 전달받은 정보를 가공해서 TodoButton 컴포넌트로 전달하는 방식을 사용할 수 있습니다. 이를 통해 Props Drilling을 최소화하고 코드의 가독성과 유지보수성을 높일 수 있습니다.

이러한 문제를 해결하기 위해서는 상태관리 라이브러리나 Context API를 사용하여 전역 상태를 관리하거나, 상위 컴포넌트에서 필요한 데이터를 미리 가공해서 하위 컴포넌트에게 전달하는 방식을 사용할 수 있습니다.

## Context API란?

Context API는 리액트에서 상태(state)를 전역적으로 관리하기 위한 방법 중 하나입니다. React의 `createContext` 메소드를 사용하여 생성된 객체로, 이를 이용하면 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 필요 없이, 어떤 컴포넌트에서든 값을 공유할 수 있습니다.

<br />

![Context API 예시](https://velog.velcdn.com/images/khy226/post/fb9c115f-4165-406e-9861-e17674b65e76/image.png)

<br />

Context API는 Provider와 Consumer를 제공하여, Provider로 값을 설정하고 Consumer로 값을 가져와 사용할 수 있습니다. Provider로 값을 설정하면, 하위 컴포넌트에서 Consumer를 사용하여 값을 가져올 수 있습니다. Provider는 value prop을 사용하여 값을 설정하며, Consumer는 함수 자식(child)을 받아서 그 함수 내부에서 값을 가져올 수 있습니다.

- `createContext()` 함수를 호출하여 Context 객체를 생성합니다. 이 Context 객체는 Provider와 Consumer로 구성됩니다.
- `Provider`는 Context로 전달할 값을 설정하는 컴포넌트입니다. 이 값은 Provider 컴포넌트의 props로 전달됩니다. 이렇게 설정된 값을 Consumer에서 사용할 수 있습니다.
- `Consumer`는 Context 값을 사용하는 컴포넌트입니다. 이 컴포넌트에서는 Context 객체를 가져와서 값을 사용합니다.
- `useContext`는 React 16.8 이상 버전에서 Context 값을 사용하는 훅입니다. Consumer과 동일하게, 해당 훅을 사용해 Context 객체를 가져와서 값을 사용합니다.

<br />

간단한 Context API 코드 사용 예시는 아래와 같습니다.

#### 1. `createContext`로 Context 객체 생성

```javascript
import { createContext } from 'react'

// defaultValue 값은 기본 값으로 설정됨
export const LevelContext = createContext(defaultValue)
```

`createContext` 함수를 사용하여 LevelContext 라는 Context 객체를 생성합니다. `createContext` 함수는 defaultValue를 인자로 받습니다. 이 defaultValue는 Provider를 통해 값을 전달하지 않았을 때 기본값으로 사용됩니다.

<br />

#### 2. Provider로 원하는 context 전달

```javascript
import { LevelContext } from './LevelContext.js'

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>{children} // 하위 컴포넌트</LevelContext.Provider>
    </section>
  )
}
```

<br />

`LevelContext.Provider`를 사용하여 하위 컴포넌트에 값을 전달할 수 있습니다. 이 때, value prop에 전달할 값을 넣습니다. Provider 컴포넌트 내부에 있는 모든 하위 컴포넌트에서 이 값을 사용할 수 있습니다.

#### 3. `Consumer`로 context 값 사용하기

```javascript
import { useContext } from 'react'
import { LevelContext } from './LevelContext.js'

export default function Heading({ children }) {
  ;<LevelContext.Consumer>{({ level }) => <div>{level}</div>}</LevelContext.Consumer>
}
```

`LevelContext.Consumer`를 사용하여 Provider에서 전달한 값을 하위 컴포넌트에서 사용할 수 있습니다. Consumer는 함수형 컴포넌트 또는 클래스 컴포넌트에서 모두 사용할 수 있습니다.

<br />

#### 4. `useContext`로 Context 값 사용

```javascript
import { useContext } from 'react'
import { LevelContext } from './LevelContext.js'

export default function Heading({ children }) {
  const level = useContext(LevelContext)
  // ...
}
```

마지막으로, `useContext` hook을 사용하여 Consumer를 간단하게 사용할 수 있습니다. useContext를 사용하여 Context 객체를 가져온 후, 이를 사용하여 값을 사용할 수 있습니다. useContext를 사용하려면 React 16.8 이상 버전이 필요합니다.

<br />

> - 전체 코드 참고: [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)

<br />

## Context API 장단점

Context API를 사용하면 컴포넌트 간의 데이터 전달이 간편해지고, 중앙집중적으로 상태를 관리할 수 있습니다. 이로 인해 상태를 공유하는 여러 컴포넌트들 사이에서 값의 전달이 더욱 효율적으로 이루어지고, 코드의 복잡성을 줄일 수 있습니다.

하지만 Context API를 남발하면 컴포넌트 간의 의존성이 높아질 수 있기 때문에, 필요한 경우에만 사용하는 것이 좋습니다. 또한, Context API를 사용하면 React의 Virtual DOM에서 이벤트 버블링이 발생하지 않기 때문에, 이를 고려하여 구현해야 합니다.

상태관리는 리액트 애플리케이션에서 필수적인 개념이며, 이를 효율적으로 관리하기 위해서는 컴포넌트의 역할과 책임을 명확히 이해하고, 적절한 상태관리 라이브러리나 Context API를 사용하는 것이 좋습니다.

<br />

## Context API를 이용한 예시

이제 간단한 예제를 통해 실제로 Context API를 사용하는 방법을 알아보겠습니다.

```javascript
// ThemeContext.js
import { createContext } from 'react'

const ThemeContext = createContext('light')

export default ThemeContext
```

우선 ThemeContext.js 파일을 생성하여 createContext() 함수를 사용하여 ThemeContext 객체를 생성합니다. createContext() 함수의 매개변수로는 초기값을 전달합니다. 이 예제에서는 'light'라는 문자열을 전달했습니다.

```javascript
// App.js
import React from 'react'
import ThemeContext from './ThemeContext'

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button style={{ background: theme === 'dark' ? '#000' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
          {theme === 'dark' ? 'Dark Theme' : 'Light Theme'}
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

export default App
```

- 이제 App.js 파일을 생성하여 ThemeContext.Provider를 사용하여 값을 설정합니다. 이 예제에서는 'dark'라는 문자열을 value로 전달했습니다.

- Toolbar 컴포넌트는 ThemeContext.Consumer를 사용하여 ThemeContext 값을 사용합니다. 이 컴포넌트에서 ThemedButton 컴포넌트를 렌더링합니다.

- ThemedButton 컴포넌트에서는 ThemeContext.Consumer를 사용하여 ThemeContext 값을 가져옵니다. 이 값은 버튼의 배경색과 글자색을 설정하는 데 사용됩니다.

이제 위의 코드를 실행하면 버튼의 배경색과 글자색이 설정된 것을 확인할 수 있습니다.

이와 같이 Context API를 사용하면 어떤 컴포넌트에서든 값을 공유할 수 있기 때문에 컴포넌트 간의 데이터 전달이 간편해집니다. 이를 이용하여 상태(state)를 전역적으로 관리할 수 있습니다.

<br />

예를 들어, 애플리케이션에서 테마(Theme)를 설정하는 기능이 있다면, Context API를 사용하여 이를 구현할 수 있습니다. 이전에 작성한 예제를 바탕으로 테마를 설정하는 예제를 작성해보겠습니다.

```javascript
// ThemeContext.js
import { createContext } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export default ThemeContext
```

<br />

ThemeContext.js 파일에서는 createContext() 함수를 호출하여 ThemeContext 객체를 생성합니다. 이 예제에서는 초기값으로 theme이 'light'인 객체와 toggleTheme이라는 빈 함수를 전달합니다.

```javascript
// App.js
import React, { useState } from 'react'
import ThemeContext from './ThemeContext'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          style={{ background: theme === 'dark' ? '#000' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Dark Theme' : 'Light Theme'}
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

export default App
```

- App.js 파일에서는 useState() 함수를 사용하여 theme 상태와 toggleTheme 함수를 생성합니다. toggleTheme 함수는 theme 값을 변경하는 함수입니다.

- ThemeContext.Provider를 사용하여 값을 설정할 때, theme 상태와 toggleTheme 함수를 객체로 전달합니다.

- ThemedButton 컴포넌트에서는 ThemeContext.Consumer를 사용하여 theme 상태와 toggleTheme 함수를 가져옵니다. 버튼의 onClick 이벤트에 toggleTheme 함수를 설정하여 버튼을 클릭할 때마다 theme 값을 변경할 수 있습니다.

<br />
 
이제 위의 코드를 실행하면 버튼을 클릭할 때마다 테마가 변경되는 것을 확인할 수 있습니다.

## 결론

이와 같이 Context API를 사용하면 전역적으로 상태를 관리할 수 있으며, 데이터 전달이 간편해지는 장점이 있습니다. Context API를 사용하면 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하지 않아도 되기 때문에 효율적으로 데이터를 관리할 수 있습니다. 이를 통해 코드의 가독성을 높이고, 유지 보수성을 높일 수 있습니다.

<br />

그러나 Context API를 남발하면 컴포넌트 간의 의존성이 높아지고, 코드가 복잡해져 디버깅이 어려워질 수 있습니다. 따라서, 전역적으로 중복되는 상태를 관리하고 싶을 때 Context API를 적절하게 사용하는 것이 중요합니다.

<br />

---

## 참고

> - [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
> - [React 공식도큐 - Context](https://ko.legacy.reactjs.org/docs/context.html)
> - [생활코딩 - React Context API](https://youtu.be/JQ_lksQFgNw)
> - [React Hooks에 취한다 - useContext + Context API | 리액트 훅스 시리즈](https://youtu.be/LwvXVEHS638)
