---
title: '[Rails] 액티브 레코드 데이터 검증 & 콜백 정리'
date: "2021-11-18T22:40:32.169Z"
description: 액티브 레코드 데이터 검증(Validation) 알아보기
category: "Rails"
---

<img src="https://velog.velcdn.com/images/khy226/post/6051434a-30e1-489e-bda5-9c9ab2cddba1/Ruby_on_Rails-Logo.wine.png" style="width: 60%; padding-bottom: 50px;">



## 객체 생명 주기

레일즈 어플리케이션 실행중에, 객체는 만들어지고, 갱신되고, 삭제 되는데, 액티브 레코드는 이러한 *객체 생명 주기*내에서 hook을 제공한다. hook을 통해 어플리케이션과 데이터를 조종할 수 있다. 예를 들어, 객체 생성 전에 데이터 검증을 하거나, 콜백 / 옵저버로 객체 상태 변화 전 로직을 실행할 수 있다.

- 데이터 검증: 데이터베이스에 오직 유효만 데이터의 입력을 보장

- 콜백, 옵저버: 객체의 상태 변화 전/후에 로직을 실행하도록 허용

이 글에서는 **데이터 검증**에 대해 (특히, 모델 수준에서 데이터 검증) 알아보려고 한다.
<hr>


##  데이터 검증?

데이터 검증은 오직 유효한 데이터만 데이터베이스에 들어가도록 검증하는 작업을 뜻한다. 예를 들어, 모든 회원들이 필수로 유효한 이메일 주소를 입력하도록 검증할 수 있다. 

데이터베이스에 데이터를 저장하기 전에 데이터를 검증하는 여러가지 방법이 있다.

1. 데이터베이스 고유의 제약사항
2. 클라이언트 측에서 데이터 검증
3. 컨트롤러 수준의 데이터 검증
4. **모델 수준의 데이터 검증**

위 방법 중, 모델에서 데이터 검증을 실행하는 것이 가장 신뢰성이 높고, 테스트 및 유지보수에 편하다.



### 데이터 검증 시점 

그렇다면 데이터 검증은 어떤 시점에 시행되는 걸까?

새로운 레코드를 만들면 DB에 `INSERT` SQL 명령어를 전달하고, 데이터를 수정하면 DB에 `UPDATE` SQL 명령어를 전달하는데, 데이터 검증은 보통 데이터베이스에 이런 명령어를 전달하기 전에 실행된다. 만약에 데이터 검증이 하나라도 실패하면, 해당 객체는 타당하지 않은 객체로 기록되고, 액티브 레코드는 `INSERT`나 `UPDATE` 명령을 실행하지 않는다. 

아래의 메소드는 데이터 검증을 실행시키며, 객체가 유효할때만 데이터베이스에 저장한다:

- `create`
- `create!`
- `save`
- `save!`
- `update`
- `update_attributes`
- `update_attributes!`

> ### 뱅(!) 버전과 non-bang 버전은 어떻게 다른가요?
>
> 위 메소드 중 끝에 느낌표가 들어간 bang(!) 버전은 객체가 타당하지 않으면 **예외**를 발생시킨다. 즉, 유효성 검사가 옳은지 그른지 (true/false) boolean 을 반환하지 않고, 바로 **에러**를 반환한다.
>
> ```ruby
> ActiveRecord::RecordInvalid: Validation failed: Email can't be blank
> ```
>
> 이에 반해, non-bang 버전은 예외를 발생 시키지 않는다. `save`와 `update`메서드는 **`false`**를 반환하고, `create`는 그냥 **객체를 반환**한다. 



### 데이터 검증 건너뛰는 메서드

아래 메서드들은 데이터 검증을 하지 않고 적용된다. 데이터가 유효하지 않아도 객체를 데이터베이스에 저장하니, 조심해서 사용해야한다.

- `decrement!`
- `decrement_counter`
- `increment!`
- `increment_counter`
- `insert`
- `insert!`
- `insert_all`
- `insert_all!`
- `toggle!`
- `touch`
- `touch_all`
- `update_all`
- `update_attribute`
- `update_column`
- `update_columns`
- `update_counters`
- `upsert`
- `upsert_all`



