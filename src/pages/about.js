import * as React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" />
      <article className="page sans mb-32">
        <header>
          <h2 className="page-title">안녕하세요, 프론트엔드 개발자 김하연입니다. 👩🏻‍💻</h2>
        </header>
        <div className="page-body">
          <h4>“빠른 코드 이해력, 소통하는 협업 능력, 효율적이고 가독성 좋은 코드”</h4>
          <ul className="bulleted-list">
            <li><strong>2년차</strong> 프론트엔드 개발자 김하연 입니다.</li>
          </ul>
          <ul className="bulleted-list">
            <li>11개월의 프리랜서 경력와 1년의 1개월 경력으로 총 <strong>2년</strong>의 경력이 있습니다.</li>
          </ul>
            <div className="column-list">
                <div className="column">
                  <figure className="image">
                    <StaticImage
                      formats={["auto", "webp", "avif"]}
                      src="../images/profile_img.jpeg"
                      width={240}
                      height={300}
                      quality={95}
                      alt="Profile picture"
                    />
                  </figure>
                </div>
                <div style={{width: '55%'}} className="column">
                  <div className="name-text"><strong>김하연 (Hayeon Kim)</strong></div>
                  <div className="title-md"><strong><span className="title-primary">Contact.</span></strong></div>
                  <p>📞 <strong>010-3932-9826</strong></p>
                  <p>✉️ <strong><a href="mailto:hayeonkim226@gmail.com">hayeonkim226@gmail.com</a></strong><strong> </strong></p>
                  <div className="title-md"><strong><span className="title-primary">Channel</span><span className="title-primary"><strong>.</strong></span></strong></div>
                  <p>🖥️ <strong><a target="_blank" rel="noreferrer" href="http://github.com/hayeon9826">github.com/hayeon9826</a></strong></p>
                  <p>🔗 <strong><a target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/khy226">linkedin.com/in/khy226</a></strong></p>
                  <p>🏠 <strong><a target="_blank" rel="noreferrer" href="https://velog.io/@khy226">https://velog.io/@khy226</a></strong><strong> </strong></p>
                </div>
            </div>
            <hr />
            <h1><span className="title-primary" style={{borderBottom: '0.05em solid'}}><span>Introduction.</span></span></h1>
            <p> 대출 비교 서비스 <a href="https://finda.co.kr/" target="_blank" rel="noreferrer">'핀다'</a>에서 React, Next.js를 사용하며, 프론트엔드 개발자로 일하고 있는 2년차 개발자 김하연 입니다. 현재 가장 자주 사용하는 언어는 React(Next.js) 이며, 프론트엔드 React (Next.js)와 백엔드 (Node.js), Ruby on Rails로 스타트업 서비스를 다수 제작하였습니다.</p>
            <p>전국 대학생 연합 프로그래밍 동아리 활동을 계기로 2년의 운영진 활동, 세 번의 서비스 런칭, 개인/ 외주 프로젝트, 그리고 2년동안 스타트업 전문 개발사를 경험하며 더욱 전문적인 개발자로 성장하고 있습니다.</p>
            <p>직접 기획한 서비스를 개발/배포/운영한 경험이 다수 있으며 주로 모바일앱과 반응형 웹 개발을 담당하고 있습니다. 새로운 기술을 열정적이고 빠르게 습득하며, 고객사, 디자이너, 기획사, 개발자등 여러 직무와 함께 협업한 경력을 바탕으로 팀원들 간의 협업과 소통을 중요시합니다.</p>
            <hr />
            <h1><span style={{borderBottom: '0.05em solid'}}><span className="title-primary">Skill.</span></span></h1>
            <div className="column-list">
                <div style={{width: '50%'}} className="column">
                  <h4>1. Programming Language</h4>
                  <ul className="bulleted-list">
                    <li>Javascript, Typescript, Ruby, Python</li>
                  </ul>
                  <h4>2. Framework / Library</h4>
                  <ul className="bulleted-list">
                    <li>Next.js, Ruby on Rails, Framework7</li>
                  </ul>
                  <ul className="bulleted-list">
                    <li>React, Jquery, Bootstrap, Tailwind</li>
                  </ul>
                  <h4>3. Frontend Library</h4>
                  <ul className="bulleted-list">
                    <li>Redux, MobX, Recoil</li>
                    <li>React-Query, RTK-Query</li>
                    <li>TailwindCSS, Styled-Components</li>
                  </ul>
                </div>
                <div style={{width: '50%'}} className="column">
                  <h4>4. Environments</h4>
                  <ul className="bulleted-list">
                    <li>AWS, MacOS
                      <ul className="bulleted-list">
                        <li style={{listStyleType: 'circle'}}><strong>AWS</strong>: EC2, S3, Amplify, Cognito</li>
                      </ul>
                    </li>
                  </ul>
                  <h4>5. DB</h4>
                  <ul className="bulleted-list">
                    <li>Postgres</li>
                  </ul>
                  <ul className="bulleted-list">
                    <li>ORM: Prisma, ActiveRecord</li>
                  </ul>
                  <h4>6. ETC</h4>
                  <ul id="256e629f-a527-43b1-aac9-09ac9dcbe5a0" className="bulleted-list">
                    <li>Yarn, Babel, Webpack</li>
                    <li>Git / Github, Bitbucket</li>
                  </ul>
                </div>
            </div>
            <hr />
            <h1><span className="title-primary"><span style={{borderBottom: '0.05em solid'}}>Dev Life.</span></span></h1>
            <details>
              <summary>Dev Life 상세보기</summary>
              <div className="column-list">
                <div style={{width: '33.333333333333336%'}} className="column">
                    <h4>SCHOOL</h4>
                    <p><strong>2020</strong> 멋쟁이사자처럼 운영진</p>
                    <p><strong>2020</strong> 난민 커피 구매 모바일 </p>
                    <p>웹 사이트 Blend 개발</p>
                    <p><strong>2019</strong> 신촌 해커톤 'LIKEOWL' 개최 및 운영</p>
                    <p><strong>2019</strong> 배리어프리 여행 서비스 Wheel-ing 개발</p>
                    <p><strong>2019</strong> 멋쟁이사자처럼 운영진 활동 (django 코딩 교육)</p>
                    <p><strong>2018</strong> 멋쟁이사자처럼 전국 해커톤 참석</p>
                    <p><strong>2018</strong> 멋쟁이사자처럼 6기 수료</p>
                </div>
                <div style={{width: '33.333333333333336%'}} className="column">
                    <h4>PROJECT</h4>
                    <p><strong>2020</strong> 피부 관리 O2O 채팅 서비스 '피링' 개발</p>
                    <p><strong>2019</strong> 학회 소개 사이트 'CAC' 개발</p>
                    <p><strong>2019 </strong>학술지 크롤링 사이트</p>
                    <p>'Asianalyse' 개발</p>
                    <p>2019 마스크팩 추천 커머스 </p>
                    <p>'hiskin' 개발</p>
                    <p><strong>2019</strong> 웹진 서비스, Segan 개발</p>
                </div>
                <div style={{width: '33.33333333333333%'}} className="column">
                    <h4>WORK</h4>
                    <p><strong>2022.05</strong></p>
                    <p>대출 비교 플랫폼, 핀다 입사 (Frontend / Web)</p>
                    <p><strong>2021.04 ~ 2022.02</strong></p>
                    <p>스타트업 서비스 및 내부 빌더 개발</p>
                    <p><strong>2021.04</strong> 인썸니아 정규직 입사</p>
                    <p>(팀장 전환)</p>
                    <p><strong>2020.05 ~ 2021.03</strong></p>
                    <p>스타트업 서비스 다수 개발</p>
                    <p><strong>2020.05</strong> 인썸니아 프리랜서 계약 (팀원)</p>
                </div>
              </div>
              <figure className="image">
                <StaticImage
                  formats={["auto", "webp", "avif"]}
                  src="../images/timeline.png"
                  width={640}
                  height={240}
                  quality={95}
                  alt="timeline picture"
                />
              </figure>
            </details>
            <hr />
            <h1><span style={{borderBottom: '0.05em solid'}}><span className="title-primary">Work Experience.</span></span></h1>
            <div className="title-lg"><a href="https://finda.co.kr/" target="_blank" rel="noreferrer">finda</a></div>
            <p>세상에 없던 대출 비교 플랫폼, 핀다</p>
            <p><strong>FE 개발 (Tech/Web팀)</strong></p>
            <p><span className="highlight-gray">2022.05 - 현재</span></p>
            <br />
            <div className="title-lg"><a target="_blank" rel="noreferrer" href="https://insomenia.com/">Insomenia</a></div>
            <p>스타트업 플랫폼 1등 개발사, 인썸니아</p>
            <p><strong>개발 2팀 팀장(책임)</strong></p>
            <p><span className="highlight-gray">2021.04-2022.04</span></p>
            <ul className="bulleted-list">
                <li>Rails(BE)와 React(FE)를 이용한 웹 서비스 개발 및 유지보수, React 활용한 인썸니아 내부 빌더 제작 참여</li>
            </ul>
            <ul className="bulleted-list">
                <li>Next.js/ Node.js/ Prisma를 이용한 웹 서비스 다수 개발 및 유지보수</li>
            </ul>
            <ul className="bulleted-list">
                <li>AWS 서비스를 이용한 사용자 관리(Cognito) 및 배포 (ec2, s3)</li>
            </ul>
            <br />
            <p><strong>개발 1팀 팀원 (프리랜서)</strong></p>
            <p><span className="highlight-gray">2020.05-2021.03</span></p>
            <ul className="bulleted-list">
                <li>Rails와 framework7을 이용한 웹 서비스 개발 및 유지보수</li>
            </ul>
            <ul className="bulleted-list">
                <li>5개의 스타트업 웹앱 서비스 구현 및 런칭</li>
            </ul>
            <hr />
            <h1><span style={{borderBottom: '0.05em solid'}}><span className="title-primary">Dev Experience.</span></span></h1>
            <div className="column-list">
                <div style={{width: '25%'}} className="column">
                  <h5><strong>프랜차이즈 관리 웹 서비스</strong></h5>
                  <p><span className="title-primary_background">회사 프로젝트</span></p>
                  <p>2021.11 → 2022.02</p>
                  <p>
                  </p>
                </div>
                <div style={{width: '75%'}} className="column">
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
                      <li><strong>기여도 50%</strong></li>
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
                        formats={["auto", "webp", "avif"]}
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
              <div style={{width: '25%'}} className="column">
                <h5>다이어트 관리 앱</h5>
                <p><span className="title-primary_background">회사 프로젝트</span></p>
                <p>2021.11 → 2022.02</p>
              </div>
              <div style={{width: '75%'}} className="column">
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
                      <li><span className="highlight-gray"><strong>기여도 50%</strong></span></li>
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
                        formats={["auto", "webp", "avif"]}
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
                <div style={{width: '25%'}} className="column">
                    <h5>인플루언서 매칭 서비스</h5>
                    <p><span className="title-primary_background">회사 프로젝트</span></p>
                    <p>2021.08 → 2022.02</p>
                </div>
                <div style={{width: '75%'}} className="column">
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
                        <li>링크: <a target="_blank" rel="noreferrer" href="https://gloryus.net">https://gloryus.net</a></li>
                    </ul>
                    <ul className="bulleted-list">
                        <li><span className="highlight-gray"><strong>기여도 70%</strong></span></li>
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
                          formats={["auto", "webp", "avif"]}
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
                <div style={{width: '25%'}} className="column">
                    <h5> 중고 거래 웹앱</h5>
                    <p><span className="title-primary_background">회사 프로젝트</span></p>
                    <p>2021.02 → 2021.08</p>
                </div>
                <div style={{width: '75%'}} className="column">
                    <h4>프로젝트 소개</h4>
                    <ul className="bulleted-list">
                        <li>사업자를 위한 중고거래 서비스</li>
                    </ul>
                    <ul className="bulleted-list">
                        <li>고객사, 2명의 개발자와 협업</li>
                    </ul>
                    <ul className="bulleted-list">
                        <li>앱스토어:<a target="_blank" rel="noreferrer" href="https://apps.apple.com/kr/app/%EB%AA%A8%EB%91%90%EB%8B%A4/id1577313215">https://apps.apple.com/kr/app/모두다/id1577313215</a></li>
                    </ul>
                    <ul className="bulleted-list">
                        <li>구글스토어: <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=com.modooda.app">https://play.google.com/store/apps/details?id=com.modooda.app</a></li>
                    </ul>
                    <ul className="bulleted-list">
                        <li><span className="highlight-gray"><strong>기여도 30%</strong></span></li>
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
                          formats={["auto", "webp", "avif"]}
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
                <div style={{width: '25%'}} className="column">
                    <h5> 패션 SNS 쇼핑몰 </h5>
                    <p><span className="title-primary_background">회사 프로젝트</span></p>
                    <p>2020.10 → 2021.07</p>
                </div>
                <div style={{width: '75%'}} className="column">
                    <h4>프로젝트 소개</h4>
                    <ul className="bulleted-list">
                        <li>O2O 모바일 패션 쇼핑몰. 사내 외주 프로젝트</li>
                    </ul>
                    <ul className="bulleted-list">
                        <li>메인 개발자로 프로젝트 리드</li>
                    </ul>
                    <ul className="bulleted-list">
                        <li><strong><span className="highlight-gray">기여도 80%</span></strong></li>
                    </ul>
                    <ul className="bulleted-list">
                        <li>링크: <a target="_blank" rel="noreferrer" href="https://pppper.com/#/mypage">https://pppper.com</a>/</li>
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
                          formats={["auto", "webp", "avif"]}
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
            <hr />
            <h1><span style={{borderBottom: '0.05em solid'}}><span className="title-primary">Education.</span></span></h1>
            <p><strong>2022.05 - </strong> 대출 비교 플랫폼, <a target="_blank" rel="noreferrer" href="https://finda.co.kr/">핀다</a> 정규직 (FE 개발)</p>
            <p><strong>2021.04 - 2022.04</strong> 웹/앱 스타트업 전문 개발사 <a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> 정규직 (BE, FE 개발)</p>
            <p><strong>2020.05 - 2021.03</strong> 웹/앱 스타트업 전문 개발사 <a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> (Fullstack, 프리랜서)</p>
            <p><strong>2018 - 2020</strong> 전국 코딩동아리 <a target="_blank" rel="noreferrer" href="https://likelion.net/">멋쟁이사자처럼</a> (6기 수료/ 7,8기 운영진)</p>
            <p><strong>2016 - 2021</strong> <a target="_blank" rel="noreferrer" href="https://uic.yonsei.ac.kr/main/default.asp">연세대학교 국제학부</a> 창의기술경영학과 (졸업)</p>
            <p><strong>2013 - 2016</strong> 대전외국어고등학교 중국어학과 (졸업)</p>
            <hr />
            <h1><span style={{borderBottom: '0.05em solid'}}><span className="title-primary">Toy Projects.</span></span></h1>
            <details>
              <summary>Toy Projects 상세 보기</summary>
              <div className="column-list">
                <div style={{width: '31.25%'}} className="column">
                  <p><strong><strong>구글 캘린더 클론</strong></strong></p>
                  <p>2022.03</p>
                  <p>개인 토이 프로젝트</p>
                </div>
                <div style={{width: '68.75%'}} className="column">
                  <ul className="bulleted-list">
                      <li>개인 토이 프로젝트 (<strong>구글 캘린더 클론 프로젝트)</strong></li>
                  </ul>
                  <ul className="bulleted-list">
                      <li>사용스택: React(create-react-app), Redux-Toolkit, typescript, tailwindcss</li>
                  </ul>
                  <ul className="bulleted-list">
                      <li>구현 기능: Redux-Toolkit를 이용한 상태 관리, 주별/월별 캘린더 보기, 선택한 날짜로 화면 변경, 왼쪽 상단 date picker, 이벤트 등록 및 삭제 기능 (제목, 날짜, 시간, 색상)</li>
                  </ul>
                  <ul className="bulleted-list">
                      <li>깃헙링크: <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/google-calendar">https://github.com/hayeon9826/google-calendar</a></li>
                  </ul>
                  <ul className="bulleted-list">
                      <li>실서버 링크: <a target="_blank" rel="noreferrer" href="https://google-calendar-pearl.vercel.app/">https://google-calendar-pearl.vercel.app/</a></li>
                  </ul>
                  <ul className="bulleted-list">
                      <li><span className="highlight-gray"><strong>기여도 100%</strong></span></li>
                  </ul>
                </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p>오늘 배움 (TIL) 서비스</p>
                      <p>2021.12 ~ 2022.02</p>
                      <p>개인 토이 프로젝트</p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>개인 토이 프로젝트</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용스택: Next.js, Graphql, Rails, ruby, tailwind</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>구현 기능: graphql 을 이용한 crud 게시판 기능 작업, jwt 토큰 로그인, 회원가입 플로우 구현</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>깃헙링크: <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/tiltil-server">https://github.com/hayeon9826/tiltil-server</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 100%</strong></span></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p>드론 마켓 서비스<strong> </strong></p>
                      <p><span className="highlight-gray">2021.07 ~ 2021.09</span></p>
                      <p><a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> 내부 프로젝트</p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>사내 외주 프로젝트 (서브개발, 퍼블리싱)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: rails, ruby, html, css, javascript</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>구현 기능: 피그마를 참고하여 퍼블리싱 작업</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>링크: <a target="_blank" rel="noreferrer" href="https://beehigh.co.kr/">https://beehigh.co.kr/</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 10%</strong></span></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><strong>인썸니아 빌더 </strong></p>
                      <p><span className="highlight-gray">2021.04 ~ 2021.08</span></p>
                      <p><a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> 내부 프로젝트</p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>사내 빌더 프로젝트 (서브개발)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: react, rails, typescript</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>구현 기능: react를 활용해 재사용할 수 있는 컴포넌트 구현 (좋아요 기능, 게시판 기능, 상품 생성 및 수정, 지도 기능, 댓글 기능, 문의 기능, 레이아웃 정리)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 10%</strong></span></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><strong>O2O 학원 매칭 서비스</strong></p>
                      <p><span className="highlight-gray">2020.12 ~ 2021.11</span></p>
                      <p><a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> 프로젝트</p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>사내 외주 프로젝트 (서브개발)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu, framework7</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>구현 기능: Ruby on rails를 활용하여 학원 거리순 정렬, ajax 활용해서 주변 지역별로 가까운 학원 보여주기, 학원 및 강의 신청, 수강 강의 확인 페이지 개발</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>링크: <a target="_blank" rel="noreferrer" href="https://justplay.co.kr/">https://justplay.co.kr/</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 50%</strong></span></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><strong>모바일 장난감 커머스</strong></p>
                      <p><span className="highlight-gray">2020.09 ~ 2020.12</span></p>
                      <p><a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> 프로젝트</p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>사내 외주 프로젝트 (서브개발)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu, framework7</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사장님 메뉴, 상점 등록 기능, 상품 등록 및 옵션 추가 기능, ui 개선, 타 장난감 마켓 크롤링 구현</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>링크: <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=com.toyfix">https://play.google.com/store/apps/details?id=com.toyfix</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><strong><span className="highlight-gray">기여도 20%</span></strong></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><strong>코디 추천 서비스</strong></p>
                      <p><span className="highlight-gray">2020.06 ~ 2020.12</span></p>
                      <p><a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> 프로젝트</p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>사내 외주 프로젝트 (서브개발)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu, framework7</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>구현 기능: Ruby on rails를 활용하여 옷 색깔 필터 구현, jquery ui의 drag & drop 기능으로 코디 만들기 드래그 앤 드롭 기능 구현, 인플루언서 & 일반 유저 간 코디 요청/ 전송 기능 구현</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 70%</strong></span></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><strong>BM 제작 서비스</strong></p>
                      <p><span className="highlight-gray">2020.05 ~ 2020.11</span></p>
                      <p><a target="_blank" rel="noreferrer" href="https://insomenia.com/">인썸니아</a> 프로젝트</p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>사내 외주 프로젝트 (서브개발)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: ruby on rails, html, css, javascript, jquery, ubuntu</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>구현 기능: Ruby on rails를 활용하여 카드를 선택/생성 후 비즈니스 모델 공유 시스템 개발, 엑셀 및 pdf 익스포트 기능 구현, import와 연동하여 정기 결제/일반 결제 기능 구현</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 50%</strong></span></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>링크: <a target="_blank" rel="noreferrer" href="https://cofounder.co.kr/">https://cofounder.co.kr/</a></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><a target="_blank" rel="noreferrer" href="http://cacers.com"><strong>Cacers</strong></a></p>
                      <p>개인 외주 프로젝트</p>
                      <p><span className="highlight-gray">2020.10</span></p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>교내 학회 소개 사이트(개인 외주)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: ruby on rails, html , css, javascript, ubuntu</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>링크: <a target="_blank" rel="noreferrer" href="https://cacers.com/">https://cacers.com/</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>깃헙: <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/blend_app">https://github.com/hayeon9826/</a>cac-web</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><strong><span className="highlight-gray">기여도 100%</span></strong></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><a target="_blank" rel="noreferrer" href="http://blend2020.herokuapp.com"><strong>blend</strong></a></p>
                      <p>교내 프로젝트</p>
                      <p><span className="highlight-gray">2020.04 ~ 2020.07</span></p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>난민 커피 소개 사이트 (학교 프로젝트)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: Ruby on Rails, ruby, javascript, jquery, html, css</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사이트: <a target="_blank" rel="noreferrer" href="https://blend2020.herokuapp.com/">https://blend2020.herokuapp.com/</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>깃헙: <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/blend_app">https://github.com/hayeon9826/blend_app</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 100%</strong></span></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><strong><a target="_blank" rel="noreferrer" href="http://asianalyse.com">Asianalyse</a></strong></p>
                      <p>개인 외주 프로젝트</p>
                      <p><span className="highlight-gray">2019.10 ~ 2020.03</span></p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>개인 프로젝트로 진행한 학술지 크롤링 웹 사이트.</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: postgres, AWS, EC2, ruby on rails, html, css, javascript, 헤로쿠, 카페24 (ubuntu), postgres</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사이트: <span className="highlight-gray"><a target="_blank" rel="noreferrer" href="https://asianalyse.com/">https://asianalyse.com</a></span></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>깃헙: <a target="_blank" rel="noreferrer" href="https://github.com/hayeon9826/asian-analyse">https://github.com/hayeon9826/asian-analyse</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 100%</strong></span></li>
                      </ul>
                  </div>
              </div>
              <div className="column-list">
                  <div style={{width: '31.25%'}} className="column">
                      <p><a target="_blank" rel="noreferrer" href="http://wheeling.herokuapp.com"><strong>Wheel-ing</strong></a></p>
                      <p>교내 프로젝트</p>
                      <p><span className="highlight-gray">2019.04 ~ 2019.08</span></p>
                  </div>
                  <div style={{width: '68.75%'}} className="column">
                      <ul className="bulleted-list">
                          <li>베리어 프리 여행지 추천 사이트 (학교 프로젝트)</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사용 스택: ruby on rails, html, css, javascript, 헤로쿠, 아마존 s3, postgres</li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>사이트: <a target="_blank" rel="noreferrer" href="https://wheeling.herokuapp.com/">https://wheeling.herokuapp.com/</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li>깃헙: <a target="_blank" rel="noreferrer" href="https://github.com/kratzjgy/wheeling">https://github.com/kratzjgy/wheeling</a></li>
                      </ul>
                      <ul className="bulleted-list">
                          <li><span className="highlight-gray"><strong>기여도 100%</strong></span></li>
                      </ul>
                  </div>
              </div>
            </details>
          </div>
      </article>  
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
