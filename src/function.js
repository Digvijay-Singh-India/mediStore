String.prototype.toFixed = function toFixedCustom(decimalPlaces = 0) {
  let number = this.toString();
  number = number * 1;
  if (typeof number !== 'number' || isNaN(number)) {
    //return number;
    throw new Error('Invalid input. The first argument must be a valid number.');
  }
  if (typeof decimalPlaces !== 'number' || isNaN(decimalPlaces) || decimalPlaces < 0) {
    //return number;
    throw new Error('Invalid input. The second argument must be a non-negative integer.');
  }
  number = number.toString();
  number = number.split('.');
  if (decimalPlaces == 0) {
    return number[0];
  }
  let desimal = '';
  if (number[1]) {
    let nlenth = decimalPlaces - number[1].length;
    if (nlenth > 0) {
      for (let i = 0; i < nlenth; i++) {
        desimal += '0';
      }
      desimal = '.' + number[1] + desimal;
    } else {
      desimal = '.' + number[1].slice(0, decimalPlaces);
    }
  } else {
    let dot = '.';
    desimal = dot;
    for (let i = 0; i < decimalPlaces; i++) {
      desimal += '0';
    }
  }
  number = number[0].toString();
  const result = number + desimal;
  return result;
}
const data = {};

//String.prototype.toFixed = Number.prototype.toFixed;



//function customToFixed() {

function toFixedCustom(input, decimalPlaces = 0) {
  let number = input.toString();
  number = number * 1;
  if (typeof number !== 'number' || isNaN(number)) {
    //return number;
    throw new Error('Invalid input. The first argument must be a valid number.');
  }
  if (typeof decimalPlaces !== 'number' || isNaN(decimalPlaces) || decimalPlaces < 0) {
    //return number;
    throw new Error('Invalid input. The second argument must be a non-negative integer.');
  }
  number = number.toString();
  number = number.split('.');
  if (decimalPlaces == 0) {
    return number[0];
  }
  let desimal = '';
  if (number[1]) {
    let nlenth = decimalPlaces - number[1].length;
    if (nlenth > 0) {
      for (let i = 0; i < nlenth; i++) {
        desimal += '0';
      }
      desimal = '.' + number[1] + desimal;
    } else {
      desimal = '.' + number[1].slice(0, decimalPlaces);
    }
  } else {
    let dot = '.';
    desimal = dot;
    for (let i = 0; i < decimalPlaces; i++) {
      desimal += '0';
    }
  }
  number = number[0].toString();
  const result = number + desimal;
  return result;
}






// Number.prototype.toFixedCustom=String.prototype.toFixed
module.exports = {
  toFixedCustom: toFixedCustom
};