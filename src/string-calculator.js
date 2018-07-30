import { curry, reduce } from 'lodash'
import { invertDivs } from './mult-div-utils'
const calc = curry((delimeter, combiner, str) => str.split(delimeter)
    .map((val) => parseFloat((val || '0')) )
    .reduce(combiner))

const extract = (str) => str.match(/[\d]+((\/|\*)[\d]+)+/g)

const add = calc(/(?=\+|-)/, (acc, val) => val + acc)

const multiply = calc('*', (acc, val) => acc * val)

const evaluate = (str) => {
    if(str.includes('*') || str.includes('/')){
        return multiply(invertDivs(str))
    }
    else{
        return add(str)
    }
}

export default (str) => {
    let exp = extract(str) || [];
    str = reduce(
        exp, 
        (acc, expression) => acc.replace(expression, evaluate(expression).toString()), 
        str
    )
    return evaluate(str);
}



