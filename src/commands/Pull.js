// Pull
import { sendEvent } from '../analytics'
import { checkForFile, executeSafely, exec } from '../common'
import { importFromJSON } from 'sketch-module-json-sync'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(context, function () {
    sendEvent(context, 'Pull', 'Pull remote')
    exec(context, 'git pull -q')
    importFromJSON(context)
    context.document.showMessage('Changes pulled')
  })
}
