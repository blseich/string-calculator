import { expect } from 'chai'
import { invertDivs } from '../src/mult-div-utils'

describe('Multiply and Divide Utility Function', () => {
    it('should invert single division', () => {
        expect(invertDivs('1/2')).to.be.equal('1*0.5')
    })

    it('should not invert multiplication', () => {
        expect(invertDivs('1*2*3*4')).to.be.equal('1*2*3*4')
    })

    it('should invert multiple division', () => {
        expect(invertDivs('1/2/4/8')).to.be.equal('1*0.5*0.25*0.125')
    })
})