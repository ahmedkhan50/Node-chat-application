const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');
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

describe('generate location message',()=>{
    it('generate loc message',()=>{
          var result = generateLocationMessage('user2',23,34);
          expect(result.url).toEqual('https://www.google.com/maps?q=23,34');
          expect(typeof result.createdAt).toEqual('number');
          expect(result).toMatchObject({
            from:'user2',
            url:'https://www.google.com/maps?q=23,34'
        });
    });
})