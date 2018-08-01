import { expect } from 'chai'
import { calculate } from '../src/string-calculator.js'

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

    it('should multiply two numbers and then subtract a number', () => {
        expect(calculate('13*5-2')).to.be.equal(63)
    })

    it('should multiply, then divide, and then subtract a number', () => {
        expect(calculate('23*31-72/9')).to.be.equal(705)
    })

    it('should divide then multiply', () => {
        expect(calculate('30/3*5')).to.be.equal(50)
    })

    it('should multiply then divide', () => {
        expect(calculate('4*30/5')).to.be.equal(24)
    })

    it('should multiply then divide then multiply', () => {
        expect(calculate('3*30/5*6')).to.be.equal(108)
    })

    it('should divide then multiply then divide', () => {
        expect(calculate('30/3*54/6')).to.be.equal(90)
    })

    it('should divide then divide and then divide once more', () => {
        expect(calculate('30/3/2/5')).to.be.equal(1)
    })

    it('should multiply then divide then multiply then divide 3 more times', () => {
        expect(calculate('3*30/5*6/3/2/6')).to.be.equal(3)
    })

    it('should multiply, divide, add and subtract', () => {
        expect(calculate('3*30/5+5-2+100*6/3/2')).to.be.equal(121)
    })

    it('should evaluate massive string', () => {
        expect(calculate('2341234/2/2*413*30/5+5-2+100*6/3/2+123-235+519438')).to.be.equal(1450913892)
    })

    it('should produce decimal value from simple division', () => {
        expect(calculate('1/2')).to.be.equal(0.5)
    })

    it('should produce decimal value from division and multiplication', () => {
        expect(calculate('1/2*3')).to.be.equal(1.5)
    })

    it('should produce decimal value from div, mult, and addition', () => {
        expect(calculate('34+1/4*29')).to.be.equal(41.25)
    })

    it('should add then multiply', () => {
        expect(calculate('(3+3)*6')).to.be.equal(36)
    })

    it('should add then subtract and then multiply', () => {
        expect(calculate('(3+3)*(6-2)')).to.be.equal(24)
    })

    it('should produce value from complex parentheses expression', () => {
        expect(calculate('(((3+3)+(6-2))-(234+29))*6')).to.be.equal(-1518)
    })
})
