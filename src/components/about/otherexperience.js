import React from 'react'

const OtherExperience = () => {
  return (
    <section className="about-skill mb-32">
      <h1>
        <span className="title-primary" style={{ borderBottom: '0.05em solid' }}>
          <span className="title-primary">Other Experience.</span>
        </span>
      </h1>
      <div>
        <div>
          <h4>OpenSource</h4>
          <ul className="bulleted-list">
            <li>
              Toast UI Editor의 react-editor react 버전 18로 업그레이드:{' '}
              <a href="https://github.com/nhn/tui.editor/pull/2803" target="_blank">
                PR 링크
              </a>
              ,{' '}
              <a href="https://github.com/nhn/tui.editor/issues/2790" target="_blank">
                Issue 링크
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Presentation</h4>
          <ul className="bulleted-list">
            <li>
              디자인 시스템 개념 및{' '}
              <a href="https://hayeondev.gatsbyjs.io/220919-storybook/" target="_blank" rel="noreferrer">
                Storybook 사용 방법
              </a>{' '}
              발표 - 사내 발표
            </li>
            <li>
              프론트엔드 개발 용어집 강의 -{' '}
              <a href="https://zero-base.co.kr/event/school_FE" target="_blank" rel="noreferrer">
                zerobase
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default OtherExperience
