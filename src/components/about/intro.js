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
          4년차 프론트엔드 개발자 김하연입니다. 문제를 끝까지 파고들어 해결하는 경험을 중요시하며,{' '}
          <a href="https://hayeon-blog.vercel.app/?category=Study" target="_blank" rel="noreferrer">
            사내 스터디
          </a>{' '}
          및{' '}
          <a href="https://hayeon-blog.vercel.app/" target="_blank" rel="noreferrer">
            블로그
          </a>
          를 통해 해결과정을 기록하는 것을 좋아합니다. 적극적인 코드리뷰와 동료들과 기술 공유하는 것을 즐기고, 토이
          프로젝트를 통해 아이디어를 직접 실현하는 것에 큰 흥미를 느낍니다.
        </p>
        <p className="fs-6">
          전국 대학 연합{' '}
          <a href="https://www.likelion.net/" target="_blank">
            프로그래밍 동아리
          </a>{' '}
          활동에서의 2년간의 운영진 활동, 그리고 세 번의 서비스 런칭을 시작으로 개발자의 커리어를 시작하게 되었습니다.
          스타트업 전문 개발사에서 2년간 약 10여개의 스타트업 MVP 출시하며 문제를 빠르게 해결하고 동료들과 함께 성장하는
          문화, 그리고 애자일 프로세스를 경험했습니다. 이후, 핀테크 스타트업을 경험하며 핀테크 도메인에 대한 이해를
          높이고 페어 프로그래밍, 적극적인 코드리뷰, 사내 프론트엔드 개발 스터디 활동을 통해 더욱 전문적인 프론트엔드
          개발자로 성장하였습니다. 현재는 SK 에너지에서{' '}
          <a href="https://muffin.page.link/6Tkp" target="_blank" rel="noreferrer">
            주유, 충전, 멤버십 서비스 '머핀'
          </a>
          을 개발하며 버티컬 서비스 개발과 디자인 시스템을 구축하고 있습니다. 디자이너와 협력하여 디자인 시스템을
          구축하고 기존 React 프로젝트를 Next.js 14로 이전하는 작업을 진행하였습니다. 또한, Lighthouse 분석을 통한 웹
          성능 최적화, Graphql를 이용한 BFF 등을 작업하며 프론트엔드 기술을 활용한 전문성을 쌓고 있습니다.
        </p>
        <p className="fs-6">
          직접 기획한 서비스를 개발/배포/운영한 경험이 다수 있으며 주로 모바일앱과 반응형 웹 개발을 담당하고 있습니다.
          새로운 기술을 열정적이고 빠르게 습득하며, 고객사, 디자이너, 기획사, 개발자등 여러 직무와 함께 일한 경험을
          바탕으로 팀원들 간의 협업과 소통을 중요시합니다.
        </p>
      </section>
    </>
  )
}

export default Intro
