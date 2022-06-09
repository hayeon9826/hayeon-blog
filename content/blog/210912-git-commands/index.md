---
title: "Git 명령어 정리"
date: "2021-09-12T22:40:32.169Z"
description: Git 개념과 자주 사용하는 명령어 정리
category: "Development"
---

<img src="https://velog.velcdn.com/images/khy226/post/d85518eb-17a0-4df9-8277-79080c01a569/git.png" style="width: 50%; padding-bottom: 100px;">

### Git 이란?

> **Git**은 컴퓨터 파일의 변경사항을 추적하고 여러 명의 사용자들 간에 해당 파일들의 작업을 조율하기 위한 **분산 버전 관리 시스템**이다. 소프트웨어 개발에서 소스 코드 관리에 주로 사용되지만 어떠한 집합의 파일의 변경사항을 지속적으로 추적하기 위해 사용될 수 있다. (출처: 위키백과) 

 Git은 파일 변화를 시간에 따라 기록했다가 나중에 특정 시점의 버전을 다시 꺼내올 수 있는 ** 버전 관리 시스템** 이다.  여러 개발자들이 협업을 할 때 코드 버전이 다르면 충돌이 날 수도 있고, 이전 버전으로 돌아 가야할 상황들이 온다. 이런 문제들을 해결하여 코드 관리를 **원활하게 관리**하려고 등장한 도구이다. **버전 관리 시스템 (VCS)** 장점은 아래와 같다.

> **VCS**를 사용하면 각 파일을 **이전 상태**로 되돌릴 수 있고, 프로젝트를 통째로 이전 상태로 되돌릴 수 있고, 시간에 따라 수정 내용을 **비교**해 볼 수 있고, 누가 문제를 일으켰는지도 **추적**할 수 있고, 누가 언제 만들어낸 이슈인지도 알 수 있다.  VCS를 사용하면 파일을 잃어버리거나 잘못 고쳤을 때도 **쉽게 복구**할 수 있다 
*참고: [Git 설명 문서](https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-%EB%B2%84%EC%A0%84-%EA%B4%80%EB%A6%AC%EB%9E%80%3F)

특히, Git은 버전 관리 시스템 중  **분산 버전 관리 시스템 (Distributed Version Control System)** 이다. 중앙 서버에만 저장소가 있는 중앙 집중형 버전관리 시스템과는 달리, 모든 **클라이언트**가 **저장소(repository)**가 될 수 있다.

