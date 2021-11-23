---
title: Composition API 를 활용해보자! - 1
subtitle: Singleton Pattern 을 이용해 Composition API 활용하기
description: Singleton Pattern 을 이용해 Composition API 활용하기
category: vue
createdAt: 2021-07-12
tags:
- vue
- composition api
- reactivity
---

## Vue 3의 가장 큰 2가지 변화

Vue 3 의 정식출시가 얼마 남지 않았다. Vue 3 는 `Typescript` 정식 지원이라던가 여러 문법적인 변화가 있지만 그 중 가장 기대되는 변화는 `reactivity`시스템(이하 반응형 시스템) 의 변화와 `Composition API`일 것이다.

[Vue 2](https://kr.vuejs.org/v2/guide/reactivity.html)에서는 데이터를 `Object.defineProperty`를 사용하여 `getter/setters`로 변환하여 속성에 액세스 하거나 수정할 때 종속성 추적 및 변경 알림을 수행했다. 하지만, **중첩된 오브젝트에 대한 종속성 추적이 불가하다는 등 아주 사소한 문제들이 있었다.**

반면 이번에 새로 출시된 [반응형 시스템](https://v3.vuejs.org/guide/reactivity.html) 은 ES2015 에서 추가된 `Proxy`를 이용해 반응형을 주입할 수 있게 되었다. 또한, 반응형 시스템 변화와 더불어 `Composition API`라는 새로운 기능을 도입해 기존 Optional 한 구현을 넘어서 Vue 가 추구하고 있는 가장 큰 가치인 [**관심사 분리**](https://ko.wikipedia.org/wiki/%EA%B4%80%EC%8B%AC%EC%82%AC_%EB%B6%84%EB%A6%AC) 를 향해 한발짝 더 내딛였다고 생각한다.

## 그럼 새로운 반응형 시스템과 Composition API 를 어떻게 활용할거야? 🤔

새로운 반응형 시스템의 가장 중요한 포인트는 **주입된 반응형을 Vue 컴포넌트 외부에서도 조작 할 수 있다는것이다.** 기존 Optional 한 구현에서는 반응형 주입을 하기 위해선 `this`를 이용해 데이터에 접근하거나 `Vuex`를 이용해야 했지만 새로운 새로운 반응형 시스템과 `Composition API`를 활용하면 어디서든 변수에 접근하고 데이터 변경 알림을 수행할 수 있다.

이 얼마나 멋진 일인가! 😎

그럼 간단한 `LoadingDialog` 구현을 통해 진짜로 Composition API 를 활용해보자!

## Singleton Pattern 을 활용한 Composable Loading Interface 구현

우선 `Singleton Pattern`을 간단히 설명하자면 **객체의 인스턴스가 오직 1개만 생성되는 패턴을 의미한다.** 우리는 Singleton 객체에 반응형 변수들을 담고 단 한번만 생성해주면 그 자체로 작은 **Vuex 와 같은 데이터 저장공간이자 어디서든 사용 할수있는 공유객체로 활용할 수 있다.**

```js
// @/composition-api/loading.ts

import { ref, Ref } from 'vue'

export class LoadingSingleton {
  private static _instance: LoadingSingleton | null = null;
  private readonly _loading: Ref<boolean>;

  private constructor () {
    this._loading = ref<boolean>(false);
  }

  public static getInstance (): LoadingSingleton {
    if (this._instance === null) {
      this._instance = new LoadingSingleton();
    }

    return this._instance;
  }

  public get loading (): Ref<boolean> {
    return this._loading;
  }

  public toggleLoading (): void {
    this._loading.value = !this._loading.value;
  }
}
```

위 코드를 보면 static 메서드인 `getInstance`를 통해서만 `Singleton Instance` 에 접근이 가능하며 `getInstance`내부에서 호출되는 `constructor()` 부분에서 데이터를 담을 `ref`객체를 한번만 초기화 시켜준다. 그렇게 되면 `Singleton Instance`는 단 한개만 존재할 수 있게되며 `Singleton Class`를 사용할수만 있다면 언제 어디서든 같은 데이터에 접근이 가능해진다.

```js
// @/component/LoadingDialog.vue

<template>
  <div
    v-show="visible"
    class="loading-dialog"
  >
    Now Loading...
  </div>
</template>

<script lang="ts">
import { LoadingSingleton } from '@/composition-api/Loading'

export default {
  name: 'LoadingDialog',
  setup () {
    const loader = LoadingSingleton.getInstance()

    return {
      visible: loader.loading
    }
  }
}
</script>
```
위와 같이 간단하게 LoadingDialog 컴포넌트를 구현한다. 이때 Template 에 반응형을 주입할때 아까전에 만들었던 `LoadingSingleton`의 loading `ref`를 사용하면된다.

```js
// @/component/HelloWorld.vue
<template>
  <div class="hello">
    <button @click="startLoading">
      Start Loading
    </button>
  </div>
</template>

<script lang="ts">
import { LoadingSingleton } from '@/composition-api/Loading'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default {
  name: 'HelloWorld',
  setup () {
    const loader = LoadingSingleton.getInstance()

    const startLoading = async () => {
      loader.toggleLoading()
      await delay(1000)
      loader.toggleLoading()
    }

    return {
      startLoading
    }
  }
}
</script>
```

마지막으로 실제로 로딩을 호출할 부분에서 `LoadingSingleton`의 실행부인 `toggleLoading`메서드를 호출하면 간단하게 로딩 다이얼로그를 끄고 킬 수 있다.

```js
//  @/App.vue
<template>
  <h1>Hello Vue3 Composition API</h1>
  <section>
    <router-view/>
  </section>
  <loading-dialog />
</template>

<script type="ts">
import { LoadingSingleton } from '@/composition-api/Loading'
import LoadingDialog from '@/components/organisms/common/LoadingDialog.vue'

export default {
  name: 'App',
  components: { LoadingDialog },
  setup () {
    window.myLoader = LoadingSingleton.getInstance()

    return {
    }
  }
} ` 
</script>
```

심지어 이렇게 App 의 시작부분에서 `window` 객체에 `LoadingSingleton Instance` 를 주입해두면 어디서든지 `LoadingDialog` 를 조작할 수 있다. (심지어 Browser 의 console 에서도 접근 할 수 있도록 만들 수 있다. 😮) **(단, 이방법은 외부사용자가 어디서든지 쉽게 기능을 호출할 수 있기때문에 추천하지 않는다.)**

>위 예제는 [여기서](https://github.com/eggplantiny/vue3-composition-api-examples) 다운받을 수 있다. 

## 마지막으로

새로운 `Reactivity`시스템과 `Composition API`은 사실 아직 출시된지 얼마되지 않은 기능이기 때문에 사용법 정립이 잘 되지 않았다. 하지만 분명 더욱 멋지고 새로운 방법으로 방식으로 개발할 수 있도록 도와줄거라 믿어 의심치 않는다 😉


