---
title: '[swift] 앱 추적 권한 띄우기'
date: '2021-09-06T23:19:32.169Z'
description: ios 앱 추적 권한 알림창 띄우기
category: 'Native'
image: 'https://user-images.githubusercontent.com/72732446/120110742-c0032f00-c1a9-11eb-98fa-8c02e867c291.png'
---

### ios 앱 추적 권한

ios 14 부터 개인정보 수집에 개인정보 '추적'을 선택할 경우 앱 추적 권한 알림을 필수로 구현해야 합니다. (앱 추적 권한 알림 뜨지 않으면 앱스토에서 리젝됨)

<img width="100" alt="스크린샷 2021-05-31 오전 12 46 31"  style="width: 50% !important" src="https://user-images.githubusercontent.com/72732446/120110742-c0032f00-c1a9-11eb-98fa-8c02e867c291.png">

다음과 같은 앱 추적 권한 알림을 띄워서 사용자 동의를 받아야 합니다.
<br />
<br />

<img width="200" alt="앱추적권한" style="width: 50% !important" src="https://support.apple.com/library/content/dam/edam/applecare/images/ko_KR/iOS/ios14-iphone12-pro-allow-app-to-track-activity-prompt.jpg
">

> iOS 14.5, iPadOS 14.5 및 tvOS 14.5 버전에서는 앱이 다른 회사의 앱 및 웹 사이트에서 사용자의 활동을 추적하려면 반드시 추적 권한을 요청해야 합니다. 앱에서 사용자 또는 사용자의 기기를 식별할 수 있는 정보를 수집하고, 해당 수집된 정보를 타깃 광고나 광고 측정의 목적으로 타사가 소유한 앱, 웹 사이트 및 기타 위치에서 수집된 사용자 또는 사용자의 기기를 식별할 수 있는 정보와 연결하거나 수집된 정보를 데이터 브로커와 공유할 경우 추적이 발생합니다.

> '앱에 추적 금지 요청'을 선택할 경우 해당 앱의 개발자는 개인 정보 추적에 종종 활용되는 IDFA(시스템 광고 식별자)에 접근할 수 없습니다. 또한 앱에서 사용자 또는 사용자의 기기를 식별하는 이메일 주소 같은 기타 정보를 사용하여 사용자의 활동을 추적하는 것도 허용되지 않습니다.

- 공식 페이지: https://support.apple.com/ko-kr/HT212025

### Swift 프로젝트에서 앱 추적 권한 알림 띄우기

xcode에서 아래와 같이 수정 해야합니다.

#### 1. Info.plist 에 app transpot security setting 설정

App Transport Security Setting 추가해 주시고, 햐단에 Allow Arbitrary Loads, Allow Arbitrary Loads in Web Content에 'YES' 값 설정해줍니다.

   <img width="500" alt="스크린샷 2021-05-31 오전 12 39 08" src="https://user-images.githubusercontent.com/72732446/120110479-a1506880-c1a8-11eb-8c52-e380a647ef08.png">
   
<br>

#### 2. 앱 추적 권한 알림 띄우는 requestPermission() 함수 작성

viewController.swift에 해당 코드를 작성해주세요

```swift
import AppTrackingTransparency
import  AdSupport

// 앱 추적 권한 알림 띄우기

     func requestPermission() {
         if #available(iOS 14, *) {
             ATTrackingManager.requestTrackingAuthorization { status in
                 switch status {
                 case .authorized:
                     // Tracking authorization dialog was shown
                     // and we are authorized
                     print("Authorized")

                     // Now that we are authorized we can get the IDFA
                     print(ASIdentifierManager.shared().advertisingIdentifier)
                 case .denied:
                     // Tracking authorization dialog was
                     // shown and permission is denied
                     print("Denied")
                 case .notDetermined:
                     // Tracking authorization dialog has not been shown
                     print("Not Determined")
                 case .restricted:
                     print("Restricted")
                 @unknown default:
                     print("Unknown")
                 }
             }
         }
     }
```

- **Status: Authorized**
  ASIdentifierManager로 IDFA(시스템 광고 식별자)를 가져올 수 있습니다.

- **Status: Denied**
  사용자를 설정(settings) 페이지로 보냅니다.

- **Status: Not Determined**
  사용자가 아직 권한을 설정하지 않았다면, 권한 알림을 보여줍니다.

<br>

#### 3. 앱 실행시 requestPermission() 호출

앱 실행시 앱 추적 권한 알림을 띄워주기 위해 위에 적은 함수를 호출해줍니다.

```swift
class ViewController: ... {
	// 기존코드 .....
	// app tracking transparency alert 호출
    	requestPermission()
}
```

<br>

- 참고 링크: https://nishbhasin.medium.com/how-to-get-idfa-in-ios14-54f7ea02aa42
