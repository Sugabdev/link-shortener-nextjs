import type { NeonQueryFunction } from "@neondatabase/serverless";
/*
Generates a unique code for the URL.
sqlClient, neon client to execute queries.
length, length of the code, default 5.
*/
export async function uniqueCode(sqlClient: NeonQueryFunction<false, false>, length: number = 5): Promise<string> {

    // Available characters for the code.
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let code: string;
    let flag: boolean = true;

    // Generate a random code until it is unique.
    while (flag) {
        code = '';

        // Generate a random code.
        for (let i = 0; i < length; i++) {
            code += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }

        // Check if the code already exists in the database.
        const query = await sqlClient`SELECT 1 FROM Links WHERE code = ${code} LIMIT 1`

        // Break the loop if the code already exists.
        flag = query.length > 0
    }

    return code!;
}