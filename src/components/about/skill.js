import React from 'react'

const Skill = () => {
  return (
    <section className="about-skill mb-32">
      <h1>
        <span className="title-primary" style={{ borderBottom: '0.05em solid' }}>
          <span className="title-primary">Skill.</span>
        </span>
      </h1>
      <div className="column-list">
        <div style={{ width: '50%' }} className="column">
          <h4>1. Programming Language</h4>
          <ul className="bulleted-list">
            <li>Javascript, Typescript, Ruby, Python</li>
          </ul>
          <h4>2. Framework / Library</h4>
          <ul className="bulleted-list">
            <li>Next.js, Ruby on Rails</li>
          </ul>
          <ul className="bulleted-list">
            <li>React</li>
          </ul>
        </div>
        <div style={{ width: '50%' }} className="column">
          {/* <h4>4. Environments</h4>
          <ul className="bulleted-list">
            <li>
              AWS, MacOS
              <ul className="bulleted-list">
                <li style={{ listStyleType: 'circle' }}>
                  <strong>AWS</strong>: EC2, S3, Amplify, Cognito
                </li>
              </ul>
            </li>
          </ul> */}
          <h4>3. Frontend Library</h4>
          <ul className="bulleted-list">
            <li>Redux, Recoil</li>
            <li>React-Query, Apollo GraphQL</li>
            <li>TailwindCSS, Styled-Components, emotion</li>
            <li>MSW, Jest, Cypress</li>
          </ul>
          {/* <h4>4. DB</h4>
          <ul className="bulleted-list">
            <li>Postgres</li>
          </ul>
          <ul className="bulleted-list">
            <li>ORM: Prisma, ActiveRecord</li>
          </ul> */}
          <h4>4. Tools</h4>
          <ul id="256e629f-a527-43b1-aac9-09ac9dcbe5a0" className="bulleted-list">
            <li>Yarn, Yarn Berry, Babel, Webpack</li>
            <li>Git / Github, Bitbucket</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Skill
