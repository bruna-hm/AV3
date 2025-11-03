import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Select } from "flowbite-react";
import { useState } from "react";

export default function LoginFuncionarioModal({ autenticarFuncionario, onLogin }) {
    const [openModal, setOpenModal] = useState(false);
    const [Usuario, setUsuario] = useState("");
    const [Senha, setSenha] = useState("");

    function handleLogin() {
        const funcionario = autenticarFuncionario(Usuario, Senha);
        if (!funcionario) return alert("Usuário ou senha inválidos!");
        setOpenModal(false);
        if (onLogin) onLogin(funcionario);
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Login</Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="usuario">Usuário</Label>
                            <TextInput id="usuario" value={Usuario} onChange={e => setUsuario(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="senha">Senha</Label>
                            <TextInput id="senha" type="password" value={Senha} onChange={e => setSenha(e.target.value)} />
                        </div>
                        <Button onClick={handleLogin}>Entrar</Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export function AdicionarFuncionarioModal({ adicionarFuncionario }) {
    const [openModal, setOpenModal] = useState(false);
    const [Nome, setNome] = useState("");
    const [Usuario, setUsuario] = useState("");
    const [Endereco, setEndereco] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [Senha, setSenha] = useState("");
    const [Nivel, setNivel] = useState("");

    function handleRegister() {
        if (!Nome || !Usuario || !Endereco || !Telefone || !Senha || !Nivel) {
            return alert("Preencha todos os campos!");
        }
        const novoFuncionario = adicionarFuncionario({ Nome, Usuario, Endereco, Telefone, Senha, Nivel });
        setOpenModal(false);
        setNome(""); setUsuario(""); setEndereco(""); setTelefone(""); setSenha(""); setNivel("");
        alert(`Funcionário ${novoFuncionario.Nome} cadastrado!`);
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Registrar</Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-4">
                        <div><Label>Nome</Label><TextInput value={Nome} onChange={e => setNome(e.target.value)} /></div>
                        <div><Label>Usuário</Label><TextInput value={Usuario} onChange={e => setUsuario(e.target.value)} /></div>
                        <div><Label>Endereço</Label><TextInput value={Endereco} onChange={e => setEndereco(e.target.value)} /></div>
                        <div><Label>Telefone</Label><TextInput value={Telefone} onChange={e => setTelefone(e.target.value)} /></div>
                        <div><Label>Senha</Label><TextInput type="password" value={Senha} onChange={e => setSenha(e.target.value)} /></div>
                        <div>
                            <Label>Nível de Permissão</Label>
                            <Select value={Nivel} onChange={e => setNivel(e.target.value)} className="w-full p-2 rounded">
                                <option value="">Selecione</option>
                                <option value="ADMINISTRADOR">Administrador</option>
                                <option value="ENGENHEIRO">Engenheiro</option>
                                <option value="OPERADOR">Operador</option>
                            </Select>
                        </div>
                        <Button onClick={handleRegister}>Cadastrar</Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
