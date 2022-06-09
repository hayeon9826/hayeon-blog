---
title: '[Rails] 마이그레이션 알아보기'
date: "2021-11-12T22:40:32.169Z"
description: Migration 이란? 마이그레이션은 액티브 레코드의 기능으로, 데이터베이스 스키마(구조)를 변경하는 수단이다. 
category: "Rails"
---

<img src="https://velog.velcdn.com/images/khy226/post/f96ee986-c6a3-48f8-aad1-14224b2db412/Ruby_on_Rails-Logo.wine.png" style="width: 60%; padding-bottom: 50px;">



## Migration이란?

마이그레이션은 액티브 레코드의 기능으로, 데이터베이스 스키마(구조)를 변경하는 수단이다. 순수 SQL로 스키마 수정사항을 쓰는 대신, 마이그레이션을 통해 Ruby DSL을 사용하여 테이블에 대한 변경 사항을 작성할 수 있다.

데이터베이스에서 원하는 컬럼을 수정하거나, 삭제, 혹은 테이블을 생성할 때 migration 파일을 만들어 원하는 수정사항을 작성하고 `rake db:migrate` 명령어를 치면, 마이그레이션이 실행된다. 마이그레이션은 db/migrate 디렉터리 내에 파일 (.rb)로 생성된다.

각각의 migration 파일은 데이터베이스의 새로운 '버전'과 같다. `rails generate migration` 명령어로 마이그레이션 파일을 생성하면 파일 생성 시간(UTC 타임스탬프)이 생기는데, 이 숫자는 마이그레이션 버전 넘버이다. 마이그레이션 파일명은 'YYYYMMDDHHMMSS_create_items.rb' 과 같은 형식으로 생성된다.

![migration img](https://user-images.githubusercontent.com/72732446/140915146-a2c7fa62-97ca-4326-83a2-c30dea73c7cc.png)

파일명에서 타임 스탬프 뒤에 이어지는 이름 (create_items)의 CamelCased 버전은 마이그레이션 클래스를 정의한다. 예를 들어,'YYYYMMDDHHMMSS_create_items.rb' 파일은 CreateItem를 정의하며, 마이그래이션 파일에는 아래와 같이 생성된다.

```ruby
class CreateItems < ActiveRecord::Migration[7.0]
  def change
  end
end
```

마이그레이션을 성공적으로 마치면, **ActiveRecord**가 변경된 데이터베이스의 최신 구조를 schema.rb 파일에 업데이트한다. 따라서 마이그레이션으로 변경한 데이터베이스 최신 정보는 schema.rb파일에서 확인할 수 있다. 
> **Active Record?**
액티브 레코드는 레일즈에서 제공하는 모듈로, 레일즈 어플리케이션에서 모델의 기초입니다. 액티브 레코드는 데이터베이스 추상화와 기본 CRUD 기능, 고급 검색 능력과 객체들 간의 관계를 정의하는 기능을 제공합니다.


(*주의할 점: **schema.rb 파일은 마이그레이션 할 때마다 자동으로 변경되므로 사용자가 임의로 조작해서는 안된다.**)

<hr>

## Migration 메서드

#### 1. 아래는 마이그레이션 파일에서  `change` 메서드로  `Product` 라는 테이블을 생성하는 마이그레이션이다. 

```ruby
class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
```

해당 마이그레이션 파일은 `string` 타입의 컬럼 name과 `text` 타입 컬럼 description 을 가진 '`Product`'이라는 테이블을 생성한다. 이때, 마이그레이션 파일에서 명시 되지 않은 세 컬럼이 더 생성되는데, `id`, `created_at`, `updated_at` 이다.

우선, `id` 는 기본 키(primary key)로 행(= 데이터)을 고유하게 구분해주는 id 값이다. `created_at`, `updated_at` 컬럼은 타임스탬프 역할을 하는데, 데이터가 생성될 때 와 수정될 때를 저장한다.

물론 migration 파일을 만든다고 해서 테이블이 짠 하고 생기지는 않는다. `rails db:migrate` 와 같은 명령어로 마이그레이션을 실행을 해야 마이그레이션 파일에 명시된 Product 테이블이 생긴다. 그리고 만약 해당 마이그레이션을 취소하고 싶다면 `rails db:rollback` 명령어를 치면 된다. ActiveRecord는 change 메서드의 migration 코드를 읽고 역으로 돌리는게 가능하므로, 방금 생성한 `Product` 테이블을 삭제한다.

* 팁) 마이그레이션 파일을 직접 생성해서 코드 하나하나 설정할 수도 있지만, 터미널에서 `rails generate model Product name:string description:text` 를 치면 위 마이그레이션 파일이 생성된다. 



