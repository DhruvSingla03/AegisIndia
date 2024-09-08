import { prisma } from "@/app/db/prisma"
import { type NextRequest, NextResponse } from "next/server"

// Cache to store log counts for each keyId
const logCountCache = new Map<string, number>()

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const apiKey = searchParams.get('apiKey')
    
    // Extract the request body
    const requestBody = await request.json(); // Extract the JSON body
    // console.log(requestBody)
    // Extract request details: method, URL, headers, and body
    const requestData = {
        method: request.method,
        url: request.url,
        headers: Object.fromEntries(request.headers), // Convert headers to an object
        body: requestBody, // Store the request body as part of the request data
    }

    try {
        if (!apiKey) {
            return NextResponse.json({ error: "API key is missing" }, { status: 400 })
        }

        // Fetch the key from the database based on the apiKey
        const keyRecord = await prisma.key.findUnique({
            where: {
                value: apiKey,
            },
            select: {
                id: true, // To link the log with this key
                lastApiCall: true,
            },
        })

        if (!keyRecord) {
            return NextResponse.json({ error: "API key not found" }, { status: 404 })
        }

        const currentTime = new Date()
        const lastApiCall = keyRecord.lastApiCall

        const timeDifference = (currentTime.getTime() - new Date(lastApiCall).getTime()) / 1000

        // Check log count from cache
        let logCount = logCountCache.get(keyRecord.id) || 0

        if (logCount >= 50) {
            // Step 1: Find the oldest log if cache count >= 50
            const oldestLog = await prisma.log.findFirst({
                where: {
                    keyId: keyRecord.id,
                },
                orderBy: {
                    createdAt: 'asc', // Oldest log first
                },
            })

            if (oldestLog) {
                // Step 2: Delete the oldest log
                await prisma.log.delete({
                    where: {
                        id: oldestLog.id,
                    },
                })

                // Decrement log count in cache after deletion
                logCountCache.set(keyRecord.id, logCount - 1)
            }
        }

        if (timeDifference < 6) {
            await prisma.key.update({
                where: {
                    value: apiKey,
                },
                data: {
                    numApiCall: { increment: 1 },
                    failApiCall: { increment: 1 }
                },
            })

            // Log the failed request due to time limit
            await prisma.log.create({
                data: {
                    keyId: keyRecord.id,
                    requestData: requestData,
                    responseData: { error: "You tried too soon, wait for few seconds" },
                    success: false,
                }
            })

            // Increment log count in cache after new log
            logCountCache.set(keyRecord.id, logCount + 1)

            return NextResponse.json({ error: "You tried too soon, wait for few seconds" }, { status: 429 })
        }

        // Make external POST request
        const externalResponse = await fetch(process.env.INFER_URL as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })

        const externalData = await externalResponse.json()

        // Update the key's last API call and log successful call
        await prisma.key.update({
            where: { value: apiKey },
            data: {
                lastApiCall: currentTime,
                numApiCall: { increment: 1 },
                successApiCall: { increment: 1 }
            },
        })

        // Log the successful request and response
        await prisma.log.create({
            data: {
                keyId: keyRecord.id,
                requestData: requestData,
                responseData: externalData,
                success: true,
            }
        })

        // Increment log count in cache after new log
        logCountCache.set(keyRecord.id, logCount + 1)

        return new NextResponse(
          JSON.stringify(externalData),
          {status: 200, headers: { 'ACCESS-CONTROL-ALLOW-ORIGIN': '*',
            'ACCESS-CONTROL-ALLOW-METHODS': '*',
            'ACCESS-CONTROL-ALLOW-CREDENTIALS': 'true',
            'ACCESS-CONTROL-ALLOW-HEADERS': '*'} },
          );

    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
