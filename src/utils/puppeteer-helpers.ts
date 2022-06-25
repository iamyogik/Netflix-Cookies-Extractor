// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer')

type GetBrowserOptions = {
   headless?: boolean
   width?: number
   height?: number
}

export const getBrowser = async (options: GetBrowserOptions) => {
   const { headless = true, width = 1920, height = 1080 } = options || {}

   const browser = await puppeteer.launch({
      headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
         width,
         height,
      },
   })
   const page = await browser.newPage()
   page.setDefaultNavigationTimeout(60000)
   await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
   )
   return { browser, page }
}
