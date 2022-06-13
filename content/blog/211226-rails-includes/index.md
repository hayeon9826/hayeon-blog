---
title: '[Rails] :includes 로 SQL N+1 문제 개선하기'
date: '2021-12-26T22:40:32.169Z'
description: N+1 문제란? 쿼리 1번으로 N건을 가져왔는데, 관련 컬럼을 얻기 위해 쿼리를 N번 추가 수행하는 문제
category: 'Rails'
image: 'https://velog.velcdn.com/images/khy226/post/97788f5a-6197-4dc4-8da8-637e58c8c7ea/Ruby_on_Rails-Logo.wine.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/97788f5a-6197-4dc4-8da8-637e58c8c7ea/Ruby_on_Rails-Logo.wine.png" style="width: 60%; padding-bottom: 50px;">

## N+1 문제란?

- 쿼리 1번으로 N건을 가져왔는데, 관련 컬럼을 얻기 위해 **쿼리를 N번 추가 수행**하는 문제
- 쿼리결과 건수마다 참조 정보를 얻기 위해 **건수만큼 반복해서 쿼리를 수행**하게 되는 문제
- DB쿼리 수행비용(횟수)이 크기 때문에, **eager loading(즉시 로딩)** 등의 방법으로 해결하는 것이 권장됨

