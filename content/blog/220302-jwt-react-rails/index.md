---
title: jwt로 로그인 기능 만들기 (React + Rails )
date: '2022-03-02T22:45:32.169Z'
description: jwt란? JWT(Json Web Token)의 약자로, Json 포맷을 이용해 인증에 필요한 정보를 암호화 한 웹 토큰이다.
category: 'Development'
image: 'https://velog.velcdn.com/images/khy226/post/3c2e713c-5efa-4212-99da-71a67c934aa1/jwt%20logo.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/3c2e713c-5efa-4212-99da-71a67c934aa1/jwt%20logo.png" style="padding-bottom: 50px;">

## jwt란?

JWT(Json Web Token)의 약자로, Json 포맷을 이용해 인증에 필요한 정보를 암호화 한 웹 토큰이다. JWT는 아래 사진 같이 긴 암호화 된 토큰으로, 토큰 자체를 정보로 사용하는 Self-Contained 방식으로 안전성을 보장한다. 주로 회원 인증이나 정보 전달을 위해 쓰이며, Access Token(JWT)을 HTTP 헤더에 넣어 서버와 통신한다.

![jwt image](https://user-images.githubusercontent.com/72732446/156038225-0df8a137-4159-4fbd-b78a-7db6f7dbfb03.png)

> JWT 공식 사이트: https://jwt.io/

### JWT 구조

JWT 공식 사이트 (https://jwt.io/) 에 들어가면 암호화 된 토큰을 볼 수 있다. 위에 사진을 보면 토큰이 세 가지 색깔로 구분이 되어있는다. 자세히 보면 빨강, 분홍, 파랑 색깔 사이에 온점(".")이 있는데, 이 온점이 바로 토큰을 구성하는 세 가지 요소를 구분하는 기준이다.

토큰을 만들기 위해서는 세 가지 요소 "Header, Payload, Verify Signature"가 필요하다.

- 형태: `header` + "." + `payload` + "." + `signature`
- Header: 토큰 타입, 암호화 알고리즘 지정
- Payload: 서버에서 보내는 데이터. 토큰에서 사용할 정보의 조각들인 '클레임'이 담겨있음
- Signature: 토큰을 인코딩하거나 유효성 검증을 할 때 사용하는 고유한 암호화 코드

따라서, 일반적으로 JWT는 아래와 같은 구조를 띈다:
`xxxxx.yyyyy.zzzzz`

<hr />

#### 1. Header (헤더)

JWT 토큰의 헤더는 typ와 alg 두 가지 정보로 구성된다. alg는 signature를 암호화 할 알고리즘 방식을 지정하고, typ는 토큰의 타입을 지정한다.

- alg: 토큰의 타입을 지정한다. (ex. JWT)
- typ: 암호화 알고리즘 방식을 지정한다. 서명(Signature)을 암호화 하거나, 토큰 검증에 사용된다. (ex. HS256, RSA)

```javascript
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 2. Payload (페이로드)

Payload에는 토큰에 담을 정보가 들어간다. Payload에 담는 정보의 한 조각을 클레임(claim) 이라고 부르며, 토큰에는 여러개의 클레임을 넣을 수 있다.
클레임은 총 세 가지로 나뉘며 Json(Key/Value) 형태로 다수의 정보를 넣을 수 있다.

- 등록된 클레임(Registered Claim)
- 공개 클레임(Public Claim)
- 비공개 클레임(Private Claim)

#### 2-1. 등록된 클레임(Registered Claim)

등록된 클레임들은 이름이 이미 정해져있는 클레임으로 토큰에 대한 정보들을 담기 위해 사용된다. (사용자가 정한 이름이 아님) 등록된 클레임은 선택적으로 사용할 수 있으며, JWT를 간결하게 하기 위해 key는 모두 세 문자열로 이뤄져 있다.

- `iss`: 토큰 발급자 (issuer)
- `sub:` 토큰 제목 (subject). subject로는 unique한 값을 사용하는데, 사용자 이메일을 주로 사용함.
- `aud`: 토큰 대상자 (audience)
- `exp`: 토큰 만료시간 (expiraton), NumericDate 형식. (예: 1480849147370) 현재 시간 이후로 설정되야 함.
- `nbf`: 토큰 활성 날짜 (not before). NumericDate 형식. 해당 날짜가 지나기 전까지는 토큰 비활성화
- `iat`: 토큰 발급 시간 (issued at). 토큰 발급 이후 경과된 시간을 알 수 있음.
- `jti`: JWT 토큰 식별자(JWT ID). 중복 처리를 방지하기 위해 사용. 일회용 토큰(Access Token)등에 사용하면 유용.

#### 2-2. 공개 클레임(Public Claim)

공개 클레임은 사용자 정의 클레임으로, 공개용 정보를 위해 사용된다. 충돌 방지 (collision-resistant) 를 위해 클레임 이름을 URI 포맷으로 적는다.

```javascript
{
  "https://velog.io/@khy226": true
}
```

#### 2-3. 비공개 클레임(Private Claim)

비공개 클레임은 사용자 정의 클레임으로, 클라이언트와 서버간 협의하에 사용되는 클레임 이름들이다. 공개 클레임과는 달리 이름이 중복되어 충돌이 될 수 있으니 사용할때에 유의해야한다.

```javascript
{
  "username": "khy"
}
```

#### payload 예시)

```javascript
{
  // 등록된 클레임
  "sub": "23442s5b-1adf-4sff-sdf939-6sdf0c0b91f7", // 토큰 제목
  "iss": "https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_~~", // 토큰 발급자
  "iat": 1925144429, // 토큰이 발급된 시간
  "exp": 1925148029, // 토큰의 만료 시간
  "jti": "89adf5-e434-w20d-3432f-456c4adf73", // JWT의 고유 식별자
  // 공개 클레임
  "https://velog.io/@khy226": true,
  // 비공개 클레임
  "username": "khy"
  "event_id": "893a4c1b-3d67-4b8d-a57f-4ed8bcf90c6c",
  "token_use": "access",
  "scope": "aws.cognito.signin.user.admin",
  "auth_time": 1625144429,
  "client_id": "79307ehbtr2o3ln1ip8dcb9v6p",
}
```

#### 3. Signature (서명)

서명(Signature)은 토큰을 인코딩하거나 유효성 검증을 할 때 사용하는 고유한 암호화 코드이다.

Signature은 **헤더(Header)와 페이로드(Payload)**의 값을 각각 BASE64로 인코딩하고, 인코딩한 값을 비밀키로 해싱을 하여, 이 값을 다시 BASE64로 인코딩하여 생성한다. 이때 비밀키로 해싱하는 알고리즘은 (Header)에서 정의한 알고리즘을 사용한다.

비대칭 키 방식인 RS256(RSA Sinature with SHA-256)와 대칭키 방식인 HS256(HMAC with SHA-256)를 주로 사용한다. 간단히 정리하자면 아래와 같다.

> #### RS256(RSA Sinature with SHA-256)

- 비대칭키 방식
- message에 sha-256 적용후 private_key 사용해서 암호화
- public key는 jwk를 통해 공개적으로 제공

#### HS256(HMAC with SHA-256)

- 대칭키 방식
- message에 SHA256 적용후 대칭키 사용해서 암호화
- 토큰을 만들때 사용한 secret_key와 토큰을 검증할때 사용하는 secret_key가 같아야 함.
  참고: [API 서버 인증을 위한 JWT와 JWK 이해하기](https://www.letmecompile.com/api-auth-jwt-jwk-explained/)

#### JWT 토큰 사용

생성된 JWT 토큰은 HTTP 통신을 할 때 헤더에 넣어서 사용한다. 헤더에 넣을 때 Authorization 이라는 key의 value로 사용되며, 일반적으로 Bearer라는 문자열이 앞에 붙여진다.

```javascript
{
  "Authorization": "Bearer {JWT token 값}"
}
```

#### JWT 토큰 사용 시 주의사항

최종적으로 JWT 토큰은 `Encoded Header + "." + Encoded Payload + "." + Verify Signature` 형태를 띄게 된다. 이때, Header, Payload는 인코딩 될 뿐(16진수로 변경), 따로 암호화되지 않는다. JWT 토큰에서 Header, Payload는 <u>누구나 디코딩하여 확인</u>할 수 있기 때문에 비밀번호와 같은 중요한 정보는 넣지 말아야 한다.

다행히도, Verify Signature는 secret_key를 알지 못하면 복호화할 수 없다. 즉, B라는 해커가 A의 정보가 든 payload를 조작해서 인코딩 후 서버에 보내더라도, Verify Signature는 A의 Payload를 기반으로 암호화되었기 때문에 유효하지 않는 토큰으로 간주한다. 즉, <u>secret_key를 알지 못하면 토큰을 조작할 수는 없다.</u>

<hr />

## jwt를 이용한 로그인 흐름

그렇면 JWT 토큰을 사용해서 어떻게 사용자 인증을 하는걸까?

사용자가 로그인을 하면, 서버에서 해당 계정 정보를 확인해서 유효시간이 있는 JWT 토큰을 발급한다. 해당 사용자는 유효시간이 끝날 때 까지, 인증이 필요한 요청마다 해당 JWT 토큰을 http 헤더에 넣어 서버에 요청을 한다. 서버에서는 해당 JWT 토큰이 유효한지 확인하고 사용자 정보를 전달한다.

![jwt login](https://auth0.com/learn/wp-content/uploads/2016/01/17.png)

> 이미지 출처: [Get Started with JSON Web Tokens](https://auth0.com/learn/json-web-tokens/)

1. 사용자가 username, password 로 로그인을 한다.
2. 서버는 해당 계정 정보를 읽어 사용자가 있는지 확인을 하고, JWT 토큰을 발급한다. 이때, JWT 토큰에 사용자의 고유한 ID값을 부여한 후, 기타 정보와 함께 Payload에 넣고 토큰의 유효 기간을 설정한다.
3. 서버는 secret_key를 이용해 Access Token을 발급하고, 해당 JWT 토큰을 브라우저에게 전달한다.
4. 사용자는 Access Token을 받아 저장한 후, 인증이 필요한 요청마다 Authorization 헤더에 토큰을 실어 보낸다.
5. 서버는 secret_key를 이용해 해당 토큰의 Verify Signature를 복호화한 후, 조작 여부와 유효기간을 확인한다.
6. 검증이 완료되면 Payload를 디코딩하여 사용자 데이터를 전달한다.

### 세션 인증 vs. 토큰 인증

JWT 토큰 인증은 자주 사용되는 세션/쿠키 인증 방식과 차이가 있다. 세션/쿠키는 세션 저장소에 유저의 정보를 넣는 반면, JWT는 **토큰 안에 유저의 정보**들을 넣는다. 클라이언트 입장에서는 HTTP 헤더에 세션id, 혹은 토큰을 실어서 보내준다는 점에서는 동일하게 동작하나, 서버 측에서는 인증을 위해 암호화를 하냐(JWT), 별도의 저장소를 이용하냐(Session)는 차이가 발생한다.

### JWT 토큰 인증의 장단점

#### 장점

- 구현하기 간편하다. 세션/쿠키 처럼 별도의 세션 저장소가 필요하지도 않고, 그냥 암호화된 토큰만 발급하면 된다.
- 또한, 별도의 저장소가 없기 때문에 서버 유지 보수 및 확장에 용이하다.
- 확장성이 좋다. 토큰 기반으로 하는 다른 인증 시스템에 접근이 가능하기 때문이다. 구글, 페이스북 같은 oauth 인증 로그인도 토큰 기반 인증이다.

#### 단점

- JWT 토큰이 악의적으로 사용된다면 막을 방법이 없다. 세션/쿠키의 경우 악용되는 세션을 지워버리면 되지만, JWT 토큰은 유효기간이 끝날때까지 누구든지 사용이 가능하다.
- 토큰에 저장할 수 있는 정보가 제한적이다. Payload는 누구나 디코딩할 수 있기 때문에 중요정보는 넣을 수 없다.
- 세션/쿠키 방식에 비해 JWT의 길이는 매우 길다. 따라서 인증이 필요한 요청이 많아질 수록 서버의 자원낭비가 발생한다.

<hr />

## 리액트 / 레일즈 프로젝트에 적용하기

Rails의 `jwt`, `jwt_sessions` gem을 사용해 jwt 로그인을 구현해보려고 한다. 기본적으로 Devise가 적용되었다는 전제하에 중요 부분들만 정리해보려고 한다.

(백엔드는 Rails (api 서버), 프론트는 React와 Graphql를 사용했으며, 전체 코드는 https://github.com/hayeon9826/tiltil-server 에서 확인 가능하다.)

### 0. jwt 관련 라이브러리 및 메서드 세팅

#### 1. 우선 jwt 인증에 필요한 Gem 을 설치한다.

- `bundle install`로 gem 설치

```ruby
# JWT 인증 구현
gem 'jwt'
gem "jwt_sessions"
```

#### 2. lib 폴더 안에 `json_web_token.rb` 파일을 생성한다.

- JWT 키를 해석(Decode) 할 때 쓰일 메소드이다.
- `rake secret` 명령어로 시크릿 키를 생성해, secret_key_base 환경 변수 값으로 등록했다.

```ruby
class JsonWebToken
  def self.decode(token)
    return HashWithIndifferentAccess.new(JWT.decode(token, Rails.application.credentials.secret_key_base)[0])
  rescue
    nil
  end
end
```

#### 3. `config/initializers/jwt.rb` 파일을 생성 한다.

- 처음에 서버가 켜질 때, lib/json_web_token.rb 파일을 init(초기화) 한다.

```ruby
require 'json_web_token'
```

#### 4. graphql_controller.rb에 아래 내용을 추가한다.

- 참고로, 컨트롤러는 graphql_controller.rb 만을 사용했다.

```ruby
class GraphqlController < ApplicationController
   include JWTSessions::RailsAuthorization
   rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    # 아래에 생성한 current_user와 auth_refresh를 넘겨줌
    context = {
      current_user: current_user,
      auth_refresh: auth_refresh
    }
    # graphql 파일에서 처리
    result = BackendSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  ## 1. 헤더에 있는 정보 중, Authorization 내용(jwt 토큰) 추출
  ## Authorization 값은 'Bearer ${토큰}'으로 전달되기에 공백 기준 두번 째 값을 가져옴
    def http_token
      http_token ||= if request.headers['Authorization'].present?
        request.headers['Authorization'].split(' ').last
      end
    end

    ## 2. auth_token은 lib/json_web_token.rb 내의 decode 메소드에서 진행됨.
    ## http 헤더로 가져온 토큰을 디코드 함.
    def auth_token
      auth_token ||= JsonWebToken.decode(http_token)
    end


## 3. 위에서 생성한 auth_token 에서 user_id를 통해 현재 유저를 가져옴
  def current_user
    begin
      authorize_access_request!
      current_user ||= User.find(auth_token["user_id"])
    rescue StandardError => e
      current_user = nil
    end
  end


## 4. jwt token 유효기간이 만료되었을 때 사용되는 refresh_token
## http_token과 동일하게 헤더로 전달된다.
    def refresh_token
      refresh_token ||= if request.headers['X-Refresh-Token'].present?
        request.headers['X-Refresh-Token']
      end
    end

## 5. 위 refresh_token을 JsonWebToken.decode 메서드로 디코딩함
    def auth_refresh
      auth_refresh ||= JsonWebToken.decode(refresh_token)
    end
end
```

### 1. jwt 토큰 이용한 로그인 구현

#### 0. 프론트엔드 api 설정

- 프론트와 백 간의 http 통신을 위해서 HTTP 비동기 통신 라이브러리 `axios` 를 사용했다.
- baseUrl, timeout, 헤더 값들을 설정해주었다.
- 모든 요청은 graphql 컨틀롤러의 execute 액션으로 가도록 처리해주었다. `API.post("/graphql", { query });`

```javascript
const headerTokenConfig = (config: any) => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS') {
    const { csrf, token } = getToken()
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': csrf,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
}

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer *',
  },
})

