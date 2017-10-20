/// <reference path="node_modules/typescript/lib/lib.es6.d.ts" />
import {fs} from 'file-system';

console.log('starting...');

const SECTION_SIZE = 1000000;
const MAX_EVAL_NUM = 10000000;

let section_start = 2;
let section_end = SECTION_SIZE;

let pool = new Map<number, null>();

let noCalcs = 0;
let noCalcsThisSection = 0;

while (section_end <= MAX_EVAL_NUM) {

    noCalcsThisSection = 0;    

    for (let i = section_start; i < section_end; i++) {
        pool.set(i, null);
    }

    pool.forEach((value: null, key: number) => {
        if (key < Math.sqrt(section_end)) {
            let multiplier = Math.floor(section_start / key);
            if (multiplier < 2) {
                multiplier = 2;
            }
            let product = key * multiplier;
            while (product < section_end) {
                if (pool.has(product)) {
                    pool.delete(product);
                }
                multiplier++;                            
                product = key * multiplier;
                noCalcs++;
                noCalcsThisSection++;
            }
        }
    });

    let time = new Date();
    console.log(pool.size + ' prime numbers found between 0 and ' + section_end + ' - ' + Math.round(100*section_end/MAX_EVAL_NUM) + '% done - Number of calculation steps: ' + noCalcs + ' (+' + noCalcsThisSection + ') - Time: ' + formatTime(time));

    section_start = section_end;
    section_end += SECTION_SIZE;
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

function formatTime(time: Date): string {
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '.' + time.getMilliseconds();
}
