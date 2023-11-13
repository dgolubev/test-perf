import BigNumber from 'bignumber.js'; // See https://github.com/MikeMcl/bignumber.js

const denominationsMultiplier = {
  WEI: new BigNumber(1, 10).times(10).exponentiatedBy(18),
  GWEI: new BigNumber(1, 10).times(10).exponentiatedBy(10),
  ETH: new BigNumber(1, 10).times(10).exponentiatedBy(1),
}

function getFiatValueToRender({
  value,
  conversionRate = 1,
  fromDenomination,
  fromCurrency,
}) {
  let number = new BigNumber(value, 10);
  // let number = new BigNumber(value, 10);
  if (fromCurrency !== 'ETH') {
    number = number.multipliedBy(conversionRate);
  }

  if (fromDenomination !== 'WEI') {
    number = number.multipliedBy(
      denominationsMultiplier.WEI.dividedBy(denominationsMultiplier[fromDenomination]),
    )
  }

  return number.toString(16);
}

function getResult(value) {
  return getFiatValueToRender({
    value,
    conversionRate: 15,
    fromDenomination: 'GWEI',
    fromCurrency: 'ABC',
  })
}

// let z = Number(1010816321).toString(16);
// console.log('x1: ', z.toString(16));

// let x = new BigNumber('59682f00', 16);
// let x = new BigNumber('e762bdf8a40', 16);
// let x = new BigNumber('1010816321', 16);

// console.log('q1: ', BigNumber.config());
// console.log('q1: ', x);

// x = x / ( denominationsMultiplier.WEI.dividedBy(denominationsMultiplier['GWEI']) );
// 1000000000000000000 / 100000000
// 1000000000000000000 / 10000000000
// x = x / ( 1000000000000000000 / 10000000000 );
// console.log('q3: ', x );

// 1500000000 / denominationsMultiplier.
// x = x / 15;

// console.log('q2: ', x);

// 11010816321

// console.log('q1: ', new BigNumber('zz', 36))
// console.log('q1: ', new BigNumber(1, 16))
// console.log('q2: ', new BigNumber(1, 16).times(10))
// console.log('q3: ', new BigNumber(1, 16).times(10).exponentiatedBy(8))

//

// console.log(getResult(3521.90015109))


console.log(getResult(116111.8908353601))
console.log(getResult(0) === '0')
console.log(getResult(1) === '59682f00')
console.log(getResult(10600.47) === 'e762bdf8a40')
