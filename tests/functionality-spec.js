import { expect } from 'chai'
import { removeParens, extractParens, simplifyParens } from '../src/string-calculator.js'

describe('Helper Functions for String Calculator', () => {
    it('should return array with expressions with parans removed', () => {
        expect(removeParens(['(3+3)'])).to.be.eql(['3+3'])
    })

    it('should return array with expressions with parans removed (longer)', () => {
        expect(removeParens(['(3+3)','(7*12)','(100/5)','(9-2)'])).to.be.eql(['3+3','7*12','100/5','9-2'])
    })

    it('should return array with expressions with parans extracted from expression', () => {
        expect(extractParens('(((3+3)+(6-2))-(234+29))*6')).to.be.eql(['(3+3)','(6-2)','(234+29)'])
    })

    it('should simplify expressions with parans extracted from expression', () => {
        expect(simplifyParens('(((3+3)+(6-2))-(234+29))*6',['(3+3)','(6-2)','(234+29)'],['6','4','263'])).to.be.eql('((6+4)-263)*6')
    })
})
