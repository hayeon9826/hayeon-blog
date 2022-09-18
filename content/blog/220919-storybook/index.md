---
title: Storybook 이란?
date: '2022-09-19T11:45:32.169Z'
description: 스토리북이란?
category: 'React'
image: 'https://velog.velcdn.com/images/khy226/post/6d7f5b1d-6f6e-4a13-9ec8-7e898dea2774/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/6d7f5b1d-6f6e-4a13-9ec8-7e898dea2774/image.png" style="width: 80%; padding-bottom: 50px;"/>


본 글은 디자인 시스템을 위한 스토리북 사용 방법을 간단하게 설명하는 페이지 입니다.

> - 스토리북 사용을 위해서는 유료 플랜을 구독하거나, collaborator 등록을 해주셔야 합니다.
> - [스토리북 링크 바로가기](https://storybook.js.org/)

<br />

공식 도큐에 따르면 스토리북은 아래와 같은 서비스이다: 
> Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It’s open source and free.

쉽게 말하면, 컴포넌트를 위한 전용 페이지를 만들수 있는 라이브러리. 즉, UI 컴포넌트 개발 도구이다.

스토리북과 관련된 몇 가지 용어를 알아보자


## 용어정리
#### Storybook: 

컴포넌트를 위한 전용 페이지를 만들수 있는 라이브러리. UI 컴포넌트 개발 도구. ([사이트 바로가기](https://storybook.js.org/))

####  Chromatic:

디자인 컴포넌트 배포 서비스 사이트 ([사이트 바로가기](https://www.chromatic.com/))

####  디자인 시스템:

디자인 시스템은 디자인 원칙, 규격, 다시 사용할 수 있는 UI 패턴과 컴포넌트, 코드를 포괄하는 종합 세트

<br />

## 기본 UX

### 스토리북 기본 UI 


- Manage App : story들이 트리 형태로 나타나는 영역
- Preview Area : story가 그려지는 영역


![storybook ui](https://velog.velcdn.com/images/khy226/post/13a776ef-c605-4170-82f6-fc8496741dfe/image.png)

스토리가 그려지는 preview area는 iframe 형태로 동작한다.
왼쪽 manage app 에서 원하는 스토리를 선택하면 해당 스토리가 오른쪽 preview area에 보여진다.

<br />

### 네비게이션
#### 1. Side Navigation 
왼쪽 네비게이션. 폴더 및 파일을 탐색하는 용도

![storybook navigation](https://velog.velcdn.com/images/khy226/post/000b1d27-1a5e-4260-9390-30f1eb6b6848/image.png)


#### 2. Top Navigation
상단 네비게이션. 스토리영역을 원하는대로 조작할 수 있음

![top navigation](https://velog.velcdn.com/images/khy226/post/9c12ac4a-c5c4-40ec-aeb9-8916a40ae769/image.png)

##### Docs
컴포넌트 및 스토리를 도큐 형태로 보여줌
![docs navigation](https://velog.velcdn.com/images/khy226/post/3239e8b4-b3be-4fb8-b62b-0a9fa13f33fe/image.png)

##### Controls
컴포넌트의 요소들을 컨트롤 할 수 있음

![storybook controls](https://velog.velcdn.com/images/khy226/post/c46663e1-1950-487d-be5e-b0fec7c7b130/image.gif)


##### Actions
컨트롤을 클릭 / 실행했을 때 나타나는 액션들

![storybook actions](https://velog.velcdn.com/images/khy226/post/c6cd1852-ae52-444f-9ff7-a312cd83b044/image.png)


##### Viewport
뷰포트 조정할 수 있음 (웹 / 모바일)

![storybook viewport](https://velog.velcdn.com/images/khy226/post/4f09bbfd-fe5f-4210-a4cb-9cd8dba4d617/image.png)
 

##### Backgrounds
배경 화면 색상 변경 (default / 밝은색 / 검정색)

![storybook backgrounds](https://velog.velcdn.com/images/khy226/post/d2ed373f-6e60-4d9c-ab5d-26e0cdfcaf77/image.png)

##### Measure & outline
화면 측정 기능

![storybook measure 1](https://velog.velcdn.com/images/khy226/post/6a170859-f387-4ff4-9f00-74916cd04c60/image.png)
![storybook measure 2](https://velog.velcdn.com/images/khy226/post/720d0f7c-39d8-4535-a64a-7469923a976c/image.png)
![storybook measure 3](https://velog.velcdn.com/images/khy226/post/6fe8ae7c-4971-449d-b2a4-0811c45ffd4d/image.png)




 ## 참고
 > - [디자인 시스템 1편 - 디자인 가이드/디자인 시스템은 왜 필요한가](https://story.pxd.co.kr/1434)
 > - [스토리북 공식토큐 가이드](https://storybook.js.org/docs/react/get-started/introduction)