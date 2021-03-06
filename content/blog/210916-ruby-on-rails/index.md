---
title: Ruby on Rails 기본 개념 정리
date: '2021-09-16T22:40:32.169Z'
description: Ruby와 Ruby on Rails 프레임워크에 대해서 정리하는 글
category: 'Rails'
image: 'https://velog.velcdn.com/images/khy226/post/6b8990d8-8754-47ce-8cd2-309038a864fa/Ruby_on_Rails-Logo.wine.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/6b8990d8-8754-47ce-8cd2-309038a864fa/Ruby_on_Rails-Logo.wine.png" style="width: 50%; padding-bottom: 50px;">

Ruby on Rails에 대해서 정리하는 글 입니다.

> 1. Ruby

1. 스크립트 언어
2. OOP (Object Oriented Language)

2) Rails Framework

1. MVC
2. ORM

3) Ruby on Rails의 장단점

1. Ruby on Rails 장점
2. Ruby on Rails 단점

<br>

### Ruby

Ruby는 일본 개발자 Yukihiro Mastumoto가 개발한 **스크립트 언어**이자 **객체 지향 언어**이다.

#### 1) 스크립트 언어

**스크립트(Script) 언어**란, 소스 코드를 컴파일 하지 않고도 내장된 번역기(**인터프리터**)로 바로 실행할 수 있는 언어를 말한다.

가령, C나 Java 같은 언어는 작성한 코드를 **컴파일러**를 통해 기계어 코드로 변경해야 실행할 수 있다. **컴파일(Compile)**은 주어진 언어로 작성된 컴퓨터 프로그램을 **다른 언어의 동등한 프로그램**으로 변환하는 프로세스이다.

반면, Ruby는 소스를 작성한 후 컴파일 과정 없이 바로 실행하여 결과를 확인할 수 있는 **스크립트 언어**이다.

<hr>

#### 2) OOP (Object Oriented Language)

> 루비는 **순수 객체 지향 언어**라, 정수나 문자열 등을 포함한 데이터 형식 등 모든 것이 **객체**이다.
> **객체 지향 프로그래밍**은 컴퓨터 프로그래밍의 패러다임 중 하나이다. 객체 지향 프로그래밍은 **컴퓨터 프로그램**을 명령어의 목록으로 보는 시각에서 벗어나 여러 개의 독립된 단위, 즉 **"객체"들의 모임**으로 파악하고자 하는 것이다. 각각의 객체는 메시지를 주고받고, 데이터를 처리할 수 있다.
> (출처: 위키피디아)

OOP(Object Oriented Language)는 객체 지향 프로그래밍 언어로, 객체를 중심으로 작성하는 언어이다.

Ruby에서는 모든 것이 객체이다. 따라서 Ruby에서 모든 것은 자신만의 **속성**과 **액션**을 갖는다. 객체지향 프로그래밍에서 이런 속성을 **인스턴스 변수**라고 하고, 액션을 **메서드**라고 한다. 아래 예제처럼, 루비는 '숫자' 마저도 객체로 다룬다.

```ruby
5.times { print "Hello World" }
```

많은 프로그래밍 언어에서 숫자는 원시 타입이지 **객체**로 취급하지 않는다. 하지만 Ruby는 모든 형태의 것에 **메서드**와 **인스턴스 변수**를 부여한다. 이러한 루비의 **순수 객체지향 특성**은 모든 곳에서 일관되게 적용되므로, OOP 개념에 익숙해지면 Ruby를 더 쉽게 사용할 수 있다.

> 출처: https://www.ruby-lang.org/ko/about/

<hr>

### Rails Framework

레일즈는 루비 언어로 작성된 웹 어플리케이션 **프레임워크**이다.

랄프 존슨(Ralph Johnson) 교수는 프레임워크가 <u>"소프트웨어의 구체적인 부분에 해당하는 설계와 구현을 재사용이 가능하게끔 일련의 협업화된 형태로 클래스들을 제공하는 것"</u> 이라고 정의하였다.

아래는 공식문서에서 정의하는 레일즈 프레임워크의 정의이다.

> 레일즈는 루비 언어로 작성된 웹 어플리케이션 **프레임워크** 입니다. 레일즈는 모든 개발자가 개발을 시작 할때 필요한 초기 준비나 가정들을 쉽게 만들수 있는 **도구**를 제공하여, 웹 어플리케이션 프로그래밍을 더 **쉽게** 만들수 있도록 **설계** 되어 있습니다. ( \*출처: [레일즈 가이드](https://rubykr.github.io/rails_guides/getting_started.html) )

프레임워크란 간단히 말해서 **프로그램을 만들기 위한 틀**이다. 일종의 프로그래밍 키트라고 할 수 있다. 프로그램의 기본 뼈대가 되는 소프트웨어로, 기본적인 기능들을 미리 만들어둔 **라이브러리**가 포함되어있다.

예를들어, `rails new blog` 명령어를 쳐서 프로젝트를 생성하면 아래와 같이 수많은 파일들이 생긴다.

![](https://images.velog.io/images/khy226/post/78d10bb3-20d0-40db-a1e8-19c8de00e972/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-16%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%201.40.03.png)

Rails가 프로젝트를 더 쉽게 개발할 수 있도록 기본적인 뼈대를 만들어 준 것이다. 만약 Rails가 없었더라면 저 수백개의 파일, 라이브러리를 하나하나 다 프로그래밍 해야한다. 이렇게 프로그램의 기본틀이 바로 **프레임워크**이다.

추가적으로, 프레임워크만으로는 프로젝트가 완성되지 않으며 개발자가 프레임워크를 사용해 기능들을 추가 해야한다. 개발을 할 때에는 프레임워크만의 규칙들을 따라서 개발해야한다.

<hr>

#### MVC

레일즈는 MVC 패턴으로 구성되어있다. 다시말해, 레일즈는 모델(Model), 뷰(View), 컨트롤러(Controller) 세 가지의 큰 구성요소로 만들어진 소프트웨어라는 뜻이다.

** 1) 모델(Models) **
모델은 어플리케이션의 데이터를 다룬다. 레일즈에서 모델은 주로 데이터베이스 테이블과 상호 작용하는 규칙들을 관리한다. 또한, 일반적으로 비즈니스 로직(Service)은 모델에서 만든다. 비즈니스 로직이란, 사용자가 보기 원하는 결과물을 도출하기 위해 컴퓨터가 진행하는 일련의 과정(데이터 생성 및 조작)을 뜻한다.

** 2) 뷰(Views) **
뷰는 어플리케이션의 유저 화면(인터페이스)를 의미한다. 레일즈에서 뷰는 주로 루비 코드가 삽입되어 있는 HTML 파일이며, html.erb 확장자로 사용한다. 뷰는 웹 브라우저에 데이터를 제공하며, 사용자들에게 보여지는 화면이다.

** 3) 컨트롤러(Controllers) **
컨트롤러는 모델과 뷰를 "연결"하는 역할을 한다. 레일즈에서 컨트롤러는 웹브라우저의 요청 받아서, 모델을 통해서 데이터를 조회하며, 출력을 위해 뷰에게 데이터를 넘겨준다.

