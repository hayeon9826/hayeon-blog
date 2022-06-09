 import React from "react"
 import { useStaticQuery, graphql } from "gatsby"
 
 const Category = ({ location, siteTitle }) => {
  const params = new URLSearchParams(location?.search);
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
        {categories && categories?.map((category, id) => (
            <li className={`scroll-toggle__list-item ${currentCategory === category && 'active'}`} key={id}><div><a href={`/?category=${category}`}>{category}</a></div></li>
        ))}
        </ul>
      </div>
    </>
   )
 }
 
 export default Category
 
