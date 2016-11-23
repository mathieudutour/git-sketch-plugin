// Common library of things

export function setIconForAlert (context, alert) {
  alert.setIcon(NSImage.alloc().initWithContentsOfFile(
    context.plugin.urlForResourceNamed('icon.png').path()))
}

const keyPref = 'gitSketch'

export function getUserPreferences () {
  var exportFolder = '.exportedArtboards'
  var exportScale = '1.0'
  var terminal = 'Terminal'
  var diffByDefault = true
  try {
    var prefs = NSUserDefaults.standardUserDefaults()
    exportFolder = prefs.stringForKey(keyPref + 'exportFolder') || '.exportedArtboards'
    exportScale = prefs.stringForKey(keyPref + 'exportScale') || '1.0'
    terminal = prefs.stringForKey(keyPref + 'terminal') || 'Terminal'
    diffByDefault = prefs.boolForKey(keyPref + 'diffByDefault')
  } catch (e) {
    console.log(e)
  }
  return {
    exportFolder: exportFolder,
    exportScale: exportScale,
    diffByDefault: diffByDefault,
    terminal: terminal
  }
}

export function exec (context, command) {
  var task = NSTask.alloc().init()
  var pipe = NSPipe.pipe()
  var errPipe = NSPipe.pipe()

  var path = getCurrentDirectory(context)
  command = `cd "${path}" && ${command}`

  task.setLaunchPath_('/bin/bash')
  task.setArguments_(NSArray.arrayWithObjects_('-c', '-l', command, null))
  task.setStandardOutput_(pipe)
  task.setStandardError_(errPipe)
  task.launch()

  var data = errPipe.fileHandleForReading().readDataToEndOfFile()
  if (data != null && data.length()) {
    var message = NSString.alloc().initWithData_encoding_(data, NSUTF8StringEncoding)
    return NSException.raise_format_('failed', message)
  }
  data = pipe.fileHandleForReading().readDataToEndOfFile()
  return NSString.alloc().initWithData_encoding_(data, NSUTF8StringEncoding)
}

export function getCurrentDirectory (context) {
  return context.document.fileURL().URLByDeletingLastPathComponent().path()
}

export function getCurrentFileName (context) {
  return context.document.fileURL().lastPathComponent()
}

export function createFailAlert (context, title, error, buttonToReport) {
  console.log(error)
  var alert = NSAlert.alloc().init()
  alert.informativeText = error
  alert.setMessageText(title)
  alert.addButtonWithTitle('OK')
  if (buttonToReport) {
    alert.addButtonWithTitle('Report issue')
  }
  setIconForAlert(context, alert)

  var responseCode = alert.runModal()

  if (responseCode == 1001) {
    var errorString
    try {
      errorString = JSON.stringify(error, null, '\t')
    } catch (e) {
      errorString = error
    }
    var urlString = `https://github.com/mathieudutour/git-sketch-plugin/issues/new?body=${encodeURIComponent('### How did it happen?\n1.\n2.\n3.\n\n\n### Error log\n\n```\n' + errorString + '\n```')}`
    var url = NSURL.URLWithString(urlString)
    NSWorkspace.sharedWorkspace().openURL(url)
  }

  return {
    responseCode
  }
}

export function createInput (context, msg, okLabel, cancelLabel) {
  var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 50))
  var input = NSTextField.alloc().initWithFrame(NSMakeRect(0, 25, 300, 25))
  input.editable = true
  accessory.addSubview(input)

  var alert = NSAlert.alloc().init()
  alert.setMessageText(msg)
  alert.addButtonWithTitle(okLabel || 'OK')
  alert.addButtonWithTitle(cancelLabel || 'Cancel')
  setIconForAlert(context, alert)
  alert.setAccessoryView(accessory)

  var responseCode = alert.runModal()
  var message = input.stringValue()

  return {
    responseCode: responseCode,
    message: message
  }
}

