import {formatCurrency} from '../utils/money.js';

console.log('-- Test suite: formatCurrency --'); //test suite
//first test case for formatCurrency function
console.log('Converts cents into dollar'); // test case name
if (formatCurrency(2095) === '20.95') {
  console.log(' passed');
} else {
  console.log(' failed');
};
//second test case for formatCurrency function
console.log('Works with 0');
if (formatCurrency(0) === '0.00') {
  console.log(' passed');
} else {
  console.log(' failed');
};
//third test case for formatCurrency function
console.log('Rounds up to the nearest cents');
if (formatCurrency(2000.5) === '20.01') {
  console.log(' passed');
} else {
  console.log(' failed');
};
//forth test case for formatCurrency function
console.log('Rounds down to the nearest cents');
if (formatCurrency(2000.4) === '20.00') {
  console.log(' passed');
} else {
  console.log(' failed');
};