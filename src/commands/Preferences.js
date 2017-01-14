// Commits all working file to git (cmd alt ctrl c)
import { sendEvent } from '../analytics'
import { setIconForAlert, executeSafely } from '../common'
import { getUserPreferences, setUserPreferences } from '../preferences'

export default function (context) {
  executeSafely(context, function () {
    sendEvent(context, 'Preferences', 'Open preferences')
    const preferences = getUserPreferences()
    var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 275))

    var textExport = NSTextView.alloc().initWithFrame(NSMakeRect(0, 250, 300, 20))
    textExport.string = 'Folder where the pretty diffs will be exported'
    textExport.drawsBackground = false
    textExport.editable = false
    var input = NSTextField.alloc().initWithFrame(NSMakeRect(0, 225, 300, 25))
    input.stringValue = preferences.exportFolder
    input.editable = true

    var scaleExport = NSTextView.alloc().initWithFrame(NSMakeRect(0, 200, 300, 20))
    scaleExport.string = 'Scale of the exported artboards'
    scaleExport.drawsBackground = false
    scaleExport.editable = false
    var inputScale = NSTextField.alloc().initWithFrame(NSMakeRect(0, 175, 300, 25))
    inputScale.stringValue = preferences.exportScale
    inputScale.editable = true

    var checkboxDiff = NSButton.alloc().initWithFrame(NSMakeRect(0, 125, 300, 25))
    checkboxDiff.setButtonType(3)
    checkboxDiff.title = 'Generate pretty diff by default'
    checkboxDiff.state = preferences.diffByDefault ? 1 : 0

    var textTerminal = NSTextView.alloc().initWithFrame(NSMakeRect(0, 75, 300, 20))
    textTerminal.string = 'Terminal App'
    textTerminal.drawsBackground = false
    textTerminal.editable = false
    var select = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 50, 300, 25))
    select.addItemsWithObjectValues(['Terminal', 'iTerm'])
    select.selectItemAtIndex(preferences.terminal == 'iTerm' ? 1 : 0)

    var checkboxAnalytics = NSButton.alloc().initWithFrame(NSMakeRect(0, 25, 300, 25))
    checkboxAnalytics.setButtonType(3)
    checkboxAnalytics.title = 'Send anymous usage data to improve the plugin'
    checkboxAnalytics.state = preferences.sendAnalytics ? 1 : 0

    accessory.addSubview(textExport)
    accessory.addSubview(input)
    accessory.addSubview(scaleExport)
    accessory.addSubview(inputScale)
    accessory.addSubview(checkboxDiff)
    accessory.addSubview(textTerminal)
    accessory.addSubview(select)
    accessory.addSubview(checkboxAnalytics)

    var alert = NSAlert.alloc().init()
    alert.setMessageText('Git Plugin Preferences')
    alert.addButtonWithTitle('Save preferences')
    alert.addButtonWithTitle('Cancel')
    setIconForAlert(context, alert)
    alert.setAccessoryView(accessory)

    var responseCode = alert.runModal()
    var message = input.stringValue()
    var scale = inputScale.stringValue()

    if (responseCode === 1000) {
      sendEvent(context, 'Preferences', 'Save preferences')
      setUserPreferences({
        exportFolder: message,
        exportScale: scale,
        diffByDefault: checkboxDiff.state() == 1,
        terminal: select.indexOfSelectedItem() == 1 ? 'iTerm' : 'Terminal',
        sendAnalytics: checkboxAnalytics.state() == 1
      })
      context.document.showMessage('Preferences updated')
    } else {
      sendEvent(context, 'Preferences', 'Cancel preferences')
    }
  })
}
