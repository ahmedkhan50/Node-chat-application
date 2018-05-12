const expect = require('expect');
const {isRealString} = require('./validation');

describe('check isRealString validation',()=>{
   it('pass number values',()=>{
         var result = isRealString(234);
         expect(result).toBeFalsy();
   }); 

   it('pass empty string values',()=>{
         var result = isRealString('   ');
         expect(result).toBeFalsy();
   }); 
    it('pass real string values',()=>{
         var result = isRealString(' nabeel  ');
         expect(result).toBeTruthy();
   }); 

});