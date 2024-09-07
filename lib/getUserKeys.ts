"use server"
// utils/getUserKeys.ts
import { prisma } from "@/app/db/prisma"

export async function getUserKeys(userId: string) {
  try {
    // Fetch all keys associated with the user
    const keys = await prisma.key.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        value: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc', // Order by creation date (most recent first)
      },
    })

    return keys // Return the list of keys
  } catch (error) {
    console.error("Error fetching keys for user:", error)
    throw new Error("Unable to fetch user keys")
  }
}
