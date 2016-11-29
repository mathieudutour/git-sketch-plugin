import prefsManager from 'sketch-module-user-preferences'

const keyPref = 'gitSketch'

export function getUserPreferences () {
  return prefsManager.getUserPreferences(keyPref, {
    exportFolder: '.exportedArtboards',
    exportScale: '1.0',
    terminal: 'Terminal',
    diffByDefault: true,
    sendAnalytics: true
  })
}

export function setUserPreferences (prefs) {
  return prefsManager.setUserPreferences(keyPref, prefs)
}
