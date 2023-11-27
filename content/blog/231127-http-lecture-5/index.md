---
title: '모든 개발자를 위한 HTTP 웹 기본 지식 (5) - HTTP 헤더2: 캐시와 조건부 요청'
date: '2023-11-27T11:45:32.169Z'
description: '인프런의 모든 개발자를 위한 HTTP 웹 기본 지식 (김영한) 강의를 듣고 정리한 내용 (5)'
category: 'CS'
keywords: 'HTTP, 헤더, 캐시'
image: 'https://velog.velcdn.com/images/khy226/post/adde180c-690e-4291-9a44-8513e4762341/image.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/adde180c-690e-4291-9a44-8513e4762341/image.jpeg" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

> 본 게시글은 [인프런의 모든 개발자를 위한 HTTP 웹 기본 지식 (김영한)](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC) 강의를 듣고 정리한 내용입니다

웹 성능 최적화는 사용자 경험 향상을 위해 필수적인 과정 중 하나로, 이를 위해 캐시와 조건부 요청은 중요한 역할을 합니다. 이 글에서는 HTTP 헤더를 이용한 캐시 동작과 조건부 요청에 대해 더 자세히 살펴보겠습니다.

## 캐시: 기본 동작과 필요성

웹 페이지를 불러올 때, 매번 서버에서 모든 리소스를 다운로드하는 것은 비효율적입니다. 캐시는 브라우저가 이전에 받아온 리소스를 저장해두고, 동일한 요청이 발생할 때 다시 서버에 요청하지 않고 캐시된 데이터를 사용함으로써 네트워크 사용을 줄이고 로딩 속도를 높이는 역할을 합니다.

