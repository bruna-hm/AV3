import { useState, useEffect } from "react";

export const NivelPermissao = Object.freeze({
    ADMINISTRADOR: "ADMINISTRADOR",
    ENGENHEIRO: "ENGENHEIRO",
    OPERADOR: "OPERADOR"
});

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        async function carregarFuncionarios() {
            try {
                const res = await fetch("http://localhost:3000/api/funcionarios");
                const data = await res.json();
                setFuncionarios(data);
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
            }
        }

        carregarFuncionarios();
    }, []);

    return (
        <div className="p-6 w-full mx-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">Funcionários</h2>

            {funcionarios.length === 0 ? (
                <p className="text-gray-900">Nenhum funcionário cadastrado.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {funcionarios.map(f => (
                        <div key={f.id} className="border p-4 rounded bg-gray-800 text-white">
                            <p><strong>Nome:</strong> {f.nome}</p>
                            <p><strong>Usuário:</strong> {f.usuario}</p>
                            <p><strong>Permissão:</strong> {f.nivel}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export async function AdicionarFuncionario({ nome, usuario, endereco, telefone, senha, nivel }) {
    try {
        const res = await fetch("http://localhost:3000/api/funcionarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, usuario, endereco, telefone, senha, nivel }),
        });
        const novoFuncionario = await res.json();
        return novoFuncionario;
    } catch (error) {
        console.error("Erro ao adicionar funcionário:", error);
        return null;
    }
}

export async function AutenticarFuncionario(usuario, senha) {
    try {
        const res = await fetch("http://localhost:3000/api/funcionarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha }),
        });
        if (!res.ok) return null;
        const funcionario = await res.json();
        return funcionario;
    } catch (error) {
        console.error("Erro ao autenticar funcionário:", error);
        return null;
    }
}

export function RemoverFuncionario() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    async function carregarFuncionarios() {
        try {
            const res = await fetch("http://localhost:3000/api/funcionarios");
            if (!res.ok) throw new Error("Erro ao carregar funcionários");
            const dados = await res.json();
            setFuncionarios(dados);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        }
    }

    async function excluirFuncionario(funcionarioId) {
        const confirmar = window.confirm("Tem certeza que deseja excluir este funcionário?");
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3000/api/funcionarios/${funcionarioId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Erro ao excluir funcionário");
            carregarFuncionarios(); // Atualiza lista após exclusão
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error);
        }
    }

    return (
        <div className="p-6 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">Remover Funcionários</h2>

            {funcionarios.length === 0 ? (
                <p>Nenhum funcionário cadastrado.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
                    {funcionarios.map(f => (
                        <div key={f.id} className="border p-4 rounded bg-gray-800 text-white">
                            <p><strong>Nome:</strong> {f.nome}</p>
                            <p><strong>Usuário:</strong> {f.usuario}</p>
                            <p><strong>Permissão:</strong> {f.nivel}</p>
                            <button
                                onClick={() => excluirFuncionario(f.id)}
                                className="mt-3 w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
                            >
                                Excluir Funcionário
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}