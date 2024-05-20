import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Header = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
    color: #495057;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
`;

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
        <Container>
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail && (
                <div>
                    <Header>Edit Data Transaksi</Header>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Nama Transaksi:</Label>
                            <Input
                                name="nama_transaksi"
                                defaultValue={dataDetail.nama_transaksi}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Income:</Label>
                            <Input
                                name="income"
                                type="number"
                                defaultValue={dataDetail.income}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Outcome:</Label>
                            <Input
                                name="outcome"
                                type="number"
                                defaultValue={dataDetail.outcome}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tanggal:</Label>
                            <Input
                                name="tanggal"
                                type="number"
                                defaultValue={dataDetail.tanggal}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Bulan:</Label>
                            <Input
                                name="bulan"
                                type="number"
                                defaultValue={dataDetail.bulan}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tahun:</Label>
                            <Input
                                name="tahun"
                                type="number"
                                defaultValue={dataDetail.tahun}
                            />
                        </FormGroup>
                        <SubmitButton type="submit">Update Data</SubmitButton>
                        <button
                            onClick={() => {
                                router.push(`/`);
                            }}>
                            Kembali
                        </button>
                    </Form>
                </div>
            )}
        </Container>
    );
}

