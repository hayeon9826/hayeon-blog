---
title: 브라우저에 url을 입력하면 어떤일이 벌어질까?
date: '2021-09-27T22:40:32.169Z'
description: maps.google.com을 입력하면..?
category: 'CS'
image: 'https://velog.velcdn.com/images/khy226/post/b5d2bf34-215c-42cd-bbd2-87c700c6dd34/35200f65cb4727f66ad07de2a3a7fe9fcfe7e7b37e9e432329952508404578ccbbf496822dbdf0cc129bad6610bbc6f26312c2729cdd7ea665a81df1875a0d0c8792ab2cdbc9c2886f559ce22a825173.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/b5d2bf34-215c-42cd-bbd2-87c700c6dd34/35200f65cb4727f66ad07de2a3a7fe9fcfe7e7b37e9e432329952508404578ccbbf496822dbdf0cc129bad6610bbc6f26312c2729cdd7ea665a81df1875a0d0c8792ab2cdbc9c2886f559ce22a825173.jpeg" style="width: 50%; padding-bottom: 50px;">

<small>\* 해당 포스트는 [What happens when you type a URL in the browser and press enter?](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a) 를 번역 & 정리한 글 입니다. </small>

<hr>

**_"브라우저에 maps.google.com을 입력하면 어떤 일이 벌어지나요?" _**

기술 면접을 준비하다보면 이 질문을 한번쯤 들어본다. 간단한 질문 같지만, 인터넷이 어떻게 작동하는지 기본적인 이해를 할 수 있는 질문이다.

브라우저에 maps.google.com을 입력했을 때 일어나는 일들을 여덟 단계로 정리할 수 있다.

> 1. **브라우저 주소창**에 maps.google.com을 입력한다.
> 2. 브라우저가 maps.google.com의 **IP 주소**를 찾기 위해 **캐시**에서 **DNS 기록**을 확인한다.
> 3. 만약 요청한 URL(maps.google.com)이 캐시에 없다면, **ISP의 DNS 서버**가 **DNS 쿼리로** maps.google.com을 **호스팅**하는 서버의 IP 주소를 찾는다.
> 4. 브라우저가 해당 서버와 **TCP 연결**을 시작한다.
> 5. 브라우저가 웹서버에 **HTTP 요청**을 보낸다.
> 6. 서버가 요청을 처리하고 **응답**을 보낸다.
> 7. 서버가 **HTTP 응답**을 보낸다.
> 8. 브라우저가 **HTML** 컨텐츠를 보여준다.

<hr>

### 1. 브라우저 주소창에 maps.google.com을 입력한다.

