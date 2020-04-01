// Init git repo and add current file to the repo (cmd alt ctrl n)
import { UI } from "sketch";
import {
  checkForFile,
  getCurrentFileName,
  executeSafely,
  exec,
  createFailAlert
} from "../common";

export default function() {
  if (!checkForFile()) {
    return;
  }
  executeSafely(function() {
    const currentFileName = getCurrentFileName();
    if (!currentFileName) {
      createFailAlert("Failed...", "Cannot get the current file name");
      return;
    }

    const message = exec(`git init && git add "${currentFileName}"`);
    UI.message(message);
    UI.getInputFromUser(
      "URL of the remote repo",
      {
        okButton: "Add Remote",
        cancelButton: "Not now",
        description: "you can create one here: https://github.com/new"
      },
      (err, value) => {
        if (err) {
          return;
        }
        const res = exec(`git remote add origin ${value.trim()}; exit`);
        UI.message(res.split("\n").join(" "));
      }
    );
  });
}
