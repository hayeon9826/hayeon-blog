---
title: 사용해본 AWS 서비스 정리
date: "2021-11-07T22:40:32.169Z"
description: 알아두면 좋은 12가지 AWS 서비스 정리
category: "Development"
---

<img src="https://velog.velcdn.com/images/khy226/post/47219bd9-89ce-4c2c-a078-8c4025a32818/AWSLogo.png" style="width: 60%; padding-bottom: 50px;">

### AWS (Amazon Web Service) 란?

[AWS(Amazon Web Services)](https://aws.amazon.com/ko/)는 인프라에서 머신러닝에 이르기까지 200개 이상의 범용 리소스를 제공하는 최대 클라우드 컴퓨팅 플랫폼이다. AWS의 다양한 시스템은 사용 편의성을 최대화 하며 컨텐츠 제공 기능, 데이터 스토리지 등을 통해 애플리케이션의 성능을 최적화하도록  설계되었다. 현재 클라우드 컴퓨팅 분야에서 압도적으로 세계 1위의 점유율을 차지하고 있다.

기존 클라우드 서비스와 달리, AWS에서는 고정적인 월정액 사용료가 아닌 사용자가 실제로 사용한 금액만 지불하면 된다. (단, 일부 서비스는 고정료 지불) 아마존은 200개 이상의 다양한 서비스를 제공하고 있으며, [해당 링크](https://docs.aws.amazon.com/ko_kr/)에서 각 서비스에 대한 내용을 자세히 볼 수 있다.

<hr>


### 1. [EC2 (Elastic Compute Cloud)](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/concepts.html) 

![ec2 이미지](https://user-images.githubusercontent.com/72732446/140356846-88ba29fc-d23f-47bf-9dcc-d4c6871a83db.png) 



Amazon Elastic Compute Cloud(Amazon EC2)는 AWS의 중심 서비스인 **가상 머신**(가상 서버)이다. EC2를 통해 임대받은 가상 서버를 인스턴스라고 부른다. 

공식 문서에서 설명하는 Amazon EC2 사용법은 아래와 같다:

> Amazon EC2를 사용하려면 다음을 수행하면 됩니다.
>
> 1. 미리 구성된 템플릿 기반의 Amazon 머신 이미지(AMI)를 선택합니다. 또는 애플리케이션, 라이브러리, 데이터 및 관련 구성 설정을 포함하는 AMI를 만듭니다.
> 2. Amazon EC2 인스턴스에 대한 보안 및 네트워크 액세스를 구성합니다.
> 3. 원하는 인스턴스 유형을 선택한 다음 웹 서비스 API 또는 제공된 다양한 관리 도구를 사용하여 AMI 인스턴스를 필요한 수만큼 시작, 종료, 모니터링합니다.
> 4. 여러 위치에서 실행할지, 고정 IP 끝점을 사용할지, 인스턴스에 영구 블록 스토리지를 추가할지 여부를 결정합니다.
> 5. 인스턴스 시간 또는 데이터 전송과 같은 실제로 소비한 리소스에 대해서만 비용을 지불합니다.

EC2는 사용자가 가상 컴퓨터를 임대 받아 그 위에 자신만의 컴퓨터 애플리케이션들을 실행할 수 있도록 하는 클라우드 서비스이다. EC2는 사용자에게 확장 가능한 컴퓨팅 클라우드를 제공한다.  또한, 여러 가지 프로세서, 스토리지, 네트워킹, 운영 체제, 구매 모델을 선택할 수 있는 가장 폭넓고 세분화된 컴퓨팅 플랫폼을 제공한다.

EC2를 사용하면 하드웨어를 따로 설치할 필요가 없어 더 빠르게 애플리케이션을 개발하고 배포할 수 있다. 또한, EC2를 사용해 원하는 수의 가상 서버를 구축하고 보안 및 네트워킹을 구성하며 스토리지를 관리할 수 있다.  물리적인 컴퓨터 서버에 비해 편의성, 확장성이 좋다.

EC2는 인스턴스를 시작하는 것 외에도, 보안 그룹 세팅, 로드 밸런싱, 그룹 자동 확장 등을 다양하게 설정 관리하는 방법이 제공되니, [Amazon EC2 기능](https://aws.amazon.com/ko/ec2/features/) 사용 방법을 배워서 필요한 기능들을 적용해보면 된다.

<hr>

### 2. [RDS (Relational Database Services)](https://aws.amazon.com/ko/rds/features/)

![rds 이미지](https://user-images.githubusercontent.com/72732446/140368420-d421ac84-55a8-452e-9a0d-0182a1cf0b09.png)

Amazon Relational Database Service(RDS)는 아마존에서 제공하는 **관계형 DBMS** 서비스다.  AWS 클라우드에서 관계형 데이터베이스를 더 쉽게 설치, 운영 및 확장할 수 있는 웹 서비스이다.

Amazon Aurora, MySQL, MariaDB, PostgreSQL, Oracle, Microsoft SQL Server 총 여섯가지의 DB를 지원한다.

RDS의 장단점: 

> ### 장점
>
> - AWS가 업데이트 등을 관리해주기 때문에 따로 관리하지 않아도 된다. (managed service)
> - 간단하게 DB를 생성할 수 있다.
> -  소프트웨어를 수정하지 않아도 쉽게 데이터를 이전할 수 있다.
> - EC2와 연동하기 쉽고 같은 네트워크 내에 있다면 통신료도 무료다.
>
> ### 단점
>
> - 사용자가 자유롭게 사용할 수 없다. 제공하고 있는 DBMS의 종류나 버전이 한정되어 있으며, 서버에 접속할 수 없다. (AWS측에 SR을 올려야 함.)
> - 비싸다. RDS와 EC2의 비슷한 스토리지를 비교할 경우, RDS가 EC2보다 약 40~68% 정도 비싸다고 한다. ([출처: [AWS] RDS MySQL 장단점](https://m.blog.naver.com/sory1008/220950167041))

 Amazon RDS는  관계형 데이터베이스 관리 작업을 대다수 대신하는데 주요 기능은 아래와 같다:

- 서버를 구입하면 CPU, 메모리, 스토리지 및 IOPS가 모두 한데 묶여 제공되지만, Amazon RDS를 사용하면 이 모두가 따로 분할되므로 독립적으로 확장할 수 있다. ( CPU가 더 많이 필요하거나 스토리지가 덜 필요할 경우 쉽게 할당할 수 있음)
- 백업, 소프트웨어 패치, 자동 장애 감지 및 복구를 관리한다.
- DB 인스턴스에 대해 shell 액세스를 제공하지 않으며, 또한 고급 권한이 필요한 특정 시스템 절차와 테이블에 대한 액세스를 제한한다.
- 필요할 때 자동화된 백업을 수행하거나 고유한 백업 스냅샷을 수동으로 만들 수 있다. (DB 복원 가능)
- 자주 사용하는 MySQL, MariaDB, PostgreSQL, Oracle 및 Microsoft SQL Server 같은 데이터베이스 제품을 사용할 수 있다.
- 기본 인스턴스 및 문제 발생 시 장애 조치를 수행할 수 있는 동기식 보조 인스턴스에서 가용성을 높일 수 있다.
- AWS Identity and Access Management(IAM)을 사용해 사용자 및 권한을 정의하는 방법으로 RDS 데이터베이스에 액세스할 수 있는 사용자를 제어할 수 있다.
-  데이터베이스를 가상 사설 클라우드에 넣어 데이터베이스를 보호할 수도 있다.

<hr>

### 3. [S3 (Simple Storage Service)](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html)

![s3 이미지](https://user-images.githubusercontent.com/72732446/140358232-caa4bb2e-501c-410f-a203-2038bccd0894.png)

Amazon Simple Storage Service(Amazon S3)는 **클라우드 스토리지 서비스**이다. 객체 스토리지 서비스라고도 하는데, 여기서 '객체'는 이미지, 백업, 데이터, 동영상 등 모든 유형의 파일을 일컫는다.

Amazon S3를 사용하여 데이터 레이크, 웹 사이트, 모바일 애플리케이션, 백업 및 복원, 아카이브, 엔터프라이즈 애플리케이션, IoT 디바이스, 빅 데이터 분석 등 다양한 사용 사례에서 원하는 양의 데이터를 저장하고 보호할 수 있다.

Amazon S3는 데이터를 버킷 내의 객체로 저장하는 객체 스토리지 서비스이다.

> - **객체**: 해당 파일을 설명하는 모든 메타데이터
> - **버킷**: 객체에 대한 컨테이너

- **작동 방식**: Amazon S3에 데이터를 저장하려면 먼저 버킷을 생성하고, 버킷 이름 및 AWS 리전을 지정해야 한다. 세팅을 마치고, Amazon S3에서 객체로 해당 버킷에 데이터를 업로드할 수 있다. 각 객체에는 *키*(또는 *키 이름*)가 있으며, 이는 버킷 내 객체에 대한 고유한 식별자이다.

- **버전 관리**: S3는 동일 버킷 내에 여러 개의 객체 변형을 보유 할 수 있는 기능을 제공한다.  예를 들어, S3 버전 관리를 사용하여 동일한 버킷에 여러 버전의 객체를 보관하고, 실수로 삭제되거나 덮어쓰기된 객체를 복원할 수 있다.

- **권한 관리**: 버킷과 버킷의 객체는 기본적으로 private이며, 액세스 권한을 명시적으로 부여한 경우에만 액세스할 수 있다. 버킷 정책, AWS Identity and Access Management(IAM) 정책, 액세스 제어 목록(ACL), S3 액세스 포인트를 사용하여 액세스를 관리할 수 있다.

<hr>

### 4. [Amplify](https://aws.amazon.com/ko/amplify/faqs/) 

![amplify img](https://user-images.githubusercontent.com/72732446/140615980-f85de773-7b26-4c6c-ad58-74934a678f94.png)



Amplify는 **모바일 앱이나 웹서비스**를 쉽게 구축할 수 있도록 도와주는 **AWS 솔루션**이다. 구체적으로, 모바일 및 웹 애플리케이션 개발을 가속화하기 위한 도구 세트(오픈 소스 프레임워크, 관리 UI, 콘솔) 및 서비스(정적 웹 호스팅)로 구성되어 있다.

**그렇다면 왜 Amplify 서비스를 만든걸까?** 
AWS에는 수백가지의 서비스들이 있는데, 모든 서비스를 배워서 적용하기에는 매우 어렵다. AWS는 이런 문제를 해결하기 위해 Amplify 를 만들었다. 개발자들은 Amplify CLI를 사용해 프론트엔드 환경에서도 직접 클라우드 서비스를 생성, 수정, 삭제, 설정할 수 있다.

Amplify 프레임워크는 풀스택 iOS, 안드로이드, 플러터, 웹 및 리액트 네이티브 앱을 구축을 위한 다양한 도구를 제공한다:

- **Amplify CLI**: 간단한 명령줄 인터페이스를 통해 백엔드를 구축하는데 필요한 모든 서비스를 구성한다.

- **Amplify 라이브러리**: 인증, 데이터 저장 및 액세스, 기계 학습 예측과 같은 사용 사례 중심의 기본 라이브러리를 제공한다.
- **Amplify UI 컴포넌트**: React, React Native, Angular, Ionic, Vue를 위한 UI 컴포넌트를 제공한다.

- **Amplify Console**: 풀스택 웹 앱의 지속적인 배포 및 호스팅을 위한 Git 기반 워크플로우를 제공하는 AWS 서비스이다. Amplify CLI에서 생성된 클라우드 리소스는 Amplify 콘솔에서도 볼 수 있다.

**Amplify 사용법:**

iam 계정 생성, awscl 및 amplify-cli 을 설치 후, 프론트엔드 프로젝트를 생성해야 한다.  프론트엔트 프로젝트에서 amplify init 커멘드로 amplify를 세팅한다. 그리고 아래 amplify 커맨드 처럼 인증, API, 스토리지, 호스팅 등의 서비스를 추가하며 원하는 aws 서비스를 추가할 수 있다.

```jsx
amplify init
amplify add auth
amplify add api
amplify add storage
amplify add hosting
```



개인적으로, Amplify의 개념을 이해하는데 시간이 오래 걸렸다. 직접 앱을 만들어서 amplify 실습을 하면서 개념을 이해하는 것을 추천한다. [Amplify 실습 링크](https://docs.amplify.aws/start/getting-started/auth/q/integration/react/#create-authentication-service)

<hr>

### 5. [IAM (Identity and Access Management)](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/introduction.html)

![Iam img](https://user-images.githubusercontent.com/72732446/140616861-07b06de0-d6dd-491e-9aad-1cdb06d6ac11.png)



IAM은 AWS **사용자들의 속성 / 권한을 설정**할 수 있는 서비스이다.  AWS 리소스에 대한 액세스를 안전하게 제어할 수 있으며, IAM을 사용하여 리소스를 사용하도록 인증하거나 권한 대상을 제어할 수 있다.

AWS 계정을 처음 생성하는 경우에는 전체 AWS 서비스 및 계정 리소스에 모든 액세스 권한을 지닌 *루트 사용자* 계정이 생성된다.  (계정을 생성할 때 사용한 이메일 주소와 암호로 로그인하여 액세스). 보안상 루트 계정은 처음에 IAM 사용자 생성에만 사용하고, 나머지 작업은 **IAM 계정**을 통해 작업하는 것을 추천한다고 한다. IAM은 아래와 같은 기능을 제공한다:

- **AWS 계정에 대한 공유 액세스** : 암호나 액세스 키를 공유하지 않고도 AWS 계정의 리소스를 관리하고 사용할 수 있는 권한을 다른 사람에게 부여할 수 있다.
- **세분화된 권한**: 리소스에 따라 여러 사람에게 다양한 권한을 부여할 수 있다. 예를 들어 일부 사용자에게는 모든 AWS 서비스에 대한 전체 액세스 권한을 허용하고 다른 사용자에게는 일부 S3 버킷에 대한 읽기 전용 권한, 일부 EC2 인스턴스를 관리할 수 있는 권한 또는 결제 정보에만 액세스할 수 있는 권한을 허용할 수 있다.
- **멀티 팩터 인증(MFA)**: 보안 강화를 위해 계정과 개별 사용자에게 2팩터 인증을 추가할 수 있다.
- **타 AWS 서비스와의 통합**: 다른 AWS 서비스들과 함께 사용할 수 있다. [IAM으로 작업하는 서비스 참고](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html)

<hr>

### 6. Lambda

![lambda img](https://user-images.githubusercontent.com/72732446/140617324-864822e0-758e-4cac-97ef-a91a9ee590bd.png)

AWS Lambda는 **Serverless(서버리스) 컴퓨팅 서비스**이다. 서버리스 컴퓨팅이란 애플리케이션을 실행하기 위한 별도의 서버 셋업 없이 곧바로 코드를 실행해주는 서비스를 의미하며, 고정 비용 없이 사용 시간에 대해서만 비용이 발생한다.

> **서버리스?**
>
> 서버리스는 언뜻 단어로만 보면 'Server + Less'로 '서버가 필요 없다'는 뜻으로 생각될 수 있습니다. 하지만 실제 의미는 **클라우드 서비스 공급자**가 서버를 관리, 실행하며, **요청이나 특정 이벤트**가 있을 때 클라우드의 서버를 이용하거나 서비스 할 어플리케이션을 동작시키는 것입니다. 이를 통해 사용자(개발자)는 서버 관리에서 완전히 자유로워지며 실제 구현해야 할 기능에 더 집중할 수 있게 됩니다. (출처: [클라우드 패러다임의 전환: 서버리스 컴퓨팅](https://www.samsungsds.com/kr/insights/1232763_4627.html))

Lambda는 필요 시에만 함수를 실행하며, 일일 몇 개의 요청에서 초당 수천 개의 요청까지 자동으로 확장이 가능하다. 사용한 컴퓨팅 시간만큼만 비용을 지불하고, 코드가 실행되지 않을 때는 요금이 부과되지 않는다.

예를 들어, S3를 사용하는 웹 서비스에서 이미지 업로드시 자동으로 이미지 resize를 하고 싶다고 하자. 우선, javascript로 ImageResize 함수를 작성해 AWS Lambda로 푸시한다. 이후, Lambda를 통해 따로 백엔드를 조작하지 않아도 S3에 이미지를 업로드 하기만 하면 (이벤트 실행) ImageResize 함수를 호출해 이미지를 자동으로 리사이징 한다. 즉, 이벤트가 있을 때 마다 자동으로 함수를 실행시키고, 실행된 시간에 한에서만 비용을 지불하면 된다. 

Lambda API를 사용하여 Lambda 함수를 호출하거나, Lambda가 다른 AWS 서비스의 이벤트에 응답하여 함수를 실행할 수 있다. 예를 들어, Lambda를 사용하여 다음을 수행할 수 있다.

- Amazon Simple Storage Service(Amazon S3) 및 Amazon DynamoDB와 같은 AWS 서비스를 위한 데이터 처리 트리거를 빌드
- Amazon Kinesis에 저장된 스트리밍 데이터를 처리
- AWS 규모, 성능 및 보안으로 작동하는 고유한 백엔드를 구축

<hr>

### 7. [Route 53](https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/Welcome.html)

![router 53 image](https://user-images.githubusercontent.com/72732446/140617948-4c1701ef-8ba4-4331-8504-1db9354deb68.png)



Route 53은 AWS에서 제공하는 **DNS 관리 시스템**이다. DNS란 Domain Name System으로 우리가 흔히 말하는 '도메인'을 관리하고 설정하는 서비스이다. Route 53으로 세 가지 주요 기능 '도메인 등록, DNS 라우팅, 리소스 상태 확인'을 할 수 있다:

* **도메인 이름 등록**: 웹 사이트의 이름(예: example.com)이 필요할 때, Route 53을 통해 웹사이트 또는 웹 애플리케이션의 이름, 즉 *도메인 이름*을 등록할 수 있다.

- **인터넷 트래픽을 도메인의 리소스로 라우팅**: 사용자가 웹 브라우저를 열어 주소 표시줄에 도메인 이름(example.com) 또는 하위 도메인 이름(acme.example.com)을 입력한 경우 Route 53은 브라우저를 웹 사이트 또는 웹 애플리케이션에 연결하도록 돕는다.

- **리소스의 상태 확인**: Route 53은 인터넷을 통해 웹 서버 같은 리소스로 자동화된 요청을 보내어 접근 및 사용이 가능하고 정상 작동 중인지 확인한다. 리소스를 사용할 수 없게 될 때 알림을 수신하고 비정상 리소스가 아닌 다른 곳으로 인터넷 트래픽을 라우팅할 수도 있다.

<hr>

### 8. [CloudFront](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

![cloudfront img](https://user-images.githubusercontent.com/72732446/140618211-095b6dd4-a00c-4977-bc00-b08c49478c35.png)

CloudFront는 .html, .css, .js 및 이미지 파일과 같은 정적 및 동적 웹 콘텐츠를 사용자에게 더 빨리 배포하도록 지원하는 웹 서비스이다. 쉽게 말해, Cloudfront는 **aws의 CDN 서비스**이다.

> CDN (Contents Delivery Network) 이란?
>
> 콘텐츠 전송 네트워크는 콘텐츠를 효율적으로 전달하기 위해 여러 노드를 가진 네트워크에 데이터를 저장하여 제공하는 시스템을 말한다. 인터넷 서비스 제공자에 직접 연결되어 데이터를 전송하므로, 콘텐츠 병목을 피할 수 있는 장점이 있다. ([출처: 위키](https://ko.wikipedia.org/wiki/%EC%BD%98%ED%85%90%EC%B8%A0_%EC%A0%84%EC%86%A1_%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC))

그렇다면 CloudFront는 어떻게 콘텐츠를 사용자에게 더 빨리 전달할 수 있을까?

CloudFront는 **엣지 로케이션**이라고 하는 데이터센터의 전 세계 네트워크를 통해 콘텐츠를 제공한다. 사용자가 콘텐츠를  요청하면 지연 시간이 가장 낮은 엣지 로케이션으로 요청이 라우팅되어 가능한 최고의 성능으로 콘텐츠가 제공된다.

- 해당 콘텐츠가 이미 지연 시간이 가장 낮은 엣지 로케이션에 있는 경우, CloudFront가 콘텐츠를 즉시 제공한다.
- 해당 콘텐츠가 엣지 로케이션에 없는 경우, CloudFront는 콘텐츠의 최종 버전에 대한 소스로 지정된 오리진(Amazon S3 버킷, MediaPackage 채널, HTTP 서버(예: 웹 서버) 등)에서 콘텐츠를 검색한다.

<hr>

### 9. [Cognito](https://docs.aws.amazon.com/ko_kr/cognito/latest/developerguide/what-is-amazon-cognito.html)

![cognito img](https://user-images.githubusercontent.com/72732446/140618460-aee3b9d6-0ad0-4caf-8a67-2e5e651b1e1a.png)

Amazon Cognito는 웹 및 모바일 앱에 대한 **인증, 권한 부여 및 사용자 관리**를 제공하는 서비스이다. 쉽게 말해 AWS에서 제공하는 사용자 관리 서비스이다.

Cognito를 사용하면 사용자는 사용자 이름과 암호를 사용하여 직접 로그인하거나, Facebook, Amazon, Google 또는 Apple 같은 타사를 통해 로그인할 수도 있다. Amazon Cognito의 두 가지 주요 구성 요소는 사용자 풀과 자격 증명 풀이다.

>- **사용자 풀 (User Pool)**: 앱 사용자의 가입 및 로그인 옵션을 제공하는 사용자 디렉터리
- **자격 증명 풀 (Identity Pool)**: 사용자에게 기타 AWS 서비스에 액세스할 수 있는 권한을 부여할 수 있는 서비스

Cognito를 사용하면 jwt, refresh token 등의 인증 처리 및 보안 관리를 자동으로 해 프론트 / 백에서 구현해야 하는 코드가 줄어든다. 또한, 다양한 AWS 서비스를 손쉽게 연동하고 권한 및 접근 관리를 할 수 있다.

 일반적으로,  Cognito 시나리오는 아래와 같다. (Cognito로 사용자 인증 이후 다른 AWS 서비스에 대한 사용자 액세스 권한을 부여받는 상황.)

1.  앱 사용자는 사용자 풀을 통해 로그인하여 인증 성공 이후 사용자 풀 토큰을 받는다.
2.  앱은 자격 증명 풀을 통해 사용자 풀 토큰을 AWS 자격 증명으로 교환한다.
3. 마지막으로 앱 사용자는 AWS 자격 증명을 사용하여 Amazon S3, DynamoDB 등 다른 AWS 서비스에 액세스할 수 있다.

![cognito img](https://docs.aws.amazon.com/ko_kr/cognito/latest/developerguide/images/scenario-cup-cib2.png)

<hr>

### 10. [CodeCommit](https://docs.aws.amazon.com/ko_kr/codecommit/latest/userguide/welcome.html)

![codecommit img](https://user-images.githubusercontent.com/72732446/140634911-041ddcf3-a0e1-42e4-8b0f-836d6aee9b25.png)

CodeCommit은 AWS에서 제공하는 GitHub와 유사한 **코드 저장소 및 형상 관리 서비스**이다. Codecommit은 프라이빗 Git 리포지토리를 호스팅하는 안전한 소스 관리형 서비스이다. Git의 표준 기능을 지원하므로 기존 Git 기반 도구와도 원활하게 연동된다. 특히, AWS에서 호스팅하는 서비스이므로,  다른 AWS 서비스와 연동하는 것이 굉장히 편리하다.

> 보통 CodeCommit은 단순히 저장소 용도로만 쓰이지 않고 다른 AWS 서비스들과 Pipeline을 이루어 CI/CD 환경 구축의 첫 저장소 역할을 위해 사용된다. notification이나 trigger를 설정하여 CloudWatch에 Log를 남기거나 Lambda function을 활용하여 다른 target을 설정할 수 있는데, 리포지토리에 변경사항이 생기면 자동으로 CodeBuild를 트리거할 수 있도록 하여 자동 빌드 환경을 구축할 수도 있다.
>
>  (출처: [[AWS] 완전관리형 저장소 CodeCommit](https://jbhs7014.tistory.com/151))

CodeCommit에서도, GitHub과 유사하게, git 명령어를 모두 사용할 수 있다. (참고로, git은 github의 명령어가 아니다. 'git'은 코드 및 파일의 버전을 관리하는 '오픈소스 분산 버전 관리 시스템'이며, 'GitHub'는 git 레포지토리를 관리하는 호스팅 서비스이다. ) 즉, 우리가 흔히 사용하는 `git clone`, `git add`, `git commit`, `git push`, `git pull` 등 과같은 git 명령어를 CodeCommit에서도 사용 가능하다.

그렇다면 CodeCommit은 어떻게 작동할까?

작동 원리 역시 Github과 비슷하다:

![codecommit how it works](https://docs.aws.amazon.com/ko_kr/codecommit/latest/userguide/images/arc-workflow.png)

1. 우선 AWS CLI또는 CodeCommit 콘솔을 사용하여 CodeCommit 저장소를 만든다.
2. 로컬에서  `git clone` 명령어를 사용하여 CodeCommit 리포지토리의 이름을 특정한다. 그러면 CodeCommit 리포지토리에 연결된 로컬 리포지토리가 생성된다.
3. CodeCommit 레포지토리까지 연결이 되었다면, Github에서 하는것과 같이 작업하면 된다. 로컬에서 파일을 수정 (추가, 편집, 삭제) 한 다음 `git add` 로 수정된 파일을 로컬로 스테이징 한다. `git commit` 명령어로 변경된 파일을 로컬로 커밋한 다음 `git push`를 실행해 CodeCommit 리포지토리로 파일을 전송한다.
4. `git pull` 명령어로 CodeCommit 리포지토리의 최신 파일을 로컬 리포지토리로 동기화 (다운로드) 할 수 있다.

AWS CLI 또는 CodeCommit 콘솔을 사용하여 리포지토리를 추적 및 관리할 수 있다. 더 자세한 내용은 [CodeCommit 자습서](https://docs.aws.amazon.com/ko_kr/codecommit/latest/userguide/getting-started-cc.html) 를 참고해 실습을 해보자.

<hr>

### 11. [AWS CDK (Cloud Development Kit)](https://aws.amazon.com/ko/cdk/features/)

![aws cdk img](https://user-images.githubusercontent.com/72732446/140634944-b4852606-ddd6-49fa-a63f-43975280d4e9.png)

AWS CDK (Cloud Development Kit)는 원하는 프로그래밍 언어를 사용하여 Cloud Infra를 code로 정의하고, `AWS CloudFormation` 을 통해 배포하는  **오픈 소스 소프트웨어 개발 프레임워크**이다.

AWS CDK는 아래 사진과 같이 앱, 스택, 구문(Construct)으로 구성 되어있다. 그리고 App, Stack, Construct로 구성된 CDK Application은 AWS CloudFormation을 통해 리소스가 생성된다.

![aws cdk](https://docs.aws.amazon.com/ko_kr/cdk/latest/guide/images/AppStacks.png)



> ### App
> 앱은 기본 구문이며, CDK CLI를 통해 AWS CloudFormation 템플릿을 렌더링하고 배포한다. 그리고 배포 가능한 단위인 하나 이상의 스택으로 구성되며 리전 및 계정에 대한 정보를 포함한다.
>
> ### Stack
> 스택에는 AWS 람다, AWS ECS와 같이 AWS 리소스를 표현하는 구문이 포함된다.
>
> ### Construct(구문)
> 구문은 계층 구조를 가지며, AWS에서 구문은 3가지 레벨로 표현한다: **AWS CloudFormation 리소스**, **AWS 구문 라이브러리**, 그리고 **나만의 AWS Construct(로직)**
>
> **출처: [AWS CDK 란?](https://cherrypick.co.kr/about-aws-cdk/)**



**AWS CDK CLI로 무엇을 할 수 있을까?**
AWS CDK CLI를 사용하여 CDK 애플리케이션과 상호 작용할 수 있다. 

- CDK CLI를 사용하면 CDK 앱에 정의된 스택을 나열할 수 있다.
- 스택을 CloudFormation 템플릿에 합성할 수 있으며, 실행 중인 스택 인스턴스와 CDK 코드에 정의된 스택 간의 차이점을 확인할 수 있다.
- 또한, 원하는 퍼블릭 AWS 리전에 스택을 배포할 수 있다.

**AWS CDK는 어떻게 작동할까?**

- AWS CDK 프레임워크를 사용하여 AWS CDK 프로젝트를 작성할 수 있으며, 이 프로젝트가 실행되면 **CloudFormation** 템플릿이 생성된다. 
- AWS CDK 프로젝트는 AWS CDK CLI나 CD system에서 실행될 수 있다.

**AWS CDK CLI 예시:**

- `cdk init` : 사용자가 선택한 언어로 새로운 기본 애플리케이션을 초기화한다.
- `cdk synth` : AWS CDK 애플리케이션을 AWS CloudFormation 템플릿으로 컴파일한다.
- `cdk diff` : 로컬 AWS CDK 코드와 AWS에서 실행되는 애플리케이션 간 "차이점"을 확인한다.
- `cdk deploy`: AWS CloudFormation을 통해 테스트 또는 프로덕션에 AWS CDK 애플리케이션을 배포한다.



AWS CDK 역시 이론만 배우면 이해가 잘 안됐었는데,  [AWS cdk workshop](https://cdkworkshop.com/) (혹은 번역해놓은 글 '[AWS CDK Workshop](https://chloe-codes1.gitbook.io/til/aws/aws_tips/aws_cdk_workshop)')에서 사용 방법을 보면서 배우는 것을 추천한다.

<hr>

### 12. [Cloudformation](https://docs.aws.amazon.com/ko_kr/AWSCloudFormation/latest/UserGuide/Welcome.html)

![cloudformation img](https://user-images.githubusercontent.com/72732446/140634928-e732c72c-3750-4762-8fb9-7baa4ec6c488.png)

AWS CloudFormation은 템플릿 파일로 **AWS 리소스 설정을 자동화해주는 서비스**이다. 리소스 관리 시간을 줄이고 AWS에서 실행되는 애플리케이션에 더 많은 시간을 사용하도록해준다.

특히, AWS CloudFormation은  AWS에서 실행되는 거의 모든 서비스의 IaaS(Infrastructure as a Service) 설정 및 구축을 자동화할 수 있기 때문에 **인프라 자동화 또는 IaC(Infrastructure as Code) 툴**이라고 할 수 있다.  예를 들어, CloudFormation을 사용하여 EC2 컴퓨팅 서비스, S3 스토리지 서비스 및 IAM 서비스와 같은 다양한 AWS 서비스의 구성 (설정)을 자동화할 수 있다.

**CloudFormation의 장점은?**

AWS 리소스(ex. Amazon EC2 인스턴스 또는 Amazon RDS DB 인스턴스)를 설명하는 템플릿을 생성하면 AWS CloudFormation이 해당 리소스의 프로비저닝과 구성을 담당한다.  AWS CloudFormation에서 모든 것을 자동으로 처리하기 때문에 AWS 리소스를 개별적으로 생성하고 구성할 필요가 없으며 어떤 것이 무엇에 의존하는지 파악할 필요도 없다.  AWS CloudFormation의 장점은 아래와 같다:

- 인프라 관리 최소화

- 신속한 인프라 복제

- 인프라 변경사항 추적 및 제어

  

물론 AWS에는 CloudFormation 외에도 AWS 서비스를 설정하고 배포하는 다양한 툴이 있다. 예시로, AWS cli, API 또는 웹 콘솔을 사용하여 이러한 프로세스를 수동으로 처리할 수 있다. 서비스 초기에는 수동으로 프로비저닝을 해도 큰 무리가 없기 때문이다. 하지만 서비스 환경이 점점 커지면, 서비스 배포 프로세스를 더욱 빠르고 일관성 있게 해야하기 때문에 CloudFormation을 사용하는 고객들이 많아진다고 한다.



<hr>

### 참고

>  - [Amazon Web Service 공식 사이트](https://aws.amazon.com/ko/) 
>  - [개발자들에게 도움이 될 만한 9가지 기본 아마존 웹서버 (Amazon Web Service, AWS) 서비스](https://velog.io/@openhub/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%97%90%EA%B2%8C-%EB%8F%84%EC%9B%80%EC%9D%B4-%EB%90%A0-%EB%A7%8C%ED%95%9C-9%EA%B0%80%EC%A7%80-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%A7%88%EC%A1%B4-%EC%9B%B9%EC%84%9C%EB%B2%84-Amazon-Web-Service-AWS-%EC%84%9C%EB%B9%84%EC%8A%A4)
>  - [[AWS] RDS MySQL 장단점](https://m.blog.naver.com/sory1008/220950167041)
>  - [AWS 람다(AWS Lambda)란?](https://www.44bits.io/ko/keyword/aws-lambda)
>  -  [클라우드 패러다임의 전환: 서버리스 컴퓨팅](https://www.samsungsds.com/kr/insights/1232763_4627.html)
>  - [[AWS] 완전관리형 저장소 CodeCommit](https://jbhs7014.tistory.com/151)
>  - [AWS CDK Workshop](https://chloe-codes1.gitbook.io/til/aws/aws_tips/aws_cdk_workshop)
>  - [AWS CDK 란?](https://cherrypick.co.kr/about-aws-cdk/)
>  - [What is AWS Cloudformation?](https://www.contino.io/insights/aws-cloudformation)