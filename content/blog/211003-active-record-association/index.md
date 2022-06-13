---
title: '[Rails] Active Record 모델 관계 알아보기'
date: '2021-10-03T22:40:32.169Z'
description: 해당 포스트는 활성 레코드관계(Active Record Association)에 대한 안내 - 루비온 레일즈 가이드 를 요약 & 정리한 글 입니다.
category: 'Rails'
image: 'https://velog.velcdn.com/images/khy226/post/24570e5b-09c5-4782-85df-218e2084e87c/Ruby_on_Rails-Logo.wine.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/24570e5b-09c5-4782-85df-218e2084e87c/Ruby_on_Rails-Logo.wine.png" style="padding-bottom: 50px;">

<small> 해당 포스트는 [활성 레코드관계(Active Record Association)에 대한 안내 - 루비온 레일즈 가이드](https://rubykr.github.io/rails_guides/association_basics.html#polymorphic) 를 요약 & 정리한 글 입니다. </small>

## 0. 왜 '관계' 인가?

- 모델들 사이에는 관계 (Relations)가 존재한다.
- '관계'로 연결된 모델들은 비교적 간단하고 쉽게 동시 처리가 가능하다.

#### 1) 관계 설정이 없는 모델

아래와 같이 **아무런 관계 설정이 없는** 고객 모델과 주문 모델이 있다고 가정하자.

```ruby
class Customer < ActiveRecord::Base
end

class Order < ActiveRecord::Base
end
```

여기서 이미 존재하는 고객의 새로운 주문을 추가하려면, 고객의 id를 가져와 주문을 생성해야 한다.

```ruby
@order = Order.create(:order_date => Time.now,
  :customer_id => @customer.id)
```

만약 해당 고객과 고객의 모든 주문을 삭제하길 원한다면 아래와 같이 고객 id로 모든 주문을 찾아 삭제한 후, 고객 데이터까지 따로 삭제해줘야 한다. 매우 복잡하다.

```ruby
@orders = Order.where(:customer_id => @customer.id)
@orders.each do |order|
  order.destroy
end
@customer.destroy
```

#### 2) 관계 설정이 된 모델

관계 설정이 된 모델의 경우 1)의 사례보다 훨씬 쉽게 주문 생성 / 삭제가 가능하다.
우선 아래와 같이 관계 설정을 할 수 있다.

```ruby
class Customer < ActiveRecord::Base
 has_many :orders, :dependent => :destroy
end

class Order < ActiveRecord::Base
 belongs_to :customer
end
```

주문을 생성하려면 아래와 같이 깔끔하게 코드를 작성할 수 있다.

```ruby
@order = @customer.orders.create(:order_date => Time.now)
```

그리고 해당 고객의 모든 주문과, 고객 데이터를 삭제하려면 그냥 **고객 하나만 지우면** 된다.
`:dependent => :destroy` 관계 설정이 되어있기 때문에 고객을 지우면 해당 고객의 주문까지 동시에 삭제된다.

```ruby
@customer.destroy
```

<br>

- 레일즈는 아래와 같은 6가지 관계를 지원한다.

```
belongs_to
has_one
has_many
has_many :through
has_one :through
has_and_belongs_to_many
```

<hr>

## 1. belongs_to

- belongs_to 관계는 다른 모델과의 1: 1 관계를 정의한다.
- 구체적으로, 한 모델이 다른 모델에 **속해있을 때** 사용한다. 부모 - 자식 모델 중, 자식 모델에 belongs_to 관계를 사용한다.
- 해당 선언을 한 테이블에 **외래키(foregin key)**를 넣는다. 외래키가 포함된 테이블을 **자식 테이블**이라고 하며, 외래키 값을 제공하는 테이블 (has_may, has_one 선언하는 모델)을 부모 테이블이라고 한다.
- 예를 들어, 앞서 설명했던 주문 - 고객 모델의 관계에서 하나의 주문이 오직 하나의 고객에만 속해있다.
  따라서 아래와 같이 선언할 수 있다.

