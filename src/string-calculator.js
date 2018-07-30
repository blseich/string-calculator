import { curry } from 'lodash'

const calc = curry((delimeter, combiner, str) => str.split(delimeter)
    .map((val) => parseInt((val || '0')) )
    .reduce(combiner))

const extract = (str) => str.match(/[\d]+((\/|\*)[\d]+)+/g)

const add = calc(/(?=\+|-)/, (acc, val) => val + acc)

const multiply = calc('*', (acc, val) => acc * val)

const divide = calc('/', (acc, val) => acc / val)

const evaluate = (str) => {
    if(str.includes('*')){
        return multiply(str)
    }
    else if(str.includes('/')){
        return divide(str)
    }
    else{
        return add(str)
    }
}

export default (str) => {
    let exp = extract(str) || [];

    exp.forEach((expression) => str = str.replace(expression, evaluate(expression).toString()))

    return evaluate(str);
}



