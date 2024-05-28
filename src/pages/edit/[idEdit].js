import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditData() {
    const router = useRouter();
    const { idEdit } = router.query;
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                setDataDetail(data.data ? data.data : null);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [idEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const nama_transaksi = event.target.nama_transaksi.value;
        const income = parseInt(event.target.income.value);
        const outcome = parseInt(event.target.outcome.value);
        const tanggal = parseInt(event.target.tanggal.value);
        const bulan = parseInt(event.target.bulan.value);
        const tahun = parseInt(event.target.tahun.value);

        fetch(`/api/updateData`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idEdit,
                nama_transaksi: nama_transaksi,
                income: income,
                outcome: outcome,
                tanggal: tanggal,
                bulan: bulan,
                tahun: tahun,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                router.push(`/`);
            })
            .catch((err) => {
                console.error("Error updating data:", err);
                alert("Error: " + err.message);
            });
    };

    return (
        <div>
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail && (
                <div className="w-10/12 m-auto mt-10 rounded-lg border-2 border-blue-500 shadow-xl shadow-slate-400">
                    <h1 className="font-bold text-xl text-center p-2 pt-5">Edit Data Transaksi</h1>
                    <form onSubmit={handleSubmit} className="border-slate-500 border-2 text-black font-semibold items-center py-2 px-3 rounded-md mx-5 my-4 shadow-md shadow-blue-400">
                        <div className="flex justify-between my-2 items-center">
                            <label>Nama Transaksi:</label>
                            <input
                                className="border-2 border-black rounded-md pl-2 w-[80%]"
                                name="nama_transaksi"
                                defaultValue={dataDetail.nama_transaksi}
                            />
                        </div>
                        <div className="flex justify-between my-2 items-center">
                            <label>Income:</label>
                            <input
                                className="border-2 border-black rounded-md pl-2 w-[80%]"
                                name="income"
                                type="number"
                                defaultValue={dataDetail.income}
                            />
                        </div>
                        <div className="flex justify-between my-2 items-center">
                            <label>Outcome:</label>
                            <input
                                className="border-2 border-black rounded-md pl-2 w-[80%]"
                                name="outcome"
                                type="number"
                                defaultValue={dataDetail.outcome}
                            />
                        </div>
                        <div className="flex justify-between my-2 items-center">
                            <label>Tanggal:</label>
                            <input
                                className="border-2 border-black rounded-md pl-2 w-[80%]"
                                name="tanggal"
                                type="number"
                                defaultValue={dataDetail.tanggal}
                            />
                        </div>
                        <div className="flex justify-between my-2 items-center">
                            <label>Bulan:</label>
                            <input
                                className="border-2 border-black rounded-md pl-2 w-[80%]"
                                name="bulan"
                                type="number"
                                defaultValue={dataDetail.bulan}
                            />
                        </div>
                        <div className="flex justify-between my-2 items-center">
                            <label>Tahun:</label>
                            <input
                                className="border-2 border-black rounded-md pl-2 w-[80%]"
                                name="tahun"
                                type="number"
                                defaultValue={dataDetail.tahun}
                            />
                        </div>
                        <div className="flex m-auto justify-center gap-5">
                            <button type="submit" className="bg-orange-500 text-white py-2 px-3 rounded-md shadow-md shadow-blue-400">Update Data</button>
                            <button
                                className="bg-red-500 text-white py-2 px-3 rounded-md shadow-md shadow-blue-400"
                                onClick={() => {
                                    router.push(`/`);
                                }}>
                                Kembali
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