#### 2. `up `과 `down` 메서드로 마이그레이션 작성하기

`def change` 대신, `up` 과 `down` 메서드로 마이그레이션을 작성할 수 있다. 

```ruby
class ChangeProductsPrice < ActiveRecord::Migration[7.0]
  def up
    change_table :products do |t|
      t.change :price, :string
    end
  end

  def down
    change_table :products do |t|
      t.change :price, :integer
    end
  end
end
```



up, down 메서드는 앞서 설명한 `change`메서드와는 달리 `rollback` 을 해도 ActiveRecord가 자동으로 이전 버전으로 되돌리지는 못한다. 하지만 위처럼 두 메서드를 동시에 사용하면 `change` 와 같은 효과를 낸다.



`rails db:migrate` 를 실행하면 ActiveRecord는 `up` 메서드와 `change` 메서드를 읽는다. (`down` 메서드는 읽지 않는다)

반대로, `rails db:rollback` 을 실행하면 ActiveRecord는 `down` 메서드와 `change` 메서드를 읽는다. (`up` 메서드는 읽지 않는다)



### 3. `change` 메서드로 컬럼 추가하기

마이그레이션 파일을 생성해 기존 테이블에 컬럼을 추가할 수도 있다. 우선 `rails generate migration AddPartNumberToProducts`  를 쳐보자.  그럼 빈 마이그레이션 파일이 생긴다. 해당 파일에 원하는 definition을 추가해서 컬럼을 추가하거나 변경, 삭제할 수 있다.

```ruby
class AddPartNumberToProducts < ActiveRecord::Migration[7.0]
  def change
  end
end
```



마이그레이션을 생성할 때, 생성하려는 컬럼명과 타입을 적어주면 해당 definition과 함께 파일이 생성된다. 예를 들어 `rails generate migration AddPartNumberToProducts part_number:string` 을 쳐보자. 아래와 같이 `add_column` statement가 같이 생성된다.

```ruby
class AddPartNumberToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :part_number, :string
  end
end
```





<hr>

## Migration 컬럼 타입

Migration에서 사용할 수 있는 컬럼 타입은 다음과 같다: 

- string
- text
- integer
- float
- decimal
- boolean
- binary
- date
- datetime
- primary_key
- time
- timestamp

<hr>

## Migration 'change' 메서드 definition 정리

`change`메서드는 마이그레이션에서 가장 자주 사용되는 메서드이다. change 메서드를 사용하면, rollback시 ActiveRecord가 자동으로 이전 버전으로 돌릴 수 있도록 해주며, 많은 작업을 할 수 있다. 2021.11월 현재 `change` 메서드가 지원하는 마이그레이션 definition은 아래와 같다:

