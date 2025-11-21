import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Aeronaves, { DetalheAeronave, AdicionarAeronave, RemoverAeronave } from "./pages/Aeronaves";
import Funcionarios, { RemoverFuncionario } from "./pages/Funcionarios";
import AdicionarPeca, { AtualizarStatusPeca }  from "./pages/Pecas";
import { RemoverPeca } from "./pages/Pecas";
import AdicionarTeste, { RemoverTeste } from "./pages/Testes";
import AdicionarEtapa, { AssociarFuncionariosEtapa, RemoverEtapa } from "./pages/Etapas";
import Relatorio from "./pages/Relatorio";

export default function AppRoutes({ usuario }) {
    return (
        <Routes>
            <Route path="/" element={<Home usuario={usuario} />} />
            <Route path="/funcionarios" element={<Funcionarios/>}/>
            <Route path="/funcionarios/remover" element={<RemoverFuncionario />} />
            <Route path="/aeronaves" element={<Aeronaves />} />
            <Route path="/aeronaves/adicionar" element={<AdicionarAeronave />} />
            <Route path="/aeronaves/remover" element={<RemoverAeronave />} />
            <Route path="/aeronaves/:id" element={<DetalheAeronave />} />
            <Route path="/aeronaves/:id/pecas/adicionar" element={<AdicionarPeca />} />
            <Route path="/aeronaves/:id/pecas/status" element={<AtualizarStatusPeca />} />
            <Route path="/aeronaves/:id/pecas/remover" element={<RemoverPeca />} />
            <Route path="/aeronaves/:id/etapas/adicionar" element={<AdicionarEtapa />} />
            <Route path="/aeronaves/:id/etapas/associar" element={<AssociarFuncionariosEtapa />} />
            <Route path="/aeronaves/:id/etapas/remover" element={<RemoverEtapa />} />
            <Route path="/aeronaves/:id/testes/adicionar" element={<AdicionarTeste />} />
            <Route path="/aeronaves/:id/testes/remover" element={<RemoverTeste />} />
            <Route path="/aeronaves/:id/relatorios" element={<Relatorio />} />
        </Routes>
    );
}
