// utils/saveApiKey.ts
"use server"
import { prisma } from "@/app/db/prisma"
import { generateApiKey } from "./generateApiKey"
import { revalidatePath } from "next/cache"
import crypto from "crypto" // Importing the crypto module

export async function saveApiKey(userId: string, name: string) {
  // Generate a new API key
  const apiKey = generateApiKey()
  console.log(userId, name)

  try {
    // Check if an API key with the same name already exists
    const existingKey = await prisma.key.findFirst({
      where: {
        name,
        userId,
      },
    })

    if (existingKey) {
      // If a key with the same name exists, throw an error or handle it appropriately
      throw new Error("An API key with this name already exists.")
    }

    // Save the new API key to the database
    const newKey = await prisma.key.create({
      data: {
        name,
        userId,
        value: apiKey, // Temporary value for now
      },
    })

    // Hash the userId and newKey.id using SHA-256
    const hash = crypto.createHash('sha256')
      .update(userId + newKey.id) // Concatenating userId and newKey.id
      .digest() // Get the result as a buffer

    // Convert the first 16 bytes of the hash to a base64 string
    const base64Hash = hash.slice(0, 16).toString('base64').substring(0, 32)

    // Update the newly created key with the truncated and encoded value
    const updatedKey = await prisma.key.update({
      where: { id: newKey.id },
      data: {
        value: base64Hash, // Storing the base64 encoded value
      },
    })

    revalidatePath("/dashboard")

    return updatedKey // Return the updated key with the truncated and encoded value
  } catch (error) {
    console.error("Error saving API key:", error)
    throw new Error("Unable to save API key")
  }
}
