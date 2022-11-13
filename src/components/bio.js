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
        width={75}
        height={75}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <div className="justify-center mt-2">
          <div>
            <strong className="author-badge">
              <Link to="/about?header=true">@{author.name}</Link>
            </strong>
            <br />
            <div className="text-gray mt-2 bio-author">{author?.summary || null}</div>
            <span>
              <Link className="link-small me-2" to="/about?header=true">
                About
              </Link>
            </span>
            <a className="link-small me-2" target="_blank" rel="noreferrer" href="http://github.com/hayeon9826">
              Github
            </a>
            {` `}
            <a className="link-small me-2" target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/khy226">
              Linkedin
            </a>
            {/* <span>
              <Link className="link-small me-2" to="/en/about">
                Resume
              </Link>
            </span> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bio
