// Add this file to the repo
import { sendEvent } from '../analytics'
import { getCurrentFileName, checkForFile, executeSafely, exec } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(context, function () {
    sendEvent(context, 'Add', 'add current file')
    var currentFileName = getCurrentFileName(context)
    if (currentFileName) {
      var command = `git add "${currentFileName}"`
      exec(context, command)
      context.document.showMessage('File added to git')
    }
  })
}
