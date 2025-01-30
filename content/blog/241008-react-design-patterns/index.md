---
title: '[번역] React Design Patterns'
date: '2024-10-08T11:45:32.169Z'
description: '리액트 개발자는 디자인 패턴을 사용함으로써 시간과 노력을 절약할 수 있으며, 검증된 솔루션을 통해 문제를 신속하게 해결할 수 있습니다.'
category: 'React'
keywords: 'React, Design Pattern, 디자인패턴'
image: 'https://velog.velcdn.com/images/khy226/post/27433a64-cae8-4020-aa25-4a55921e51e2/image.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/27433a64-cae8-4020-aa25-4a55921e51e2/image.jpeg" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

> 해당 포스트는 리액트 디자인 패턴에 대해서 다룬 [React Design Patterns](https://refine.dev/blog/react-design-patterns/) 아티클의 번역 문서입니다.

## 리액트 디자인 패턴 (React Design Patterns)

리액트 개발자는 **디자인 패턴**을 사용함으로써 시간과 노력을 절약할 수 있으며, 검증된 솔루션을 통해 문제를 신속하게 해결할 수 있습니다. 디자인 패턴은 <u>모듈의 응집력을 높이고 결합도를 낮추어, 리액트 개발자가 유지보수가 용이하고, 확장 가능하며, 효율적인 애플리케이션</u>을 만들 수 있게 도와줍니다. 이 글에서는 리액트 디자인 패턴을 탐구하고, 이러한 패턴들이 리액트 애플리케이션 개발을 어떻게 개선할 수 있는지 살펴보겠습니다.

---

## 다룰 내용

- 컨테이너와 프레젠테이션 패턴
- 훅(Hooks)을 사용한 컴포넌트 구성
- 리듀서로 상태 관리
- 프로바이더로 데이터 관리
- HOC(Higher-Order Components)를 통한 컴포넌트 확장
- 컴파운드 컴포넌트(Compound Components)
- 프롭 결합
- 리액트에서의 지연 로딩 컴포넌트
- 제어된 입력(Controlled Inputs)
- 리액트에서의 오류 경계 패턴
- forwardRefs로 커스텀 컴포넌트 관리

---

## 컨테이너 프레젠테이션 패턴 (Container-Presentation)

컨테이너와 프레젠테이션 패턴은 리액트 코드에서 프레젠테이션 로직과 비즈니스 로직을 분리하여 모듈화하고, 테스트 가능하며, 관심사의 분리 원칙을 따르는 구조를 만드는 것을 목표로 합니다. 리액트 애플리케이션에서 데이터를 백엔드나 스토어에서 가져오거나 특정 로직을 계산해야 하는 경우가 자주 발생합니다. 이때 컨테이너와 프레젠테이션 패턴을 사용하면 컴포넌트를 두 가지로 분류할 수 있습니다:

- **컨테이너 컴포넌트**: 데이터 가져오기나 로직 계산을 담당하는 컴포넌트입니다.
- **프레젠테이션 컴포넌트**: 가져온 데이터나 계산된 값을 UI에 렌더링하는 컴포넌트입니다.

컨테이너와 프레젠테이션 패턴의 예시는 아래와 같습니다:

```jsx
import React, { useEffect, useState } from "react";
import CharacterList from "./CharacterList";

const StarWarsCharactersContainer: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://akabab.github.io/starwars-api/api/all.json",
      );
      const data = await response.json();
      setCharacters(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <CharacterList loading={isLoading} error={error} characters={characters} />
  );
};

export default StarWarsCharactersContainer;
```

위 코드에서 `StarWarsCharactersContainer`는 데이터를 가져오고 `CharacterList` 컴포넌트는 UI를 렌더링합니다.

```jsx
import React from 'react'
import { Character } from './types'

interface CharacterListProps {
  loading: boolean;
  error: boolean;
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ loading, error, characters }) => {
  if (loading && !error) return <div>로딩 중...</div>
  if (!loading && error) return <div>에러 발생: 캐릭터를 로드할 수 없습니다.</div>
  if (!characters) return null

  return (
    <ul>
      {characters.map(character => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  )
}

export default CharacterList
```

<br />

## 훅(Hooks)을 사용한 컴포넌트 합성 (Component composition with Hooks)

훅은 리액트 16.8에서 도입된 기능으로, 상태와 생명주기 메서드에 접근할 수 있게 해줍니다. 훅을 사용하면 컴포넌트의 상태 관리 로직을 쉽게 모듈화하고 재사용할 수 있습니다.

<br />

```jsx
export const useFetchStarWarsCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const controller = new AbortController();

  const getCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://akabab.github.io/starwars-api/api/all.json",
        { signal: controller.signal }
      );
      const data = await response.json();
      setCharacters(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
    return () => {
      controller.abort();
    };
  }, []);

  return [characters, isLoading, error];
};
```

위에서 정의한 커스텀 훅을 `StarWarsCharactersContainer` 컴포넌트에서 사용할 수 있습니다:

```jsx
import React from 'react'
import { useFetchStarWarsCharacters } from './useFetchStarWarsCharacters'

const StarWarsCharactersContainer: React.FC = () => {
  const [characters, isLoading, error] = useFetchStarWarsCharacters()

  return <CharacterList loading={isLoading} error={error} characters={characters} />
}

export default StarWarsCharactersContainer
```

<br />

## 리듀서로 상태 관리 (State management with Reducers)

컴포넌트에서 많은 상태를 다루다 보면 이를 그룹화하지 않으면 관리가 힘들어질 수 있습니다. 리듀서 패턴을 사용하면 상태를 그룹화하고, 액션을 통해 상태를 변경할 수 있습니다.

```jsx
import React, { useReducer } from 'react'

const initState = {
  loggedIn: false,
  user: null,
  token: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'logout':
      return initState
    default:
      return state
  }
}

const AuthComponent = () => {
  const [state, dispatch] = useReducer(authReducer, initState)

  const logIn = () => {
    dispatch({
      type: 'login',
      payload: {
        user: { name: 'John Doe' },
        token: 'token',
      },
    })
  }

  const logOut = () => {
    dispatch({ type: 'logout' })
  }

  return (
    <div>
      {state.loggedIn ? (
        <div>
          <p>환영합니다, {state.user.name}님</p>
          <button onClick={logOut}>로그아웃</button>
        </div>
      ) : (
        <form onSubmit={logIn}>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <button type="submit">로그인</button>
        </form>
      )}
    </div>
  )
}
```

<br />

## Provider로 데이터 관리 (Data management with Providers)

프로바이더 패턴은 Context API를 사용하여 애플리케이션의 컴포넌트 트리를 통해 데이터를 전달하는데 유용합니다. 이를 통해 "Prop drilling" 문제를 해결할 수 있습니다.

```jsx
export const ThemeContext = React.createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light')

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
```

이제 `ThemeProvider`로 컴포넌트를 감싸서 테마 데이터를 전달할 수 있습니다:

```jsx
import { useContext } from 'react'
import { ThemeProvider, ThemeContext } from '../context'

const HeaderSection = () => {
  return (
    <ThemeProvider>
      <TopNav />
    </ThemeProvider>
  )
}

const TopNav = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#000' }}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>테마 변경</button>
    </div>
  )
}
```

<br />

## HOC(Higher-Order Components)를 통한 컴포넌트 확장

HOC(Higher-Order Components) 패턴은 하나의 컴포넌트를 입력으로 받아 해당 컴포넌트에 추가적인 데이터나 기능을 주입하여 새로운 컴포넌트를 반환하는 패턴입니다. 이는 리액트에서 상속보다 컴포지션(조합)을 선호하는 특성 덕분에 가능하며, HOC를 사용하면 컴포넌트의 재사용성과 코드의 공유를 촉진할 수 있습니다.

아래는 HOC 패턴의 예시입니다:

```jsx
import React from 'react'

// HOC: 컴포넌트를 입력으로 받아 추가 데이터를 주입한 새로운 컴포넌트를 반환
const withUserData = Component => {
  return class extends React.Component {
    state = {
      user: { name: 'John Doe', role: 'Admin' },
    }

    render() {
      return <Component user={this.state.user} {...this.props} />
    }
  }
}

// 컴포넌트에서 주입된 데이터를 사용
const UserComponent = ({ user }) => {
  return (
    <div>
      <p>이름: {user.name}</p>
      <p>역할: {user.role}</p>
    </div>
  )
}

// HOC로 감싸서 UserComponent에 추가 데이터를 주입
const EnhancedUserComponent = withUserData(UserComponent)

const App = () => {
  return (
    <div>
      <EnhancedUserComponent />
    </div>
  )
}

export default App
```

위 코드에서 `withUserData`라는 HOC는 `UserComponent`에 추가적인 `user` 데이터를 주입하여 확장된 컴포넌트를 반환합니다. 이렇게 HOC 패턴을 사용하면 기능을 모듈화하고 컴포넌트를 확장하는 데 유용합니다.

<br />

## 컴파운드 컴포넌트(Compound Components)

컴파운드 컴포넌트 패턴은 상위 컴포넌트를 여러 하위 컴포넌트로 나누고, 이들 간의 상호작용을 관리하는 패턴입니다. 이 패턴은 부모 컴포넌트를 보다 작은 구성 요소들로 분리하여 유연성과 확장성을 높일 수 있습니다.

예를 들어, `Toggle` 컴포넌트를 컴파운드 컴포넌트로 구현하면 다음과 같이 사용할 수 있습니다:

```jsx
import React, { createContext, useState, useContext } from 'react'

// ToggleContext 생성
const ToggleContext = createContext()

function Toggle({ children }) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{ on, toggle }}>{children}</ToggleContext.Provider>
}

Toggle.On = function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext)
  return on ? children : null
}

Toggle.Off = function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext)
  return on ? null : children
}

Toggle.Button = function ToggleButton() {
  const { toggle } = useContext(ToggleContext)
  return <button onClick={toggle}>Toggle</button>
}

// 사용 예시
function App() {
  return (
    <Toggle>
      <Toggle.On>버튼이 켜졌습니다</Toggle.On>
      <Toggle.Off>버튼이 꺼졌습니다</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}

export default App
```

위 코드에서 `Toggle` 컴포넌트는 여러 하위 컴포넌트(`Toggle.On`, `Toggle.Off`, `Toggle.Button`)와 함께 사용되며, 각 하위 컴포넌트는 `ToggleContext`를 통해 상호작용합니다. 이 패턴은 복잡한 UI 컴포넌트를 보다 쉽게 관리하고 확장할 수 있는 구조를 제공합니다.

<br />

## Prop 결합 (Prop Combination)

Prop 결합은 여러 관련된 Prop을 하나의 객체로 묶어 전달하는 패턴입니다. 이를 통해 코드를 간결하게 만들고, 여러 프롭을 보다 쉽게 관리할 수 있습니다.

예시는 다음과 같습니다:

```jsx
import React from 'react'

function P({ color, size, children, ...rest }) {
  return (
    <p style={{ color, fontSize: size }} {...rest}>
      {children}
    </p>
  )
}

function App() {
  const paragraphProps = {
    color: 'red',
    size: '20px',
    lineHeight: '22px',
  }

  return <P {...paragraphProps}>이것은 P 태그입니다</P>
}

export default App
```

위 예시에서 여러 관련된 프롭(`color`, `size`, `lineHeight`)을 하나의 객체로 묶어 `P` 컴포넌트에 전달하고 있습니다. 이를 통해 많은 프롭을 보다 명확하고 간단하게 관리할 수 있습니다.

<br />

## 제어 입력 (Controlled Inputs)

제어된 입력(Controlled Input) 패턴은 입력 필드를 처리하는 데 사용됩니다. 이 패턴은 입력 필드의 값이 변경될 때 이벤트 핸들러를 사용하여 컴포넌트 상태를 업데이트하고, 현재 입력 필드의 값을 상태에 저장하는 방식입니다.

리액트가 컴포넌트의 상태와 동작을 제어하기 때문에, 이 패턴은 상태를 직접적으로 DOM(Document Object Model)을 통해 제어하는 비제어 입력 패턴(Uncontrolled Input Pattern)보다 코드가 더 예측 가능하고 가독성이 높아집니다.

제어된 입력 패턴의 예시는 아래와 같습니다:

```jsx
import React, { useState } from 'react'

function ControlledInput() {
  const [inputValue, setInputValue] = useState('')

  const handleChange = event => {
    setInputValue(event.target.value)
  }

  return <input type="text" value={inputValue} onChange={handleChange} />
}
```

이 예시에서는 `ControlledInput` 컴포넌트가 입력 필드의 상태를 제어하며, 사용자가 입력할 때마다 상태가 업데이트되어 입력 필드의 값을 관리합니다.

<br />

## 오류 경계 패턴 (Error Boundaries in React)

리액트에서는 컴포넌트가 오류를 발생시키면 전체 UI가 깨질 수 있습니다. 이를 방지하기 위해 오류 경계(Error Boundaries) 패턴을 사용하여 오류를 포착하고, UI가 완전히 깨지지 않도록 대비할 수 있습니다.

오류 경계는 클래스형 컴포넌트로 구현되며, `getDerivedStateFromError`와 `componentDidCatch` 메서드를 통해 오류를 처리합니다:

```jsx
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 오류 발생 시 상태 업데이트
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 오류 정보를 로깅하거나 분석 도구로 전송
    console.error('오류 발생:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>문제가 발생했습니다.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

오류 경계를 사용하면 전체 앱이 오류로 인해 중단되지 않고, 사용자에게 친절한 메시지를 보여줄 수 있습니다.

<br />

## forwardRefs로 커스텀 컴포넌트 관리

`forwardRef` 패턴은 하위 컴포넌트의 참조(ref)를 상위 컴포넌트에서 제어할 수 있도록 해주는 고차 컴포넌트(HOC)입니다. 이는 외부 라이브러리와 상호작용하거나 DOM 노드에 직접 접근해야 할 때 유용합니다.

```jsx
import React, { useRef, useEffect } from 'react'

const CustomInput = React.forwardRef((props, ref) => <input type="text" {...props} ref={ref} />)

const ParentComponent = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    // 부모 컴포넌트에서 하위 컴포넌트의 ref에 접근하여 포커스 설정
    inputRef.current.focus()
  }, [])

  return <CustomInput ref={inputRef} />
}

