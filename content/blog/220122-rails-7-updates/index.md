---
title: Rails 7.0 출시 내용 정리
date: "2022-01-22T22:40:32.169Z"
description: 레일즈 7.0 업데이트 내용 정리
---

<img src="https://velog.velcdn.com/images/khy226/post/47ab711e-5ded-42e1-9b85-e7cf6feedac4/rails7.png" style=" padding-bottom: 50px;">



작년 말, 레일즈 7이 출시되었다. 출시가 된지 꽤 되었지만 아직 레일즈 7을 회사에서 적용하지 않아, 미리 정리도 할 겸 레일즈7 에서 새로 업데이트 된 내용들을 정리해본다. 

- 블로그 [What's New in Rails 7](https://blog.appsignal.com/2021/12/15/whats-new-in-rails7.html) 내용을 중심으로 번역/정리하였다.
-  자세한 내용은 [Rails 7 출시 공식 도큐](https://edgeguides.rubyonrails.org/7_0_release_notes.html) 를 참고하면 좋다.

<hr>

## Node, Webpack 제거
레일즈 7의 JavaScript에서는 노드 JS 또는 Webpack이 더 이상 필요하지 않다. (그래도 npm 패키지는 계속 사용할 수 있다.)

ES6를 Babel로 **트랜스파일**하고, Webpack으로 **번들링**을 하려면 많은 설정이 필요하다. 이전에 레일즈는 `Webpacker gem` 으로 트랜스파일링을 지원했지만, 많은 용량을 차지하고, 코드를 이해 및 변경하기도 어려웠다.

> * **트랜스파일(transpile)**이란 어떤 특정 언어로 작성된 소스 코드를 다른 소스 코드로 변환하는 것을 말합니다.
- **번들링(Bundling)**이란 기본적으로 여러 개로 흩어져 있는 파일들을 압축, 난독화 등을 하여 하나의 파일로 모아주는 역할을 합니다. 주로 JavaScript를 위한 번들러지만 플러그인 등을 통해 HTML, CSS, 심지어 이미지까지 압축하거나 최적화를 합니다.
**출처: [트랜스파일이란?](https://ooz.co.kr/416)**


이제 `rails new` 메서드로 만든 새 앱의 기본값은 `importmaps-rails` gem을 통해 import map을 사용한다. 기존 `package.json` 와 npm, yarn으로 패키지를 설치하는 방법 대신 `./bin/importmap` CLI를 사용하여 패키지를 관리 할 수 있다.

예를 들어, `date-fns`를 설치하려면 다음과 같이 할 수 있다.

```ruby
$ ./bin/importmap pin date-fns
```

위 명령어는 `config/importmap.rb` 파일에 아래 줄을 추가한다.

```ruby
pin "date-fns", to: "https://ga.jspm.io/npm:date-fns@2.27.0/esm/index.js"
```

아래와 같이 import 해서 사용할 수 있다.

```javascript
import { formatDistance, subDays } from 'date-fns'

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

```

다만, 유의해야 할 점은  `./bin/importmap CLI`는 **트랜스파일링** 과정 없이 브라우저에서 파일을 가져온다는 것이다.  따라서, .js로 트랜스파일링이 필요한 `TypeScript`나 `JSX`에서는 사용할 수 없다.

따라서 JSX와 함께 React를 사용하려면 다른 설정`(webpack/rollup/esbuild)` 으로 설정해야 한다.

레일즈7 에서는 아래 명령어로 `webpack/rollup/esbuild` 설정 할 수 있다.

```ruby
$ ./bin/rails javascript:install:[esbuild|rollup|webpack]
```

## Turbolinks와 UJS 대신 'Turbo와 Stimulus' 사용

레일즈 7은 프론트엔드에서 **터보링크(TurboLinks)** 및 레일즈 UJS를 **핫와이어(Hotwire)의 터보(Turbo) 및 스티뮬러스(Stimulus)**로 대체한다. 

각 용어에 대한 개념을 간략하게 찾아보았다.

> **터보링크란? **
애플리케이션의 응답 속도를 높이기 위한 노력의 일환으로 등장한 것이 바로 **터보링크(Turbolinks)**다. 터보링크는 이름에서도 짐작할 수 있듯이 웹페이지에 있는 링크를 클릭했을 때 현재 페이지를 유지한 채, 브라우저에서 전체 웹페이지를 재컴파일하지 않고 BODY 태그와 헤드 부분의 ‘TITLE’ 값만 불러오도록 함으로써 전체적인 응답속도를 향상시키도록 한다.
출처: [터보링크(Turbolinks) 이해하기](https://withrails.com/2016/01/01/%ED%84%B0%EB%B3%B4%EB%A7%81%ED%81%ACturbolinks-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0/)

[Hotwire](https://hotwired.dev/)는 최신 웹페이지를 JavaScript와 JSON 전송대신, HTML을 직접 전송해서 DOM에 대한 빠른 업데이트를 제공하는 새로운 접근 방식이다. 

> **Hotwire란?**	
- 최신 웹페이지를 JavaScript와 JSON 전송대신, HTML을 직접 전송해서 만드는 방식 (이메일 서비스 Hey의 프론트엔드에 사용)
- 빠른 페이지로딩, 서버 렌더링, SPA의 속도와 반응성을 희생하지 않으면서 서버쪽에서 다양한 언어 사용 가능
[출처: GeekNews(긱뉴스) ](https://news.hada.io/topic?id=3479)

> **Turbo, Stimulus 란?**
- **Turbo** : Hotwire의 핵심. 빠른 웹앱을 만들수 있도록 기술의 모음
ㅤ→ Turbo Drive : 모든 a 링크 클릭 및 form submit 을 fetch 로 변환해서 서버에서 읽어와 body를 교체. SPA처럼 동작하게 변경
ㅤ→ Turbo Frames : 복잡한 페이지를 프레임으로 분리해서 각각 로딩 및 렌더링. iframe과 비슷하지만 한개의 DOM에서 처리되는 가상 frame
ㅤ→ Turbo Streams : 페이지 변경사항을 Websocket으로 스트림 전송
ㅤ→ Turbo Native : Turbo의 방식을 iOS/Android 하이브리드 앱에 사용 가능하게 지원
- **Stimulus** : Turbo가 80%를 처리하고, 나머지 부분을 처리. 최소한의 JS프레임워크

## 데이터베이스 암호화

Rails 7에서는 `ActiveRecord:Base`의 암호화 메서드을 사용하여 특정 데이터베이스 필드를 암호화하여 표시할 수 있다. 즉, 초기 설정 후 아래와 같은 코드로 암호화를 할 수 있다.

```ruby
class Message < ApplicationRecord
  encrypts :text
end
```

 Rails 7 에서 자동으로 암호화 및 해독을 하기 때문에 암호화된 필드는 다른 필드처럼 동일하게 사용하면 된다.
 


주의해야할 점은, 암호화 방법에 `deterministic: true` 옵션을 주지 않으면 데이터베이스에서 암호화된 필드를 쿼리할 수 없다는 것이다. deterministic 모드는 기본 모드보다 보안이 낮으므로 반드시 필요한 경우에만 사용해야한다.

## 비동기 쿼리
레일즈7 에는 백그라운드에서 쿼리를 날릴 수 있는 `load_async` 메서드가 있다. 이 메서드는 특히 컨트롤러에서 관련 없는 쿼리를 여러 개 로드해야 할 때  중요하다. 코드는 아래와 같이 실행할 수 있다.

```ruby
def PostsController
  def index
    @posts = Post.load_async
    @categories = Category.load_async
  end
end
```

위 코드를 실행 하면 `Post.load_async` 와 `Category.load_async` 두 쿼리가 동시에 백그라운드에서 실행된다. 따라서, 만약 각 쿼리 실행시간이 `200ms` 라고 가정할 때, `load_async` 를 사용한다면 `400ms` 대신 `200ms` 이하의 실행시간으로 데이터를 가져올 수 있다.

## Zeitwerk 로더 사용


레일즈 7 부터는 auto loader을 `classic` 모드 대신에 `Zeitwerk` 모드를 사용해야 한다. 
> **Zeitwerk? Classic?**
- 레일즈 5까지는 **Active Support**에 구현된 auto loader를 사용했다. 이 auto loader를 `:Classic`라고 부르며, 레일즈 6.x까지 사용할 수 있다. 다만, 이번에 출시된 레일즈 7에는 더 이상 기본 classic `auto loader`가 포함되지 않는다.
- 레일즈 6 부터는 업데이트 된 `:Zeitwerk` auto loader를 기본으로 사용한다. 특히, 레일즈 7에서는 `:Zeitwerk` 모드만 사용할 수 있다.
**출처: [공식 도큐]**(https://edgeguides.rubyonrails.org/classic_to_zeitwerk_howto.html)



변경 방법은 매우 간단한데, 레일즈 6 이상은`application.rb`파일에서 `config.autoloader ` 부분을 변경해주면 된다.

```ruby
# config/application.rb
config.load_defaults 6.0
config.autoloader = :classic # DELETE THIS LINE
```

레일즈 5 이하는 `config.autoloader = :zeitwerk`로 zeitwerk 모드를 설정해주면 된다.
```ruby
# config/application.rb
config.load_defaults 5.2
config.autoloader = :zeitwerk
```

Zeitwerk에 대한 자세한 설명은 [공식 도큐](https://edgeguides.rubyonrails.org/classic_to_zeitwerk_howto.html)를 참고하길 바란다.

<hr>

## 그 외 레일즈 7 업데이트

### Jobs 재시도 횟수 제한 없음

이제 `ActiveJob`은 retry_on의 `attempts` 매개 변수로 `:unlimited`를 설정할 수 있다. `attempts: :unlimited` 로 설정하면 레일즈은 제한 없이 jobs을 계속 실행할 수 있다.



```ruby
class MyJob < ActiveJob::Base
  retry_on(AlwaysRetryException, attempts: :unlimited)

  def perform
    raise "KABOOM"
  end
end
```

### Variants 이름 지정

`ActiveStorage` 에서 모든 액세스 크기를 지정하는 대신 Variants 이름을 지정할 수 있다.

```ruby
class User < ApplicationRecord
  has_one_attached :avatar do |attachable|
    attachable.variant :thumb, resize: "100x100"
  end
end

# Call avatar.variant(:thumb) to get a thumb variant of an avatar:
<%= image_tag user.avatar.variant(:thumb) %>
```

### tag.attributes 메서드

해시를 **HTML 속성**으로 변환해 뷰에 사용할 수 있는 새로운 `tag.attributes` 메서드가 있다.


```ruby
<input <%= tag.attributes(type: :text, aria: { label: "Search" }) %>>
```

위 코드는 아래와 같은 html 태그를 생성한다.
```html
<input type="text" aria-label="Search">
```

### Ruby 디버그
디버깅을 위한 기본값이 byebug에서 [debug gem](https://edgeguides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem)으로 변경되었다. 
byebug를 호출하는 대신 debugger를 호출하여 디버깅 세션을 시작해야 한다.

### Sole 쿼리

단일 레코드를 쿼리할 때 (`first`, `find_by` 대신) `sole`이나 `find_sole_by` 를 호출할 수 있다. 

`sole`이나 `find_sole_by`는 해당 레코드가 unique 한지 아닌지 확인하여 단일 레코드일때만 해당 데이터를 리턴한다. 만약 두개 이상의 레코드가 있다면 ` ActiveRecord::SoleRecordExceeded ` 에러를 반환한다.

```ruby
Product.where(["price = %?", price]).sole
# => ActiveRecord::RecordNotFound      (if no Product with given price)
# => #<Product ...>                    (if one Product with given price)
# => ActiveRecord::SoleRecordExceeded  (if more than one Product with given price)

user.api_keys.find_sole_by(key: key)
# as above
```

### Association 확인

`:join`을 통해 ID가 있는지 없는지 확인하는 대신, `where.association(:association)` 을 사용해 레코드에 association이 있는지 확인할 수 있다.

```ruby
# Before:
account.users.joins(:contact).where.not(contact_id: nil)

# After:
account.users.where.associated(:contact)
```

### 컨트롤러  파일 스트리밍

컨트롤러에서 `send_stream`을 사용해 생성 중인 파일을 즉시 스트리밍할 수 있다.



```ruby
send_stream(filename: "subscribers.csv") do |stream|
  stream.write "email_address,updated_at\n"

  @subscribers.find_each do |subscriber|
    stream.write "#{subscriber.email_address},#{subscriber.updated_at}\n"
  end
end
```

이렇게 하면 사용자에게 즉각적인 (partial) 응답을 제공하므로, 사용자가 어떤 일이 일어나고 있는지 알 수 있으며 Heroku에 배포할 경우 추가적인 이점이 있다.

파일이 즉시 스트리밍되기 때문에 헤로쿠는 연결을 종료하지 않는다.  즉, 30초 이상 걸리는 일회성 파일을 생성하기 위해 백그라운드 작업에 의존할 필요가 없다.

## Rails 7로 업그레이드

이전 버전의 Rails와 마찬가지로 업그레이드는 간단하다. 아직 공식 업그레이드 가이드가 없지만 단계는 아래와 같다.




1. Gemfile에서 Rails 버전을 `7.0.0.rc1` (혹은 그 이상)로 변경하고 `bundle update`를 실행한다.
2. `bundle exec rails app:update`를 실행한다. CLI에 나온 설명에 따라 필요에 따라 파일을 추가/교체/수정한다.
3. 테스트를 실행하고 모든 것이 잘 작동하는지 확인한다.


<hr>

## 그외

- [Ruby on Rails 7.0 Release Notes](https://edgeguides.rubyonrails.org/7_0_release_notes.html) 공식 도큐에서 변경된 전체 내용을 볼 수 있다. 
- 1월 6일 레일즈 7.0.1 이 출시되었다. [Rails 7.0.1 has been released](https://rubyonrails.org/2022/1/6/Rails-7-0-1-has-been-releasedhttps://rubyonrails.org/2022/1/6/Rails-7-0-1-has-been-released) 에서 자세한 내용을 확인할 수 있다.

<hr>

## 출처
> - [What's New in Rails 7](https://blog.appsignal.com/2021/12/15/whats-new-in-rails7.html) 
> - [Ruby on Rails 7.0 Release Notes](https://edgeguides.rubyonrails.org/7_0_release_notes.html)
> - [Ruby on Rails 7.0.1 CHANGELOG](https://github.com/rails/rails/releases/tag/v7.0.1)