API.interceptors.request.use(headerTokenConfig)

export const postQuery = (query: any) => API.post('/graphql', { query })
```

#### 1. 위에서 설정한 postQuery api로 로그인 메서드 실행

- 로그인 계정을 입력하고, 로그인 폼을 제출했을 때 아래 코드를 실행시켰다.
- graphql로 SignInUserQuery 라는 쿼리를 생성해 로그인 정보를 백으로 요청을 해주었다.
- SignInUserQuery는 email, password 라는 인수를 받아 요청을 하며, 응답 데이터는 jwt 토큰의 정보(refresh, token)를 받아온다.

```javascript
// login.tsx 로그인 폼에서 계정 정보 입력 시 실행

const onSubmit = async (inputValues: any) => {
  // graphql의 signInUser 메서드 실행
  const query = SignInUserQuery(inputValues.email, inputValues.password)
  const response = await postQuery(query)
  if (response.data?.data?.signInUser && response.data?.data?.signInUser?.token) {
    await toast('로그인 되었습니다.')
    await authenticateUser(response?.data?.data?.signInUser)
    await router.push('/')
  } else {
    if (response?.data?.data?.signInUser?.errors) {
      toast(response?.data?.data?.signInUser?.errors)
    } else {
      toast('문제가 생겼습니다. 다시 시도해주세요.')
    }
  }
}

