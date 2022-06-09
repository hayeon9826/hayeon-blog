import React, { useMemo } from 'react'
import { Link } from 'gatsby'
import NoPostPage from './noPost'

const PostsPage = ({ posts, category, siteTitle, location }) => {
  const selectedPosts = useMemo(
    () => posts.filter(post => category === 'All' || post.frontmatter.category === category),
    [category, posts],
  )

  if (selectedPosts.length === 0) {
    return <NoPostPage location={location} siteTitle={siteTitle} />
  }

  return (
    <>
      <ol style={{ listStyle: `none` }} className="mb-32">
        {selectedPosts?.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small className="post-date">{post.frontmatter.date}</small>
                  <small className="post-badge">{post.frontmatter.category}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </>
  )
}

export default PostsPage
