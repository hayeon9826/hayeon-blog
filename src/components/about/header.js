import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Header = () => {
  return (
    <>
      <section className="about-header">
        <header>
          <h2 className="page-title">안녕하세요, 프론트엔드 개발자 김하연입니다. 👩🏻‍💻</h2>
        </header>
        <h4>“빠른 코드 이해력, 소통하는 협업 능력, 효율적이고 가독성 좋은 코드”</h4>
        <ul className="bulleted-list">
          <li>
            <strong>2년차</strong> 프론트엔드 개발자 김하연 입니다.
          </li>
        </ul>
        <ul className="bulleted-list">
          <li>
            11개월의 프리랜서 경력와 1년의 1개월 경력으로 총 <strong>2년</strong>의 경력이 있습니다.
          </li>
        </ul>
        <div className="column-list sm-col-1">
          <div className="column">
            <figure className="image">
              <StaticImage
                formats={['auto', 'webp', 'avif']}
                src="../../images/profile_img.jpg"
                width={240}
                height={300}
                quality={95}
                alt="Profile picture"
              />
            </figure>
          </div>
          <div style={{ width: '60%' }} className="column sm-w-100">
            <div className="name-text">
              <strong>김하연 (Hayeon Kim)</strong>
            </div>
            <div className="title-md">
              <strong>
                <span className="title-primary">Contact.</span>
              </strong>
            </div>
            <p>
              📞 <strong>010-3932-9826</strong>
            </p>
            <p>
              ✉️{' '}
              <strong>
                <a href="mailto:hayeonkim226@gmail.com">hayeonkim226@gmail.com</a>
              </strong>
              <strong> </strong>
            </p>
            <div className="title-md">
              <strong>
                <span className="title-primary">Channel</span>
                <span className="title-primary">
                  <strong>.</strong>
                </span>
              </strong>
            </div>
            <p>
              🖥️{' '}
              <strong>
                <a target="_blank" rel="noreferrer" href="http://github.com/hayeon9826">
                  github.com/hayeon9826
                </a>
              </strong>
            </p>
            <p>
              🔗{' '}
              <strong>
                <a target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/khy226">
                  linkedin.com/in/khy226
                </a>
              </strong>
            </p>
            <p>
              🏠{' '}
              <strong>
                <a target="_blank" rel="noreferrer" href="https://velog.io/@khy226">
                  https://velog.io/@khy226
                </a>
              </strong>
              <strong> </strong>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
