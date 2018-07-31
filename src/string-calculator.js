import { curry } from 'lodash'

const calc = curry((delimeter, combiner, exp) => exp.split(delimeter)
    .map((val) => parseFloat((val || '0')) )
    .reduce(combiner))

const add = calc(/(?=\+|-)/, (acc, val) => val + acc)
const multiply = calc('*', (acc, val) => acc * val)
const divide = calc('/', (acc, val) => acc / val)

const extractDivision = (exp) => exp.match(/[\d]+\/[\d]+/g)
const extractMult = (exp) => exp.match(/\d+(\.\d+)?(\*\d+(\.\d+)?)+/g)
const extractParans = (exp) => exp.match(/\(\d+(\.\d+)?((\*|\/|\+|\-)\d+(\.\d+)?)+\)/g)

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


const removeParans = (exps) => {
    return exps.map((curr) => curr.replace(/[()]/g,""))
}
const replaceDivWithReciprocal = (exp) => exp.replace(/\//g, '*1/')

const calculate = (ogExp) => {
    ogExp = replaceDivWithReciprocal(ogExp)
    if(ogExp.includes('(')){
        let paranExps = extractParans(ogExp);
        let removedExps = removeParans(paranExps);
        ogExp = ogExp.replace(paranExps[0], evaluate(removedExps[0]))
    }
        return evaluate(ogExp)
}

export {
    calculate,
    removeParans
}
