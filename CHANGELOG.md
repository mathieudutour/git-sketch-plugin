## [0.7.3] - 2016-10-03

* fix non-ascii characters encoding (thanks @tomonari-t)

## [0.7.2] - 2016-09-08

* fix when the path to the plugin has multiple spaces


## [0.7.1] - 2016-09-01

* check if a file is open and send a helpful message if not
* add a button to report the issue when one happens


## [0.7.0] - 2016-08-31

* add option to exclude entire pages from pretty diffs


## [0.6.0] - 2016-08-27

* check for new updates automatically


## [0.5.0] - 2016-08-27

* add option to exclude artboards from pretty diffs

    * create a file called .sketchignore next to your sketchfiles
    * put the name of the artboards inside (see example). It can either be the exact name of the artboard or a regex
    * profit


## [0.4.0] - 2016-08-24

* keep old generated artboards if not changed
* add preference to control the scale of the exported artboards


## [0.3.5] - 2016-06-23

* escape double quote in commit message


## [0.3.4] - 2016-05-30

* fix missing argument in the export artboards function


## [0.3.3] - 2016-05-30

* fix missing argument in the shared functions


## [0.3.2] - 2016-05-29

* factorize cd into the current folder for every command
* use `git for-each-ref` instead of `git branch + awk` to list the branches


## [0.3.1] - 2016-05-23

* add preferences for the terminal to use
* prefix user preferences by `gitSketch` to not conflict with others potentially
* replace option of `push` (was `simple`, now `current`)


## [0.3.0] - 2016-05-21

* add plugin preferences panel
* add icon on alerts
* open terminal with `iTerm` if available
* add `pull` command
* add default option for push
* add popup to ask for the remote repository url


## [0.2.3] - 2016-04-18

* use sketchtool from the bundle


## [0.2.2] - 2016-03-28

* use user bah profile when running commands


## [0.2.1] - 2016-02-05

* add checkbox to generate pretty diffs when commiting


## [0.2.0] - 2016-01-23

* use sketchtool to generate pretty diffs
* add command to add file to git


## [0.1.0] - 2016-01-22

* first release
