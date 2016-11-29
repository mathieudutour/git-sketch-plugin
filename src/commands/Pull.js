// Pull
import { sendEvent, sendError } from '../analytics'
import { checkForFile, createFailAlert, exec } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Pull', 'Pull remote')
    exec(context, 'git pull -q')
    context.document.showMessage('Changes pulled')
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
