// Export artboards for pretty diffs
import { sendEvent, sendError } from '../analytics'
import { checkForFile, createFailAlert } from '../common'
import { exportToJSON } from 'sketch-module-json-sync'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Manual Export', 'Do export')
    exportToJSON(context)
    context.document.showMessage('Artboards exported')
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
