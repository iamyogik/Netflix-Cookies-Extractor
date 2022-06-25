# Netflix Cookies Extractor
Script to log into Netflix and Extract Cookies

- Just add you Netflix Email and Password in the config file [Config File](./src/utils/config.ts) or pass it in as ENVs `NETFLIX_EMAIL` and `NETFLIX_PASSWORD`
- If you want to hit a webhook (POST) then add it to the same config file or pass it in as a ENV `WEBHOOK_URL`
- Run `npm run dev` to run it in development mode


## Run as a CronJob
You can also run it as a Cron Job. Use the DockerFile to build the image and run it on kubernetes as a CronJob.
But be careful, Netflix might block your login request based on you kubernetes Node server location.
Running it on local machine will give you the best results.

Make sure to keep atleast 30 min different between each job run. Not doing so might lead to Netflix blocking you account for too many logins.


## Use **Integromat** to share your Netflix Cookies
You can use webhook to update a hosted Gist or create a new pastebin file and share it with your friends.

You can use this blueprint - [Integromat Gist Blueprint](./Integromat/gist-blueprint.json).

Update the gist id and file name and you are good to go. Update the webhook url that you would get from Integromat