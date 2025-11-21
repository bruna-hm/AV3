import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, TextInput } from "flowbite-react";

const StatusPeca = Object.freeze({
    EM_PRODUCAO: "EM_PRODUCAO",
    EM_TRANSPORTE: "EM_TRANSPORTE",
    PRONTA: "PRONTA",
});

const TipoPeca = Object.freeze({
    NACIONAL: "NACIONAL",
    IMPORTADA: "IMPORTADA",
});

export default function AdicionarPeca() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState(TipoPeca.NACIONAL);
    const [fornecedor, setFornecedor] = useState("");
    const [status, setStatus] = useState(StatusPeca.EM_PRODUCAO);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/pecas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    tipo,
                    fornecedor,
                    status,
                    aeronaveId: Number(id),
                }),
            });

            if (!res.ok) throw new Error("Erro ao criar peça");
            await res.json();
            navigate(`/aeronaves/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h3 className="text-2xl font-bold mb-4">Adicionar Peça à Aeronave {id}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 w-80">
                <div>
                    <label className="block font-semibold">Nome da Peça</label>
                    <TextInput
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Tipo</label>
                    <Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    >
                        <option value={TipoPeca.NACIONAL}>Nacional</option>
                        <option value={TipoPeca.IMPORTADA}>Importada</option>
                    </Select>
                </div>

                <div>
                    <label className="block font-semibold">Fornecedor</label>
                    <TextInput
                        type="text"
                        value={fornecedor}
                        onChange={(e) => setFornecedor(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Status</label>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    >
                        <option value={StatusPeca.EM_PRODUCAO}>Em Produção</option>
                        <option value={StatusPeca.EM_TRANSPORTE}>Em Transporte</option>
                        <option value={StatusPeca.PRONTA}>Pronta</option>
                    </Select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Salvar Peça
                </button>
            </form>
        </div>
    );
}

export function AtualizarStatusPeca() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pecas, setPecas] = useState([]);

    useEffect(() => {
        carregarPecas();
    }, [id]);

    async function carregarPecas() {
        try {
            const res = await fetch(`http://localhost:3000/api/pecas?aeronaveId=${id}`);
            const data = await res.json();
            const pecasComStatus = data.map(p => ({ ...p, novoStatus: p.status }));
            setPecas(pecasComStatus);
        } catch (error) {
            console.error("Erro ao carregar peças:", error);
        }
    }

    async function salvarStatus(pecaId, novoStatus) {
        try {
            const res = await fetch(`http://localhost:3000/api/pecas/${pecaId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: novoStatus }),
            });
            if (!res.ok) throw new Error("Erro ao atualizar status");
            await res.json();
            navigate(`/aeronaves/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Atualizar Status das Peças</h2>

            {pecas.length === 0 ? (
                <p>Nenhuma peça cadastrada para esta aeronave.</p>
            ) : (
                <ul className="space-y-4 w-full max-w-md">
                    {pecas.map((peca, index) => (
                        <li key={peca.id} className="p-4 rounded text-white">
                            <div className="font-semibold">{peca.nome}</div>

                            <Select
                                value={peca.novoStatus}
                                onChange={(e) => {
                                    const updated = [...pecas];
                                    updated[index].novoStatus = e.target.value;
                                    setPecas(updated);
                                }}
                                className="mt-2 p-2 rounded w-full"
                            >
                                <option value={StatusPeca.EM_PRODUCAO}>Em Produção</option>
                                <option value={StatusPeca.EM_TRANSPORTE}>Em Transporte</option>
                                <option value={StatusPeca.PRONTA}>Pronta</option>
                            </Select>

                            <button
                                className="mt-2 w-full bg-green-600 py-1 rounded hover:bg-green-700"
                                onClick={(e) => {
                                    e.preventDefault();
                                    salvarStatus(peca.id, peca.novoStatus);
                                }}
                            >
                                Salvar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function RemoverPeca() {
    const { id } = useParams();
    const [pecas, setPecas] = useState([]);

    useEffect(() => {
        carregarPecas();
    }, [id]);

    async function carregarPecas() {
        try {
            const res = await fetch(`http://localhost:3000/api/pecas?aeronaveId=${id}`);
            const data = await res.json();
            setPecas(data);
        } catch (error) {
            console.error("Erro ao carregar peças:", error);
        }
    }

    async function excluirPeca(pecaId) {
        const confirmar = window.confirm("Tem certeza que deseja excluir esta peça?");
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3000/api/pecas/${pecaId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Erro ao excluir peça");

            carregarPecas();
        } catch (error) {
            console.error("Erro ao excluir a peça:", error);
        }
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Remover Peças da Aeronave {id}</h2>

            {pecas.length === 0 ? (
                <p>Nenhuma peça cadastrada para esta aeronave.</p>
            ) : (
                <ul className="space-y-4 w-full max-w-md">
                    {pecas.map((peca) => (
                        <li key={peca.id} className="p-4 rounded text-black">
                            <div className="font-semibold">{peca.nome}</div>
                            <p className="text-sm">Tipo: {peca.tipo}</p>
                            <p className="text-sm">Fornecedor: {peca.fornecedor}</p>
                            <p className="text-sm">Status: {peca.status}</p>

                            <button
                                className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
                                onClick={() => excluirPeca(peca.id)}
                            >
                                Excluir Peça
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}