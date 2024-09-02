---
title: '구글 시크릿 모드 작동 원리'
date: '2024-09-03T11:45:32.169Z'
description: '구글 시크릿 모드는 어떤 방식으로 동작하는걸까?'
category: 'Network'
keywords: 'incognito, session, cookie, google, secret'
image: 'https://velog.velcdn.com/images/khy226/post/2f9b0a87-064e-497e-81cc-65e1fe512106/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/2f9b0a87-064e-497e-81cc-65e1fe512106/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

외부에서 인터넷을 사용할 때 주로 시크릿 모드를 사용해서 웹서핑을 하곤 했는데, 도대체 구글 시크릿 모드는 어떻게 개인 정보를 남기지 않는건지 의문이 들었다. 공식 문서와 블로그 글을 찾아보니 아래와 같이 동작한다는 흥미로운 내용이 있어서 정리를 하게 되었다.

## 구글 시크릿 모드 작동 원리

구글 크롬의 시크릿 모드(Incognito Mode)는 브라우징할 때 기록을 남기지 않게 해주는 기능이다. 예를 들어, 방문 기록, 쿠키, 사이트 데이터 같은 것들이 로컬에 저장되지 않아서 공용 컴퓨터에서 민감한 검색을 할 때 유용하다. 하지만 시크릿 모드가 데이터를 완전히 보호해주는 건 아니다. 네트워크 관리자나 ISP는 여전히 네트워크 수준에서 브라우징 활동을 추적할 수 있다고 한다.

이번 글에서는 구글 시크릿 모드가 어떻게 작동하는지, 로그인할 때 어떤 식으로 동작하는지, 그리고 각 탭과 창이 어떻게 정보를 공유하는지 구체적으로 알아보자.

![](https://velog.velcdn.com/images/khy226/post/2f9b0a87-064e-497e-81cc-65e1fe512106/image.png)

### 시크릿 모드의 기본 동작 원리

시크릿 모드의 기본 동작 원리는 아래와 같다:

> 시크릿 모드를 처음 열면 새로운 시크릿 세션이 생성된다. 이후 열리는 모든 시크릿 창과 탭은 같은 세션을 공유하게 된다. 그리고 모든 시크릿 창과 탭을 닫으면 세션이 종료되면서 해당 세션의 모든 데이터가 삭제된다.

1. **데이터 관리:**

   - 시크릿 모드에서 생성된 데이터(쿠키, 캐시, 세션 데이터 등)는 일반 모드와 독립적으로 관리된다.
   - 이 데이터는 시크릿 세션이 활성화된 동안에만 유지되며, 시크릿 창이 모두 닫히면 자동으로 삭제된다.

2. **프라이버시 보호:**
   - 시크릿 모드는 로컬 기기에 데이터를 저장하지 않아서 브라우징 기록, 양식 데이터, 쿠키 등을 시크릿 모드를 닫으면 지워준다.
   - 하지만 ISP, 고용주, 학교 등의 네트워크 관리자나 방문한 웹사이트에서는 여전히 사용자의 활동을 추적할 수 있다.

### 시크릿 모드에서 로그인할 때 어떻게 동작하는가

시크릿 모드에서 로그인하면, 로그인 상태는 주로 **쿠키**를 통해 관리된다. 시크릿 모드의 모든 탭과 창이 동일한 세션을 공유하기 때문에, 한 탭에서 로그인하면 다른 시크릿 탭과 창에서도 로그인된 상태가 유지된다.

- **쿠키를 통한 로그인 상태 유지:**  
  시크릿 모드에서 로그인하면 로그인 정보는 쿠키에 저장된다. 이 쿠키는 시크릿 모드 내의 모든 탭과 창이 공유하는 세션 쿠키다. 그래서 한 시크릿 탭에서 로그인하면 다른 모든 시크릿 탭에서도 해당 로그인 상태가 반영된다.

- **세션의 독립성:**  
  시크릿 모드의 쿠키는 일반 모드와 분리되어 관리되기 때문에, 시크릿 모드에서 로그인해도 일반 모드의 브라우징 세션에는 영향을 주지 않는다.

- **세션 종료:**  
  시크릿 모드의 모든 창을 닫으면 세션이 종료되면서 쿠키를 포함한 모든 세션 데이터가 삭제된다. 이는 사실상 로그아웃 효과와 동일하다.

  > 추가) 시크릿 모드에서 구글에 로그인한 상태로 로컬 스토리지와 세션 스토리지의 데이터를 모두 삭제해도 로그인이 유지된다. 하지만 쿠키 데이터를 모두 지우면 로그인이 풀리면서 자동으로 로그아웃된다. 이를 통해 시크릿 모드에서는 로그인 정보를 쿠키로 관리한다고 볼 수 있다.

### 시크릿 모드에서의 스토리지 동작 방식

시크릿 모드에서도 세션 스토리지와 로컬 스토리지를 사용할 수 있지만, 이들 역시 시크릿 모드의 세션 동안에만 유지된다. 시크릿 모드 창을 닫으면 해당 스토리지에 저장된 데이터도 삭제되며, 다른 시크릿 세션이나 일반 모드와는 공유되지 않는다.

- **세션 스토리지:**  
  각 시크릿 탭은 자체의 세션 스토리지를 가지며, 탭이 닫히면 해당 데이터는 삭제된다.

- **로컬 스토리지:**  
  시크릿 모드에서도 로컬 스토리지를 사용할 수 있지만, 시크릿 모드의 세션이 종료되면 데이터가 삭제된다.

