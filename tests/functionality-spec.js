import { expect } from 'chai'
import { removeParans } from '../src/string-calculator.js'

describe('Helper Functions for String Calculator', () => {
    it('should return array with expressions with parans removed', () => {
        expect(removeParans(['(3+3)'])).to.be.eql(['3+3'])
    })

    it('should return array with expressions with parans removed (longer)', () => {
        expect(removeParans(['(3+3)','(7*12)','(100/5)','(9-2)'])).to.be.eql(['3+3','7*12','100/5','9-2'])
    })
})