- [`add_column`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_column)
- [`add_foreign_key`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_foreign_key)
- [`add_index`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index)
- [`add_reference`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_reference)
- [`add_timestamps`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_timestamps)
- [`change_column_default`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-change_column_default) (must supply a `:from` and `:to` option)
- [`change_column_null`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-change_column_null)
- [`create_join_table`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-create_join_table)
- [`create_table`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-create_table)
- `disable_extension`
- [`drop_join_table`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-drop_join_table)
- [`drop_table`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-drop_table) (must supply a block)
- `enable_extension`
- [`remove_column`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-remove_column) (must supply a type)
- [`remove_foreign_key`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-remove_foreign_key) (must supply a second table)
- [`remove_index`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-remove_index)
- [`remove_reference`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-remove_reference)
- [`remove_timestamps`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-remove_timestamps)
- [`rename_column`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-rename_column)
- [`rename_index`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-rename_index)
- [`rename_table`](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-rename_table)



사용 방법을 간단하게 정리해보자면 아래와 같다.

```ruby
# 컬럼 추가
add_column :table_name, :column_name, :column_type, :column_options

# 외래키 추가
# table1 테이블에 table2_id 라는 외래키 추가
add_foreign_key :table_name_1, :table_name_2

# index 추가
add_index :table_name, :column_name, options: "custom_index_name"

# 참조 추가
# table에 ref_id 라는 컬럼이 생성됨. 
# options: polymorphic일 때 options에 polymorphic: true를 줄 수 있음. foreign_key: true, index: true로 외래키나 인덱트 추가 가능
add_reference :table_name, :ref_name, options = {}

# 컬럼 옵션 또는 타입 변경
change_column :table_name, :column_name, :column_type, :column_options

# 테이블 생성
create_table :table_name do |t|
  t.column_type :column_name

  t.timestamps
end

# 테이블 drop
drop_table :table_name

# 컬럼 제거
remove_column :table_name, :column_name, :column_type

# index 제거
remove_index :table_name, name: :index_name

# 컬럼 이름 변경
rename_column :table_name, :old_column_name, :new_column_name

# 테이블 이름 변경
rename_table ("old_table_name", "new_table_name")
```



<hr>

## Migration 실행

이제 마이그레이션 메서드와 definitions들을 알았으니, 생성한 마이그레이션 파일을 실행해보자. 

### 1. Migrate

가장 기본적인 커맨드는 `rails db:migrate` 이다. 해당 명령어는 아직 실행되지 않은 마이그레이션 파일을 순서대로 실행시켜준다. 이때, `db:migrate` 커맨드는 `db:schema:dump` 커맨드를 호출하여 `db/schema.rb` 파일을 가장 최신의 데이터베이스 구조와 맞춘다.

원하는 버전을 특정하여 해당 버전까지만 migrate하고 싶다면, 뒤에 VERSION= 플래그를 달면 된다.

```ruby
rails db:migrate VERSION=20080906120000
```

만약 20080906120000 버전이 현재 버전보다 크다면, 현재 다음 버전부터 20080906120000 까지 up, change 메서드를 실행시킨다. 반대로 rollback을 시킨다면 현재 버전부터 20080906120000 초과 버전까지 (20080906120000는 포함하지 않음) rollback을 시킨다.



만약 특정 마이그레이션 '하나만' 실행하고 싶다면 'db:migrate:up' 혹은 'db:migrate:down'명령어와 함께 버전 넘버를 써주면 된다.

```ruby
rails db:migrate:up VERSION=20080906120000
```



### 2. Rollback

가장 마지막 마이그레이션을 취소하는 작업이다. `rails db:rollback` 명령어를 실행하면 된다. change와 down 메서드만 실행하게 된다.

만약 여러개의 마이그레이션을 취소하고 있따면 STEP= 플래그를 추가하면 된다.

``` ruby
rails db:rollback STEP=3
```



### 3. 데이터베이스 생성

`rails db:create` 는 가장 기본적인 명령어로, 프로젝트를 처음 시작했을 때 한번 실행하면된다. 데이터베이스를 생성해준다.



데이터 베이스 생성과 동시에 세팅까지 하고 싶다면:

```ruby
rails db:setup
```

rails db:setup은 db:create, db:schema:load, db:seed 세 가지 명령을 한번에 실행시켜준다.