<hr>

#### ORM(Object Relational Mapping)

마지막으로, 레일즈는 직접 SQL 문을 사용해서 데이터를 가져오지 않고, **ActiveRecords**라는 **ORM** 프레임워크를 사용해서 데이터를 조작한다.

> ORM(Object Relational Mapping): **데이터베이스**와 **객체 지향 프로그래밍 언어** 간의 호환되지 않는 데이터를 **변환**하는 프로그래밍 기법 (위키백과)

쉽게 말해, **객체-관계 매핑**의 줄임말이다. 모델 데이터에 접근하기 위해서는, 테이블과 객체를 연결해야하는데 불일치가 발생해서 바로 연결이 되지 않는다. 이때, ORM을 통해 SQL문을 자동으로 생성하여 불일치를 해결한다. 따라서, **ActiveRecord**를 통해 SQL문을 짜지 않고도 쉽게 데이터베이스를 조작할 수 있다.

예를들어, 레일즈에서 "고객" 사용자들만 가져오는 쿼리문을 짠다고 할때,

```sql
SELECT * FROM USERS WHERE CONSUMER = 'TRUE'
```

위와같은 SQL문을 작성하지 않고,

```ruby
User.where(cosumer: true)
```

단순하게 모델을 참고해서 데이터를 조회할 수 있다.

<hr>

### Ruby on Rails의 장단점

#### 1) Ruby on Rails 장점:

- **입문자가 배우기 쉽다**: 형식이 자유로워 Python 처럼 인덱스, 들여쓰기를 필수적으로 하지 않아도 된다. 세미 콜론 같은 종결표시를 하지 않고도 줄마꿈만 하면 코드가 종결된다. (같은 라인에서는 세미콜론 찍어줘야한다). 또한, 사람들이 사용하는 언어와 비슷해서, 초보자들이 배우기 쉽다.

- **개발하기 편리하다**: 다양한 Gem (라이브러리)을 통해 기능을 빠르게 구현할 수 있으며, 데이터베이스 작업할 때 엑티브레코드 패턴을 적용한 ORM을 도입하여 편리하게 구현할 수 있다. 또한, 내장된 라이브러리로 초기 일회성 설정으로 자동 배포가 가능하다.

- **확장성과 이식성이 높다**: 루비를 지원하는 OS라면 추가 작업 없이 프로그램이 실행될 수 있다. 유지보수에 쓰이는 비용과 시간을 절약해주며, 파이썬이나 JavaScript 등 다른 언어로 개발된 라이브러리를 Ruby 위에 쉽게 구현 가능할 수 있다.

- **MVC 아키텍처**: MVC 패턴에 익숙한 개발자는 레일즈를 쉽게 다룰 수 있다.

<hr>

#### 2) Ruby on Rails 단점:

- **속도가 느리다**: 인터프리터 언어는 명령문 별로 코드 구문을 실행하기 때문에 컴파일러를 사용하는 언어에 비해 속도가 느리다. 또한, Ruby는 높은 메모리 소비와 느린 가비지 콜렉션(garbage collection)으로 속도가 느리다. (프레임워크 속도 비교한 사이트에서 하위권으로 나온 결과가 있다: https://web-frameworks-benchmark.netlify.app/result)

- **국내 사용율이 낮다**: 국내에서 ruby 사용율이 저조하고 관련된 문서들도 적은 편이다. 개발자 채용에서도 `#ruby` `#ruby on rails`로 채용 공고를 검색하면 다른 언어 대비 매우 적은 양의 공고가 뜬다..😂. 반대로, 레일즈 프로젝트로 서비스를 시작했다가 개발자를 구하지 못해 어려움을 겪기도 한다.
- **제한이 많다 **: 이미 구현된 라이브러리와 프레임워크로 빠른 개발이 가능하지만, 유니크한 설계로 다시 커스터마이징을 하기에는 어려움이 있다.

<br>
<br>
<br>

> 참고:
> https://kbs4674.tistory.com/6
> https://freemoa-blog.com/903
> https://rubykr.github.io/rails_guides/getting_started.html
> https://jokergt.tistory.com/81
> https://railsguides.kr/active_record_basics.html
