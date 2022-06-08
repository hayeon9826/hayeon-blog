---
title: Yarn 이란?
date: "2021-10-04T22:40:32.169Z"
description: Yarn install 하면 어떤일이 벌어질까 🤔
---

<img src="https://velog.velcdn.com/images/khy226/post/32f58206-04e2-4b59-b38b-a7da923aa4bd/feature-speed.png" style="width: 60%; padding-bottom: 50px;">

## Yarn 이란?


Yarn은 Javascript 패키지 매니저이다. 프로젝트 패키지 의존성을 관리하는 툴이며, 다른 개발자들과 패키지를 공유할 수 있도록 도와준다. (*third-party 모듈을 패키지라고 부른다.)

Yarn은 npm과 마찬가지로 패키지의 저장소를 제공하며, 시스템에서 의존 패키지를 설치, 업데이트 할 수 있도록 도와준다. `package.json` 파일을 통해 해당 프로젝트가 의존하고 있는 모든 패키지를 구분하고, `package.json`에 있는 `dependencies` 필드를 기반으로 패키지를 설치한다. 


덕분에 실제로 패키지들이 저장되어있는 node_modules 폴더 대신, packaged.json 파일만 공유해 데이터 낭비를 줄일 수 있다.

<br>

### 왜 Yarn 인가? (feat. npm과 성능차이)

Facebook은 프로젝트가 거대해지며 npm의 보안 및 성능 문제를 겪었고, npm을 대체할 새로운 패키지 매니저를 개발했다. 그게 바로 Yarn 이다. Yarn은 npm에 비해 성능(속도)과 보안이 향상되었다. 

우선, Yarn은 패키지를 순서대로 설치하는 npm과 달리 패키지를 병렬로 설치하므로 설치 속도가 빠르다. 특히, yarn은 캐싱을 이용하기 때문에 패키지 설치가 더 빠르다. Yarn은 설치한 패키지를 유저 디렉토리에 저장해서 캐싱한다. Yarn의 캐싱 디렉토리 경로는 아래와 같다.

```terminal
$ yarn cached dir
/Library/Caches/Yarn/v6
```

따라서, 첫번째 설치에서는 npm과 비슷한 성능을 보이지만 두번째 install 부터는 npm보다 훨씬 빠르게 패키지를 설치한다.

<table>
  <colgroup>
    <col class="column1">
    <col class="columns2plus3" span="2">
  </colgroup>
  <tr>
    <th>명령어</th>
    <th>첫번째 설치</th>
    <th>두번째 설치(Cached)</th>
  </tr>
  <tr>
    <td>npm install</td>
    <td>24.3s</td>
    <td>5.4s</td>
  </tr>
  <tr>
    <td>yarn install</td>
    <td>22.9s</td>
    <td>976ms</td>
  </tr>
</table>

