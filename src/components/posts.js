import React, { useState, useCallback } from 'react'
import NoPostPage from './noPost'
import PostPage from './post'
import useInfiniteScroll from '../utils/useInfiniteScroll'

const PostsPage = ({ posts, category, siteTitle="Hayeon Dev Blog", location }) => {
  const [count, setCount] = useState(10);
  const [ref, setRef] = useInfiniteScroll((entry, observer) => {
    loadMorePosts();
  });
  
  const loadMorePosts = useCallback(() => {
    setCount(v => {
      if (v + 1 <= posts.length) return v + 1;
      // else return v;
      return v + 1
    });
  }, [posts])


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
        <div ref={setRef}/>
      </ol>
    </>
  )
}

export default PostsPage
