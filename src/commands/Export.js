// Export artboards for pretty diffs
import { sendEvent } from '../analytics'
import { checkForFile, executeSafely } from '../common'
import { exportToJSON } from 'sketch-module-json-sync'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(context, function () {
    sendEvent(context, 'Manual Export', 'Do export')
    exportToJSON(context)
    context.document.showMessage('Artboards exported')
  })
}
