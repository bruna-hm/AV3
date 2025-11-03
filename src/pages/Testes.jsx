import { Select } from "flowbite-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TipoTeste = {
    HIDRAULICO: "HIDRAULICO",
    ELETRICO: "ELETRICO",
    AERODINAMICO: "AERODINAMICO",
};
Object.freeze(TipoTeste);

const ResultadoTeste = {
    APROVADO: "APROVADO",
    REPROVADO: "REPROVADO",
};
Object.freeze(ResultadoTeste);

export default function AdicionarTeste() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tipo, setTipo] = useState(TipoTeste.HIDRAULICO);
    const [resultado, setResultado] = useState(ResultadoTeste.APROVADO);

    function handleSubmit(e) {
        e.preventDefault();

        const ultimoId = JSON.parse(localStorage.getItem("testesUltimoId")) || 0;
        const novoId = ultimoId + 1;

        const novoTeste = {
            id: novoId,
            tipo,
            resultado,
            aeronaveId: String(id)
        };

        const todos = JSON.parse(localStorage.getItem("testes")) || [];
        todos.push(novoTeste);
        localStorage.setItem("testes", JSON.stringify(todos));

        navigate(`/aeronaves/${id}`);
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
                        {Object.values(TipoTeste).map(t => (
                            <option key={t} value={t}>{t}</option>
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
                        {Object.values(ResultadoTeste).map(r => (
                            <option key={r} value={r}>{r}</option>
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
