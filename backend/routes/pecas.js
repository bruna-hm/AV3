import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const { aeronaveId } = req.query;
        const where = aeronaveId ? { aeronaveId: Number(aeronaveId) } : {};
        const pecas = await prisma.peca.findMany({ where });
        res.json(pecas);
    } catch (error) {
        console.error("Erro ao buscar peças:", error);
        res.status(500).json({ error: "Erro ao buscar peças", detalhes: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const peca = await prisma.peca.findUnique({
            where: { id: Number(id) },
        });
        if (!peca) return res.status(404).json({ error: "Peça não encontrada" });
        res.json(peca);
    } catch (error) {
        console.error("Erro ao buscar peça:", error);
        res.status(500).json({ error: "Erro ao buscar peça", detalhes: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { nome, tipo, fornecedor, status, aeronaveId } = req.body;

        if (!nome || !tipo || !fornecedor || !status || !aeronaveId) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const novaPeca = await prisma.peca.create({
            data: {
                nome,
                tipo,
                fornecedor,
                status,
                aeronaveId: Number(aeronaveId),
            },
        });

        res.status(201).json(novaPeca);
    } catch (error) {
        console.error("Erro ao criar peça:", error);
        res.status(500).json({ error: "Erro ao criar peça", detalhes: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, tipo, fornecedor, status } = req.body;

        const data = {};
        if (nome !== undefined) data.nome = nome;
        if (tipo !== undefined) data.tipo = tipo;
        if (fornecedor !== undefined) data.fornecedor = fornecedor;
        if (status !== undefined) data.status = status;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: "Nenhum campo para atualizar" });
        }

        const pecaAtualizada = await prisma.peca.update({
            where: { id: Number(id) },
            data,
        });

        res.json(pecaAtualizada);
    } catch (error) {
        console.error("Erro ao atualizar peça:", error);
        res.status(500).json({ error: "Erro ao atualizar peça", detalhes: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.peca.delete({ where: { id: Number(id) } });
        res.status(204).end();
    } catch (error) {
        console.error("Erro ao deletar peça:", error);
        res.status(500).json({ error: "Erro ao deletar peça", detalhes: error.message });
    }
});

export default router;