데이터베이스를 생성하고, 스키마를 로드하고, 시드까지 돌려준다.



### 4. 데이터베이스 삭제

데이터베이스 삭제 명령어는 `rails db:drop` 이다. 데이터베이스 삭제 명령어는 조심해서 사용해야한다. 데이터베이스를 삭제하면 다시 되돌릴 수 없으며, 기존의 데이터들이 다 날라간다.



데이터 베이스 삭제와 동시에 세팅까지 하고 싶다면:

```ruby
rails db:reset
```

reset 명령어도 기존 데이터베이스를 삭제해준다. rails db:drop과 다른점은, 데이터베이스 drop이후 다시 셋업을 실행한다. 즉, `rails db:drop db:setup` 과 같은 명령어이다.



### 5. 다른 개발 환경에서 Migrate

기본적으로 마이그레이션 명령어는 development 환경에서 실행된다. 만약 test 환경이나 production 환경에서 마이그레이션을 실행하고 싶다면, RAILS_ENV 환경변수를 같이 써줘야 한다.

```ruby
# test 모드
rails db:migrate RAILS_ENV=test

# production 모드. RAILS_ENV= 위치는 앞 혹은 뒤 상관없음
RAILS_ENV=production rails db:migrate
```



### 6. Seed 데이터 생성

데이터베이스를 생성해도 데이터는 하나도 들어있지 않다. 데이터를 하나하나 수기로 만들 수 있지만, 로컬 환경에서 개발할 때는 fake 데이터를 한번에 여러개 생성해서 작업하는 것이 더 편리하다. 이때, seed.rb 파일을 활용하면 된다.

우선 `db/seed.rb` 시드 파일에 아래와 같이 데이터를 생성하는 코드를 작성한다. 그리고 명령어 `rails db:seed` 를 실행하면 10 개의 Product 데이터가 생긴다. 

```ruby
10.times do |i|
  Product.create(name: "Product ##{i}", description: "A product.")
end
```



시드 파일을 사용하게 되면 rake db:drop으로 디비를 삭제하고 데이터를 모두 지워버려도, rails db:seed 명령어 한줄로 데이터를 다시 채울 수 있다. 테스트, 개발 하는데 매우 편리하다.



### 7. 현재 마이그레이션 status 확인

현재 마이그레이션이 어디까지 진행되었나 확인하려면 `rails db:migrate:status` 를 치면 된다. 

현재까지 진행된 마이그레이션 현황 (up/down)과 마이그레이션 파일 이름들을 보여준다.

```ruby
$ rails db:migrate:status

database: velog_server_development

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20210209122040  Create users
   up     20210209134446  Create items
   down   20210209135806  Devise create admin users < 아직 여기는 마이그레이션이 실행되지 않음.
```



<hr>

## Schema 파일

그렇다면 (schema.rb) 스키마 파일은 왜 존재하는 것일까? 

```ruby
# schema.rb 스키마 파일 예시

ActiveRecord::Schema.define(version: 2008_09_06_171750) do
  create_table "authors", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "part_number"
  end
end
```

우선 스키마 파일에는 가장 최신의 데이터베이스 구조가 명시되어 있다. 한눈에 데이터베이스 구조를 볼 수 있어 개발하는데 편리하다.

뿐만 아니라, 새로운 어플리케이션에서 `rails db:schema:load` 명령어로 이미 생성된 스키마 파일을 로드해서 데이터베이스를 만들면 더욱 빠르고 안전하게 데이터베이스를 생성할 수 있다. (수십개의 마이그레이션 히스토리를 다 확인하지 않아도 됨) 프로젝트가 커질수록 마이그레이션 파일이 몇십개, 몇백개로 늘어날 수 있다. 이때 마이그레이션 버전이 오래되면 dependencies가 맞지 않아 마이그레이션이 실패할 수도 있다.





<hr>

## 참고

> - [Active Record Migrations](https://edgeguides.rubyonrails.org/active_record_migrations.html)