export function createInputWithCheckbox (context, msg, checkboxMsg, checked, okLabel, cancelLabel) {
  var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 100))
  var input = TextArea(0, 25, 300, 75)
  var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 25))
  checkbox.setButtonType(3)
  checkbox.title = checkboxMsg
  checkbox.state = checked ? 1 : 0
  accessory.addSubview(input.view)
  accessory.addSubview(checkbox)

  var alert = NSAlert.alloc().init()
  alert.setMessageText(msg)
  alert.addButtonWithTitle(okLabel || 'OK')
  alert.addButtonWithTitle(cancelLabel || 'Cancel')
  setIconForAlert(context, alert)
  alert.setAccessoryView(accessory)

  var responseCode = alert.runModal()
  var message = input.getValue()

  return {
    responseCode: responseCode,
    message: message,
    checked: checkbox.state() == 1
  }
}

export function createSelect (context, msg, items, selectedItemIndex, okLabel, cancelLabel) {
  selectedItemIndex = selectedItemIndex || 0

  var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25))
  accessory.addItemsWithObjectValues(items)
  accessory.selectItemAtIndex(selectedItemIndex)

  var alert = NSAlert.alloc().init()
  alert.setMessageText(msg)
  alert.addButtonWithTitle(okLabel || 'OK')
  alert.addButtonWithTitle(cancelLabel || 'Cancel')
  setIconForAlert(context, alert)
  alert.setAccessoryView(accessory)

  var responseCode = alert.runModal()
  var sel = accessory.indexOfSelectedItem()

  return {
    responseCode: responseCode,
    index: sel
  }
}

export function getCurrentBranch (context) {
  var path = getCurrentDirectory(context)
  var currentBranchCommand = `cd "${path}" && git rev-parse --abbrev-ref HEAD`
  var branch
  try {
    branch = exec(context, currentBranchCommand).split('\n')[0]
  } catch (e) {
    branch = 'master'
  }
  return branch
}

export function exportArtboards (context) {
  var currentFileName = getCurrentFileName(context)
  var path = getCurrentDirectory(context)
  var currentFileNameWithoutExtension = currentFileName.replace(/\.sketch$/, '')
  var preferences = getUserPreferences()
  var pluginPath = context.scriptPath.replace(/Contents\/Sketch\/(\w*)\.cocoascript$/, '').replace(/ /g, '\\ ')
  var fileFolder = preferences.exportFolder + '/' + currentFileNameWithoutExtension
  var command = `${pluginPath}exportArtboard.sh "${path}" "${preferences.exportFolder}" "${fileFolder}" "${NSBundle.mainBundle.bundlePath()}" "${currentFileName}" "${preferences.exportScale}"`
  return exec(context, command)
}

export function setPreference (key, value) {
  key = keyPref + key
  if (typeof value === 'boolean') {
    NSUserDefaults.standardUserDefaults().setBool_forKey(value, key)
  } else {
    NSUserDefaults.standardUserDefaults().setObject_forKey(value, key)
  }
  NSUserDefaults.standardUserDefaults().synchronize()
}

export function checkForFile (context) {
  try {
    getCurrentFileName(context)
    getCurrentDirectory(context)
    return true
  } catch (e) {
    createFailAlert(context, 'Missing file', 'You need to open a sketch file before doing that')
    return false
  }
}

function TextArea (x, y, width, heigh) {
  var scrollView = NSScrollView.alloc().initWithFrame(NSMakeRect(x, y, width, heigh))
  scrollView.borderStyle = NSLineBorder
  var contentSize = scrollView.contentSize()
  var input = NSTextView.alloc().initWithFrame(NSMakeRect(0, 0, contentSize.width, contentSize.height))
  input.minSize = NSMakeSize(0, contentSize.height)
  input.maxSize = NSMakeSize(contentSize.width, Infinity)
  scrollView.documentView = input
  return {
    view: scrollView,
    getValue () {
      return input.string()
    }
  }
}