### Valid? Invalid?

객체의 유효 여부를 검사하기 위해 레일즈는 `valid?` 메소드를 사용한다. 데이터를 생성할 때 직접 사용해서 데이터가 유효한지 확인할 수 있다.

```ruby
class Person < ActiveRecord::Base
  validates :name, :presence => true
end
 
Person.create(:name => "John Doe").valid? # => true
Person.create(:name => nil).valid? # => false
```

`invalid?`는 데이터 검증을 실행하고, 객체에 어떠한 에러라도 추가되면 true(참)을 반환하고 반대면 false(거짓)을 반환한다.



### errors[]

객체가 가진 특정 속성(attribute)의 타당성 확인을 위해서, `errors[:attribute]`를 사용할 수 있다. errors를 사용하면 `:attribute`에 대해 모든 에러를 가진 배열을 반환한다. 만약 특정 속성에 대한 에러가 없으면, 비어있는 배열이 반환된다.

```ruby
class Person < ActiveRecord::Base
  validates :name, :presence => true
end
 
>> Person.new.errors[:name].any? # => false
>> Person.create.errors[:name].any? # => true
```



이 메소드는 직 에러 컬렉션을 조회할 뿐이고 데이터 검증을 실행하지 않기 때문에 오직 데이터 검증 *실행 후*에만 유용하다.

<hr>


## 데이터 검증 헬퍼 (Validation helpers)

액티브 레코드는 미리 정의된 많은 데이터 검증 헬퍼를 제공하며,  클래스 정의 내부에서 직접 사용할 수 있다. 데이터 검증 헬퍼는 데이터 검증이 실패하면 해당 객체의 `errors` 컬렉션에 에러 메세지를 추가한다. 각 헬퍼마다 여러 attributes(필드)를 적용할 수 있으므로 한 줄의 코드로 여러 필드 검증을 실행할 수 있다. 

모든 헬퍼 메서드는 `:on` 과 `:message` 옵션을 사용할 수 있는데, 사용법은 아래와 같다.
- `:on` 옵션: `:save`(기본값), `:create` 또는 `:update` 어느 시점의 값을 검사할 것인지 지정할 수 있다.
- `:message` 옵션: 검증이 실패할 경우에 `errors` 컬렉션에 추가될 메세지를 지정할 수 있다. 

그렇다면 이제 데이터 검증 헬퍼를 하나하나 살펴보자.



###  1. `validates_acceptance_of` (수락 검증)

폼이 실행된 후에, 유저 인터페이스 상에서 체크되어 있는 체크박스를 검증한다. 보통 사용자가  어플리케이션의 서비스 계약 사항의 동의 확인이 필요할때, 동의를 했는지 확인하는 용도로 사용된다. 만약 동의를 하지 않았다면 에러 메세지를 띄우며 데이터 저장 / 수정이 되지 않는다. 기본 메세지는 “*must be accepted*” 로 뜬다.

```ruby
class Person < ActiveRecord::Base
  validates_acceptance_of :terms_of_service
end
```



### 2. validates_associated` (관계 검증)

해당 모델과, 해당 모델에 연계된 모델까지 모두 검증해주는 메서드다. 데이터가 저장될 때, 연계된 모든 객체들에게 `valid?` 메서드가 호출된다. 

> 단, 주의해야할 점은 해당 메서드는 연계된 두 모델 중 하나에만 사용해야한다. 만약 둘 다 사용하면 서로를 호출해서 무한 루프를 만든다.

```ruby
class Library < ActiveRecord::Base
  has_many :books
  validates_associated :books
end
```





### 3. `validates_confirmation_of` (수락 검증)

이 헬퍼는 동일한 두 필드를 확인해야 할 때 사용한다. 예를 들어 비밀번호 `password` 필드와, 비밀번호 확인 `password_confirmation` 필드 값이 동일한지 확인해준다. 

> *주의: 비교하는 대상 필드 이름에 "_confirmation" 을 덧붙인 속성명이 있어야 한다. (ex. password를 검증하려면 password_confirmation 필드가 존재해야 함). 그리고, 이 검사는 오직 `password_confirmation`이 `nil`이 아닐때만 동작한다.

