import * as React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

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
  const author = data?.site?.siteMetadata?.author

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={['auto', 'webp', 'avif']}
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
            <a className="link-small" target="_blank" rel="noreferrer" href="http://github.com/hayeon9826">
              Github
            </a>
            {` `}
            <a className="link-small" target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/khy226">
              Linkedin
            </a>
          </span>
          <span>
            <Link className="about-text" to="/about">
              about
            </Link>
          </span>
        </p>
      )}
    </div>
  )
}

export default Bio
