import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import CommentPage from '../components/comments'

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteUrl = data.site.siteMetadata?.siteUrl
  const { previous, next } = data
  const [viewCount, setViewCount] = useState()

  useEffect(() => {
    const namespace = siteUrl.replace(/(^\w+:|^)\/\//, '')
    const key = post?.fields?.slug.replace(/\//g, '')
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`).then(async result => {
      const data = await result.json()
      setViewCount(data.value)
    })
  }, [siteUrl, post?.fields?.slug])

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post?.frontmatter?.title}
        description={post.frontmatter.description || post.excerpt}
        image={post?.frontmatter?.image}
      />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header className="border-bottom">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p className="post-date justify-center">
            <span>{post.frontmatter.date} </span>
            <span className="text-xs">
              {`  `} {viewCount} views
            </span>
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <hr />
        <CommentPage />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          {previous && (
            <button className="button-outline">
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </button>
          )}

          {next && (
            <button className="button-outline">
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </button>
          )}
        </div>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        image
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
