import send from 'sketch-module-google-analytics'
import { getUserPreferences } from './preferences'

const key = 'UA-88206962-1'

export function sendEvent (context, category, action, label, value) {
  const { sendAnalytics } = getUserPreferences()
  if (!sendAnalytics) { return }
  const payload = {}
  if (category) { payload.category = category }
  if (action) { payload.action = action }
  if (label) { payload.label = label }
  if (value) { payload.value = value }

  return send(context, key, 'event', payload)
}

export function sendError (context, error) {
  const { sendAnalytics } = getUserPreferences()
  if (!sendAnalytics) { return }
  return send(context, key, 'event', {exd: error})
}