```ruby
class Order < ActiveRecord::Base
  belongs_to :customer
end
```

![belongs to](https://rubykr.github.io/rails_guides/images/belongs_to.png)

<hr>

## 2. has_one

- has_one 관계 역시 다른 모델과의 1:1 관계를 규정
- 한 모델이 다른 모델을 **포함할 때** 사용한다. 부모 - 자식 모델 중, 부모 모델에 has_one 관계를 사용한다.
- 예를들어, 납품회사가 하나의 계정을 **가지고** 있다면, 이 납품 회사 모델을 다음과 같이 선언할 수 있다.

```ruby
class Supplier < ActiveRecord::Base
  has_one :account
end
```

![has one](https://rubykr.github.io/rails_guides/images/has_one.png)

<hr>

## 3. has_many

- has_many는 다른 모델과 1:다(多:많음) 관계를 말한다.
- 한 모델이 다른 모델의 예를 0개에서 n개를 **가지고 있을 때** 사용한다. 부모 - 자식 모델 중, 부모 모델에 has_many 관계를 사용한다.
- 1번의 belongs_to 관계의 반대 모델에 적용한다.
- 예를 들어, 고객이 여러개의 주문을 가지고 있을 때 아래와 같이 선언할 수 있다.
- has_many B를 선언할 때는 B모델의 이름을 **복수형**으로 선언해야한다.

```ruby
class Customer < ActiveRecord::Base
  has_many :orders
end
```

![has many](https://rubykr.github.io/rails_guides/images/has_many.png)

<hr>

## 4. has_many :through

- has_many : through 관계는 다른 모델과의 多:多 **(다대 다, M:N) 관계**를 설정할 때 사용된다.
- 다른 복수(0 포함)개의 모델을 **제3의 모델을 통해서** 가지게 됨을 말한다.
- 예를 들어, 의사가 예약 정보를 통해 환자의 검진을 할 수 있는 경우 `has_many :through` 관계를 사용할 수 있다. 제 3의 모델인 '예약' 모델이 중간 다리의 역할을 한다.

```ruby
class Physician < ActiveRecord::Base
  has_many :appointments
  has_many :patients, :through => :appointments
end

class Appointment < ActiveRecord::Base
  belongs_to :physician
  belongs_to :patient
end

class Patient < ActiveRecord::Base
  has_many :appointments
  has_many :physicians, :through => :appointments
end
```

![has many through](https://rubykr.github.io/rails_guides/images/has_many_through.png)

- 위와 같이 연결 모델은 [has_many assciation methods](https://guides.rubyonrails.org/v5.0/association_basics.html#has-many-association-reference) 를 통해 관리할 수 있다.
- 아래와 같이 사용할 수 있다.

```ruby
physician.patients = patients
```

새로 연결된 객체에 대해 새로운 연결 모델이 자동으로 생성된다. 이전에 존재했던 일부가 누락 된 경우 해당 연결행(row)은 자동으로 삭제된다.

**_ 참고: 연결 모델의 자동 삭제는 바로 이루어지며, destroy 콜백이 트리거되지 않는다. _**

<hr>

## 5. has_one :through

- has_one :through 관계는 또 다른 모델과의 **1:1 관계**를 설정한다.
- 해당 관계 역시 제 3의 모델을 통해 다른 모델과 **간접적 관계** 를 갖게 한다.
- 예를 들어, 한 납품 회사가 하나의 계정을 가지고 있고, 각 계정이 계정 내역을 가지고 있을 때 해당 관계를 사용할 수 있다.

```ruby
class Supplier < ActiveRecord::Base
  has_one :account
  has_one :account_history, :through => :account
end

class Account < ActiveRecord::Base
  belongs_to :supplier
  has_one :account_history
end

class AccountHistory < ActiveRecord::Base
  belongs_to :account
end
```

![has one through](https://rubykr.github.io/rails_guides/images/has_one_through.png)

<hr>

## 6. has_and_belongs_to_many

- has_and_belongs_to_many 관계는 다대다(M:N) 연결을 제 3의 모델 없이 **직접** 생성한다.
- 예를 들어, 응용 프로그램에 부품과 조립품이 포함되어있고 조립품은 많은 부품을 가지면 다음의 모델을 선언할 수 있다.

```ruby
class Assembly < ActiveRecord::Base
  has_and_belongs_to_many :parts
end

class Part < ActiveRecord::Base
  has_and_belongs_to_many :assemblies
en
```

![has and belongs to many](https://rubykr.github.io/rails_guides/images/habtm.png)

- 연결 모델을 만들때에 “독립된” 것으로 간주되어야 할 경우에는 직접적인 `has_and_belongs_to_many`관계 보다는, `has_many :through`를 사용하는 것이 더 좋다.
- 반대로, 관계 모델을 사용하여 작업을 수행 할 필요가 없는 경우 `has_and_belongs_to_many` 관계를 설정하는 것이 더 간단 할 수 있다.

- **연결 모델에서 유효성 검사, 콜백 또는 추가 속성이 필요한 경우 `has_many :through` 를 사용해야 한다.**

<hr>

## 7. 폴리모픽(polymorphic: 다중) 관계

- 폴리모픽이란? 한국어로 '다형성'이라는 뜻을 가지고 있다.
- 쉽게 말해, polymophic관계는 하나의 모델이 하나 또는 여러 모델에 속할 수 있다.
- 예를 들어, 사진(picture) 이라는 모델이 직원 (employee) 모델과 생산품(product)모델에 속할 수 있다면 다음과 같이 정의할 수 있다.

```ruby
class Picture < ActiveRecord::Base
  belongs_to :imageable, :polymorphic => true
end

class Employee < ActiveRecord::Base
  has_many :pictures, :as => :imageable
end

class Product < ActiveRecord::Base
  has_many :pictures, :as => :imageable
end
```

- 위에서 사진 모델 polymorphic에서 belongs_to 선언을 한 것은, 다른 Model이 사용할 수있는 인터페이스를 설정하는 것으로 생각할 수 있다.
- 예를 들어, Employee 모델의 instance에서 `@employee.pictures` 을 통해 Employee에 종속된 pictures들을 검색 할 수 있다.

Picture 모델의 instance가 있는 경우, @picture.imageable을 통해 **부모에게 접근**할 수 있다. 이 작업을 수행하려면 Model에서 polymorphic 인터페이스를 선언하는 외래키 컬럼과 type(유형) 컬럼을 모두 선언해야 한다.

```ruby
class CreatePictures < ActiveRecord::Migration
  def self.up
    create_table :pictures do |t|
      t.string  :name
      t.integer :imageable_id
      t.string  :imageable_type
      t.timestamps
    end
  end

  def self.down
    drop_table :pictures
  end
end
```

위 마이그레이션은 t.references 문법을 통해 더 간략하게 표현할 수 있다.

```ruby
def self.up
    create_table :pictures do |t|
      t.string :name
      t.references :imageable, :polymorphic => true
      t.timestamps
    end
  end
```

![polymorphic](https://rubykr.github.io/rails_guides/images/polymorphic.png)

<hr>

## 8. Self 연결

- 데이터 모델을 설계 할 때, 때때로 자신의 모델을 스스로 참고할 수 있다.
- 예를 들어, 직원 모델에서 일부 직원을 매니저(manager)로 설정하고, 일반 팀원들(subordinates)을 속하도록 관계 설정을 하고 싶을 때 self 연결 관계를 사용할 수 있다.

```ruby
class Employee < ActiveRecord::Base
  has_many :subordinates, :class_name => "Employee",
    :foreign_key => "manager_id"
  belongs_to :manager, :class_name => "Employee"
end
```

- 위 설정을 통해 `@employee.subordinates` 와 `@employee.manager` 를 검색할 수 있다.

<hr>

<br>
<br>

> 참고:

- [활성 레코드관계(Active Record Association)에 대한 안내 - 루비온 레일즈 가이드](https://rubykr.github.io/rails_guides/association_basics.html)
- https://kbs4674.tistory.com/163
