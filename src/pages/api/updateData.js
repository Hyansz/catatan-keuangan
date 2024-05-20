const { sql } = require("@vercel/postgres");

export default async function updateData(req, res) {
    try {
        if (req.method !== "PUT") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { id, nama_transaksi, income, outcome, tanggal, bulan, tahun } =
            req.body;

        if (
            !id ||
            !nama_transaksi ||
            !income ||
            !outcome ||
            !tanggal ||
            !bulan ||
            !tahun
        ) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        const { rows } = await sql`
            UPDATE transactions 
            SET nama_transaksi = ${nama_transaksi},
                income = ${income},
                outcome = ${outcome},
                tanggal = ${tanggal},
                bulan = ${bulan},
                tahun = ${tahun}
            WHERE id = ${id}
            RETURNING *
        `;

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.status(200).json({ message: "Success", data: rows[0] });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}
