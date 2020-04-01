// Export artboards for pretty diffs when document saved
import { UI } from "sketch";
import { checkForGitRepository, executeSafely } from "../common";
import { exportArtboards } from "../exportArtboards";
import { getUserPreferences } from "../preferences";

export default function() {
  const prefs = getUserPreferences();

  if (!prefs.autoExportOnSave || !checkForGitRepository()) {
    return;
  }
  executeSafely(() => {
    exportArtboards(prefs);
    UI.message("Artboards exported");
  });
}
