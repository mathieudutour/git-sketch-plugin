// Push (cmd alt ctrl p)
import { sendEvent, sendError } from '../analytics'
import { checkForFile, createFailAlert, exec } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Push', 'Push to remote')
    exec(context, 'git -c push.default=current push -q')
    context.document.showMessage('Changes pushed')
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
