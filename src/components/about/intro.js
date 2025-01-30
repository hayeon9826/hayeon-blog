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
          <a href="https://www.npmjs.com/package/hello-design-system" target="_blank" rel="noreferrer noopener">
            npm 라이브러리 제작 경험
          </a>
          을 키우며 기술에 기여하는 것을 좋아합니다.
        </p>
        <p className="fs-6">
          스타트업 전문 개발사에서 2년간 약 10여 개의 스타트업 MVP를 출시하며 문제를 빠르게 해결하고, 동료들과의 협업과
          애자일 프로세스를 경험했습니다. 이후 핀테크 스타트업{' '}
          <a href="https://finda.co.kr/" target="_blank" rel="noreferrer noopener">
            핀다
          </a>
          에서 근무하며, 핀테크 도메인에 대한 깊은 이해를 바탕으로 페어 프로그래밍과 코드 리뷰를 통해 더욱 전문적인
          프론트엔드 개발자로 성장했습니다. 또한, SK 에너지에서 주유 멤버십 앱{' '}
          <a href="https://apps.apple.com/KR/app/id6445911244" target="_blank" rel="noreferrer noopener">
            '머핀'
          </a>
          의 프론트엔드 개발을 담당하며 디자인 시스템을 구축하고, Lighthouse 분석을 통한 웹 성능 최적화, GraphQL을
          이용한 BFF 설계와, 기존 React 프로젝트를 Next.js 14로 마이그레이션하는 작업을 성공적으로 수행했습니다.
        </p>
        <p className="fs-6">
          현재 LG AI 연구원에서 전문가용 대화형 AI 플랫폼{' '}
          <a href="https://www.lgresearch.ai/exaone" target="_blank" rel="noreferrer noopener">
            엑사원 (Exaone)
          </a>{' '}
          개발을 담당하고 있습니다. 엑사원 디자인 시스템을 처음부터 끝까지 설계하고 구축했으며, 라이브러리 배포 및 CI/CD
          설정 등을 수행하였습니다. 또한, 대규모 AI 서비스 개발을 위한 효율적인 프론트엔드 아키텍처 설계와 최적화를
          진행하고 있으며, 디자인과 개발의 일관성을 유지하기 위한 체계적인 컴포넌트 관리 및 성능 최적화를 경험하고
          있습니다.
        </p>
      </section>
    </>
  )
}

export default Intro
