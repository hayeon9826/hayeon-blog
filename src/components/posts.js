import React, { useState, useCallback } from 'react'
import NoPostPage from './noPost'
import PostPage from './post'
import useInfiniteScroll from '../utils/useInfiniteScroll'

const PostsPage = ({ posts, category, siteTitle = 'Hayeon Dev Blog', location }) => {
  const [count, setCount] = useState(10)
  const [isScroll, setIsScroll] = useState(true)
  const [, setRef] = useInfiniteScroll((entry, observer) => {
    // count가 총 포스트 수 보다 작을때만 useInfiniteScroll 작동
    if (posts.length >= count) {
      loadMorePosts()
    }
  })

  const loadMorePosts = useCallback(() => {
    if (isScroll) {
      setIsScroll(false)
      setTimeout(() => {
        setIsScroll(true)
        setCount(v => {
          if (v + 5 <= posts.length) return v + 5
          return v + 5
        })
      }, 200)
    }
  }, [posts, isScroll])

  if (posts.length === 0) {
    return <NoPostPage location={location} siteTitle={siteTitle} />
  }

  return (
    <>
      <ol style={{ listStyle: `none` }} className="mb-32">
        {posts?.slice(0, count).map(post => {
          return <PostPage post={post} key={post?.frontmatter?.title} />
        })}
        {count < posts.length && (
          <div className="text-center mt-20">
            <div className="lds-dual-ring"></div>
          </div>
        )}
        <div ref={setRef} />
      </ol>
    </>
  )
}

export default PostsPage
