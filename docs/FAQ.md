# FAQ

## [Can two people work on the same file at the same time?](https://github.com/mathieudutour/git-sketch-plugin/issues/42)

Because the sketch format is a binary, there is no way to know what has changed. Hence it is not possible to merge the changes made on the same file.

The only advice I can give would be to work on smaller files where the concern are separate.

## I get an error when trying to generate the pretty diffs, what do I do?

Make sure that:
  * [all used fonts are installed](https://github.com/mathieudutour/git-sketch-plugin/issues/14)

If you still have an issue, [open a new one](https://github.com/mathieudutour/git-sketch-plugin/issues/new).

## I get `xcrun error: cannot be used within an App Sandbox.` whenever I try to use the plugin, what do I do?

The plugin doesn't work with the app from the Mac App Store. It needs to access git and the file system which is impossible on a sandboxed app.
