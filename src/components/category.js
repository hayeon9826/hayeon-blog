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
              <li className={`no-underline scroll-toggle__list-item ${currentCategory === category && 'active'}`} key={id}>
                  <Link to={`/?category=${category}`}>
                    <div className="text-white font-semibold no-underline">{category}</div>
                  </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Category
