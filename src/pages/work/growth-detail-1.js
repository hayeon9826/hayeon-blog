import React from 'react'
import Layout from '../../components/layout'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Work = () => {
  const beforeCode = `

  // 이미지 두 개를 번갈아가며 보여줄 수 있도록 useState로 isActive flag 생성
  const [isFirstImage, setIsFirstImage] = useState(true)

  // setInterval로 1초마다 active 이미지 변경
  useEffect(() => {
    setInterval(() => {
      setIsFirstImage(!isFirstImage)
    }, 1000)
  }, [])

  ...

  // render 내부 코드
  { 
    <BannerLayout>
    (isFirstImage) ? {
      <img src="/src/to/image1" alt="이미지 1" />
    } : {
      <img src="/src/to/image2" alt="이미지 2" />
    }
    </BannerLayout>
  }
  `

  const afterCode = `
  import cn from 'classnames'
  // 이미지 두 개를 번갈아가며 보여줄 수 있도록 useState로 isActive flag 생성
  const [isFirstImage, setIsFirstImage] = useState(true)
  const ImageUrl = { url1: '/image/url/1', url2: 'image/url/1' }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFirstImage(!isFirstImage);
    }, 1000)

    // cleanup 함수 추가
    return () => clearInterval(intervalId);
  }, [setIsFirstImage, isFirstImage])


  // render 내부 코드
  <AutoBanner isFirstImage={isFirstImage} ImageUrl={ImageUrl} />
`

  const afterCode2 = `
  // AutoBanner 컴포넌트 내부 코드

  <BannerLayout>
    <img
       className={cn(
        'transition-transform transform duration-800 ease-in-out',
        isFirstImage ? 'translate-x-0' : '-translate-x-full',
      )}
       src={ImageUrl.url1}
       alt="이미지 1"
     />
     <img
       className={cn(
        'transition-transform transform duration-800 ease-in-out',
        !isFirstImage ? 'translate-x-0' : '-translate-x-full',
      )}
       src={ImageUrl.url2}
       alt="이미지 2"
     />
  </BannerLayout>
`

  return (
    <>
      <Layout title="Hayeon Resume">
        <section className="about-work mb-32 mt-20">
          <div className="mt-5">
            <h4>What I did.</h4>
            <ul className="bulleted-list">
              <li>
                마케팅팀에서 자동 롤링 배너틑 포함한 후순위 담보 대출 페이지 제작을 요청하였습니다. 요청에 따라
                Tailwind의 <code>transition-transform</code>, <code>transform</code>, <code>duration</code>,{' '}
                <code>ease-in-out</code>등 transition 클래스를 활용하여 재사용 가능한 자동 롤링 배너를 개발했습니다.
              </li>
              <li>
                해당 페이지 뿐만 아니라 다른 페이지에서도 사용할 수 있도록 별도의 component로 분리를 하였습니다. 코드
                재사용을 가능하게 하여 개발 효율성을 증대시켰으며, transition css를 활용하여 자연스러운 전환 효과를
                적용하였습니다.
              </li>
              <li>
                또한, 기존 setInterval의 Web API 사용 시 cleanup 함수를 추가하여 메모리 누수를 보완하고,{' '}
                <code>translate</code> css로 옆으로 넘기는 듯한 모션을 추가하여 사용자 경험을 개선했습니다.
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

            <SyntaxHighlighter language="jsx" style={dracula}>
              {afterCode2}
            </SyntaxHighlighter>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Work
