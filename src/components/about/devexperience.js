import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const DevExperience = () => {
  return (
    <>
      <section className="about-devexperience mb-32">
        <h1>
          <span className="title-primary" style={{ borderBottom: '0.05em solid' }}>
            <span className="title-primary">Projects.</span>
          </span>
        </h1>
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>
              <strong>핀다 앱</strong>
            </h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2022.05 ~ </p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <p>
              <a href="https://apps.apple.com/KR/app/id1494077875?mt=8" target="_blank" rel="noreferrer">
                핀다 앱
              </a>
              의 웹뷰를 담당하여 개발하였습니다. 대출 상품 페이지의 <b>레거시 코드 리팩토링</b> 작업을 하였고, 핀다 앱
              내에서 대출 상품 및 약정을 비교하고 대출을 받을 수 있게하는 <b>인앱약정 기능</b>을 개발했습니다.
            </p>
            <h5>Tech Stack.</h5>
            <p>React, Next.js, Redux, Typescript, Tailwindcss</p>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                대출 상품 검색 페이지의 기존 레거시 API 요청이 4초 이상 걸린다는 고질적인 문제가 있었습니다. 따라서,
                <code>getStaticProps</code>로 자주 찾는 100개 페이지 데이터를 미리 SSG를 방식으로 가져올 수 있도록
                작업하였습니다. 그 결과 4초 이상 걸리던 렌더링 속도가 0.5초 이내로 개선되었습니다.
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>기존 Class component의 v1 코드를 Functional Component로 개선하여 v2 프로젝트로 이전하였습니다.</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                인앱약정 상품의 주소 검색을 위해서 Intersection Observer를 이용한 무한 스크롤 도입을 작업했습니다.
                한번에 수백가지의 주소를 모두 가져오지 않고, 20개씩 끊어서 데이터를 가져올 수 있게 하여 사용자 경험을
                개선하고 성능을 최적화했습니다.
              </li>
              <li>
                금융사 리스트를 가져오는 데 딜레이 시간동안 Skeleton을 띄워 사용성을 개선하였습니다. Skeleton을 사용
                용도에 따라 (Grid / List) 재사용가능한 컴포넌트로 만들어 코드 반복을 줄였습니다.
              </li>
              <li>
                여러가지 상황에 대한 테스트를 위해 msw(Mocking Service Worker)를 적용하여 Mocking API를 이용해
                개발했습니다.
              </li>
            </ul>

            <figure className="image">
              <StaticImage
                formats={['auto', 'webp', 'avif']}
                src="../../images/finda_app.png"
                width={600}
                height={310}
                quality={95}
                alt="finda app"
              />
            </figure>
          </div>
        </div>
        <hr />
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>
              <strong>핀다 웹사이트</strong>
            </h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2022.05 ~ </p>
            <p></p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <p>
              <a href="https://finda.co.kr/" target="_blank" rel="noreferrer">
                핀다 웹사이트
              </a>
              를 개발, 유지보수하는 작업을 맡았습니다. 회사 <b>소개 페이지와 채용 페이지</b>를 효율적으로 개선 하였고,{' '}
              <b>디자인 시스템</b> 구축을 위해 기존 핀다의 레거시 컴포넌트를 최신화하여 Storybook에 배포하였습니다.
              Web팀의 더욱 효율적인 디버깅을 위해 <b>웹 콘솔</b>을 도입하거나, 마케팅 팀의 요청에 대응하여 여러가지
              이벤트 페이지 및 <b>IE 브라우저 대응</b>을 맡았습니다.
            </p>
            <h5>Tech Stack</h5>
            <p>React, Next.js, Redux, Typescript, Tailwindcss, Jest, Emotion, Storybook</p>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                {' '}
                채용 페이지 데이터를 구글 스프레드 시트와 연동하는 작업으로 개발 요청 및 협업 시간을 200% 단축했습니다.
                필요한 데이터를 구글 스프레드 시트에서 직접 변경할 수 있도록 시트의 ID, API Key, 셀 범위 등을 정의하고
                웹사이트와 연동하였습니다.
                <code>getStaticProps</code>의 <code>revalidate 60*60</code>을 적용하여 데이터를 변경하면 한시간 후 자동
                적용될 수 있도록하였습니다.
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                디자인팀과 협업하여 디자인 시스템을 구축하고 있습니다. 기존 핀다 컴포넌트를 최신화하고, 모든 컴포넌트를
                Storybook에 올려 개발자 및 디자이너가 컴포넌트를 효율적으로 활용할 수 있도록 기여했습니다.
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                stage, devstage에서 효율적인 디버깅을 할 수 있도록 모바일 웹 콘솔 <code>vconsole</code>을 도입했습니다.
                웹 사용성을 해치지 않기 위해 두 손가락으로 5회이상 빠르게 연타 할 때에만 웹 콘솔이 뜰 수 있도록
                적용했습니다. web 팀 개발자 분들에게 디버깅할 때 과정이 더욱 빠르고 편리해졌다는 긍정적인 피드백을
                들었습니다.
              </li>
            </ul>

            <ul className="bulleted-list">
              <li>
                마케팅팀의 요청으로 IE 브라우저에서는 핀다 웹페이지 대신, 경고 페이지로 리다이렉트 되도록 작업했습니다.
                브라우저의 <code>user-agent</code> 값으로 IE 브라우저인지 확인하였고, IE 브라우저 접근 시 Next.js의
                <code>redirects</code>를 사용해 경고 페이지로 리다이렉트를 시켰습니다. 그 결과, IE 브라우저에서 나타나는
                화면 깨짐 현상을 해결하였고, 마케팅 광고 검수 승인을 받을 수 있었습니다.{' '}
                <a href="/221030-nextjs-ie-redirects/" target="_blank">
                  [참고 링크]
                </a>
              </li>
            </ul>
            <figure className="image">
              <StaticImage
                formats={['auto', 'webp', 'avif']}
                src="../../images/finda_web.png"
                width={600}
                height={400}
                quality={95}
                alt="finda web"
              />
            </figure>
          </div>
        </div>
        <hr />
        {/* <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>
              <strong>프랜차이즈 관리 웹 서비스</strong>
            </h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2021.11 → 2022.02</p>
            <p></p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h4>프로젝트 소개</h4>
            <ul className="bulleted-list">
              <li>프랜차이즈 관리 서비스</li>
            </ul>
            <ul className="bulleted-list">
              <li> 메인 개발자로 프로젝트 리드</li>
            </ul>
            <ul className="bulleted-list">
              <li>고객사, 개발자 2명, 기획자 1명, 디자이너 1명과 협업</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <strong>기여도 50%</strong>
              </li>
            </ul>
            <details>
              <summary className="text-sm">개발 환경 및 상세업무 확인</summary>
              <h5>개발환경</h5>
              <p>postgres, AWS (S3, cognito), vercel (테스트 서버 배포)</p>
              <h5>개발 언어 및 라이브러리</h5>
              <p>백엔드: Node.js, prisma</p>
              <p>프론트엔드: React, Next.js, typescript</p>
              <h5>상세업무</h5>
              <ul className="bulleted-list">
                <li>프랜차이즈 관리 페이지 작업</li>
              </ul>
              <ul className="bulleted-list">
                <li>프랜차이즈 비교 그래프 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>프랜차이즈 지도 필터 및 모아보기 기능 구현</li>
              </ul>
              <figure className="image">
                <StaticImage
                  formats={['auto', 'webp', 'avif']}
                  src="../../images/franchise_img.jpeg"
                  width={500}
                  height={280}
                  quality={95}
                  alt="franchise picture"
                />
              </figure>
            </details>
          </div>
        </div>
        <hr /> */}
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>채찍단</h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2021.11 → 2022.02</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <p>
              다이어트 관리 및 채팅 서비스{' '}
              <a href="https://apps.apple.com/kr/app/%EC%B1%84%EC%B0%8D%EB%8B%A8/id1616126955" target="blank">
                채찍단
              </a>
              을 주도하여 개발했습니다. 메인 개발자로 프로젝트를 리드하였고 고객사, 개발자 2명, 기획자 1명과
              협업하였습니다.
              <br />
              <br />
              고객사와 지속적으로 미팅을 하며 기능을 추가 & 수정하였고, 도메인의 이해도를 함께 높일 수 있었습니다.
              애자일한 협업 프로세스를 경험할 수 있었고 비즈니스와 관련된 지속적인 대화를 중요시하게 되었습니다.
            </p>
            <h5>Tech Stack.</h5>
            <p>React, Next.js, Recoil, Typescript, Node.js, Prisma, AWS (S3, cognito), Firestore, Vercel</p>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                채팅 기능을 리팩토링 하며 기존 polling 방식에서 firestore를 활용하여 실시간 채팅 기능을 구현했습니다.
                버벅 거리거나 2초 이상 지연되던 성능 문제를 해결하였고, 채팅 사용성을 개선하였습니다. 사내 첫 Firestore
                도입이었기 때문에, Firestore 관련해서 리서치를 하였고, 기술 도큐를 작성해 공유하였습니다.{' '}
                <a href="/220125-firestore-react-chat-app/" target="_blank">
                  [참고 링크]
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                다이어트 회원들에게 시각화된 몸무게 차트를 그래프로 확인할 수 있는 페이지 개발을 진행하였으며,{' '}
                <code>react-calendar</code>를 커스터마이징 하여 다이어트 캘린더를 구현했습니다.{' '}
                <a href="/220209-react-calendar/" target="_blank">
                  [참고 링크]
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                Next.js의{' '}
                <a href="https://nextjs.org/docs/api-routes/introduction" target="_blank">
                  API Routes
                </a>
                와 prisma를 활용해 요청 Method에 따라 데이터를 추가/수정/삭제/요청하는 작업을 진행했습니다. 백엔드 없이
                프론트엔드를 고도화시켜 하나의 서비스를 처음부터 끝까지 개발하였습니다.
              </li>
              <li>
                고객사 요청으로 기존에 사용하던 웹페이지 도메인에서 서브 도메인을 생성하여 웹앱 url을 연결하는 작업을
                진행했습니다.
              </li>
            </ul>
            <figure className="image">
              <StaticImage
                formats={['auto', 'webp', 'avif']}
                src="../../images/sagn_img.jpeg"
                width={500}
                height={280}
                quality={95}
                alt="sagn"
              />
            </figure>
          </div>
        </div>
        <hr />
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>글로리어스</h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2021.08 → 2022.02</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <p>
              인플루언서 캠페인 매칭 서비스{' '}
              <a target="_blank" rel="noreferrer" href="https://gloryus.net">
                글로리어스
              </a>
              를 주도하여 개발했습니다. 메인 개발자로 프로젝트를 리드하였고, 고객사, 개발자 2명, 기획자 1명, 디자이너
              1명과 협업하였습니다.
              <br />
              <br />
              사용자의 타입(관리자 / 유저 / 브랜드)과 언어(영어 / 일본어 / 한국어)에 따라 보여지는 화면이 달라서 간편한
              사용자 상태 관리에 집중하여 개발하였습니다.
            </p>
            <h5>Tech Stack.</h5>
            <p>Ruby on Rails, Ruby, React, Next.js, Recoil, React-Query, Typescript, AWS (S3, ec2, Amplify)</p>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>
                브랜드 및 관리자 사용자가 자동으로 본인의 주문 내역을 csv로 추출할 수 있도록 csv 다운로드 기능을
                구현했습니다. <code>react-query</code>로 주문 데이터를 받아와, 객체 형식의 배열을 <code>react-csv</code>{' '}
                라이브러리를 활용해 csv로 추출하였습니다.{' '}
                <a href="/211209-react-csv/" target="_blank">
                  [참고 링크]
                </a>
              </li>
              <li>
                사용자 언어별로 페이지를 다르게 보일 수 있도록 설계하였습니다. Next.js에 <code>i18n</code>을 적용하여
                사용 언어(영어/ 한국어 / 일본어)에 따라 다른 언어로 페이지를 나타내는 동작을 구현했습니다.
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                React-Query와 Recoil을 이용하여 사용자 정보를 가져오고, 복잡한 전역 상태 관리를 진행했습니다. 특히,{' '}
                <code>Recoil</code>을 활용해 사용자의 현재 상태를 저장하고, 사용자 타입에 따라 다른 화면 (유저 / 관리자
                / 브랜드)를 보여주는 개발을 진행했습니다.
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                프로젝트 확장에 대비해 더욱 안정성 있는 AWS 서비스로 이전 작업을 진행했습니다. AWS cdk를 활용하여 배포
                작업을 진행하였으며, AWS cognito를 이용한 회원 관리를 구현하였습니다.
              </li>
            </ul>
            <figure className="image">
              <StaticImage
                formats={['auto', 'webp', 'avif']}
                src="../../images/gloryus_img.png"
                width={500}
                height={500}
                quality={95}
                alt="gloryus picture"
              />
            </figure>
          </div>
        </div>
        <hr />
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>모두다</h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2021.02 → 2021.08</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h5>Description.</h5>
            <p>
              사업자를 위한 중고거래 서비스{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://apps.apple.com/kr/app/%EB%AA%A8%EB%91%90%EB%8B%A4/id1577313215"
              >
                모두다
              </a>
              를 서브 개발자로 개발하였습니다. 고객사, 2명의 개발자와 협업하였으며, 프로젝트의 30% 이상 기여했습니다.
            </p>
            <h5>Tech Stack.</h5>
            <p>postgres, AWS (S3, ec2)</p>
            <h5>개발 언어 및 라이브러리</h5>
            <p>Ruby on Rails, Ruby, React, React-Query, Recoil, Typescript</p>
            <h5>What I did.</h5>
            <ul className="bulleted-list">
              <li>거리 순 상품 정렬</li>
            </ul>
            <ul className="bulleted-list">
              <li>상품 결제 api 적용 (tosspayment 사용)</li>
            </ul>
            <ul className="bulleted-list">
              <li>모바일 관리자 페이지</li>
            </ul>
            <ul className="bulleted-list">
              <li>정산 관리 페이지 작업</li>
            </ul>
            <figure className="image">
              <StaticImage
                formats={['auto', 'webp', 'avif']}
                src="../../images/modooda_img.jpeg"
                width={500}
                height={220}
                quality={95}
                alt="modooda picture"
              />
            </figure>
          </div>
        </div>
        {/* <hr /> */}
        {/* <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5> 패션 SNS 쇼핑몰 </h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2020.10 → 2021.07</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h4>프로젝트 소개</h4>
            <ul className="bulleted-list">
              <li>
                O2O 모바일 패션 쇼핑몰{' '}
                <a target="_blank" rel="noreferrer" href="https://pppper.com/">
                  링크
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>메인 개발자로 프로젝트 리드</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <strong>
                  <span className="highlight-gray">기여도 80%</span>
                </strong>
              </li>
            </ul>
            <details>
              <summary className="text-sm">개발 환경 및 상세업무 확인</summary>
              <h5>개발환경</h5>
              <p>postgres, linux, atom</p>
              <h5>개발 언어 및 라이브러리</h5>
              <p>Ruby on Rails, ruby, javascript, jquery, html, css, framwork7</p>
              <h5>상세업무</h5>
              <ul className="bulleted-list">
                <li>제품 구매 시스템 개발 및 배포</li>
              </ul>
              <ul className="bulleted-list">
                <li>제품 구매 및 공지 알림톡 자동화</li>
              </ul>
              <ul className="bulleted-list">
                <li>주문/배송조회 자동화. 송장등록 자동 연동 시스템 개발 (굿스플로 api 적용)</li>
              </ul>
              <ul className="bulleted-list">
                <li>코디 등록 기능 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>sns 피드 및 좋아요 기능 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>모바일 웹 ui 퍼블리싱 작업</li>
              </ul>
              <figure className="image">
                <StaticImage
                  formats={['auto', 'webp', 'avif']}
                  src="../../images/pppper_img.png"
                  width={480}
                  height={240}
                  quality={95}
                  alt="pppper picture"
                />
              </figure>
            </details>
          </div>
        </div> */}
      </section>
    </>
  )
}

export default DevExperience
