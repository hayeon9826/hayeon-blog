/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ description, lang, meta, title, image, keywords }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = title || site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `Blog`,
        },
        {
          property: `keyword`,
          content: keywords || ['프론트엔드', '기술 블로그', 'Frontend'],
        },
        {
          name: `google-site-verification`,
          content: `TwfrXMQBzIHUt3ZWpz7bsrchwuqk7G2N0dhtNXn88Jc`,
        },
        {
          name: `naver-site-verification`,
          content: `4c8febd79f827b2ffd66e1d7d0947063445054f1`,
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          property: 'og:url',
          content: siteUrl,
        },
        {
          property: `og:image`,
          content: image || `${siteUrl}/preview.png`,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
