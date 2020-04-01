// Branches (cmd alt ctrl b)
import { UI } from "sketch";
import { getCurrentBranch, checkForFile, exec, executeSafely } from "../common";
import WebUI from "sketch-module-web-view";

export default function() {
  if (!checkForFile()) {
    return;
  }
  executeSafely(() => {
    let listBranches = exec(
      "git for-each-ref --format='%(refname:short)' refs/heads/"
    );
    if (!listBranches) {
      UI.message("No branches");
      return;
    }

    listBranches = listBranches.split("\n");
    const currentBranch = getCurrentBranch();
    const webUI = new WebUI({
      identifier: "git-sketch-plugin.branches",
      height: 280,
      width: 250,
      resizable: false,
      minimizable: false,
      maximizable: false,
      titleBarStyle: "hidden",
      show: false
    });

    webUI.loadURL(require("../../Resources/branches.html"));

    webUI.once("ready-to-show", () => {
      webUI.show();
      webUI.webContents.executeJavaScript(
        'window.branches=["' + listBranches.join('", "') + '"]'
      );
      webUI.webContents.executeJavaScript(
        'window.currentBranch="' + currentBranch + '"'
      );
      webUI.webContents.executeJavaScript("window.ready=true");
    });

    webUI.webContents.on("checkoutBranch", name => {
      executeSafely(function() {
        exec(`git checkout -q ${name}`);
        const app = NSApp.delegate();
        app.refreshCurrentDocument();
        webUI.close();
        UI.message(`Switched to branch '${name}'`);
      });
    });
    webUI.webContents.on("deleteBranch", name => {
      executeSafely(function() {
        exec(`git branch -d ${name}`);
        UI.message(`Deleted branch '${name}'`);
      });
    });
    webUI.webContents.on("createBranch", () => {
      executeSafely(function() {
        UI.getInputFromUser(
          "New Branch Name",
          { okButton: "Create Branch" },
          (err, value) => {
            if (err) {
              return;
            }
            exec(`git checkout -qb ${value.trim()}`);
            UI.message(`Switched to a new branch '${value.trim()}'`);
            webUI.close();
          }
        );
      });
    });
  });
}
