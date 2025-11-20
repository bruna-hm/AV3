import { Router } from "express";
import prisma from "../prismaClient.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const aeronaves = await prisma.aeronave.findMany();
        res.json(aeronaves);
    } catch (error) {
        console.error("Erro ao buscar aeronaves:", error);
        res.status(500).json({ error: "Erro ao buscar aeronaves", detalhes: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { codigo, modelo, tipo, capacidade, alcance } = req.body;

        if (!codigo || !modelo || !tipo || capacidade === undefined || alcance === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const novaAeronave = await prisma.aeronave.create({
            data: {
                codigo,
                modelo,
                tipo,
                capacidade: Number(capacidade),
                alcance: Number(alcance)
            }
        });

        res.status(201).json(novaAeronave);
    } catch (error) {
        console.error("Erro ao criar aeronave:", error);
        res.status(500).json({ error: "Erro ao criar aeronave", detalhes: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const aeronave = await prisma.aeronave.findUnique({
            where: { id: Number(id) },
        });

        if (!aeronave) {
            return res.status(404).json({ error: "Aeronave não encontrada" });
        }

        res.json(aeronave);
    } catch (error) {
        console.error("Erro ao buscar aeronave:", error);
        res.status(500).json({ error: "Erro ao buscar aeronave", detalhes: error.message });
    }
});

export default router;
