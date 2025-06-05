import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 50,
    duration: '10s'
};

export default function () {
    const res = http.get('http://host.docker.internal:8080/quotations');
    check(res, { 'status is 200': (r) => r.status === 200 });
}
