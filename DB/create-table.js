require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const deleteTable = await sql`DROP TABLE IF EXISTS transactions`;
        console.log("Table dropped:", deleteTable);

        const createTable = await sql`
        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            nama_transaksi VARCHAR(20) NOT NULL,
            income INT NOT NULL,
            outcome INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            tanggal INT NOT NULL,
            bulan INT NOT NULL,
            tahun INT NOT NULL
        )
        `;
        console.log("Table created:", createTable);
    } catch (error) {
        console.log(error);
    }
}

execute();
