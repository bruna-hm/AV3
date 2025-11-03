import { TextInput, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StatusEtapa = {
    PENDENTE: "PENDENTE",
    ANDAMENTO: "ANDAMENTO",
    CONCLUÍDA: "CONCLUIDA"
};
Object.freeze(StatusEtapa);

export default function AdicionarEtapa() {
    const { codigo } = useParams();
    const navigate = useNavigate();

    const [Nome, setNome] = useState("");
    const [status, setStatus] = useState("");
    const [prazo, setPrazo] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const novaEtapa = {
            Nome,
            status,
            prazo,
            funcionarios: [],
            aeronaveCodigo: codigo
        };

        const todasEtapas = JSON.parse(localStorage.getItem("etapas")) || [];
        todasEtapas.push(novaEtapa);
        localStorage.setItem("etapas", JSON.stringify(todasEtapas));

        navigate(`/aeronaves/${codigo}`);
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h3 className="text-2xl font-bold mb-4">Adicionar Etapa à Aeronave {codigo}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 w-80">
                <div>
                    <label className="block font-semibold">Nome da Etapa</label>
                    <TextInput
                        type="text"
                        value={Nome}
                        onChange={e => setNome(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Status</label>
                    <Select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    >
                        <option value="">Selecione o status</option>
                        <option value={StatusEtapa.PENDENTE}>PENDENTE</option>
                        <option value={StatusEtapa.ANDAMENTO}>ANDAMENTO</option>
                        <option value={StatusEtapa.CONCLUIDA}>CONCLUÍDA</option>
                    </Select>
                </div>

                <div>
                    <label className="block font-semibold">Prazo</label>
                    <TextInput
                        type="date"
                        value={prazo}
                        onChange={e => setPrazo(e.target.value)}
                        className="w-full p-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Salvar Etapa
                </button>
            </form>
        </div>
    );
}

export function AssociarFuncionariosEtapa() {
    const [etapas, setEtapas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [etapaSelecionadaIndex, setEtapaSelecionadaIndex] = useState(null);
    const [funcionariosSelecionados, setFuncionariosSelecionados] = useState([]);

    useEffect(() => {
        const listaEtapas = JSON.parse(localStorage.getItem("etapas")) || [];
        setEtapas(listaEtapas);

        const listaFuncionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
        setFuncionarios(listaFuncionarios);
    }, []);

    function handleEtapaChange(e) {
        const index = Number(e.target.value);
        setEtapaSelecionadaIndex(index);

        const etapa = etapas[index];
        setFuncionariosSelecionados(etapa ? etapa.funcionarios || [] : []);
    }

    function handleFuncionarioChange(e) {
        const { value, checked } = e.target;
        const func = funcionarios.find(f => f.Nome === value);

        if (checked) {
            setFuncionariosSelecionados(prev => [...prev, func]);
        } else {
            setFuncionariosSelecionados(prev => prev.filter(f => f.Nome !== value));
        }
    }

    function handleSalvar() {
        if (etapaSelecionadaIndex === null) return;

        const etapasAtualizadas = [...etapas];
        etapasAtualizadas[etapaSelecionadaIndex].funcionarios = funcionariosSelecionados;

        localStorage.setItem("etapas", JSON.stringify(etapasAtualizadas));
        alert("Funcionários associados à etapa com sucesso!");
    }

    return (
        <div className="flex flex-col items-center p-6 space-y-4">
            <h2 className="text-2xl font-bold">Associar Funcionários à Etapa</h2>

            <div className="w-80">
                <label className="block font-semibold mb-2">Selecione a Etapa</label>
                <Select
                    value={etapaSelecionadaIndex ?? ""}
                    onChange={handleEtapaChange}
                    className="w-full p-2 rounded "
                >
                    <option className="text-white" value="">Selecione uma etapa</option>
                    {etapas.map((et, idx) => (
                        <option key={idx} value={idx}>
                            {et.aeronaveCodigo} - {et.nome}
                        </option>
                    ))}
                </Select>
            </div>

            {etapaSelecionadaIndex !== null && (
                <div className="w-80 p-2 rounded max-h-64 overflow-y-auto">
                    <label className="block font-semibold mb-2">Selecione os Funcionários</label>
                    {funcionarios.map(f => (
                        <label key={f.Nome} className="flex items-center mb-1">
                            <TextInput
                                type="checkbox"
                                value={f.Nome}
                                checked={funcionariosSelecionados.some(sel => sel.Nome === f.Nome)}
                                onChange={handleFuncionarioChange}
                                className="mr-2"
                            />
                            {f.Nome}
                        </label>
                    ))}
                </div>
            )}

            <button
                onClick={handleSalvar}
                className="w-80 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={etapaSelecionadaIndex === null}
            >
                Salvar Associação
            </button>
        </div>
    );
}