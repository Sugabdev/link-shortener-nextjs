import { NextResponse } from "next/server"
import { uniqueCode } from "@/lib/uniqueCode"
import { neon } from '@neondatabase/serverless'

export async function POST(req: Request) {
    // Get the url from the FE.
    const { url } = await req.json()

    if (!url) {
        return NextResponse.json({
            message: 'no url provided',
            status: 400
        })
    }

    try {
        // Conect to the database.
        const sql = neon(`${process.env.DATABASE_URL}`)

        // Check id the URL is already stored.
        const isUrlStored = await sql`SELECT * FROM Links WHERE original_url = ${url}`

        // Return the existent shortened url if it exists.
        if (isUrlStored.length > 0) {
            const [row] = isUrlStored
            const { original_url, code } = row

            return NextResponse.json(
                {
                    message: 'URL already shortened',
                    data: {
                        original_url: original_url,
                        short_url: `https://linksu.vercel.app/${code}`,
                    }
                },
                { status: 200 }
            )
        } else { // Shorten the URL and insert it into the database.
            // Generate an unique code for the URL.
            const code: string = await uniqueCode(sql)

            await sql`INSERT INTO Links (original_url, code) VALUES (${url}, ${code})`

            return NextResponse.json(
                {
                    message: 'URL successfully shortened',
                    data: {
                        original_url: url,
                        short_url: `https://linksu.vercel.app/${code}`,
                    }
                },
                { status: 200 }
            )
        }
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}