> 출처: [제타위키 - N + 1 쿼리 문제](https://zetawiki.com/wiki/N%2B1_%EC%BF%BC%EB%A6%AC_%EB%AC%B8%EC%A0%9C)

쉽게 말해, `N + 1`은 참조 정보를 얻을 때 필요 이상의 쿼리를 수행하게 되는 문제이다. 처음에 원하는 컬럼을 모두 가져오고 (1) + 해당 컬럼들을 하나씩 돌아가며 참조 정보를 얻기 위해 (N) 번의 쿼리를 수행하게 된다. 따라서 하나의 결과를 얻기 위해 총 N + 1번의 쿼리를 수행하게 되는 비효율의 문제가 나타난다. 루비 코드로 구체적인 예를 들어보자.

### N + 1 예시)

아래처럼 한 직원이 여러개의 폼을 가지고 있는 1:N 모델이 있다고 하자:

```ruby
# 직원 모델
class Employee < ApplicationRecord
  has_many: :forms
end

# 폼 모델
class Form < ApplicationRecord
  belongs_to: :employee
end
```

아래 사진처럼 총 다섯명의 직원이 있고, 각 직원은 여러개의 폼을 가지고 있다. 이때, 각 직원들의 폼을 가져오는 쿼리를 작성한다고 하자.

![N+1문제 예시 001](https://user-images.githubusercontent.com/72732446/146861630-54fe2875-8aca-424a-ab25-0760084e9ff0.jpeg)

```ruby
Employee.all.map { |employee| employee.forms }.flatten
```

언뜻보면 한줄의 짧은 쿼리로 폼 데이터를 가져오는것 처럼 보이지만, 해당 쿼리의 SQL 명령어는 아래와 같이 수행된다.

```sql
> SELECT `employees`.* FROM `employees` ORDER BY `employees`.`id`
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 1
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 2
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 3
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 4
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` = 5
```

첫 번째 쿼리에 직원들을 모두 로드한 다음 5개의 추가 쿼리를 수행하여 각 직원의 폼을 가져오기 때문에 데이터베이스에 총 6개의 쿼리가 실행된다. 즉, N = 5인 N + 1 쿼리 문제가 발생한다.

아래 사진과 같이 6 단계에 나눠서 모든 직원들의 폼을 가져오게 된다.

![N+1문제 예시 002](https://user-images.githubusercontent.com/72732446/146861757-7b5e8992-5443-49a0-895a-323978996df8.jpeg)

<hr>

## 해결방법

Rails는 관련 레코드를 미리 로드하고 데이터베이스에 대한 SQL 쿼리 수를 제한하는 `:includes`라는 ActiveRecord 메소드를 제공한다. 이 기술을 "eager loading(즉시로딩)"이라고 하며, 많은 경우 성능을 상당히 향상시킬 수 있다.

쿼리에 따라 `:includes`은 ActiveRecord 메서드 `:preload` 또는 `:eager_load`를 사용한다. `:includes`를 설명하기에 앞서, `:preload`와 `:eager_load` 메서드에 대해서 먼저 알아보자.

### preload: 사전 테이블 참조

`:preload`란 말 그대로 미리(pre) 테이블을 참조해 데이터를 로드(load) 하는 방식이다. SQL로 치자면 '사전 데이터 참고'로서, 데이터 탐색 전에 사전에 테이블을 참조하는 방식이다.

예를 들어, 책의 작가를 가져오는 쿼리를 `:preload`로 작성한다고 하자. 책(Book)과 작가(Author) 모델은 1:1 관계라고 가정하자.

```ruby
books = Book.preload(:author).limit(10)

books.each do |book|
  puts book.author.last_name
end
```

`:preload`를 사용하면 총 **두 개의 쿼리**가 생성된다. 각 `association` 별로 데이터를 로드하기 위한 별도의 쿼리가 생성 되는 것이다.

```ruby

SELECT `books`* FROM `books` LIMIT 10
SELECT `authors`.* FROM `authors`
 WHERE `authors`.`book_id` IN (1,2,3,4,5,6,7,8,9,10)
```

다만, `:preload` 속성은 `association`에 대한 필터를 적용하지 않고 메모리에 로드기 때문에 **타 테이블을 참고해서 조건을 표현하는 `where`, `find_by`와 같은 조건절을 사용할 수 없다. **

### eager_load: LEFT_OUTER_JOIN

`:eager_load` LEFT_OUTER_JOIN 을 사용해 모든 `associations`를 단일 쿼리로 로드한다.

> **LEFT_OUTER_JOIN 이란?**
> ![left outer join](https://www.w3schools.com/sql/img_leftjoin.gif)
> `LEFT JOIN`이라고도 불리는 `LEFT OUTER JOIN` 방식은 두 개의 테이블이 있을 때, 주체가 되는 왼쪽 테이블을 기준으로 두 테이블을 서로 맵핑 하는 방식이다. `LEFT OUTER JOIN`은 오른쪽 테이블에 대응하는 레코드가 없어도, 왼쪽 테이블의 모든 레코드를 가져온다. 더 자세한 정보는 해당 [링크](https://www.w3schools.com/sql/sql_join_left.asp)에서 확인할 수 있다.

`:eager_load` 로 동일한 예제 책의 작가를 가져오는 쿼리를 작성해보자.

```ruby
books = Book.eager_load(:author).limit(10)

books.each do |book|
  puts book.author.last_name
end
```

`:eager_load` 속성을 사용하면 동일하게 쿼리가 두 개만 생성된다. 하지만 `:preload` 와 다른점은, `LEFT OUTER JOIN` 으로 두 테이블을 조인한다는 것이다. 모든 `associations`를 단일 쿼리로 로드 한다.

```ruby
SELECT DISTINCT `books`.`id` FROM `books` LEFT OUTER JOIN `authors` ON `authors`.`book_id` = `books`.`id` LIMIT 10
SELECT `books`.`id` AS t0_r0, `books`.`last_name` AS t0_r1, ...
  FROM `books` LEFT OUTER JOIN `authors` ON `authors`.`book_id` = `books`.`id`
  WHERE `books`.`id` IN (1,2,3,4,5,6,7,8,9,10)
```

`association`이 메모리에 로드되므로 `eager_load` 메소드는 타 테이블을 참조하는 조건절 사용이 가능하다.

## includes: preload 혹은 eager_load

### include: preload

다시 직원과 폼의 예제로 돌아가자.

`:includes`는 언제 `:preload`를 사용할까?
대부분의 경우 `:includes`는 2개의 쿼리를 발생시키는 `:preload` 메서드를 사용하도록 기본 설정이 되어있다.

- 선행 모델에 연결된 모든 레코드 로드
- 연관된 모델 또는 선행 모델에서 외부 키를 기준으로 선행 모델과 연관된 레코드 로드

따라서, 쿼리에 `:preload`를 적용하면, 외래 키 `Form#employee_id`를 기반으로 폼이 로드되어 SQL `select` 문을 단 두 개만 생성할 수 있다.

```ruby
Employee.preload(:forms).map { |employee| employee.forms }.flatten

> SELECT `employees`.* FROM `employees`
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` IN (1, 2, 3, 4, 5)

```

![includes 예시 001](https://user-images.githubusercontent.com/72732446/147391078-6048a774-254b-460a-9177-27d3ee162c6d.jpeg)

위 예제에서 `:preload`를 `:includes`로 대체하면 동일한 SQL문이 생성된다.

```ruby
Employee.includes(:forms).map { |employee| employee.forms }.flatten

> SELECT `employees`.* FROM `employees`
> SELECT `forms`.* FROM `forms` WHERE `forms`.`employee_id` IN (1, 2, 3, 4, 5)
```

### include: eager_load

`:includes`는 언제 `:eager_load`를 사용할까?

`:includes`는 `where` 혹은 `order` 메서드로 타 테이블을 참조하는 조건절을 사용하지 않는다면, 기본적으로 `:preload`를 사용한다. 다시말해, `:includes`는 **`where` 혹은 `order` 메서드로 타 테이블을 참조하는 경우, `:eager_load`를 사용**한다.

해당 방식으로 쿼리를 구성할 때는 `:eager_load`되는 모델도 명시적으로 참조해야 한다.

```ruby
Employee.includes(:forms).where('forms.kind = "health"').references(:forms)
```

이 경우 `:includes`는 `:eager_load` 메소드를 사용하는데, LEFT_OUTER_JOIN 을 통해 중간 테이블을 만들어 모델 결과를 출력한다.

```ruby
> SELECT `employees`.`id` AS t0_r0, `employees`.`name` AS t0_r1, `forms`.`id` AS t1_r0, `forms`.`employee_id` AS t1_r1, `forms`.`kind` AS t1_r2 LEFT OUTER JOIN `forms` ON `forms`.`employee_id` = `employees`.`id` WHERE (forms.kind = "health")
```

![eager_load 001](https://user-images.githubusercontent.com/72732446/147407192-bc837b2c-6f0c-4709-8073-4091525c35a1.jpeg)

`:eager_load`를 `:includes`로 대체해도 SQL 문은 동일하게 출력된다. 또한, 이 경우에는 `:reference`도 제거할 수 있다.

```ruby
Employee.eager_load(:forms).where('forms.kind = "health"')
```

```ruby
> SELECT `employees`.`id` AS t0_r0, `employees`.`name` AS t0_r1, `forms`.`id` AS t1_r0, `forms`.`employee_id` AS t1_r1, `forms`.`kind` AS t1_r2 LEFT OUTER JOIN `forms` ON `forms`.`employee_id` = `employees`.`id` WHERE (forms.kind = "health")
```

하지만, `:includes` 를 `:preload`로 대체하면 쿼리가 실행되지 않는다. (`:preload`는 타 테이블을 참고해서 조건을 표현하는 where, find_by와 같은 조건절을 사용할 수 없음)

<hr>

## joins와 includes의 차이

### joins: INNER_JOIN

** `:joins`는 언제 활용하는 걸까?**

관계에서 레코드에 액세스하지 않고 결과만 필터링하는 경우 `join`이 사용된다. 아래 예제는 '유저1'이 작성한 주석과 함께 모든 블로그 게시물을 가져온다. 연결된 코멘트에 액세스하지 않으므로 조인이 적합하다.

```ruby
Post.joins(:comments).where(:comments => {author: '유저1'}).map { |post| post.title }
  Post Load (1.2ms)  SELECT  "posts".* FROM "posts" INNER JOIN "comments" ON "comments"."post_id" = "posts"."id" WHERE "comments"."author" = $1
=> ["유저1의 책 1",
 "유저1의 책 2",
 "유저1의 책 3"]
```

**그렇다면 `:joins`도 N + 1 문제를 해결할까?**

아니다. `joins`는 데이터를 메모리에 직접 로드하지 않는다. 대신, relationship(관계 모델) 에서 직접 열에 액세스 하기 때문에 N+1 쿼리가 트리거된다.

예를 들어 Comment 관계에 액세스할 때 다음과 같은 추가 쿼리가 생성된다.

```ruby
Post.joins(:comments).where(:comments => {author: '유저1'}).map { |post| post.comments.size }
  Post Load (1.2ms)  SELECT  "posts".* FROM "posts" INNER JOIN "comments" ON "comments"."post_id" = "posts"."id" WHERE "comments"."author" = $1
   (1.0ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = $1
   (3.0ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = $1
   (0.3ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = $1
   (1.0ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = $1
   (2.1ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = $1
   (1.4ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = $1
=> [3,5,2,4,2,1]
```

**`:joins`는 '`includes`, `preloads` 및 `eager_load`와 결합할 수 있을까?**
그렇다. `:joins`에 의해 지정된 join 유형(기본값은 INNER_JOIN)은 include 또는 eager_load에서 적용된 모든 join 값을 오버라이딩한다. 참고로, `preload`는 join을 적용하지 않는다.

<hr>

## 퍼포먼스

- 데이터베이스 요청에서 `eager_load`가 필수가 아니라면, `preload`를 사용하는게 더 낫다는 결과가 있다.
  [출처: Benchmark: preload vs. eager_load ](http://www.chrisrolle.com/en/blog/benchmark-preload-vs-eager_load)
- 또한, `:includes`를 사용하는 경우, `:preload`가 호출될 때 성능이 크게 향상되지만, `:eager_load`를 호출하면 대부분 부정적인 효과가 난다고 한다. `:eager_load`는 관계 모델을 로드하기 위해 더 복잡한 쿼리를 구성하므로 속도가 느릴 수 있다. [출처: A Visual Guide to Using :includes in Rails
  ](https://engineering.gusto.com/a-visual-guide-to-using-includes-in-rails/?fbclid=IwAR2PSYdvbo_3SwJATFbTy53mRXcR0nJijAHD6epMyd48DXwb0AinzB8XMwQ)

<hr>

## 참고

> - [Ruby on Rails : SQL N+1 맛보기](https://kbs4674.tistory.com/80)
> - [Benchmark: preload vs. eager_load](http://www.chrisrolle.com/en/blog/benchmark-preload-vs-eager_load)
> - [A Visual Guide to Using :includes in Rails](https://engineering.gusto.com/a-visual-guide-to-using-includes-in-rails/?fbclid=IwAR2PSYdvbo_3SwJATFbTy53mRXcR0nJijAHD6epMyd48DXwb0AinzB8XMwQ)
> - [Rails: Joins, Preload, Eager load and Includes](https://velog.io/@hyob/Rails-Joins-Preload-Eager-load-and-Includes)
> - [N+1 쿼리 문제 - 제타위키](https://zetawiki.com/wiki/N%2B1_%EC%BF%BC%EB%A6%AC_%EB%AC%B8%EC%A0%9C)
> - [Rails :include vs. :joins - Stack Overflow](https://stackoverflow.com/questions/1208636/rails-include-vs-joins)
> - <div>사람 아이콘: Icons made by <a href="https://www.flaticon.com/kr/authors/stockes-design" title="Stockes Design">Stockes Design</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon">www.flaticon.com</a></div>
> - <div>문서 아이콘: Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
