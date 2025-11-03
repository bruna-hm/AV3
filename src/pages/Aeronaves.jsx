import { useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Select, TextInput } from "flowbite-react"

const TipoAeronave = {
    COMERCIAL: "COMERCIAL",
    MILITAR: "MILITAR",
};
Object.freeze(TipoAeronave);


export default function Aeronaves() {
    const [aeronaves, setAeronaves] = useState([]);

    useEffect(() => {
        const armazenadas = JSON.parse(localStorage.getItem("aeronaves")) || [];
        setAeronaves(armazenadas);
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-start p-6">
            <h3 className="text-3xl font-bold mb-4">Aeronaves Cadastradas</h3>

            {aeronaves.length === 0 ? (
                <p className="text-gray-500">Nenhuma aeronave cadastrada.</p>
            ) : (
                <ul className="space-y-3">
                    {aeronaves.map((a, index) => (
                        <li
                            key={index}
                            className="p-4 rounded w-80 shadow-md bg-gray-700 !text-white transition"
                        >
                            <Link
                                to={`/aeronaves/${a.codigo}`}
                                style={{ color: "white" }}
                                className="text-xl font-semibold hover:underline !text-white"
                            >
                                {a.codigo} - {a.modelo}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function DetalheAeronave() {
    const { id: codigo } = useParams();

    const [aeronave, setAeronave] = useState(null);
    const [pecas, setPecas] = useState([]);
    const [etapas, setEtapas] = useState([]);
    const [testes, setTestes] = useState([]);

    function carregarDados() {
        const aeronavesArmazenadas = JSON.parse(localStorage.getItem("aeronaves")) || [];
        const a = aeronavesArmazenadas.find(a => a.codigo === codigo);
        setAeronave(a);

        const pecasArmazenadas = (JSON.parse(localStorage.getItem("pecas")) || []).filter(p => String(p.aeronaveId) === String(codigo));
        setPecas(pecasArmazenadas);

        const etapasArmazenadas = (JSON.parse(localStorage.getItem("etapas")) || []).filter(e => e.aeronaveCodigo === codigo);
        setEtapas(etapasArmazenadas);

        const testesArmazenados = (JSON.parse(localStorage.getItem("testes")) || []).filter(t => t.aeronaveId === codigo);
        setTestes(testesArmazenados);
    }

    useEffect(() => {
        carregarDados();

        window.addEventListener("storage", carregarDados);
        return () => window.removeEventListener("storage", carregarDados);
    }, [codigo]);

    if (!aeronave) {
        return <p className="text-center text-red-600">Aeronave não encontrada.</p>;
    }

    return (
        <div className="flex flex-col items-center p-6 space-y-6">
            <div className="border p-4 rounded w-96 bg-gray-800 text-white shadow">
                <h2 className="text-2xl font-bold mb-2">{aeronave.codigo} - {aeronave.modelo}</h2>
                <hr className="mb-3"></hr>
                <p><strong>Tipo:</strong> {aeronave.tipo}</p>
                <p><strong>Capacidade:</strong> {aeronave.capacidade} Kgs</p>
                <p><strong>Alcance:</strong> {aeronave.alcance} Kms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                <div className="border p-4 rounded bg-gray-700 text-white shadow">
                    <h3 className="text-xl font-semibold mb-2">Peças</h3><hr className="mb-3"></hr>
                    {pecas.length === 0 ? (
                        <p>Nenhuma peça cadastrada.</p>
                    ) : (
                        <ul className="list-disc list-inside">
                            {pecas.map(p => <li key={p.id}>{p.nome} - {p.tipo} - {p.status}</li>)}
                        </ul>
                    )}
                </div>

                <div className="border p-4 rounded bg-gray-700 text-white shadow">
                    <h3 className="text-xl font-semibold mb-2">Etapas</h3><hr className="mb-3"></hr>
                    {etapas.length === 0 ? (
                        <p>Nenhuma etapa cadastrada.</p>
                    ) : (
                        etapas.map(e => (
                            <div key={e.id} className="mb-2 border-gray-500 pb-2">
                                <p className="text-lg"><strong>{e.nome}</strong></p>
                                <p><em>Staus:</em> {e.status}</p>
                                <p><em>Prazo:</em> {e.prazo}</p>
                                <p><em>Funcionários:</em></p>
                                <ul className="list-disc list-inside ml-4">
                                    {e.funcionarios?.length > 0
                                        ? e.funcionarios.map(f => <li key={f.id}>{f.id} - {f.Nome}</li>)
                                        : <li>Nenhum funcionário associado</li>
                                    }
                                </ul>
                            </div>
                        ))
                    )}
                </div>

                <div className="border p-4 rounded bg-gray-700 text-white shadow">
                    <h3 className="text-xl font-semibold mb-2">Testes</h3><hr className="mb-3"></hr>
                    {testes.length === 0 ? (
                        <p>Nenhum teste cadastrado.</p>
                    ) : (
                        <ul className="list-disc list-inside">
                            {testes.map(t => <li key={t.id}>{t.tipo} - {t.resultado}</li>)}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export function AdicionarAeronave() {
    const [codigo, setCodigo] = useState("");
    const [modelo, setModelo] = useState("");
    const [tipo, setTipo] = useState(TipoAeronave.COMERCIAL);
    const [capacidade, setCapacidade] = useState("");
    const [alcance, setAlcance] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const novaAeronave = { codigo, modelo, tipo, capacidade, alcance };

        const armazenadas = JSON.parse(localStorage.getItem("aeronaves")) || [];
        armazenadas.push(novaAeronave);
        localStorage.setItem("aeronaves", JSON.stringify(armazenadas));

        navigate("/aeronaves");
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h3 className="text-3xl font-bold mb-6">Cadastrar Aeronave</h3>

            <form onSubmit={handleSubmit} className="space-y-4 w-80">

                <div>
                    <label className="block font-semibold">Código:</label>
                    <TextInput
                        type="text"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Modelo:</label>
                    <TextInput
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Tipo:</label>
                    <Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    >
                        <option value={TipoAeronave.COMERCIAL}>COMERCIAL</option>
                        <option value={TipoAeronave.MILITAR}>MILITAR</option>
                    </Select>
                </div>

                <div>
                    <label className="block font-semibold">Capacidade:</label>
                    <TextInput
                        type="text"
                        value={capacidade}
                        onChange={(e) => setCapacidade(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Alcance:</label>
                    <TextInput
                        type="text"
                        value={alcance}
                        onChange={(e) => setAlcance(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
                >
                    Salvar Aeronave
                </button>
            </form>
        </div>
    );
}