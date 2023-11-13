import BigNumber from 'bignumber.js'; // See https://github.com/MikeMcl/bignumber.js

const denominationsMultiplier = {
  WEI: new BigNumber(1, 10).times(10).exponentiatedBy(18),
  GWEI: new BigNumber(1, 10).times(10).exponentiatedBy(8),
  ETH: new BigNumber(1, 10).times(10).exponentiatedBy(1),
}

function getFiatValueToRender({
  value,
  conversionRate = 1,
  fromDenomination,
  fromCurrency,
}) {
  let number = new BigNumber(value, 16);
console.log('R1L number: ', number);
  if (fromCurrency !== 'ETH') {
    number = number.multipliedBy(conversionRate);
  }
console.log('R10 number: ', number);


  if (fromDenomination !== 'WEI') {
    number = number.multipliedBy(
      denominationsMultiplier.WEI
        .dividedBy(denominationsMultiplier[fromDenomination])
    )
  }

console.log('R20 number: ', number);

  return number.toString(32);
}

function getResult(value) {
  return getFiatValueToRender({
    value,
    conversionRate: 1,
    fromDenomination: 'GWEI',
    fromCurrency: 'ABC',
  })
}

// let x = 0
//
// console.log(getResult(0) === '0')
// console.log(getResult(1) === '59682f00')
// console.log(getResult(10600.47) === 'e762bdf8a40')
// let z = Number(1010816321).toString(16);
// console.log('x1: ', z.toString(16));

// let x = new BigNumber('59682f00', 16);
// let x = new BigNumber('e762bdf8a40', 16);
let x = parseInt('11010816321', 32);
// let x = new BigNumber('11010816321', 32);
// 116111.8908353601

// console.log('q1: ', BigNumber.config());
// console.log('q1: int ', x);
// console.log('q1: ', x.toString(32));

x = x / ( denominationsMultiplier.WEI.dividedBy(denominationsMultiplier['GWEI']) );
// console.log('q2: ', x );

// 1500000000 / denominationsMultiplier.
x = x / 1;

let z = new BigNumber(x, 10);
// let z = parseInt(x, 16);
// console.log('q3: ', z);
console.log('q4: ', z);


// console.log('q1: ', new BigNumber('zz', 36))
// console.log('q1: ', new BigNumber(1, 16))
// console.log('q2: ', new BigNumber(1, 16).times(10))
// console.log('q3: ', new BigNumber(1, 16).times(10).exponentiatedBy(8))

//

// console.log(getResult(z))
// 1C58F.E40DC9415204DA854727
// 1c58f.e40dc941bff859ec9
console.log(getResult(''))
// console.log(getResult(''))
// console.log(getResult(5));
// console.log(getResult(0) === '0')
// console.log(getResult(1) === '59682f00')
// console.log(getResult(10600.47) === 'e762bdf8a40')
