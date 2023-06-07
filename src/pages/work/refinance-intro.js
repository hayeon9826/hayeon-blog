import React from 'react'
import Layout from '../../components/layout'

const Work = () => {
  return (
    <>
      <Layout title="Hayeon Resume">
        <section className="about-work mb-32 mt-20">
          <div className="mt-5">
            <h4>What I did.</h4>
            <ul className="bulleted-list">
              <li>기존 비교대출 인트로 페이지를 대환대출 페이지로 리뉴얼했습니다.</li>
              <li>
                AB 테스트를 적용하여 점진적으로 50%에서 100%로 모든 사용자 대상으로 변경된 인트로 화면을 적용했습니다.
              </li>
            </ul>
            <h4>Example</h4>
            <div className="mt-5 row">
              <div className="col shadow mx-2">
                <img src="/images/work/refinance/refinance_1.jpeg" alt="대환대출 인트로 예시" />
              </div>
              <div className="col shadow mx-2">
                <img src="/images/work/refinance/refinance_2.jpeg" alt="대환대출 인트로 예시" />
              </div>
            </div>
            <div className="mt-5 row">
              <div className="col shadow mx-2">
                <img src="/images/work/refinance/refinance_3.jpeg" alt="대환대출 인트로 예시" />
              </div>
              <div className="col shadow mx-2">
                <img src="/images/work/refinance/refinance_4.jpeg" alt="대환대출 인트로 예시" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Work
