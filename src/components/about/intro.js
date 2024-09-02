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
          4년차 프론트엔드 개발자 김하연입니다. 문제 해결에 열정을 가지고 있으며, 해결 과정의 기록과 공유를
          중요시합니다. 사내 스터디와 블로그를 통해 학습과 성장을 지속하며, 적극적인 코드 리뷰와 동료들과의 기술 공유를
          즐깁니다. SaaS 토이 프로젝트를 통해 아이디어를 실현하는 데 큰 흥미를 느끼며, 새로운 기술을 도입하고 적용하는
          것을 좋아합니다. 또한, 오픈소스 및{' '}
          <a href="https://www.npmjs.com/package/hello-design-system" target="_blank">
            npm 라이브러리 제작 경험
          </a>
          을 키우며 기술에 기여하는 것을 좋아합니다.
        </p>
        <p className="fs-6">
          <a href="https://likelion.net/" target="_blank">
            전국 연합 프로그래밍 동아리
          </a>{' '}
          운영진으로 활동하며 세 번의 서비스 런칭을 경험한 것을 시작으로 개발자로서의 커리어를 쌓아왔습니다. 스타트업
          전문 개발사 인썸니아에서 2년간 약 10여 개의 스타트업 MVP를 출시하며 문제를 빠르게 해결하고, 동료들과의 협업과
          애자일 프로세스를 경험했습니다. 이후 핀테크 스타트업{' '}
          <a href="https://finda.co.kr/" target="_blank">
            핀다
          </a>
          에서 근무하며, 핀테크 도메인에 대한 깊은 이해를 바탕으로 페어 프로그래밍과 코드 리뷰를 통해 더욱 전문적인
          프론트엔드 개발자로 성장했습니다.
        </p>
        <p className="fs-6">
          현재 SK 에너지에서 주유 멤버십 앱{' '}
          <a href="https://apps.apple.com/KR/app/id6445911244" target="_blank">
            '머핀'
          </a>
          의 프론트엔드 개발을 담당하고 있습니다. 디자이너와 협력하여 디자인 시스템을 구축하고, 기존 React 프로젝트를
          Next.js 14로 마이그레이션하는 작업을 성공적으로 수행했습니다. 또한, Lighthouse 분석을 통한 웹 성능 최적화와
          GraphQL을 이용한 BFF 설계 등을 통해 프론트엔드 기술의 전문성을 더욱 강화하고 있습니다.
        </p>
      </section>
    </>
  )
}

export default Intro
