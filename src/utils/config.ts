export const config = {
   netflixAuthDetails: {
      email: process.env.NETFLIX_EMAIL || '',
      password: process.env.NETFLIX_PASSWORD || '',
   },
   timeout: process.env.TIMEOUT || 20000,
   webhookUrl: process.env.WEBHOOK_URL,
}
