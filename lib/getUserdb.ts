// utils/getUserId.ts
"use server"
import { prisma } from "@/app/db/prisma"

// Function to fetch user ID based on email
export async function getUserId(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    // Return the user's ID if found, otherwise return null
    return user?.id || null
  } catch (error) {
    console.error("Error fetching user ID:", error)
    throw new Error("Unable to fetch user ID")
  }
}
