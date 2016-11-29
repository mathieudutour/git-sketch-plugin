// Add this file to the repo
import { sendEvent, sendError } from '../analytics'
import { getCurrentFileName, checkForFile, createFailAlert, exec } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Add', 'add current file')
    var currentFileName = getCurrentFileName(context)
    if (currentFileName) {
      var command = `git add "${currentFileName}"`
      exec(context, command)
      context.document.showMessage('File added to git')
    }
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
