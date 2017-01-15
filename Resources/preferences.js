import { h, render, Component } from 'preact'
import Portal from './Portal'
import pluginCall from 'sketch-module-web-view/client'

class Preferences extends Component {
  constructor (props) {
    super(props)
    this.state = {
      preferences: window.preferences || {},
      ready: window.ready
    }
    if (!window.ready) {
      const interval = setInterval(() => {
        if (window.ready) {
          this.state = {
            preferences: window.preferences || {},
            ready: window.ready
          }
          clearInterval(interval)
        }
      }, 100)
    }
  }

  render (props, {ready, preferences}) {
    return (
      <div>
        <Portal>
          <button onClick={() => pluginCall('savePreferences', preferences)} className="save">
            Save Preferences
          </button>
        </Portal>
        {!ready && 'loading...'}
        <h2>Diffs preferences</h2>
        <div className="form">
          <label htmlFor="folder">Folder where the pretty diffs will be exported</label>
          <input type="text" value={preferences.exportFolder} id="folder" onInput={this.linkState('preferences.exportFolder')} />
        </div>
        <div className="form">
          <label htmlFor="scale">Scale of the exported artboards</label>
          <input type="number" value={preferences.exportScale} id="scale" onInput={this.linkState('preferences.exportScale')} />
        </div>
        <div className="form">
          <input type="checkbox" checked={preferences.diffByDefault} id="diffByDefault" onChange={this.linkState('preferences.diffByDefault')} />
          <label htmlFor="diffByDefault"> Generate pretty diff by default</label>
        </div>
        <div className="form">
          <input type="checkbox" checked={preferences.includeOverviewFile} id="includeOverviewFile" onChange={this.linkState('preferences.includeOverviewFile')} />
          <label htmlFor="includeOverviewFile"> Save an overview file with rendered artboards</label>
        </div>
        <h2>Miscellaneous</h2>
        <div className="form">
          <label htmlFor="terminal">Terminal App</label>
          <select id="terminal" value={preferences.terminal} onChange={this.linkState('preferences.terminal')}>
            <option value="Terminal">Terminal</option>
            <option value="iTerm">iTerm</option>
          </select>
        </div>
        <div className="form">
          <input type="checkbox" checked={preferences.sendAnalytics} id="sendAnalytics" onChange={this.linkState('preferences.sendAnalytics')} />
          <label htmlFor="sendAnalytics"> Send anymous usage data to improve the plugin</label>
        </div>
      </div>
    )
  }
}

render(<Preferences />, document.getElementById('container'))
