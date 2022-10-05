import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const DevLife = () => {
  return (
    <>
      <section className="about-devlife mb-32">
        <h1>
          <span className="title-primary">
            <span style={{ borderBottom: '0.05em solid' }}>Dev Life.</span>
          </span>
        </h1>
        <details>
          <summary>Dev Life 상세보기</summary>
          <div className="column-list">
            <div style={{ width: '33.333333333333336%' }} className="column">
              <h4>SCHOOL</h4>
              <p>
                <strong>2020</strong> 멋쟁이사자처럼 운영진
              </p>
              <p>
                <strong>2020</strong> 난민 커피 구매 모바일{' '}
              </p>
              <p>웹 사이트 Blend 개발</p>
              <p>
                <strong>2019</strong> 신촌 해커톤 'LIKEOWL' 개최 및 운영
              </p>
              <p>
                <strong>2019</strong> 배리어프리 여행 서비스 Wheel-ing 개발
              </p>
              <p>
                <strong>2019</strong> 멋쟁이사자처럼 운영진 활동 (django 코딩 교육)
              </p>
              <p>
                <strong>2018</strong> 멋쟁이사자처럼 전국 해커톤 참석
              </p>
              <p>
                <strong>2018</strong> 멋쟁이사자처럼 6기 수료
              </p>
            </div>
            <div style={{ width: '33.333333333333336%' }} className="column">
              <h4>PROJECT</h4>
              <p>
                <strong>2020</strong> 피부 관리 O2O 채팅 서비스 '피링' 개발
              </p>
              <p>
                <strong>2019</strong> 학회 소개 사이트 'CAC' 개발
              </p>
              <p>
                <strong>2019 </strong>학술지 크롤링 사이트
              </p>
              <p>'Asianalyse' 개발</p>
              <p>2019 마스크팩 추천 커머스 </p>
              <p>'hiskin' 개발</p>
              <p>
                <strong>2019</strong> 웹진 서비스, Segan 개발
              </p>
            </div>
            <div style={{ width: '33.33333333333333%' }} className="column">
              <h4>WORK</h4>
              <p>
                <strong>2022.05</strong>
              </p>
              <p>대출 비교 플랫폼, 핀다 입사 (Frontend / Web)</p>
              <p>
                <strong>2021.04 ~ 2022.02</strong>
              </p>
              <p>스타트업 서비스 및 내부 빌더 개발</p>
              <p>
                <strong>2021.04</strong> 인썸니아 정규직 입사
              </p>
              <p>(팀장 전환)</p>
              <p>
                <strong>2020.05 ~ 2021.03</strong>
              </p>
              <p>스타트업 서비스 다수 개발</p>
              <p>
                <strong>2020.05</strong> 인썸니아 프리랜서 계약 (팀원)
              </p>
            </div>
          </div>
          <figure className="image">
            <StaticImage
              formats={['auto', 'webp', 'avif']}
              src="../../images/timeline.png"
              width={640}
              height={240}
              quality={95}
              alt="timeline picture"
            />
          </figure>
        </details>
      </section>
    </>
  )
}

export default DevLife
