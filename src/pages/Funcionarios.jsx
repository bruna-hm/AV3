import { useState, useEffect } from "react";

export const NivelPermissao = Object.freeze({
    ADMINISTRADOR: "ADMINISTRADOR",
    ENGENHEIRO: "ENGENHEIRO",
    OPERADOR: "OPERADOR"
});

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const lista = JSON.parse(localStorage.getItem("funcionarios")) || [];
        setFuncionarios(lista);
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
                            <p><strong>Nome:</strong> {f.Nome}</p>
                            <p><strong>Usuário:</strong> {f.Usuario}</p>
                            <p><strong>Permissão:</strong> {f.Nivel}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function AdicionarFuncionario({ Nome, Usuario, Endereco, Telefone, Senha, Nivel }) {
    const listaAtual = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const ultimoId = JSON.parse(localStorage.getItem("funcionariosUltimoId")) || 0;
    const novoId = ultimoId + 1;

    const novoFuncionario = { id: novoId, Nome, Usuario, Endereco, Telefone, Senha, Nivel };
    const novaLista = [...listaAtual, novoFuncionario];

    localStorage.setItem("funcionarios", JSON.stringify(novaLista));
    localStorage.setItem("funcionariosUltimoId", JSON.stringify(novoId));

    return novoFuncionario;
}

export function AutenticarFuncionario(Usuario, Senha) {
    const lista = JSON.parse(localStorage.getItem("funcionarios")) || [];
    return lista.find(f => f.Usuario === Usuario && f.Senha === Senha) || null;
}
