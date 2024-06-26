import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import CommentPage from '../components/comments'
import { ShareButtons } from '../components/shareButton'

const BlogPostTemplate = ({ data, location }) => {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://hayeon-blog.vercel.app'
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Hayeon | 기술 블로그`
  const { previous, next } = data

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={`Hayeon Dev Blog | ${post?.frontmatter?.title}`}
        description={post.frontmatter.description || post.excerpt}
        image={post?.frontmatter?.image}
        keywords={post?.frontmatter?.keywords || '프론트엔드, 기술 블로그, FE, 개발자, React, Next.js'}
      />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header className="border-bottom">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p className="post-date justify-center">
            <span className="text-sm">{post.frontmatter.date} </span>
          </p>
          <div className="mb-2">
            <span className="badge rounded-pill text-bg-secondary category-badge me-2">
              {post.frontmatter.category}
            </span>
            {post.frontmatter?.keywords?.split(', ')?.map(keyword => (
              <span className="badge rounded-pill text-bg-secondary keyword-badge me-2" key={keyword}>
                {keyword}
              </span>
            ))}
          </div>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <br />
        <ShareButtons
          url={url}
          title={post.frontmatter.title?.replace(/\s/g, '-')}
          description={post.frontmatter.description?.replace(/\s/g, '-')}
        />
        <br />
        <hr />
        <footer className="mb-5">
          <Bio />
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
                <button className="button-primary text-sm text-left" style={{ textAlign: 'left' }}>
                  <Link to={previous.fields.slug} rel="prev">
                    <span className="fw-normal">← Prev</span>
                    <br />
                    {previous.frontmatter.title?.substring(0, 20)}
                  </Link>
                </button>
              )}

              {next && (
                <button className="button-primary text-sm text-right" style={{ textAlign: 'right' }}>
                  <Link to={next.fields.slug} rel="next">
                    <span className="fw-normal">Next →</span>
                    <br />
                    {next.frontmatter.title?.substring(0, 20)}
                  </Link>
                </button>
              )}
            </div>
          </nav>
        </footer>
      </article>
      <CommentPage />
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
        keywords
        category
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
