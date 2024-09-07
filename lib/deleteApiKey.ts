"use server"

import { prisma } from "@/app/db/prisma"
import { revalidatePath } from "next/cache"

export async function deleteApiKey(keyid:string){
    try {
        await prisma.key.delete({
        where: { id: keyid },
        })
        revalidatePath("/dashboard")
        // Optionally, refresh keys after deletion or update state
        console.log(`Key with ID ${keyid} deleted.`)
    } catch (error) {
        console.error("Error deleting key:", error)
    }
}