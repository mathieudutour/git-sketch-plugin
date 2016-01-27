git-sketch-plugin
=========

 A Git client built right into [Sketch](http://www.bohemiancoding.com/sketch). Generate [pretty diffs](https://github.com/mathieudutour/git-sketch-plugin/pull/1/files) so that everybody knows what are the changes!

From ...
![Ugly](example/ScreenShotBad.png)
... To
![Pretty](example/ScreenShotNice.png)

 Compatible with Sketch <= 3.4.

![screen cast](example/ScreenCast.gif)

## Requirements
* [Git](https://git-scm.com/)
* [Sketchtool](http://www.sketchapp.com/tool/) installed in `/usr/local/bin/sketchtool` (default location)

## Installation
* Download this repo as a zip
* Double-click on Git.sketchplugin

## Workflow
Once:
* Init the git repo
* Add all the sketch files you are working on the repo

Then:
* Create a new branch when you start working on a new feature
* Work normally on your design
* Save the file
* Commit the changes with a meaningful message describing them. The plugin will extract the artboards in your file in order to show the differences easily.
* Push your changes to the remote.
* Create a pull request from your branch to the master branch.
* Voila. Your co-workers can review the changes, comment on them and approve them. Once approved, merge the pull request.

For a more in-depth explanation of a nice git flow, check out [this article](https://about.gitlab.com/2014/09/29/gitlab-flow/).

## Default key bindings

 Action                       | Shortcut
:-----------------------------|:---------------------------------------
 Commit your changes          | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>cmd</kbd> + <kbd>c</kbd>
 Push your changes            | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>cmd</kbd> + <kbd>p</kbd>
 Create a new branch          | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>cmd</kbd> + <kbd>n</kbd>
 Switch to an existing branch | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>cmd</kbd> + <kbd>o</kbd>

## Git command behind

Client                       | Command
:----------------------------|:------------------------------------------
 Commit                      | `git commit -m 'message' -a`
 Push                        | `git push -q`
 New Branch                  | `git checkout -qb branchName`
 Switch Branch               | `git checkout -q branchName`
 Add file to git             | `git add currentFile`
 Init Git repo               | `git init && git add currentFile`


## License

MIT
