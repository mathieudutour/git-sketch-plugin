import { h, render, Component } from "preact";
import linkState from "linkstate";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: window.preferences || {},
      ready: window.ready
    };
    if (!window.ready) {
      const interval = setInterval(() => {
        if (window.ready) {
          this.setState({
            preferences: window.preferences || {},
            ready: window.ready
          });
          clearInterval(interval);
        }
      }, 100);
    }
  }

  render(props, { ready, preferences }) {
    return (
      <div>
        <button
          onClick={() => window.postMessage("savePreferences", preferences)}
          className="save"
        >
          Save Preferences
        </button>
        {!ready && "loading..."}
        <h2>Diffs preferences</h2>
        <div className="form">
          <label htmlFor="folder">
            Folder where the pretty diffs will be exported
          </label>
          <input
            type="text"
            value={preferences.exportFolder}
            id="folder"
            onInput={linkState(this, "preferences.exportFolder")}
          />
        </div>
        <div className="form">
          <label htmlFor="scale">Scale of the exported artboards</label>
          <input
            type="number"
            value={preferences.exportScale}
            id="scale"
            onInput={linkState(this, "preferences.exportScale")}
          />
        </div>
        <div className="form">
          <label htmlFor="format">Format of the exported artboards</label>
          <select
            id="form"
            value={preferences.exportFormat}
            onChange={linkState(this, "preferences.exportFormat")}
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="pdf">PDF</option>
            <option value="eps">EPS</option>
            <option value="svg">SVG</option>
          </select>
        </div>
        <div className="form">
          <input
            type="checkbox"
            checked={preferences.diffByDefault}
            id="diffByDefault"
            onChange={linkState(this, "preferences.diffByDefault")}
          />
          <label htmlFor="diffByDefault">
            {" "}
            Generate pretty diff by default
          </label>
        </div>
        <div className="form">
          <input
            type="checkbox"
            checked={preferences.includeOverviewFile}
            id="includeOverviewFile"
            onChange={linkState(this, "preferences.includeOverviewFile")}
          />
          <label htmlFor="includeOverviewFile">
            {" "}
            Save an overview file with rendered artboards
          </label>
        </div>
        <div className="form">
          <input
            type="checkbox"
            checked={preferences.autoExportOnSave}
            id="autoExportOnSave"
            onChange={linkState(this, "preferences.autoExportOnSave")}
          />
          <label htmlFor="autoExportOnSave">
            {" "}
            Auto export artboards on save
          </label>
        </div>
        <h2>Miscellaneous</h2>
        <div className="form">
          <label htmlFor="terminal">Terminal App</label>
          <select
            id="terminal"
            value={preferences.terminal}
            onChange={linkState(this, "preferences.terminal")}
          >
            <option value="Terminal">Terminal</option>
            <option value="iTerm">iTerm</option>
          </select>
        </div>
      </div>
    );
  }
}

render(<Preferences />, document.getElementById("container"));
