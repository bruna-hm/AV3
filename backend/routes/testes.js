import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const testes = await prisma.teste.findMany();
        res.json(testes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const teste = await prisma.teste.findUnique({
            where: { id: Number(id) },
        });
        if (!teste) return res.status(404).json({ error: "Teste não encontrado" });
        res.json(teste);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const { tipo, resultado, aeronaveId } = req.body;
    try {
        const novoTeste = await prisma.teste.create({
            data: {
                tipo,
                resultado,
                aeronaveId: Number(aeronaveId),
            },
        });
        res.status(201).json(novoTeste);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { tipo, resultado } = req.body;
    try {
        const testeAtualizado = await prisma.teste.update({
            where: { id: Number(id) },
            data: { tipo, resultado },
        });
        res.json(testeAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.teste.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
