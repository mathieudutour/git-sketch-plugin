// Commits all working file to git (cmd alt ctrl c)
import WebUI from 'sketch-module-web-view'
import { sendEvent } from '../analytics'
import { executeSafely } from '../common'
import { getUserPreferences, setUserPreferences } from '../preferences'

export default function (context) {
  const preferences = getUserPreferences(context)
  const webUI = new WebUI(context, 'preferences.html', {
    identifier: 'git-sketch-plugin.preferences',
    width: 340,
    height: 400,
    onlyShowCloseButton: true,
    hideTitleBar: true,
    handlers: {
      savePreferences (prefs) {
        executeSafely(context, function () {
          sendEvent(context, 'Preferences', 'Save preferences')
          setUserPreferences(context, prefs)
          webUI.panel.close()
          WebUI.clean()
          context.document.showMessage('Preferences updated')
        })
      }
    }
  })
  webUI.eval('window.preferences=' + JSON.stringify(preferences))
  webUI.eval('window.ready=true')
}