![](https://velog.velcdn.com/images/khy226/post/4be0aab0-49c0-4a79-b6e4-1d5e97a11f2e/image.png)

그러나 캐시된 데이터가 항상 최신 상태를 유지해야 하는 것은 아닙니다. 서버의 데이터가 변경되고 브라우저에 캐시된 데이터가 여전히 유효한 경우, 사용자는 오래된 정보를 보게 됩니다.

## 캐시가 있을 때의 동작

캐시를 효과적으로 사용하기 위해 서버는 HTTP 헤더를 통해 캐시 제어 정보를 전달합니다. `Cache-Control` 헤더를 이용하면 캐시 유효 시간을 설정할 수 있습니다.

![](https://velog.velcdn.com/images/khy226/post/3d57a829-cab3-4776-b2e3-195c64e207ea/image.png)

위의 예시에서는 캐시 유효 시간을 60초로 설정하고 있습니다. 브라우저는 이 정보를 활용하여 해당 시간 동안은 서버에 재요청 없이 캐시된 데이터를 사용합니다.

## 만약 캐시 시간이 만료된다면?

![](https://velog.velcdn.com/images/khy226/post/c4364998-1a10-4fe5-8fbb-1e30987926f9/image.png)

캐시 유효시간이 만료되면, 브라우저는 서버에 재요청하여 데이터를 갱신합니다. 이때, 서버에서 데이터가 변경되었는지 확인하는 데에 검증 헤더와 조건부 요청이 사용됩니다.

## 검증 헤더와 조건부 요청

캐시 유효시간이 초과된 후 서버에 재요청할 때, 서버는 데이터가 변경되지 않았다면 네트워크 다운로드를 최소화하기 위해 검증 헤더와 조건부 요청을 사용합니다.

![](https://velog.velcdn.com/images/khy226/post/474dc3b8-a8a6-46aa-b764-15a40b4ed682/image.png)

웹 브라우저는 이전에 받아온 데이터의 최종 수정일을 `Last-Modified` 헤더로 저장하고, 캐시 만료 후 서버에 재요청 시 이 값을 `if-modified-since` 헤더에 담아 전송합니다. 서버는 이 값을 이용해 데이터가 수정되었는지 확인하고, 수정이 없다면 304 Not Modified 응답을 반환하여 브라우저에게 데이터를 다시 받지 않아도 된다는 신호를 보냅니다.

이러한 검증 헤더를 통한 조건부 요청은 네트워크 사용을 최소화하며 빠른 로딩을 가능케 합니다.

## ETag와 If-None-Match

검증 헤더 중 ETag는 서버가 리소스에 부여한 임의의 고유 버전 이름입니다. 데이터가 변경될 때마다 ETag가 갱신되며, 이를 이용해 브라우저는 서버에 데이터가 변경되었는지 직접 확인합니다.

<table>
  <tbody>
    <tr>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/04a62460-1547-4efd-9ccd-0232eff8a6cb/image.png" alt="Accept-Language 적용 전" />
      </td>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/182f78ee-a6ad-484e-b866-f969337b00ae/image.png" alt="Accept-Language 적용 후" />
      </td>
    </tr>
  </tbody>
</table>

서버는 이전 응답에 포함된 ETag 값을 `if-none-match` 헤더로 받아와 사용하고, 데이터가 변경되지 않았다면 304 Not Modified 응답을 반환하여 브라우저에게 데이터를 재전송하지 않아도 된다는 신호를 보냅니다.

ETag와 If-None-Match는 캐시 제어 로직을 서버에서 완전히 분리할 수 있게 하며, 클라이언트는 캐시 로직에 대해 몰라도 됩니다.

## 캐시 제어 헤더

캐시와 관련된 중요한 헤더들이 있습니다.

### Cache-Control

`Cache-Control` 헤더는 캐시 제어에 가장 중요한 영향을 미치는 헤더입니다.

- max-age: 캐시 유효시간을 초 단위로 나타냅니다.
- no-cache: 데이터는 캐시해도 되지만, 항상 서버에 검증하고 사용해야 합니다.
- no-store: 데이터를 저장하면 안되며, 메모리에서만 빠르게 사용하고 삭제해야 합니다.

### Pragma

`Pragma` 헤더는 HTTP 1.0에서 사용되던 캐시 제어 헤더로, 현재는 거의 사용되지 않습니다. `no-cache` 지시어를 포함할 수 있습니다.

### Expires

`Expires` 헤더는 캐시 만료일을 지정하는데 사용됩니다. 초 단위가 아닌 정확한 날짜와 시간을 사용하며, `max-age` 보다 낡은 형식입니다.

## 프록시 캐시

프록시 캐시는 실제 데이터가 있는 서버를 원 서버라고 부르며, 중간에 위치한 프록시 캐시 서버를 통해 원 서버로부터 받은 리소스를 저장해둡니다.

![](https://velog.velcdn.com/images/khy226/post/2e5a42ff-d1da-4c4b-84d6-cc9eec183c9b/image.png)

프록시 캐시는 `private` 캐시와 `public` 캐시로 나뉩니다. private 캐시는 개별 사용자 브라우저에만 저장되며, public 캐시는 중간에 공용으로 사용하는 프록시 캐시 서버에 저장됩니다.

## 캐시 무효화

캐시가 항상 최신 상태를 유지해야 하는 경우, 캐시 무효화를 위한 헤더를 사용할 수 있습니다. 몇 가지 주요한 캐시 무효화 헤더는 다음과 같습니다.

- **Cache-Control: no-cache** - 데이터는 캐시해도 되지만, 항상 원 서버에 검증하고 사용해야 합니다.
- **Cache-Control: no-store** - 아예 캐시 되면 안될 때 사용합니다. (민감한 데이터 메모리에서만 사용하고 빨리 삭제)
- **Cache-Control: must-revalidate** - 캐시 만료 후 최초 조회시 원 서버에 검증해야 합니다. 원 서버 접근 실패시 반드시 오류 발생 하며 (504 gateway timeout), 캐시 유효 시간이라면 캐시를 사용합니다.
- **Pragma: no-cache** - HTTP 1.0 하위 호환 방식으로, 지금은 거의 사용되지 않습니다.

이러한 헤더를 사용하여 브라우저는 데이터를 항상 서버에 검증하고 사용하게 됩니다.

## 마무리

HTTP 캐시와 조건부 요청은 웹 성능 최적화에서 중요한 역할을 합니다. 올바른 캐시 전략과 조건부 요청을 통해 네트워크 사용을 최소화하고 빠른 로딩을 실현할 수 있습니다. 특히 캐시 제어 헤더와 프록시 캐시를 효과적으로 활용하면 사용자 경험을 향상시킬 수 있습니다.
<br />

---

# 참고

> - [모든 개발자를 위한 HTTP 웹 기본 지식 - 김영한](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/dashboard)
