import React from 'react'

const Work = () => {
  return (
    <>
      <section className="about-work mb-32">
        <h1>
          <span className="title-primary" style={{ borderBottom: '0.05em solid' }}>
            <span className="title-primary">Experience.</span>
          </span>
        </h1>
        <section className="mt-16">
          <div className="title-lg">
            <a href="https://www.lgresearch.ai/" target="_blank" rel="noreferrer noopener">
              LG AI 연구원
            </a>
          </div>
          <p>
            전문가용 대화형 AI 플랫폼{' '}
            <a href="https://www.lgresearch.ai/exaone" target="_blank" rel="noreferrer noopener">
              엑사원 (Exaone)
            </a>{' '}
            개발
          </p>
          <div>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Period </strong>
              <span className="col-8">2024.11 ~ 현재</span>
            </p>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Position </strong>
              <span className="col-8">Product Development Team (Frontend Web)</span>
            </p>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Projects </strong>
              <span className="col-8">
                <a href="https://www.lgresearch.ai/exaone" target="_blank" rel="noreferrer noopener">
                  엑사원 (Exaone)
                </a>{' '}
                디자인 시스템 설계 및 구축, 엑사원 웹 개발
              </span>
            </p>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Tech </strong>
              <span className="col-8">React, Next.js, Typescript, Emotion, Vanilla extract, Storybook</span>
            </p>
            <hr />
          </div>
        </section>
        <br />
        <section className="mt-16">
          <div className="title-lg">
            <a href="https://skmuffin.com/main.html" target="_blank" rel="noreferrer noopener">
              SK 에너지
            </a>
          </div>
          <p>
            주유, 충전, 세차, 포인트, 멤버십 어플{' '}
            <a href="https://muffin.page.link/6Tkp" target="_blank" rel="noreferrer noopener">
              머핀
            </a>{' '}
            개발
          </p>
          <div>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Period </strong>
              <span className="col-8">2023.10 ~ 2024.11</span>
            </p>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Position </strong>
              <span className="col-8">USE 파트 (Frontend Web)</span>
            </p>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Projects </strong>
              <span className="col-8">
                <a href="https://muffin.page.link/6Tkp" target="_blank" rel="noreferrer noopener">
                  머핀 앱
                </a>{' '}
                개발, 머핀 디자인 시스템 구축
              </span>
            </p>
            <hr />
            <p className="row gap-3">
              <strong className="col-2 text-right">Tech </strong>
              <span className="col-8">React, Next.js, Typescript, Redux, Emotion, Storybook, GraphQL</span>
            </p>
            <hr />
          </div>
          <div className="mt-5">
            <h4 className="mb-1">USE 파트 (PM)</h4>
            <p>
              <span className="highlight-gray">Frontend Engineer</span>
            </p>
            <p>
              <span className="highlight-gray">2023.10 - 2024.11</span>
            </p>
            <h4>Description.</h4>
            <p>
              SK 에너지의 주유, 충전, 세차, 멤버십 웹앱인 <b>'머핀'</b>서비스를 맡아 프론트엔드 개발을 작업하고
              있습니다. 디자인 시스템 작업, Next.js 14 마이그레이션, 주유 서비스 개선, 차량 직접 등록 서비스 개발,
              프로모션 이벤트 작업, 카오스 엔지니어링 등의 개발을 맡았습니다. 프로젝트별로 담당된 기획자, 디자이너,
              그리고 백엔드 개발자 분들과 협력하여 작업을 하였고, 적극적으로 의견을 내어 기존의 디자인 시스템을 개편하는
              작업을 진행했습니다.
              <br />
              <br />
              React, Next.js 14, Typescript, Redux, emotion, msw, Apollo GraphQL를 이용해 개발했습니다.
            </p>
            <h4>What I did.</h4>
            <ul className="bulleted-list">
              <li>
                <b>빌드 최적화 및 테스트 환경 개선:</b> '머핀' 디자인 시스템의 CI/CD 파이프라인에서 npm install을
                캐싱하여 빌드 시간을 약 30% 단축했으며, MSW(Mock Service Worker)를 도입해 GraphQL 개발 서버와 독립적인
                테스트 환경을 구축함으로써 CI/CD 빌드 속도를 20% 개선했습니다. 또한, Apollo Client의 에러를 효율적으로
                처리하기 위해 커스텀 훅을 구현하여 에러 코드 및 메시지만 출력하도록 하여 컴포넌트별 에러 처리 시간을
                단축하고, 반복적인 포매터 및 밸리데이션 함수를 유틸리티로 모듈화해 코드의 가독성과 재사용성을
                높였습니다.
              </li>
              <li>
                <b>크로스브라우징 및 호환성 최적화:</b> Next.js 14의 useRouter를 활용해 쿼리를 쉽게 작성할 수 있는
                커스텀 훅을 생성하고, 레거시 앱(v1)과 마이그레이션된 앱(v2)의 라우팅을 체계적으로 관리하여 유지보수성과
                확장성을 향상시켰습니다. SVG의 stroke-width 속성 문제를 해결하기 위해 정수 값을 사용하거나 px 단위를
                명시하여 iOS와 Android 간 렌더링 차이를 줄였으며, WebKit 기반 브라우저에서 -webkit-transform:
                translate3d(0,0,0);을 사용해 SVG 렌더링을 최적화했습니다. 또한, 로그아웃 문제를 해결하기 위해 버전 체크
                공통 훅을 개발하여 하위 버전에서는 웹페이지로, 상위 버전에서는 앱 페이지로 이동하도록 분기 처리하여
                다양한 버전의 사용자 경험을 개선하고 호환성 문제를 해결했습니다.
              </li>
              <li>
                고급휘발유 판매를 촉진하기 위해 <b>고급휘발유 사은품 증정 프로모션</b>을 진행하고, 이벤트 신청 및 완료
                페이지 개발, 히스토리 대응 등을 수행했습니다. 이벤트 프로모션 신청 페이지에서 BFF로 이뤄진 GraphQL API를
                활용하여 사용자 정보, 사은품 리스트, 주유 금액 확인, 신청 폼 제출, 신청 결과 처리를 작업하고 복잡한
                데이터 처리를 위해 hook으로 관리하고, useQueryHook를 활용하여 효율적인 코드를 구현했습니다. 또한, 백엔드
                개발자 및 기획자와 협의하여 에러 코드 분류 및 팝업 활용으로 사용자 이탈을 최소화하였습니다.
              </li>
              <li>
                시스템 결함이 생겼을 때 복원력을 테스트하기 위한 <b>카오스 엔지니어링</b>을 실행했습니다. 멤버십 페이지
                및 포인트 API에서 전면 에러가 발생했을 때, 전면 에러 페이지 이동이 아닌, 개별 컴포넌트 단위로 커스텀된
                에러 컴포넌트를 보여줄 수 있도록 설계하였습니다. Apollo graphql의 useApolloNetworkStatus를 false로
                설정하여 전역 에러 처리를 방지하였으며, fetchPolicy를 cache-and-network로 설정하여 캐싱이 된 내용을 먼저
                보여주고 네트워크 요청을 하도록 설정하였습니다.
              </li>
              <li>
                기존 React 프로젝트를 <b>Next.js 14로 마이그레이션</b> (메뉴 페이지, 설정 페이지, 차량 등록/수정/리스트
                페이지, 내 정보 페이지, 이벤트 및 공지사항 페이지)하는 작업을 메인 개발자로 진행했습니다. 코드 정리 및
                Next.js의 Prefetch, Image lazy loading, dynamic 기술 등을 활용해 프로젝트를 최적화하여 Lighthouse 점수를
                약 40% 개선하였습니다. 또한, 기존 레거시 구조에서 반복되는 코드를 제거하고 재사용 가능한 hook을 생성하여
                문의하기 구조 리팩토링, 차량 등록 리팩토링 설계하였습니다.
              </li>
              <li>
                <b>디자인 시스템 프로젝트</b>를 주도적으로 진행하였습니다. 디자이너, 프론트엔드 개발자, 기획자들과 주
                2회씩 정기 회의를 진행하며 기존 레거시 디자인 시스템을 새로운 디자인 시스템 (Plating)으로
                설계하였습니다. 기존에 설계된 atomic 디자인 시스템의 불명확성을 해결하고자, Foundation 및 Component
                형태의 디자인 시스템으로 재설계를 진행하였습니다. 타이포 및 색상등의 기본 베이스가 되는 기초는
                Foundation으로, 재사용 가능한 컴포넌트는 Component로 정의하여 작업하였으며, 기존에 사용하지 않던
                컴포넌트를 삭제하고, 변경/추가가 필요한 컴포넌트는 업데이트를 진행하였습니다.
              </li>
              <li>
                React, Redux, Redux-persist, emotion, Apollo client를 이용한 <b>머핀 앱 개발 및 유지보수</b> 작업을
                진행했습니다. 지도 전역 상태 오류 해결, 주유 필터 전역 상태 오류 해결, intersectionObserver를 이용한
                다이나믹 배너 작업, 차량 직접 추가 기능 작업, 차량 유종 필터 저장 기능, 튜토리얼 페이지 개선 등의 기존
                기능 유지보수 및 새로운 기능을 추가 개발하였습니다. 또한, 차량 수정/생성시 debounce 되도록 최적화,
                이미지 lazy loading 적용, 디자인 개선등의 작업을 통해 머핀 앱 최적화 작업을 진행했습니다.
              </li>
            </ul>
          </div>
        </section>
        <br />
        <div className="title-lg mt-16">
          <a href="https://finda.co.kr/" target="_blank" rel="noreferrer noopener">
            finda
          </a>
        </div>
        <p>세상에 없던 대출 비교 플랫폼, 핀다</p>
        <div>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Period </strong>
            <span className="col-8">2022.05 ~ 2023.09</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Position </strong>
            <span className="col-8">Frontend(Web), 대출 그로스, 인앱약정 2PT, 금융상품 PG</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Projects </strong>
            <span className="col-8">
              <a href="https://finda.co.kr/" target="_blank" rel="noreferrer noopener">
                핀다 웹사이트
              </a>
              ,{' '}
              <a href="https://apps.apple.com/KR/app/id1494077875?mt=8" target="_blank" rel="noreferrer noopener">
                핀다 웹앱
              </a>
            </span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Tech </strong>
            <span className="col-8">React, Next.js, Typescript, Redux, Tailwind, Emotion, Cypress, Storybook</span>
          </p>
          <hr />
        </div>
        <div className="mt-5">
          <h4 className="mb-1">금융상품 PG (비교대출 PT)</h4>
          <p>
            <span className="highlight-gray">Frontend Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2022.12 - 2023.09</span>
          </p>
          <h4>Description.</h4>
          <p>
            핀다의 메인 프로덕트인 <b>'비교 대출'</b> 금융 서비스를 맡아 프론트엔드 개발을 작업하였습니다. 기존의 비교
            대출 앱 페이지들을 웹 페이지로 이전하고, 리뉴얼 및 새로운 기능 추가 등의 개발을 맡았습니다. 2명의 FE
            개발자와 2명의 ios / Aos 개발자, 백엔드 개발자, 디자이너, PO와 함 팀을 이뤄 애자일 프로세스로 작업을
            진행했습니다.
            <br />
            <br />
            React, Next.js, Typescript, Redux, Tailwind, msw를 이용해 개발했습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              기존 비교 대출 인트로 페이지를 리뉴얼하고, 웹으로 이전하는 작업을 진행했습니다. 기획부터 디자인, API 설계,
              프론트개발까지 일주일이라는 짧은 시간에 작업하며 애자일 프로세스를 경험할 수 있었습니다. A/B 테스트 결과,
              개선된 인트로 페이지를 본 사용자들의 <b>한도 조회 비율</b>이 이전 버전 인트로 조회 사용자에 비해{' '}
              <b>9% 상승</b>하였습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/work/intro-detail" target="_blank" rel="noreferrer noopener">
                [예시]
              </a>{' '}
              <a href="https://www.ekn.kr/web/view.php?key=20221206010001084" target="_blank" rel="noreferrer noopener">
                [관련 기사]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              대출 한도 조회시 사용자들이 대출 의사결정을 더 쉽게 할 수 있는 <b>'대출 의사결정 개선'</b> 프로젝트를
              작업했습니다. 프론트엔드 페이지 개발 및 설계를 주도하여 기존 대출 한도 조회 앱 페이지들을 웹으로 이전하는
              작업을 맡아 하였습니다. 구체적으로 대출 한도 조회 리스트, 상세 페이지, 부결 페이지, 미승인 리스트 등의
              페이지를 작업했으며, 확장성 있는 설계와 효율적인 컴포넌트화에 집중하여 개발했습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/work/improve-detail" target="_blank" rel="noreferrer noopener">
                [예시]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              대환대출 서비스를 런칭하며 인트로페이지 리뉴얼 작업을 진행했습니다. 중요한 페이지이기 때문에, 사용자
              반응을 관찰하고 오류 현황을 분석하기 위해 웹에서 <b>AB 테스트</b>를 적용하여 50%에서 100%까지 점진적으로
              페이지를 배포하였습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/work/refinance-intro" target="_blank" rel="noreferrer noopener">
                [예시]
              </a>
            </li>
          </ul>
        </div>
        <br />
        <div className="mt-5">
          <h4 className="mb-1">인앱약정 2PT</h4>
          <p>
            <span className="highlight-gray">Frontend Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2022.09 - 2023.01</span>
          </p>
          <h4>Description.</h4>
          <p>
            핀다 앱 내에서 은행 대출 상품을 확인하고 바로 약정을 체결할 수 있는 제품, <b>인앱약정</b> 기능의 프론트엔드
            개발을 맡고 있습니다. 2명의 FE 개발자와 2명의 ios / Aos 개발자, 백엔드 개발자, 디자이너, PO와 함 팀을 이뤄
            애자일 프로세스로 작업을 진행했습니다.{' '}
            <a href="https://hayeon-blog.vercel.app/work/inapp-image" target="_blank" rel="noreferrer noopener">
              [예시]
            </a>
            <br />
            <br />
            React, Next.js, Typescript, Redux, Tailwind, msw를 이용해 개발했습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              인앱약정 프로세스 중 잦은 API를 호출하던 방식에서, Redux를 사용하여 상태값을 관리하고 최소한의 API 호출을
              할 수 있도록 설계를 개선했습니다. 15회이상 여러번 호출되던 API 횟수를 줄여 불필요한 서버 요청을 5단계로
              줄일 수 있었고, 프론트에서 Redux의 상태값을 바로 가져올 수 있도록 수정해 페이지 전환 속도를
              개선하였습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/work/inapp-detail-1" target="_blank" rel="noreferrer noopener">
                [상세 코드]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              기존에 앱과 웹 사이의 페이지 이동이 부자연스럽다는 피드백이 있어, 웹을 옆으로 넘길 때 앱처럼 작동할 수
              있는 transition을 적용했습니다. react-spring을 이용하여 웹에서도 앱처럼 자연스러운 모션으로 이동할 수
              있도록 사용성을 개선하였습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/work/inapp-detail-2" target="_blank" rel="noreferrer noopener">
                [상세 코드]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              주소 검색을 위한 API 연동 및 Intersection Observer를 이용한 무한 스크롤 도입을 작업했습니다. 한번에
              수백가지의 주소를 모두 가져오지 않고, 20개씩 끊어서 데이터를 가져올 수 있게 하여 사용자 경험을 개선하고
              성능을 최적화했습니다.
            </li>
            <li>
              3주 단위 스프린트(2주 기능개발, 1주 QA)로 애자일 개발 프로세스를 경험했습니다. 매 스프린트 마다 적극적인
              피드백을 주어 제품을 개선하였고, 구글 스프레드 시트에 자체 QA 사항을 체크하며 업무 상황을 공유하였습니다.
              탁월한 제품 개발과 함께 성장할 수 있는 개발 문화를 만들 수 있도록 노력했습니다.
            </li>
          </ul>
        </div>
        <br />
        <div className="mt-5">
          <h4 className="mb-1">대출 그로스팀</h4>
          <p>
            <span className="highlight-gray">Frontend Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2022.06 - 2022.11</span>
          </p>
          <h4>Description.</h4>
          <p>
            핀다의 <b>‘개인화된 금융 서비스를 더욱 빠르고 안정적이게 제공’</b>하는 목표를 가지고 마케팅 팀과 협업,
            디자인 시스템 구축의 업무를 맡고 있습니다. 특히, 핀다 내 컴포넌트의 재사용성을 높이고 관리하기 쉬운 디자인
            시스템을 구축하기 위해{' '}
            <a href="https://storybook.js.org/" target="_blank" rel="noreferrer noopener">
              Storybook
            </a>
            을 주도하여 개발, 관리하고 있습니다.
            <br />
            <br />
            React, Next.js, Typescript, Redux, Tailwind, Storybook, styled-components를 이용해 개발했습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              디자인팀과 협업하여 디자인 시스템을 구축하였습니다. 기존 핀다 컴포넌트를 Storybook에 모두 정리하여
              디자이너와 개발자간의 커뮤니케이션 비용과 프론트엔드 개발자의 컴포넌트 적용 시간을 개선하였습니다. (Jira
              협업 요청 20% 개선)
            </li>
            <li>
              Storybook을 주도적으로 관리하고 있으며, 팀원간 내용 공유를 위해 Storybook 사용 방법을 디자인팀 / Tech
              전체팀에 발표하였습니다. 또현, 기존 컴포넌트를 최신화하여 전체적인 디자인을 변경 작업중입니다. 핀다 제품의
              통일성을 증대시키고, 사용자 경험을 개선하는데 노력하고 있습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/220919-storybook/" target="_blank" rel="noreferrer noopener">
                [참고 링크]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              마케팅팀과 협업하여 후순위 담보 대출 인트로 페이지 작업을 진행했습니다. Tailwind의{' '}
              <code>transition-transform</code>, <code>transform</code>, <code>duration</code>, <code>ease-in-out</code>
              등 transition 클래스를 활용하여 재사용 가능한 자동 롤링 배너를 개발했습니다. 코드 재사용을 가능하게 하여
              개발 효율성을 증대시켰으며, transition css를 활용하여 자연스러운 전환 효과를 적용하였습니다.{' '}
            </li>
          </ul>
          {/* <h4>What I learned.</h4>
          <ul className="bulleted-list">
            <li>내용이 들어갑니다</li>
          </ul>
          <ul className="bulleted-list">
            <li>내용이 들어갑니다</li>
          </ul>
          <ul className="bulleted-list">
            <li>내용이 들어갑니다</li>
          </ul> */}
        </div>
        <br />
        <div className="mt-5">
          <h4 className="mb-1">Frontend(Web)</h4>
          <p>
            <span className="highlight-gray">Frontend Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2022.05 - 2023.09</span>
          </p>
          <h4>Description.</h4>
          <p>
            핀다의{' '}
            <a href="https://finda.co.kr/" target="_blank" rel="noreferrer noopener">
              웹사이트
            </a>
            를 개발하고 유지보수하는 업무를 맡고 있습니다. 효율성을 극대화 하기 위한 모바일 콘솔 적용, 레거시 클래스
            코드를 함수형 코드로 리팩터링 (전세/오토/신용 대출 상품 페이지), 피플팀과 협업하여 채용페이지 관리 등의
            업무를 맡았습니다.
            <br />
            <br />
            React, Next.js, Typescript, Redux, Tailwind, styled-components, Cypress, Jest를 이용해 개발했습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              사내 프론트엔드 팀 내에서 기술 세미나 및 스터디에 적극적으로 참여했습니다. PR이 올라오면 주도적으로 코드
              리뷰를 하였고, 동료들의 피드백을 반영하여 코드를 리팩토링 하였습니다. 혼자만 공부하는 개발자가 아니라,
              함께 공유하고 소통하는 건강한 개발 문화를 위해 노력하였습니다.
            </li>
            <li>
              <a
                href="https://hayeon-blog.vercel.app/220622-debugging-tools-vconsole/"
                target="_blank"
                rel="noreferrer noopener"
              >
                모바일 웹 콘솔 (vconsole)
              </a>
              을 도입하여 stage, devstage에서 효율적인 디버깅을 할 수 있도록 기여했습니다. 핀다 앱 사용성을 해치지 않기
              위해 5회이상 빠르게 연타 할 때에만 웹 콘솔이 뜰 수 있도록 적용했습니다. 기존의{' '}
              <code>stage, devstage 오류 발견 - 로컬 환경 설정 - 로컬에서 모바일 테스트</code> 단계에서, 바로{' '}
              <code>stage, devstage에서 오류 발견 및 테스트</code>를 할 수 있도록 테스트 과정을 축소시켰습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/work/web-detail-1" target="_blank" rel="noreferrer noopener">
                [상세 코드]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              v1 레거시를 v2로 변경하는 작업을 통해 데이터 로딩 속도 개선 및 최신 문법으로 코드 베이스를
              업데이트했습니다. 기존 Class component의 v1 코드를 Functional Component로 개선하여 v2 프로젝트로
              이전하였습니다. 또한, 레거시 API 속도가 느리다는 단점을 보완하기 위해 자주 찾는 페이지들에 SSG(Static Side
              Generation)를 적용하였습니다. 그 결과 4초 이상 걸리던 API 요청이 0.5초로 개선 되었습니다.
            </li>
            <li>
              Jest 및 Cypress로 자주 사용되는 대출 상품 hook 테스트 코드를 작성하였습니다. 대출 상품 정렬 필터 hook,
              pagination hook, 대출 상품 form hook 등 사용자들이 자주 호출하는 hook등이 잘 작동하는지 확인할 수 있는
              테스트 코드를 작성했습니다. 프로덕션 배포 전에 코드 에러가 있는지 테스트 할 수 있었고, 개발자가 직접
              하나씩 테스트하는 시간을 줄일 수 있었습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              피플팀과 협업하여 채용 페이지 디자인 개선 및 그리팅 링크 추가 작업을 진행했습니다. 피플팀과의 커뮤니케이션
              시간을 줄이기 위해, 피플팀이 직접 Google Spread Sheet로 채용 공고를 변경할 수 있도록 설계를 개선했습니다.
              예외 상황에 대비하여, 실제 데이터 적용 시간은 <code>revalidate 60*60</code>을 주어 한 시간 후 적용될 수
              있도록 작업했습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              기존 Bitbucket에서 사용하던 모놀리식 레포를, Github에 이전하며 <b>모노레포</b> 구조로 변경하는 작업을
              진행했습니다.{' '}
              <a href="https://finda.co.kr/" target="_blank" rel="noreferrer noopener">
                핀다 웹 페이지
              </a>
              를 담당하여 모노레포 이전작업을 진행했습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              디자인팀과 협업하여 핀다 웹 컴포넌트를 공통 컴포넌트로 이전하는 작업을 주도하여 진행했습니다.
              타이포그래피, Spacing, 버튼, CTA 등 <b>새로운 공통 컴포넌트</b>를 생성하여 웹팀분들이 빠르게 적용할 수
              있도록 하였고, 디자인 및 마케팅팀과 원활한 협업을 위해 storybook을 관리했습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/work/design-system" target="_blank" rel="noreferrer noopener">
                [예시]
              </a>
            </li>
          </ul>
        </div>
        <br />
        <br />
        <div className="title-lg ">
          <a target="_blank" rel="noreferrer noopener" href="https://insomenia.com/">
            Insomenia
          </a>
        </div>
        <p>스타트업 플랫폼 1등 개발사, 인썸니아</p>
        <div>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Period </strong>
            <span className="col-8">2020.05 ~ 2022.04</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Position </strong>
            <span className="col-8">개발 2팀 팀장(책임), 개발 1팀 팀원(프리랜서) / Full-Stack Developer</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Projects </strong>
            <span className="col-8">
              프랜차이즈 관리 웹 서비스, 다이어트 관리 웹앱, 인플루언서 매칭 서비스, 중고 거래 웹앱, 패션 SNS 쇼핑몰 등
              10개의 초기 스타트업 서비스
            </span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Tech </strong>
            <span className="col-8">
              React, Next.js, Typescript, Recoil, React-Query, Tailwind, AWS (S3, EC2, Amplify, RDS, Cognito) / Ruby,
              Ruby on Rails, Framework7
            </span>
          </p>
          <hr />
        </div>
        <div className="mt-5">
          <h4 className="mb-1">개발 2팀 팀장(책임)</h4>
          <p>
            <span className="highlight-gray">Software Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2021.04-2022.04</span>
          </p>
          <h4>Description.</h4>
          <p>
            책임 프론트엔드 개발자로서 5개의 초기 스타트업 웹/웹앱 서비스 개발했습니다. 제품 초기 세팅부터 기능 개발,
            리팩토링, 퍼블리싱, 유지보수를 맡았습니다. 고객사와 실시간으로 소통하며 애자일한 프로세스를 경험할 수
            있었습니다.
            <br />
            <br />
            React, Next.js, Typescript, Recoil, React-Query, Tailwind, AWS (S3, EC2, Amplify, RDS, Cognito)를 이용해
            개발했습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              Rails(BE)와 React(FE)를 이용한 5개의 초기 스타트업 웹 서비스를 개발 및 유지보수 했습니다. Next.js/
              Node.js/ Prisma를 이용해 프론트엔드 개발을 고도화했습니다. 여러가지 기술과 포지션을 맡아 개발에 대한
              폭넓은 이해를 할 수 있었고, Frontend / Backend / 퍼블리싱 / Devops 등 다양한 경험을 할 수 있었습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              React 활용한 인썸니아 내부 빌더를 제작에 참여했습니다. 프로젝트 초기 세팅 시 기본적으로 들어가는
              기능들을(좋아요, 상품 리스트, 게시판, 로그인/회원가입, 장바구니 등) 함께 개발하였고, 다른 개발자 분들의
              초기 프로젝트 세팅 개발 시간을 줄일 수 있었습니다. (약 80시간 단축)
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              AWS 서비스를 이용한 사용자 관리(Cognito) 및 배포 (ec2, s3)를 작업했습니다. 기존 MVP 서비스를 더욱 안정성
              있는 AWS 서비스로 이전함으로써 서비스의 보안과 확장성을 고려한 설계를 하였습니다.
            </li>
            <li>
              약 20개의 사내 기술 도큐를 작성하여 개발자들에게 문제 해결 과정을 공유하였습니다. 혼자서만 기술을 배우고
              끝내는 것이 아니라, 모두에게 과정 및 결과를 공유함으로써 함께 성장하는 개발 문화 정착에 기여했습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/210906-rails-axlsx/" target="_blank" rel="noreferrer noopener">
                [예시 1]
              </a>
              ,{' '}
              <a href="https://hayeon-blog.vercel.app/210906-rubyzip/" target="_blank" rel="noreferrer noopener">
                [예시 2]
              </a>
              ,{' '}
              <a href="https://hayeon-blog.vercel.app/210910-ios-video/" target="_blank" rel="noreferrer noopener">
                [예시 3]
              </a>
            </li>
          </ul>
        </div>
        <br />
        <div className="mt-5">
          <h4 className="mb-1">개발 1팀 팀원 (프리랜서)</h4>
          <p>
            <span className="highlight-gray">Software Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2020.05-2021.03</span>
          </p>
          <h4>Description.</h4>
          <p>
            Ruby on Rails 풀스택 개발자로 5가지의 초기 스타트업 웹/웹앱 서비스를 개발, 유지보수를 진행했습니다. 고객사와
            실시간으로 소통하며 우선순위에 맞게 MVP 기능을 개발하는 중요성을 배웠습니다.
            <br />
            <br />
            Ruby, Ruby on Rails, Framework7를 이용해 개발했습니다.
          </p>
          <h4>What I did.</h4>
          <p>
            <span className="highlight-gray">2020.05-2021.03</span>
          </p>
          <ul className="bulleted-list">
            <li>
              Rails와 framework7을 이용한 다섯 가지의 웹 서비스 개발 및 유지보수를 작업했습니다. DB 설계부터 프로젝트
              초기 세팅, 상세 기능 개발, 어드민 개발, QA, 그리고 유지 보수까지 MVP 서비스를 처음부터 끝까지 주도하여
              개발해보는 경험을 할 수 있었습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              디자이너가 전달해준 디자인 피그마를 참고하여 퍼블리싱 작업을 하였습니다.{' '}
              <a href="https://hayeon-blog.vercel.app/221029-BEM/" target="_blank" rel="noreferrer noopener">
                BEM(Block, Element, Modifier)
              </a>{' '}
              방식으로 커스텀 클래스를 만들어 CSS를 적용했습니다. 클래스 구조를 먼저 설계한 후, 비슷한 요소들끼리 묶어서
              Block, Element, Modifier를 하나씩 추가하며 작업하여 코드를 더 간결하고 체계적이게 개선할 수 있었습니다.
            </li>
            <li>
              사용자의 입장에서 UI가 편리한지, 뒤로가기 플로우는 자연스러운지, 모호한 버튼 및 워딩이 없는지 섬세하게
              체크하며 수정이 필요한 부분은 고객사와 직접 논의하여 반영하였습니다.
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Work
