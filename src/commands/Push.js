// Push (cmd alt ctrl p)

import {checkForFile, createFailAlert, exec} from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    exec(context, 'git -c push.default=current push -q')
    context.document.showMessage('Changes pushed')
  } catch (e) {
    createFailAlert(context, 'Failed...', e, true)
  }
}
