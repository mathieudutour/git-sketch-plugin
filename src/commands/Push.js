// Push (cmd alt ctrl p)
import { UI } from "sketch";
import { checkForFile, executeSafely, exec } from "../common";

export default function() {
  if (!checkForFile()) {
    return;
  }
  executeSafely(function() {
    exec("git -c push.default=current push -q");
    UI.message("Changes pushed");
  });
}
