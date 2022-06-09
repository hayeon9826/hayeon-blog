---
title: "Rubyzip: zipfile로 압축해서 다중 파일 다운로드 받기"
date: "2021-09-06T22:40:32.169Z"
description: Rubyzip 사용 방법을 알아봅시다.
category: "Rails"
---

### Rubyzip: zipfile로 압축해서 다중 파일 다운로드 받기


![preview](https://velog.velcdn.com/images/khy226/post/2ae89566-6d6d-4adb-939b-8a2fd086d8ac/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.png)

- rubyzip은 다중 이미지 혹은 다중 파일을 zipfile로 만드는 젬 입니다.
- 참고: https://github.com/rubyzip/rubyzip



#### 1. rubyzip gemfile 설치

```ruby
gem 'rubyzip', '>= 1.0.0'
gem 'zip-zip' 
```

#### 2. zipfile 전환 코드 작성하는 페이지에 rubygems와 zip을 require 해줍니다.

```ruby
require 'rubygems'
require 'zip'

```

#### 3. 압축할 파일들이 있는 폴더와 해당 파일들을 묶어줄 zip 폴더를 만들어줍니다.

```ruby

# 압축할 파일들이 있는 폴더 (예시)
folder = "#{Rails.root}/public/downloads"
input_filenames = ['image.jpg', 'description.txt', 'stats.csv']

#위 파일들을 묶어줄 zip 폴더를 만들어줌
zipfile_name = "#{Rails.root}/public/archive.zip"

```

#### 4. 위에 만들어준 zipfile_name 폴더 안에 압축할 파일들을 넣어줍니다.

```ruby

#Zip::File.open(zip폴더이름, Zip::File::CREATE) 형식으로 zipfile을 만들어서, 그 안에 원하는 파일들 넣어줌
Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
  input_filenames.each do |filename|
    # zipfile.add(파일이름, 파일 원본 주소)
    zipfile.add(filename, File.join(folder, filename))
  end
end

```
#### 5. (추가) 위에서 만든 zipfile을 다운로드 하고 싶을때는 send_file을 사용할 수 있습니다.

```ruby
#Zip::File.open.. 블록 밑에 작성
#send_file('zip file 주소', type, filename)
send_file(File.join("#{Rails.root}/public/", 'archive.zip'), :type => 'application/zip', :filename => "#{Time.now.to_date}.zip")
```


### 전체 코드

압축 파일 전체 코드입니다.

```ruby
require 'rubygems'
require 'zip'

# 압축할 파일들이 있는 폴더 (예시)
folder = "#{Rails.root}/public/downloads"
input_filenames = ['image.jpg', 'description.txt', 'stats.csv']

#위 파일들을 묶어줄 zip 폴더를 만들어줌
zipfile_name = "#{Rails.root}/public/archive.zip"

#Zip::File.open(zip폴더이름, Zip::File::CREATE) 형식으로 zipfile을 만들어서, 그 안에 원하는 파일들 넣어줌
Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
  input_filenames.each do |filename|
    # zipfile.add(파일이름, 파일 원본 주소)
    zipfile.add(filename, File.join(folder, filename))
  end
end
```





<br>


- 반대로 특정 디렉터리를 zip 파일로 변환하고 싶을때 사용할 수도 있습니다.  (예시: https://github.com/rubyzip/rubyzip/blob/9d891f7353e66052283562d3e252fe380bb4b199/samples/example_recursive.rb)




위 예제들은 rubyzip gem 링크에 더 자세히 설명이 되어있습니다.


