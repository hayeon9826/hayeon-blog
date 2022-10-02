import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const Category = ({ location, siteTitle }) => {
  const params = new URLSearchParams(location?.search)
  const currentCategory = params.get('category') || 'All'

  const data = useStaticQuery(graphql`
    query CategoryQuery {
      site {
        siteMetadata {
          categories
        }
      }
    }
  `)
  const categories = data.site.siteMetadata?.categories

  return (
    <>
      <div className="scroll-toggle">
        <ul className="scroll-toggle__list">
          {categories &&
            categories?.map((category, id) => (
              <li className={`scroll-toggle__list-item ${currentCategory === category && 'active'}`} key={id}>
                  <a href={`/?category=${category}`} className="text-white font-semibold no-underline">
                    <div>{category}</div>
                  </a>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Category
