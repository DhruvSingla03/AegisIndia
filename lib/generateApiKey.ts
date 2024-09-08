// utils/generateApiKey.ts

export function generateApiKey(length = 32) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-@#%&*"
    let apiKey = ""
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      apiKey += characters[randomIndex]
    }
  
    return apiKey
  }
  