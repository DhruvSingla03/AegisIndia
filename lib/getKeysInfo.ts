"use server"
import { prisma } from "@/app/db/prisma";

export async function getKeyInfo(keyId: string) {
  try {
    const keyInfo = await prisma.key.findUnique({
      where: {
        id: keyId,
      },
      include: {
        user: true, // This includes the associated User information
      },
    });

    if (!keyInfo) {
      throw new Error('Key not found');
    }

    return keyInfo;
  } catch (error) {
    console.error("Error fetching key information:", error);
    throw error;
  }
}