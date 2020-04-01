import prefsManager from "sketch-module-user-preferences";
import fs from "@skpm/fs";
import { exec, getGitDirectory } from "./common";

const keyPref = "gitSketch";
const PREFS_FILE = ".gitsketchrc";
const LOCAL_PREFS = {
  exportFolder: ".exportedArtboards",
  exportFormat: "png",
  exportScale: "1.0",
  includeOverviewFile: true,
  autoExportOnSave: false
};
const GLOBAL_PREFS = {
  terminal: "Terminal",
  diffByDefault: true
};

export function getUserPreferences() {
  let localPrefs = {};
  try {
    const path = getGitDirectory();
    localPrefs = JSON.parse(fs.readFileSync(path + "/" + PREFS_FILE));
  } catch (e) {
    console.log(e);
  }
  return Object.assign(
    {},
    LOCAL_PREFS,
    prefsManager.getUserPreferences(keyPref, GLOBAL_PREFS),
    localPrefs
  );
}

export function setUserPreferences(prefs) {
  const localPrefs = {};
  const globalPrefs = {};
  Object.keys(prefs).forEach(k => {
    if (Object.keys(LOCAL_PREFS).indexOf(k) !== -1) {
      localPrefs[k] = prefs[k];
    } else {
      globalPrefs[k] = prefs[k];
    }
  });

  try {
    const path = getGitDirectory();
    fs.writeFileSync(
      path + "/" + PREFS_FILE,
      JSON.stringify(localPrefs, null, "  ")
    );
    exec('git add "' + path + "/" + PREFS_FILE + '"');
  } catch (e) {
    console.log(e);
  }
  return prefsManager.setUserPreferences(keyPref, globalPrefs);
}
