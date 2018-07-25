import { expect } from 'chai'
import calculate from '../src/string-calculator.js'

describe('String Calculator', () => {

    it('should return 0 for empty string', () => {
        expect(calculate('')).to.be.equal(0)
    })

    it('should return a number when provided a single number in the string', () => {
        expect(calculate('74')).to.be.equal(74)
    })

    it('should add two numbers separated by delimeter', () => {
        expect(calculate('4,5')).to.be.equal(9)
    })
})