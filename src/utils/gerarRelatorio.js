export default function gerarRelatorio(codigo) {
    const aeronaves = JSON.parse(localStorage.getItem("aeronaves")) || [];
    const pecas = JSON.parse(localStorage.getItem("pecas")) || [];
    const etapas = JSON.parse(localStorage.getItem("etapas")) || [];
    const testes = JSON.parse(localStorage.getItem("testes")) || [];

    const aeronave = aeronaves.find(a => a.codigo === codigo);
    if (!aeronave) return `Aeronave ${codigo} não encontrada.`;

    const pecasDaAeronave = pecas.filter(p => String(p.aeronaveId) === String(codigo));
    const etapasDaAeronave = etapas.filter(e => e.aeronaveCodigo === codigo);
    const testesDaAeronave = testes.filter(t => String(t.aeronaveId) === String(codigo));

    let texto = `=== Relatório da Aeronave ${codigo} ===\n\n`;
    texto += `Modelo: ${aeronave.modelo}\nTipo: ${aeronave.tipo}\nCapacidade: ${aeronave.capacidade} Kgs\nAlcance: ${aeronave.alcance} Kms\n\n`;

    texto += "=== Peças ===\n";
    if (pecasDaAeronave.length === 0) texto += "Nenhuma peça cadastrada.\n";
    else pecasDaAeronave.forEach(p => {
        texto += `- ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}\n`;
    });

    texto += "\n=== Etapas ===\n";
    if (etapasDaAeronave.length === 0) texto += "Nenhuma etapa cadastrada.\n";
    else etapasDaAeronave.forEach(e => {
        texto += `- ${e.nome} | Status: ${e.status} | Prazo: ${e.prazo}\n`;
        if (e.funcionarios && e.funcionarios.length > 0) {
            texto += `  Funcionários: ${e.funcionarios.map(f => f.nome).join(", ")}\n`;
        } else {
            texto += "  Nenhum funcionário associado\n";
        }
    });

    texto += "\n=== Testes ===\n";
    if (testesDaAeronave.length === 0) texto += "Nenhum teste cadastrado.\n";
    else testesDaAeronave.forEach(t => {
        texto += `- Tipo: ${t.tipo} | Resultado: ${t.resultado}\n`;
    });

    return texto;
}