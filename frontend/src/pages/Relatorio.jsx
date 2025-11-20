import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Relatorio() {
    const { id } = useParams();
    const [relatorio, setRelatorio] = useState("");
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregarRelatorio() {
            try {
                setLoading(true);
                setErro(null);

                const res = await fetch(`http://localhost:3000/api/relatorios/${id}`);
                if (!res.ok) throw new Error("Erro ao buscar relatório");

                const texto = await res.text();
                setRelatorio(texto || "Relatório vazio.");
            } catch (err) {
                console.error(err);
                setErro(err.message);
            } finally {
                setLoading(false);
            }
        }

        carregarRelatorio();
    }, [id]);

    const handleSalvar = () => {
        if (!relatorio) return;

        const blob = new Blob([relatorio], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio_${id}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    if (loading) return <p className="text-center p-6">Carregando relatório...</p>;
    if (erro) return <p className="text-center p-6 text-red-600">{erro}</p>;

    return (
        <div className="p-6 flex flex-col items-center space-y-4 mx-auto max-w-4xl">
            <div className="bg-gray-800 text-white p-4 rounded shadow overflow-auto">
                <pre className="whitespace-pre-wrap">{relatorio}</pre>
            </div>

            <button
                onClick={handleSalvar}
                className="w-80 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Salvar como TXT
            </button>
        </div>
    );
}