![](https://images.velog.io/images/khy226/post/6ba4f021-1ab5-4a24-af9a-59ed51925e0b/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-26%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.02.51.png)

주소창에 maps.google.com을 입력해보자!

<hr>

### 2. 브라우저가 maps.google.com의 IP 주소를 찾기 위해 캐시에서 DNS 기록을 확인한다.

DNS(Domain Name System)는 인터넷 전화번호부와 같다. DNS는 웹사이트의 IP 주소와 도메인 주소를 연결해주는 시스템이다. 인터넷의 모든 URL에는 고유한 IP 주소가 할당되어 있으며, IP 주소는 액세스 요청 웹 사이트의 서버를 호스트하는 컴퓨터에 속한다. 예를 들어, www.google.com의 IP 주소는 142.250.196.110이다. 따라서 원하는 경우 브라우저에서 https://142.250.196.110 를 입력하여 www.google.com에 접속할 수 있다.

> 참고: 터미널에서 `nslookup google.com` 를 치면 해당 ip 주소가 나온다.

DNS의 주요 목적은 사람들이 쉽게 사이트 주소를 찾을 수 있도록 도와주는 것이다. 만약 DNS가 없다면 google.com과 같이 도메인 주소가 아닌, 142.250.196.110 라는 ip 주소를 하나하나 외워서 사이트에 접속할 수 있다. 모든 사이트를 IP 주소로만 접속해야 한다면 정말 어렵지 않을까? 이를 해결하기 위해 DNS를 이용한다. DNS 가 자동으로 URL과 IP 주소를 매핑해주기 때문에, 쉽게 원하는 사이트에 접속할 수 있다.

DNS 기록을 찾기 위해서, 브라우저는 네 개의 캐시를 확인한다.

- 첫 번째, DNS 쿼리는 우선 브라우저 캐시를 확인한다. 브라우저는 내가 이전에 방문한 웹 사이트의 DNS 기록을 일정 기간 동안 저장하고 있다.

- 두 번째, 브라우저는 OS 캐시를 확인한다. 브라우저 캐시에 원하는 DNS 레코드가 없다면, 브라우저가 내 컴퓨터 OS에 시스템 호출(ex. 윈도우에서 `gethostname` 호출)을 통해 DNS 기록을 가져온다. (OS도 DNS 레코드 캐시를 저장하고 있다.)

- 세 번째, 브라우저는 라우터 캐시를 확인한다. 만약 컴퓨터에도 원하는 DNS 레코드가 없다면, 브라우저는 라우터에서 DNS 기록을 저장한 캐시를 확인한다.

- 마지막으로, ISP 캐시를 확인한다. 만약 위 모든 단계에서 DNS 기록을 찾지 못한다면, 브라우저는 ISP에서 DNS 기록을 찾는다. ISP(Internet Service Provider)는 **DNS 서버**를 가지고 있는데, 해당 서버에서 DNS 기록 캐시를 검색할 수 있다.

> **DNS(Domain Name Server) 서버**는 할당된 도메인 영역에 대한 정보를 가지고 있는 서버로, 주로 도메인을 IP주소로 변환하는 역할을 한다.

왜 이렇게 많은 **캐시**가 유지되고 있을지 의문을 가질 수 있다. 캐싱된 정보가 개인 정보 보호에는 위험할 수 있지만, 캐시는 **네트워크 트래픽을 규제**하고 **데이터 전송 시간을 개선**하는 데 필수적이다.

<hr>

### 3. 만약 요청한 URL(maps.google.com)이 캐시에 없다면, ISP의 DNS 서버가 DNS 쿼리로 maps.google.com을 호스팅하는 서버의 IP 주소를 찾는다.

앞에서 언급했듯이 내 컴퓨터가 maps.google.com을 호스트하는 서버와 연결하려면 maps.google.com의 IP 주소가 필요하다. **DNS 쿼리**의 목적은 웹 사이트에 대한 올바른 IP 주소를 찾을 때까지 인터넷에서 여러 DNS 서버를 검색하는 것이다. 필요한 IP 주소를 찾거나, 찾을 수 없다는 오류 응답을 반환할 때까지 한 DNS 서버에서 다른 DNS 서버로 검색이 반복적으로 계속되기 때문에 이 유형의 검색을 **재귀적 질의(Recursive Query)**라고 한다.

이러한 상황에서, 우리는 ISP의 DNS 서버를 **DNS 리커서(DNS Recursor)**라고 부르는데, DNS 리커서는 인터넷의 다른 DNS 서버에 답변을 요청하여 의도된 도메인 이름의 적절한 IP 주소를 찾는 일을 담당한다. 다른 DNS 서버는 웹사이트 도메인 이름의 도메인 아키텍처를 기반으로 DNS 검색을 수행하므로 **네임 서버(Name Server)**라고 한다.

그렇다면 도메인 아키텍처란 어떻게 구성되어 있을까?

![domain architechture](https://webhostinggeeks.com/guides/dns/structure2.png)

> 사진 출처: [Domain Name System: Complicated technology explained in simple terms](https://webhostinggeeks.com/guides/dns/structure2.png)

오늘날 많은 웹 사이트 URL은 3차 도메인, 2차 도메인 및 최상위 도메인(TLD: Top Level Domain)으로 이뤄진다. 각 단계에는 **DNS 룩업(lookup)** 도중에 쿼리되는 고유한 네임 서버가 있다.

> **DNS Lookup** 이란 DNS 서버에서 인터넷 도메인 이름을 사용해 인터넷 주소 (ip)를 알아내는 과정이다.

국내 도메인의 경우도 마찬가지이다. 아래와 같이 도메인은 수직적으로 나뉘어져 있다. 예를 들어, kr도메인에는 or영역을 표현하는 or.kr 도메인이 포함되어 있고, or.kr 도메인에는 kisa.or.kr 도메인이 포함되어 있다.
![도메인 체계](https://한국인터넷정보센터.한국/images/domain/imgDomainSys02.gif)

> 그림 출처: [그림으로 보는 도메인 체계](https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/resources/dns/dnsInfo.jsp)

그렇다면 다시 maps.google.com 으로 돌아와보자. maps.google.com의 경우 먼저 DNS 리커서가 **루트 네임 서버(Root Name Server)**에 연결한다. 루트 이름 서버는 리커서를 **`.com` 도메인 네임 서버**로 리디렉션한다. `.com` 네임 서버는 **`google.com` 네임 서버**로 리디렉션한다. `google.com` 네임 서버는 DNS 기록에서 `maps.google.com`과 일치하는 IP 주소를 찾아 **DNS 리커서**로 반환하고, 리커서는 이를 **브라우저**로 다시 보낸다.

위와 같은 요청(Request)은 내용 및 IP 주소(DNS 리커서의 IP 주소)와 같은 정보를 작은 **데이터 패킷**에 담겨 전송된다. 이 패킷은 올바른 DNS 서버에 도달하기 전에 클라이언트와 서버 사이의 여러 **네트워킹 장비**를 통해 이동한다. 이 장비는 **라우팅 테이블**을 사용하여 패킷이 목적지에 도달할 수 있는 가장 빠른 방법을 알아낸다. 만약 이동 도중에 패킷이 손실되면, **요청 실패 오류**가 발생한다. 그렇지 않으면 올바른 DNS 서버에 도달하여 IP 주소를 가져온 후 브라우저로 돌아간다.

<hr>

### 4. 브라우저가 해당 서버와 TCP 연결을 시작한다.

브라우저가 올바른 IP 주소를 수신하면 IP 주소와 일치하는 서버와 **연결**해 정보를 전송한다. 브라우저는 **인터넷 프로토콜**(IP, Internet Protocol)을 사용하여 이러한 연결을 구축한다. 사용할 수 있는 여러가지 인터넷 프로토콜이 있지만, 일반적으로 HTTP 요청에서는 **TCP(Transmission Control Protocol)** 라는 **전송 제어 프로토콜**을 사용한다.

> **인터넷 프로토콜(**IP, Internet Protocol)은 송신 호스트와 수신 호스트가 **패킷 교환 네트워크**(패킷 스위칭 네트워크, Packet Switching Network)에서 정보를 주고받는 데 사용하는 정보 위주의 **규약**(프로토콜, Protocol)이며, OSI 네트워크 계층에서 호스트의 주소지정과 패킷 분할 및 조립 기능을 담당한다. 줄여서 **아이피(IP)**라고도 한다. (출처: 위키피디아)

내 컴퓨터(클라이언트)와 서버 간에 데이터 패킷을 전송하려면 **TCP 연결**을 해야 한다. 이 연결은 TCP/IP **3-way handshake**라는 연결 과정을 통해 이뤄진다. 클라이언트와 서버가 **SYN**(synchronize: 연결 요청) 및 **ACK**(acknowledgement: 승인) 메시지를 교환하여 연결을 설정하는 3단계 프로세스이다.

1. 클라이언트는 인터넷을 통해 서버에 **SYN 패킷**을 보내 새 연결이 가능한지 여부를 묻는다.

2. 서버에 새 연결을 수락할 수 있는 열린 포트가 있는 경우, **SYN/ACK 패킷**을 사용하여 SYN 패킷의 ACK(승인)으로 응답한다.
3. 클라이언트는 서버로부터 SYN/ACK 패킷을 수신하고 **ACK 패킷**을 전송하여 승인한다.

![tcp connetion](https://www.techopedia.com/images/uploads/ad900dc1-ad94-4c7b-a3f8-154ad27c35f1.png)

> 사진 출처: [Three-Way Handshake - Techopedia](https://www.techopedia.com/definition/10339/three-way-handshake)

이제 데이터 전송을 위한 **TCP 연결**이 설정되었다!

<hr>

### 5. 브라우저가 웹서버에 HTTP 요청을 보낸다.

TCP 연결이 설정되면 데이터 전송이 시작된다! 브라우저는 maps.google.com 웹 페이지를 요청하는 GET 요청을 보낼 것이다.

만약 자격 증명(credentials)을 입력하거나 form을 제출하는 경우 POST 요청을 사용할 수 있다. 이 요청에는 브라우저 식별(User-Agent 헤더), 수락할 요청 유형(Accept 헤더) 및 추가 요청을 위해 TCP 연결을 유지하라는 연결 헤더와 같은 추가 정보도 포함된다. 또한 브라우저가 이 도메인에 대해 저장한 쿠키에서 가져온 정보도 전달한다.

GET 요청은 아래와 같다:
![](https://images.velog.io/images/khy226/post/5a45f724-f443-4c35-8c62-ade5b3e3e9cb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.29.49.png)

(인터넷이 어떻게 작동되는지 궁금하다면, 개발자 도구를 켜서 HTTP 요청 헤더를 확인해볼 수 있다.)

<hr>

### 6. 서버가 요청을 처리하고 응답(response)을 보낸다.

서버에는 **웹 서버**(예: Apache, IIS)가 포함되어 있는데, 이는 브라우저로부터 **요청을 수신**하고, 해당 내용을 request handler에 전달하여 응답을 읽고 생성하는 역할을 한다. **Request handler**는 요청, 요청의 헤더 및 쿠키를 읽고 필요한 경우 서버의 정보를 업데이트하는 프로그램이다(NET, PHP, Ruby, ASP 등으로 작성됨). 그런 다음 response를 특정 포맷으로(JSON, XML, HTML)으로 작성한다.

<hr>

### 7. 서버가 HTTP 응답을 보낸다.

서버 응답에는 요청한 웹 페이지와 함께 상태 코드(status code), 압축 유형(Content-Encoding), 페이지 캐싱 방법(Cache-Control), 설정할 쿠키, 개인 정보 등이 포함 된다.

서버의 HTTP 응답 예시이다:

![](https://images.velog.io/images/khy226/post/f51ea757-1bd1-45b3-b6bc-17cd82035c0c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.48.43.png)

위의 응답을 보면 'Status Code' 헤더에 상태 코드가 숫자로 표시된다. 이것은 우리에게 response의 상태를 알려주기 때문에 매우 중요하다. 숫자 코드를 사용하여 HTTP 응답 결과를 다섯 가지 상태로 나타낸다.

- **1xx (Information Response)**: 정보 메시지만을 나타낸다. 서버가 요청을 받았으며 서버에 연결된 클라이언트는 계속해서 작업을 하라는 뜻.
- **2xx (Successful Response)**: 서버와의 요청이 성공함을 나타냄
- **3xx (Redirection Message) **: 요청 완료를 위해 추가 작업 조치가 필요함을 의미함. 위 사진의 **301(Moved Permantly)**는 요청한 리소스의 URI가 변경 되었음을 뜻한다.
- **4xx (Client Error Response) **: 클라이언트의 Request에 에러가 있음을 의미함.
- **5xx (Server Error) **: 서버 측의 오류로 request를 수행할 수 없음.

따라서 오류가 발생한 경우 HTTP 응답을 확인하여 수신한 상태 코드의 유형을 확인할 수 있다.

<hr>

### 8. 브라우저가 HTML 컨텐츠를 보여준다.

브라우저는 응답받은 HTML을 화면에 단계별로 표시한다. 첫째, HTML 골격을 렌더링한다. 그런 다음 HTML 태그를 확인하고 이미지, CSS 스타일시트, 자바스크립트 파일 등과 같은 웹 페이지의 추가 요소에 대한 GET 요청을 보낸다. 정적 파일(Static File)은 브라우저에서 캐싱되므로 다음에 페이지를 방문할 때 다시 가져올 필요가 없다. 그리고 마지막으로, maps.google.com 페이지가 브라우저에 나타난다.

![](https://images.velog.io/images/khy226/post/911f0aa0-1d68-4115-ae7c-e0c83ea7a461/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-27%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.59.41.png)

<hr>

**_"브라우저에 maps.google.com을 입력하면 어떤 일이 벌어지나요?"_**

단순해 보이지만, 인터넷 작동 원리에 대한 기본적인 이해를 할 수 있어야 답할 수 있는 질문이다. url을 입력하고 2초도 안되는 시간동안 컴퓨터가 정말 여러가지 일을 한다는 사실을 배울 수 있어서 재미있었다.

해당 글을 정리하면서 네트워크가 어떻게 작동하는지 얕게나마 배울 수 있었고 네트워크 지식을 더 쌓아야 겠다는 생각이 들었다.

<br>
<br>

> 참고:

- [What happens when you type a URL in the browser and press enter?](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a)
- [DNS란 무엇입니까? | DNS 작동 원리](https://www.cloudflare.com/ko-kr/learning/dns/what-is-dns/)
- [DNS란? - 한국인터넷정보센터(KRNIC)](https://xn--3e0bx5euxnjje69i70af08bea817g.xn--3e0b707e/jsp/resources/dns/dnsInfo.jsp)
