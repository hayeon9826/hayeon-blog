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
              <li>
                대출 한도 조회시 사용자들이 대출 의사결정을 더 쉽게 할 수 있는 '대출 의사결정 개선' 프로젝트를
                작업했습니다.
              </li>
              <li>
                대출 한도 조회로 나온 결과 리스트 및 상세 페이지를 웹으로 이전하고, 사용성을 개선하는 작업을
                진행했습니다.
              </li>
            </ul>
            <h4>Example</h4>
            <div className="mt-5 row">
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210414635-fbb235f8-f6a1-4a94-b02f-0e16dec38867.png"
                  alt="대출 의사결정 개선 예시"
                />
              </div>
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210414671-2759a4ac-159f-47b9-a414-2d14bfef29ec.png"
                  alt="대출 의사결정 개선 예시"
                />
              </div>
            </div>
            <div className="mt-5 row">
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210414810-9cbc0ac2-475c-48d1-83fb-5f5728fa97fd.png"
                  alt="대출 의사결정 개선 예시"
                />
              </div>
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210414684-264e9872-8e45-45c5-9a27-b4c3b0f98704.png"
                  alt="대출 의사결정 개선 예시"
                />
              </div>
            </div>
            <div className="mt-5 row">
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210414707-1d1576bf-3cbe-46a8-af1d-e8fb04f063ce.png"
                  alt="대출 의사결정 개선 예시"
                />
              </div>
              <div className="col shadow mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/210414720-ece5a73f-fa3b-4df2-8bbe-9d21e2f50d71.png"
                  alt="대출 의사결정 개선 예시"
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
