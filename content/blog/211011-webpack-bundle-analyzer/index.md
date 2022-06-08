---
title: Webpack bundle 사이즈 최적화 (feat. webpack-bundle-analyzer)
date: "2021-10-11T22:40:32.169Z"
description: webpack-bundle-analyzer를 사용해서 빌드 크기 확인 후 용량을 줄여보자.
---

<img src="https://velog.velcdn.com/images/khy226/post/1ff21694-d03f-42de-86bb-915aa1e9ec52/logo-on-white-bg.png" style="width: 60%; padding-bottom: 50px;">

### 문제상황: 

- AWS 배포를 해야하는데, 빌드 파일이 AWS Lambda 배포 패키지 (.zip) 할당량인 50MB를 초과해서 배포가 되지 않았다.

```terminal
 RequestEntityTooLargeException: 
 Request must be smaller than 69905067 bytes for the UpdateFunctionCode operation
```

> 69905067byte가 약 70mb라 이부분에서 왜 최대 할당량이 늘었는지 궁금했는데,  빌드 파일을 포함한 요청(request)이 총 70mb 를 넘으면 안된다고 한다. 따라서 빌드 zip 파일 자체는 50mb 이하로 줄여야 배포가 가능하다.

<Hr>

### 해결 방법: 
- Webpack 빌드 파일 중 어떤 부분이 큰지 확인하고 해당 부분을 줄여야 한다.
  > Webpack 은 프로젝트의 구조를 분석하고 자바스크립트 모듈을 비롯한 관련 리소스들을 찾은 다음 이를 브라우저에서 이용할 수 있는 번들로 묶고 패킹하는 모듈 번들러(Module bundler)다. (출처: [웹팩(Webpack) 이란, 웹팩 간단 정리 및 리액트(React) 기본 개발환경 세팅. [1]](https://jusungpark.tistory.com/52))

- `@next/bundle-analyzer`를 사용해서 빌드 크기 확인 후 용량을 줄여보자.

로컬 환경에서 빌드 파일 확인할 수 있는 **@next/bundle-analyzer**를 사용해서 빌드 상태를 볼 수 있다.

- 자세한 사용법은 https://www.npmjs.com/package/@next/bundle-analyzer 에서 확인 가능하다.
  
<hr>


### 해결 과정:

1. 우선 패키지를 설치한다.

```terminal
yarn add @next/bundle-analyzer
```

2. next.config.js 파일에 아래와 같이 설정해준다.

```next
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([
  [withBundleAnalyzer],
  // your other plugins here
])
```



3. 아래 커맨드로 빌드를 시작한다.

```terminal
ANALYZE=true yarn build
```



4. 빌드가 진행되면서 빌드 결과물이 .next/analyze/client.html 파일과 .next/analyze/server.html 파일로 생성된다.

![client build](https://user-images.githubusercontent.com/72732446/135653128-d787733d-aa4e-4bbc-a254-7459ee7c229d.png)

- .next/analyze/client.html 파일에서는 node module 관련 정보를 보여준다. **parsed size**를 보면 되는데 각 번들(파일)당 500kb 이하가 되는 것이 좋다고 한다. (인터넷 속도가 빠른 곳에서는 1mb 정도도 괜찮다고 한다.) 번들 파일이 큰 모듈은 실제로 사용하는 모듈만 로딩하는 **tree shaking**을 하면 된다.
- 모듈별로 tree shaking이 되는것도 있고, 안되는것도 있다고 하는데, 번들 사이즈가 큰 모듈 위주로 tree shaking 검색해서 진행하면 된다.
  - 아래 링크에 있는 글을 따라서 moment.js와 lodash 모듈 tree shaking 작업을 진행하였다.

  > ex) moment.js tree shaking 방법: https://github.com/jmblog/how-to-optimize-momentjs-with-webpack#bonus
  >
  > ex2) lodash tree shaking: https://blog.jungbin.kim/web/2019/02/16/js-decreaing-webpack-bundle.html#lodash-%EC%9A%A9%EB%9F%89-%EC%A4%84%EC%9D%B4%EA%B8%B0

- 왼쪽 상단 메뉴를 클릭하면 parsed와 Gzipped  크기를 볼 수 있다.

![server side build](https://user-images.githubusercontent.com/72732446/135653486-0dedec01-7437-4a13-aa94-d076294f1827.png)

- .next/analyze/server.html 파일에서는 빌드 된 pages 폴더를 보여준다.
- tree shaking 이외에도 불필요한 파일을 다 삭제하고, 분리된 세 페이지를 하나로 합치는 작업을 해서 5페이지 정도 삭제하니 빌드 크기가 5/6 정도로 줄어들었다.

> Stat, Parsed, Gzipped 세 가지 옵션이 나는데, 이 옵션은 각 번들의 사이즈 측정 기준이라고 한다. Stat은 빌드된 그대로의 상태, Parsed는 웹팩이 트리셰이킹을 마친 결과물, Gzipped는 결과적으로 서빙을 위해 압축된 사이즈이다. Parsed를 줄이면 자연스레 Gzipped는 비례하여 줄어듦으로, Parsed size를 기본으로 줄이기를 시도하는 것이 좋다고 한다. (출처: [쉽게 따라하는 프론트엔드 웹 어플리케이션 패키지 최적화](https://velog.io/@bluestragglr/%EC%89%BD%EA%B2%8C-%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94))

<hr>
<br>
<br>

### 참고

> - [쉽게 따라하는 프론트엔드 웹 어플리케이션 패키지 최적화](https://velog.io/@bluestragglr/%EC%89%BD%EA%B2%8C-%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94) 
> - [Webpack bundling 파일 사이즈 줄이기(Tree Shaking)Permalink
](https://blog.jungbin.kim/web/2019/02/16/js-decreaing-webpack-bundle.html)