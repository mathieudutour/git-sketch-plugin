// Branch & checkout (cmd alt ctrl n)

import {createInput, checkForFile, createFailAlert, exec} from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    var branchName = createInput(context, 'Branch name', 'Create branch')

    if (branchName.responseCode == 1000 && branchName.message != null) {
      var command = 'git checkout -qb ' + branchName.message
      exec(context, command)
      context.document.showMessage("Switched to a new branch '" + branchName + "'")
    }
  } catch (e) {
    createFailAlert(context, 'Failed...', e, true)
  }
}
