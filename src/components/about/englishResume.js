import React from 'react'

const EnglishResume = () => {
  return(
    <>
    
      <div className="en-resume mb-32">
      <div className="fixed-top-border" />
        <div className="container">
          <header>
            <h1 className="underline">Hayeon Kim</h1>
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
                    <span><b>Phone</b>: (+82) 010-3932-9826</span>
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
                    <b>Blog</b>: hayeondev.gatsbyjs.io
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <article>
            <h2 className="underline">Resume Objective</h2>
            
            <div className="row">
              Front-End Web Developer with 2+ years of experience in developing web/web-app applications, optimizing user interfaces, meticulous testing and debugging within Front-End Technologies.
              Value acquiring new technologies and organizing concepts through tech studies and tech blogs. Enjoy active code reviews, technical discussions with other developers, and eager to improve user experience by finding better solutions.
            </div>
          </article>
          
          <article>
            <h2 className="underline">Experience</h2>
            
            <div className="row exp-list">
              <ul>
                <li className="right">
                  <ul>
                    <li>May Oct 2022</li>
                  </ul>
                </li>
                <li className="header">Front-End Developer, <span>Finda - Seoul, Korea</span></li>
                <li>Assisted instructors by providing additional aid to students during their practical sessions</li>
                <li>Reviewed materials prior to scheduled practical session to provide accurate answers to questions</li>
              </ul>
            </div>
                
            <div className="row exp-list">
              <ul>
                <li className="right">
                  <ul>
                    <li>April 2021</li>
                  </ul>
                </li>
                <li className="header">Front-End Developer, <span>Insomenia - Seoul, Korea</span></li>
                <li>Performed full system setups, including building and initial system configuration.</li>
                <li>Installation of Windows or Linux Operating Systems.</li>
                <li>Assisted clients in person, and over the phone, to troubleshoot their system’s technical issues. Followed up to verify there were no additional issues.</li>
                <li>Installed software; provided technical support and guidance for the software.</li>
                <li>Ensured client’s hard drives were backed up to prevent data loss.</li>
                <li>Performed thin client setups, both onsite, and remotely using a Remote Desktop Protocol connection. Followed a set of strict guidelines</li>
                <li>Assisted in the launch of several websites, including launch-day troubleshooting, and weekly maintenance and updates.</li>					
              </ul>
            </div>
            
            <div className="row exp-list">
              <ul>
                <li className="right">
                  <ul>
                    <li>May 2020</li>
                  </ul>
                </li>
                <li className="header">Full-Stack Developer (Freelancer) <span>Insomenia - Seoul, Korea</span></li>
                <li>Held key responsibility to research, develop, and deploy a website for the company. Updated and maintained the website’s Sales section through documents provided routinely via email.</li>
                <li>Provided custom-written procedural documentation to the business owner, on how to properly use their website’s core functions.</li>
              </ul>
            </div>		
          </article>
          <article>
            <h2 className="underline">Languages and Technologies</h2>
            
            <div className="row tech">
              <ul>
                <li><span>Communication</span>:  Korean(fluent, native), English (fluent)</li>
                <li><span>Languages</span>: Javascript, Typescript, Ruby, Python</li>
                <li><span>Framework</span>: Next.js, Ruby on Rails / React</li>
                <li><span>Library</span>: Redux, Recoil, React-Query, TailwindCSS, Styled-Components, Jest, Cypress, Storybook</li>
                <li><span>Tools</span>: Yarn, Yarn Berry, Babel, Webpack, Git/Githhub, Bitbucket</li>
                <li><span>Collaboration</span>: Atlassian(Jira, Confluence), Slack</li>
              </ul>
            </div>
          </article>
          
          <article>
            <h2 className="underline">Education</h2>
            
            <div className="row">
              <ul>
                <li className="right">
                  <ul>
                    <li>Aug 2021</li>
                  </ul>
                </li>
                <li className="header">Graduate, Yonsei University <span>Seoul, Republic of Korea</span></li>
                <li> Bachelor of Creative Technology Management, Yonsei University Underwook International College</li>
                <li className="description">Learned Computer Science, Web Development and Digital Entrepreneurship</li>
                <li className="description">GPA: 3.62</li>
              </ul>
            </div>
          </article>
          <article>
            <h2 className="underline">References</h2>
            <div className="row">References Available Upon Request</div>
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