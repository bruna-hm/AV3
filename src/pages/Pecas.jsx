import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, TextInput } from "flowbite-react";

const StatusPeca = {
    EM_PRODUCAO: "EM_PRODUCAO",
    EM_TRANSPORTE: "EM_TRANSPORTE",
    PRONTA: "PRONTA"
};
Object.freeze(StatusPeca);

const TipoPeca = {
    NACIONAL: "NACIONAL",
    IMPORTADA: "IMPORTADA",
};
Object.freeze(StatusPeca);

export default function AdicionarPeca() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState(TipoPeca.NACIONAL);
    const [fornecedor, setFornecedor] = useState("");
    const [status, setStatus] = useState(StatusPeca.EM_PRODUCAO);
    const [codigoAeronave, setCodigoAeronave] = useState("");

    useEffect(() => {
        const aeronaves = JSON.parse(localStorage.getItem("aeronaves")) || [];
        const aeronave = aeronaves.find(a => String(a.id) === String(id));
        if (aeronave) {
            setCodigoAeronave(aeronave.codigo);
        }
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        const ultimoId = JSON.parse(localStorage.getItem("pecasUltimoId")) || 0;
        const novoId = ultimoId + 1;

        const novaPeca = {
            id: novoId,
            nome,
            tipo,
            fornecedor,
            status,
            aeronaveId: String(id)
        };

        const todasPecas = JSON.parse(localStorage.getItem("pecas")) || [];
        todasPecas.push(novaPeca);

        localStorage.setItem("pecas", JSON.stringify(todasPecas));
        localStorage.setItem("pecasUltimoId", JSON.stringify(novoId));

        navigate(`/aeronaves/${id}/pecas`);
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h3 className="text-2xl font-bold mb-4">
                Adicionar Peça à Aeronave {id}
            </h3>

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
                        <option value={TipoPeca.NACIONAL}>NACIONAL</option>
                        <option value={TipoPeca.IMPORTADA}>IMPROTADA</option>
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
                        <option value={StatusPeca.EM_PRODUCAO}>EM PRODUÇÃO</option>
                        <option value={StatusPeca.EM_TRANSPORTE}>EM TRANSPORTE</option>
                        <option value={StatusPeca.PRONTA}>PRONTA</option>
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
    const [pecas, setPecas] = useState([]);

    useEffect(() => {
        const todas = JSON.parse(localStorage.getItem("pecas")) || [];
        setPecas(todas.filter(p => String(p.aeronaveId) === String(id)));
    }, [id]);

    function atualizarStatus(pecaId, novoStatus) {
        const todas = JSON.parse(localStorage.getItem("pecas")) || [];

        const atualizadas = todas.map(p =>
            p.id === pecaId ? { ...p, status: novoStatus } : p
        );

        localStorage.setItem("pecas", JSON.stringify(atualizadas));
        setPecas(atualizadas.filter(p => String(p.aeronaveId) === String(id)));
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Atualizar Status das Peças</h2>

            {pecas.length === 0 ? (
                <p>Nenhuma peça cadastrada para esta aeronave.</p>
            ) : (
                <ul className="space-y-4 w-full max-w-md">
                    {pecas.map(peca => (
                        <li key={peca.id} className="p-4 rounded bg-gray-800">
                            <div className="font-semibold">{peca.nome}</div>

                            <Select
                                value={peca.status}
                                onChange={(e) => atualizarStatus(peca.id, e.target.value)}
                                className="mt-2 p-2 border rounded w-full"
                            >
                                <option value="EM_PRODUCAO">Em Produção</option>
                                <option value="EM_TRANSPORTE">Em Transporte</option>
                                <option value="PRONTA">Pronta</option>
                            </Select>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}