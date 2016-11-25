// Commits all working file to git (cmd alt ctrl c)

import {getCurrentBranch, checkForFile, createFailAlert, exec, getUserPreferences, createInputWithCheckbox, exportArtboards} from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    var currentBranch = getCurrentBranch(context)
    var commitMsg = createInputWithCheckbox(context, 'Commit to "' + currentBranch + '"', 'Generate files for pretty diffs', getUserPreferences().diffByDefault, 'Commit')

    if (commitMsg.responseCode == 1000 && commitMsg.message != null) {
      if (commitMsg.checked) {
        exportArtboards(context)
      }
      var command = `git commit -m "${commitMsg.message.split('"').join('\\"')}" -a; exit`
      var message = exec(context, command)
      context.document.showMessage(message.split('\n').join(' '))
    }
  } catch (e) {
    createFailAlert(context, 'Failed...', e, true)
  }
}
