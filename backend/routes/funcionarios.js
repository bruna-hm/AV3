import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany();
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar funcionários" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: { id: Number(id) }
        });
        if (!funcionario) return res.status(404).json({ error: "Funcionário não encontrado" });
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar funcionário" });
    }
});

router.post("/", async (req, res) => {
    const { nome, usuario, endereco, telefone, senha, nivel } = req.body;
    if (!nome || !usuario || !senha || !nivel) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const novoFuncionario = await prisma.funcionario.create({
            data: {
                nome,
                usuario,
                endereco: endereco || "",
                telefone: telefone || "",
                senha: hashedPassword,
                nivel
            }
        });
        res.status(201).json(novoFuncionario);
    } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        res.status(500).json({ error: "Erro ao criar funcionário", detalhes: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: { usuario }
        });
        if (!funcionario) return res.status(401).json({ error: "Usuário ou senha inválidos" });

        const senhaValida = await bcrypt.compare(senha, funcionario.senha);
        if (!senhaValida) return res.status(401).json({ error: "Usuário ou senha inválidos" });

        res.json({
            id: funcionario.id,
            usuario: funcionario.usuario,
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao autenticar" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, usuario, endereco, telefone, senha, nivel } = req.body;

    try {
        const funcionarioAtual = await prisma.funcionario.findUnique({ where: { id: Number(id) } });
        if (!funcionarioAtual) return res.status(404).json({ error: "Funcionário não encontrado" });

        const atualizado = await prisma.funcionario.update({
            where: { id: Number(id) },
            data: {
                nome: nome || funcionarioAtual.nome,
                usuario: usuario || funcionarioAtual.usuario,
                endereco: endereco || funcionarioAtual.endereco,
                telefone: telefone || funcionarioAtual.telefone,
                senha: senha ? await bcrypt.hash(senha, 10) : funcionarioAtual.senha,
                nivel: nivel || funcionarioAtual.nivel
            }
        });

        res.json(atualizado);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar funcionário" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.funcionario.delete({ where: { id: Number(id) } });
        res.json({ message: "Funcionário removido com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover funcionário" });
    }
});

export default router;
