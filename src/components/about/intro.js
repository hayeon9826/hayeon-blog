import React from 'react'

const Intro = () => {
  return (
    <>
      <section className="about-intro mb-32">
        <h1>
          <span className="title-primary" style={{ borderBottom: '0.05em solid' }}>
            <span>Introduction.</span>
          </span>
        </h1>
        <p className="fs-6">
          {' '}
          대출 비교 핀테크{' '}
          <a href="https://finda.co.kr/" target="_blank" rel="noreferrer">
            '핀다'
          </a>
          에서 2년차 프론트엔드 개발자로 일하고 있는 김하연 입니다. 주로 React와 Next.js를 이용해서 사내 프로젝트 및
          개인 프로젝트를 작업하고 있습니다. 새로운 기술의 습득을 좋아하며, 사내 스터디 및{' '}
          <a href="https://hayeondev.gatsbyjs.io/" target="_blank" rel="noreferrer">
            블로그
          </a>
          를 통해 개념을 문서화하여 정리하는 것을 좋아합니다.
        </p>
        {/* <p className="fs-6">
          전국 대학생 연합 프로그래밍 동아리 활동을 계기로 2년의 운영진 활동, 세 번의 서비스 런칭, 스타트업 전문 개발사,
          그리고 핀테크 스타트업을 경험하며 더욱 전문적인 개발자로 성장하고 있습니다.
        </p> */}
        <p className="fs-6">
          직접 기획한 서비스를 개발/배포/운영한 경험이 다수 있으며 주로 모바일앱과 반응형 웹 개발을 담당하고 있습니다.
          새로운 기술을 열정적이고 빠르게 습득하며, 고객사, 디자이너, 기획사, 개발자등 여러 직무와 함께 협업한 경력을
          바탕으로 팀원들 간의 협업과 소통을 중요시합니다.
        </p>
      </section>
    </>
  )
}

export default Intro
