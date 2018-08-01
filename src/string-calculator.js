import { curry } from 'lodash'

const calc = curry((delimeter, combiner, exp) => exp.split(delimeter)
    .map((val) => parseFloat((val || '0')) )
    .reduce(combiner))

const add = calc(/(?=\+|-)/, (acc, val) => val + acc)
const multiply = calc('*', (acc, val) => acc * val)
const divide = calc('/', (acc, val) => acc / val)

const extractDivision = (exp) => exp.match(/[\d]+\/[\d]+/g)
const extractMult = (exp) => exp.match(/\d+(\.\d+)?(\*\d+(\.\d+)?)+/g)
const extractParens = (exp) => exp.match(/\(\d+(\.\d+)?((\*|\/|\+|\-)\d+(\.\d+)?)+\)/g)

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

const removeParens = (exps) => exps.map((curr) => curr.replace(/[()]/g,""))
const simplifyParens = (exp, paranExps, removedExps) => {
    return removedExps.reduce((simplifiedExp, currExp, idx) => {
        return simplifiedExp.replace(paranExps[idx], evaluate(currExp).toString());
    }, exp)
}

const replaceDivWithReciprocal = (exp) => exp.replace(/\//g, '*1/')

const calculate = (ogExp) => {
    ogExp = replaceDivWithReciprocal(ogExp)
    if(ogExp.includes('(')){
        let paranExps = extractParens(ogExp)
        let removedExps = removeParens(paranExps)
        ogExp = simplifyParens(ogExp, paranExps, removedExps)
        ogExp = calculate(ogExp).toString()
    }
    return evaluate(ogExp)
}

export {
    calculate,
    removeParens,
    extractParens,
    simplifyParens
}
