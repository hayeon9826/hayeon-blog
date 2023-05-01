import React from 'react'

const EnglishResume = () => {
  return (
    <>
      <div className="en-resume mb-32">
        <div className="fixed-top-border" />
        <div className="container">
          <header>
            <h2 className="underline">Hayeon Kim</h2>
            <h4 className="mt-0">Frontend Developer</h4>
            <div className="column-list w-full">
              <div className="row">
                <ul>
                  <li className="email">
                    <b>Email</b>: hayeonkim226@gmail.com
                  </li>
                  <li className="location">
                    <b>Address</b>: Seoul, Republic of Korea
                  </li>
                  <li className="phone">
                    <span>
                      <b>Phone</b>: (+82) 010-3932-9826
                    </span>
                  </li>
                </ul>
              </div>
              <div className="row">
                <ul>
                  <li className="linkedin">
                    <b>Linkedin</b>: linkedin.com/in/khy226
                  </li>
                  <li className="github">
                    <b>Github</b>: github.com/hayeon9826
                  </li>
                  <li className="blog">
                    <b>Blog</b>: hayeondev.com
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <article>
            <h2 className="underline">Resume Objective</h2>

            <div className="pb-15px">
              Front-End Web Developer with 3 years of experience in developing web applications, optimizing user
              interfaces, and meticulous testing & debugging. Value acquiring new technologies and organizing concepts
              through tech studies and writing tech blogs. Enjoy active code reviews, technical discussions with other
              developers, and eager to improve user experience by finding better solutions.
            </div>
          </article>

          <article>
            <h2 className="underline">Experience</h2>

            <div className="row exp-list">
              <ul>
                <li className="right">May 2022</li>
                <li className="header">
                  Front-End Developer, <span>Finda - Seoul, Korea</span>
                </li>
                <li>
                  Developed and maintained Finda web and Finda app webviews. Took charge of transferring loan list, loan
                  main page, loan detail page into webviews.{' '}
                </li>
                <li>
                  Developed 'in-app contract' feature, where customers could conclude a loan contract via Finda App.
                  Also, built desgin system and deployed to Storybook (with chromatic) by cooperating with the
                  designers.
                </li>
                <li>
                  Improved inefficient API call structure by implementing Redux. Decreased redundant API calls by 60%.
                </li>
                <li>
                  Improved user experience by implementing infinite scroll on address search Modal using Intersection
                  Observer.
                </li>
                <li>
                  Contributed on building design system and organized Finda Components on Storybook. Reduced
                  communication requests on Jira (Confluence Cooperation Tool) by 20%.
                </li>
                <li>
                  Updated legacy code (class components) to new functional components. Implemented Next.js SSG(Static
                  Side Generation) on data fetching to improve API request time. Decreased API fetching time from 4s to
                  0.5s.
                </li>
                {/* <li>
                  Refactored job opening page, and enabled HR team to directly update job openings by linking Google
                  Spread Sheet data to Finda web page.
                </li> */}
              </ul>
            </div>

            <div className="row exp-list">
              <ul>
                <li className="right">April 2021</li>
                <li className="header">
                  Front-End Developer, <span>Insomenia - Seoul, Korea</span>
                </li>
                <li>Developed and maintained five startup web services using Ruby on Rails (BE) and React (FE).</li>
                <li>
                  Applied Next.js, Node.js, and Prisma for advanced front-end development and better user experience.
                </li>
                <li>
                  Participated in developer Insomenia web-builder template: 'Likes, Item lists, Post list, Login &
                  Registration, Cart' features. Approximately saved 80 hours of each developer's inital setup time.
                </li>
                <li>
                  Transferred MVP startup service to AWS for better security and scalability. Applied AWS Cognito on
                  user registrations and deployed via AWS EC2 and S3.
                </li>
                <li>
                  Worked on more than 20 technical documents and shared various troubleshooting processes with other
                  developers. Improved the company's 'learning development culture' by sharing problem solving process
                  with everyone.
                </li>
              </ul>
            </div>

            <div className="row exp-list">
              <ul>
                <li className="right">May 2020</li>
                <li className="header">
                  Full-Stack Developer (Freelancer) <span>Insomenia - Seoul, Korea</span>
                </li>
                <li>Developed and maintained five web services using Ruby on Rails and framework7. </li>
                <li>
                  Experienced the entire web developing process: from designing DB structure to project settings,
                  developing various featrues, admin development, QA, and maintenance.
                </li>
                <li>
                  Conducted web publishing collaborating with desginer (using figma), and applied CSS with custom class
                  names in BEM model.
                </li>
                <li>Improved user experience by meticulous testing and frequent discussions with the clients.</li>
              </ul>
            </div>
          </article>
          <article>
            <h2 className="underline">Languages and Technologies</h2>

            <div className="row tech">
              <ul>
                <li>
                  <span>Communication</span>: Korean(fluent, native), English (fluent)
                </li>
                <li>
                  <span>Languages</span>: Javascript, Typescript, Ruby, Python
                </li>
                <li>
                  <span>Framework</span>: Next.js, Ruby on Rails / React
                </li>
                <li>
                  <span>Library</span>: Redux, Recoil, React-Query, TailwindCSS, Styled-Components, Jest, Cypress,
                  Storybook
                </li>
                <li>
                  <span>Dev Tools</span>: Yarn, Yarn Berry, Babel, Webpack, Git/Githhub, Bitbucket
                </li>
                <li>
                  <span>Collaboration Tools</span>: Atlassian(Jira, Confluence), Slack, Google(Calendar, Slides, Sheets,
                  Meet)
                </li>
                <li>
                  <span>Soft Skills</span>: Interpersonal Communications, Collaboration, Time Management, Perseverance,
                  Problem Solving, Self-Learning, Open-Mindedness
                </li>
              </ul>
            </div>
          </article>

          <article>
            <h2 className="underline">Education</h2>
            <div className="row">
              <ul>
                <li className="right">Aug 2021</li>
                <li className="header">
                  Graduate, Yonsei University <span>Seoul, Republic of Korea</span>
                </li>
                <li>
                  {' '}
                  Bachelor Degree of <b>Creative Technology Management(CTM)</b>, Yonsei University Underwood
                  International College
                </li>
                <li>Learned Computer Science, Web Development and Digital Entrepreneurship</li>
                <li>
                  Relevant courses:{' '}
                  <span className="description">
                    IT Foundation, Techno-Art Capstone Project, Information Security and Privacy, Internet Programming,
                    Introduction to Computer Science, Computer Networks, Information Processing, Business Strategy and
                    Data Analytics, Computational Thinking and Problem Solving
                  </span>
                </li>
                <li>GPA: 3.62 / 4.5</li>
              </ul>
            </div>
          </article>
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  )
}

export default EnglishResume
