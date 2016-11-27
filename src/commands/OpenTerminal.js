// Opens terminal in working directory (cmd alt ctrl o)

import {getCurrentDirectory, getUserPreferences} from '../common'

export default function (context) {
  const path = getCurrentDirectory(context)
  const {terminal} = getUserPreferences()
  NSWorkspace.sharedWorkspace().openFile_withApplication_(path, terminal)
}
