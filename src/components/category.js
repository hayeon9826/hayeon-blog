 import * as React from "react"
 import { useStaticQuery, graphql } from "gatsby"
 
 const Category = () => {
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
    <div class="scroll-toggle">
        <ul class="scroll-toggle__list">
        {categories && categories?.map((category) => (
            <li class="scroll-toggle__list-item"><div>{category}</div></li>
        ))}
        </ul>
  </div>
   )
 }
 
 export default Category
 