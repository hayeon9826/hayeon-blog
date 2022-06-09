import * as React from "react"
import { graphql } from "gatsby"
import Category from '../components/category'
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import NoPostPage from "../components/noPost"
import PostsPage from "../components/posts"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const params = new URLSearchParams(location?.search);
  const category = params.get('category') || 'All'

  if (posts.length === 0) {
    return (
      <NoPostPage location={location} siteTitle={siteTitle} />
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Posts" />
      <Bio />
      <Category location={location}/>
      <PostsPage posts={posts} location={location} category={category}/>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          category
        }
      }
    }
  }
`
