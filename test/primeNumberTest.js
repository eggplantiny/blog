function isPrimeNumber (n, primeNumbers) {
  for (const c of primeNumbers) {
    if (n % c === 0) {
      return false
    }

    if (Math.sqrt(n) < c) {
      return true
    }
  }

  return true
}

function closurePrimeNumber () {
  const primeNumbers = [2]

  return function (n) {
    if (primeNumbers.length >= n) {
      return primeNumbers[n - 1]
    }

    let targetNumber = primeNumbers[primeNumbers.length - 1]
    while (primeNumbers.length < n) {
      targetNumber += 1

      if (isPrimeNumber(targetNumber, primeNumbers)) {
        primeNumbers.push(targetNumber)
      }

      if (primeNumbers.length >= n) {
        return targetNumber
      }
    }
  }
}

function runningTimeCalculator (targetFunction) {
  if (typeof targetFunction !== 'function') {
    throw new TypeError("Please pass type 'function' 😥")
  }

  const start = Date.now()
  const result = targetFunction()
  const end = Date.now()
  const duration = end - start

  return { start, end, result, duration }
}

const genPrimeNumber = closurePrimeNumber()

// for (let c = 1; c < 100; c++) {
//
// }

runningTimeCalculator(() => console.log(genPrimeNumber(100000)))
runningTimeCalculator(() => genPrimeNumber(100001))
