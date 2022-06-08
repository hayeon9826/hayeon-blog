import React from "react";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import { useStaticQuery, graphql } from "gatsby"

const CommentPage = ({ title }) => {

  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  let disqusConfig = {
    identifier: title,
    url: data.site.siteMetadata?.siteUrl + '/' + title,
    title: title
  }
  return (
    <>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </>
)};

export default CommentPage;