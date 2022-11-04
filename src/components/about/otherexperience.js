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
              React 18 공식 도큐의{' '}
              <a href="https://ko.reactjs.org/docs/hooks-intro.html" target="_blank">
                Hooks API Reference
              </a>{' '}
              페이지를 일부 번역하였습니다.{' '}
              <a href="https://github.com/reactjs/ko.reactjs.org/pull/518" target="_blank">
                [PR 링크]
              </a>
            </li>
            <li>
              React 18 공식 도큐의{' '}
              <a href="https://ko.reactjs.org/docs/react-api.html" target="_blank">
                React 최상위 API
              </a>{' '}
              페이지를 일부 번역하였습니다.{' '}
              <a href="https://github.com/reactjs/ko.reactjs.org/pull/517" target="_blank">
                [PR 링크]
              </a>
            </li>
            <li>
              Toast UI Editor의 <code>react-editor</code> wrapper가 react 18 과 의존성 문제가 있다는 것을 확인하여,
              이슈를 생성, <code>react-editor</code> wrapper의 리액트 관련 dependencies를 최신 버전으로
              업그레이드했습니다.{' '}
              <a href="https://github.com/nhn/tui.editor/pull/2803" target="_blank">
                [PR 링크]
              </a>
              ,{' '}
              <a href="https://github.com/nhn/tui.editor/issues/2790" target="_blank">
                [Issue 링크]
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Presentation</h4>
          <ul className="bulleted-list">
            <li>
              사내 세미나를 열어 디자인팀 & 테크팀에게 디자인 시스템 개념 및 Storybook 사용 방법을 발표했습니다.{' '}
              <a href="https://hayeondev.gatsbyjs.io/220919-storybook/" target="_blank" rel="noreferrer">
                [참고 링크]
              </a>
            </li>
            <li>
              <a href="https://zero-base.co.kr/event/school_FE" target="_blank" rel="noreferrer">
                Zerobase
              </a>
              의 프론트엔드 개발 용어집 강의를 진행했습니다.{' '}
              <a
                href="https://drive.google.com/drive/folders/1kT7nvYi8chCUittGLnpBCtidK6IFx0yo?usp=sharing"
                target="_blank"
              >
                [강의 링크]
              </a>
            </li>
            <li>
              사내 프론트팀 세미나에서 useEffect 완벽 가이드를 요약하여 발표했습니다.{' '}
              <a href="https://hayeondev.gatsbyjs.io/220629-useEffect-guide/" target="_blank">
                [참고 링크]
              </a>
            </li>
            <li>
              대학 연합 IT 동아리 멋쟁이사자처럼에서 비전공생들을 대상으로 2년동안 교육을 진행하였고,{' '}
              <code>Django</code> 및 <code>React</code> 강의를 제공했습니다.{' '}
              <a
                href="https://drive.google.com/drive/folders/1Ok4bgeFaE_V3lki_pE3GAf0co8H-goSU?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                [Django 강의 링크]
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default OtherExperience
