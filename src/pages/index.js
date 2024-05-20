import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Header = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

const AddButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    border-radius: 5px;
`;

const NoteCard = styled.div`
    background-color: #f8f9fa;
    padding: 20px;
    margin: 10px 0;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    position: relative;
`;

const NoteTitle = styled.h2`
    font-size: 20px;
    color: #343a40;
`;

const DetailButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    border-radius: 5px;
    margin-right: 10px;
`;

const EditButton = styled.button`
    background-color: #ffc107;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    border-radius: 5px;
    margin-right: 10px;
`;

const DeleteButton = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    border-radius: 5px;
`;

export default function Home() {
    const router = useRouter();
    const [showAllData, setShowAllData] = useState();

    useEffect(() => {
        fetch(`/api/getData`)
            .then((res) => res.json())
            .then((data) => {
                setShowAllData(data.data);
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
        <Container>
            <Header>Halaman Depan</Header>
            <AddButton onClick={() => router.push(`/add-data`)}>
                Tambah Data
            </AddButton>
            <div>
                {showAllData &&
                    showAllData.map((data, index) => {
                        return (
                            <NoteCard key={index}>
                                <NoteTitle>{data.title}</NoteTitle>
                                <p>{data.id}</p>
                                <DetailButton
                                    onClick={() =>
                                        router.push(`/detail/${data.id}`)
                                    }>
                                    Detail
                                </DetailButton>
                                <EditButton onClick={() => handleEdit(data.id)}>
                                    Edit
                                </EditButton>
                                <DeleteButton
                                    onClick={() => handleDelete(data.id)}>
                                    Delete
                                </DeleteButton>
                            </NoteCard>
                        );
                    })}
            </div>
        </Container>
    );
}
