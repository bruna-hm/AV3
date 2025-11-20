import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const aeronave = await prisma.aeronave.findUnique({
            where: { id: Number(id) },
            include: {
                pecas: true,
                etapas: true,
                testes: true
            }
        });

        if (!aeronave) {
            return res.status(404).json({ error: "Aeronave não encontrada" });
        }

        let relatorio = `Relatório da Aeronave ${aeronave.codigo} - ${aeronave.modelo}\n\n`;
        relatorio += `Tipo: ${aeronave.tipo}\n`;
        relatorio += `Capacidade: ${aeronave.capacidade} Kgs\n`;
        relatorio += `Alcance: ${aeronave.alcance} Kms\n\n`;

        relatorio += "Peças:\n";
        if (aeronave.pecas.length === 0) relatorio += "Nenhuma peça cadastrada.\n";
        else aeronave.pecas.forEach(p => {
            relatorio += `- ${p.nome} | ${p.tipo} | ${p.status}\n`;
        });

        relatorio += "\nEtapas:\n";
        if (aeronave.etapas.length === 0) relatorio += "Nenhuma etapa cadastrada.\n";
        else aeronave.etapas.forEach(e => {
            relatorio += `- ${e.nome} | Status: ${e.status} | Prazo: ${e.prazo}\n`;
        });

        relatorio += "\nTestes:\n";
        if (aeronave.testes.length === 0) relatorio += "Nenhum teste cadastrado.\n";
        else aeronave.testes.forEach(t => {
            relatorio += `- ${t.tipo} | Resultado: ${t.resultado}\n`;
        });

        res.send(relatorio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
