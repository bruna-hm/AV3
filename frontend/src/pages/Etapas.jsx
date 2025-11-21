import { TextInput, Select, Checkbox } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StatusEtapa = Object.freeze({
    PENDENTE: "PENDENTE",
    ANDAMENTO: "ANDAMENTO",
    CONCLUIDA: "CONCLUIDA",
});

export default function AdicionarEtapa() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [status, setStatus] = useState(StatusEtapa.PENDENTE);
    const [prazo, setPrazo] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/api/etapas/aeronave/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome,
                status,
                prazo,
            }),
        });

        if (!res.ok) {
            console.error("Erro ao criar etapa");
            return;
        }

        navigate(`/aeronaves/${id}`);
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h3 className="text-2xl font-bold mb-4">Adicionar Etapa à Aeronave {id}</h3>
            <form onSubmit={handleSubmit} className="space-y-4 w-80">
                <div>
                    <label className="block font-semibold">Nome da Etapa</label>
                    <TextInput
                        type="text"
                        value={nome}
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
                        {Object.values(StatusEtapa).map(s => (
                            <option key={s} value={s}>
                                {s.charAt(0) + s.slice(1).toLowerCase()}
                            </option>
                        ))}
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
    const [etapaSelecionadaId, setEtapaSelecionadaId] = useState(null);
    const [todosFuncionarios, setTodosFuncionarios] = useState([]);
    const [funcionariosSelecionados, setFuncionariosSelecionados] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function carregarEtapas() {
            try {
                const res = await fetch(`http://localhost:3000/api/etapas/aeronave/${id}`);
                const dados = await res.json();
                setEtapas(dados);
            } catch (error) {
                console.error(error);
            }
        }
        carregarEtapas();
    }, [id]);

    useEffect(() => {
        async function carregarFuncionarios() {
            try {
                const res = await fetch("http://localhost:3000/api/funcionarios");
                const dados = await res.json();
                setTodosFuncionarios(dados);
            } catch (error) {
                console.error(error);
            }
        }
        carregarFuncionarios();
    }, []);

    function handleEtapaChange(e) {
        const id = Number(e.target.value);
        setEtapaSelecionadaId(id);
        const etapa = etapas.find(et => et.id === id);
        const idsSelecionados = etapa?.funcionarios?.map(f => f.id) || [];
        setFuncionariosSelecionados(idsSelecionados);
    }

    function handleFuncionarioChange(e) {
        const id = Number(e.target.value);
        if (e.target.checked) {
            setFuncionariosSelecionados(prev => [...prev, id]);
        } else {
            setFuncionariosSelecionados(prev => prev.filter(fid => fid !== id));
        }
    }

    async function handleSalvar() {
        if (!etapaSelecionadaId) return;

        try {
            const funcionariosParaEnviar = todosFuncionarios.filter(f =>
                funcionariosSelecionados.includes(f.id)
            );

            const res = await fetch(`http://localhost:3000/api/etapas/${etapaSelecionadaId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ funcionarios: funcionariosParaEnviar }),
            });

            if (!res.ok) throw new Error("Erro ao atualizar etapa");
            alert("Funcionários associados à etapa com sucesso!");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center p-6 space-y-4">
            <h2 className="text-2xl font-bold">Associar Funcionários à Etapa</h2>

            <div className="w-80">
                <label className="block font-semibold mb-2">Selecione a Etapa</label>
                <Select
                    value={etapaSelecionadaId ?? ""}
                    onChange={handleEtapaChange}
                    className="w-full p-2 rounded"
                >
                    <option value="">Selecione uma etapa</option>
                    {etapas.map(et => (
                        <option key={et.id} value={et.id}>
                            {et.nome}
                        </option>
                    ))}
                </Select>
            </div>

            {etapaSelecionadaId && (
                <div className="w-80 p-2 rounded max-h-64 overflow-y-auto">
                    <p className="block font-semibold mb-2">Selecione os Funcionários</p>
                    {todosFuncionarios.map(f => (
                        <div key={f.id} className="flex items-center justify-center mb-1">
                            <Checkbox
                                id={`func-${f.id}`}
                                value={f.id}
                                checked={funcionariosSelecionados.includes(f.id)}
                                onChange={handleFuncionarioChange}
                            />
                            <label htmlFor={`func-${f.id}`} className="ml-3">
                                {f.nome}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={handleSalvar}
                className="w-80 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={!etapaSelecionadaId}
            >
                Salvar Associação
            </button>
        </div>
    );
}

export function RemoverEtapa() {
    const { id } = useParams();

    const [etapas, setEtapas] = useState([]);

    useEffect(() => {
        carregarEtapas();
    }, [id]);

    async function carregarEtapas() {
        try {
            const res = await fetch(`http://localhost:3000/api/etapas/aeronave/${id}`);
            const dados = await res.json();
            setEtapas(dados);
        } catch (error) {
            console.error("Erro ao carregar etapas:", error);
        }
    }

    async function excluirEtapa(etapaId) {
        const confirmar = window.confirm("Tem certeza que deseja excluir esta etapa?");
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3000/api/etapas/${etapaId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Erro ao excluir etapa");
            carregarEtapas();
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Remover Etapas da Aeronave {id}</h2>

            {etapas.length === 0 ? (
                <p>Nenhuma etapa cadastrada para esta aeronave.</p>
            ) : (
                <ul className="space-y-4 w-full max-w-md">
                    {etapas.map(etapa => (
                        <li
                            key={etapa.id}
                            className="p-4 text-black rounded"
                        >
                            <div className="font-semibold text-lg">{etapa.nome}</div>
                            <p>Status: {etapa.status}</p>
                            <p>
                                Prazo:{" "}
                                {etapa.prazo
                                    ? new Date(etapa.prazo).toLocaleDateString("pt-BR")
                                    : "—"}
                            </p>

                            <button
                                onClick={() => excluirEtapa(etapa.id)}
                                className="mt-3 w-full text-white py-1 rounded hover:bg-red-700"
                            >
                                Excluir Etapa
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
