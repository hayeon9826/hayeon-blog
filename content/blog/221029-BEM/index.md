---
title: 'BEM이란?'
date: '2022-10-29T11:45:32.169Z'
description: 'CSS 네이밍 컨벤션 BEM에 대해서 알아보자'
category: 'Development'
keywords: 'CSS, BEM, Naming Convention'
image: 'https://velog.velcdn.com/images/khy226/post/609f8aff-4baa-4648-87a4-451ab0285434/image.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/609f8aff-4baa-4648-87a4-451ab0285434/image.png" style="margin: 0 auto; width: 60%; padding-bottom: 50px;"/>

## BEM이란?

BEM이란 `Block`, `Element`, `Modifier`의 줄임말로 CSS 클래스 네이밍 컨벤션 방법이다. HTML 요소들을 각각 `Block`, `Element`, `Modifier` 세 가지로 분류해서 작명을 하는 방법이다. 각각의 BEM 요소들은 다른 역할을 가지고 있으며, 해당 역할에 맞는 클래스명을 붙여서 개발하면 된다.

<br />

아래는 [BEM에 관한 글](https://getbem.com/naming/)을 번역한 내용이다.

---

## 이름 짓기(Naming)

> 컴퓨터 과학에는 오직 두 가지 어려운 문제가 있다: 캐시 무효화와 이름 짓기. - 필 칼튼

<br />

올바른 스타일 가이드가 개발 속도, 디버깅 및 레거시 코드에서 새로운 기능의 구현을 크게 증가시킬 수 있다는 것은 알려진 사실이다. 안타깝게도 대부분의 CSS 코드베이스는 구조나 명명 규칙 없이 개발되기도 한다. 이는 장기적으로 유지관리할 수 없는 CSS 코드베이스로 이어진다.

BEM 접근 방식은 웹사이트 개발에 참여하는 모든 사람이 단일 코드베이스로 일하고 동일한 언어를 사용할 수 있도록 한다. BEM 방식에 따라 적절한 이름을 사용하면, 웹 사이트의 디자인 변경에 대비할 수 있다.

---

### Block

Block은 단독으로 의미 있는 독립적인 엔티티(entity)를 캡슐화한다. 블록은 중첩되어 상호 작용할 수 있지만, 의미론적으로 동일한 상태로 유지되며 우선순위나 계층은 없다. DOM 표현이 없는 전체론적 엔티티(예: 컨트롤러 또는 모델)도 블록이 될 수 있다.

#### Naming

블록 이름은 라틴 문자, 숫자 및 대시로 구성될 수 있다. CSS 클래스를 형성하려면 네임스페이스에 짧은 접두사를 추가하면 된다. 예) `.block`

#### HTML

클래스 이름을 사용할 경우 모든 DOM 노드가 블록이 될 수 있다. `<div class="block">...</div>`

#### CSS

클래스 이름은 셀렉터(selector)만 사용해야한다. (tag name, id등에 사용 금지). 페이지의 다른 블록/요소에 종속되지 않도록 사용해야한다. `.block {color: #042;}`

---

### Element

Element는 블록의 일부이며 독립적인 의미는 없다. 모든 요소는 의미론적으로 블록에 연결된다.

#### Naming

Element 이름은 라틴 문자, 숫자, 대시 및 밑줄로 구성될 수 있다. CSS 클래스는 블록 이름 + 두 개의 밑줄 + 요소 이름으로 구성된다. 예) `.block__elem`

#### HTML

블록 내의 임의의 DOM 노드는 요소가 될 수 있다. 주어진 블록 내에서 모든 요소는 의미론적으로 동일하다.

#### CSS

`<div class="block"><span class="block__elem"></span></div>`

### 예시)

#### Good

```css
.block__elem {
  color: #042;
}
```

#### Bad

```css
.block .block__elem {
  color: #042;
}
div.block__elem {
  color: #042;
}
```

---

### Modifier

블록 또는 요소의 플래그이다. 생김새, 행동, 상태를 바꾸는 데 사용합니다.

#### Naming

Modifier 이름은 라틴 문자, 숫자, 대시 및 밑줄로 구성될 수 있다. CSS 클래스는 블록 또는 요소의 이름과 두 개의 대시로 구성된다. 예) `.block--mod` 혹은 `.block__elem--mod` 혹은 `.block--color-black` 과 `.block--color-red.`
복잡한 수식자의 공백은 대시로 대체될 수 있다.

#### HTML

Modifier는 블록/요소 DOM 노드에 추가하는 추가적인(extra) 클래스 이름이다. 수정이 되는 블록/요소에만 modifier 클래스를 추가하고, 원래 클래스들은 유지해야한다.

#### CSS

Modifier 클래스 이름을 셀렉터로 사용: `.block--hidden { }`

블록 레벨 modifier를 기준으로 요소를 변경하는 방법: `.block--mod .block__elem { }`

엘리먼트 modifier: `.block__elem--mod { }`

### 예시

#### Good

```html
<div class="block block--mod">...</div>
<div class="block block--size-big block--shadow-yes">...</div>
```

#### Bad

```html
<div class="block--mod">...</div>
```

---

### Example

예를 들어, `theme: "xmas"`와 `simple: true`라는 modifier를 가진 블록 폼을 가지고 있다고 하자. 해당 폼은 `input`과 `submit`이라는 엘리먼트를 가지고 있고, `submit` 엘리먼트는 폼이 다 채워지기 전까지 `disabled: true`라는 modifier를 가지고 있다고 가정하자.

#### HTML

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input class="form__submit form__submit--disabled" type="submit" />
</form>
```

#### CSS

```css
.form {
}
.form--theme-xmas {
}
.form--simple {
}
.form__input {
}
.form__submit {
}
.form__submit--disabled {
}
```

---

## 마무리하며

이전 회사에서 퍼블리싱 작업을 할 때 비슷한 클래스 코드를 여러개 만들어서 사용하고, 요소가 살짝만 수정되어도 새로운 클래스명을 만들어서 덮어씌우는 등 비효율적인 개발을했었다. 이를 해결하기 위해, 클래스 이름에 규칙을 붙여 BEM 방식으로 개선을 하였고, 코드를 간결하고 재사용성 있게 리팩토링 할 수 있었다.

무작정 디자인 가이드를 보고 그때그때 css 클래스명을 만드는 것이 아니라, 클래스 구조를 먼저 설계한 다음에, 비슷한 요소들끼리 묶어서 Block, Element, Modifier를 하나씩 추가하며 작업을 하자 코드가 더 간결해지고 체계적인 css를 만들 수 있었다.

BEM을 막상 도입하기 전에는 '그냥 개발 방법론 아닌가? 이걸 적용해서 더 나아질까?' 라는 의구심도 있었지만 처음에 조금만 신경을 쓰면 개발을 진행하고, 유지보수할 때 훨씬 효율적이게 개발을 할 수 있었다. BEM 이외에도 여러가지 CSS 방법론이 있고 본인의 회사 및 프로젝트 상황에 맞게 적용하여 사용하면 좋을 것 같다.

---

## 출처

> - [BEM Naming](https://getbem.com/naming/)
