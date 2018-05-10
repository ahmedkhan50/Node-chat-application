const moment = require('moment');
const generateMessage = (from,text)=>{
    return {
        from:from,
        text:text,
        createdAt: moment().valueOf()
    }
}

const generateLocationMessage =function(from,latitude,longitude){
   return {
       from: from,
       url:`https://www.google.com/maps?q=${latitude},${longitude}`,
       createdAt: moment().valueOf()
   }
}

module.exports = {
  generateMessage: generateMessage,
  generateLocationMessage: generateLocationMessage
}