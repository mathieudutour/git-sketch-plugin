// Push (cmd alt ctrl p)
import { sendEvent } from '../analytics'
import { checkForFile, executeSafely, exec } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(context, function () {
    sendEvent(context, 'Push', 'Push to remote')
    exec(context, 'git -c push.default=current push -q')
    context.document.showMessage('Changes pushed')
  })
}
