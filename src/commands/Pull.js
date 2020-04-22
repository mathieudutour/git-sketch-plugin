// Pull
import { UI } from "sketch";
import { checkForFile, executeSafely, exec } from "../common";

export default function () {
  if (!checkForFile()) {
    return;
  }
  executeSafely(function () {
    exec("git pull -q");
    UI.message("Changes pulled");
  });
}
