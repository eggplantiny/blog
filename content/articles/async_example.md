---
title: Promise.allSettled 가 필요한 순간
description: Promise.allSettled 가 필요한 순간
img: https://images.unsplash.com/photo-1580752300992-559f8e0734e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80
alt: nice image
author:
  name: eggplantiny
  bio: All about Peter and what he does and where he works
  img: https://images.unsplash.com/photo-1533636721434-0e2d61030955?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80
tags:
  - web development
  - javascript
  - promise
  - allSettlted
---

우리는 발전하는 Javascript 덕에 수 없이 많은 구원을 받았다 믿고있다.

특히, 비동기 작업을 동기 작업처럼 다룰 수 있는 Async / Await 문법을 접하고 난 뒤로 개발하면서 막혀있던 한켠의 구멍이 뚫린듯한 느낌이 들었다. 그렇게 난 비동기의 고수가 된듯한 기분을 만끽하며 행복한 시간을 보낼줄 알았지만 개발을 진행하다가 한가지 문제에 봉착했다.


## 문제가 뭐야? 😨

가장 처음으로 막힌곳은 스크래핑 모듈을 만들면서 필요한 기능을 만들때였다. 스크래핑 작업을 할때 한번에 너무 많은 Request 를 서버에 날리게 되면 서버에 과부하를 줄 수 있다. 그렇게 되면 내 IP 는 차단이 될것이고 그럼 필요한 정보를 스크래핑 하는게 불가능하게 된다. 😭 그래서 한번에 스크래핑을 하는 갯수를 제한 후 모든 작업이 Settled 한 후 다음 목록에서 스크래핑 하는 코드를 작성해야 했다.


## 잠깐, 그런데 여기서 Settled 란 무엇인가?

**Promise 가 fulfilled 했다는 의미는 모든 비동기 작업을 성공적으로 이행했다는 의미**이다.
우리가 Promise.all 으로 모든 Promisefmf fulfilled 됬는지 확인을 하게된다면 **중간에 실패한 경우가 있을때는 아무것도 얻을 수 없을것**이다.

```jsx
function success90percentPromise () {
  return new Promise((resolve, reject) => {
    const value = Math.random()
    if (value >= 0.2) {
      return resolve(value)
    }
    return reject(value)
  })
}

async function fulfilledPromises () {
  const promises = Array(10).fill(0).map(() => success80percentPromise())
  const result = []
  try {
    const promiseResult = await Promise.all(promises)
    result.push(...promiseResult)
  } catch (e) {
    console.error(`error on ${e}`)
  }

  console.log(result)
}

fulfilledPromises()

// 결과값
// error on 0.19315114789790266
// []
```

위 코드는 80% 확률로 성공하는 함수를 Promise.all 을 이용해 10번의 결과를 받아내는 함수이다. 위 코드를 실행하면 높은 확률로 결과값은 "빈 배열" 이 나올것이다. 왜 그런것일까? [MDN Javascript Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 섹션을 살펴보면

> Promise.all() 메서드는 순회 가능한 객체에 주어진 모든 프로미스가 이행한 후, 혹은 프로미스가 주어지지 않았을 때 이행하는 Promise를 반환합니다. **주어진 프로미스 중 하나가 거부하는 경우, 첫 번째로 거절한 프로미스의 이유를 사용해 자신도 거부합니다.**

이와같이 **주어진 Promise 중 하나라도 Reject 되는 경우 모두 이행취소가 되어버리기 때문**이다.
스크래핑시 네트워크에러나 컨텐츠의 주소를 찾지 못하거나, 서버에서 내 요청을 거부해버리는 경우가 왕왕 발생하기 때문에 Promise.all 메서드로 한번에 묶에서 작업을 처리해버리면 한개 요청의 실패로 엮여있는 모든 Promise 가 실패해버리는 일이 꽤 자주 발생했다. 많은 Promise 들 중 하나가 실패하더라도 이행처리를 할 수 있는 방법은 없을까?


## 그럼 어떻게 해야해?🤔

해답은 ES2020 추가된 새로운 기술인 Promise.allSettled 를 이용하면 된다. 적절한 버전의 클라이언트 (크롬기준 76v, Node.js 기준 12.9.0) 에서 위에서 선보인 예제 코드를 Promise.all 에서 Promise.allSettlted 로 변환시켜서 실행해보자.

```jsx
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
  const promises = Array(10).fill(0).map(() => success80percentPromise())
  const result = []
  try {
    const promiseResult = await Promise.allSettled(promises)
    result.push(...promiseResult)
  } catch (e) {
    console.error(`error on ${e}`)
  }

  console.log(result)
}

allSettledPromises()

// 결과값
// [
//   { status: 'fulfilled', value: 0.4504557722909479 },
//   { status: 'fulfilled', value: 0.680841653861421 },
//   { status: 'rejected', reason: 0.11974379594422802 },
//   { status: 'fulfilled', value: 0.23180419753039128 },
//   { status: 'fulfilled', value: 0.5970437215433655 },
//   { status: 'fulfilled', value: 0.9409583003192321 },
//   { status: 'fulfilled', value: 0.519657245482521 },
//   { status: 'rejected', reason: 0.1582887607787815 },
//   { status: 'fulfilled', value: 0.6292244254606323 },
//   { status: 'fulfilled', value: 0.24632426659463502 }
// ]
```

실행을 해보면 위 결과값처럼 성공을하던 실패를 하던 무조건 일단 배열에 결과값을 담아주는걸 볼 수 있다. **성공했을 땐 status 가 'fulfilled', 실패했을 땐 'rejected'** 인걸 확인할 수 있다.


## 결론은?

이처럼 Promise.allSettled 를 이용한다면 다중의 Promise 를 동시에 처리하면서 모든 Promise 가 성공하길 기도하지 않아도 된다. 그렇다고 너무 Promise.allSettled 를 맹목적으로 믿고 사용하면 안된다. 아직 표준에 등제된지 얼마되지 않은 따끈따끈한 기능이라 **구형 브라우저나 Node.js 를 사용한다면 Pollyfil 를 따로 구현** 해줘야하며 무엇보다 **Promise.all 의 상위호환이 아닌 편의성을 위해 구현된 기능이기 때문에 필요한 기능을 적절한 판단으로 적재적소에 사용하는게 좋다**.
