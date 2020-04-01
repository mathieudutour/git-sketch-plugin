// Export artboards for pretty diffs
import { UI } from "sketch";
import { checkForFile, checkForGitRepository, executeSafely } from "../common";
import { exportArtboards } from "../exportArtboards";
import { getUserPreferences } from "../preferences";

export default function() {
  if (!checkForFile() && !checkForGitRepository()) {
    return;
  }
  executeSafely(function() {
    exportArtboards(getUserPreferences());
    UI.message("Artboards exported");
  });
}
