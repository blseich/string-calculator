import { reduce } from 'lodash'

const extractDivisors = (str) => str.match(/\/[\d]+/g)

const removeDivisionOperator = (str) => str.replace('/', '')

const invertDivisor = (str) => 1/parseInt(removeDivisionOperator(str))

export const invertDivs = ((str) => (reduce(
    extractDivisors(str), 
    (acc, divisor) => acc.replace(divisor, `*${invertDivisor(divisor)}`), 
    str)))

export default {
    invertDivs
}