// query/user.ts
export const SignInUserQuery = (email: string, password: string) => `mutation {
  signInUser(email: "${email}", password: "${password}") {
    refresh
    token
    csrf
    errors
  }
}`
```

#### 2. 백엔드에서 app/graphql/mutations/users/sign_in_user.rb 로 호출

- SignInUserQuery를 호출하면, 레일즈 백엔드에서 아래와 같은 처리를 한다.

```ruby
module Mutations
  module Users
    class SignInUser < BaseMutation
      null true

      argument :email, String, required: true
      argument :password, String, required: true

      # return type from the mutation
      field :token, String, null: true
      field :csrf, String, null: true
      field :errors, String, null: true
      field :refresh, String, null: true

      def resolve(**attributes)
        if attributes
        # 사용자 확인
          user = User.find_for_database_authentication(email: attributes[:email])
          return unless user

          if user&.valid_password?(attributes[:password])
          # payload 및 refresh_payload 생성
            payload = { user_id: user.id, email: user.email, created_at: user.created_at, name: user.name, access_exp: 1.hour.from_now.to_i, refresh_exp: 2.weeks.from_now.to_i }
            refresh_payload = { user_id: user.id }
            # JWTSession으로 jwt 토큰 발급
            session =  JWTSessions::Session.new(payload: payload, refresh_payload: refresh_payload)
            tokens = session.login
			# 발급된 토큰에서 필요한 정보들 넘겨주기
            { token: tokens[:access], csrf: tokens[:csrf], refresh: tokens[:refresh], errors: "성공적으로 로그인 되었습니다." }
          else
            { errors: "비밀번호 오류입니다." }
          end
        else
          { errors: "모든 필드를 입력해주세요." }
        end
      end
    end
  end
