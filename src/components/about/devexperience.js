import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const DevExperience = () => {
  return (
    <>
      <section className="about-devexperience">
        <h1>
          <span style={{ borderBottom: '0.05em solid' }}>
            <span className="title-primary">Dev Experience.</span>
          </span>
        </h1>
        <div className="column-list">
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
              <summary>개발 환경 및 상세업무 확인</summary>
              <h4>개발환경</h4>
              <p>postgres, AWS (S3, cognito), vercel (테스트 서버 배포)</p>
              <h4>개발 언어 및 라이브러리</h4>
              <p>백엔드: Node.js, prisma</p>
              <p>프론트엔드: React, Next.js, typescript</p>
              <h4>상세업무</h4>
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
                  src="../images/franchise_img.jpeg"
                  width={500}
                  height={280}
                  quality={95}
                  alt="franchise picture"
                />
              </figure>
            </details>
          </div>
        </div>
        <hr />
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>다이어트 관리 앱</h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2021.11 → 2022.02</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h4>프로젝트 소개</h4>
            <ul className="bulleted-list">
              <li>다이어트 관리 및 채팅 서비스</li>
            </ul>
            <ul className="bulleted-list">
              <li>메인 개발자로 프로젝트 리드</li>
            </ul>
            <ul className="bulleted-list">
              <li>고객사, 개발자 2명, 기획자 1명과 협업</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <span className="highlight-gray">
                  <strong>기여도 50%</strong>
                </span>
              </li>
            </ul>
            <details>
              <summary>개발 환경 및 상세업무 확인</summary>
              <h4>개발환경</h4>
              <p>postgres, AWS (S3, cognito), vercel (테스트 서버 배포)</p>
              <h4>개발 언어 및 라이브러리</h4>
              <p>백엔드: Node.js, prisma</p>
              <p>프론트엔드: React, Next.js, typescript, html, css</p>
              <h4>상세업무</h4>
              <ul className="bulleted-list">
                <li>firestore 활용 실시간 채팅 기능 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>react-chartjs2를 이용한 다이어트 그래프 구현</li>
              </ul>
              <ul className="bulleted-list">
                <li>react-calendar 활용한 다이어트 캘린더 구현</li>
              </ul>
              <figure className="image">
                <StaticImage
                  formats={['auto', 'webp', 'avif']}
                  src="../images/sagn_img.jpeg"
                  width={500}
                  height={280}
                  quality={95}
                  alt="franchise picture"
                />
              </figure>
            </details>
          </div>
        </div>
        <hr />
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5>인플루언서 매칭 서비스</h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2021.08 → 2022.02</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h4>프로젝트 소개</h4>
            <ul className="bulleted-list">
              <li>인플루언서 캠페인 매칭 서비스</li>
            </ul>
            <ul className="bulleted-list">
              <li>메인 개발자로 프로젝트 리드</li>
            </ul>
            <ul className="bulleted-list">
              <li>고객사, 개발자 2명, 기획자 1명, 디자이너 1명과 협업</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://gloryus.net">
                  https://gloryus.net
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <span className="highlight-gray">
                  <strong>기여도 70%</strong>
                </span>
              </li>
            </ul>
            <details>
              <summary>개발 환경 및 상세업무 확인</summary>
              <h4>개발환경</h4>
              <p>postgres, AWS (S3, ec2, Amplify)</p>
              <h4>개발 언어 및 라이브러리</h4>
              <p>백엔드: Ruby on Rails, ruby</p>
              <p>프론트엔드: React, Next.js, typescript html, css</p>
              <h4>상세업무</h4>
              <ul className="bulleted-list">
                <li>브랜드 &amp; 인플루언서 권한 및 페이지 분리, 회원별 다국어처리</li>
              </ul>
              <ul className="bulleted-list">
                <li>캠페인 업로드 및 신청 기능</li>
              </ul>
              <ul className="bulleted-list">
                <li>인스타그램 연동 (facebook api)</li>
              </ul>
              <ul className="bulleted-list">
                <li>aws cdk 활용 배포 작업, aws cognito를 이용한 회원 관리</li>
              </ul>
              <figure className="image">
                <StaticImage
                  formats={['auto', 'webp', 'avif']}
                  src="../images/gloryus_img.png"
                  width={500}
                  height={500}
                  quality={95}
                  alt="gloryus picture"
                />
              </figure>
            </details>
          </div>
        </div>
        <hr />
        <div className="column-list">
          <div style={{ width: '25%' }} className="column">
            <h5> 중고 거래 웹앱</h5>
            <p>
              <span className="title-primary_background">회사 프로젝트</span>
            </p>
            <p>2021.02 → 2021.08</p>
          </div>
          <div style={{ width: '75%' }} className="column">
            <h4>프로젝트 소개</h4>
            <ul className="bulleted-list">
              <li>사업자를 위한 중고거래 서비스</li>
            </ul>
            <ul className="bulleted-list">
              <li>고객사, 2명의 개발자와 협업</li>
            </ul>
            <ul className="bulleted-list">
              <li>
                앱스토어:
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://apps.apple.com/kr/app/%EB%AA%A8%EB%91%90%EB%8B%A4/id1577313215"
                >
                  https://apps.apple.com/kr/app/모두다/id1577313215
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                구글스토어:{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.modooda.app"
                >
                  https://play.google.com/store/apps/details?id=com.modooda.app
                </a>
              </li>
            </ul>
            <ul className="bulleted-list">
              <li>
                <span className="highlight-gray">
                  <strong>기여도 30%</strong>
                </span>
              </li>
            </ul>
            <details>
              <summary>개발 환경 및 상세업무 확인</summary>
              <h4>개발환경</h4>
              <p>postgres, AWS (S3, ec2)</p>
              <h4>개발 언어 및 라이브러리</h4>
              <p>백엔드: Ruby on Rails, ruby</p>
              <p>프론트엔드: React, typescript html, css</p>
              <h4>상세업무</h4>
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
                  src="../images/modooda_img.jpeg"
                  width={500}
                  height={220}
                  quality={95}
                  alt="gloryus picture"
                />
              </figure>
            </details>
          </div>
        </div>
        <hr />
        <div className="column-list">
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
              <li>O2O 모바일 패션 쇼핑몰. 사내 외주 프로젝트</li>
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
            <ul className="bulleted-list">
              <li>
                링크:{' '}
                <a target="_blank" rel="noreferrer" href="https://pppper.com/#/mypage">
                  https://pppper.com
                </a>
                /
              </li>
            </ul>
            <details>
              <summary>개발 환경 및 상세업무 확인</summary>
              <h4>개발환경</h4>
              <p>postgres, linux, atom</p>
              <h4>개발 언어 및 라이브러리</h4>
              <p>Ruby on Rails, ruby, javascript, jquery, html, css, framwork7</p>
              <h4>상세업무</h4>
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
                  src="../images/pppper_img.png"
                  width={480}
                  height={240}
                  quality={95}
                  alt="pppper picture"
                />
              </figure>
            </details>
          </div>
        </div>
      </section>
    </>
  )
}

export default DevExperience
