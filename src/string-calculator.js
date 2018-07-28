import { curry } from 'lodash';

const calc = curry((delimeter, combiner, exp) => exp.split(delimeter)
    .map((val) => parseInt((val || '0')) )
    .reduce(combiner));

const add = calc(/(?=\+|-)/, (acc, val) => val + acc);

const multiply = calc('*', (acc, val) => acc * val);

const divide = calc('/', (acc, val) => acc / val);

const evaluate = (exp) => {
    if(exp.includes('*')){
        return multiply(exp);
    }
    else if(exp.includes('/')){
        return divide(exp);
    }
    else{
        return add(exp);
    }
}

const extractDivision = (exp) => exp.match(/[\d]+\/[\d]+/g)
const extractMult = (exp) => exp.match(/[\d]+\*[\d]+/g)

const simplify = (exp, expressions) => {
    return expressions.reduce((simplifiedExp, curr) => {
        return simplifiedExp.replace(curr, evaluate(curr).toString());
    }, exp);
}

export default (ogExp) => {
    let expressions = extractDivision(ogExp);

    if(Boolean(expressions)) {
        ogExp = simplify(ogExp, expressions);
    }

    expressions = extractMult(ogExp);

    if(Boolean(expressions)) {
        ogExp = simplify(ogExp, expressions);
    }

    return evaluate(ogExp);
}