```ruby
class User < ActiveRecord::Base
  validates_confirmation_of :password
end
```

그리고 뷰 템플릿에서 아래와 같이 사용한다.

```ruby
<%= text_field :person, :password %>
<%= text_field :person, :password_confirmation %>
```



### 4. `validates_exclusion_of`

이 헬퍼는 속성의 값이 가지지 않아야 하는 값을 정의한다.

```ruby
class Account < ActiveRecord::Base
  validates_exclusion_of :subdomain, :in => %w(www us ca jp),
    :message => "Subdomain %{value} is reserved."
end
```



### 5. `validates_format_of` (포맷 검증)

이 헬퍼는 `:with` 옵션으로 입력된 정규식을 이용해서 속성의 값을 검증한다.

```ruby
class Product < ActiveRecord::Base
  validates_format_of :legacy_code, :with => /\A[a-zA-Z]+\z/,
    :message => "Only letters allowed"
end
```



### 6. `validates_inclusion_of`

이 헬퍼는 속성의 값이 속해야만 하는 집합을 정의한다. 

```ruby
class Coffee < ActiveRecord::Base
  validates_inclusion_of :size, :in => %w(small medium large),
    :message => "%{value} is not a valid size"
end
```



### 7. `validates_length_of` (길이 검증)

이 헬퍼는 속성 값의 길이를 검증한다. 단순 길이 뿐만 아니라, 다양한 옵션을 함께 사용할 수 있다.

```ruby
class Person < ActiveRecord::Base
  validates_length_of :name, :minimum => 2
  validates_length_of :bio, :maximum => 500
  validates_length_of :password, :in => 6..20
  validates_length_of :registration_number, :is => 6
end
```

사용 가능한 옵션은 아래와 같다.

- `:minimum` – 속성은 주어진 길이보다 작을 수 없다.
- `:maximum` – 속성은 주어진 길이보다 길 수 없다.
- `:in` (or `:within`) – 속성의 길이는 반드시 주어진 범위내여야 한다. 이 옵션의 값은 반드시 범위(range)여야 한다.
- `:is` – 속성의 길이는 주어진 값과 동일해야 한다.



### 8. `validates_numericality_of` (숫자 검증)

이 헬퍼는 속성값이 오직 숫자 형태의 값인지 검증한다. 기본적으로 정수형 혹은 부동 소수점 형태의 임의 기호인지 확인하는데, 오직 정수형 숫자로만 제한하려면 `:only_integer`을 참(true) 값으로 지정하면 된다.

```ruby
class Player < ActiveRecord::Base
  validates_numericality_of :points
  validates_numericality_of :games_played, :only_integer => true
end
```

해당 헬퍼 역시 다양한 옵션을 추가할 수 있다.

- `:greater_than` – 속성 값은 반드시 옵션으로 지정된 값보다 커야 함
- `:greater_than_or_equal_to` – 속성 값은 옵션으로 지정된 값보다 크거나 같아야 함
- `:equal_to` – 속성 값은 반드시 옵션으로 지정된 값과 같아야 함
- `:less_than` – 속성 값은 반드시 옵션으로 지정된 값보다 작아야 함
- `:less_than_or_equal_to` – 속성 값은 옵션으로 지정된 값보다 작거나 같아야 함
- `:odd` – 속성 값은 반드시 홀수여야 함
- `:even` – 속성 값은 반드시 짝수여야 함



### 9. `validates_presence_of` (존재 검증)

자주 사용하는 헬퍼이다. 이 헬퍼는 지정된 속성이 비어있는지 검증한다. 검증을 할 때, 해당 값이 `nil` 이거나 빈 문자열인지 확인하기 위해 +blank? 메소드를 사용한다.

```ruby
class Person < ActiveRecord::Base
  # 아래 두 코드는 같은 의미임
  validates :name, :login, :email, :presence => true
  validates_presence_of :name, :login, :email
end
```



### 10.  `validates_uniqueness_of` (유일성 검증)

자주 사용하는 헬퍼이다. 이 헬퍼는 객체를 저장하기 전에 속성의 값이 유일한지 검증한다. 

