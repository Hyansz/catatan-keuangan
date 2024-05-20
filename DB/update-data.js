require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
            UPDATE transactions 
            SET nama_transaksi = 'Nama Transaksi Baru',
                income = 1000,
                outcome = 500,
                created_at = CURRENT_TIMESTAMP,
                tanggal = EXTRACT(DAY FROM CURRENT_TIMESTAMP),
                bulan = EXTRACT(MONTH FROM CURRENT_TIMESTAMP),
                tahun = EXTRACT(YEAR FROM CURRENT_TIMESTAMP)
            WHERE id = 1
            RETURNING *
        `;
        console.log("Data updated:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
