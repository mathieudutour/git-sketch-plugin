import React from 'react'
import ReactDOM from 'react-dom'
import pluginCall from 'sketch-module-web-view/client'

function cleanBranchName (name) {
  return name.replace('(B[m', '')
}

const Branch = ({name, selected}) => {
  return (
    <div className={'branch' + (selected ? ' selected' : '')}>
      <span className='name' onClick={() => pluginCall('checkoutBranch', name)} title='Switch to the branch'>
        {name}
      </span>
      <span className='delete' onClick={() => pluginCall('deleteBranch', name)}>
        <img src="delete.svg" title='Delete the branch' />
      </span>
    </div>
  )
}

class Branches extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      branches: (window.branches || []).map(cleanBranchName),
      currentBranch: cleanBranchName(window.currentBranch),
      ready: window.ready
    }
    if (!window.ready) {
      const interval = setInterval(() => {
        if (window.ready) {
          this.state = {
            branches: (window.branches || []).map(cleanBranchName),
            currentBranch: cleanBranchName(window.currentBranch),
            ready: window.ready
          }
          clearInterval(interval)
        }
      }, 100)
    }
  }

  render () {
    return (
      <div>
        <button onClick={() => pluginCall('createBranch')} className="create">
          Create a new branch
        </button>
        {!this.state.ready && 'loading...'}
        {(this.state.branches || []).map((name) =>
          <Branch key={name}
            name={name}
            selected={name === this.state.currentBranch} />
        )}
      </div>
    )
  }
}

ReactDOM.render(<Branches />, document.getElementById('container'))
