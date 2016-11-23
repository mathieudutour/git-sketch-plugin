// Init git repo and add current file to the repo (cmd alt ctrl n)

import {checkForFile, getCurrentFileName, createFailAlert, exec, createInput} from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    var currentFileName = getCurrentFileName(context)
    if (currentFileName) {
      var command = `git init && git add "${currentFileName}"`
      var message = exec(context, command)
      context.document.showMessage(message)
      var remoteURL = createInput(context, 'URL of the remote repo (you can create one here: https://github.com/new)', 'Add remote', 'Not now')

      if (remoteURL.responseCode == 1000 && remoteURL.message != null) {
        command = `git remote add origin ${remoteURL.message}; exit`
        message = exec(context, command)
        context.document.showMessage(message.split('\n').join(' '))
      }
    } else {
      createFailAlert(context, 'Failed...', 'Cannot get the current file name')
    }
  } catch (e) {
    createFailAlert(context, 'Failed...', e, true)
  }
}
