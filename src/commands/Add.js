// Add this file to the repo
import {
  getCurrentFileName,
  checkForFile,
  executeSafely,
  exec
} from "../common";
import { UI } from "sketch";

export default function() {
  if (!checkForFile()) {
    return;
  }
  executeSafely(function() {
    const currentFileName = getCurrentFileName();
    if (currentFileName) {
      exec(`git add "${currentFileName}"`);
      UI.message("File added to git");
    }
  });
}