- **쿠키와의 차이:**  
  쿠키는 시크릿 모드의 모든 탭과 창에서 공유되며, 시크릿 모드 세션 동안에만 유지된다. 시크릿 창이 닫히면 쿠키도 삭제된다.

### 시크릿 모드의 세션 관리 코드 예시

간단한 예제로 시크릿 모드의 세션 관리 방식을 설명해 보자. 아래는 시크릿 모드에서 세션을 관리하는 시뮬레이션 코드다.
(\*실제 코드는 아니고 여러 글과 GPT 설명을 기반으로 만든 개념 모델이다)

```javascript
class IncognitoSessionManager {
  constructor() {
    this.sessionCount = 0 // 시크릿 모드 세션의 개수를 추적
    this.sessions = new Map() // 각 세션의 상태를 관리하는 Map 객체
  }

  // 시크릿 창 열기
  openIncognitoWindow() {
    this.sessionCount++
    console.log(`Opened Incognito window. Total sessions: ${this.sessionCount}`)
    this.sessions.set(this.sessionCount, {}) // 새로운 세션 데이터를 생성
  }

  // 시크릿 창 닫기
  closeIncognitoWindow() {
    if (this.sessionCount > 0) {
      this.sessions.delete(this.sessionCount) // 세션 삭제
      this.sessionCount--
      console.log(`Closed Incognito window. Total sessions: ${this.sessionCount}`)
    }

    // 모든 세션이 닫혔을 때 데이터 삭제
    if (this.sessionCount === 0) {
      console.log('All Incognito windows are closed. Clearing session data.')
      this.clearSessionData()
    }
  }

  // 세션 데이터 삭제
  clearSessionData() {
    // 메모리 내 세션 데이터를 삭제
    console.log('Session data cleared.')
  }
}

// 세션 관리 시뮬레이션
const incognitoManager = new IncognitoSessionManager()

// 시크릿 창 열기 시뮬레이션
incognitoManager.openIncognitoWindow() // 첫 번째 창 열기
incognitoManager.openIncognitoWindow() // 두 번째 창 열기

// 시크릿 창 닫기 시뮬레이션
incognitoManager.closeIncognitoWindow() // 첫 번째 창 닫기
incognitoManager.closeIncognitoWindow() // 마지막 창 닫기
```

### 코드 설명

- **세션 열기와 닫기:**  
  `openIncognitoWindow` 메서드는 새로운 시크릿 세션을 열고, 세션 카운트를 증가시킨다. `closeIncognitoWindow` 메서드는 시크릿 창을 닫으며, 세션 카운트를 감소시킨다.

- **데이터 삭제:**  
  모든 시크릿 창이 닫히면 `clearSessionData` 메서드를 호출하여 메모리 내의 모든 세션 데이터를 삭제한다.

- **참조 카운트:**  
  참조 카운트 방식은 세션의 생명주기를 관리한다. 세션이 종료되면 관련 데이터가 삭제되도록 관리하는 방식이다.

### 시크릿 모드의 한계

1. **로그인한 상태의 추적:**  
   시크릿 모드에서 웹사이트에 로그인하면 해당 사이트는 사용자를 인식할 수 있다. 예를 들어, Gmail이나 Facebook에 로그인하면 이 사이트들은 사용자의 활동을 추적할 수 있다.

2. **네트워크 레벨 추적:**  
   ISP, 고용주, 학교 네트워크 관리자 등은 여전히 사용자의 인터넷 활동을 모니터링할 수 있다. 시크릿 모드는 로컬 기기에만 데이터를 저장하지 않을 뿐, 네트워크 레벨에서의 보호는 제공하지 않는다.

3. **광고 추적:**  
   시크릿 모드에서 브라우징하더라도, 광고주는 사용자가 방문한 사이트와 활동에 기반하여 광고를 제공할 수 있다. 세션이 종료되면 이러한 데이터는 초기화되지만, 세션 동안에는 광고 추적이 가능하다.

### 시크릿 모드를 제대로 사용하려면?

- **개인 정보 보호:**  
  공용 컴퓨터나 다른 사람이 사용하는 기기에서 민감한 정보를 검색할 때 유용하다. 브라우징 기록을 남기지 않으므로 다른 사용자가 이를 확인할 수 없다.

- **로그인 주의해서 사용:**  
  시크릿 모드에서 로그인할 때는 여전히 사이트가 사용자를 인식할 수 있으므로 로그인하지 않는 것이 좋다.

- **세션 종료:**  
  시크릿 모드의 모든 창을 닫아야 세션이 종료되고 모든 데이터가 삭제된다. 하나의 창이나 탭만 닫으면 세션이 유지된다.

### 결론

구글 크롬의 시크릿 모드는 기본적인 프라이버시 보호 기능을 제공하지만, 완전한 익명성을 보장하지는 않는다. 시크릿 모드가 데이터를 기기에 저장하지 않음으로써 로컬 프라이버시를 보호하는 것은 유용하지만, 네트워크 레벨이나 사이트의 추적을 피하려면 추가적인 보안 조치(예: VPN, 프록시 등)가 필요하다. 시크릿 모드의 기능과 한계를 명확히 이해하고 올바르게 사용하는 것이 중요하다.

---

## 참고

- [How Chrome Incognito keeps your browsing private](https://support.google.com/chrome/answer/9845881?hl=en#zippy=%2Chow-incognito-mode-works%2Chow-incognito-mode-protects-your-privacy)
- [What Is Incognito Mode – And Is It Safe To Use In 2024?](https://www.forbes.com/advisor/in/internet/what-is-incognito-mode/)
- [What Does Browsing in Incognito Mode Really Do?](https://computer.howstuffworks.com/incognito-mode.htm)
- ChatGPT-4 답변 참고