end
```

- 먼져, 로그인에서 넘어온 email이 있는지 확인 후 password가 맞는지 확인한다.
- 만약 계정 정보가 맞다면 payload와 refresh_payload를 생성한다. payload는 사용자에게 전달할 정보를 넣는다. refresh_payload는 access_token 만료시 사용자 정보 확인용으로 user_id 값만 넣는다.
- jwt_ssession으로 토큰을 생성하고, 생성된 토큰을 프론트로 넘겨준다.

#### 3. 프론트로 넘어온 토큰을 받아 current_user를 저장한다.

- 만약 응답에 token이 있으면 (`response.data?.data?.signInUser?.token`) authenticateUser 메서드를 호출하면서 '로그인이 되었다'는 메세지를 띄운다.
- authenticateUser 메서드는 recoil로 사용자 정보를 저장시켜주는 역할을 한다.

```javascript
const onSubmit = async (inputValues: any) => {
  const query = SignInUserQuery(inputValues.email, inputValues.password)
  const response = await postQuery(query)
  if (response.data?.data?.signInUser && response.data?.data?.signInUser?.token) {
    await toast('로그인 되었습니다.')
    // 사용자 정보 저장, 토큰 저장
    await authenticateUser(response?.data?.data?.signInUser)
    await router.push('/')
  } else {
    if (response?.data?.data?.signInUser?.errors) {
      toast(response?.data?.data?.signInUser?.errors)
    } else {
      toast('문제가 생겼습니다. 다시 시도해주세요.')
    }
  }
}
```

- auth/index.tsx의 authenticateUser 메서드 일부
- recoil를 사용해 전체 프로젝트에서 current_user정보를 사용할 수 있게 했다.

```javascript
const [currentUser, setCurrentUser] = useRecoilState<AuthState>(
    authSelector as any
  );

  const authenticateUser = ({ token, csrf, refresh }: Token) => {
    saveToken({ token, csrf, refresh });
    setCurrentUser({
      token,
      csrf,
      refresh,
      currentUser: getCurrentUserFromToken(token),
    });
  };
