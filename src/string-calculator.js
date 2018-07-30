import { curry } from 'lodash';

const calc = curry((delimeter, combiner, exp) => exp.split(delimeter)
    .map((val) => parseFloat((val || '0')) )
    .reduce(combiner));

const add = calc(/(?=\+|-)/, (acc, val) => val + acc);
const multiply = calc('*', (acc, val) => acc * val);
const divide = calc('/', (acc, val) => acc / val);

const extractDivision = (exp) => exp.match(/[\d]+\/[\d]+/g)
const extractMult = (exp) => exp.match(/\d+(\.\d+)?(\*\d+(\.\d+)?)+/g)

const simplify = curry((calculation, exp, expressions) => {
    return expressions.reduce((simplifiedExp, curr) => {
        return simplifiedExp.replace(curr, calculation(curr).toString());
    }, exp)
});

export default (ogExp) => {
    ogExp = ogExp.replace(/\//g, '*1/')
    let expressions = extractDivision(ogExp);

    if(Boolean(expressions)) {
        ogExp = simplify(divide)(ogExp, expressions);
    }

    expressions = extractMult(ogExp);

    if(Boolean(expressions)) {
        ogExp = simplify(multiply)(ogExp, expressions);
    }

    return Math.round(add(ogExp));
}
