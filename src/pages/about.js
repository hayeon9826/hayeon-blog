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

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Hayeon Dev Blog | About" />
      <article className="page sans mb-32">
        <div className="page-body">
          <Header />
          <Intro />
          {/* <Skill /> */}
          <Work />
          {/* <DevLife /> */}
          <DevExperience />
          <Education />
          {/* <ToyProject /> */}
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
