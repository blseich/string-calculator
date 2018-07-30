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

    it('should add two numbers and subtract a number', () => {
        expect(calculate('5+4-2')).to.be.equal(7)
    })

    it('should multiply two numbers', () => {
        expect(calculate('4*5')).to.be.equal(20)
    })

    it('should divide two numbers', () => {
        expect(calculate('20/5')).to.be.equal(4)
    })

    it('should divide and add two numbers', () => {
        expect(calculate('20/5+4')).to.be.equal(8)
    })

    it('should divide 4 successive numbers first to last', () => {
        expect(calculate('40/2/5/2')).to.be.equal(2)
    })

    it('should multiply two numbers and add a number', () => {
        expect(calculate('4*5+3')).to.be.equal(23)
    })

    it('should multiply and divide number in proper sequence', () => {
        expect(calculate('6*10/3')).to.be.equal(20);
    })

    it('should return a decimal value', () => {
        expect(calculate('1/2')).to.be.equal(0.5)
    })
})