---
title: Vue 에서 Kakao SDK 쉽게 사용하기
subtitle: Vue 에서 Kakao SDK 는 어떻게 사용하나요?
description: vue-kakao-sdk plugin 을 이용해 쉽게 Kakao SDK 사용하기
category: vue
tags:
- vue
- kakao SDK
- vue Plugin
---

# Kakao SDK 는 어떻게 사용하나요?

## 1. 애플리케이션 추가하기

우선 `Kakao SDK` 를 사용하기 위해선 [https://developers.kakao.com/](https://developers.kakao.com/) 에서 애플리케이션을 등록 해야한다.

![1](/images/vue-kakao-sdk/1.png)

## 2. 앱 정보 확인하기.

이렇게 애플리케이션을 간단하게 추가하고 나면 내 앱의 Key 와 기본정보등을 볼 수 있다.

![2](/images/vue-kakao-sdk/2.png)

여기서 중요한것. **절대 앱키 특히 Admin 키는 외부에 공개되면 안된다.**

## 3. 플랫폼 등록하기.

**내 애플리케이션 > 앱 설정 > 플랫폼** 으로 이동해서 Web 플랫폼을 등록하고 사이트 도메인을 등록해야한다. 보통 개발전용이라면 **http://localhost:8080** 를 등록하면되고 배포시에는 **웹앱의 주소**를 입력해줘야한다.

![3](/images/vue-kakao-sdk/3.png)

## 4. vue-kakao-sdk 설치하기.

`Vue` 프로젝트에서 [vue-kakao-sdk](https://github.com/eggplantiny/vue-kakao-sdk) 를 설치하자.

```text
# yarn
yarn add vue-kakao-sdk

# npm
npm install vue-kakao-sdk
```

## 5. Vue Plugin 등록하기.

Plugin 을 등록한다. 이때, 아까 발급받은 **Javascript 앱키를 등록**해주자.

```js
// main.js
import Vue from 'vue'
import VueKakaoSdk from 'content/articles/vue-kakao-sdk'

const apiKey = 'Your Kakao API Javascript Key'
Vue.use(VueKakaoSdk, {apiKey}) // apiKey 를 반드시 입력해줘야한다.
```

## 6. Profit!

이제 `Kakao SDK` 를 사용할수 있게 되었다.

```js
// App.vue
...
methods: {
  shareStoryWeb () {
    this.$kakao.Story.share({
      url: 'https://github.com/eggplantiny/vue-kakao-sdk',
      text: 'Test story share with vue-kakao-sdk'
    })
  },
  loginWithKakao () {
    this.$kakao.Auth.login({
      success (authObj) {
        alert(JSON.stringify(authObj))
      },
      fail (err) {
        alert(JSON.stringify(err))
      }
    })
  }
}
```

