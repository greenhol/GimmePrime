/// <reference path="node_modules/typescript/lib/lib.es6.d.ts" />
import {fs} from 'file-system';

console.log('starting...');

let start = 2;
const BY = 1000000;
const MAX = 10000000;
let cnt = BY;
let pool = new Map<number, null>();

let optimized = true;

if (optimized) {

    while (cnt <= MAX) {

        for (let i = start; i < cnt; i++) {
            pool.set(i, null);
        }
    
        pool.forEach((value: null, key: number) => {    
            let multiplier = key;
            let product = 0;
            while (product < cnt) {
                if (pool.has(product)) {
                    pool.delete(product);
                }
                product = key * multiplier;
                multiplier++;        
            }
        });

        console.log(pool.size + ' prime numbers found between 0 and ' + cnt);
        start = cnt;
        cnt += BY;
    }

} else {

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

    console.log(pool.size + ' prime numbers found between 0 and ' + MAX);
}

console.log('...saving to file...');

fs.writeFile("./primes.out", primesToString(), function(err) {
    if(err) {
        return console.log(err);
    }
});

console.log('...finished');

function primesToString() {
    let primeNo = 1;
    const cntDigits = pool.size.toString().length;
    const placeholder = new Array(cntDigits+1).join(' ');
    let out = 'Prime numbers:\n\n';

    pool.forEach((value: null, key: number) => {
        out += (placeholder + primeNo++).slice(-cntDigits) + ': ' + key + '\n';
    });
    return out;
}