테이블 내 데이터 중  같은 속성 값을 가진 레코드 여부를 알아내기 위해서, SQL 구문을 실행해 검증한다.

```ruby
class Account < ActiveRecord::Base
  validates_uniqueness_of :email
end
```



추가로, `:scope` 옵션을 추가해 유일성 검사에 다른 속성을 지정해서 사용할 수 있다. 예를 들어, 아래 예시처럼 :scope => :year을 추가하면 테이블 내에서 **해당 년도**에 유일한 :name 인지 확인한다.

```
class Holiday < ActiveRecord::Base
  validates_uniqueness_of :name, :scope => :year,
    :message => "should happen once per year"
end
```





### 11. `validates_with` (클래스로 검증)

이 헬퍼는 검증을 위해서 분리된 클래스에 레코드를 전달한다. `validates_with` 헬퍼는 검증을 위해서 클래스나 클래스 목록을 받는다. 기본 에러 메세지는 없으므로, 클래스에서 유효성 검증 실패 시 에러 컬렉션에 에러를 직접 추가해야한다.

```ruby
class GoodnessValidator < ActiveModel::Validator
  def validate(record)
    if record.first_name == "Evil"
      record.errors.add :base, "This person is evil"
    end
  end
end

class Person < ApplicationRecord
  validates_with GoodnessValidator
end
```

검증 클래스는 기본적으로 두 가지 속성을 갖는다.

- `record` – 검증할 레코드
- `options` – `validates_with`에 넘길 추가 옵션

 다른 모든 검증과 같이, `validates_with`도 `:if`, `:unless` 그리고 `:on` 옵션을 사용할 수 있다.





### 12. `validates_each` (블록으로 각 속성 검증)

이 헬퍼는 블록을 이용해서 각 속성을 검증한다. 미리 정의된 검증 함수를 가지지 않기 때문에, 직접 블록을 만들어 `validates_each`를 통해 넘겨받은 모든 속성에 대하여 검사를 진행해야 한다.

```ruby
class Person < ActiveRecord::Base
  validates_each :name, :surname do |model, attr, value|
    model.errors.add(attr, 'must start with upper case') if value =~ /\A[a-z]/
  end
end
```


<hr>

