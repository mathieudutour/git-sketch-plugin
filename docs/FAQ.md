# FAQ

## [I installed the plugin but it's not showing in the Sketch plugin menu?](https://github.com/mathieudutour/git-sketch-plugin/issues/77)
Make sure that you downloaded the plugin from the releases page: https://github.com/mathieudutour/git-sketch-plugin/releases.

## What exactly are the pretty diffs?
The plugin is generating one png per artboard, independently of wether they are in the same page or not. Just be careful if some of your artboards have the same name (only the last one will be generated).
Those generated images are in a hidden folder and Github will pick them up to show the changes between commits ([example](https://github.com/mathieudutour/git-sketch-plugin/pull/1/files))

## [Can two people work on the same file at the same time?](https://github.com/mathieudutour/git-sketch-plugin/issues/42)

Because the sketch format is a binary, there is no way to know what has changed. Hence it is not possible to merge the changes made on the same file.

The only advice I can give would be to work on smaller files where the concern are separate.

## I get an error when trying to generate the pretty diffs, what do I do?

Make sure that:
  * [all used fonts are installed](https://github.com/mathieudutour/git-sketch-plugin/issues/14)

If you still have an issue, [open a new one](https://github.com/mathieudutour/git-sketch-plugin/issues/new).

## I get `xcrun error: cannot be used within an App Sandbox.` whenever I try to use the plugin, what do I do?

The plugin doesn't work with the app from the Mac App Store. It needs to access git and the file system which is impossible on a sandboxed app.

## I get `Failed... gpg: cannot open '/dev/tty': Device not configured` when I try to commit, what do I do?

You are signing your commits with PGP/GPG, which is great! Unfortunately, you just hit a [common issue with GnuPG](https://github.com/Microsoft/vscode/issues/5065) (cf. #93). As a workaround, you can tell GnuPG to never
use the `TTY`:

    $ echo 'no-tty' >> ~/.gnupg/gpg.conf

More information about this option:

> --no-tty
> Make sure that the TTY (terminal) is never used for any output. This option is needed in some cases because
> GnuPG sometimes prints ?? warnings to the TTY even if --batch is used.

Note: this option will **not** disable GPG signed commits. Nonetheless, `gpg` will be slightly less verbose.
