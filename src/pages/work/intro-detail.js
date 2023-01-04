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
              <li>기존 비교대출 인트로 페이지를 리뉴얼하고, 웹으로 이전하는 작업을 진행했습니다.</li>
              <li>
                개선된 인트로 페이지를 본 사용자들의 <b>한도 조회 비율</b>이 이전 버전 인트로 조회 사용자에 비해{' '}
                <b>9% 상승</b>하였습니다.
              </li>
            </ul>
            <h4>Example</h4>
            <div className="mt-5 row">
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210413296-082396f5-d249-4d31-b91c-88bfa9a256bf.png"
                  alt="비교대출 인트로 예시"
                />
              </div>
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210413310-58247f38-5012-42fd-8ace-9fc65350898b.png"
                  alt="비교대출 인트로 예시"
                />
              </div>
            </div>
            <div className="mt-5 row">
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210413321-f38eaf0c-bc47-46a5-a4be-8916a3f5a973.png"
                  alt="비교대출 인트로 예시"
                />
              </div>
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210413335-0d2d36e5-2b39-4c4c-a02f-f1b800200ac1.png"
                  alt="비교대출 인트로 예시"
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Work
