// Common library of things
import { Document } from "sketch";
import { execSync } from "@skpm/child_process";
import dialog from "@skpm/dialog";

function getPluginAlertIcon() {
  /* eslint-disable */
  if (__command.pluginBundle() && __command.pluginBundle().alertIcon()) {
    return __command.pluginBundle().alertIcon();
  }
  /* eslint-enable */
  return NSImage.imageNamed("plugins");
}

export function executeSafely(func) {
  try {
    func();
  } catch (e) {
    createFailAlert("Failed...", e, true);
  }
}

export function exec(command) {
  const path = getCurrentDirectory();
  command = `cd "${path}" && ${command}`;

  return execSync(command, {
    cwd: path,
    shell: "/bin/bash",
    encoding: "utf8"
  });
}

export function getCurrentDirectory() {
  const document = Document.getSelectedDocument();
  return String(
    document.sketchObject
      .fileURL()
      .URLByDeletingLastPathComponent()
      .path()
  );
}

export function getGitDirectory() {
  return exec("git rev-parse --show-toplevel")
    .trim()
    .replace("(B[m", "");
}

export function getCurrentFileName() {
  const document = Document.getSelectedDocument();
  return String(document.sketchObject.fileURL().lastPathComponent());
}

export function createFailAlert(title, error, buttonToReport) {
  console.log(error);
  const responseCode = dialog.showMessageBoxSync({
    type: "error",
    message: title,
    detail: "" + error,
    buttons: ["OK", ...(buttonToReport ? ["Report Issue"] : [])]
  });

  if (responseCode) {
    let errorString = error;
    if (typeof error === "object") {
      try {
        errorString = JSON.stringify(error, null, "\t");
        if (errorString === "{}") {
          errorString = error;
        }
      } catch (e) {}
    }
    if (error && error.message) {
      errorString = `${error.message}\n\n${errorString}`;
    }
    if (error && error.stack) {
      errorString = `${errorString}\n\n${error.stack}`;
    }
    const urlString = `https://github.com/mathieudutour/git-sketch-plugin/issues/new?body=${encodeURIComponent(
      "### How did it happen?\n1.\n2.\n3.\n\n\n### Error log\n\n```\n" +
        errorString +
        "\n```"
    )}`;
    const url = NSURL.URLWithString(urlString);
    NSWorkspace.sharedWorkspace().openURL(url);
  }

  return {
    responseCode
  };
}

export function createInputWithCheckbox(
  msg,
  checkboxMsg,
  checked,
  okLabel,
  cancelLabel
) {
  const accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 100));
  const input = TextArea(0, 25, 300, 75);
  const checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 25));
  checkbox.setButtonType(3);
  checkbox.title = checkboxMsg;
  checkbox.state = checked ? 1 : 0;
  accessory.addSubview(input.view);
  accessory.addSubview(checkbox);

  const alert = NSAlert.alloc().init();
  alert.setMessageText(msg);
  alert.addButtonWithTitle(okLabel || "OK");
  alert.addButtonWithTitle(cancelLabel || "Cancel");
  alert.setIcon(getPluginAlertIcon());
  alert.setAccessoryView(accessory);

  const responseCode = alert.runModal();
  const message = input.getValue();

  return {
    responseCode: responseCode,
    message: String(message),
    checked: checkbox.state() == 1
  };
}

export function getCurrentBranch() {
  const path = getCurrentDirectory();
  const currentBranchCommand = `cd "${path}" && git rev-parse --abbrev-ref HEAD`;
  let branch;
  try {
    branch = exec(currentBranchCommand).split("\n")[0];
  } catch (e) {
    branch = "master";
  }
  return branch;
}

export function checkForFile() {
  try {
    getCurrentFileName();
    getCurrentDirectory();
    return true;
  } catch (e) {
    createFailAlert(
      "Missing file",
      "You need to open a sketch file before doing that"
    );
    return false;
  }
}
export function checkForGitRepository() {
  try {
    getGitDirectory();
    return true;
  } catch (e) {
    createFailAlert(
      "Not a git repository",
      "You need to init git repository first"
    );
    return false;
  }
}

function TextArea(x, y, width, heigh) {
  const scrollView = NSScrollView.alloc().initWithFrame(
    NSMakeRect(x, y, width, heigh)
  );
  scrollView.borderStyle = NSLineBorder;
  const contentSize = scrollView.contentSize();
  const input = NSTextView.alloc().initWithFrame(
    NSMakeRect(0, 0, contentSize.width, contentSize.height)
  );
  input.minSize = NSMakeSize(0, contentSize.height);
  input.maxSize = NSMakeSize(contentSize.width, Infinity);
  scrollView.documentView = input;
  return {
    view: scrollView,
    getValue: () => input.string()
  };
}
