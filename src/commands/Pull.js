// Pull

import {checkForFile, createFailAlert, exec} from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    exec(context, 'git pull -q')
    context.document.showMessage('Changes pulled')
  } catch (e) {
    createFailAlert(context, 'Failed...', e, true)
  }
}