```

### 2. access token 만료 시 refresh api 호출

#### 0. current_user를 호출 할 때마다 토큰이 만료되었는지 체크

- current_user를 호출할 때마다, useEffect를 사용해 토큰이 유효한지 체크한다.
- 만약 [토큰 만료, 리프레시 토큰 만료] 일 경우에, current_user 값을 null로 변경하고, 로그아웃 상태로 만든다.
- 만약 [토큰 만료, 리프레시 토큰 유효] 일 경우어, `refreshApi()` 를 호출해 새로운 jwt 토큰을 발급받는다.

```javascript
useEffect(() => {
  if (currentUser?.currentUser) {
    if (
      // token invalid 이고, refresh token 까지 timeout면 리셋
      !(
        currentUser?.token &&
        currentUser.refresh &&
        checkTokenValid(currentUser?.token) &&
        checkRefreshValid(currentUser?.refresh)
      )
    ) {
      unAuthenticateUser()
    } else if (
      !(currentUser?.token && checkTokenValid(currentUser?.token)) &&
      currentUser.refresh &&
      checkRefreshValid(currentUser.refresh)
    ) {
      // refresh token이 유효하면 refresh api 호출
      refreshUserApi()
    }
  }
  // refreshUserApi();
}, [currentUser])

// refresh api 호출
const refreshUserApi = async () => {
  const response = await refreshQuery(refreshUserQuery())
  if (response.data?.data?.refreshUser && response.data?.data?.refreshUser?.token) {
    authenticateUser(response?.data?.data?.refreshUser)
  }
}
```

#### 1. refreshApi 설정

- axios를 사용해서 timeout, header 등을 설정한다.
- 기존 설정과 다른점은, 헤더에 "X-Refresh-Token"라는 이름에 refresh token 값을 넣어서 요청을 보낸다. `"X-Refresh-Token": refresh`

```javascript
const refreshTokenConfig = (config: any) => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS') {
    const { csrf, token, refresh } = getToken()
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': csrf,
      Authorization: `Bearer ${token}`,
      'X-Refresh-Token': refresh,
    }
  }
  return config
}

