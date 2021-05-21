function success90percentPromise () {
  return new Promise((resolve, reject) => {
    const value = Math.random()
    if (value >= 0.2) {
      return resolve(value)
    }
    return reject(value)
  })
}

async function allSettledPromises () {
  const promises = Array(10).fill(0).map(() => success90percentPromise())
  const result = []
  try {
    const promiseResult = await Promise.allSettled(promises)
    result.push(...promiseResult)
  } catch (e) {
    console.error(`error on ${e}`)
  }
}

allSettledPromises()

// 결과값
// error on 0.19315114789790266
// []
