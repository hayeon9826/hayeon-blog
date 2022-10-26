import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Header from '../components/about/header'
import Intro from '../components/about/intro'
import DevLife from '../components/about/devlife'
import Skill from '../components/about/skill'
import Work from '../components/about/work'
import DevExperience from '../components/about/devexperience'
import Education from '../components/about/education'
import ToyProject from '../components/about/toyproject'
import OtherExperience from '../components/about/otherexperience'

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="Hayeon Dev Blog | 김하연 이력서"
        description={'2년차 프론트엔드 개발자 김하연 이력서'}
        keywords={'프론트엔드, 기술 블로그, FE, 개발자, React, Next.js'}
      />
      <article className="page sans mb-32">
        <div className="page-body about-page">
          <Header location={location} />
          <Intro />

          <Work />
          {/* <DevLife /> */}
          <DevExperience />
          <ToyProject />
          <OtherExperience />
          <Skill />
          <Education />
        </div>
      </article>
      <div className="mt-100">
        <small>
          Frontend Engineer, Hayeon Kim{' '}
          <a href="https://github.com/hayeon9826" target="_blank">
            @hayeon9826
          </a>
          <br />
          Inspired By{' '}
          <a href="https://jbee.io/about" target="_blank">
            jbee
          </a>
          ,{' '}
          <a href="https://wonny.oopy.io/" target="_blank">
            Wonny
          </a>
        </small>
      </div>
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
