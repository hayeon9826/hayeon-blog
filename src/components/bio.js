/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile.png"
        width={70}
        height={70}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p className="justify-center">
          <span>
            <strong>{author.name}</strong> 
            <br />
            <small className="text-gray font-semibold">{author?.summary || null}</small>
            <br />
            <a className="link-small" target="_blank" rel="noreferrer" href="http://github.com/hayeon9826">Github</a>
            {` `}
            <a className="link-small" target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/khy226">Linkedin</a>
          </span>
          <span>
            <a className="about-text" href="/about">about</a>
          </span>
        </p>
      )}
    </div>
  )
}

export default Bio
