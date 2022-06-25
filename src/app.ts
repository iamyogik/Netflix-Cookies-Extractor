import { loginToNetflix } from './netflix/login-to-netflix'
import to from 'await-to-js'
import axios from 'axios'
import { config } from './utils/config'

const startApp = async () => {
   console.log('Updating Cookies')
   const [err, cookies] = await to(loginToNetflix())
   if (err) {
      console.log('Failed to log into Netflix')
      console.error(err)
      return
   }

   if (config.webhookUrl) {
      const data = { cookies: JSON.stringify(cookies) }
      await axios.post(config.webhookUrl, data)
      console.log('Cookies Updated')
   } else {
      console.log(JSON.stringify(cookies))
   }
}

startApp()