> 표 출처: [Yarn 톺아보기](https://www.holaxprogramming.com/2017/12/21/node-yarn-tutorials/)

* [Benchmarks of JavaScript Package Managers](https://yarnpkg.com/en/compare)에서 yarn과 npm 성능 테스트를 더 알아볼 수 있다.

또한, 보안성 측면에서 NPM은 다른 패키지를 즉시 포함시킬 수 있는 코드를 자동으로 실행하므로, 보안 시스템에 여러 가지 취약성이 발생한다. 반면에, YARN은 yarn.lock 또는 package.json 파일에 있는 패키지만 설치하므로 보안이 더 강화되었다고 볼 수 있다. (출처: [NPM vs YARN의 차이점을 알아보자](https://developer0809.tistory.com/128))

<br>
그렇다고 yarn이 npm보다 좋다고 단언할 수는 없다.
yarn이 가파르게 성장하며 점점 더 큰 점유율을 차지하고 있지만, 그래도 아직은 npm의 다운로드가 훨씬 많고, 커뮤니티의 규모도 훨씬 크다. 관련된 이슈나 정보를 찾는 것은 yarn보단 npm이 좀 더 수월하다.


<hr>

## Yarn (패키지 설치) 작동원리

그렇다면 왜 Yarn (패키지 매니저)는 의존 패키지들을 어떻게 관리하는가?

우선 프로젝트의 메타 정보는 `package.json` 파일을 통해 관리된다. `package.json` 에는 해당 프로젝트가 의존하는 모든 패키지 이름과 버전이 나열되어있는데, `dependencies` 항목에는 일반적으로 설치되어야 할 패키지가, 그리고 `devDependencies` 항목에는 개발용 패키지가 명시되어있다. `package.json` 는 아래와 같이 생겼다.

```json
{
  "name": "test"
  "version": "1.0.0",
  "private": true,
  "description": "Short Decsription of the project",
  "scripts": {
    "start": "NODE_ENV=production next start --port 8000",
    ... 
  },
  "dependencies": {
    "react": "17.0.1",
    ...
  },
   "devDependencies": {
     "@types/react": "^17.0.0",
     ...
   }
  
}
```

이렇게 설치가 필요한 패키지들이 `package.json` 파일에 등록되어 있으면, 프로젝트에 협업중인 개발자들은 `yarn` 또는 `yarn install` 명령어 하나로 모든 패키지들을 한번에 설치할 수 있다.

`yarn install`  을 치면, `package.json` 에 등록되어 있는 모든 패키지를 yarn registry에서 다운받아 `node_modules` 디렉터리에 저장한다. 이때, `node_modules` 디렉터리에는 `package.json` 에 적혀있는 패키지 이외에도 여러가지 패키지들이 설치되어 있다. 해당 패키지들은 프로젝트에 직접적으로 필요하지는 않지만, 간접적으로 의존하는 패키지들이다. `ls node_modules` 커맨드로 설치된 패키지들을 모두 볼 수 있다.
```terminal
$ ls node_modules
react
react-colorful
react-copy-to-clipboard
react-datepicker
...

```

yarn 으로 패키지를 설치하면, `yarn.lock` 라는 패키지 잠금 파일이 생성된다. 패키지 잠금 파일에는 프로젝트에 패키지를 최초로 추가할 당시 어떤 버전이 설치되었는지 하나하나 상세히 기록한 파일이다. 예시로, 첫 프로젝트에서 `yarn install`을 치면 아래와 같은 `yarn.lock` 파일이 생긴다.

<u>주의: `yarn.lock` 파일은 패키지 설치 시 자동 생성되는 파일이므로, 임의로 조작해서는 안된다.</u>


```lock
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1

"@gar/promisify@^1.0.1":
  version "1.1.2"
  resolved "https://registry.npmjs.org/@gar/promisify/-/promisify-1.1.2.tgz"
  integrity sha512-82cpyJyKRoQoRi+14ibCeGPu0CwypgtBAdBhq1WfvagpCZNKqwXbKwXllYSMG91DhmG4jt9gN8eP6lGOtozuaw==


"@jest/types@^26.6.2":
  version "26.6.2"
  resolved "https://registry.npmjs.org/@jest/types/-/types-26.6.2.tgz"
  integrity sha512-fC6QCp7Sc5sX6g8Tvbmj4XUTbyrik0akgRy03yjXbQaBWWNWGE7SGtJk98m0N8nzegD/7SggrUlivxo5ax4KWQ==
  dependencies:
    "@types/istanbul-lib-coverage" "^2.0.0"
    "@types/istanbul-reports" "^3.0.0"
    "@types/node" "*"
    "@types/yargs" "^15.0.0"
    chalk "^4.0.0"

...

```

위처럼 `yarn.lock` 파일이 생성되면, 그 이후로는 `yarn install` 커맨드를 실행해도 yarn registry에 있는 최신 버전을 설치하지 않는다. 대신에, 항상 `yarn.lock`  파일에 명시되어 있는 버전으로 패키지를 설치를 해주기 때문에, 설치 시점에 상관없이 항상 동일한 버전의 패키지를 설치할 수 있다. (패키지 버전 문제 발생을 최소화 할 수 있다.)

즉, `package.json`과 `yarn.lock`  파일만 있으면 해당 프로젝트가 의존하고 있는 모든 패키지를 설치할 수 있다. 따라서 용량이 큰 `node_modules` 디렉터리는 Git 저장소에 올라가지 않도록 `.gitignore` 파일에 추가할 수 있다. 

### 패키지 버전 정의 (feat. 틸드, 캐럿)

패키지 버전을 보다보면 ~, ^와 같은 이상한(?) 문자열을 볼 수 있다. 이들은 프로젝트의 의존 패키지의 버전을 정의하기 위해 가장 많이 사용되는 방식으로 틸드(~), 캐럿(^)이라고 부른다. 이 두 방식이 패키지 버전의 범위를 어떻게 표현하는지 알아보자.

#### 틸드(~)
- 명시된 version과 근사한 버전
- ~(틸트)는 패치 버전 범위 내에서 업데이트한다.

<table>
  <colgroup>
    <col class="column1">
    <col class="columns2plus3" span="2">
  </colgroup>
  <tr>
    <th>예시</th>
    <th>범위</th>
  </tr>
  <tr>
    <td>~0.0.1</td>
    <td>0.0.1 <= version < 0.1.0</td>
  </tr>
  <tr>
    <td>~0.1.1</td>
    <td>0.1.1 <= version < 0.2.0</td>
  </tr>
</table>

#### 캐럿(^)
- 명시된 version과 호환되는 버전
^(캐럿)는 마이너 버전 범위 내에서 업데이트한다. :


<table>
  <colgroup>
    <col class="column1">
    <col class="columns2plus3" span="2">
  </colgroup>
  <tr>
    <th>예시</th>
    <th>범위</th>
  </tr>
  <tr>
    <td>^1.0.2</td>
    <td>1.0.2 <= version < 2.0</td>
  </tr>
  <tr>
    <td>^1.0</td>
    <td>1.0.0 <= version <2.0</td>
  </tr>
</table>



<hr>

![](https://images.velog.io/images/khy226/post/4c7bfa08-c40c-4468-bfcd-b56728593f39/images.png)

## Yarn 명령어

Yarn에서 자주 사용하는 명령어를 알아보자.

### Yarn 설치

macOS에서는 brew로 설치가 가능하다.


```terminal
$ brew install yarn
```

npm 을 사용한다면 npm으로도 설치할 수 있다.

```terminal
$ npm install -g yarn
```

yarn이 어디에 설치되었는지 확인해보자.


```terminal
$ which yarn
usr/local/bin/yarn
```

### yarn init

 프로젝트에 필요한 기본적인 정보를 입력하고 `yarn init`을 하면, `package.json` 파일이 생성된다.
 
 ```terminal
 $ mkdir test
$ cd test
$ yarn init
yarn init v1.3.2
question name (test):
question version (1.0.0):
question description:
question entry point (index.js):
...
 ```
 
 ### yarn install
 
 프로젝트를 시작할 때 `yarn` 혹은 `yarn install` 로 package.json 파일에 정의된 모든 dependencies를 설치할 수 있다.
 
 ```terminal
 $ yarn
$ yarn install
 ```
 
 해당 명령어를 치면, 로컬의 node_modules 폴더에 의존 패키지를 설치하거나 업데이트한다.
 
 강제로 모든 패키지를 다시 다운로드 하고 싶을때는 --force 플래그를 추가한다.
 
  ```terminal
 $ yarn install --force
 ```
 
 
 
 ### yarn add
 
 add 명령으로 dependencies를 설치할 수 있다. 해당 명령어로 패키지를 추가하면 package.json과 yarn.lock 파일을 모두 업데이트해 모든 개발자가 일괄적으로 패키지를 관리할 수 있도록 한다.
 
 ```terminal
 $ yarn add [package]
$ yarn add [package]@[version]
$ yarn add [package]@[tag]
 ```
 
일반적인 dependencies 뿐만 아니라, `--dev` 플래그를 사용하면 devDependencies에 패키지를 추가할 수 있다.
 
 ```terminal
 $ yarn add eslint@^1.0.0 --dev
 ```
 
 
 ### yarn upgrade
 
`yarn upgrade` 로 모든 의존 패키지(dependencies)를 package.json에 정의한 버전의 범위에서 업데이트하거나 삭제할 수 있다.

```terminal
$ yarn upgrade 
```
 
 하지만 모든 패키지를 일괄적으로 업그레이드 시키면 호환성이 보장되지 않기 때문에 conflict가 발생할 수 있다.
 
  따라서 기존 패키지의 업데이트가 필요하다면 업데이트가 필요한 패키지를 지정해 수정하는것이 좋다.
  
  
```terminal
$ yarn upgrade eslint@^4.0.0 
```

 
 ### yarn remove
 
 해당 명령어는 특정 패키지를 프로젝트에서 제거한다는 것을 의미한다.
 `package.json`과 `yarn.lock`에서 동시에 제거된다. 또한, dependencies, devDependencies등 모든 타입에서 패키지가 삭제된다.
 
 
```terminal
$ yarn remove [package]
```

`yarn remove`를 실행하면 `package.json`과 `yarn.lock`을 모두 업데이트한다. 따라서, 한 개발자가 자신의 로컬 환경에서 패키지를 지우면 프로젝트에서 협업하는 다른 동료들도 해당 패키지를 삭제하고, 동일한 의존 패키지(dependencies)를 사용한다.
 
 ### yarn check
 
 `yarn check`는 특정 버전 패키지의 의존 패키지(dependencies)들이 프로젝트에서 유효한지 체크한다. 즉, 현재의 `package.json`이 `yarn.lock`과 일치하는지 확인한다.
 
  ```terminal
$ yarn check
yarn check v1.22.4
warning "@babel/helper-replace-supers#@babel/traverse@^7.13.0" could be deduped from "7.14.2" to "@babel/traverse@7.14.2"
error "eslint-plugin-react-hooks#eslint@^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0" doesn't satisfy found match of "eslint@7.23.0"
...

info Found 7 warnings.
error Found 2 errors.
info Visit https://yarnpkg.com/en/docs/cli/check for documentation about this command.
 ```
 
 위 예시처럼 `yarn check` 명령 후에 `warning`, `error`가 뜬다면 의존 패키지의 버전을 조정할 필요가 있다.
 <br>
 
 - 더 많은 명령어를 알고 싶다면 [공식문서](https://yarnpkg.com/)를 참고하거나, `yarn help`를 치면 된다.
 
 ```terminal
 $ yarn help
 ```

<hr>

## Yarn 주의사항 (feat. npm)

패키지 관리자로 yarn 과 npm을 섞어서 사용하는 경우가 있다. 하지만 yarn 과 npm은 패키지 관리 방식이 다르기 때문에 **충돌**이 날 수 있으므로 가급적이면 혼용하지 않는게 좋다. 👉 [출처](https://askinglot.com/can-you-use-npm-and-yarn-together)

```
warning: package-lock.json found. Your project contains lock files generated by tools
other than Yarn. It is advised not to mix package managers in order to avoid resolution 
inconsistencies caused by unsynchronized lock files. To clear this warning, remove
package-lock.json. 
```

npm: 각 설치한 패키지별로 서브패키지를 이루는 형식. 각 설치한 패키지의 독립성이 보장되지만 패키지 중복으로 인한 크기가 전체적으로 커짐.

yarn: 설치한 패키지와 종속되는 패키지를 공통적으로 사용할 때 일렬로 나열한 뒤 설치 패키지로 링크하는 방식. 패키지 중복이 제거되어 적은 용량으로 빨리 실행되나, 네이티브 및 yarn을 고려하지 않은 버전 관리로 패키지 충돌이 있을 수 있음.

👉 [출처](https://okky.kr/article/874006)


lock 파일이 둘 다 있더라도 에러가 안날 수 있지만, 동일한 패키지 관리자로 진행하는 게 패키지 충돌 오류를 최소화 할 수 있다. 처음에 yarn을 사용했다면 끝까지 yarn을 쓰거나, npm을 썼다면 계속 npm을 사용하는 걸 추천한다.

<hr>


> 참고:
-  [Yarn 톺아보기 - 안녕 프로그래밍](https://www.holaxprogramming.com/2017/12/21/node-yarn-tutorials/)
- [패키지 잠금 파일 (package-lock.json, yarn.lock) - DaleSeo](https://www.daleseo.com/js-package-locks/)
- [yarn 2+ 공식도큐](https://yarnpkg.com/getting-started)
- [yarn 1 공식 도큐](https://classic.yarnpkg.com/en/docs)
- [Can you use NPM and yarn together? - ASKINGLOT](https://askinglot.com/can-you-use-npm-and-yarn-together)
- [Npm과 Yarn 혼용하면 안되는 이유 - OKKY](https://okky.kr/article/874006)