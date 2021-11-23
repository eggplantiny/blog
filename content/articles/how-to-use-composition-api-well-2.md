---
title: Composition API 를 활용해보자! - 2
subtitle: Composition API 의 의의와 활용
description: Composition API 의 의의와 활용
category: vue
tags:
- vue
- composition api
- reactivity
---

## Optional API 의 문제점

`Optional API` 에서 `Composition API` 로 변한것일 것은 Vue2 에서 Vue3 로 버전업되면서 가장 크게 변한 기능이다 생각한다.
사실 처음 `Composition API` 를 접했을 땐 이게 뭔가? 왜 또 새로운가 나와서 나를 시험에 들게 하는가? 🤦‍♂️ 싶은 생각이 더 컸던 것 같다.

```vue
//  components/HelloOptional.vue
<template>
  <section>
    <h2>Optional API</h2>
    <div>
      <button type="button" @click="onClickBtn">Hello World</button>
    </div>
    <div>
      {{ msg }}
    </div>
  </section>
</template>
<script>
export default {
  name: "Hello",
  data() {
    return {
      clicked: 0,
    };
  },
  watch: {
    clicked(value) {
      window.alert(`${value} 번째 클릭!`);
    },
  },
  computed: {
    msg() {
      return `${this.clicked} 번 클릭 했습니다!`;
    },
  },
  methods: {
    onClickBtn() {
      this.clicked += 1;
    },
  },
};
</script>
```

`Optional API` 에서는 이렇게 `data`, `computed`, `method`, `watch` 등 정해진 키워드 내부에 필요한 기능을 정의하면 된다.
사실 크게 어렵지도 않고 사실상 `Vue` 의 아이덴티티 같은 이 설계법을 오랫동안 따르다 보니까 익숙해졌던것 같다.

하지만 이직을 하고 큰 프로젝트를 담당하게 되면서 `Optional API` 에는 몇가지 문제점이 있다는걸 깨닫게 되었다.

1. 서로 상관없는 기능들이 한꺼번에 정의 되기 때문에 **규모가 커지면 분리하기 힘들다.** 
2. Vue 파일의 **길이가 무진장 길어진다.** 
3. **수정이 필요한 로직을 찾기 위해선 많은 공수가 필요**하다.

위와 같은 문제를 피해나가기 위해 `Mixin` 을 사용한다던가, **특정 키워드를 추가해 하나의 로직**으로 묶인다는걸 
명시 하는 등 할순 있지만 사실상 임시 방편밖에 되지 않는다 생각한다.

특히 `Mixin` 은 반복적으로 사용되는 로직을 묶을순 있지만 **추적도 힘들고 막상 개발할땐 로직도 꼬이는 등** 나에게 가장 큰 고통을 주는 기능 중 하나가 되었다. ~~극혐 🤦‍♂~~ 

그런 문제를 깨달은 후 `Composition API` 사용해보니까 기존 `Optional API` 로 구현한 코드들이 **레거시 코드** 처럼 느껴지는 마법을 느낄 수 있었다.

## Composition API 로 전환해보자

```vue
//  components/HelloComposition.vue
<template>
  <section>
    <h2>Composition API - 1</h2>
    <div>
      <button type="button" @click="onClickBtn">Hello World</button>
    </div>
    <div>
      {{ msg }}
    </div>
  </section>
</template>
<script>
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  setup() {
    const clicked = ref(0);
    const msg = computed(() => `${clicked.value} 번 클릭 했습니다!`);
    const onClickBtn = () => {
      clicked.value += 1;
    };

    watch(clicked, (value) => {
      window.alert(`${value} 번째 클릭!`);
    });

    return {
      clicked,
      onClickBtn,
      msg,
    };
  },
});
</script>
```

위 코드는 `Optional API` 를 설명하면서 적은 코드를 `Vue3`의 `Composition API` 를 이용해 전환한 것이다.
**처음 이 코드만 보면 오히려 `Optional API` 가 더 깔끔한 것 아닌가?** 라는 생각이 들수도 있다.
사실, 나도 처음 예시만 봤을땐 그런 생각을 헀었다. 잘못 사용하게 된다면 `computed` 와 선언된 변수들, `method` 들이 지저분하게 
나열되고 그렇게 되면 이전 `Optional API` 보다 훨씬 더 지저분한 코드가 될것이 자명하니까 😒

하지만 그런 생각을 하는것은 `Composition API` 의 진정한 의의 **비즈니스 로직의 분리** 를 깨닫지 못했다는 것이다.

## 재사용 가능한 Composition API 로 변환하기
```js
// composable/useHello.js
import { ref, watch, computed } from "vue";

export default function useHello() {
  const clicked = ref(0);
  const msg = computed(() => `${clicked.value} 번 클릭 했습니다!`);
  const onClickBtn = () => {
    clicked.value += 1;
  };

  watch(clicked, (value) => {
    window.alert(`${value} 번째 클릭!`);
  });

  return {
    msg,
    onClickBtn
  };
}
```
```vue
//  components/HelloComposition2.vue
<template>
  <section>
    <h2>Composition API - 2</h2>
    <div>
      <button type="button" @click="onClickBtn">Hello World</button>
    </div>
    <div>
      {{ msg }}
    </div>
  </section>
</template>
<script>
import { defineComponent } from "vue";
import useHello from "../composables/useHello";

export default defineComponent({
  setup() {
    const { msg, onClickBtn } = useHello();

    return {
      msg,
      onClickBtn,
    };
  },
});
</script>
```
위 코드처럼 컴포넌트에서 공통적으로 사용할 로직은 **useHello** 라는 이름의 훅으로 분리 후, **필요한 컴포넌트에서 필요한 기능만 가져와 주입**할 수 있다.
이렇듯 화면상에서 필요한 기능과 내가 구현해야하는 로직을 분리 할 수 있다는게 **비즈니스 로직 분리**의 핵심이라 생각한다. 
비슷한 기능을 필요로 하는 화면이나 컴포넌트를 구현할 시 template 부분은 다르게 구현 후 
훅으로 분리한 부분만 가져와 비즈니스 로직을 주입하게 된다면 간단하게 구현 할 수 있을것이다.


위 프로젝트는 [여기](https://codesandbox.io/s/adoring-rain-yymp7)에서 실행 해볼 수볼 수 있다.
