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
              <a href="https://finda.co.kr/" target="_blank">
                핀다 웹사이트
              </a>
              ,{' '}
              <a href="https://apps.apple.com/KR/app/id1494077875?mt=8" target="_blank">
                핀다 웹앱
              </a>
            </span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Tech </strong>
            <span className="col-8">React, Next.js, Typescript, Redux, Tailwind, Cypress</span>
          </p>
          <hr />
        </div>
        <div className="mt-5">
          <p>
            <strong>인앱약정 2PT</strong>
          </p>
          <p>
            <span className="highlight-gray">2022.09 - 현재</span>
          </p>
          <ul className="bulleted-list">
            <li>핀다 앱 내에서 약정 확인 및 대출 연동을 할 수 있는 인앱약정 제품 개발</li>
          </ul>
          <ul className="bulleted-list">
            <li>react-spring을 이용하여 웹에서도 앱처럼 자연스로운 모션으로 이동할 수 있도록 개선</li>
          </ul>
          <ul className="bulleted-list">
            <li>주소 검색을 위한 API 연동 및 Intersection Observer를 이용한 무한 스크롤 도입</li>
          </ul>
        </div>
        <div className="mt-5">
          <p>
            <strong>대출 그로스팀</strong>
          </p>
          <p>
            <span className="highlight-gray">2022.06 - 현재</span>
          </p>
          <ul className="bulleted-list">
            <li>마케팅팀과 협업하여 후순위 담보 대출 인프로 페이지 작업 진행</li>
          </ul>
          <ul className="bulleted-list">
            <li>대출 그로스팀에서 ios, aos 팀원들과 협력하여 개인화된 금융 서비스를 더욱 빠르고 안정적이게 제공</li>
          </ul>
        </div>
        <div className="mt-5">
          <p>
            <strong>Frontend(Web)</strong>
          </p>
          <p>
            <span className="highlight-gray">2022.05 - 현재</span>
          </p>
          <ul className="bulleted-list">
            <li>
              <a href="https://hayeondev.gatsbyjs.io/220622-debugging-tools-vconsole/" target="_blank">
                모바일 웹 콘솔 (vconsole)
              </a>
              을 도입하여 stage, devstage에서 효율적인 디버깅을 할 수 있도록 기여
            </li>
          </ul>
          <ul className="bulleted-list">
            <li>v1 레거시를 v2로 변경하는 작업을 통해 데이터 로딩 속도 개선 및 최신 문법으로 코드 베이스를 업데이트</li>
          </ul>
          <ul className="bulleted-list">
            <li>피플팀과 협업하여 채용 페이지 디자인 개선 및 그리팅 링크 추가 작업 진행</li>
          </ul>
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
            <span className="col-8">2020.05 ~ 2021.03 / 2021.04 ~ 2022.04</span>
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
        <p className="mt-5">
          <strong>개발 2팀 팀장(책임)</strong>
        </p>
        <p>
          <span className="highlight-gray">2021.04-2022.04</span>
        </p>
        <ul className="bulleted-list">
          <li>Rails(BE)와 React(FE)를 이용한 5개의 초기 스타트업 웹 서비스 개발 및 유지보수</li>
        </ul>
        <ul className="bulleted-list">
          <li>React 활용한 인썸니아 내부 빌더 제작</li>
        </ul>
        <ul className="bulleted-list">
          <li>Next.js/ Node.js/ Prisma를 이용한 웹 서비스 다수 개발 및 유지보수</li>
        </ul>
        <ul className="bulleted-list">
          <li>AWS 서비스를 이용한 사용자 관리(Cognito) 및 배포 (ec2, s3)</li>
        </ul>
        <br />
        <p>
          <strong>개발 1팀 팀원 (프리랜서)</strong>
        </p>
        <p>
          <span className="highlight-gray">2020.05-2021.03</span>
        </p>
        <ul className="bulleted-list">
          <li>Rails와 framework7을 이용한 웹 서비스 개발 및 유지보수</li>
        </ul>
        <ul className="bulleted-list">
          <li>5개의 스타트업 웹앱 서비스 구현 및 런칭</li>
        </ul>
      </section>
    </>
  )
}

export default Work
