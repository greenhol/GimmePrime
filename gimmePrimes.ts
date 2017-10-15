/// <reference path="node_modules/typescript/lib/lib.es6.d.ts" />

console.log('starting...');

const MAX = 100;

let pool = new Map<number, null>();
for (let i = 2; i < MAX; i++) {
    pool.set(i, null);
}

pool.forEach((value: null, key: number) => {    
    let multiplier = key;
    let product = 0;
    while (product < MAX) {
        if (pool.has(product)) {
            pool.delete(product);
        }
        product = key * multiplier;
        multiplier++;        
    }
});

console.log(pool.keys());
console.log(pool.size + ' prime numbers found between 0 and ' + MAX);

console.log('...finished');