const RefreshAPI = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer *',
  },
})

RefreshAPI.interceptors.request.use(refreshTokenConfig)

// api.ts
export const refreshQuery = (query: any) => RefreshAPI.post('/graphql', { query })
```

- 참고로, refreshUserQuery는 아래와 같이 graphql로 구성되어있다. 헤더에 refresh token을 넣어 서버에 전달을 하고, 새로운 token, refresh token 등을 받아온다.

```javascript
export const refreshUserQuery = () => `mutation {
  refreshUser{
    refresh
    token
    csrf
    errors
  }
}`
```

#### 2. 컨트롤러에서 refresh token 디코드

- graphql_controller.rb에서 설정한대로, 헤더에서 refresh_token을 받아 decode한 뒤, context에 넣어준다.

```ruby
  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    # refresh 토큰 추가
    context = {
      current_user: current_user,
      auth_refresh: auth_refresh
    }
    result = BackendSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

	private

	def refresh_token
      refresh_token ||= if request.headers['X-Refresh-Token'].present?
        request.headers['X-Refresh-Token']
      end
    end

    def auth_refresh
      auth_refresh ||= JsonWebToken.decode(refresh_token)
    end
```

#### 3. 백엔드의 app/graphql/mutation/users/refresh_user.rb 에서 refresh token으로 jwt 토큰을 재발급한다.

- 우선 refresh token 디코드 한 정보 중, user_id로 사용자 있는지 확인한다.
- 사용자가 있다면, 다시 payload 내용을 만들어서 jwt 토큰을 발급한다.
- 발급한 토큰 정보를 프론트로 보낸다.

```ruby
module Mutations
  module Users
    class RefreshUser < BaseMutation
      null true

      # return type from the mutation
      field :token, String, null: true
      field :csrf, String, null: true
      field :errors, String, null: true
      field :refresh, String, null: false

      def resolve(**attributes)
        if attributes
			# refresh token 디코드 한 정보 중, user_id로 사용자 있는지 확인
          user = User.find_by_id(context[:auth_refresh]["user_id"]) if context[:auth_refresh].present?
          return unless user
          # 사용자가 있다면, 다시 payload를 만들어 jwt 토큰 밝급
          if user&.present?
            payload = { user_id: user.id, email: user.email, created_at: user.created_at, name: user.name, access_exp: 1.hour.from_now.to_i, refresh_exp: 2.weeks.from_now.to_i }
            refresh_payload = { user_id: user.id }
            session =  JWTSessions::Session.new(payload: payload, refresh_payload: refresh_payload)
            tokens = session.login
			# 발급된 토큰 정보를 프론트로 보낸다.
            { token: tokens[:access], csrf: tokens[:csrf], refresh: tokens[:refresh], errors: "성공적으로 로그인 되었습니다." }
          else
            { errors: "사용자가 존재하지 않습니다." }
          end
        else
          { errors: "모든 필드를 입력해주세요." }
        end
      end
    end
  end
end
```

<hr />

## 출처

> - [Ruby on Rails : JWT with devise [gem : jwt]](https://kbs4674.tistory.com/89)
> - [[Server] JWT(Json Web Token)란?](https://mangkyu.tistory.com/56)
> - [쉽게 알아보는 서버 인증 1편(세션/쿠키 , JWT)](https://tansfil.tistory.com/58)
> - [[JWT] JSON Web Token 소개 및 구조](https://velopert.com/2389)
> - [API 서버 인증을 위한 JWT와 JWK 이해하기](https://www.letmecompile.com/api-auth-jwt-jwk-explained/)
