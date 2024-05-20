require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
        DELETE FROM transactions
        RETURNING *
        `;
        console.log("Data deleted:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
