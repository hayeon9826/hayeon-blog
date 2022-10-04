import React from 'react'
import { getValue } from '../utils/storage'
class Utterances extends React.Component {
  constructor(props) {
    super(props)

    this.commentsEl = React.createRef()
    this.state = { status: 'pending' }
  }

  componentDidMount() {
    const scriptEl = document.createElement('script')
    const isDark = getValue('isDark')

    scriptEl.onload = () => this.setState({ status: 'success' })
    scriptEl.onerror = () => this.setState({ status: 'failed' })
    scriptEl.async = true
    scriptEl.src = 'https://utteranc.es/client.js'
    scriptEl.setAttribute('repo', 'hayeon9826/blog-comments')
    scriptEl.setAttribute('issue-term', 'title')
    scriptEl.setAttribute('theme', isDark ? 'photon-dark' : 'github-light')
    scriptEl.setAttribute('crossorigin', 'anonymous')
    this.commentsEl.current.appendChild(scriptEl)
  }

  render() {
    const { status } = this.state

    return (
      <div className="comments-wrapper">
        {status === 'failed' && <div>Error. Please try again.</div>}
        {status === 'pending' && <div>Loading script...</div>}
        <div ref={this.commentsEl} />
      </div>
    )
  }
}

export default Utterances
