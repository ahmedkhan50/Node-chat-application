const expect = require('expect');
const {generateMessage} = require('./message');
describe('generate message',()=>{
   it('should generate correct message object',()=>{
        var result = generateMessage('akhan5@tw.com','hello guys!!');
        expect(result.from).toEqual('akhan5@tw.com');
        expect(typeof result.createdAt).toEqual('number');
        expect(result).toMatchObject({
            from:'akhan5@tw.com',
            text:'hello guys!!'
        });
   });
});