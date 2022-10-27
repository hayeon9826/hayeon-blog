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
        <br />
        <div className="title-lg mt-16">
          <a href="https://finda.co.kr/" target="_blank" rel="noreferrer">
            finda
          </a>
        </div>
        <p>세상에 없던 대출 비교 플랫폼, 핀다</p>
        <div>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Period </strong>
            <span className="col-8">2022.05 ~ 재직중</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Position </strong>
            <span className="col-8">Frontend(Web), 대출 그로스, 인앱약정 2PT</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Projects </strong>
            <span className="col-8">
              <a href="https://finda.co.kr/" target="_blank" rel="noreferrer">
                핀다 웹사이트
              </a>
              ,{' '}
              <a href="https://apps.apple.com/KR/app/id1494077875?mt=8" target="_blank" rel="noreferrer">
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
          <h4 className="mb-1">인앱약정 2PT</h4>
          <p>
            <span className="highlight-gray">Frontend Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2022.09 - 현재</span>
          </p>
          <h4>Description.</h4>
          <p>
            핀다 앱 내에서 은행 대출 상품을 확인하고 바로 약정을 체결할 수 있는 제품,{' '}
            <a href="/work/inapp-detail-1" target="_blank">
              인앱약정
            </a>{' '}
            기능의 프론트엔드 개발을 맡고 있습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              인앱약정 프로세스 중 잦은 API를 호출하던 방식에서, Redux를 사용하여 상태값을 관리하고 최소한의 API 호출을
              할 수 있도록 설계를 개선했습니다. 15회이상 여러번 호출되던 API 횟수를 줄여 불필요한 서버 요청을 5단계로
              줄일 수 있었고, 프론트에서 Redux의 상태값을 바로 가져올 수 있도록 수정해 페이지 전환 속도를
              개선하였습니다.{' '}
              <a href="/work/inapp-detail-1" target="_blank">
                [링크]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              기존에 앱과 웹 사이의 페이지 이동이 부자연스럽다는 피드백이 있어, 웹을 옆으로 넘길 때 앱처럼 작동할 수
              있는 transition을 적용했습니다. react-spring을 이용하여 웹에서도 앱처럼 자연스러운 모션으로 이동할 수
              있도록 사용성을 개선하였습니다.{' '}
              <a href="/work/inapp-detail-2" target="_blank">
                [링크]
              </a>
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              주소 검색을 위한 API 연동 및 Intersection Observer를 이용한 무한 스크롤 도입을 작업했습니다. 한번에
              수백가지의 주소를 모두 가져오지 않고, 20개씩 끊어서 데이터를 가져올 수 있게 하여 사용자 경험을 개선하고
              성능을 최적화했습니다.
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
          <h4 className="mb-1">대출 그로스팀</h4>
          <p>
            <span className="highlight-gray">Frontend Engineer</span>
          </p>
          <p>
            <span className="highlight-gray">2022.06 - 현재</span>
          </p>
          <h4>Description.</h4>
          <p>
            핀다의 <b>‘개인화된 금융 서비스를 더욱 빠르고 안정적이게 제공’</b>하는 목표를 가지고 마케팅 팀과 협업,
            디자인 시스템 구축의 업무를 맡고 있습니다. 특히, 핀다 내 컴포넌트의 재사용성을 높이고 관리하기 쉬운 시스템
            구축하기 위해{' '}
            <a href="https://storybook.js.org/" target="_blank">
              디자인 시스템
            </a>
            을 주도하여 프론트엔드 개발을 작업중입니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              디자인팀과 협업하여 디자인 시스템을 구축하였습니다. 기존 핀다 컴포넌트를 스토리북에 모두 정리하여
              디자이너와 개발자간의 커뮤니케이션 비용과 프론트엔드 개발자의 컴포넌트 적용 시간을 개선하였습니다. (Jira
              협업 요청 20% 개선) 또한, 기존 컴포넌트를 최신화하여 전체적인 디자인을 변경 작업중입니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              마케팅팀과 협업하여 후순위 담보 대출 인트로 페이지 작업을 진행했습니다. Tailwind의 `transition-transform`,
              `transform`, `duration`, `ease-in-out`등 transition 클래스를 활용하여 자동 롤링 배너를 개발했습니다.
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
            <span className="highlight-gray">2022.05 - 현재</span>
          </p>
          <h4>Description.</h4>
          <p>
            핀다의 웹 페이지를 개발하고 유지보수하는 업무를 맡고 있습니다. 효율성을 극대화 하기 위한 모바일 콘솔 적용,
            레거시 클래스 코드를 함수형 코드로 리팩터링 (전세/오토/신용 대출 상품 페이지), 피플팀과 협업하여 채용페이지
            관리 등의 업무를 맡았습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              <a href="https://hayeondev.gatsbyjs.io/220622-debugging-tools-vconsole/" target="_blank" rel="noreferrer">
                모바일 웹 콘솔 (vconsole)
              </a>
              을 도입하여 stage, devstage에서 효율적인 디버깅을 할 수 있도록 기여했습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              v1 레거시를 v2로 변경하는 작업을 통해 데이터 로딩 속도 개선 및 최신 문법으로 코드 베이스를
              업데이트했습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>
              피플팀과 협업하여 채용 페이지 디자인 개선 및 그리팅 링크 추가 작업을 진행했습니다. 피플팀과의 커뮤니케이션
              시간을 줄이기 위해, 피플팀이 직접 Google Spread Sheet로 데이터를 변경할 수 있도록 설계를 개선했습니다.
              실제 데이터 적용 시간은 `revalidate 60*60`을 주어 한 시간 후 적용될 수 있도록 작업했습니다.
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
        <br />
        <div className="title-lg ">
          <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
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
            리팩토링, 퍼블리싱, 유지보수를 맡았습니다.
          </p>
          <h4>What I did.</h4>
          <ul className="bulleted-list">
            <li>
              Rails(BE)와 React(FE)를 이용한 5개의 초기 스타트업 웹 서비스를 개발 및 유지보수 했습니다. Next.js/
              Node.js/ Prisma를 이용해 프론트엔드 개발을 고도화했습니다.
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>React 활용한 인썸니아 내부 빌더를 제작했습니다.</li>
          </ul>
          <ul className="bulleted-list">
            <li>AWS 서비스를 이용한 사용자 관리(Cognito) 및 배포 (ec2, s3)를 작업했습니다.</li>
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
          <p>Ruby on Rails 풀스택 개발자로 5가지의 초기 스타트업 웹/웹앱 서비스를 개발, 유지보수를 진행했습니다.</p>
          <h4>What I did.</h4>
          <p>
            <span className="highlight-gray">2020.05-2021.03</span>
          </p>
          <ul className="bulleted-list">
            <li>Rails와 framework7을 이용한 웹 서비스 개발 및 유지보수를 작업했습니다.</li>
          </ul>
          <ul className="bulleted-list">
            <li>5개의 스타트업 웹앱 서비스 구현 및 런칭하였습니다.</li>
          </ul>
          <ul className="bulleted-list">
            <li>디자인 피그마를 참고하여 서비스 퍼블리싱 및 유지보수 작업을 진행했습니다.</li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Work
