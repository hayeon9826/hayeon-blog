import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import CommentPage from '../components/comments'
import { ShareButtons } from '../components/shareButton'

const BlogPostTemplate = ({ data, location }) => {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://hayeondev.gatsbyjs.io'
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Hayeon | 기술 블로그`
  const siteUrl = data.site.siteMetadata?.siteUrl
  const { previous, next } = data
  const [viewCount, setViewCount] = useState(0)

  useEffect(() => {
    const namespace = siteUrl.replace(/(^\w+:|^)\/\//, '')
    const key = post?.fields?.slug.replace(/\//g, '')
    if (!url.includes('localhost')) {
      fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`).then(async result => {
        const data = await result.json()
        setViewCount(data.value)
      })
    }
  }, [siteUrl, post?.fields?.slug])

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
            <span className="text-xs">
              {`  `} {viewCount} views
            </span>
          </p>
          <div className="mb-2">
            {post.frontmatter?.keywords?.split(', ')?.map(keyword => (
              <span className="badge rounded-pill text-bg-secondary keyword-badge me-2">{keyword}</span>
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
                <button className="button-primary text-sm">
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                </button>
              )}

              {next && (
                <button className="button-primary text-sm">
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
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
