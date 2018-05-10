const moment = require('moment');

// var d = new Date().getMonth();
var someTimeStamp = moment().valueOf();
const date = moment();
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));