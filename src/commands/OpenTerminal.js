// Opens terminal in working directory (cmd alt ctrl o)
import { getCurrentDirectory } from "../common";
import { getUserPreferences } from "../preferences";

export default function () {
  const path = getCurrentDirectory();
  const { terminal } = getUserPreferences();
  NSWorkspace.sharedWorkspace().openFile_withApplication_(path, terminal);
}
