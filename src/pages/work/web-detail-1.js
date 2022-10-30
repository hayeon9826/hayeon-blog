import React from 'react'
import Layout from '../../components/layout'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Work = () => {
  const exampleCode = `
// vConsole 버튼은 항상 보이지 않도록 display none 처리
const hideConsoleButton = () => {
  const button = document.querySelector('.vc-switch') as HTMLElement;
  button.style.display = 'none';
};

// vConsole 초기화
const initVConsole = async () => {
  if (window) {
    // vConsole 세팅 및 옵션 추가
    const VConsole = (await import('vconsole')).default
    const el = document.createElement('div');
    document.body.append(el);

    if (!VConsole) return;

    const vConsole = new VConsole();
    vConsole.setOption({ theme: 'dark', target: el, onReady: hideConsoleButton() });

    //@@ 일정 시간 내에 5회 이상 연타 인식 이벤트 start @@//
    let clickCount: number = 0;
    let timeoutID: ReturnType<typeof setTimeout>;
    let timerOn: boolean = false;
    const TOUCH_TIME = 10000;

    // 타이머
    const timedCount = () => {
      timeoutID = setTimeout(() => { resetCount(); }, TOUCH_TIME);
    }

    // 타이머 시작
    const startCount = () => {
      if (!timerOn) {
        timerOn = true;
        timedCount();
      }
    }

    // 5회 이상 연타를 해서 vConsole이 뜨거나, 타임아웃이 되면 시간을 초기화시킴
    const resetCount = () => {
      clearTimeout(timeoutID);
      timerOn = false;
      clickCount = 0;
    }

    // 손가락 2개로 timer 끝나기 전에 5회 이상 연타 시 vConsole 보이도록
    const toggleWebConsole = (e) => {
      if (e?.touches?.length !== 2) return;

      clickCount += 1;
      if (clickCount === 1) {
        startCount();
      }

      if (clickCount >= 5) {
        vConsole.show();
        resetCount();
      }
    }
    //@@ 일정 시간 내에 5회 이상 연타 인식 이벤트 end @@//
    
    // 도큐먼트에 touchstart 이벤트 추가
    document.addEventListener('touchstart', toggleWebConsole);
  }
};

export default initVConsole;

  `
  const exampleCode2 = `
  // 원하는 페이지에서 vConsole 호출
   useEffect(() => {
    // init vConsole on mount
    initVConsole();
  }, [])
 `

  return (
    <>
      <Layout title="Hayeon Resume">
        <section className="about-work mb-32 mt-20">
          <div className="mt-5">
            <h4>What I did.</h4>
            <ul className="bulleted-list">
              <li>
                기존에 모바일 앱/웹에서 에러 확인 및 네트워크 요청등을 상세하게 볼 수 있는 툴이 부재하였습니다. 따라서
                모바일 디버깅 툴과 관련해서 리서치 및 세미나에서 발표를 하였고 팀원들과 의논한 결과 vConsole 도입을 맡게
                되었습니다.{' '}
                <a
                  href="https://hayeondev.gatsbyjs.io/220622-debugging-tools-vconsole/"
                  target="_blank"
                  rel="noreferrer"
                >
                  [발표 내용]
                </a>
              </li>
              <li>
                vConsole을 도입하여 stage, devstage에서 효율적인 디버깅을 할 수 있도록 기여했습니다. 두 손가락으로
                5회이상 빠르게 연타하면 웹 콘솔이 뜰 수 있도록 적용했습니다.
              </li>
              <li>
                <code>useinitVConsole</code> 훅을 만들어 원하는 페이지에서만 웹 콘솔을 호출 할 수 있도록 작업했습니다.
              </li>
              <li>
                기존의 <code>stage, devstage 오류 발견 - 로컬 환경 설정 - 로컬에서 모바일 테스트</code> 단계에서, 바로{' '}
                <code>stage, devstage에서 오류 발견 및 테스트</code>를 할 수 있도록 테스트 과정을 축소시켰습니다. web 팀
                개발자 분들에게 디버깅할 때 과정이 더욱 빠르고 편리해졌다는 긍정적인 피드백을 들었습니다.
              </li>
            </ul>
            <h4>Example</h4>
            <small>* 예시 코드입니다.</small>
            <SyntaxHighlighter language="javascript" style={dracula}>
              {exampleCode}
            </SyntaxHighlighter>
            <br />
            <SyntaxHighlighter language="jsx" style={dracula}>
              {exampleCode2}
            </SyntaxHighlighter>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Work
