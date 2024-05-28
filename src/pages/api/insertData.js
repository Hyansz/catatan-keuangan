const { sql } = require("@vercel/postgres");

export default async function insertData(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { nama_transaksi, income, outcome, tanggal, bulan, tahun } =
            req.body;

        if (
            !nama_transaksi ||
            !tanggal ||
            !bulan ||
            !tahun
        ) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        if (income === 0 && outcome === 0) {
            return res.status(400).json({ message: "Harus diisi salah satu"})
        } 

        if (income !== 0 && outcome !== 0) {
            return res.status(400).json({ message: "Harus diisi salah satu" });
        } 

        const rows = await sql`
            INSERT INTO transactions (nama_transaksi, income, outcome, tanggal, bulan, tahun)
            VALUES (${nama_transaksi}, ${income}, ${outcome}, ${tanggal}, ${bulan}, ${tahun})
            RETURNING *
        `;

        res.status(200).json({ message: "Success", data: rows[0] });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}
