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
                레거시 CTA 버튼을 최신화된 디자인으로 공통 컴포넌트화 하였고, 모든 페이지에 적용할 수 있도록
                가이드라인을 생성했습니다.
              </li>
              <li>동료 웹 개발자분들과 협업하여 모든 페이지의 CTA 버튼 및 팝업 버튼을 변경하였습니다.</li>
              <li>디자인팀, 마케팅팀과의 원활한 협업을 위해 storybook에 최신화된 컴포넌트를 추가하였습니다.</li>
            </ul>
            <h4>Example</h4>
            <h5>As-Is</h5>
            <div className="mt-2 row">
              <div className="col shadow mx-2">
                <img src="/images/work/design-system/intro-asis.png" alt="as-is 예시" />
              </div>
              <div className="col shadow mx-2">
                <img src="/images/work/design-system/popup-asis.png" alt="as-is 예시" />
              </div>
            </div>
            <h5 className="mt-5">To-Be</h5>
            <div className="mt-2 row">
              <div className="col shadow mx-2">
                <img src="/images/work/design-system/intro-tobe.png" alt="to-be 예시" />
              </div>
              <div className="col shadow mx-2">
                <img src="/images/work/design-system/popup-tobe.png" alt="to-be 예시" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Work
