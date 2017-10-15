/// <reference path="node_modules/typescript/lib/lib.es6.d.ts" />

console.log('starting...');

const MAX = 100;

let pool = new Map<number, number>();
for (let i = 2; i < MAX; i++) {
    pool.set(i, i);
}

pool.forEach((value: number, key: number) => {    
    let multiplier = value;
    let product = 0;
    while (product < MAX) {
        if (pool.has(product)) {
            pool.delete(product);
        }
        product = value * multiplier;
        multiplier++;        
    }
});

console.log(pool);
console.log(pool.size + ' prime numbers found between 0 and ' + MAX);

console.log('...finished');