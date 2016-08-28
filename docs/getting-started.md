# Workflow
Once:
* Init the git repo (`Plugins > Git > Advanced > Init git repo`)
* Add all the sketch files you are working on the repo (`Plugins > Git > Advanced > Add file to git`)

Then:
* Create a new branch when you start working on a new feature (`Plugins > Git > New branch`)
* Work normally on your design
* Save the file
* Commit the changes with a meaningful message describing them. The plugin will extract the artboards in your file in order to show the differences easily. (`Plugins > Git > Commit`)
* Push your changes to the remote. (`Plugins > Git > Push`)
* Create a pull request from your branch to the master branch.
* Voila. Your co-workers can review the changes, comment on them and approve them. Once approved, merge the pull request.

For a more in-depth explanation of a nice git flow, check out [this article](https://about.gitlab.com/2014/09/29/gitlab-flow/).
