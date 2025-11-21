import { Dropdown } from "flowbite-react";
import { NavLink } from "react-router-dom";

export function DropDAeronaves() {
    return (
        <Dropdown label="Aeronaves" dismissOnClick={false} className="bg-gray-600 text-white font-bold rounded px-4 py-2">
            <NavLink
                to="/aeronaves"
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Lista de Aeronaves
            </NavLink>
            <NavLink
                to="/aeronaves/adicionar"
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Adicionar Aeronave
            </NavLink>
            <NavLink
                to="/aeronaves/remover"
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Remover Aeronave
            </NavLink>
        </Dropdown>
    );
}

export function DropDRelatorios({ aeronaveCodigo }) {
    return (
        <Dropdown label="Relatórios" dismissOnClick={false} className="bg-gray-600 text-white font-bold rounded px-4 py-2">
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/relatorios`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Gerar
            </NavLink>
        </Dropdown>
    );
}

export function DropDPecas({ aeronaveCodigo }) {
    return (
        <Dropdown label="Peças" dismissOnClick={false}>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/pecas/adicionar`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Adicionar
            </NavLink>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/pecas/status`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Atualizar Status
            </NavLink>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/pecas/remover`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Remover
            </NavLink>
        </Dropdown>
    );
}

export function DropDEtapas({ aeronaveCodigo }) {
    return (
        <Dropdown label="Etapas" dismissOnClick={false}>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/etapas/adicionar`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Adicionar
            </NavLink>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/etapas/associar`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Associar Funcionários
            </NavLink>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/etapas/remover`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Remover Etapa
            </NavLink>
        </Dropdown>
    );
}

export function DropDTestes({ aeronaveCodigo }) {
    return (
        <Dropdown label="Testes" dismissOnClick={false}>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/testes/adicionar`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Adicionar
            </NavLink>
            <NavLink
                to={`/aeronaves/${aeronaveCodigo}/testes/remover`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >
                Remover
            </NavLink>
        </Dropdown>
    );
}

export function DropDFuncionarios() {
    return (
        <Dropdown label="Funcionários" dismissOnClick={false} className="bg-gray-600 text-white font-bold rounded px-4 py-2">
            <NavLink
                to={`/funcionarios/`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >Lista de Funcionários
            </NavLink>
            <NavLink
                to={`/funcionarios/remover`}
                style={{ color: "white" }}
                className="block px-4 py-2 hover:bg-gray-500"
            >Remover Funcionário
            </NavLink>
        </Dropdown>
    );
}