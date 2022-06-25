import { getBrowser } from '../utils/puppeteer-helpers'
import { config } from '../utils/config'

export const loginToNetflix = async () => {
   const { email, password } = config.netflixAuthDetails

   const { page, browser } = await getBrowser({ headless: true })
   await page.goto('https://www.netflix.com/in/login')

   await page.waitForSelector('[name=userLoginId]')

   await page.focus('[name=userLoginId]')
   await page.keyboard.type(email)
   await page.focus('[name=password]')
   await page.keyboard.type(password)

   await page.click('button[data-uia=login-submit-button]')

   await page.waitForNavigation({ waitUntil: 'networkidle2' })

   const url = page.url()

   if (!url.includes('browse')) {
      await browser.close()
      throw new Error('Could not log you in. May be auth details in wrong')
   }

   const cookies = await page.cookies()

   const formatCookies = cookies.map((c: any) => {
      let sameSite = c.sameSite

      if (c.sameSite === 'Strict') {
         sameSite = 'strict'
      } else if (c.sameSite === 'Lax') {
         sameSite = 'lax'
      }
      return {
         ...c,
         hostOnly: false,
         storeId: '0',
         expirationDate: c.expires,
         sameSite,
      }
   })

   const onlyReqCookies = formatCookies.filter(
      (c: any) => c.name === 'SecureNetflixId' || c.name === 'NetflixId'
   )

   await browser.close()

   return onlyReqCookies
}
