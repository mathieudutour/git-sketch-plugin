// Checkout (cmd alt ctrl o)
import { sendEvent, sendError } from '../analytics'
import { getCurrentBranch, checkForFile, createFailAlert, exec, createSelect } from '../common'
import { importFromJSON } from 'sketch-module-json-sync'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Branch', 'Switch branch', 'Start switching branch')
    var listBranchesCommand = 'git for-each-ref --format=\'%(refname:short)\' refs/heads/'
    var listBranches = exec(context, listBranchesCommand)
    if (listBranches != null && listBranches != '') {
      listBranches = listBranches.split('\n')
      listBranches.pop() // last item is always an empty string
      const currentBranch = getCurrentBranch(context)
      var currentIndex = 0
      listBranches.forEach((b, i) => {
        if (b == currentBranch) {
          currentIndex = i
        }
      })
      var branch = createSelect(context, 'Checkout branch', listBranches, currentIndex, 'Checkout')
      if (branch.responseCode == 1000 && branch.index >= 0 && branch.index < listBranches.length) {
        sendEvent(context, 'Branch', 'Switch branch', 'Did switch branch')
        var selectedBranch = listBranches[branch.index]
        var command = 'git checkout -q ' + selectedBranch
        exec(context, command)
        importFromJSON(context)
        context.document.showMessage(`Switched to branch '${selectedBranch}'`)
      } else {
        sendEvent(context, 'Branch', 'Switch branch', 'Cancel switching branch')
      }
    } else {
      sendEvent(context, 'Branch', 'Switch branch', 'no branches')
      context.document.showMessage('No branches')
    }
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
