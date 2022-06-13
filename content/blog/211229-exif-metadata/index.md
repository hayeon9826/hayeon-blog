---
title: 모바일 사진 업로드 시 90도 회전하는 문제 (feat. Exif 메타데이터)
date: '2021-12-29T22:40:32.169Z'
description: 사진을 원래대로 돌려보자
category: 'Development'
image: 'https://velog.velcdn.com/images/khy226/post/b54627d0-4481-4c81-9eb0-96f2b52f4868/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.14.45.png'
---

<img src="https://velog.velcdn.com/images/khy226/post/b54627d0-4481-4c81-9eb0-96f2b52f4868/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.14.45.png" style="width: 60%; padding-bottom: 50px;">

프로젝트 작업 중, 모바일 아이폰에서 이미지를 업로드하면 90도 회전되어서 업로드 되는 현상이 확인되었다.

![exif 예시 001](https://user-images.githubusercontent.com/72732446/147583902-b79b453c-3c59-4acb-b205-e508813c2ff2.jpeg)

휴대폰으로 찍은 사진의 경우 이미지의 가로, 세로가 변경되서 등록되는 경우가 종종 있다.

사진이 돌아가는 이유는 **EXIF(Exchangeable Image File Format)의 회전값(orientation)**이 반영되지 않기 때문이다. 휴대폰을 세워서 정상적인 0도 각도에서 사진을 찍으면 문제가 되지 않으나, 스마트폰을 가로 90도 각도로 기울여서 찍은 경우 사진이 90도로 틀어져서 저장된다.

휴대폰은 EXIF 메타정보의 orientation 정보를 읽을 수 있어서 정상적인 사진을 보여주시만, 크롬, 사파리, 파이어팍스 같은 **브라우저는 orientation 정보를 읽지 못한다**. 따라서 휴대폰에서 업로드한 사진들이 브라우저에서는 종종 회전되어 보인다.

## 1. Exif란?

**Exif: 교환 이미지 파일 형식** (EXchangable Image File format)

Exif는 교환 이미지 파일 형식으로 디지털 카메라에서 이용되는 이미지 파일 포맷이다. 카메라가 촬영한 사진, 녹음파일에 시간 등의 각종 정보를 담기 위해 개발되었다고 한다. 이 데이터는 JPEG, TIFF 6.0과 RIFF, WAV 파일 포맷에서 이용되며 이미지나 소리에 대한 정보(메타 데이터)를 추가로 기록할 수 있다.

EXIF 데이터는 이미지 파일의 일부로 저장되며, EXIF 데이터를 지원하는 소프트웨어 사용 시 이미지를 변경해도 데이터를 보존한다.

### EXIF의 메타데이터

EXIF 메타데이터는 아래와 같은 정보들을 제공한다.

- 카메라 제조사
- 카메라 모델
- **회전 방향**
- 날짜와 시간
- 색 공간
- 초점 거리
- 플래시
- ISO 속도
- 조리개
- 셔터 속도
- gps

## 2. 해결방법

해당 프로젝트에서는 이미지를 s3에 업로드 하고 있다.

이미지를 업로드하면, 파일 제약사항 (최대 크기 등)을 확인하고 확인된 파일을 바로 s3에 업로드 하는 방식이다.

이미지 회전을 해결하는 방법은 크게 두 가지가 있는데, 후자로 해결했다.

- 이미 업로드 된 사진에서 Exif 태그를 읽어 img 태그에서 이미지를 회전시킨다.
- **업로드 중에 EXIF태그를 읽어서, 회전할 이미지를 0도로 회전하여 저장한다.**

#### \* 참고: exif의 orientation 값

exif 의 orientation(회전방향) 값은 1 ~ 8 까지 있는데 아래와 같다. orientation 을 s3 에 업로드 하기 전에 모두 '1'로 변경하는 방법을 적용하려고 한다.

<img width="499" alt="스크린샷 2021-12-28 오후 5 14 45" src="https://user-images.githubusercontent.com/72732446/147544449-900d2cd7-c431-46a9-b12f-bccfec3c65f7.png">

## 3. 해결

`blueimp-load-image`로 이미지 파일의 Exif 메타 데이터(orientation)을 변형해보자. 해당 패키지는 이미지 파일을 불러오고 변형할 때 사용되는데, 이를 위해 `loadImage` 함수를 사용했다.

- 깃헙 링크: https://github.com/blueimp/JavaScript-Load-Image

#### 1) blueimp-load-image 패키지 설치

```javascript
yarn add blueimp-load-image
```

#### 2) 코드 적용

```javascript
// 이미지 업로더 파일

import loadImage from 'blueimp-load-image';
...
const onImageUpload = useCallback(
  ...코드 생략
  // 이미지 파일 데이터
  const file = fileList[0];
    // 추가된 코드
    // 1. 이미지 로드
    loadImage(
      file,
      function (img, data) {
        // 2. 이미지 파일 데이터에 imageHead와 exif가 있는지 확인
        if (data.imageHead && data.exif) {
          // 3. exif 값이 있다면 orientation 값을 1로 변경
          loadImage.writeExifData(data.imageHead, data, 'Orientation', 1);
          img.toBlob(function (blob) {
            loadImage.replaceHead(blob, data.imageHead, async function (newBlob) {
              newBlob.name = file.name;
              // 4. 기존 메서드로 파일 s3에 업로드
              await uploadToS3(newBlob);
            });
          }, 'image/jpeg');
        } else {
          // exif 값 없으면 바로 s3에 업로드
          uploadToS3(file);
        }
      },
      { meta: true, orientation: true, canvas: true },
    );
 )
```

#### 3) 작동 확인

기존에 모바일 업로드 시 회전된 이미지를 다시 업로드 하니까, 회전 되지 않은 상태로 s3에 업로되는 것이 확인되었다.

![exif 예시2 001](https://user-images.githubusercontent.com/72732446/147585227-a6701288-5293-4240-a331-5543d02e5972.jpeg)

<hr>

## 참고

> - [13/ Image 업로드 시 회전에 대하여 (feat. exif 메타데이터 - Orientation)](https://feel5ny.github.io/2018/08/06/JS_13/)
> - [Handle image rotation on mobile](https://medium.com/wassa/handle-image-rotation-on-mobile-266b7bd5a1e6)
> - [JavaScript - 휴대폰 사진 업로드시 회전 방지](https://wickedmagica.tistory.com/239)
