import fetch from 'node-fetch'
/* type */
import { Options, WebhookOptionsBodyFunctionType } from '@src/types'
/* util */
import { isFunction, isPlainObject } from '@src/util/type'
import { VersionData } from '@src/util/version'
import Log from '@src/util/log'
/* changelog */
import { getChangeLog } from '@src/changelog'

async function webhook(options: Options, versionData: VersionData) {
  
  const url = options.webhook.url
  let body = {}
  
  if (isPlainObject(options.webhook.body)) {
    body = options.webhook.body
  }
  else if (isFunction(options.webhook.body)) {
    
    const changeLog = await getChangeLog()
    const newVersion = versionData.newVersion
    const bodyFunction = options.webhook.body as WebhookOptionsBodyFunctionType
    
    body = bodyFunction(changeLog, newVersion)
  }
  
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  const data = await response.json()
  
  Log.output(`Webhook Result: ${ JSON.stringify(data) }`)
}

export default webhook
