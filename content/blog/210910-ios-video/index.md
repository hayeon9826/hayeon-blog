---
title: 'ios 앱 온보딩 영상 재생'
date: '2021-09-10T22:40:32.169Z'
description: ios 앱 온보딩 영상 재생 기능 구현 과정 기록
category: 'Native'
image: 'https://velog.velcdn.com/images/khy226/post/3077d295-1767-4b54-b541-82bc60e268eb/swift.jpeg'
---

<img src="https://velog.velcdn.com/images/khy226/post/3077d295-1767-4b54-b541-82bc60e268eb/swift.jpeg" style="width: 40%; margin: 0 auto; padding-bottom: 100px;">

앱을 처음 켰을 때, 앱 소개 영상을 틀어주는 기능을 구현했던 기능 정리

- AVFoundation(멀티미디어 프레임워크) AVKit(미디어 인터페이스 프레임워크) 사용
- AVFoundation, AVKit 설명 참고: https://baked-corn.tistory.com/118

> **AVFoundation**은 **애플의 미디어 프레임워크**로 iOS, tvOS, macOS에서 사용됩니다. 이 프레임워크는 여러 미디어 처리 작업(편집, 미디어 캡쳐 등등)을 제공하는데 그중에서도 많이 사용되는 곳이 바로 Playback입니다. AVFoundation을 사용한다면 영상이나 MP3 오디오 파일, 심지어는 HTTP Live Streaming을 통해 제공되는 원격 서버에 위치한 미디어 파일들까지 효과적으로 가져오고 제어할 수 있습니다.

> **AVKit**은 AVFoundation의 짝과 같은 존재로 AVFoundation위에 존재합니다. AVKit을 사용하면 **미디어 플레이어 Interface**를 쉽게 구성할 수 있습니다. AVKit은 AVFoundation으로부터 받은 정보로 현재 재생되고 있는 컨텐츠에 대한 최적의 Interface를 제공합니다.

<Br><br>

### 0. 비디오를 xcode플젝에 추가

1. 비디오를 xode 플젝에 드래그 앤 드롭으로 추가

2. 프로젝트를 누르고 > `webapp > Build Phases > Copy Bundle Resources` 눌러서 해당 비디오 파일을 추가해준다.

- 참고: https://stackoverflow.com/questions/25348877/how-to-play-a-local-video-with-swift

<br><Br>

### 1. 앱이 처음 실행되었는지 체크

- 참고: https://betterprogramming.pub/checking-for-the-users-first-launch-in-swift-df02a1feb472

```swift
import UIKit
...

class ViewController: UIViewController {
  ...
  // UserDefaults는 대체로 앱의 설정 값을 저장하고 나중에 읽기 위한 용도로 사용 된다고 한다.
  // UserDefaults 는 Key - Value 스타일인데, 여기에 파일에 기록하고 나중에 불러올 수 있는 기능까지 제공함
  let defaults = UserDefaults.standard

   override func viewDidAppear(_ animated: Bool) {
        if defaults.bool(forKey: "Second Launch") == true {
          // #1. 두번째 이상 켰을 때. userDefault에 첫번째 방문했다고 기록하기
          defaults.set(true, forKey: "Second Launch")
        } else {
          // 처음 들어왔을 때
          // #2. 비디오 플레이하는 코드 작성

        }
  }
}
```

- 위 코드 처럼 userDefaults를 활용해서 앱이 처음 로드 되었는지 (Second Launch) 키를 이용해서 앱 실행시 조건을 나눔.
- #1번의 경우, userDefault에 'Second Launch'라는 키가 있으면 원래대로 webView를 로드하도록 하였고, 만약 해당 키가 없을 경우 (처음 들어온 경우), 비디오를 출력하도록 구현함

<Br><Br>

### 2. NotificationCenter 이용해서 비디오 플레이

비디오 출력 기능은 NotificationCenter를 이용해서 구현함. #2번 상황과 같이 처음 앱을 켰을 때, videoStart 라는 notification을 발송하고 해당 videoStart(옵저버) 일을 수행하라고 시킴

```swift
...
override func viewDidLoad() {
    super.viewDidLoad()
    if defaults.bool(forKey: "Second Launch") == true {
      // #1. 두번째 이상 켰을 때. userDefault에 첫번째 방문했다고 기록하기
      defaults.set(true, forKey: "Second Launch")
    } else {
      // 처음 들어왔을 때
      // #2. 비디오 플레이하는 코드 작성
      if #available(iOS 11.0, *) {
        // 노티피케이션 발송
        NotificationCenter.default.post(name: NSNotification.Name("videoStart"), object: nil, userInfo: nil)
      }
    }
  }

```

- NotificationCenter 설명글 참고: https://silver-g-0114.tistory.com/106

- 비디오 출력 / 종료 시 옵저버 등록
- 위에서 videoStart노티를 발송하면 아래 코드가 실행되며 비디오가 재생

  <br>

```swift
import AVKit
import AVFoundation
...

// 비디오 재생 옵저버
NotificationCenter.default.addObserver(forName:  NSNotification.Name("videoStart"), object: nil, queue: nil) { [weak self] n in
     // 비디오 이름과 확장자를 넣는다.
     guard let path = Bundle.main.path(forResource: "ios_video", ofType:"mp4") else {
         debugPrint("video.m4v not found")
         return
     }
     if #available(iOS 11.0, *){
       // AVPlayer를 불러와서 비디오 url 설정해주고
        let player = AVPlayer(url: URL(fileURLWithPath: path))
           self!.playerController.player = player
           self!.playerController.videoGravity = "AVLayerVideoGravityResizeAspectFill";
       		// 풀스크린으로 비디오 재생 & 종료
           self!.playerController.entersFullScreenWhenPlaybackBegins = true
           self!.playerController.exitsFullScreenWhenPlaybackEnds = true
       		// 비디오 재생 시 설정 컨트롤러 안보이게.
           self!.playerController.showsPlaybackControls = false
       		// 비디오 소리 나오도록 설정
           try! AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback, with: [])
           	self!.present(self!.playerController, animated: true) {
            // 비디오 재생
            player.play()
       }
     }
}
```

- 그리고 비디오가 종료되었을 때는 아래 코드가 실행

```swift
NotificationCenter.default.addObserver(forName: .AVPlayerItemDidPlayToEndTime, object: nil, queue: nil) { [weak self] n in
            // 1번의 userDefault에 앱 실행되었다는 정보 저장. (비디오 한번만 플레이 하도록)
            defaults.set(true, forKey: "Second Launch")

            // 비디오 끝나고 2초후 종료되게 설정 (위 weburl링크 로드되는 시간고려)
            DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
              	// 플레이어 멈추기
                self?.playerController.player?.pause()
                self?.playerController.player  = nil
              	//  animated: true주면 비디오가 밑으로 내려가는 애니메이션 추가됨
                self?.playerController.dismiss(animated: false, completion: nil)
            }
        }
```
