import { useRouter } from "next/router";
import { useState } from "react";
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

export default function AddData() {
    const [namaTransaksi, setNamaTransaksi] = useState("");
    const [income, setIncome] = useState("");
    const [outcome, setOutcome] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [bulan, setBulan] = useState("");
    const [tahun, setTahun] = useState("");
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            nama_transaksi: namaTransaksi,
            income: parseInt(income),
            outcome: parseInt(outcome),
            tanggal: parseInt(tanggal),
            bulan: parseInt(bulan),
            tahun: parseInt(tahun),
        };

        fetch(`/api/insertData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(
                            errorData.message || "Gagal menambah data"
                        );
                    });
                }
                return response.json();
            })
            .then((json) => {
                alert("Data berhasil ditambah");
                router.push("/");
            })
            .catch((err) => {
                console.error("Error saat menambah data:", err.message);
                alert("Error: " + err.message);
            });
    };

    return (
        <Container>
            <Header>Tambah Data Transaksi</Header>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nama Transaksi:</Label>
                    <Input
                        type="text"
                        value={namaTransaksi}
                        onChange={(e) => setNamaTransaksi(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Income:</Label>
                    <Input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Outcome:</Label>
                    <Input
                        type="number"
                        value={outcome}
                        onChange={(e) => setOutcome(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Tanggal:</Label>
                    <Input
                        type="number"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Bulan:</Label>
                    <Input
                        type="number"
                        value={bulan}
                        onChange={(e) => setBulan(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Tahun:</Label>
                    <Input
                        type="number"
                        value={tahun}
                        onChange={(e) => setTahun(e.target.value)}
                    />
                </FormGroup>
                <SubmitButton type="submit">Tambah Data</SubmitButton>
            </Form>
        </Container>
    );
}