export default ParentComponent
```

위 예시에서 `forwardRef`를 사용하여 부모 컴포넌트가 하위 컴포넌트의 DOM 노드에 접근할 수 있습니다.

<br />

## 지연 로딩 컴포넌트 (Lazy Loading Components in React)

지연 로딩은 성능 최적화를 위해 매우 유용한 패턴으로, 특히 큰 컴포넌트나 경로(Route)를 다룰 때 유용합니다. 지연 로딩은 컴포넌트를 미리 로드하지 않고, 필요한 시점에만 로드하여 초기 로딩 시간을 단축하고, 전반적인 사용자 경험을 개선합니다.

리액트에서는 `React.lazy()`와 `Suspense`를 사용하여 지연 로딩을 구현할 수 있습니다:

```jsx
import React, { Suspense } from 'react'

const MyComponent = React.lazy(() => import('./MyComponent'))

function App() {
  return (
    <div>
      <Suspense fallback={<div>로딩 중...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  )
}

export default App
```

위 코드에서 `MyComponent`는 렌더링될 때만 로드되며, 그동안 사용자는 "로딩 중..."이라는 메시지를 보게 됩니다. 이 패턴은 사용하지 않는 컴포넌트나 화면을 처음부터 로드하지 않게 하여 성능을 크게 개선할 수 있습니다.

<br />

## 메모화 패턴(Memoization Patterns) in React

메모화 패턴은 리액트에서 불필요한 재렌더링을 방지하여 성능을 최적화하는 데 매우 유용합니다. `React.memo`, `useMemo`, `useCallback`과 같은 도구를 사용하면 컴포넌트가 변경된 부분만 다시 렌더링되도록 할 수 있습니다.

- **React.memo**: Prop이 변경될 때만 컴포넌트를 재렌더링합니다.
- **useMemo**: 계산된 값을 메모화하여, 의존성이 변경될 때만 다시 계산합니다.
- **useCallback**: 함수 자체를 메모화하여, 의존성이 변경될 때만 새로운 함수가 생성됩니다.

<br />

예시:

```jsx
const MyComponent = React.memo(({ count }) => {
  console.log('컴포넌트 렌더링')
  return <div>{count}</div>
})

const ParentComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MyComponent count={count} />
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
```

위 예시에서 `MyComponent`는 `count`가 변경될 때만 재렌더링되며, 불필요한 재렌더링을 방지합니다.

---

## 결론

이번 글에서는 리액트의 다양한 디자인 패턴에 대해 살펴보았습니다. HOC, 컨테이너-프레젠테이션 패턴, 컴파운드 컴포넌트, 제어된 컴포넌트, 그리고 메모화 패턴 등은 코드 품질을 높이고, 팀 협업을 촉진하며, 애플리케이션을 더욱 확장 가능하고 유지보수하기 쉽게 만들어 줍니다. 이러한 패턴들과 모범 사례들을 리액트 프로젝트에 적용하여 더 나은 애플리케이션을 만들 수 있습니다.

---

## 참고

> - [React Design Patterns](https://refine.dev/blog/react-design-patterns/)
