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

const replaceEvaluatedExpressions = curry((calculation, exp, expressions) => {
    return expressions.reduce((simplifiedExp, curr) => {
        return simplifiedExp.replace(curr, calculation(curr).toString())
    }, exp)
})

const removeParens = (exps) => exps.map((curr) => curr.replace(/[()]/g,""))
const replaceParensExpressions = (exp, paranExps, removedExps) => {
    return removedExps.reduce((simplifiedExp, currExp, idx) => {
        return simplifiedExp.replace(paranExps[idx], evaluate(currExp).toString());
    }, exp)
}
const simplifyParensExpressions = (exp) => {
    if(exp.includes('(')){
        let paranExps = extractParens(exp)
        let removedExps = removeParens(paranExps)
        exp = replaceParensExpressions(exp, paranExps, removedExps)
        exp = simplifyParensExpressions(exp).toString()
    }
    return exp;
}

const evaluate = (exp) => {
    exp = simplifyParensExpressions(exp)

    let expressions = extractDivision(exp)
    if(Boolean(expressions)) {
        exp = replaceEvaluatedExpressions(divide)(exp, expressions)
    }

    expressions = extractMult(exp)
    if(Boolean(expressions)) {
        exp = replaceEvaluatedExpressions(multiply)(exp, expressions)
    }

    return add(exp)
}

const replaceDivWithReciprocal = (exp) => exp.replace(/\//g, '*1/')

const calculate = (ogExp) => {
    return evaluate(replaceDivWithReciprocal(ogExp))
}

export {
    calculate,
    removeParens,
    extractParens,
    replaceParensExpressions
}
