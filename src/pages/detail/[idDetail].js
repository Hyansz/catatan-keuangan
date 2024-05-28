import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Detail() {
    const router = useRouter();
    const { idDetail } = router.query;
    const [showData, setShowData] = useState();

    useEffect(() => {
        if (!idDetail) return;
        fetch(`/api/getDataDetail?id=${idDetail}`)
            .then((res) => res.json())
            .then((data) => {
                setShowData(data.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [idDetail]);

    return (
        <div className="w-10/12 m-auto mt-10 rounded-lg border-2 border-blue-500 shadow-xl shadow-slate-400">
            <h1 className="font-bold text-xl text-center p-2 pt-5">Detail Data</h1>
            <div className="px-10 py-5">
                {showData ? (
                    <div className="border-slate-500 border-2 text-black font-semibold items-center py-2 px-3 rounded-md flex justify-between mx-auto my-4 shadow-md shadow-blue-400">
                        <div>
                            <strong>Id:</strong> {idDetail}
                        </div>
                        <div>
                            <strong>Nama Transaksi:</strong>{" "}
                            {showData.nama_transaksi}
                        </div>
                        <div>
                            <strong>Income:</strong> {showData.income}
                        </div>
                        <div>
                            <strong>Outcome:</strong> {showData.outcome}
                        </div>
                        <div>
                            <strong>Tanggal:</strong> {showData.tanggal}
                        </div>
                        <div>
                            <strong>Bulan:</strong> {showData.bulan}
                        </div>
                        <div>
                            <strong>Tahun:</strong> {showData.tahun}
                        </div>
                        <div>
                            <strong>Created At:</strong> {showData.created_at}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <button onClick={() => router.push("/")} className="bg-blue-500 text-white py-2 px-3 rounded-md shadow-md shadow-blue-400 flex m-auto mb-8">
                Kembali ke Halaman Depan
            </button>
        </div>
    );
}
