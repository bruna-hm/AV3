import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import gerarRelatorio from "../utils/gerarRelatorio";

export default function Relatorio() {
    const { codigo } = useParams();
    const [relatorio, setRelatorio] = useState("");

    useEffect(() => {
        const texto = gerarRelatorio(codigo);
        setRelatorio(texto);
    }, [codigo]);

    const handleSalvar = () => {
        const blob = new Blob([relatorio], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio_${codigo}.txt`;
        link.click();
    };

    return (
        <div className="p-6 flex flex-col items-center space-y-4 mx-auto max-w-4xl">

            <div className="w-full bg-gray-800 text-white p-4 rounded shadow max-h-[600px] overflow-auto">
                <pre className="whitespace-pre-wrap">{relatorio}</pre>
            </div>

            <button
                onClick={handleSalvar}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Salvar como TXT
            </button>
        </div>
    );
}