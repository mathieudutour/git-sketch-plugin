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

# In-depth explanation
- git is a **distributed** version control system. It means that your repository (folder) live in different places at the same time. One of those places is your computer (local directory), another one is the github servers (remote). You can have others as well but it's beyond the scope of this discussion. 

  To tell your computer that your folder should be tracked using git: `Plugins > Git > Advanced > Init git repo`. 

  At this point you will be asked for the URL of the remote. Go to github, create a new repo and copy paste the URL of your repository in the plugin. Make sure you are using the correct format (SSH or HTTPS) according to your authentication method.


- The different places are not sync automatically (if you would want that, which you don't believe me), use dropbox. Git allows you to sync your data only when you want to.


- The first "way" to sync your data is when you have made changes on your local directory and that you want to **push** them to the remote (github in this case). You first have to **commit** your changes. When you commit your changes, you are saying to git: "Ok, I like what I have done now, take a snapshot of my files and store it". You need to enter a message to describe the changes you've made. This will allow your co-workers (and yourself) to remember what happened at that point.

  You can then push. To do that, you need to connect to your remote (github). Because not everybody can push on your repo, you need to tell git about your github credentials so that github knows that it's you. 
  
  https://help.github.com/articles/set-up-git/
  
  https://help.github.com/articles/caching-your-github-password-in-git/

- The second way to sync your data is when someone else has made some changes and pushed them to the remote. You now need to **pull** the changes from the remote to your local directory.
