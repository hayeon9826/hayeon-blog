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
          <h4>Open Source</h4>
          <ul className="bulleted-list">
            <li>
              React 18 공식 도큐 - Hooks API Reference 페이지 일부 번역:{' '}
              <a href="https://github.com/reactjs/ko.reactjs.org/pull/518" target="_blank">
                PR 링크
              </a>
            </li>
            <li>
              React 18 공식 도큐 - React 최상위 API 페이지 일부 번역:{' '}
              <a href="https://github.com/reactjs/ko.reactjs.org/pull/517" target="_blank">
                PR 링크
              </a>
            </li>
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
              사내 디자인팀 & 테크팀에게 디자인 시스템 개념 및{' '}
              <a href="https://hayeondev.gatsbyjs.io/220919-storybook/" target="_blank" rel="noreferrer">
                Storybook 사용 방법
              </a>{' '}
              발표
            </li>
            <li>
              프론트엔드 개발 용어집 강의 -{' '}
              <a href="https://zero-base.co.kr/event/school_FE" target="_blank" rel="noreferrer">
                zerobase
              </a>
              ,{' '}
              <a
                href="https://drive.google.com/drive/folders/1kT7nvYi8chCUittGLnpBCtidK6IFx0yo?usp=sharing"
                target="_blank"
              >
                강의 링크
              </a>
            </li>
            <li>
              사내 프론트팀 세미나에서 useEffect 완벽 가이드 요약 발표 -{' '}
              <a href="https://hayeondev.gatsbyjs.io/220629-useEffect-guide/" target="_blank">
                발표 자료
              </a>
            </li>
            <li>
              대학 연합 IT 동아리 멋쟁이사자처럼에서 비전공생들을 대상으로 Django / React 강의 제공 -{' '}
              <a
                href="https://drive.google.com/drive/folders/1Ok4bgeFaE_V3lki_pE3GAf0co8H-goSU?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                강의 링크
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default OtherExperience
