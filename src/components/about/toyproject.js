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
        {/* <details> */}
        {/* <summary className="text-sm">Toy Projects 상세 보기</summary> */}
        {/* <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://publishd.ai/">
              <h5>Publishd</h5>
            </a>
            <p>2022.12 ~</p>
            <p>개인 외주 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>본인 포함 2명의 개발자와 협업</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                랜딩 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://publishd.ai/">
                  publishd.ai
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                서비스 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://beta.publishd.ai/">
                  beta.publishd.ai
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <span className="highlight-gray">
                  <strong>기여도 30%</strong>
                </span>
              </li>
            </ul>
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>React, Next.js, Typescript, React-query, recoil, tailwindcss, React-quill editor, next/auth</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
            </ul>
          </div>
        </div> */}
        <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://www.npmjs.com/package/hello-design-system">
              <h5>디자인 시스템 라이브러리</h5>
            </a>
            <p>2024.04</p>
            <p>개인 토이 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>Tailwind를 이용한 디자인 시스템 라이브러리</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                npm 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://www.npmjs.com/package/hello-design-system">
                  npmjs.com/package/hello-design-system
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                깃헙링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/hello-design-system">
                  github.com/hayeon9826/hello-design-system
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                데모 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://hello-design-system.vercel.app/">
                  hello-design-system.vercel.app/
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>Frontend: React.js, Next.js 14, Typescript, Storybook, TailwindCSS</li>
              <li>Deployment: Vercel</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>React 기반 프로젝트를 위한 TailwindCSS 디자인 시스템 라이브러리를 제작하여 npm에 배포하였습니다.</li>
              <li>ES6 모듈 최적화에 중점을 두어 Rollup을 사용해 번들링을 진행했습니다. </li>
              <li>
                Storybook의 MDX 파일을 활용하여 문서화와 예제 페이지를 통합함으로써, 문서화 작업을 자동화하고
                유지보수성을 높였습니다.
              </li>
              <li>
                globals.css 파일에 디자인 시스템의 빌드된 CSS 파일을 임포트하여 (
                <b>@import "hello-design-system/build/build.css";</b> 와 같이) 손쉽게 스타일을 적용할 수 있도록 빌드
                설정을 추가했습니다.
              </li>
              <li>
                변경 사항의 중요도에 따라 major, minor, patch 버전을 구분하여 업데이트하며 버전 관리를 하고 있습니다.
              </li>
              <li>
                해당 디자인 시스템 라이브러리를 적용한 웹 페이지를 배포하여 사용자가 손쉽게 활용할 수 있도록 관리하고
                있습니다.{' '}
                <a target="_blank" rel="noreferrer" href="https://hello-design-system.vercel.app/">
                  hello-design-system.vercel.app/
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://bloggy-front.vercel.app/">
              <h5>bloggy</h5>
            </a>
            <p>2023.03 ~</p>
            <p>개인 토이 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>
                DeeplAI와 Clova Chat AI를 활용하여 개발한 AI 기반의 블로그 및 챗봇 서비스 프로젝트입니다. 이 프로젝트는
                블로그 글 번역, 실시간 채팅 기능 등을 통해 사용자 경험을 향상시키는 것을 목표로 했습니다.
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                깃헙링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/bloggy-front">
                  github.com/hayeon9826/bloggy-front
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                실서버 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://bloggy-front.vercel.app/">
                  bloggy-front.vercel.app
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>Frontend: React.js, Next.js, Typescript, Tailwindcss</li>
              <li>Backend: Prisma, Supabase, Next.js API Routes</li>
              <li>Deployment: Vercel</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                <b>DeeplAI를 활용한 블로그 번역 서비스 개발:</b> DeeplAI를 이용해 사용자가 블로그 작성 시 다양한 언어로
                쉽게 콘텐츠를 번역할 수 있도록 지원했습니다. React-Quill 에디터에서 선택한 텍스트만 실시간으로 번역하고,
                블로그에 바로 적용할 수 있는 기능을 구현하여, 사용자들이 보다 자연스러운 다국어 콘텐츠를 손쉽게 생성할
                수 있도록 했습니다.(
                <a href="https://bloggy-front.vercel.app/posts/new">링크</a>)
              </li>
              <li>
                <b>Clova Chat AI 기반 챗봇 개발:</b> Clova Chat AI를 활용해 사용자의 질문에 실시간으로 응답하는 챗봇
                기능을 구축했습니다. 약 500개 이상의 대화 내역을 기반으로 학습하여 Bloggy와 관련된 다양한 질문에 일관된
                답변을 제공하도록 설계했습니다. 이를 통해 사용자들이 챗봇과 상호작용할 때 일관된 경험을 유지하고, 사용자
                지원을 효율적으로 제공할 수 있었습니다. (<a href="https://bloggy-front.vercel.app/chats">링크</a>)
              </li>
              <li>
                <b>관리자 페이지 구현: </b>
                Prisma ORM을 활용해 재사용 가능한 네 가지 컴포넌트를 개발하고, 관리자 페이지를 구현하여 데이터의 조회,
                수정, 삭제가 가능한 직관적인 인터페이스를 제공했습니다. 이로써 관리 효율성을 높이고, 사용자의 다양한
                요구를 충족시킬 수 있는 환경을 마련했습니다. (<a href="https://bloggy-front.vercel.app/admin">링크</a>)
              </li>
              <li>
                Next-Auth를 도입하여 안전하고 효율적인 인증 및 회원가입 시스템을 구축했습니다. 로그인 기능을 통해
                사용자별 권한을 관리하며, 일반 사용자는 블로그 작성 및 편집 권한을, 관리자는 어드민 페이지에서 콘텐츠
                생성, 수정, 삭제 등의 권한을 가지도록 구현하여 시스템의 보안성과 관리 편의성을 크게 강화했습니다.
              </li>
              <li>
                React Query를 활용하여 데이터 페칭, 로딩, 그리고 에러 처리 과정을 효율적으로 관리했습니다. 로딩
                상태에서는 로딩바를 표시하여 사용자가 데이터 로드 중임을 명확히 인지할 수 있도록 했고, 에러 처리 시에는
                구체적인 에러 메시지를 제공하여 사용자들이 문제를 이해하고 해결할 수 있도록 지원했습니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/next-bnb">
              <h5>next-bnb</h5>
            </a>
            <p>2024.03</p>
            <p>개인 토이 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>Next.js 13을 이용한 숙박 예약 플랫폼</li>
            </ul>

            <ul className="bulleted-list">
              <li>
                깃헙링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/next-bnb">
                  github.com/hayeon9826/next-bnb
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                데모 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://next-bnb-omega.vercel.app/">
                  next-bnb-omega.vercel.app/
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>Frontend: React.js, Next.js 14, Typescript, Storybook, TailwindCSS</li>
              <li>Deployment: Vercel</li>
            </ul>
          </div>
        </div>
        <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://next-eatmap.vercel.app/">
              <h5>eatmap</h5>
            </a>
            <p>2023.06</p>
            <p>개인 토이 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>Next.js 13의 app 디렉토리를 적용한 맛집 지도 서비스 (1인개발)</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                깃헙링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/next-eatmap">
                  github.com/hayeon9826/next-eatmap
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                실서버 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://next-eatmap.vercel.app/">
                  next-eatmap.vercel.app
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>
                Frontend: React.js, Next.js 13 (app directory), Typescript, Recoil, React-Query, Next-auth,
                React-hook-form, Tailwindcss
              </li>
              <li>Backend: Prisma, Supabase, Next.js API Routes</li>
              <li>Deployment: Vercel</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                Kakao Map API를 연동한 맛집 지도 앱을 구현했습니다. 페이지 로드시 지도와 커스텀 마커를 보여줄 수 있도록
                작업했습니다.
              </li>
              <li>
                prisma ORM으로 서울특별시 음식점 공공데이터 약 1000여개의 데이터를 (seed)생성하였고, Next API Routes와
                prisma를 활용해 데이터를 보여주었습니다.
              </li>
              <li>geolocation API을 활용하여 현재위치로 이동할 수 있는 버튼 작업을 진행했습니다.</li>
              <li>React-query의 infiniteQuery를 이용하여 무한스크롤을 구현했습니다.</li>
              <li>Next/auth의 Oauth 기능을 활용하여 구글 로그인 / 네이버 로그인 / 카카오 로그인을 구현했습니다.</li>
              <li>기존의 pages 디렉토리를 next.js 13의 app 디렉토리로 마이그레이션 하였습니다.</li>
            </ul>
          </div>
        </div>

        <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://findaoverflow.vercel.app/">
              <h5>findaoverflow</h5>
            </a>
            <p>2022.10 ~</p>
            <p>개인 토이 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>개인 토이 프로젝트 (본인 포함 2명의 개발자)</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                깃헙링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/findaoverflow">
                  github.com/hayeon9826/findaoverflow
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                실서버 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://findaoverflow.vercel.app/">
                  findaoverflow.vercel.app
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>
                React 18, Next.js, Typescript, Firestore(firebase), React-query, recoil, tailwindcss, Jodit Editor,
                next/auth
              </li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                백엔드 없이 Next.js의 API Router와 Firestore를 이용한 데이터 생성/수정/삭제 기능을 구현했습니다.
                Firestore의 구조와 원리에 대한 이해를 높였습니다.{' '}
                <a href="/221014-firestore-crud/" target="_blank" rel="noreferrer noopener">
                  [상세 링크]
                </a>{' '}
              </li>
              <li>
                초기 Firebase Auth를 이용한 회원가입을 적용했으나, Next.js 프로젝트의 확장성을 위해 Next/auth를
                도입하였습니다. Next/auth를 이용한 인증 및 회원가입을 구현하며 인증 프로세스를 경험했습니다.
              </li>
              <li>
                react-hook-form을 이용한 게시글 폼 작업을 진행하였으며, Jodit Editor를 추가하여 에디터로 포스트 작성을
                할 수 있게 개선하였습니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://google-calendar-pearl.vercel.app/">
              <h5>구글 캘린더 클론</h5>
            </a>
            <p>2022.03</p>
            <p>개인 토이 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>
                개인 토이 프로젝트 (<strong>구글 캘린더 클론 프로젝트)</strong>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                깃헙링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/google-calendar">
                  github.com/hayeon9826/google-calendar
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                실서버 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://google-calendar-pearl.vercel.app/">
                  google-calendar-pearl.vercel.app/
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>React(create-react-app), Redux-Toolkit, typescript, tailwindcss</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                Redux-Toolkit를 이용해 복잡한 캘린더의 상태를 관리했습니다. 기존 Redux의 boilerplate를 축소한
                Redux-Toolkit의 유용함을 경험했습니다.
              </li>
              <li>
                캘린더, 이벤트, 모달 세 가지의 store를 생성하여 기능별로 상태 관리를 분리하여 Redux를 설계했습니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://typing-game-khy.vercel.app/">
              <h5>VanillaJS 타이핑 게임</h5>
            </a>
            <p>2022.03</p>
            <p>개인 토이 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>
                개인 토이 프로젝트 (<strong>VanillaJS로 만든 타이핑 게임 프로젝트</strong>)
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                깃헙링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/typing-game-vanillajs">
                  github.com/hayeon9826/typing-game-vanillajs
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                실서버 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://typing-game-khy.vercel.app/">
                  typing-game-khy.vercel.app
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>vanillaJS, webpack, jest, json-server</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                VanillaJS만으로 타이핑 게임 서비스를 설계하고, 상세 기능들을 구현했습니다. VanillaJS의 history API를
                이용해 직접 라우팅 상태를 관리했습니다.
              </li>
              <li>
                Json-server를 사용해 mock 데이터 서버를 띄운 뒤, async / await 함수로 주어진 API URL을 fetch 하도록
                설정하였습니다.
              </li>
              <li>
                자주 사용되는 유틸 함수와 게임 화면을 Jest로 단위 테스트 코드를 작성했습니다. 중요한 함수 위주로 코드에
                잘못된 점은 없는지 보완할 수 있었습니다.
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="column-list mt-5">
            <div style={{ width: '25%' }} className="column">
              <h5>오늘배움 (TIL) 서비스</h5>
              <p>2021.12 ~ 2022.02</p>
              <p>개인 토이 프로젝트</p>
            </div>
            <div style={{ width: '75%' }} className="column">
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
                    github.com/hayeon9826/tiltil-server
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
          </div> */}
        {/* <div className="column-list mt-5">
            <div style={{ width: '25%' }} className="column">
              <h5>드론 마켓 서비스</h5>
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
            <div style={{ width: '75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발, 퍼블리싱)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: rails, ruby, javascript</li>
              </ul>
              <ul className="bulleted-list">
                <li>구현 기능: 피그마를 참고하여 퍼블리싱 작업</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://beehigh.co.kr/">
                    beehigh.co.kr/
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
          </div> */}
        {/* <div className="column-list mt-5">
            <div style={{ width: '25%' }} className="column">
              <h5>인썸니아 빌더 </h5>
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
            <div style={{ width: '75%' }} className="column">
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
          </div> */}
        {/* <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="https://justplay.co.kr/">
              <h5>O2O 학원 매칭 서비스</h5>
            </a>
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
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>Insomenia 사내 외주 프로젝트 (서브개발)</li>
              <li>학원 수강 신청 / 관리 웹앱</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                실서버 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://justplay.co.kr/">
                  justplay.co.kr/
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <span className="highlight-gray">
                  <strong>기여도 40%</strong>
                </span>
              </li>
            </ul>
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>ruby on rails, javascript, jquery, ubuntu, framework7</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>Ruby on rails를 활용하여 학원 거리순 정렬 기능을 개발했습니다.</li>
              <li>
                ajax와 자바스크립트의 location Web API를 활용해서 주변 지역별로 가까운 학원 보여주기 기능을
                작업했습니다.
              </li>
              <li>
                Framework7을 이용해 학부모/학생을 위한 학원 및 강의 신청 앱을 개발했습니다. ActiveAdmin 라이브러리를
                활용하여 관리자/선생님을 위한 수강 관리 페이지를 개발했습니다.
              </li>
              <li>디자인(피그마)에 맞게 퍼블리싱 작업을 주도적으로 진행했습니다.</li>
            </ul>
          </div>
        </div> */}
        {/* <div className="column-list">
            <div style={{ width: '25%' }} className="column">
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
            <div style={{ width: '75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, javascript, jquery, ubuntu, framework7</li>
              </ul>
              <ul className="bulleted-list">
                <li>사장님 메뉴, 상점 등록 기능, 상품 등록 및 옵션 추가 기능, ui 개선, 타 장난감 마켓 크롤링 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=com.toyfix">
                   play.google.com/store/apps/details?id=com.toyfix
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
          </div> */}
        {/* <div className="column-list">
            <div style={{ width: '25%' }} className="column">
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
            <div style={{ width: '75%' }} className="column">
              <ul className="bulleted-list">
                <li>사내 외주 프로젝트 (서브개발)</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, javascript, jquery, ubuntu, framework7</li>
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
          </div> */}
        {/* <div className="column-list mt-5">
            <div style={{ width: '25%' }} className="column">
              <h5>피링 (p.ling)</h5>
              <p>
                <span className="highlight-gray">2020.08 ~ 2020.12</span>
              </p>
              <p>개인 프로젝트 (창업)</p>
            </div>
            <div style={{ width: '75%' }} className="column">
              <ul className="bulleted-list">
                <li>모바일 웹 기반 O2O 피부 관리 채팅 서비스</li>
                <li>본인 포함 4명의 팀원과 공동 개발. 직접 서비스 기획, 배포, 운영</li>
              </ul>
              <ul className="bulleted-list">
                <li>사용 스택: ruby on rails, javascript, jquery, ubuntu</li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  구현 기능: 상담 예약 시스템 개발 / 제품 결제 api 적용 (import 사용) / 채팅 기능 구현 (action cable
                  이용) / 별점 기능, 댓글 기능 구현 / 알림톡 api 적용 (httparty, 알리고)
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  <span className="highlight-gray">
                    <strong>기여도 40%</strong>
                  </span>
                </li>
              </ul>
              <ul className="bulleted-list">
                <li>
                  링크:{' '}
                  <a target="_blank" rel="noreferrer" href="https://github.com/kratzjgy/pling-server">
                    Github Link
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        {/* <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <a target="_blank" rel="noreferrer" href="http://asianalyse.com">
              <h5>Asianalyse</h5>
            </a>
            <p>
              <span className="highlight-gray">2019.10 ~ 2020.03</span>
            </p>
            <p>개인 외주 프로젝트</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>개인 프로젝트로 진행한 학술지 크롤링 웹 사이트.</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                사이트:{' '}
                <span className="highlight-gray">
                  <a target="_blank" rel="noreferrer" href="https://asianalyse.com/">
                    asianalyse.com
                  </a>
                </span>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                깃헙:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/asian-analyse">
                  github.com/hayeon9826/asian-analyse
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
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>postgres, AWS, EC2, ruby on rails, javascript, 헤로쿠, 카페24 (ubuntu), postgres</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                Ruby on Rails의 i18n을 적용하여 프랑스 및 영어로 사이트를 볼 수 있도록 다국어 설정을 구현했습니다.{' '}
              </li>
              <li>
                기존에 수기로 학회 공지사항을 입력하던 구조에서, 자동화를 할 수 있도록 프로젝트 설계를 보완했습니다.
                자동화를 위해 <code>Selenium</code>으로 주요 학회 사이트 공지사항을 크롤링하여 가져오도록 하였고,{' '}
                <code>cron job</code>을 설정해 매주 정해진 시간마다 자동으로 크롤링이 작동하도록 서비스를
                개선하였습니다.
              </li>
              <li>
                Rails의 <code>impressionist gem</code>을 활용하여 사용자 방문 횟수를 추적하였고, Google Analytics를
                추가해 전체적인 사이트 유입 현황을 분석했습니다.
              </li>
            </ul>
          </div>
        </div> */}
        {/* <div className="column-list mt-5">
          <div style={{ width: '25%' }} className="column">
            <h5>히스킨 (Hiskin)</h5>
            <p>
              <span className="highlight-gray">2020.02 ~ 2020.10</span>
            </p>
            <p>개인 프로젝트 (창업)</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <ul className="bulleted-list">
              <li>개인 프로젝트로 진행한 마스크팩 추천 커머스</li>
              <li>본인 포함 4명의 팀원과 공동 개발. 직접 서비스 기획, 배포, 운영</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <span className="highlight-gray">
                  <strong>기여도 40%</strong>
                </span>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                Github 링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/kratzjgy/hiskin-server">
                  Github Link
                </a>
              </li>
            </ul>
            <h5>Tech Stack.</h5>
            <ul className="bulleted-list">
              <li>Ruby on Rails, javascript, jquery, ubuntu</li>
            </ul>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                Ruby on Rails로 전체 서비스를 개발했습니다. 약 900여 개의 성분과 100여 개의 마스크팩 데이터를 csv로
                import 하여 성분별로 피부 타입에 맞는 마스크팩을 추천하는 로직을 개발했습니다.
              </li>
              <li>
                {' '}
                찜, 장바구니, 구매, 결제(import 적용), 주문 내역 등 구매 프로세스를 처음부터 끝까지 개발했습니다. 뿐만
                아니라, 초기 서비스를 직접 기획, 개발, 마케팅, 영업, 유지보수까지 모든 프로세스를 경험할 수 있었습니다.
              </li>
              <li> 사용성 증진을 위해 PC 및 모바일 버전의 UI를 테스트하며 반응형 사이트로 개선하는 작업을 했습니다.</li>
            </ul>
          </div>
        </div> */}
        {/* </details> */}
      </section>
    </>
  )
}

export default ToyProject
