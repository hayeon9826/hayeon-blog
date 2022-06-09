---
title: Jquery cookie로 팝업창 구현
date: "2021-09-05T23:46:37.121Z"
summary: "jquery Cookie를 활용해 일주일간 보지않기 기능 구현"
category: "Javascript"
---

![preview](https://velog.velcdn.com/images/khy226/post/a48ec3b1-cb8a-4bcb-8852-9bf920f38d9a/photo-1597733153203-a54d0fbc47de.jpeg)

jquery Cookie를 활용해 일주일간 보지않기, 하루 보지않기 등 특정 기간동안 뜨지 않는 팝업창을 구현하는 방법을 구현하려고 합니다.



<br>

- 우선 팝업창을 모달을 생성해주시고, 처음 페이지 들어가면 항상 팝업창을 띄울 수 있게 코드를 작성 해줍니다.

```html
<div class="modal" tabindex="-1" role="dialog" id="popup_modal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        테스트 모달 입니다.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary week_close_btn">일주일 간 보지않기</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>


<script>
  // 처음에 modal 열어두기
  $(document).ready(function(){
    $("#popup_modal").modal('show');
  }
</script>
```

<br>

아래와 같은 형태의 모달을 띄워줍니다.

![스크린샷 2021-09-05 오후 11 52 01](https://user-images.githubusercontent.com/72732446/132131220-f136e1fc-fefc-4591-be14-6e2b47c5721d.png)


- 이제 쿠키를 활용해 '일주일 간 보지않기'를 실행하기위해 jquery Cookie를 추가합니다.

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
```



- '일주일간 보지 않기' 버튼을 눌렀을 때, 팝업창을 닫으면서 expire 값을 7로 주어 쿠키를 생성해줍니다.

```html
<script>
  $(".week_close_btn").click(function(){
    layerPopupHide(1);
  })
  
  function layerPopupHide(state){
    $("#popup_modal").modal('hide');
    if(state === 1){
    	//cookie처리
      if($.cookie('testCookie') == undefined){
        //쿠키가 없는 경우 testCookie 쿠키를 추가
        // expires값으로 7을 주어 7일 후 쿠키가 삭제되도록 설정
        // path값을 '/'로 주면 해당사이트 모든페이지에서 유효한 쿠키를 생성
        $.cookie('testCookie', 'Y', { expires: 7, path: '/' });
      }
    }
  }
</script>
```



- 처음 페이지 들어왔을 때, 쿠키가 있는지 확인하고 모달 띄워주도록 스크립트 수정해줍니다.

```html
<script>
  $(document).ready(function(){
    if($.cookie('testCookie') == undefined){
      $("#popup_modal").modal('show');
    }
  }
</script>
```



<br>

이제 '일주일간 보지 않기' 버튼을 누르면, 'testCookie'라는 쿠기가 생성되며 모달이 뜨지 않습니다.

- 콘솔창에서 application > storage > cookies 삭제하면 팝업창이 다시 뜨는 것을 확인할 수 있습니다.

![스크린샷 2021-04-14 오후 5 22 10](https://user-images.githubusercontent.com/72732446/132131159-56a14673-2b9a-4f89-bcc2-df991696ad00.png)




* 참고 사이트: https://code-study.tistory.com/34







