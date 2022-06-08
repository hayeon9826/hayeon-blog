import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const button = (
    <span className="toggle-container">
      <input type="checkbox" className="toggle-button"/>
    </span>
  )
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }
  

  return (
    <>
      <header className="global-header">
        <div className="max-width-header">
          {header} {button}
        </div>
      </header>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} Hayeon Dev Blog, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout