import { curry } from 'lodash'

const calc = curry((delimeter, combiner, exp) => exp.split(delimeter)
    .map((val) => parseFloat((val || '0')) )
    .reduce(combiner))

const add = calc(/(?=\+|-)/, (acc, val) => val + acc)
const multiply = calc('*', (acc, val) => acc * val)
const divide = calc('/', (acc, val) => acc / val)

const extractDivision = (exp) => exp.match(/[\d]+\/[\d]+/g)
const extractMult = (exp) => exp.match(/\d+(\.\d+)?(\*\d+(\.\d+)?)+/g)

const simplify = curry((calculation, exp, expressions) => {
    return expressions.reduce((simplifiedExp, curr) => {
        return simplifiedExp.replace(curr, calculation(curr).toString())
    }, exp)
})

const evaluate = (exp) => {
    let expressions = extractDivision(exp)
    if(Boolean(expressions)) {
        exp = simplify(divide)(exp, expressions)
    }

    expressions = extractMult(exp)
    if(Boolean(expressions)) {
        exp = simplify(multiply)(exp, expressions)
    }

    return add(exp)
}

const replaceDivWithReciprocal = exp => exp.replace(/\//g, '*1/')

export default (ogExp) => {
    return evaluate(replaceDivWithReciprocal(ogExp))
}

//Extract parantheses statement and simplify that first
