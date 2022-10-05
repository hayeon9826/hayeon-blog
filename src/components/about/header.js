import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Header = () => {
  return (
    <>
      <section className="about-header mb-32">
        <header>
          <h1 className="page-title">김하연 <span className="text-lg">(Hayeon Kim)</span></h1>
        </header>
        <h5>안녕하세요, <u className="underline-blue-bold">2년차 프론트엔드 개발자</u> 김하연 입니다.</h5>
        <div>
          <div className="fw-semibold">저는 <span className="badge text-bg-primary p-1 me-1">_ _ _ _ _ _ </span> 하는 개발자 입니다.</div>
          <ul>
            <li>사용자들의 입장에서 제품을 개발하는</li>
            <li>조직의 성장과 발전하는 개발문화를 고민하는</li>
            <li>개발직군과 비개발직군 모두와의 소통 및 협업을 중시하는</li>
          </ul>
        </div>
        <div>
          <hr />
          <p className="row">
            <strong className="col-2 text-right">Github </strong>
            <a className="col-4 fw-semibold" target="_blank" rel="noreferrer" href="http://github.com/hayeon9826">
              github.com/hayeon9826
            </a>
          </p>
          <hr />
          <p className="row">
            <strong className="col-2 text-right">Linkedin</strong>
            <a  className="col-4 fw-semibold" target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/khy226">
              linkedin.com/in/khy226
            </a>
          </p>
          <hr />
          <p className="row">
            <strong className="col-2 text-right">
              Blog
            </strong>
            <a  className="col-4 fw-semibold" target="_blank" rel="noreferrer" href="https://velog.io/@khy226">
              https://velog.io/@khy226
            </a>
          </p>
          <hr />
          <p className="row">
            <strong className="col-2 text-right">Contact</strong>
            <a  className="col-4 fw-semibold" href="mailto:hayeonkim226@gmail.com">hayeonkim226@gmail.com</a>
          </p>
          <hr />
        </div>
      </section>
    </>
  )
}

export default Header
