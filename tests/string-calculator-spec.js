import { expect } from 'chai'
import calculate from '../src/string-calculator.js'

describe('String Calculator', () => {

    it('should return 0 for empty string', () => {
        expect(calculate('')).to.be.equal(0)
    })

})