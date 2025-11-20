import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Select } from "flowbite-react";
import { useState } from "react";

export default function LoginFuncionarioModal({ autenticarFuncionario, onLogin }) {
    const [openModal, setOpenModal] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin() {
        const funcionario = await autenticarFuncionario(usuario, senha);
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
                            <TextInput id="usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="senha">Senha</Label>
                            <TextInput id="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
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
    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [nivel, setNivel] = useState("");

    async function handleRegister() {
        if (!nome || !usuario || !endereco || !telefone || !senha || !nivel) {
            return alert("Preencha todos os campos!");
        }
        const novoFuncionario = await adicionarFuncionario({ nome, usuario, endereco, telefone, senha, nivel });
        if (!novoFuncionario) return alert("Erro ao cadastrar funcionário!");
        setOpenModal(false);
        setNome(""); setUsuario(""); setEndereco(""); setTelefone(""); setSenha(""); setNivel("");
        alert(`Funcionário ${novoFuncionario.nome} cadastrado!`);
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Registrar</Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-4">
                        <div>
                            <Label>Nome</Label>
                            <TextInput value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                        <div>
                            <Label>Usuário</Label>
                            <TextInput value={usuario} onChange={e => setUsuario(e.target.value)} />
                        </div>
                        <div>
                            <Label>Endereço</Label>
                            <TextInput value={endereco} onChange={e => setEndereco(e.target.value)} />
                        </div>
                        <div>
                            <Label>Telefone</Label>
                            <TextInput value={telefone} onChange={e => setTelefone(e.target.value)} />
                        </div>
                        <div>
                            <Label>Senha</Label>
                            <TextInput type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                        </div>
                        <div>
                            <Label>Nível de Permissão</Label>
                            <Select value={nivel} onChange={e => setNivel(e.target.value)} className="w-full p-2 rounded">
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
