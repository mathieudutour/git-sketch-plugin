// Export artboards for pretty diffs
import { sendEvent, sendError } from '../analytics'
import { checkForFile, createFailAlert, exportArtboards } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    sendEvent(context, 'Manual Export', 'Do export')
    exportArtboards(context)
    context.document.showMessage('Artboards exported')
  } catch (e) {
    sendError(context, e)
    createFailAlert(context, 'Failed...', e, true)
  }
}
