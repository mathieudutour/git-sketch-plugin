// Export artboards for pretty diffs when document saved
import { sendEvent } from '../analytics'
import { checkForGitRepository, executeSafely, exportArtboards } from '../common'
import { getUserPreferences } from '../preferences'

export default function (context) {
  let prefs = getUserPreferences(context)
  context.document = context.actionContext.document

  if (!prefs.autoExportOnSave || !checkForGitRepository(context)) { return }
  executeSafely(context, function () {
    sendEvent(context, 'Auto Export on save', 'Do export')
    exportArtboards(context, prefs)
    context.document.showMessage('Artboards exported')
  })
}