### 참고
> - [Rails Guide 액티브 레코드 데이터 검증(Validation)과 콜백(Callback)](https://rubykr.github.io/rails_guides/active_record_validations_callbacks.html)
## 객체 생명 주기

레일즈 어플리케이션 실행중에, 객체는 만들어지고, 갱신되고, 삭제 되는데, 액티브 레코드는 이러한 *객체 생명 주기*내에서 hook을 제공한다. hook을 통해 어플리케이션과 데이터를 조종할 수 있다. 예를 들어, 객체 생성 전에 데이터 검증을 하거나, 콜백 / 옵저버로 객체 상태 변화 전 로직을 실행할 수 있다.

- 데이터 검증: 데이터베이스에 오직 유효만 데이터의 입력을 보장

- 콜백, 옵저버: 객체의 상태 변화 전/후에 로직을 실행하도록 허용

이 글에서는 **데이터 검증**에 대해 (특히, 모델 수준에서 데이터 검증) 알아보려고 한다.
<hr>


##  데이터 검증?

데이터 검증은 오직 유효한 데이터만 데이터베이스에 들어가도록 검증하는 작업을 뜻한다. 예를 들어, 모든 회원들이 필수로 유효한 이메일 주소를 입력하도록 검증할 수 있다. 

데이터베이스에 데이터를 저장하기 전에 데이터를 검증하는 여러가지 방법이 있다.

1. 데이터베이스 고유의 제약사항
2. 클라이언트 측에서 데이터 검증
3. 컨트롤러 수준의 데이터 검증
4. **모델 수준의 데이터 검증**

위 방법 중, 모델에서 데이터 검증을 실행하는 것이 가장 신뢰성이 높고, 테스트 및 유지보수에 편하다.



### 데이터 검증 시점 

그렇다면 데이터 검증은 어떤 시점에 시행되는 걸까?

새로운 레코드를 만들면 DB에 `INSERT` SQL 명령어를 전달하고, 데이터를 수정하면 DB에 `UPDATE` SQL 명령어를 전달하는데, 데이터 검증은 보통 데이터베이스에 이런 명령어를 전달하기 전에 실행된다. 만약에 데이터 검증이 하나라도 실패하면, 해당 객체는 타당하지 않은 객체로 기록되고, 액티브 레코드는 `INSERT`나 `UPDATE` 명령을 실행하지 않는다. 

아래의 메소드는 데이터 검증을 실행시키며, 객체가 유효할때만 데이터베이스에 저장한다:

- `create`
- `create!`
- `save`
- `save!`
- `update`
- `update_attributes`
- `update_attributes!`

> ### 뱅(!) 버전과 non-bang 버전은 어떻게 다른가요?
>
> 위 메소드 중 끝에 느낌표가 들어간 bang(!) 버전은 객체가 타당하지 않으면 **예외**를 발생시킨다. 즉, 유효성 검사가 옳은지 그른지 (true/false) boolean 을 반환하지 않고, 바로 **에러**를 반환한다.
>
> ```ruby
> ActiveRecord::RecordInvalid: Validation failed: Email can't be blank
> ```
>
> 이에 반해, non-bang 버전은 예외를 발생 시키지 않는다. `save`와 `update`메서드는 **`false`**를 반환하고, `create`는 그냥 **객체를 반환**한다. 



### 데이터 검증 건너뛰는 메서드

아래 메서드들은 데이터 검증을 하지 않고 적용된다. 데이터가 유효하지 않아도 객체를 데이터베이스에 저장하니, 조심해서 사용해야한다.

- `decrement!`
- `decrement_counter`
- `increment!`
- `increment_counter`
- `insert`
- `insert!`
- `insert_all`
- `insert_all!`
- `toggle!`
- `touch`
- `touch_all`
- `update_all`
- `update_attribute`
- `update_column`
- `update_columns`
- `update_counters`
- `upsert`
- `upsert_all`



### Valid? Invalid?

객체의 유효 여부를 검사하기 위해 레일즈는 `valid?` 메소드를 사용한다. 데이터를 생성할 때 직접 사용해서 데이터가 유효한지 확인할 수 있다.

```ruby
class Person < ActiveRecord::Base
  validates :name, :presence => true
end
 
Person.create(:name => "John Doe").valid? # => true
Person.create(:name => nil).valid? # => false
```

`invalid?`는 데이터 검증을 실행하고, 객체에 어떠한 에러라도 추가되면 true(참)을 반환하고 반대면 false(거짓)을 반환한다.



### errors[]

객체가 가진 특정 속성(attribute)의 타당성 확인을 위해서, `errors[:attribute]`를 사용할 수 있다. errors를 사용하면 `:attribute`에 대해 모든 에러를 가진 배열을 반환한다. 만약 특정 속성에 대한 에러가 없으면, 비어있는 배열이 반환된다.

```ruby
class Person < ActiveRecord::Base
  validates :name, :presence => true
end
 
>> Person.new.errors[:name].any? # => false
>> Person.create.errors[:name].any? # => true
```



이 메소드는 직 에러 컬렉션을 조회할 뿐이고 데이터 검증을 실행하지 않기 때문에 오직 데이터 검증 *실행 후*에만 유용하다.

<hr>


## 데이터 검증 헬퍼 (Validation helpers)

액티브 레코드는 미리 정의된 많은 데이터 검증 헬퍼를 제공하며,  클래스 정의 내부에서 직접 사용할 수 있다. 데이터 검증 헬퍼는 데이터 검증이 실패하면 해당 객체의 `errors` 컬렉션에 에러 메세지를 추가한다. 각 헬퍼마다 여러 attributes(필드)를 적용할 수 있으므로 한 줄의 코드로 여러 필드 검증을 실행할 수 있다. 

모든 헬퍼 메서드는 `:on` 과 `:message` 옵션을 사용할 수 있는데, 사용법은 아래와 같다.
- `:on` 옵션: `:save`(기본값), `:create` 또는 `:update` 어느 시점의 값을 검사할 것인지 지정할 수 있다.
- `:message` 옵션: 검증이 실패할 경우에 `errors` 컬렉션에 추가될 메세지를 지정할 수 있다. 

그렇다면 이제 데이터 검증 헬퍼를 하나하나 살펴보자.



###  1. `validates_acceptance_of` (수락 검증)

폼이 실행된 후에, 유저 인터페이스 상에서 체크되어 있는 체크박스를 검증한다. 보통 사용자가  어플리케이션의 서비스 계약 사항의 동의 확인이 필요할때, 동의를 했는지 확인하는 용도로 사용된다. 만약 동의를 하지 않았다면 에러 메세지를 띄우며 데이터 저장 / 수정이 되지 않는다. 기본 메세지는 “*must be accepted*” 로 뜬다.

```ruby
class Person < ActiveRecord::Base
  validates_acceptance_of :terms_of_service
end
```



### 2. validates_associated` (관계 검증)

해당 모델과, 해당 모델에 연계된 모델까지 모두 검증해주는 메서드다. 데이터가 저장될 때, 연계된 모든 객체들에게 `valid?` 메서드가 호출된다. 

> 단, 주의해야할 점은 해당 메서드는 연계된 두 모델 중 하나에만 사용해야한다. 만약 둘 다 사용하면 서로를 호출해서 무한 루프를 만든다.

```ruby
class Library < ActiveRecord::Base
  has_many :books
  validates_associated :books
end
```





### 3. `validates_confirmation_of` (수락 검증)

이 헬퍼는 동일한 두 필드를 확인해야 할 때 사용한다. 예를 들어 비밀번호 `password` 필드와, 비밀번호 확인 `password_confirmation` 필드 값이 동일한지 확인해준다. 

> *주의: 비교하는 대상 필드 이름에 "_confirmation" 을 덧붙인 속성명이 있어야 한다. (ex. password를 검증하려면 password_confirmation 필드가 존재해야 함). 그리고, 이 검사는 오직 `password_confirmation`이 `nil`이 아닐때만 동작한다.

```ruby
class User < ActiveRecord::Base
  validates_confirmation_of :password
end
```

그리고 뷰 템플릿에서 아래와 같이 사용한다.

```ruby
<%= text_field :person, :password %>
<%= text_field :person, :password_confirmation %>
```



### 4. `validates_exclusion_of`

이 헬퍼는 속성의 값이 가지지 않아야 하는 값을 정의한다.

```ruby
class Account < ActiveRecord::Base
  validates_exclusion_of :subdomain, :in => %w(www us ca jp),
    :message => "Subdomain %{value} is reserved."
end
```



### 5. `validates_format_of` (포맷 검증)

이 헬퍼는 `:with` 옵션으로 입력된 정규식을 이용해서 속성의 값을 검증한다.

```ruby
class Product < ActiveRecord::Base
  validates_format_of :legacy_code, :with => /\A[a-zA-Z]+\z/,
    :message => "Only letters allowed"
end
```



### 6. `validates_inclusion_of`

이 헬퍼는 속성의 값이 속해야만 하는 집합을 정의한다. 

```ruby
class Coffee < ActiveRecord::Base
  validates_inclusion_of :size, :in => %w(small medium large),
    :message => "%{value} is not a valid size"
end
```



### 7. `validates_length_of` (길이 검증)

이 헬퍼는 속성 값의 길이를 검증한다. 단순 길이 뿐만 아니라, 다양한 옵션을 함께 사용할 수 있다.

```ruby
class Person < ActiveRecord::Base
  validates_length_of :name, :minimum => 2
  validates_length_of :bio, :maximum => 500
  validates_length_of :password, :in => 6..20
  validates_length_of :registration_number, :is => 6
end
```

사용 가능한 옵션은 아래와 같다.

- `:minimum` – 속성은 주어진 길이보다 작을 수 없다.
- `:maximum` – 속성은 주어진 길이보다 길 수 없다.
- `:in` (or `:within`) – 속성의 길이는 반드시 주어진 범위내여야 한다. 이 옵션의 값은 반드시 범위(range)여야 한다.
- `:is` – 속성의 길이는 주어진 값과 동일해야 한다.



### 8. `validates_numericality_of` (숫자 검증)

이 헬퍼는 속성값이 오직 숫자 형태의 값인지 검증한다. 기본적으로 정수형 혹은 부동 소수점 형태의 임의 기호인지 확인하는데, 오직 정수형 숫자로만 제한하려면 `:only_integer`을 참(true) 값으로 지정하면 된다.

```ruby
class Player < ActiveRecord::Base
  validates_numericality_of :points
  validates_numericality_of :games_played, :only_integer => true
end
```

해당 헬퍼 역시 다양한 옵션을 추가할 수 있다.

- `:greater_than` – 속성 값은 반드시 옵션으로 지정된 값보다 커야 함
- `:greater_than_or_equal_to` – 속성 값은 옵션으로 지정된 값보다 크거나 같아야 함
- `:equal_to` – 속성 값은 반드시 옵션으로 지정된 값과 같아야 함
- `:less_than` – 속성 값은 반드시 옵션으로 지정된 값보다 작아야 함
- `:less_than_or_equal_to` – 속성 값은 옵션으로 지정된 값보다 작거나 같아야 함
- `:odd` – 속성 값은 반드시 홀수여야 함
- `:even` – 속성 값은 반드시 짝수여야 함



### 9. `validates_presence_of` (존재 검증)

자주 사용하는 헬퍼이다. 이 헬퍼는 지정된 속성이 비어있는지 검증한다. 검증을 할 때, 해당 값이 `nil` 이거나 빈 문자열인지 확인하기 위해 +blank? 메소드를 사용한다.

```ruby
class Person < ActiveRecord::Base
  # 아래 두 코드는 같은 의미임
  validates :name, :login, :email, :presence => true
  validates_presence_of :name, :login, :email
end
```



### 10.  `validates_uniqueness_of` (유일성 검증)

자주 사용하는 헬퍼이다. 이 헬퍼는 객체를 저장하기 전에 속성의 값이 유일한지 검증한다. 

테이블 내 데이터 중  같은 속성 값을 가진 레코드 여부를 알아내기 위해서, SQL 구문을 실행해 검증한다.

```ruby
class Account < ActiveRecord::Base
  validates_uniqueness_of :email
end
```



추가로, `:scope` 옵션을 추가해 유일성 검사에 다른 속성을 지정해서 사용할 수 있다. 예를 들어, 아래 예시처럼 :scope => :year을 추가하면 테이블 내에서 **해당 년도**에 유일한 :name 인지 확인한다.

```
class Holiday < ActiveRecord::Base
  validates_uniqueness_of :name, :scope => :year,
    :message => "should happen once per year"
end
```





### 11. `validates_with` (클래스로 검증)

이 헬퍼는 검증을 위해서 분리된 클래스에 레코드를 전달한다. `validates_with` 헬퍼는 검증을 위해서 클래스나 클래스 목록을 받는다. 기본 에러 메세지는 없으므로, 클래스에서 유효성 검증 실패 시 에러 컬렉션에 에러를 직접 추가해야한다.

```ruby
class GoodnessValidator < ActiveModel::Validator
  def validate(record)
    if record.first_name == "Evil"
      record.errors.add :base, "This person is evil"
    end
  end
end

class Person < ApplicationRecord
  validates_with GoodnessValidator
end
```

검증 클래스는 기본적으로 두 가지 속성을 갖는다.

- `record` – 검증할 레코드
- `options` – `validates_with`에 넘길 추가 옵션

 다른 모든 검증과 같이, `validates_with`도 `:if`, `:unless` 그리고 `:on` 옵션을 사용할 수 있다.





### 12. `validates_each` (블록으로 각 속성 검증)

이 헬퍼는 블록을 이용해서 각 속성을 검증한다. 미리 정의된 검증 함수를 가지지 않기 때문에, 직접 블록을 만들어 `validates_each`를 통해 넘겨받은 모든 속성에 대하여 검사를 진행해야 한다.

```ruby
class Person < ActiveRecord::Base
  validates_each :name, :surname do |model, attr, value|
    model.errors.add(attr, 'must start with upper case') if value =~ /\A[a-z]/
  end
end
```


<hr>

### 참고
> - [Rails Guide 액티브 레코드 데이터 검증(Validation)과 콜백(Callback)](https://rubykr.github.io/rails_guides/active_record_validations_callbacks.html)