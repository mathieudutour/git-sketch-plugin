# Git commands used behind the scene

Client                       | Command
:----------------------------|:------------------------------------------
 Commit                      | `git commit -m 'message' -a`
 Push                        | `git -c push.default=current push -q`
 New Branch                  | `git checkout -qb branchName`
 Switch Branch               | `git checkout -q branchName`
 Pull                        | `git pull`
 Add file to git             | `git add currentFile`
 Init Git repo               | `git init && git add currentFile`
