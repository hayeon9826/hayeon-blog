import React, { useCallback } from 'react'
import ThemeBtn from '../themeBtn'

const Header = ({ location }) => {
  const hasLayout = useCallback(() => {
    if (location.search.includes('header')) {
      return true
    } else if (location.pathname.includes('about')) {
      return false
    } else {
      return true
    }
  }, [location])
  return (
    <>
      <section className="about-header mb-32">
        <header>
          <h1 className="page-title">
            김하연 <span className="text-lg">(Hayeon Kim)</span>
            {/* {!hasLayout() && <ThemeBtn />} */}
          </h1>
        </header>
        <h5>기본정보</h5>
        <div>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">이름 </strong>
            <span className="col">김하연</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">생년월일</strong>
            <span className="col">1998.02.26</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">이메일</strong>
            <span className="col">hayeonkim226@gmail.com</span>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">경력사항</strong>
            <span className="col">
              4년차 프론트엔드 개발자 <small>(현 LG AI 연구원 재직)</small>
            </span>
          </p>
          <hr />
        </div>
        <br />
        <br />
        <h5>
          안녕하세요, <u className="underline-blue-bold">4년차 프론트엔드 개발자</u> 김하연 입니다.
        </h5>
        <div>
          <div className="fw-semibold">
            저는 <span className="badge text-bg-primary p-1 me-1">_ _ _ _ _ _ </span> 하는 개발자 입니다.
          </div>
          <ul>
            <li>사용자의 입장에서 제품을 개발하는</li>
            <li>문제를 끝까지 파고들어 해결하는</li>
            <li>개발 지식을 문서화하고 공유하는 것을 좋아하는</li>
          </ul>
        </div>
        <div>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Github </strong>
            <a className="col-4" target="_blank" rel="noreferrer" href="http://github.com/hayeon9826">
              github.com/hayeon9826
            </a>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Linkedin</strong>
            <a className="col-4" target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/khy226">
              linkedin.com/in/khy226
            </a>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Blog</strong>
            <a className="col-4" target="_blank" rel="noreferrer" href="https://hayeon-blog.vercel.app/">
              hayeon-blog.vercel.app
            </a>
          </p>
          <hr />
          <p className="row gap-3">
            <strong className="col-2 text-right">Email</strong>
            <a className="col-4" href="mailto:hayeonkim226@gmail.com">
              hayeonkim226@gmail.com
            </a>
          </p>
          <hr />
        </div>
      </section>
    </>
  )
}

export default Header
