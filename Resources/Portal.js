import { h, Component, render } from 'preact'

export default class Portal extends Component {
  componentDidUpdate (props) {
    for (let i in props) {
      if (props[i] !== this.props[i]) {
        return this.renderLayer()
      }
    }
  }

  componentDidMount () {
    this.renderLayer()
  }

  componentWillUnmount () {
    this.renderLayer(false)
    if (this.remote) this.remote.parentNode.removeChild(this.remote)
  }

  findNode (node) {
    return typeof node === 'string' ? document.querySelector(node) : node
  }

  renderLayer (show = true) {
    const into = this.props.into || 'body'
    // clean up old node if moving bases:
    if (into !== this.intoPointer) {
      this.intoPointer = into
      if (this.into && this.remote) {
        this.remote = render(<PortalProxy />, this.into, this.remote)
      }
      this.into = this.findNode(into)
    }

    this.remote = render((
      <PortalProxy context={this.context}>
        { show && this.props.children || null }
      </PortalProxy>
    ), this.into, this.remote)
  }

  render () {
    return null
  }
}

// high-order component that renders its first child if it exists.
// used as a conditional rendering proxy.
class PortalProxy extends Component {
  getChildContext () {
    return this.props.context
  }
  render ({ children }) {
    return children && children[0] || null
  }
}
