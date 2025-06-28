import { NextResponse } from "next/server"
import { neon } from '@neondatabase/serverless'

export async function GET(req: Request, { params }: { params: { code: string } }) {
    try {
        // Neon sql client.
        const sql = neon(`${process.env.DATABASE_URL}`)

        // Get the code from the URL.
        const { code } = params

        // Get the original URL from the database.
        const [row] = await sql`SELECT original_url FROM Links WHERE code = ${code}`

        if (!row) return NextResponse.json({ message: 'Not found' }, { status: 404 })

        const { original_url } = row

        return NextResponse.redirect(original_url)

    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}