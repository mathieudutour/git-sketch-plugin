// Commits all working file to git (cmd alt ctrl c)
import { UI } from "sketch";
import {
  getCurrentBranch,
  checkForFile,
  executeSafely,
  exec,
  createInputWithCheckbox
} from "../common";
import { exportArtboards } from "../exportArtboards";
import { getUserPreferences } from "../preferences";

export default function() {
  if (!checkForFile()) {
    return;
  }
  executeSafely(function() {
    const currentBranch = getCurrentBranch();
    const prefs = getUserPreferences();
    const commitMsg = createInputWithCheckbox(
      'Commit to "' + currentBranch + '"',
      "Generate files for pretty diffs",
      prefs.diffByDefault,
      "Commit"
    );

    if (commitMsg.responseCode == 1000 && commitMsg.message != null) {
      if (commitMsg.checked) {
        exportArtboards(prefs);
      }
      const command = `git commit -m "${commitMsg.message
        .split('"')
        .join('\\"')}" -a; exit`;
      const message = exec(command);
      UI.message(message.split("\n").join(" "));
    }
  });
}
