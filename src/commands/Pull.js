// Pull
import { sendEvent } from '../analytics'
import { checkForFile, executeSafely, exec } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(context, function () {
    sendEvent(context, 'Pull', 'Pull remote')
    exec(context, 'git pull -q')
    context.document.showMessage('Changes pulled')
  })
}
