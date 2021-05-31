function isPrimeNumber (n, primeNumbers) {
  for (const c of primeNumbers) {
    if (n % c === 0) {
      return false
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

function closureRunningTimeCalculator () {
  let count = 0
  return function (targetFunction) {
    if (typeof targetFunction !== 'function') {
      throw new TypeError("Please pass type 'function' 😥")
    }

    count += 1
    const timeLabel = `${count} function`

    console.log()
    console.time(timeLabel)

    const result = targetFunction()
    console.log(`${count} > ${result}`)

    console.timeEnd(timeLabel)
  }
}

const genPrimeNumber = closurePrimeNumber()
const runningTimeCalculator = closureRunningTimeCalculator()

runningTimeCalculator(() => genPrimeNumber(10000))
runningTimeCalculator(() => genPrimeNumber(10001))
