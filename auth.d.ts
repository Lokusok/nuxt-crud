declare module '#auth-utils' {
  interface UserSession {
    user: {
      name: string
      password: string
      createdAt: Date
      updatedAt: Date,
      email: string
      githubId?: string
      discordId?: string
    }
  }
}
