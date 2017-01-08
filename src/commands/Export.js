// Export artboards for pretty diffs
import { sendEvent } from '../analytics'
import { checkForFile, executeSafely, exportArtboards } from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  executeSafely(function () {
    sendEvent(context, 'Manual Export', 'Do export')
    exportArtboards(context)
    context.document.showMessage('Artboards exported')
  })
}
