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
                핀다 앱 내에서 은행 대출 상품을 확인하고 바로 약정을 체결할 수 있는 '인앱약정' 제품을 작업했습니다.
              </li>
            </ul>
            <h4>Example</h4>
            <div className="mt-5 row">
              <div className="col mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/215070613-3b206ff8-ec62-4be6-bd27-30e1a659e054.png"
                  alt="인앱약정 예시 이미지"
                />
              </div>
              <div className="col mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/215070640-d78a72cc-e9fc-466d-87af-6d86f7cbd3aa.png"
                  alt="인앱약정 예시 이미지"
                />
              </div>
            </div>
            <div className="mt-5 row">
              <div className="col mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/215070773-f9aa5a81-a347-4df6-a9ef-56410ac7156f.png"
                  alt="인앱약정 예시 이미지"
                />
              </div>
              <div className="col mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/215070799-31e013b4-1d5d-481c-96a1-139da1143e84.png"
                  alt="인앱약정 예시 이미지"
                />
              </div>
            </div>
            <div className="mt-5 row">
              <div className="col mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/215070829-771cfff6-cdee-4d4b-8783-f867781204b2.png"
                  alt="인앱약정 예시 이미지"
                />
              </div>
              <div className="col mx-2">
                <img
                  src="https://user-images.githubusercontent.com/38210233/215070884-913161f1-de82-4939-bc07-29488ed831fe.png"
                  alt="인앱약정 예시 이미지"
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
