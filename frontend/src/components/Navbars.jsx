import { Navbar, NavbarCollapse } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { DropDAeronaves, DropDRelatorios, DropDFuncionarios, DropDEtapas, DropDPecas, DropDTestes } from "./Dropdowns";

export default function MainNav({ onLogout}) {
    return (
        <Navbar fluid rounded className="mx-auto">
            <NavbarCollapse className="flex justify-center gap-6">
                <NavLink
                    to="/"
                    style={{ color: "white" }}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-bold px-4 py-2 rounded bg-gray-700"
                            : "text-white font-semibold px-4 py-2 rounded hover:bg-gray-700"
                    }
                >Home
                </NavLink>

                <DropDAeronaves />
                <DropDFuncionarios />
                <NavLink
                    to="/"
                    onClick={() => {
                        onLogout();
                    }}
                    style={{ color: "white" }}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-bold px-4 py-2 rounded bg-gray-700"
                            : "text-white font-semibold px-4 py-2 rounded hover:bg-gray-700"
                    }
                >
                    Sair
                </NavLink>
            </NavbarCollapse>
        </Navbar>
    );
}

export function AeronaveNavbar({ aeronaveCodigo, voltarPara }) {

    return (
        <Navbar fluid rounded className="mx-auto">
            <NavbarCollapse className="flex justify-center gap-6">
                <NavLink
                    to="/"
                    style={{ color: "white" }}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-bold px-4 py-2 rounded bg-gray-700"
                            : "text-white font-semibold px-4 py-2 rounded hover:bg-gray-700"
                    }
                >Home
                </NavLink>
                <DropDPecas aeronaveCodigo={aeronaveCodigo} />
                <DropDEtapas aeronaveCodigo={aeronaveCodigo} />
                <DropDTestes aeronaveCodigo={aeronaveCodigo} />
                <DropDRelatorios aeronaveCodigo={aeronaveCodigo} />
                <NavLink
                    to={voltarPara}
                    style={{ color: "white" }}
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-bold px-4 py-2 rounded bg-gray-700"
                            : "text-white font-semibold px-4 py-2 rounded hover:bg-gray-700"
                    }
                >Voltar
                </NavLink>
            </NavbarCollapse>
        </Navbar>
    );
}
