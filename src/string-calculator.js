import { curry } from 'lodash';

const calc = curry((delimeter, combiner, str) => str.split(delimeter)
    .map((val) => parseInt((val || '0')) )
    .reduce(combiner));

const add = calc(/(?=\+|-)/, (acc, val) => val + acc);

const multiply = calc('*', (acc, val) => acc * val);

const divide = calc('/', (acc, val) => acc / val);

const evaluate = (str) => {
    if(str.includes('*')){
        return multiply(str);
    }
    else if(str.includes('/')){
        return divide(str);
    }
    else{
        return add(str);
    }
}

const extractDivision = (str) => str.match(/[\d]+\/[\d]+/g)
const extractMultiplication = (str) => str.match(/[\d]+\*[\d]+/g)

export default (str) => {
    let expressions = extractDivision(str) || extractMultiplication(str);

    if(Boolean(expressions)) {
        str = expressions.reduce((simplifiedStr, curr) => {
            return simplifiedStr.replace(curr, evaluate(curr).toString());
        }, str);
    }

    return evaluate(str);
}
