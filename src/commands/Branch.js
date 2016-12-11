// Branch & checkout (cmd alt ctrl n)
import { sendEvent, sendError } from '../analytics'
import { createInput, checkForFile, createFailAlert, exec } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Branch', 'Create branch', 'Start creating branch')
    var branchName = createInput(context, 'Branch', 'Create branch')

    if (branchName.responseCode == 1000 && branchName.message != null) {
      var command = 'git checkout -qb ' + branchName.message
      exec(context, command)
      context.document.showMessage("Switched to a new branch '" + branchName.message + "'")
      sendEvent(context, 'Branch', 'Create branch', 'Did create branch')
    } else {
      sendEvent(context, 'Branch', 'Create branch', 'Cancel creating branch')
    }
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
