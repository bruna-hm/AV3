import { Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TipoTeste = Object.freeze({
    HIDRAULICO: "HIDRAULICO",
    ELETRICO: "ELETRICO",
    AERODINAMICO: "AERODINAMICO",
});

const ResultadoTeste = Object.freeze({
    APROVADO: "APROVADO",
    REPROVADO: "REPROVADO",
});

export default function AdicionarTeste() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tipo, setTipo] = useState(TipoTeste.HIDRAULICO);
    const [resultado, setResultado] = useState(ResultadoTeste.APROVADO);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/testes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tipo,
                    resultado,
                    aeronaveId: Number(id),
                }),
            });

            if (!res.ok) throw new Error("Erro ao criar teste");
            await res.json();
            navigate(`/aeronaves/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h3 className="text-2xl font-bold mb-4">Adicionar Teste à Aeronave {id}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 w-80">
                <div>
                    <label className="block font-semibold">Tipo do Teste:</label>
                    <Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    >
                        {Object.values(TipoTeste).map((t) => (
                            <option key={t} value={t}>
                                {t.charAt(0) + t.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <label className="block font-semibold">Resultado:</label>
                    <Select
                        value={resultado}
                        onChange={(e) => setResultado(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    >
                        {Object.values(ResultadoTeste).map((r) => (
                            <option key={r} value={r}>
                                {r.charAt(0) + r.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </Select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Salvar Teste
                </button>
            </form>
        </div>
    );
}

export function RemoverTeste() {
    const { id } = useParams();

    const [testes, setTestes] = useState([]);

    useEffect(() => {
        carregarTestes();
    }, [id]);

    async function carregarTestes() {
        try {
            const res = await fetch(`http://localhost:3000/api/testes?aeronaveId=${id}`);
            if (!res.ok) throw new Error("Erro ao carregar testes");
            const dados = await res.json();
            setTestes(dados);
        } catch (error) {
            console.error("Erro ao carregar testes:", error);
        }
    }

    async function excluirTeste(testeId) {
        const confirmar = window.confirm("Tem certeza que deseja excluir este teste?");
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3000/api/testes/${testeId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Erro ao excluir teste");
            carregarTestes();
        } catch (error) {
            console.error("Erro ao excluir teste:", error);
        }
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Remover Testes da Aeronave {id}</h2>

            {testes.length === 0 ? (
                <p>Nenhum teste cadastrado para esta aeronave.</p>
            ) : (
                <ul className="space-y-4 w-full max-w-md">
                    {testes.map((teste) => (
                        <li key={teste.id} className="p-4 text-black rounded">
                            <div className="font-semibold text-lg">{teste.tipo}</div>
                            <p>Resultado: {teste.resultado}</p>
                            <button
                                onClick={() => excluirTeste(teste.id)}
                                className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
                            >
                                Excluir Teste
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}