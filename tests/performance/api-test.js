import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '5s', target: 10 },   // ramp up to 10 users
      { duration: '10s', target: 50 },  // ramp up to 50 users
      { duration: '10s', target: 100 }, // ramp up to 100 users
      { duration: '5s', target: 0 },    // ramp down to 0
    ],
  };

export default function() {
  const response = http.get('https://jsonplaceholder.typicode.com/users/1');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response under 1000ms': (r) => r.timings.duration < 1000,
    'has name field': (r) => JSON.parse(r.body).name !== undefined,
  });

  sleep(1);
}