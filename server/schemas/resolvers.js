const resolvers = {
    Query: {
      users: async () => {
        try {
          const users = await axios.get("https://paper-api.alpaca.markets/users")
          return users.data.map(({ id, login, avatar_url }) => ({
            id,
            login,
            avatar_url,
          }))
        } catch (error) {
          throw error
        }
      },
    },
  }