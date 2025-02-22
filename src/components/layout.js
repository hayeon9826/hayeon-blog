import React, { useCallback } from 'react'
import { Link } from 'gatsby'
import ThemeBtn from './themeBtn'

const Layout = ({ location, title, children, showLayout = true }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location?.pathname === rootPath

  let header

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

  const hasLayout = useCallback(() => {
    if (location && location?.search.includes('header')) {
      return true
    } else if (location && location?.pathname.includes('about')) {
      return false
    } else {
      return true
    }
  }, [location])

  return (
    <>
      {hasLayout() && showLayout && (
        <header className="global-header">
          <div className="max-width-header">
            {header} {<ThemeBtn />}
          </div>
        </header>
      )}
      <div className={hasLayout() ? 'global-wrapper' : ''} data-is-root-path={isRootPath}>
        <main>{children}</main>
        {hasLayout() && showLayout && (
          <footer>
            © {new Date().getFullYear()}
            {` `}
            <a href="https://github.com/hayeon9826" target="_blank" rel="noreferrer">
              Hayeon
            </a>
            , Built with
            {` `}
            <a href="https://www.gatsbyjs.com" target="_blank" rel="noreferrer">
              Gatsby
            </a>
          </footer>
        )}
      </div>
    </>
  )
}

export default Layout
