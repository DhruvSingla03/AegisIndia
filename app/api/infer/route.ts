// Adjust the import to your Prisma instance
import { prisma } from "@/app/db/prisma"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const apiKey = searchParams.get('apiKey')
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
        lastApiCall: true,
      },
    })

    if (!keyRecord) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 })
    }

    // Get the current time and the time of the last API call
    const currentTime = new Date()
    const lastApiCall = keyRecord.lastApiCall

    // Calculate the time difference in seconds
    const timeDifference = (currentTime.getTime() - new Date(lastApiCall).getTime()) / 1000

    if (timeDifference < 12) {
      // If less than 12 seconds have passed
      await prisma.key.update({
        where: {
          value: apiKey,
        },
        data: {
          numApiCall: {
            increment: 1,
          },
          failApiCall:{
              increment:1
          }
        },
      })
      
      return NextResponse.json({ error: "You tried too soon, wait for few seconds" }, { status: 429 })
    }

    // If the condition passes, proceed with the API logic
    // Send the POST request to reqres.in API
    const externalResponse = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'morpheus',
        job: 'leader',
      }),
    })

    const externalData = await externalResponse.json()

    // If the external request succeeds, update the key data
    await prisma.key.update({
      where: {
        value: apiKey,
      },
      data: {
        lastApiCall: currentTime,
        numApiCall: {
          increment: 1,
        },
        successApiCall:{
            increment:1
        }
      },
    })

    return NextResponse.json({
      message: "API call successful",
      externalResponse: externalData, // Return the response from reqres.in
    })

  } catch (error) {
    if(apiKey){
        const currentTime = new Date()
        await prisma.key.update({
            where: {
              value: apiKey,
            },
            data: {
              lastApiCall: currentTime,
              numApiCall: {
                increment: 1,
              },
              failApiCall:{
                  increment:1
              }
            },
          })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
