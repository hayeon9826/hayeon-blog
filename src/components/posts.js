import React, { useMemo } from 'react'
import NoPostPage from './noPost'
import PostPage from './post'

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
          return <PostPage post={post} key={post?.frontmatter?.title} />
        })}
      </ol>
    </>
  )
}

export default PostsPage
