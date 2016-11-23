// Opens terminal in working directory (cmd alt ctrl o)

import {getCurrentDirectory, getUserPreferences} from '../common'

export default function (context) {
  var path = getCurrentDirectory(context)
  var preferences = getUserPreferences()
  NSWorkspace.sharedWorkspace().openFile_withApplication_(path, preferences.terminal)
}
