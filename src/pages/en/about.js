import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import EnglishResume from '../../components/about/englishResume'

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} showLayout={false}>
      <Seo
        title="Hayeon Dev Blog | Hayeon Kim Frontend Resume"
        description={'Hayeon Kim Frontend Resume'}
        keywords={'Frontend, Engineer, FE, Developer, React, Next.js'}
      />
      <article className="page sans mb-32">
        <div className="page-body">
          <EnglishResume />
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
