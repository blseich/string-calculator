import { expect } from 'chai'
import calculate from '../src/string-calculator.js'

describe('String Calculator', () => {

    it('should return 0 for empty string', () => {
        expect(calculate('')).to.be.equal(0)
    })

    it('should return a number when provided a single number in the string', () => {
        expect(calculate('74')).to.be.equal(74)
    })

    it('should add two numbers separated by "+"', () => {
        expect(calculate('4+5')).to.be.equal(9)
    })

    it('should subtract two number separated by "-"', () => {
        expect(calculate('5-4')).to.be.equal(1)
    })

    it('should add two numbers and subtract a number in the same string', () => {
        expect(calculate('5+4-2')).to.be.equal(7)
    })

    it('should multiply two numbers in the same string', () => {
        expect(calculate('4*5')).to.be.equal(20)
    })

    it('should divide two numbers', () => {
        expect(calculate('20/5')).to.be.equal(4)
    })

    it('should divide two numbers and then add a number', () => {
        expect(calculate('20/5+4')).to.be.equal(8)
    })

    it('should divide numbers and then perform addition', () => {
        expect(calculate('20/5+4/2')).to.be.equal(6)
    })
})
