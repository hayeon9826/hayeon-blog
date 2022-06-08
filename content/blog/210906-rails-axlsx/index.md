---
title: "Rails에서 엑셀 파일 추출하기 (feat. axlsx_rails)"
date: "2021-09-06T22:59:32.169Z"
description: axlsx_rails 젬 활용방법
---
### Gemfile 추가
아래 gem을 추가하고 `bundle install` 을 해주세요.
```ruby
gem 'rubyzip'
gem 'axlsx'
gem 'axlsx_rails'
```

![preview](https://velog.velcdn.com/images/khy226/post/9c6ed4af-94d9-4acd-b493-6996275f4ef5/excel-5963669_960_720.webp)

gemfile정보: 
- rubyzip: https://github.com/rubyzip/rubyzip
- rails_axlsx: https://github.com/caxlsx/caxlsx_rails
- axlsx: https://github.com/randym/axlsx

### mime_types.rb 수정

레일즈에서 엑셀 형태의 데이터를 사용할 수 있도록 xlsx 타입을 추가해줍니다.

```ruby

# mime_types.rb
Mime::Type.register "application/xlsx", :xlsx
```

### 엑셀파일 다운로드 버튼 생성

우선 다운로드 routing을 설정하고, 엑셀 파일 다운로드 버튼을 생성합니다.
```ruby
# routes.rb

get '/download_excel', => 'home#download_excel'

# view 파일
<%= link_to '엑셀 다운로드', download_excel_path, class: "btn btn-primary' %>
```



### 컨트롤러 작성
엑셀로 다운로드 할 데이터를 변수에 저장해주고, xlsx 파일명과 경로를 작성해주세요.

```ruby
def download_excel
  @posts = Post.all
  render xlsx: "post_excel", template: "excel/post_excel.xlsx.axlsx"
end
```


#### 참고: 
1. `xlsx_package.workbook`: workbook(엑셀) 생성
2. `add_worksheet(name: “표1”)`: 엑셀 안에 시트 생성
3. `sheet.addrow`: 엑셀 시트에 새로운 열 생성
4. `sheet.add_image(:image_src => image_path)`: 엑셀 시트에 이미지 추가
5. `wb.styles.add_style({:alignment => {:horizontal => :left}})...`: 스타일 생성
6. `sheet.add_row ["ID", "제목", "작가", "내용", "조회수"], :style => header`: 열에 원하는 스타일 적용

### axlsx 파일 작성

위에 적어준 xlsx 파일 경로에 파일명.xlsx.axlsx 파일을 생성해주세요.

`#views/excel/post_excel.xlsx.axlsx`

### post_excel.xlsx.axlsx

```xlsx
wb = xlsx_package.workbook #excel book 생성

# 첫번째 표 생성
wb.add_worksheet(name: "표1") do |sheet|
  header = wb.styles.add_style({:alignment => {:horizontal => :center, :vertical => :center, :wrap_text => true}, :border => { :style => :thin, :color => "000000" }}) 
  border = wb.styles.add_style({:border => { :style => :thin, :color => "000000" }}) 
  align_right = wb.styles.add_style({:alignment => {:horizontal => :right}}) 
  align_left = wb.styles.add_style({:alignment => {:horizontal => :left}})
  sheet.add_row ["ID", "제목", "작가", "내용", "조회수"], :style => header
  @posts&.each do |post|
    sheet.add_row [post&.id, post&.title, post&.author, post&.content, post&.view_count], :style => border
  end
end


wb.add_worksheet(name: "표2") do |sheet|
   header = wb.styles.add_style({:alignment => {:horizontal => :center, :vertical => :center, :wrap_text => true}, :border => { :style => :thin, :color => "000000" }}) 
  border = wb.styles.add_style({:border => { :style => :thin, :color => "000000" }}) 
  align_right = wb.styles.add_style({:alignment => {:horizontal => :right}}) 
  align_left = wb.styles.add_style({:alignment => {:horizontal => :left}})
  sheet.add_row ["ID", "제목", "작가", "내용", "조회수"], :style => header
  @posts&.each do |post|
    sheet.add_row [post&.id, post&.title, post&.author, post&.content, post&.view_count], :style => border
  end
end

wb.add_worksheet(name: "표3") do |sheet|
   header = wb.styles.add_style({:alignment => {:horizontal => :center, :vertical => :center, :wrap_text => true}, :border => { :style => :thin, :color => "000000" }}) 
  border = wb.styles.add_style({:border => { :style => :thin, :color => "000000" }}) 
  align_right = wb.styles.add_style({:alignment => {:horizontal => :right}}) 
  align_left = wb.styles.add_style({:alignment => {:horizontal => :left}})
  sheet.add_row ["ID", "제목", "작가", "내용", "조회수"], :style => header
  @posts&.each do |post|
    sheet.add_row [post&.id, post&.title, post&.author, post&.content, post&.view_count], :style => border
  end
end


```

엑셀 다운로드 버튼을 누르면, 위 axlsx 파일에 설정해준 엑셀 파일을 다운로드 할 수 있습니다. 

<br>

* 참고: https://medium.com/@kalaivanim/rails5-excel-export-using-axlsx-gem-f206d24ccf28