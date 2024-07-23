import React from 'react'

const Education = () => {
  return (
    <>
      <section className="about-education mb-32">
        <h1>
          <span className="title-primary" style={{ borderBottom: '0.05em solid' }}>
            <span className="title-primary">Education.</span>
          </span>
        </h1>
        <p>
          <strong>2016 - 2021</strong>{' '}
          <a target="_blank" rel="noreferrer" href="https://uic.yonsei.ac.kr/main/default.asp">
            연세대학교 국제학부
          </a>{' '}
          창의기술경영학과 (졸업)
        </p>
        <p>
          <strong>2018 - 2020</strong> 전국 코딩동아리{' '}
          <a target="_blank" rel="noreferrer" href="https://likelion.net/">
            멋쟁이사자처럼
          </a>{' '}
          (6기 수료/ 7,8기 운영진)
        </p>
      </section>
    </>
  )
}

export default Education
