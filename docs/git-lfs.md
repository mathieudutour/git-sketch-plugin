# Enabling Git LFS _(optional)_

Git LFS is an extension for git that enables a quicker way to push and pull changes that involve binary files, like `.png` and `.sketch`. It is not critical to using this plugin, but it may help maintain a healthy git repository.

_Note: In using the Git LFS extension, all contributors must have it installed, and the git remote (ie Github, Bitbucket, Gitlab) must have it enabled with sufficient storage available to the hosting account._

Start by enabling LFS for your repo:

1. [Downloading and install](https://git-lfs.github.com/) Git LFS to your machine
2. Go into the terminal for your repo (through Sketch, `Plugins > Git > Advanced > Open terminal`)
3. Paste the following into your repo, `git lfs install && git lfs track '*.png' && git lfs track '*.sketch' && git add .gitattributes`
4. Thats it. You need only run these commands once. Your team mates will have to download and install Git LFS onto their machines as well (so, just step 1).
