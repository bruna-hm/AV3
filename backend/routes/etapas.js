import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/aeronave/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const aeronave = await prisma.aeronave.findUnique({
            where: { id: Number(id) },
            include: { etapas: { include: { funcionarios: true } } },
        });

        if (!aeronave) return res.status(404).json({ error: "Aeronave não encontrada" });

        res.json(aeronave.etapas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/funcionarios", async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany();
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/aeronave/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, status, prazo } = req.body;

    try {
        const aeronave = await prisma.aeronave.findUnique({
            where: { id: Number(id) },
        });

        if (!aeronave) return res.status(404).json({ error: "Aeronave não encontrada" });

        const novaEtapa = await prisma.etapa.create({
            data: {
                nome,
                status,
                prazo: prazo ? new Date(prazo) : undefined,
                aeronaveId: aeronave.id,
            },
        });

        res.status(201).json(novaEtapa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, status, prazo, funcionarios } = req.body;

    try {
        const etapaAtualizada = await prisma.etapa.update({
            where: { id: Number(id) },
            data: {
                nome,
                status,
                prazo,
                ...(funcionarios && {
                    funcionarios: {
                        set: funcionarios.map(f => ({ id: f.id })),
                    },
                }),
            },
            include: { funcionarios: true },
        });

        res.json(etapaAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.etapa.delete({ where: { id: Number(id) } });
        res.json({ message: "Etapa removida com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
