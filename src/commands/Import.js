// Export artboards for pretty diffs
import { sendEvent, sendError } from '../analytics'
import { createFailAlert } from '../common'
import { importFromJSON } from 'sketch-module-json-sync'

export default function (context) {
  // if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Manual Import', 'Do import')
    importFromJSON(context)
    context.document.showMessage('Artboards imported')
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
