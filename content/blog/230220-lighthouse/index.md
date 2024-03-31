---
title: 'Lighthouse로 웹 성능 측정하고 개선하기'
date: '2023-02-20T11:45:32.169Z'
description: 'Lighthouse로 웹 성능을 측정하고 개선해보자.'
category: 'Javascript'
keywords: 'lighthouse, 성능, 최적화'
image: 'https://velog.velcdn.com/images/khy226/post/54000f69-7041-42c8-bcb8-d322c084c46e/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/54000f69-7041-42c8-bcb8-d322c084c46e/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;" alt="thumbnail"/>

# 들어가며

최근 웹 및 웹앱 어플리케이션은 데이터 통신, 복잡한 UI 및 애니메이션으로 더욱 화려해지고 있으며 크고 무거워졌습니다. 무거워진 웹 로딩은 사용자 경험을 떨어뜨리기 때문에 성능 체크가 매우 중요해졌습니다. 특히, Pinterest의 경우 성능 최적화를 통해 매출을 40%로 증가시켰다고 하는데요, 성능이 매출과 직결되는 만큼 성능 최적화는 웹 서비스에서 피할 수 없는 요소입니다.

본 게시글은 아래와 같은 방법으로 웹페이지 성능 측정 및 개선 방법을 확인해보려고 합니다.

<br />

1. 크롬 Lighthouse를 통해 성능 체크
2. 초기 정적 페이지 로딩 최적화
3. 웹 페이지 렌더링 최적화
4. 서버 데이터 요청 최적화

<br />

