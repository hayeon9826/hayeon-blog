import React from 'react'

const ToyProject = () => {
  return (
    <>
      <section className="about-toyprojects mb-32">
        <h1>
          <span className="title-primary" style={{ borderBottom: '0.05em solid' }}>
            <span className="title-primary">Toy Projects.</span>
          </span>
        </h1>
        <details>
          <summary>Toy Projects 상세 보기</summary>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <strong>
                  <strong>구글 캘린더 클론</strong>
                </strong>
              </p>
              <p>2022.03</p>
              <p>개인 토이 프로젝트</p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>
                  개인 토이 프로젝트 (<strong>구글 캘린더 클론 프로젝트)</strong>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>사용스택: React(create-react-app), Redux-Toolkit, typescript, tailwindcss</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  구현 기능: Redux-Toolkit를 이용한 상태 관리, 주별/월별 캘린더 보기, 선택한 날짜로 화면 변경, 왼쪽 상단
                  date picker, 이벤트 등록 및 삭제 기능 (제목, 날짜, 시간, 색상)
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  깃헙링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/google-calendar">
                    https://github.com/hayeon9826/google-calendar
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  실서버 링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://google-calendar-pearl.vercel.app/">
                    https://google-calendar-pearl.vercel.app/
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 100%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>오늘 배움 (TIL) 서비스</p>
              <p>2021.12 ~ 2022.02</p>
              <p>개인 토이 프로젝트</p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>개인 토이 프로젝트</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용스택: Next.js, Graphql, Rails, ruby, tailwind</li>
              </ul>
              <ul className="bulleted-list">
                <li>구현 기능: graphql 을 이용한 crud 게시판 기능 작업, jwt 토큰 로그인, 회원가입 플로우 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  깃헙링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/tiltil-server">
                    https://github.com/hayeon9826/tiltil-server
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 100%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                드론 마켓 서비스<strong> </strong>
              </p>
              <p>
                <span className="highlight-gray">2021.07 ~ 2021.09</span>
              </p>
              <p>
                <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
                  인썸니아
                </a>{' '}
                내부 프로젝트
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발, 퍼블리싱)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: rails, ruby, html, css, javascript</li>
              </ul>
              <ul className="bulleted-list">
                <li>구현 기능: 피그마를 참고하여 퍼블리싱 작업</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://beehigh.co.kr/">
                    https://beehigh.co.kr/
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 10%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <strong>인썸니아 빌더 </strong>
              </p>
              <p>
                <span className="highlight-gray">2021.04 ~ 2021.08</span>
              </p>
              <p>
                <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
                  인썸니아
                </a>{' '}
                내부 프로젝트
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 빌더 프로젝트 (서브개발)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: react, rails, typescript</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  구현 기능: react를 활용해 재사용할 수 있는 컴포넌트 구현 (좋아요 기능, 게시판 기능, 상품 생성 및 수정,
                  지도 기능, 댓글 기능, 문의 기능, 레이아웃 정리)
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 10%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <strong>O2O 학원 매칭 서비스</strong>
              </p>
              <p>
                <span className="highlight-gray">2020.12 ~ 2021.11</span>
              </p>
              <p>
                <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
                  인썸니아
                </a>{' '}
                프로젝트
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu, framework7</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  구현 기능: Ruby on rails를 활용하여 학원 거리순 정렬, ajax 활용해서 주변 지역별로 가까운 학원
                  보여주기, 학원 및 강의 신청, 수강 강의 확인 페이지 개발
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://justplay.co.kr/">
                    https://justplay.co.kr/
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 50%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <strong>모바일 장난감 커머스</strong>
              </p>
              <p>
                <span className="highlight-gray">2020.09 ~ 2020.12</span>
              </p>
              <p>
                <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
                  인썸니아
                </a>{' '}
                프로젝트
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu, framework7</li>
              </ul>
              <ul className="bulleted-list">
                <li>사장님 메뉴, 상점 등록 기능, 상품 등록 및 옵션 추가 기능, ui 개선, 타 장난감 마켓 크롤링 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=com.toyfix">
                    https://play.google.com/store/apps/details?id=com.toyfix
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <strong>
                    <span className="highlight-gray">기여도 20%</span>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <strong>코디 추천 서비스</strong>
              </p>
              <p>
                <span className="highlight-gray">2020.06 ~ 2020.12</span>
              </p>
              <p>
                <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
                  인썸니아
                </a>{' '}
                프로젝트
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu, framework7</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  구현 기능: Ruby on rails를 활용하여 옷 색깔 필터 구현, jquery ui의 drag & drop 기능으로 코디 만들기
                  드래그 앤 드롭 기능 구현, 인플루언서 & 일반 유저 간 코디 요청/ 전송 기능 구현
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 70%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <strong>BM 제작 서비스</strong>
              </p>
              <p>
                <span className="highlight-gray">2020.05 ~ 2020.11</span>
              </p>
              <p>
                <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
                  인썸니아
                </a>{' '}
                프로젝트
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  구현 기능: Ruby on rails를 활용하여 카드를 선택/생성 후 비즈니스 모델 공유 시스템 개발, 엑셀 및 pdf
                  익스포트 기능 구현, import와 연동하여 정기 결제/일반 결제 기능 구현
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 50%</strong>
                  </span>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://cofounder.co.kr/">
                    https://cofounder.co.kr/
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <a target="_blank" rel="noreferrer" href="http://cacers.com">
                  <strong>Cacers</strong>
                </a>
              </p>
              <p>개인 외주 프로젝트</p>
              <p>
                <span className="highlight-gray">2020.10</span>
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>교내 학회 소개 사이트(개인 외주)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, html , css, javascript, ubuntu</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://cacers.com/">
                    https://cacers.com/
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  깃헙:{' '}
                  <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/blend_app">
                    https://github.com/hayeon9826/
                  </a>
                  cac-web
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <strong>
                    <span className="highlight-gray">기여도 100%</span>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <a target="_blank" rel="noreferrer" href="http://blend2020.herokuapp.com">
                  <strong>blend</strong>
                </a>
              </p>
              <p>교내 프로젝트</p>
              <p>
                <span className="highlight-gray">2020.04 ~ 2020.07</span>
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>난민 커피 소개 사이트 (학교 프로젝트)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: Ruby on Rails, ruby, javascript, jquery, html, css</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  사이트:{' '}
                  <a target="_blank" rel="noreferrer" href="https://blend2020.herokuapp.com/">
                    https://blend2020.herokuapp.com/
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  깃헙:{' '}
                  <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/blend_app">
                    https://github.com/hayeon9826/blend_app
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 100%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <strong>
                  <a target="_blank" rel="noreferrer" href="http://asianalyse.com">
                    Asianalyse
                  </a>
                </strong>
              </p>
              <p>개인 외주 프로젝트</p>
              <p>
                <span className="highlight-gray">2019.10 ~ 2020.03</span>
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>개인 프로젝트로 진행한 학술지 크롤링 웹 사이트.</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  사용 스택: postgres, AWS, EC2, ruby on rails, html, css, javascript, 헤로쿠, 카페24 (ubuntu), postgres
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  사이트:{' '}
                  <span className="highlight-gray">
                    <a target="_blank" rel="noreferrer" href="https://asianalyse.com/">
                      https://asianalyse.com
                    </a>
                  </span>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  깃헙:{' '}
                  <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/asian-analyse">
                    https://github.com/hayeon9826/asian-analyse
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 100%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="column-list">
            <div style={{ width: '31.25%' }} className="column">
              <p>
                <a target="_blank" rel="noreferrer" href="http://wheeling.herokuapp.com">
                  <strong>Wheel-ing</strong>
                </a>
              </p>
              <p>교내 프로젝트</p>
              <p>
                <span className="highlight-gray">2019.04 ~ 2019.08</span>
              </p>
            </div>
            <div style={{ width: '68.75%' }} className="column">
              <ul className="bulleted-list">
                <li>베리어 프리 여행지 추천 사이트 (학교 프로젝트)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, html, css, javascript, 헤로쿠, 아마존 s3, postgres</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  사이트:{' '}
                  <a target="_blank" rel="noreferrer" href="https://wheeling.herokuapp.com/">
                    https://wheeling.herokuapp.com/
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  깃헙:{' '}
                  <a target="_blank" rel="noreferrer" href="https://github.com/kratzjgy/wheeling">
                    https://github.com/kratzjgy/wheeling
                  </a>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 100%</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </details>
      </section>
    </>
  )
}

export default ToyProject
