import express from "express";
import cors from "cors";

import aeronavesRoutes from "./routes/aeronaves.js";
import funcionariosRoutes from "./routes/funcionarios.js";
import pecasRoutes from "./routes/pecas.js";
import testesRoutes from "./routes/testes.js";
import etapasRoutes from "./routes/etapas.js";
import relatoriosRoutes from "./routes/relatorios.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/api/aeronaves", aeronavesRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/pecas", pecasRoutes);
app.use("/api/testes", testesRoutes);
app.use("/api/etapas", etapasRoutes);
app.use("/api/relatorios", relatoriosRoutes);

app.listen(PORT, () => console.log(`Backend rodando na porta: ${PORT}`));
