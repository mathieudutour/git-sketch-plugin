// Add this file to the repo

import {getCurrentFileName, checkForFile, createFailAlert, exec} from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    var currentFileName = getCurrentFileName(context)
    if (currentFileName) {
      var command = `git add "${currentFileName}"`
      exec(context, command)
      context.document.showMessage('File added to git')
    }
  } catch (e) {
    createFailAlert(context, 'Failed...', e, true)
  }
}
