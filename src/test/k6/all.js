import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
    vus: 50,
    duration: '10s'
};

export default function () {
    group('Test /quotations', function () {
        const res = http.get('http://localhost:8080/quotations');

        check(res, { 'status is 200': (r) => r.status === 200 });
    });

    group('Test /categories', function () {
        const res = http.get('http://localhost:8080/categories');
        check(res, { 'status is 200': (r) => r.status === 200 });
    });

    // group('Test /categories', function () {
    //     const res = http.get('http://host.docker.internal:8080');
    //     check(res, { 'status is 200': (r) => r.status === 200 });
    // });
}
