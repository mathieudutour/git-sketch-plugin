// Commits all working file to git (cmd alt ctrl c)
import { UI } from "sketch";
import WebUI from "sketch-module-web-view";
import { executeSafely } from "../common";
import { getUserPreferences, setUserPreferences } from "../preferences";

export default function () {
  const preferences = getUserPreferences();
  const webUI = new WebUI({
    identifier: "git-sketch-plugin.preferences",
    width: 340,
    height: 400,
    resizable: false,
    minimizable: false,
    maximizable: false,
    titleBarStyle: "hidden",
    show: false,
  });

  webUI.loadURL(require("../../Resources/preferences.html"));

  webUI.once("ready-to-show", () => {
    webUI.show();
    webUI.webContents.executeJavaScript(
      "window.preferences=" + JSON.stringify(preferences)
    );
    webUI.webContents.executeJavaScript("window.ready=true");
  });

  webUI.webContents.on("savePreferences", (prefs) => {
    executeSafely(function () {
      setUserPreferences(prefs);
      webUI.close();
      UI.message("Preferences updated");
    });
  });
}
