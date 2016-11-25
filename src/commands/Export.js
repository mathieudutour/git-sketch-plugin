// Export artboards for pretty diffs

import {checkForFile, createFailAlert, exportArtboards} from '../common'

export default function (context) {
  if (!checkForFile(context)) { return }
  try {
    exportArtboards(context)
    context.document.showMessage('Artboards exported')
  } catch (e) {
    createFailAlert(context, 'Failed...', e, true)
  }
}
