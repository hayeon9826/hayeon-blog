import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Work = () => {
  return (
    <>
      <section className="about-work">
        <h1>
          <span style={{ borderBottom: '0.05em solid' }}>
            <span className="title-primary">Work Experience.</span>
          </span>
        </h1>
        <div className="title-lg">
          <a href="https://finda.co.kr/" target="_blank" rel="noreferrer">
            finda
          </a>
        </div>
        <p>세상에 없던 대출 비교 플랫폼, 핀다</p>
        <p>
          <strong>FE 개발 (Tech/대출 그로스팀)</strong>
        </p>
        <p>
          <span className="highlight-gray">2022.05 - 현재</span>
        </p>
        <ul className="bulleted-list">
          <li>모바일 웹 콘솔 (vconsole)을 도입하여 stage, devstage에서 효율적인 디버깅을 할 수 있도록 기여</li>
        </ul>
        <ul className="bulleted-list">
          <li>v1 레거시를 v2로 변경하는 작업을 통해 데이터 로딩 속도 개선 및 최신 문법으로 코드 베이스를 업데이트</li>
        </ul>
        <ul className="bulleted-list">
          <li>피플팀과 협업하여 채용 페이지 디자인 개선 및 그리팅 링크 추가 작업 진행</li>
        </ul>
        <ul className="bulleted-list">
          <li>마케팅팀과 협업하여 후순위 담보 대출 인프로 페이지 작업 진행</li>
        </ul>
        <ul className="bulleted-list">
          <li>대출 그로스팀에서 ios, aos 팀원들과 협력하여 개인화된 금융 서비스를 더욱 빠르고 안정적이게 제공</li>
        </ul>
        <br />
        <div className="title-lg">
          <a target="_blank" rel="noreferrer" href="https://insomenia.com/">
            Insomenia
          </a>
        </div>
        <p>스타트업 플랫폼 1등 개발사, 인썸니아</p>
        <p>
          <strong>개발 2팀 팀장(책임)</strong>
        </p>
        <p>
          <span className="highlight-gray">2021.04-2022.04</span>
        </p>
        <ul className="bulleted-list">
          <li>Rails(BE)와 React(FE)를 이용한 웹 서비스 개발 및 유지보수, React 활용한 인썸니아 내부 빌더 제작 참여</li>
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
