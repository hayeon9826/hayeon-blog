import React, { useState, useMemo } from 'react'
import NoPostPage from './noPost'
import PostsPage from './posts'

const Search = ({ props, siteTitle, location, allPosts, selectedCategory }) => {
  const initialQuery = ''

  const [searchState, setSearchState] = useState({
    query: initialQuery,
    filteredData: [],
  })

  const handleInputChange = event => {
    const query = event.target.value
    const { allMarkdownRemark } = props
    const posts = allMarkdownRemark?.nodes || []

    const filteredData = posts.filter(post => {
      const { description, title, category } = post?.frontmatter
      return (
        (description && description.toLowerCase().includes(query.toLowerCase())) ||
        (title && title.toLowerCase().includes(query.toLowerCase())) ||
        (category && category.toLowerCase().includes(query))
      )
    })

    setSearchState({
      query,
      filteredData,
    })
  }

  const categorizedPosts = useMemo(
    () => allPosts?.filter(post => selectedCategory === 'All' || post.frontmatter.category === selectedCategory),
    [selectedCategory, allPosts],
  )

  const { query, filteredData } = searchState
  const hasSearchResults = filteredData && query !== initialQuery
  const posts = useMemo(() => (hasSearchResults ? filteredData : []), [hasSearchResults, filteredData])

  const searchedPosts = useMemo(
    () => posts?.filter(post => selectedCategory === 'All' || post.frontmatter.category === selectedCategory),
    [selectedCategory, posts],
  )

  return (
    <div className="search-wrapper">
      <div className="searchBar">
        <input
          id="searchQueryInput"
          type="text"
          name="searchQueryInput"
          placeholder="제목, 내용, 카테고리 검색"
          onChange={handleInputChange}
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path
              fill="#666666"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
        </button>
      </div>
      {/* searched result */}
      {searchState?.query ? (
        <div>
          {searchedPosts.length ? (
            <PostsPage posts={searchedPosts} category={selectedCategory} />
          ) : (
            <NoPostPage
              location={location}
              siteTitle={siteTitle}
              text={'검색 결과가 없습니다. 다른 검색어를 입력해주세요 :)'}
            />
          )}
        </div>
      ) : (
        <>
          <PostsPage posts={categorizedPosts} category={selectedCategory} />
        </>
      )}
    </div>
  )
}

export default Search
