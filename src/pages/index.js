import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const [showAllTransaksi, setShowAllTransaksi] = useState();

    useEffect(() => {
        fetch(`/api/getData`)
            .then((res) => res.json())
            .then((data) => {
                setShowAllTransaksi(data.data);
                console.log(data.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    const handleEdit = (id) => {
        router.push(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            fetch(`/api/delData?id=${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    router.reload();
                })
                .catch((err) => {
                    console.error("Error deleting data:", err);
                });
        }
    };

    return (
        <div className="w-10/12 m-auto mt-10 rounded-lg border-2 border-blue-500 shadow-xl shadow-slate-400">
            <h1 className="font-bold text-xl text-center p-2 pt-5">Halaman Depan</h1>
            <button className="bg-green-500 text-white py-2 px-3 rounded-md flex mx-auto mt-4 shadow-lg shadow-green-300" onClick={() => router.push(`/add-data`)}>
                Tambah Data
            </button>
            <div className="px-10 py-5">
                {showAllTransaksi &&
                    showAllTransaksi.map((transaksi, index) => {
                        return (
                            <div key={index} className="border-slate-500 border-2 text-black font-semibold items-center py-2 px-3 rounded-md flex justify-between mx-auto my-4 shadow-md shadow-blue-400">
                                <div>
                                    <p>{transaksi.nama_transaksi} In: {transaksi.income} Out: {transaksi.outcome} {transaksi.tanggal}/{transaksi.bulan}/{transaksi.tahun}</p>
                                </div>
                                <div className="flex gap-6">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-3 rounded-md shadow-md shadow-blue-400"
                                        onClick={() =>
                                            router.push(`/detail/${transaksi.id}`)
                                        }>
                                        Detail
                                    </button>
                                    <button className="bg-orange-500 text-white py-2 px-3 rounded-md shadow-md shadow-orange-400" onClick={() => handleEdit(transaksi.id)}>
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-2 px-3 rounded-md shadow-md shadow-red-400"
                                        onClick={() => handleDelete(transaksi.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
