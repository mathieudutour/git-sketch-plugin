import update from 'sketch-module-update'
import { setIconForAlert } from '../common'

const repoFullName = 'mathieudutour/git-sketch-plugin'

const options = {
  title: 'A new Git plugin version is available!',
  customizeAlert: setIconForAlert
}

export default update(repoFullName, options)
