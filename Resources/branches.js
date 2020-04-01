import { h, render, Component } from "preact";

function cleanBranchName(name) {
  return name ? name.replace("(B[m", "") : name;
}

class Branch extends Component {
  render({ name, selected }) {
    return (
      <div className={"branch" + (selected ? " selected" : "")}>
        <span
          className="name"
          onClick={() => window.postMessage("checkoutBranch", name)}
          title="Switch to the branch"
        >
          {name}
        </span>
        <span
          className="delete"
          onClick={() => window.postMessage("deleteBranch", name)}
        >
          <img src="../delete.svg" title="Delete the branch" />
        </span>
      </div>
    );
  }
}

class Branches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: (window.branches || []).filter(x => x).map(cleanBranchName),
      currentBranch: cleanBranchName(window.currentBranch),
      ready: window.ready
    };
    if (!window.ready) {
      const interval = setInterval(() => {
        if (window.ready) {
          this.setState({
            branches: (window.branches || [])
              .filter(x => x)
              .map(cleanBranchName),
            currentBranch: cleanBranchName(window.currentBranch),
            ready: window.ready
          });
          clearInterval(interval);
        }
      }, 100);
    }
  }

  render(props, { ready, branches, currentBranch }) {
    return (
      <div>
        <button
          onClick={() => window.postMessage("createBranch")}
          className="create"
        >
          Create a new branch
        </button>
        {!ready && "loading..."}
        {(branches || []).map(name => (
          <Branch key={name} name={name} selected={name === currentBranch} />
        ))}
      </div>
    );
  }
}

render(<Branches />, document.getElementById("container"));