![](https://images.velog.io/images/khy226/post/ac19eb34-b789-4e28-b131-b3ed6d5e4bfd/distributed.png)

> 출처: [1.1 시작하기 - 버전 관리란?](https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-%EB%B2%84%EC%A0%84-%EA%B4%80%EB%A6%AC%EB%9E%80%3F)

DVCS에서는 저장소에서 사용자 컴퓨터에 최신 코드만 받아오는 것이 아니라, **저장소 자체**를 모두 가져올 수 있다. 즉, **소스 코드** 뿐만 아니라, 그동안의 변경 이력과 **히스토리**를 전부 가져와 복제한다. 로컬 컴퓨터가 **완전한 저장소**로서의 역할을 하는 것이다. 따라서 서버에 문제가 생겨도, 클라이언트의 저장소를 복원시켜 문제를 해결할 수 있다.

또한, DVCS에는 **원격 저장소 (remote repository)**가 **여러개** 존재할 수 있다. 이 때문에 여러 개발자들이 동시에 다양한 방법으로 **협업**할 수 있다.



<br />

### Git 기본 용어

Git에서 기본적으로 사용하는 용어들은 아래와 같다.

#### 브랜치(Branch)
개발의 한 가지 또는 분기점을 의미한다. 기본적으로 레포지터리를 만들면 main 브랜치가 생기며, 원하는 독립적인 브랜치를 만들어서 개발을 진행할 수 있다.

#### 저장소(Repository)
코드 저장소이다. 깃헙에 올라간 모든 히스토리, 소스코드, 태그, 이슈, 버전 등을 확인할 수 있다.

#### 커밋(Commit)
파일 및 폴더의 추가, 변경 사항을 저장소에 기록하는 작업이다.

#### 펫치 (fetch)
원격 저장소의 최신 이력을 확인하는 작업이다. 단순히 원격 저장소의 내용을 확인만 하고 로컬 데이터와 병합 하고 싶지 않은 경우에는 fetch 명령어를 사용한다.

#### 풀(pull)
원격 저장소의 내용을 가져와 자동으로 병합 작업을 실행한다.

#### 푸시(push)
로컬에서 작업한 내용을 원격 저장소에 저장하는 작업이다.

#### 헤드(HEAD)
현재 작업중인 브랜치이다.

#### 체크아웃 (checkout)
내가 사용할 브랜치를 지정하는 작업이다. 현재 작업중인 브랜치에서, 다른 브랜치로 이동하고 싶을 때 사용한다.

#### 머지 (merge)
다른 브랜치의 내용을 현재 작업중인 브랜치로 가져와서 합치는 작업이다.

<br />

### Git 명령어

Git에 대한 이해를 했으면, 이제 Git에서 자주 사용하는 명령어를 익혀보자.

자주 사용하는 Git 명령어는 아래와 같다. 

```terminal 
- git config
- git init
- git clone
- git add
- git commit
- git diff
- git reset
- git status
- git rm
- git log
- git branch
- git checkout
- git remote
- git push
- git pull
- git stash
```

> 출처: [Top 20 Git Commands With Examples](https://dzone.com/articles/top-20-git-commands-with-examples)


### git config

 Git 사용자명과 이메일 설정 내용을 확인하고 변경할 수 있다. `--global`을 붙이면 시스템 전역으로 설정할 수 있고, `--global`을 붙이지 않고 원하는 디렉터리에만 깃 설정을 변경할 수 있다.


- 현재 깃 유저 이름 & 이메일 설정을 확인하고 싶을 때:
`$ git config user.name`
`$ git config user.email`

- 전역 설정할 때:
`$ git config --global user.name "test123"`
`$ git config --global user.email "test123@test"`

- working directory에만 설정할 때:
`$ git config user.name "test123"`
`$ git config user.email "test123@test"`

![](https://images.velog.io/images/khy226/post/0072e180-0297-4c71-a4a0-7e43c33bd0cf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.36.10.png)

* 주의: 한번 커밋한 후에는 설정을 변경할 수 없다.


### git init
로컬에 새로운 레포지토리를 만들 때 사용한다.

결과:
`$ git init`
![](https://images.velog.io/images/khy226/post/d02689e3-9f56-41ac-b2e3-f78e664aa3c1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.35.00.png)


### git clone
이미 생성된 원격 저장소를 복제해올 때 사용한다.
`git clone [url]`

예시) `git clone git@github.com:******/react-rails.git`

![](https://images.velog.io/images/khy226/post/ca2f0832-1022-461d-8197-3f449976b769/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.37.18.png)


### git add

변경된 파일을 추적(stage)시키는 명령어다. 

`git add .` 

위 명령어는 변경이 일어난 모든 파일을 추적하게 한다.
추적되고 있는 파일만 커밋에 포함되며, 주로 `git add .` 의 형태로 사용한다.



### git commit

커밋으로 추적한 파일 및 폴더의 추가/변경 사항을 저장소에 기록한다. 어떤 기능을 추가했는지 간단한 메세지와 함께 기록할 수 있다.

`git commit -m "[commit 메세지 작성]"`

![](https://images.velog.io/images/khy226/post/2eb12330-1369-452d-ac5d-b08d805aa3b4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.40.46.png)


### git diff

아직 추적(staged) 되지 않는 파일들을 보여준다.  (`git add `이전 상태의 파일들을 보여준다.)

`git diff`
![](https://images.velog.io/images/khy226/post/ba6751fb-affc-4733-bb8a-e8eab9634aaa/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.45.45.png)


### git reset
원하는 (이전) 커밋으로 레포지토리를 재설정한다. 해당 커밋 이후의 이력은 사라지게된다.

`git reset <옵션> <commit>`

<옵션> 에는 hard, soft, mixed가 있다.

1) `git reset --hard a1b2c3`
`a1b2c3` commit으로 되돌아가지만, 해당 commit 이력 이후의 모든 히스토리를 지운다.

2) `git reset --soft a1b2c3`
`a1b2c3` commit으로 되돌아가고, 이후의 내용들도 보존된다. 바로 다시 커밋할 수 있는 상태.

3) `git reset --mixed a1b2c3`
`a1b2c3` commit으로 되돌아가고, 이후의 내용들도 보존된다. 하지만 인덱스가 초기화 되어서 커밋을 하려면 다시 변경된 내용들을 추가해야한다.(기본옵션)

### git status
commit 되어야 할 파일들을 모두 나열한다.

`git status`
![](https://images.velog.io/images/khy226/post/e73dab56-e6d9-499e-8dca-527bfedf7069/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.57.21.png)

### git rm
working 디렉토리에 있는 파일을 모두 지우고, 삭제된 내역을 추적한다.

`git rm [file]`


### git log

현 브랜치의 버전 히스토리를 보여준다.

`git log`

![](https://images.velog.io/images/khy226/post/ae2c6441-a3c5-4551-b07e-d2dff6af82ac/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.58.34.png)


### git branch
현 레포지터리에 있는 모든 로컬 브랜치를 보여준다.

1) `git branch`

![](https://images.velog.io/images/khy226/post/5914e51c-4c82-4b34-8b05-b93be92cfa6a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.00.52.png)

2) `git branch [브랜치명]`
 새로운 브랜치를 생성한다.
 
3)  `git branch -d [브랜치명]`
 원하는 로컬 브랜치를 삭제한다.
 
 
 ### git checkout
 
 현재 작업중인 브랜치에서 다른 브랜치로 이동하고 싶을 때 사용한다.
 
 `git checkout [브랜치명]`
 
 새로운 브랜치를 생성함과 동시에 변경을 하고 싶다면 `-b` 를 붙여주면 된다
 
 `git checout -b [브랜치명]`
 
 ### git remote
 
 원격 저장소를 확인하거나 연결할 때 사용한다.
 
 1) `git remote -v`
 원격 저장소를 확인할 때 사용
 ![](https://images.velog.io/images/khy226/post/01459c24-4b34-46ea-9577-8322df34c3da/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.06.07.png)
 
2)  `git remote add origin [원격 저장소 url]`
 
로컬 환경에 작업 중이던 프로젝트를 원격 저장소에 연결할 때 사용

### git push

`git push [원격 저장소 별칭] [브랜치명]`

예시) `git push origin main`

연결된 원격 저장소로 변경된 파일들과 커밋 내역을 추가한다.


### git pull

`git pull [원격 저장소 별칭] [브랜치명]`

예시) `git pull origin main`

연결된 원격 저장소에서 데이터를 가져오면서, 자동으로 로컬 브랜치에 병합(merge)를 수행

### git stash

1) `git stash`
아직 마무리 되지 않은 작업들을 스택에 잠시 저장한다. 임시로 변경된 파일들을 commit 하지 않고, 저장할 수 있다.

![](https://images.velog.io/images/khy226/post/7acdb304-1c07-4b58-97cd-beec9feaeb93/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.12.43.png)

2) `git stash list`
지금까지 stash된 목록들을 확인할 수 있다.
![](https://images.velog.io/images/khy226/post/bc1ce400-a838-445d-8826-4f14c75a4335/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-12%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.14.41.png)

3) `git stash apply`
가장 최근의 stash를 가져와서 적용한다.

3) `git stash drop`
가장 최근의 stash를  삭제한다.






