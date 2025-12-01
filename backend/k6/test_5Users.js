import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api';

const latencyTrend = new Trend('latencia');
const responseTimeTrend = new Trend('tempo_resposta');
const processingTrend = new Trend('tempo_processamento');

export let options = {
    vus: 5,
    duration: '30s',
};

export default function () {
    const getRes = http.get(`${BASE_URL}/aeronaves`);
    check(getRes, { 'GET /aeronaves 200': (r) => r.status === 200 });
    latencyTrend.add(getRes.timings.waiting);
    responseTimeTrend.add(getRes.timings.duration);
    processingTrend.add(getRes.timings.duration - getRes.timings.waiting);

    const unique = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const payload = JSON.stringify({
        codigo: `TEST-${unique}`,
        modelo: 'Modelo Teste',
        tipo: 'TipoX',
        capacidade: 2,
        alcance: 100,
    });
    const headers = { headers: { 'Content-Type': 'application/json' } };
    const postRes = http.post(`${BASE_URL}/aeronaves`, payload, headers);
    check(postRes, { 'POST /aeronaves 201': (r) => r.status === 201 });

    let created = {};
    try { created = postRes.json(); } catch (e) { /* ignore */ }
    const aeronaveId = created?.id;

    if (aeronaveId) {
        const getById = http.get(`${BASE_URL}/aeronaves/${aeronaveId}`);
        check(getById, { 'GET /aeronaves/:id 200': (r) => r.status === 200 });
        latencyTrend.add(getById.timings.waiting);
        responseTimeTrend.add(getById.timings.duration);
        processingTrend.add(getById.timings.duration - getById.timings.waiting);

        const delRes = http.del(`${BASE_URL}/aeronaves/${aeronaveId}`);
        check(delRes, { 'DELETE /aeronaves/:id 200': (r) => r.status === 200 });
        latencyTrend.add(delRes.timings.waiting);
        responseTimeTrend.add(delRes.timings.duration);
        processingTrend.add(delRes.timings.duration - delRes.timings.waiting);
    }

    sleep(1);
}