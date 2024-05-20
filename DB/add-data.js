require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const rows = await sql`
            INSERT INTO transactions (nama_transaksi, income, outcome, created_at, tanggal, bulan, tahun)
            VALUES ('JUDUL', 0, 0, CURRENT_TIMESTAMP, EXTRACT(DAY FROM CURRENT_TIMESTAMP), EXTRACT(MONTH FROM CURRENT_TIMESTAMP), EXTRACT(YEAR FROM CURRENT_TIMESTAMP))
            RETURNING *
        `;
        console.log("Data added:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
