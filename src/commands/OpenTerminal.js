// Opens terminal in working directory (cmd alt ctrl o)
import { sendEvent } from '../analytics'
import { getCurrentDirectory } from '../common'
import { getUserPreferences } from '../preferences'

export default function (context) {
  sendEvent(context, 'Terminal', 'Open terminal')
  const path = getCurrentDirectory(context)
  const {terminal} = getUserPreferences()
  NSWorkspace.sharedWorkspace().openFile_withApplication_(path, terminal)
}
