// utils/saveApiKey.ts
"use server"
import { prisma } from "@/app/db/prisma"
import { generateApiKey } from "./generateApiKey"
import { revalidatePath } from "next/cache"

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
        value: apiKey, // Saving the generated API key in the 'value' field
      },
    })
    revalidatePath("/dashboard")

    return newKey // Return the newly created key
  } catch (error) {
    console.error("Error saving API key:", error)
    throw new Error("Unable to save API key")
  }
}
