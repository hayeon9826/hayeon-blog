import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const EnglishResume = () => {
  return (
    <>
      <div className="en-resume mb-32">
        <div className="fixed-top-border" />
        <div className="container">
          <header>
            <div className="column-start mb-2">
              <div className="row">
                <StaticImage
                  className="bio-avatar"
                  layout="fixed"
                  formats={['auto', 'webp', 'avif']}
                  src="../../images/profile_2.jpeg"
                  width={75}
                  height={75}
                  quality={95}
                  alt="Profile picture"
                />
              </div>
              <div className="row">
                <h2 className="mb-1 mt-0">Hayeon Kim</h2>
                <h5 className="mt-0 mb-0">Frontend Developer</h5>
              </div>
            </div>

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
                    <b>Blog</b>: hayeon-blog.vercel.app
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <article>
            <h2 className="underline">Resume Objective</h2>

            <div className="pb-15px">
              Highly motivated and adaptable Junior Front-end Web Developer with over 4 years of experience in web
              engineering. Possesses a strong foundation in advanced web development principles, with expertise in
              crafting user interfaces, implementing robust testing strategies, and efficiently debugging complex
              issues. Proven ability to design, improve, test, and maintain web applications, delivering exceptional
              user experiences. Skilled in a comprehensive set of technologies, including React, Next.js,
              JavaScript/TypeScript, state management libraries (Recoil, Redux, React Query), CSS frameworks (Tailwind
              CSS, styled-components, emotion), and backend knowledge (Ruby, Ruby on Rails). Thrives in both independent
              and collaborative environments, actively participating in code reviews and technical discussions to
              continuously optimize user experience through innovative solutions.
            </div>
          </article>

          <article>
            <h2 className="underline">Experience</h2>

            <div className="row exp-list">
              <ul>
                <li className="right">October 2023 - Present</li>
                <li className="header">
                  Front-End Developer, <span>SK Energy - Seoul, Korea</span>
                </li>
                <li>Implemented chaos engineering to test system resilience and improve error handling.</li>
                <li>Migrated a React project to Next.js 14, optimizing code and improving Lighthouse scores by 40%.</li>
                <li>
                  Led the overhaul of the design system, migrating from a legacy framework to a modern, reusable
                  architecture, significantly enhancing efficiency and maintainability.
                </li>
                <li>
                  Refactored the "Contact Us" and "Vehicle Registration" features, eliminating repetitive code and
                  creating reusable hooks.
                </li>
                <li>Developed promotional event pages with gift incentives to boost premium gasoline sales.</li>
                <li>
                  Refactored the "Contact Us" and "Vehicle Registration" features, removing redundant code and
                  developing reusable hooks for improved maintainability and efficiency.
                </li>
                <li>
                  Optimized the vehicle modification and creation process, implemented image lazy loading, and enhanced
                  the overall app design for better performance and user experience.
                </li>
                <li>
                  Leveraged advanced hooks, such as useQueryHook and Apollo GraphQL's useApolloNetworkStatus and
                  fetchPolicy, to enhance code efficiency and performance.
                </li>
              </ul>
            </div>

            <div className="row exp-list">
              <ul>
                <li className="right">May 2022</li>
                <li className="header">
                  Front-End Developer, <span>Finda - Seoul, Korea</span>
                </li>
                <li>
                  Redesigned the loan introduction page and implemented A/B testing to incrementally release the page
                  from 50% to 100% of users, closely monitoring user reactions and analyzing performance metrics for
                  errors and improvements.
                </li>
                <li>
                  Developed and maintained Finda web and Finda app web-views. Took charge of transferring Finda's main
                  loan list, loan main page, loan detail page into web-views.
                </li>
                <li>
                  Developed the 'In-App Contract' feature, enabling customers to finalize loan contracts directly within
                  the Finda App. Collaborated with designers to build and deploy the design system to Storybook,
                  utilizing Chromatic for enhanced functionality.
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
                  Updated legacy class components to modern functional components. Implemented Next.js SSG (Static Site
                  Generation) for data fetching, reducing API request time from 4 seconds to 0.5 seconds.
                </li>
                <li>
                  Refactored job opening page, and enabled HR team to directly update job openings by linking Google
                  Spread Sheet data to Finda web page.
                </li>
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
                  Authored over 20 technical documents and shared troubleshooting processes with fellow developers,
                  significantly enhancing the company's learning and development culture by promoting collaborative
                  problem-solving.
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
                  developing various features, admin development, QA, and maintenance.
                </li>
                <li>
                  Collaborated with designers using Figma to conduct web publishing and applied CSS with custom class
                  names following the BEM methodology for improved code structure and maintainability.
                </li>
                <li>Improved user experience by meticulous testing and frequent discussions with the clients.</li>
              </ul>
            </div>
          </article>
          <article>
            <h2 className="underline">Skills</h2>

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
                  <span>Library</span>: Recoil, React-Query, Redux, TailwindCSS, Styled-Components, Jest, Cypress,
                  Storybook, MSW, Apollo Graphql, Emotion
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
