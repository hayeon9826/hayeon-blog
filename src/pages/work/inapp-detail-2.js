import React from 'react'
import Layout from '../../components/layout'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Work = () => {
  const beforeCode = `
  // 기존에 모든 웹뷰는 transition 없이 페이지 전환됨
  function ContractLayout({ children, className = '' }: Props) {
    return (
      <div className="layout"> 
        {children}
      </div>
    )
  }`

  const afterCode = `
  import { useSelector } from 'react-redux';
  import { useTransition, animated } from 'react-spring';

  import { contractSelector } from '@/selectors';


  function ContractLayout({ children, className = '' }: Props) {

    // 현재 페이지가 뒤로가는 모션인지, 다음 페이지를 가는 모션인지 구분하여 다른 transition을 줌
    const { back } = useSelector(contractSelector);

    // react-spring의 useTransition를 사용해 페이지 모션 추가
    const transitions = useTransition(router, (location) => location.pathname, {
      from: { opacity: 0, transform: back ? 'translate3d(-50%, 0, 0)' : 'translate3d(100%, 0, 0)' },
      enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
      leave: { opacity: 0, transform: back ? 'translate3d(100%, 0, 0)' : 'translate3d(-50%, 0, 0)' },
    });

    return (
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <div
            className="layout"
          >
            {children}
          </div>
        </animated.div>
      ))}
    )
  }`

  return (
    <>
      <Layout title="Hayeon Resume">
        <section className="about-work mb-32 mt-20">
          <div className="mt-5">
            <h4>What I did.</h4>
            <ul className="bulleted-list">
              <li>
                인앱약정 프로젝트에 투입되기 전, 기존에 구현된 웹 페이지 이동이 딱딱 끊긴다는 부자연스럽다는 피드백이
                있었습니다.
              </li>
              <li>
                필수 QA 사항은 아니었지만, 사용성 개선을 위해 App-like한 애니메이션이 필요하다고 생각하여 자진하여 웹뷰
                애니메이션을 수정하였습니다.
              </li>
              <li>
                react-spring의 useTransition을 이용하여 우측으로 넘기는 모션과 좌측으로 넘기는 모션을 적용하여
                애니웹에서도 앱처럼 자연스러운 모션으로 이동할 수 있도록 사용성을 개선하였습니다.
              </li>
            </ul>
            <h4>Before</h4>
            <small>* 예시 코드입니다.</small>
            <SyntaxHighlighter language="jsx" style={dracula}>
              {beforeCode}
            </SyntaxHighlighter>

            <h4>After</h4>
            <small>* 예시 코드입니다.</small>
            <SyntaxHighlighter language="jsx" style={dracula}>
              {afterCode}
            </SyntaxHighlighter>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Work
