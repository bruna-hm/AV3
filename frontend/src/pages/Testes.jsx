import { Select } from "flowbite-react";
import { useState } from "react";
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