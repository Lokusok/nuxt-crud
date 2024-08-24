import { oauthDiscordEventHandler, sendRedirect, setUserSession } from "#imports"

export default oauthDiscordEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    console.log(user, '<<< [DISCORD]')
    await setUserSession(event, {
      user: {
        name: user.username,
        email: user.email,
        discordId: user.id
      }
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Discord OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