> Lighthouse와 관련된 글은 [숨고 - Lighthouse로 웹사이트 성능 측정하기](https://blog.soomgo.com/blog/website-benchmark-with-lighthouse/) 글을 주로 참고하였고, 성능 최적화와 관련된 글은 [Toast UI - 성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE) 글을 주로 참고했습니다.

<br />

# Lighthouse를 이용한 성능 체크

## 성능 측정 기준

> 사실 Lighthouse 이외에도 직접 개발자 도구의 Performance 탭이나 Network 탭에서 DOMContentLoaded이벤트와 load 이벤트를 측정할 수 있습니다. 다만, 개발 패러다임이 변화하면서 DOMContentLoaded, load 이벤트 발생 시점만 가지고 성능을 판단하기 어려워졌고, 특히 SPA에서는 이벤트 발생후에도 많은 스크립트 때문에 ‘느린 로딩’문제가 발생하여 측정 기준이 모호해 졌습니다. 따라서 사용자 기준의 성능 측정 방식이 필요하게 되었습니다.

![dom loaded](https://velog.velcdn.com/images/khy226/post/b062b992-5a79-43a0-a98b-4110827338ea/image.png)

> <small>이미지 출처: [Critical Rendering Path](https://web.dev/critical-rendering-path/)</small>

<br />

**사용자 기준의 성능 측정**은 사용자에게 콘텐츠를 보여주는 여러 시점을 기반으로 하는데, 의미 있는 콘텐츠가 처음 보이는 시점이 빠를수록 성능이 좋다고 판단합니다. 위 사진처럼 DOMContentLoaded, load 이벤트가 같은 시점에 발생했으나, 사용자 기준에서 성능 최적화가 잘된 페이지(위)가 훨씬 ‘빠르다’고 느낍니다.

구글에서는 이렇게 사용자가 웹 페이지 로딩이 빠르다, 느리다를 느낄 수 있는 여러 순간을 정의하고 성능을 측정하는 지표로 사용합니다.

- **FP(First Paint)**: 흰 화면에서 화면에 무언가가 처음으로 그려지기 시작하는 순간이다.
- **FCP(First Contentful Paint)**: 텍스트나 이미지가 출력되기 시작하는 순간이다.
- **FMP(First Meaningful Paint)**: 사용자에게 의미 있는 콘텐츠가 그려지기 시작하는 첫 순간이다. 콘텐츠를 노출하는데 필요한 CSS, 자바스크립트 로드가 시작되고 스타일이 적용되어 주요 콘텐츠를 읽을 수 있다.
- **TTI(Time to Interactive)**: 자바스크립트의 초기 실행이 완료되어서 사용자가 직접 행동을 취할 수 있는 순간이다.

<br />

위 성능 지표를 측정하기 위해서는 크게 두가지 정도가 있습니다. 첫번째는 크롬 개발자 도구의 Network, Performance 탭을 사용해서 직접 페이지 렌더링을 분석하는 방법이고, 두번째는 크롬 확장 도구인 Lighthouse를 추가하여 사용자 기준의 성능 측정 지표를 확인하는 방법입니다.

<br />

## Lighthouse란?

Lighthouse는 구글에서 제공하는 웹 페이지 품질 개선을 위한 오픈 소스로 자동화 도구입니다. 일반 퍼블릭 웹 페이지 또는 인증이 필요한 페이지 등 모든 웹 페이지에 실행할 수 있습니다. Lighthouse는 사이트의 성능, 접근성, SEO 등에 대한 전반적인 진단을 해줍니다.

각 카테고리가 측정하는 내용은 아래와 같습니다.

<table>
  <thead>
    <tr>
      <th style="text-align: center">카테고리</th>
      <th style="text-align: center">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> Performance</td>
       <td>웹 페이지의 로딩 속도 등 실제 성능을 측정</td>
    </tr>
    <tr>
      <td> Best practices</td>
       <td>Best practices를 따라 개발되었는지 확인</td>
    </tr>
    <tr>
      <td> Accessibility</td>
       <td>접근성 확인. 폰트 사이즈, 메뉴간 간격 등을 측정</td>
    </tr>
    <tr>
      <td> Progressive Web App (PWA)</td>
       <td>웹과 네이티브 앱의 기능 모두의 이점을 가지도록 만들어진 서비스인지 체크</td>
    </tr>
    <tr>
      <td> SEO</td>
       <td>Search Engine Optimization의 약자로 검색 엔진 수집 최적화 측정</td>
    </tr>
  </tbody>
</table>

관련된 설명은 [Lighthouse Overview 공식 문서](https://developer.chrome.com/docs/lighthouse/overview/)에서 더 자세히 확인할 수 있습니다.

<br />

## Lighthouse 사용법

사용법은 간단합니다. 구글 크롬 웹스토어에서 Lighthouse 설치 후, 개발자 도쿠를 켜서 lighthouse > 리포트 생성을 눌러주시면 됩니다.

<br />

- Lighthouse 크롬 확장 프로그램을 설치합니다.

![lighthouse](https://velog.velcdn.com/images/khy226/post/6f2b9e1f-ba22-4409-9626-1dd37b9ee43e/image.png)

<br />

- 측정할 웹페이지로 이동해서 개발자 도구를 열어줍니다.
- 저는 블로그 성능 측정도 할 겸 블로그의 모바일 메인 페이지를 분석해보았습니다.

![](https://velog.velcdn.com/images/khy226/post/62b66a89-729d-497f-9bda-ca91a9a52152/image.png)

<br />

- lighthouse 탭에서 generate report 버튼을 클릭합니다. 측정을 원하는 카테고리와 디바이스 (모바일 / 데스크탑)를 선택할 수 있습니다.
- 버튼을 클릭하면 현재 페이지가 자동으로 리로드되며 성능 측정이 진행됩니다.

<img src="https://velog.velcdn.com/images/khy226/post/8ca667fe-7099-4639-922f-3fe2b49fa5ab/image.png" style="width: 60%; margin: 0 auto;"/>

<br />

- 성능 검사가 완료되면 검사 리포트가 생성됩니다.

![](https://velog.velcdn.com/images/khy226/post/3e2f6fe9-8c36-4ee7-9f6b-6571662aadf8/image.png)

<br />

성능 검사가 완료되면 카테고리별 (performance, accessibility, best practices, SEO, PWA) 점수, 계산 방식, 최적화 방안등이 노출됩니다. 해당 결과는 Lighthouse 탭에서 바로 확인할 수 있고, json 등으로 저장해서 [Lighthouse Report Viewer](https://googlechrome.github.io/lighthouse/viewer/) 사이트에서 이전 결과들을 다시 확인 할 수 있습니다.

<br />

## 블로그 웹 페이지 Lighthouse 성능 측정 결과

아래는 블로그 웹 페이지 성능을 데스트탑 / 모바일 디바이스에서 측정한 결과입니다. 예시로 측정한 블로그에는 그다지 큰 이미지나 파일이 없고, 단순히 Gatsby를 사용한 SSG 사이트라 그런지 비교적 퍼포먼스가 잘 나오는 것을 확인할 수 있습니다. 다만 Resume 모바일 페이지는 퍼포먼스가 77점으로 개선할 필요가 있어보입니다.

> 참고: Lighthouse 모바일의 경우 네트워크 속도를 최대 4배정도 느리게 측정하기 때문에 모바일 Performance가 비교적 낮게 나옵니다.

<br />

<table>
  <thead>
    <tr>
      <th style="text-align: center; width: 80px;">페이지</th>
      <th style="text-align: center">데스크톱</th>
      <th style="text-align: center">모바일</th>
    </tr>
  </thead>
  <tbody style="text-align: center">
    <tr>
      <td> 홈</td>
      <td> 
        <img src="https://velog.velcdn.com/images/khy226/post/e69c80f8-d4cf-4036-a0bb-0218b52ceace/image.png" style="width: 80%; margin:0 auto;"/>
      </td>
      <td>        
        <img src="https://velog.velcdn.com/images/khy226/post/1bbde393-e0df-4812-adc3-a050a5c3b76b/image.png" style="width: 80%;  margin:0 auto;"/>
      </td>
    </tr>
    <tr>
      <td> 포스트 상세 </td>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/abc24479-c59a-4610-b14e-8cc173d7f12a/image.png" style="width: 80%; margin:0 auto;"/>
      </td>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/e018af1c-0684-44f6-96a5-8466df80f4f6/image.png" style="width: 80%; margin:0 auto;"/>
      </td>
    </tr>
    <tr>
      <td> About</td>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/bf20f5a4-bf00-4f9d-85bb-2ca291f389cb/image.png" style="width: 80%; margin:0 auto;"/>
      </td>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/05fdc922-4a10-4c33-84d5-df385a38489b/image.png" style="width: 80%; margin:0 auto;"/>
      </td>
    </tr>
    <tr>
      <td> Resume </td>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/dc92bd9f-0b19-4d2f-ac85-1ce27ee857c9/image.png" style="width: 80%; margin:0 auto;"/>
      </td>
      <td>
        <img src="https://velog.velcdn.com/images/khy226/post/24210822-629c-4557-aab5-268ccdb32644/image.png" style="width: 80%; margin:0 auto;"/>
      </td>
    </tr>
  </tbody>
</table>

<br />

## Lighthouse Performance

여러 측정 카테고리들이 있지만, 웹 페이지의 로딩 속도 및 실제 성능을 측정할 수 있는 Performance를 중점적으로 확인하려고 합니다.

Performance 성능의 측정항목은 6가지 Metric으로 정의되며, 각 Metric들은 페이지가 로드되는 속도를 다양한 측면에서 측정합니다.

![](https://velog.velcdn.com/images/khy226/post/c4dad63b-d46c-478e-b0c9-7bdfce50cfd6/image.png)

아래는 Lighthouse 8의 여섯가지 metric에 대한 설명과 가중치 값입니다.

<br />

<table>
  <thead>
    <tr>
      <th style="text-align: center">Metric</th>
      <th style="text-align: center">설명</th>
      <th style="text-align: center">가중치</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> First Contentful Paint</td>
      <td>  최초 콘텐츠가 포함된 페인트. 초기 DOM 콘텐츠를 렌더링하는데 걸리는 시간을 측정</td>
      <td>10%</td>
    </tr>
    <tr>
      <td> Speed Index</td>
      <td>속도 지수. 콘텐츠가 시각적으로 표시되는 진행 속도를 측정 (ex. 리로드되는 페이지의 비디오를 캡쳐하여 프레임 간의 속도를 계산)</td>
      <td>10%</td>
    </tr>
    <tr>
      <td> Largest Contentful Paint</td>
      <td>가장 큰 콘텐츠가 포함된 페인트. 가장 큰 콘텐츠를 렌더링 하는데 걸리는 시간 </td>
      <td>25%</td>
    </tr>
    <tr>
      <td> Time to interactive</td>
      <td>상호 작용까지의 시간. 사용자가 페이지와 완전하게 상호작용할 수 있을 때까지 걸리는 시간</td>
      <td>10%</td>
    </tr>
    <tr>
      <td> Total Blocking Time</td>
      <td>총 차단 시간. 마우스 클릭, 화면 탭 또는 키보드 누름과 같은 사용자 입력에 페이지가 응답하지 못하도록 차단된 총 시간</td>
      <td>30%</td>
    </tr>
     <tr>
      <td>Cumulative Layout Shift</td>
      <td>누적 레이아웃 이동. 
사용자가 예상치 못한 레이아웃 이동을 경험하는 것에 대한 점수</td>
      <td>15%</td>
    </tr>
  </tbody>
</table>

총 성능 점수는 6가지 Metric 점수들의 가중 평균으로 계산됩니다. 가중치가 더 높은 Metric이 전체 성능 점수에 큰 영향을 주게 되며, Lighthouse 8 에서는 'Total Blocking Time'이 빠를수독 전체 성능 점수가 높아집니다. 각 가중치(%)는 사용자의 성능 인식을 균형있게 검사하기 위해 정해진다고 합니다.

성능 점수는 빨강 / 주황 / 초록 세 가지 색깔로 보여지는데, 다음 범위에 따라 색상이 지정됩니다.

- 0~49(빨간색): 나쁨
- 50~89(주황색): 개선 필요
- 90~100(녹색): 양호

<br />

이 외에 더 자세한 설명은 [Lighthouse Performance Audits](https://developer.chrome.com/docs/lighthouse/performance/) 문서에서 확인할 수 있습니다.

더 나아가, [공식 도큐](https://developer.chrome.com/ko/docs/lighthouse/performance/performance-scoring/#color-coding)에서는 좋은 사용자 경험을 제공하기 위해 사이트는 양호한 녹색 점수(90-100)를 얻는 것이 좋다고 설명합니다. 따라서 사이트 성능 측정시 양호한 단계까지 갈 수 있도록 성능을 개선하는 것을 권장합니다.

> 참고: Metric 별로 어떤 성능 점수가 나는지 [Lighthouse 계산기](https://googlechrome.github.io/lighthouse/scorecalc/)를 통해서 자세히 확인할 수 있습니다.

<br />

## Next.js에서 Lighthouse 사용하기

[Next.js 공식 도큐](https://nextjs.org/learn/seo/improve/lighthouse)에서도 lighthouse를 통해 웹 성능을 체크하는 방식을 설명하고 있습니다.

주의해야 할 점은, lighthouse의 정확한 측정을 위해서는 항상 프로덕션 환경에서 테스트를 해야한다는 것 입니다. 이미 production에 배포된 웹 페이지들은 상관 없지만, 대출 의사결정처럼 개발중인 페이지들은 로컬에서 `yarn build`로 production 빌드를 한 후, `yarn start`로 실행해서 테스트해야합니다.

<br />

```
yarn build && yarn start
```

npm을 사용하면 아래와 같이 쳐서 로컬에서 테스트할 수 있습니다.

```
npm run build && npm run start
```

<br />

---

# 웹 페이지 성능 개선하기

## 초기 정적 페이지 로딩 최적화

앞서 분석한 성능 지표를 토대로, 로딩 과정을 최적화하는 방법입니다.

### 블록 리소스(CSS, 자바스크립트) 최적화

#### CSS 최적화

렌더 트리를 구선할 때 DOM 트리와 CCSOM 트리가 필요한데, CSSOM 트리가 구정되지 않으면 렌더 트리를 만들지 못하고 렌더링이 차단된다. 따라서, CSS를 **렌더링 차단 리소스**라고 하며, 렌더링이 차단되지 않도록 HTML 문서 최상단 `<head>` 태그에 배치해야한다.

```html
<head>
  <link href="styles.css" rel="stylesheet" />
</head>
```

또한, 외부 스타일시트를 가져올 때는 `@import`문을 지양해야합니다. `@import`문을 사용하면 브라우저는 스타일시트를 병렬로 다운로드 할 수 없기 때문에 로드 시간이 늘어날 수 있습니다.

```js
/* test.css */
@import url("style.css")
```

내부 스타일시트를 사용할 때에도 head 태그에 추가하여 사용합니다.

```html
<head>
  <style type="text/css">
    .container {
      background-color: blue;
    }
  </style>
</head>
```

<br />

#### JS 최적화

JS 역시 DOM 트리와 CSSOM 트리를 동적으로 변경할 수 있기 때문에 HTML 파싱을 차단하는 **블록 리소스** 입니다. DOM 트리가 생성되는 도중에 `<script>` 태그를 만나면, 스크립트 실행이 완료될 때 까지 DOM 트리 생성이 중단됩니다. (그리고 해당 스크립트는 생성된 DOM에만 접근할 수 있습니다.) 이러한 상황을 방지하기 위해서 자바스크립트는 HTML 문서 최하단(`</body> 태그 직전`)에 배치하는 것이 좋습니다.

<br />

```html
<body>
  <div>....</div>
  <script src="test.js" type="text/javascript"></script>
</body>
```

혹은 `<script>` 태그에 `defer`나 `async`속성을 명시해서 HTML 파싱을 멈추지 않도록 설정할 수 있습니다. 해당 속성을 추가하면 스크립트가 DOM 트리 및 CSSOM를 변경하지 않겠다는 의미로, 브라우저가 파싱을 멈추지 않습니다. (다만 브라우저마다 지원하는 범위가 한정적)

<br />

```html
<head>
  <script async src="api.test.com/test.js" type="text/javascript"></script>
  <script defer src="api.test.com/test.js" type="text/javascript"></script>
  <script async defer src="api.test.com/test.js" type="text/javascript"></script>
</head>
```

- `async` 속성이 명시된 경우 : 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
- `async` 속성은 명시되어 있지 않고 `defer` 속성만 명시된 경우 : 브라우저가 페이지의 파싱을 모두 끝내면 스크립트가 실행됨.
- `async` 속성과 `defer` 속성이 모두 명시되어 있지 않은 경우 : 브라우저가 페이지를 파싱하기 전에 스크립트를 가져와 바로 실행시킴.

<br />

### 리소스 요청 수 줄이기

앞서 말한 CSS, JS 파일 및 이미지 등 웹페이지에 포함된 리소스는 서버에 요청을 한 후 완전히 다운로드되어야 사용할 수 있습니다. 웹 페이지에서 리소스를 다운로드하는 시간은 굉장히 큰 영향을 주기 때문에, 필요한 리소스만 요청할 수 있도록 최적화 하는 것이 매우 중요합니다. 개발자 도구의 네트워크 패널에서 사이트 및 리소스를 다운로드 하는 과정과 시간을 측정할 수 있습니다.

<br />

![](https://velog.velcdn.com/images/khy226/post/c80e7317-82d3-4290-a786-9532d9c79e39/image.png)

<br />

아래는 리소스 종류별로 요청 수를 줄일 수 있는 방법들을 설명합니다.

#### 이미지 스트라이트

아래와 같이 아이콘마다 다른 이미지 파일을 사용하는 경우, 아이콘 갯수만큼 리소스 요청이 발생한다. 이 경우, 이미지 스트라이트 기법을 사용해 여러개의 이미지를 하나의 이미지로 합쳐 요청을 한번으로 줄일 수 있다.

<img src="https://velog.velcdn.com/images/khy226/post/6847f90b-ce4d-47ce-8947-a13e3dd04b3d/image.png" style="width: 50%; margin: 0 auto;"/>

<br />

위에 있는 아이콘들을 모두 별개의 이미지로 만들지 않고, 하나의 이미지로 만들어서 CSS의 `background-position` 속성을 사용하는 방식이다. 여러 아이콘들이 있는 하나의 긴 이미지를 만들어, 필요한 부분을 보여주는 방법이다. 이 이미지 스트라이트 기법을 사용하면 웹페이지 로딩을 보다 빨리 최적화할 수 있다.

```css
.btn {
  background-image: url(../images/sprite-icons.png);
  background-position: 10px 10px;
  width: 20px;
  height: 20px;
}
```

<br />

#### CSS, JS 번들

모듈 기반으로 개발을 하면 여러개의 분리된 파일을 만들어서 사용할 때가 많습니다. 아래 예제처럼 여러개의 파일(CSS 파일 2개, JS 파일 3개) 5번 이상의 리소스를 요청하게 되는데, 이 경우에는 [webpack](https://webpack.js.org/)과 같은 모듈 번들러를 사용해서 파일 요청수를 줄일 수 있습니다. 번들러(Bundler)는 뜻 그래도 여러개의 모듈 파일을 하나의 번들 파일로 묶어서 만들어주는 역할을 합니다.

- **여러개의 리소스를 사용하는 경우 (최적화 전)**

```html
<html>
  <head>
    <link href="styles.css" rel="stylesheet" />
    <link href="styles_v2.css" rel="stylesheet" />
  </head>
  <body>
    <div id="test">...</div>
    <script async src="script.js" type="text/javascript"></script>
    <script async src="script_v2.js" type="text/javascript"></script>
    <script async src="script_v3.js" type="text/javascript"></script>
  </body>
</html>
```

<br />

- **하나의 번들된 리소스를 사용하는 경우 (최적화 후)**

```html
<html>
  <head>
    <link href="bundle.css" rel="stylesheet" />
  </head>
  <body>
    <div class="test">...</div>
    <script async src="bundle.js" type="text/javascript"></script>
  </body>
</html>
```

<br />

#### 내부 스타일시트 활용

만약 사용하는 스타일의 양이 적다면, `<link>` 태그로 외부 스타일 시트를 모두 가져오는 것 대신에, 문서 안에서 `<style>` 태그를 사용해 스타일링을 할 수 있습니다. 이 방법을 **내부 스타일 시트** 라고 하며, 외부 스타일 시트를 가져올 때 발생하는 리소스 요청 수를 줄일 수 있습니다. 다만, 내부 스타일시트는 리소스 캐싱이 불가하기 때문에 필요한 경우에만 사용하는 것이 좋습니다.

- **외부 스타일시트를 사용하는 경우 (최적화 전)**

```html
<html>
  <head>
    <link href="bundle.css" rel="stylesheet" />
  </head>
  <body>
    <div class="container">...</div>
  </body>
</html>
```

- **내부 스타일시트를 사용하는 경우 (최적화 후)**

```html
<html>
  <head>
    <style type="text/css">
      .container {
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <div class="container">...</div>
  </body>
</html>
```

<br />

#### 작은 이미지를 HTML, CSS로 대체

웹 페이지에서 크기가 작은 이미지들을 여러개 사용하는 경우 (ex. 아이콘 이미지 등), 이미지를 다운로드해서 사용하는 것 대신 [Data URI](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)로 처리를 할 수 있습니다.

이 경우에는 외부 이미지를 다운받기 위한 요청 횟수를 줄일 수 있지만, 캐싱이 안되는 문제가 있으므로 필요한 경우에만 사용해야합니다.

<br />

- **최적화 전**

```html
<img src="../img/image.png" />
```

- **최적화 후**

```html
<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAAXNSR0IArs4c6QAAAHBJREFUKBVjYBimICwsLAaEsXmPG..."
/>
```

<br />

### 리소스 용량 줄이기

리소스의 용량이 클수록 웹 페이지 로딩 시간도 길어집니다. 따라서, 리소스별로 필요한 요소만 남기고 압축하여 사용하는 것이 좋습니다. 아래는 리소스 용량을 줄일 수 있는 여러가지 방법에 대해서 확인해보겠습니다.

#### 중복 코드 제거

리소스 용량을 줄일 수 있는 가장 간단한 방법은 중복되는 코드를 줄이는 것입니다. 예를 들어, 페이지별로 중복되는 함수가 있다면 `utils.js` 라는 파일을 만들어서 중복되는 함수들을 정리해서 사용하는 방법이 있습니다.

<br />

- **최적화 전**

```javascript
// posts.js
function filter() { ... }
function map() { ... }

filter();
map();

// users.js
function filter() { ... }
function map() { ... }

filter();
map();
```

- **최적화 후**

```javascript
// utils.js
export function filter() { ... }
export function map() { ... }

// posts.js
import {filter, map} from 'utils.js'

filter();
map();

// users.js
import {filter, map} from 'utils.js'

filter();
map();

```

<br />

#### tree-shaking 작업

외부 라이브러리에서 import를 할 때 모든 함수를 가져오지 않고 필요한 함수만 가져와서 사용할 수 있습니다. 이를 tree-shaking 이라고 합니다. 자주 사용되는 [lodash](https://lodash.com/) 라이브러리의 경우, 여러개의 함수가 있는데, 각 함수마다 용량이 상당히 큽니다. 이때, 사용하지 않는 함수들도 모두 import해서 가져온다면 리소스 용량이 필요이상으로 커질 위험이 있습니다.

<br />

- **최적화 전**

```javascript
import _ from 'lodash';

_.map(...);
_.filter(...);
```

- **최적화 후**

```javascript
import { map, filter } from 'lodash';

map(...);
filter(...);
```

<br />

#### HTML 마크업 최적화

HTML의 태그는 최대한 중첩하지 않고 단순하게 구성하는 것이 좋습니다. 공백, 주석등을 제거해서 사용하는 것도 리소스 용량을 줄일 수 있습니다. 구글의 [Excessive DOM](https://developer.chrome.com/docs/lighthouse/performance/dom-size/) 문서에 따르면, 권장하는 DOM 트리의 노드 수는 전체 1500개 미만, 최대 깊이는 32개, 자식 노드를 가지는 부모 노드는 60개 미만이라고 합니다.

<br />

#### 간결한 CSS 셀렉터 사용

앞서 설명한 HTML 마크업 최적화와 비슷하게, 간결한 CSS 선택자를 사용하는 것이 용량을 최적화할 수 있습니다. 예를 들어, id 대신 class 선택자를 사용해서 중복되는 스타일을 묶어서 처리할 수 있습니다.

<br />

#### 압축(minify)해서 사용

마지막으로, HTML, JS, CSS 파일을 모두 난독화하고 압축해서 사용할 수 있다. 대표적으로 Webpack과 같은 도구로 압축을 할 수 있다.

<br />

## 웹 페이지 렌더링 최적화

웹 페이지를 렌더링은 DOM, CSS를 그리는 시간과 JS를 실행하는 시간, 그리고 자바스크립트로 인해 DOM, CSS 변경이 다시 화면에 그려지는 시간이 모두 포함됩니다. 특히 동적인 효과를 위해 자바스크립트를 많이 사용하는데, 렌더링 성능에 큰 영향을 끼치는데, 자바스크립트는 브라우저에서 단일 스레드로 동작하기 때문에 JS의 실행 시간은 렌더링 성능과 직결됩니다.

렌더링 성능 최적화는 이런 소요 시간을 단축하고, 화면에 끊김 없이 그리는 것을 목표로 합니다.

<br />

### 레이아웃 최적화

레이아웃은 DOM 요소들이 화면에 어느 위치에 어느 크기로 배치 될지 결정하게 되는 **계산 과정** 입니다. 자바스크립트로 DOM 이나 스타일을 변경하면, 다시 레이아웃 과정을 거쳐서 렌더링이 실행됩니다.

![image](https://velog.velcdn.com/images/khy226/post/5fccff3b-1826-4a6a-958c-0d986ab3842b/image.png)

> <small>이미지 출처: [Rendering Performance
> ](https://web.dev/rendering-performance/)</small>

렌더링은 위 사진처럼 각 단계를 거치는데, 특히 레이아웃은 요소의 크기를 일일히 계산하고 관계를 파악하느라 가장 시간이 오래 걸립니다. 따라서, 레이아웃 발생을 최소화 하고 리페인트만 할 수 있도록 JS, HTML, CSS 최적화를 하는 것이 중요합니다.

<br />

### JS 실행 최적화

자바스크립트 실행 시간이 길 수록, 프레임당 처리가 오래 걸려서 렌더링 성능이 떨어집니다. 따라서, 불필요한 레이아웃을 제거하고 DOM 및 스타일 변경을 최소화 할 수 있도록 주의해야합니다.

<br />

#### 강제 동기 레이아웃 최적화

최신 값을 계산하기 위해서 레이아웃을 동기적으로 발생시키는 경우가 있는데, 이를 **강제 동기 레이아웃**이라고 합니다. DOM 조작 없이도 레이아웃 과정을 강제로 일으키는 것이죠.

강제 동기 레이아웃은 자바스크립트 실행 시간을 늘어나게 하고, DOM의 속성을 변경시켜 화면 업데이트를 위해 레이아웃을 다시 발생시킵니다. 대표적으로는 offsetHeight와 offsetTop과 같은 속성들이 강제 동기 레이아웃을 발생시킵니다. 따라서, 아래와 같은 강제 동기식 레이아웃은 피해야 합니다.

```javascript
const btn = document.getElementById('btn')

btn.style.fontSize = '24px'
console.log(btn.offsetTop) // offsetTop 호출 직전 브라우저 내부에서는 동기 레이아웃 발생
```

<br />

#### 레이아웃 스래싱(thrashing) 피하기

한 프레임 내에서 강제 동기 레이아웃이 연속적으로 발생하면, 매번 레이아웃이 발생하면서 성능이 저하됩니다. 이를 **레이아웃 스래싱** 이라고 하는데, 해당 코드를 최대한 피해야합니다. 예를 들어, `offsetWidth` 과 같이 강제 동기 레이아웃을 수행하는 속성을 `width` 등으로 변경해줄 수 있습니다.

<br />

- **최적화 전**

```javascript
for (let i = 0; i < paragraphs.length; i += 1) {
  paragraphs[i].style.width = box.offsetWidth + 'px'
}
```

- **최적화 후**

```javascript
for (let i = 0; i < paragraphs.length; i += 1) {
  paragraphs[i].style.width = width + 'px'
}
```

<br />

#### 하위 노드 DOM 조작 (상위 DOM 조작 지양)

- DOM을 변경하면 스타일 계산, 레이아웃, 페인트 과정이 모두 필요하므로, 최대한 하위 노드에 있는 DOM을 조작해야합니다. (DOM 트리 상위 노드의 스타일 변경하면 하위 노드에 모두 영향을 끼침)

#### `visibility: hidden` 대신 `display: none` 사용

- 엘리먼트가 `display: none`을 가지고 있으면 DOM 조작과 스타일을 변경하더라도 레이아웃과 리페인트가 발생하지 않습니다.
- 이와 반대로, `visibility: hidden`은 보이지 않아 리페인트는 발생하지 않지만, 공간을 차지하기 때문에 레이아웃은 발생합니다.

<br />

### HTML, CSS 최적화

DOM트리와 CSSOM 트리를 변경하면 렌더링을 유발하고 트리가 클수록 더 많은 계산이 필요합니다. 따라서, HTML과 CSS를 최적화하여 렌더링 성능을 향상하는 것이 중요합니다.

<br />

#### CSS 규칙 최소화

- 엘리먼트의 클래스를 변경하면 렌더링이 발생하는데, CSS가 복잡하고 많을수록 스타일 계산과 레이아웃이 오래 걸립니다.
- 따라서, CSS 규칙수를 최소화하고, 복잡한 선택자는 지양하는 것이 좋습니다.

<br />

#### DOM 깊이 최소화

- 비슷하게, DOM 트리가 깊을수록 DOM을 변경했을 때 필요한 계산이 더 많아집니다.
- 따라서, DOM의 깊이를 최대한 얕게 만들고, 불필요한 wrapper 엘리먼트는 제거하는게 좋습니다.

<br />

### 애니메이션 최적화

마지막으로 애니메이션 최적화입니다. 평균적으로 모니터는 60Hz의 주사율을 가지고 있기 때문에 밀리초 단위로 계산을 하면, 한 프레임을 표시하는데 16ms 정도가 걸리게 됩니다. 다시 말해, 한 프레임 처리가 16ms(60fps) 내로 완료되어야 렌더링 시 끊기는 현상 없이 자연스러운 렌더링을 만들어낼 수 있습니다.

특히, 자바스크립트 실행 시간은 10ms 이내에 수행되어야 레이아웃, 페인트 등의 과정을 포함했을 때 16ms 이내에 프레임이 완료될 수 있습니다. 따라서, 애니메이션을 구현할 때 네이티브 자바스크립트 API를 사용하는 것보다 CSS 사용을 권장합니다.

<br />

#### requestAnimationFrame 사용

- requestAnimationFrame은 setTimeout, setInterval과 달리 리페인트 이전에 실행되기 때문에 더욱 자연스러운 애니면이션을 실행할 수 있습니다.
- 또한, 현재 페이지가 보이지 않을 때는 콜백함수 실행을 하지 않아서 불필요한 동작을 하지 않습니다.

```javascript
let req

const startAnimation = () => {
  req = requestAnimationFrame(startAnimation)
  // animate code
}

requestAnimationFrame(startAnimation)

// ...

cancelAnimationFrame(req) // 애니메이션 멈춤
```

> requestAnimationFrame은 [이전 포스트](https://hayeon-blog.vercel.app/221031-requestAnimationFrame/)에 더 자세히 정리해두었습니다.

<br />

#### CSS 애니메이션 사용

- 자바스크립트를 이용한 애니메이션은 성능 문제가 생길 수 있습니다. 이에 반해, [CSS 애니메이션](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations)을 사용하면 JS를 실행할 필요도 없고, 부드러운 애니메이션을 구현할 수 있습니다.
- CSS 애니메이션 구현 시 아래 내용들을 지켜서 사용하면 좋습니다.

<br />

#### position 을 `absolute`나 `fixed`로 설정 (주변 레이아웃 영향 X)

- position을 `absolute`나 `fixed`로 설정하면 주변 레이아웃에 영향을 주지 않기 때문에 렌더링 성능을 향상 시킬 수 있습니다.

<br />

#### 기하학 변화 유발하는 속성 지양 ( position, width, height X) → 대신 transform 사용

- 스타일 속성 중 `position`, `width`, `height` 등과 같이 기하적 변화를 유발하는 속성을 변경하면 레이아웃이 발생합니다.
- 이를 방지하려면 `transform` 속성을 이용하면 됩니다. `transform`을 사용하면 엘리먼트가 레이어로 분리되기 때문에, 영향받는 엘리먼트가 제한되어 레이아웃 및 페인트를 줄일 수 있습니다. 또한, 합성만 발생시켜 렌더링 속도가 빨라질 수 있습니다.
- 예를 들어, `left`, `top` 속성을 사용하면 모든 프레임마다 엘리먼트와 배경이 합성되어 많은 시간이 걸리지만, `transform: translate()`를 사용하면 렌더링을 최적화 시킬 수 있습니다.

```css
.animation-item {
  position: absolute; /* good */
  ...

  animation: move 3s ease infinite;
}


/* bad */
@keyframes move {
  50% {
    top: 100px;
    left: 100px;
  }
}

/* good */
@keyframes move {
  50% {
    transform: translate(100px, 100px);
  }
}
```

<br />

## 서버 데이터 요청 최적화

- 변화가 별로 없는 정적인 값들은 getStaticProps로 최적화 할 수 있습니다. (FAQ나 소개글 등)
- 다만, 주기적으로 업데이트가 필요한 값들은 getServerSideProp를 적용해야 하는데, 이때는 react-query 혹은 rtk-query와 같은 서버 상태 관리 라이브러리를 활용해서 최적화 할 수 있습니다. (ex. [React-query prefetching](https://tanstack.com/query/v4/docs/react/guides/prefetching) )

<br />

## 그 외 Next.js 성능 최적화 방법

위에서 말한 방법들 이외에도, Next.js에서 내장하는 기능들로 웹 사이트 성능을 최적화 할 수 있습니다. 대표적으로 아래 다섯가지 방법이 있습니다.

- `next/Image`로 이미지 최적화
- 외부 라이브러리 `dynamic import`로 js 번들 최적화
- 컴포넌트 `dynamic import`로 초기 페이지 로드 최적화
- `next/font`로 폰트 최적화 (Basic Features: Font Optimization | Next.js )
- `next/head`로 Third-party 스크립트 최적화

> 자세한 내용은 공식 도큐 참고: [Improving your Core Web Vitals](https://nextjs.org/learn/seo/improve)

<br />

---

# 참고

- [Lighthouse로 웹사이트 성능 측정하기](https://blog.soomgo.com/blog/website-benchmark-with-lighthouse/)
- [Lighthouse Overview - 공식 문서](https://developer.chrome.com/docs/lighthouse/overview/)
- [성능 최적화 - Toast UI](https://ui.toast.com/fe-guide/ko_PERFORMANCE)
- [Improving your Core Web Vitals - Next.js 공식 도큐](https://nextjs.org/learn/seo/improve)
- [Chrome lighthouse를 통한 웹 페이지 성능 측정](https://www.hahwul.com/2021/07/04/chrome-lighthouse/)
- [Critical Rendering Path](https://web.dev/critical-rendering-path/)
- [TCP School - script 태그의 defer 속성](http://www.tcpschool.com/html-tag-attrs/script-defer)
