# discord-avatar-puller
## A simple Cloudflare worker to pull Discord avatars from a user's ID.

### How to setup:
1. Create a Cloudflare worker.
2. Upload the code.
3. Create a Discord bot and copy its token.
4. Create an environment variable `botToken` and add your Discord bot's token. (You can encrypt it if you want)
5. Deploy it.
And you're good to go! :)

### I host a public instance of it, feel free to use it! `https://discord-avatars.zomka.dev/`

### Usage:
* `https://your-url.workers.dev/discorduserid`
### Examples:
* `https://discord-avatars.zomka.dev/253154276560338945`

### Licensed under AGPL v3.0