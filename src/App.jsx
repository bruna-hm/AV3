import { useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import LoginFuncionarioModal, { AdicionarFuncionarioModal } from "./components/Modals";
import { AutenticarFuncionario, AdicionarFuncionario } from "./pages/Funcionarios";
import LayoutNavbars from "./components/Layouts";
import AppRoutes from "./routes";
import "./App.css";

function AppInterno() {
  const navigate = useNavigate(); 
  const [usuario, setUsuario] = useState("");
  const [logado, setLogado] = useState(false);

  function handleLoginFuncionario(funcionario) {
    setLogado(true);
    setUsuario(funcionario.Nome);
    navigate("/");
  }

  return (
    <>
      {!logado ? (
        <section className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="font-bold mb-6 text-gray-200">AV2 - AeroCode</h1>
          <h2 className="mb-6 text-gray-400">Produção de Aeronaves</h2>
          
          <div className="flex gap-4">
          <LoginFuncionarioModal
            autenticarFuncionario={AutenticarFuncionario}
            onLogin={handleLoginFuncionario}
          />

          <AdicionarFuncionarioModal
            adicionarFuncionario={AdicionarFuncionario}
          />
          </div>
        </section>
      ) : (
        <section className="w-screen h-screen flex flex-col">
          <LayoutNavbars usuario={usuario} />
          <AppRoutes usuario={usuario} />
        </section>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppInterno />
    </Router>
  );
}