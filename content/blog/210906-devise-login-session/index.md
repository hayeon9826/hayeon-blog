---
title: "Devise에서 SNS 로그인 세션 유지 안될때"
date: "2021-09-06T22:50:32.169Z"
description: 레일즈 Devise 세션 유지 방법
category: "Rails"
---

![preview](https://velog.velcdn.com/images/khy226/post/fcbad1a8-fa5c-44ff-97a0-5048911cf0ca/68747470733a2f2f7261772e6769746875622e636f6d2f6865617274636f6d626f2f6465766973652f6d61737465722f6465766973652e706e67.png)

#### SNS 로그인 세션 유지

- 일반적으로 sns로그인을 구현할 때, omniauth_callback_controller 사용해서 로그인을 합니다. 웹앱으로 패키징할 경우, 따로 쿠키를 관리해줘야 하기 때문에 아래처럼 로그인시 유저 세션 정보를 저장해줘야 합니다. 

```ruby
#omniauth controller 코드 일부
cookies[:login] = true
@user.remember_me = true
#혹은 
cookies[:login] = true
@user.remember_me!
```



-  application controller에 sign_in_remember 메서드를 생성해서 아래와 같이 작성해줬습니다.

```ruby
#application controller

private

def sign_in_remember(user=nil)
  @user = user
  sign_out user
  @user.remember_me = true
  sign_in @user, event: :authentication
end
```

위 메서드를 sns로그인 함수에 적용해주면 sns 로그인을 해도 세션이 끊기지 않도록 설정할 수 있습니다.

```ruby
#omniauth controller 코드 일부

sign_in_remember(user)
```



위 글은 구글 그룹 글을 참고해서 만들었습니다: https://groups.google.com/g/plataformatec-devise/c/fGHzF1imqJ0?pli=1
