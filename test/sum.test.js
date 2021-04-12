const sum = require('./sum');

describe('test array availible', () => {
    it('should chek array nama Diapers availible', () => {
        expect(sum).toContain('diapers');
    })
})

function bloop() {
    return null;
}
describe('this to be null because this data null', ()=>{
    it('should be null', () => {
        expect(bloop()).toBeNull();
    })
})


