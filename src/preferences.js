import prefsManager from 'sketch-module-user-preferences'
import fs from 'sketch-module-fs'
import {exec, getGitDirectory} from './common'

const keyPref = 'gitSketch'
const PREFS_FILE = '.gitsketchrc'
const LOCAL_PREFS = {
  exportFolder: '.exportedArtboards',
  exportFormat: 'png',
  exportScale: '1.0',
  includeOverviewFile: true,
  autoExportOnSave: false
}
const GLOBAL_PREFS = {
  terminal: 'Terminal',
  diffByDefault: true,
  sendAnalytics: true
}

export function getUserPreferences (context) {
  let localPrefs = {}
  try {
    var path = getGitDirectory(context)
    localPrefs = JSON.parse(fs.readFile(path + '/' + PREFS_FILE))
  } catch (e) {
    console.log(e)
  }
  return Object.assign(
    {},
    LOCAL_PREFS,
    prefsManager.getUserPreferences(keyPref, GLOBAL_PREFS),
    localPrefs
  )
}

export function setUserPreferences (context, prefs) {
  const localPrefs = {}
  const globalPrefs = {}
  Object.keys(prefs).forEach(k => {
    if (Object.keys(LOCAL_PREFS).indexOf(k) !== -1) {
      localPrefs[k] = prefs[k]
    } else {
      globalPrefs[k] = prefs[k]
    }
  })

  try {
    var path = getGitDirectory(context)
    fs.writeFile(path + '/' + PREFS_FILE, JSON.stringify(localPrefs, null, '  '))
    exec(context, 'git add "' + path + '/' + PREFS_FILE + '"')
  } catch (e) {
    console.log(e)
  }
  return prefsManager.setUserPreferences(keyPref, globalPrefs)
}
